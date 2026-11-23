import * as THREE from 'three';
import { getSoftGlowTexture } from './pixarMaterials';

function makeSparkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const glow = ctx.createRadialGradient(32,32,0,32,32,31);
  glow.addColorStop(0,'#ffeab1');
  glow.addColorStop(0.23,'rgba(255,179,91,0.43)');
  glow.addColorStop(1,'rgba(255,149,78,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0,0,64,64);
  ctx.fillStyle = '#fff8d8';
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = i*Math.PI/4;
    const radius = i%2 ? 4 : i%4 ? 22 : 14;
    ctx.lineTo(32+Math.cos(angle)*radius,32+Math.sin(angle)*radius);
  }
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class VillageLights {
  readonly group = new THREE.Group();
  private lanterns: THREE.Vector3[] = [];
  private closest: THREE.Vector3[] = [];
  private nextLightUpdate = 0;
  private wave: THREE.Vector3[] = [];
  private waveStart = -Infinity;
  private readonly pools = Array.from({length:2},() => new THREE.PointLight('#ffb96e',0,10,2));
  private readonly halos = this.pools.map(() => new THREE.Sprite(new THREE.SpriteMaterial({
    map:getSoftGlowTexture(),color:'#ffac65',transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
  })));
  private readonly sparks = Array.from({length:14},(_,i) => new THREE.Sprite(new THREE.SpriteMaterial({
    color:i%4 === 0 ? '#ffd8ac' : '#fff2ca',transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,
  })));

  constructor() {
    const spark = makeSparkTexture();
    for (const sprite of this.sparks) sprite.material.map = spark;
    for (const sprite of [...this.halos,...this.sparks]) sprite.visible = false;
    this.group.add(...this.pools,...this.halos,...this.sparks);
  }

  setLanterns(lanterns: THREE.Vector3[]): void {
    // Rematch a running wave to the refreshed map and drop anchors outside it.
    this.wave = this.wave.flatMap(anchor => {
      const current = lanterns.find(lantern => lantern.distanceToSquared(anchor) < 0.04);
      return current ? [current] : [];
    });
    this.lanterns = lanterns;
    this.nextLightUpdate = 0;
  }

  startWave(time: number, center: THREE.Vector3, heading: number): boolean {
    const x = Math.sin(heading), z = -Math.cos(heading);
    const candidates = this.lanterns.flatMap(anchor => {
      const along = (anchor.x-center.x)*x+(anchor.z-center.z)*z;
      const distance = anchor.distanceToSquared(center);
      return distance < 115**2 && along > -15 ? [{anchor,along,distance}] : [];
    });
    if (!candidates.length) return false;
    this.wave = candidates.sort((a,b) => a.distance-b.distance).slice(0,7)
      .sort((a,b) => a.along-b.along).map(entry => entry.anchor);
    this.waveStart = time;
    return true;
  }

  update(time: number, center: THREE.Vector3): void {
    if (time >= this.nextLightUpdate) {
      this.nextLightUpdate = time+0.24;
      this.closest = this.lanterns.map(anchor => ({anchor,distance:anchor.distanceToSquared(center)}))
        .filter(entry => entry.distance < 46**2).sort((a,b) => a.distance-b.distance)
        .slice(0,this.pools.length).map(entry => entry.anchor);
    }
    const age = time-this.waveStart;
    for (const [i,light] of this.pools.entries()) {
      const anchor = this.closest[i];
      const halo = this.halos[i];
      halo.visible = !!anchor;
      if (!anchor) {
        light.intensity = 0;
        continue;
      }
      const waveIndex = this.wave.indexOf(anchor);
      const local = age-waveIndex*0.54;
      const flare = waveIndex >= 0 && local >= 0 && local < 2 ? Math.sin(local*Math.PI/2) : 0;
      const flicker = Math.sin(time*5+i)*0.07+Math.sin(time*11+i*4)*0.045;
      light.position.copy(anchor);
      light.intensity = 10+flare*13+flicker*10;
      halo.position.copy(anchor);
      halo.scale.setScalar(1.85+flare*0.9);
      halo.material.opacity = 0.42+flare*0.29+flicker;
    }
    for (const [i,spark] of this.sparks.entries()) {
      const anchor = this.wave[Math.floor(i/2)];
      const phase = (age-Math.floor(i/2)*0.54-(i%2)*0.23)/2.2;
      spark.visible = !!anchor && phase >= 0 && phase < 1;
      if (!spark.visible) continue;
      const angle = i*2.4+phase*4;
      const radius = 0.2+phase*1.8;
      spark.position.copy(anchor);
      spark.position.x += Math.cos(angle)*radius;
      spark.position.z += Math.sin(angle)*radius;
      spark.position.y += 0.4+phase*4.8;
      const glow = Math.sin(Math.PI*phase);
      spark.scale.setScalar((0.65+i%3*0.23)+glow*0.50);
      spark.material.rotation = phase*0.8+i;
      spark.material.opacity = glow*0.88;
    }
  }
}

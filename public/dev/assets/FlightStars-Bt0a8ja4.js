var id=Object.defineProperty;var sd=(s,e,t)=>e in s?id(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var B=(s,e,t)=>sd(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Dl="170",vy={ROTATE:0,DOLLY:1,PAN:2},_y={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rd=0,sc=1,ad=2,Kh=1,od=2,Wn=3,Jn=0,Yt=1,Jt=2,jn=0,cs=1,Rt=2,rc=3,ac=4,ld=5,Ii=100,cd=101,hd=102,ud=103,dd=104,fd=200,pd=201,md=202,gd=203,Io=204,Do=205,xd=206,vd=207,_d=208,yd=209,Md=210,Sd=211,bd=212,wd=213,Td=214,No=0,Uo=1,Fo=2,fs=3,Oo=4,Bo=5,ko=6,zo=7,Yh=0,Ed=1,Ad=2,vi=0,jh=1,Zh=2,$h=3,Nl=4,Cd=5,Jh=6,Qh=7,oc="attached",Rd="detached",eu=300,ps=301,ms=302,Go=303,Ho=304,xa=306,Qn=1e3,mi=1001,la=1002,Qt=1003,tu=1004,qs=1005,ln=1006,ta=1007,Kn=1008,ei=1009,nu=1010,iu=1011,nr=1012,Ul=1013,Ui=1014,Mn=1015,Zn=1016,Fl=1017,Ol=1018,gs=1020,su=35902,ru=1021,au=1022,fn=1023,ou=1024,lu=1025,hs=1026,xs=1027,Bl=1028,kl=1029,cu=1030,zl=1031,Gl=1033,na=33776,ia=33777,sa=33778,ra=33779,Vo=35840,Wo=35841,Xo=35842,qo=35843,Ko=36196,Yo=37492,jo=37496,Zo=37808,$o=37809,Jo=37810,Qo=37811,el=37812,tl=37813,nl=37814,il=37815,sl=37816,rl=37817,al=37818,ol=37819,ll=37820,cl=37821,aa=36492,hl=36494,ul=36495,hu=36283,dl=36284,fl=36285,pl=36286,ir=2300,sr=2301,Ea=2302,lc=2400,cc=2401,hc=2402,Pd=2500,Ld=0,uu=1,ml=2,Id=3200,Dd=3201,du=0,Nd=1,pi="",dt="srgb",en="srgb-linear",va="linear",yt="srgb",zi=7680,uc=519,Ud=512,Fd=513,Od=514,fu=515,Bd=516,kd=517,zd=518,Gd=519,gl=35044,yy=35048,dc="300 es",Yn=2e3,ca=2001;class Bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fc=1234567;const $s=Math.PI/180,vs=180/Math.PI;function pn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[s&255]+Xt[s>>8&255]+Xt[s>>16&255]+Xt[s>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Ut(s,e,t){return Math.max(e,Math.min(t,s))}function Hl(s,e){return(s%e+e)%e}function Hd(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Vd(s,e,t){return s!==e?(t-s)/(e-s):0}function Js(s,e,t){return(1-t)*s+t*e}function Wd(s,e,t,n){return Js(s,e,1-Math.exp(-t*n))}function Xd(s,e=1){return e-Math.abs(Hl(s,e*2)-e)}function qd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Kd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Yd(s,e){return s+Math.floor(Math.random()*(e-s+1))}function jd(s,e){return s+Math.random()*(e-s)}function Zd(s){return s*(.5-Math.random())}function $d(s){s!==void 0&&(fc=s);let e=fc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Jd(s){return s*$s}function Qd(s){return s*vs}function ef(s){return(s&s-1)===0&&s!==0}function tf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function nf(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function sf(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*m,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*m,o*c);break;case"ZYZ":s.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Mt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const An={DEG2RAD:$s,RAD2DEG:vs,generateUUID:pn,clamp:Ut,euclideanModulo:Hl,mapLinear:Hd,inverseLerp:Vd,lerp:Js,damp:Wd,pingpong:Xd,smoothstep:qd,smootherstep:Kd,randInt:Yd,randFloat:jd,randFloatSpread:Zd,seededRandom:$d,degToRad:Jd,radToDeg:Qd,isPowerOfTwo:ef,ceilPowerOfTwo:tf,floorPowerOfTwo:nf,setQuaternionFromProperEuler:sf,normalize:Mt,denormalize:yn};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nt{constructor(e,t,n,i,r,a,o,l,c){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],x=i[0],g=i[3],p=i[6],y=i[1],_=i[4],v=i[7],A=i[2],S=i[5],C=i[8];return r[0]=a*x+o*y+l*A,r[3]=a*g+o*_+l*S,r[6]=a*p+o*v+l*C,r[1]=c*x+h*y+u*A,r[4]=c*g+h*_+u*S,r[7]=c*p+h*v+u*C,r[2]=d*x+f*y+m*A,r[5]=d*g+f*_+m*S,r[8]=d*p+f*v+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Aa.makeScale(e,t)),this}rotate(e){return this.premultiply(Aa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Aa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Aa=new nt;function pu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function rr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function rf(){const s=rr("canvas");return s.style.display="block",s}const pc={};function Ks(s){s in pc||(pc[s]=!0,console.warn(s))}function af(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function of(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function lf(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ut={enabled:!0,workingColorSpace:en,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===yt&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===yt&&(s.r=us(s.r),s.g=us(s.g),s.b=us(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pi?va:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function $n(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function us(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const mc=[.64,.33,.3,.6,.15,.06],gc=[.2126,.7152,.0722],xc=[.3127,.329],vc=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_c=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ut.define({[en]:{primaries:mc,whitePoint:xc,transfer:va,toXYZ:vc,fromXYZ:_c,luminanceCoefficients:gc,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:mc,whitePoint:xc,transfer:yt,toXYZ:vc,fromXYZ:_c,luminanceCoefficients:gc,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}});let Gi;class cf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=rr("canvas")),Gi.width=e.width,Gi.height=e.height;const n=Gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor($n(t[n]/255)*255):t[n]=$n(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hf=0;class mu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=pn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ca(i[a].image)):r.push(Ca(i[a]))}else r=Ca(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ca(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?cf.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let uf=0;class Bt extends Bi{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=mi,i=mi,r=ln,a=Kn,o=fn,l=ei,c=Bt.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=pn(),this.name="",this.source=new mu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qn:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case la:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qn:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case la:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=eu;Bt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,i=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,v=(f+1)/2,A=(p+1)/2,S=(h+d)/4,C=(u+x)/4,L=(m+g)/4;return _>v&&_>A?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=S/n,r=C/n):v>A?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=S/i,r=L/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=C/r,i=L/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class df extends Bi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Bt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new mu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends df{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class gu extends Bt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ff extends Bt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],m=r[a+2],x=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==m){let g=1-o;const p=l*d+c*f+h*m+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const A=Math.sqrt(_),S=Math.atan2(A,p*y);g=Math.sin(g*S)/A,o=Math.sin(o*S)/A}const v=o*y;if(l=l*g+d*v,c=c*g+f*v,h=h*g+m*v,u=u*g+x*v,g===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-o*f,e[t+2]=c*m+h*f+o*d-l*u,e[t+3]=h*m-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ra.copy(this).projectOnVector(e),this.sub(Ra)}reflect(e){return this.sub(Ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ra=new E,yc=new yi;class Ln{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Is),gr.subVectors(this.max,Is),Hi.subVectors(e.a,Is),Vi.subVectors(e.b,Is),Wi.subVectors(e.c,Is),oi.subVectors(Vi,Hi),li.subVectors(Wi,Vi),bi.subVectors(Hi,Wi);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-bi.z,bi.y,oi.z,0,-oi.x,li.z,0,-li.x,bi.z,0,-bi.x,-oi.y,oi.x,0,-li.y,li.x,0,-bi.y,bi.x,0];return!Pa(t,Hi,Vi,Wi,gr)||(t=[1,0,0,0,1,0,0,0,1],!Pa(t,Hi,Vi,Wi,gr))?!1:(xr.crossVectors(oi,li),t=[xr.x,xr.y,xr.z],Pa(t,Hi,Vi,Wi,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const On=[new E,new E,new E,new E,new E,new E,new E,new E],xn=new E,mr=new Ln,Hi=new E,Vi=new E,Wi=new E,oi=new E,li=new E,bi=new E,Is=new E,gr=new E,xr=new E,wi=new E;function Pa(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){wi.fromArray(s,r);const o=i.x*Math.abs(wi.x)+i.y*Math.abs(wi.y)+i.z*Math.abs(wi.z),l=e.dot(wi),c=t.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const pf=new Ln,Ds=new E,La=new E;class In{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):pf.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);const t=Ds.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ds,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(La.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(La)),this.expandByPoint(Ds.copy(e.center).sub(La))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new E,Ia=new E,vr=new E,ci=new E,Da=new E,_r=new E,Na=new E;class _a{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ia.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(Ia);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vr),o=ci.dot(this.direction),l=-ci.dot(vr),c=ci.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ia).addScaledVector(vr,d),f}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),i=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,i,r){Da.subVectors(t,e),_r.subVectors(n,e),Na.crossVectors(Da,_r);let a=this.direction.dot(Na),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(_r.crossVectors(ci,_r));if(l<0)return null;const c=o*this.direction.dot(Da.cross(ci));if(c<0||l+c>a)return null;const h=-o*ci.dot(Na);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,m,x,g){et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,m,x,g)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,m,x,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Xi.setFromMatrixColumn(e,0).length(),r=1/Xi.setFromMatrixColumn(e,1).length(),a=1/Xi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,m=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,m=o*h,x=o*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-x*u}else if(e.order==="XZY"){const d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mf,e,gf)}lookAt(e,t,n){const i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),hi.crossVectors(n,an),hi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),hi.crossVectors(n,an)),hi.normalize(),yr.crossVectors(an,hi),i[0]=hi.x,i[4]=yr.x,i[8]=an.x,i[1]=hi.y,i[5]=yr.y,i[9]=an.y,i[2]=hi.z,i[6]=yr.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],y=n[3],_=n[7],v=n[11],A=n[15],S=i[0],C=i[4],L=i[8],b=i[12],M=i[1],I=i[5],H=i[9],F=i[13],O=i[2],Y=i[6],V=i[10],J=i[14],G=i[3],N=i[7],W=i[11],j=i[15];return r[0]=a*S+o*M+l*O+c*G,r[4]=a*C+o*I+l*Y+c*N,r[8]=a*L+o*H+l*V+c*W,r[12]=a*b+o*F+l*J+c*j,r[1]=h*S+u*M+d*O+f*G,r[5]=h*C+u*I+d*Y+f*N,r[9]=h*L+u*H+d*V+f*W,r[13]=h*b+u*F+d*J+f*j,r[2]=m*S+x*M+g*O+p*G,r[6]=m*C+x*I+g*Y+p*N,r[10]=m*L+x*H+g*V+p*W,r[14]=m*b+x*F+g*J+p*j,r[3]=y*S+_*M+v*O+A*G,r[7]=y*C+_*I+v*Y+A*N,r[11]=y*L+_*H+v*V+A*W,r[15]=y*b+_*F+v*J+A*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+x*(+t*l*f-t*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+g*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],y=u*g*c-x*d*c+x*l*f-o*g*f-u*l*p+o*d*p,_=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,v=h*x*c-m*u*c+m*o*f-a*x*f-h*o*p+a*u*p,A=m*u*l-h*x*l-m*o*d+a*x*d+h*o*g-a*u*g,S=t*y+n*_+i*v+r*A;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/S;return e[0]=y*C,e[1]=(x*d*r-u*g*r-x*i*f+n*g*f+u*i*p-n*d*p)*C,e[2]=(o*g*r-x*l*r+x*i*c-n*g*c-o*i*p+n*l*p)*C,e[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*C,e[4]=_*C,e[5]=(h*g*r-m*d*r+m*i*f-t*g*f-h*i*p+t*d*p)*C,e[6]=(m*l*r-a*g*r-m*i*c+t*g*c+a*i*p-t*l*p)*C,e[7]=(a*d*r-h*l*r+h*i*c-t*d*c-a*i*f+t*l*f)*C,e[8]=v*C,e[9]=(m*u*r-h*x*r-m*n*f+t*x*f+h*n*p-t*u*p)*C,e[10]=(a*x*r-m*o*r+m*n*c-t*x*c-a*n*p+t*o*p)*C,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*C,e[12]=A*C,e[13]=(h*x*i-m*u*i+m*n*d-t*x*d-h*n*g+t*u*g)*C,e[14]=(m*o*i-a*x*i-m*n*l+t*x*l+a*n*g-t*o*g)*C,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,m=r*u,x=a*h,g=a*u,p=o*u,y=l*c,_=l*h,v=l*u,A=n.x,S=n.y,C=n.z;return i[0]=(1-(x+p))*A,i[1]=(f+v)*A,i[2]=(m-_)*A,i[3]=0,i[4]=(f-v)*S,i[5]=(1-(d+p))*S,i[6]=(g+y)*S,i[7]=0,i[8]=(m+_)*C,i[9]=(g-y)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Xi.set(i[0],i[1],i[2]).length();const a=Xi.set(i[4],i[5],i[6]).length(),o=Xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],vn.copy(this);const c=1/r,h=1/a,u=1/o;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,t.setFromRotationMatrix(vn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Yn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,m;if(o===Yn)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===ca)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Yn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-r),d=(t+e)*c,f=(n+i)*h;let m,x;if(o===Yn)m=(a+r)*u,x=-2*u;else if(o===ca)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xi=new E,vn=new et,mf=new E(0,0,0),gf=new E(1,1,1),hi=new E,yr=new E,an=new E,Mc=new et,Sc=new yi;class Cn{constructor(e=0,t=0,n=0,i=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sc.setFromEuler(this),this.setFromQuaternion(Sc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class xu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xf=0;const bc=new E,qi=new yi,kn=new et,Mr=new E,Ns=new E,vf=new E,_f=new yi,wc=new E(1,0,0),Tc=new E(0,1,0),Ec=new E(0,0,1),Ac={type:"added"},yf={type:"removed"},Ki={type:"childadded",child:null},Ua={type:"childremoved",child:null};class At extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new E,t=new Cn,n=new yi,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new et},normalMatrix:{value:new nt}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(wc,e)}rotateY(e){return this.rotateOnAxis(Tc,e)}rotateZ(e){return this.rotateOnAxis(Ec,e)}translateOnAxis(e,t){return bc.copy(e).applyQuaternion(this.quaternion),this.position.add(bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wc,e)}translateY(e){return this.translateOnAxis(Tc,e)}translateZ(e){return this.translateOnAxis(Ec,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mr.copy(e):Mr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Ns,Mr,this.up):kn.lookAt(Mr,Ns,this.up),this.quaternion.setFromRotationMatrix(kn),i&&(kn.extractRotation(i.matrixWorld),qi.setFromRotationMatrix(kn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ac),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yf),Ua.child=e,this.dispatchEvent(Ua),Ua.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ac),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,vf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,_f,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}At.DEFAULT_UP=new E(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new E,zn=new E,Fa=new E,Gn=new E,Yi=new E,ji=new E,Cc=new E,Oa=new E,Ba=new E,ka=new E,za=new gt,Ga=new gt,Ha=new gt;class dn{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),_n.subVectors(e,t),i.cross(_n);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){_n.subVectors(i,t),zn.subVectors(n,t),Fa.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(zn),l=_n.dot(Fa),c=zn.dot(zn),h=zn.dot(Fa),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gn.x),l.addScaledVector(a,Gn.y),l.addScaledVector(o,Gn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return za.setScalar(0),Ga.setScalar(0),Ha.setScalar(0),za.fromBufferAttribute(e,t),Ga.fromBufferAttribute(e,n),Ha.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(za,r.x),a.addScaledVector(Ga,r.y),a.addScaledVector(Ha,r.z),a}static isFrontFacing(e,t,n,i){return _n.subVectors(n,t),zn.subVectors(e,t),_n.cross(zn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),_n.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Yi.subVectors(i,n),ji.subVectors(r,n),Oa.subVectors(e,n);const l=Yi.dot(Oa),c=ji.dot(Oa);if(l<=0&&c<=0)return t.copy(n);Ba.subVectors(e,i);const h=Yi.dot(Ba),u=ji.dot(Ba);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Yi,a);ka.subVectors(e,r);const f=Yi.dot(ka),m=ji.dot(ka);if(m>=0&&f<=m)return t.copy(r);const x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(ji,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Cc.subVectors(r,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Cc,o);const p=1/(g+x+d);return a=x*p,o=d*p,t.copy(n).addScaledVector(Yi,a).addScaledVector(ji,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Sr={h:0,s:0,l:0};function Va(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ut.workingColorSpace){return this.r=e,this.g=t,this.b=n,ut.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ut.workingColorSpace){if(e=Hl(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Va(a,r,e+1/3),this.g=Va(a,r,e),this.b=Va(a,r,e-1/3)}return ut.toWorkingColorSpace(this,i),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){const n=vu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=us(e.r),this.g=us(e.g),this.b=us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return ut.fromWorkingColorSpace(qt.copy(this),e),Math.round(Ut(qt.r*255,0,255))*65536+Math.round(Ut(qt.g*255,0,255))*256+Math.round(Ut(qt.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(qt.copy(this),t);const n=qt.r,i=qt.g,r=qt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=dt){ut.fromWorkingColorSpace(qt.copy(this),e);const t=qt.r,n=qt.g,i=qt.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Sr);const n=Js(ui.h,Sr.h,t),i=Js(ui.s,Sr.s,t),r=Js(ui.l,Sr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const qt=new Ue;Ue.NAMES=vu;let Mf=0;class bn extends Bi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=pn(),this.name="",this.blending=cs,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Do,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==cs&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Do&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ke extends bn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Yh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new E,br=new ne;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gl,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gl&&(e.usage=this.usage),e}}class _u extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class yu extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class je extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Sf=0;const hn=new et,Wa=new At,Zi=new E,on=new Ln,Us=new Ln,Gt=new E;class _t extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pu(e)?yu:_u)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new nt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Wa.lookAt(e),Wa.updateMatrix(),this.applyMatrix4(Wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new je(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(on.min,Us.min),on.expandByPoint(Gt),Gt.addVectors(on.max,Us.max),on.expandByPoint(Gt)):(on.expandByPoint(Us.min),on.expandByPoint(Us.max))}on.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Gt.fromBufferAttribute(o,c),l&&(Zi.fromBufferAttribute(e,c),Gt.add(Zi)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new E,l[L]=new E;const c=new E,h=new E,u=new E,d=new ne,f=new ne,m=new ne,x=new E,g=new E;function p(L,b,M){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,L),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),o[L].add(x),o[b].add(x),o[M].add(x),l[L].add(g),l[b].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let L=0,b=y.length;L<b;++L){const M=y[L],I=M.start,H=M.count;for(let F=I,O=I+H;F<O;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const _=new E,v=new E,A=new E,S=new E;function C(L){A.fromBufferAttribute(i,L),S.copy(A);const b=o[L];_.copy(b),_.sub(A.multiplyScalar(A.dot(b))).normalize(),v.crossVectors(S,b);const I=v.dot(l[L])<0?-1:1;a.setXYZW(L,_.x,_.y,_.z,I)}for(let L=0,b=y.length;L<b;++L){const M=y[L],I=M.start,H=M.count;for(let F=I,O=I+H;F<O;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Ft(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rc=new et,Ti=new _a,wr=new In,Pc=new E,Tr=new E,Er=new E,Ar=new E,Xa=new E,Cr=new E,Lc=new E,Rr=new E;class R extends At{constructor(e=new _t,t=new ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Xa.fromBufferAttribute(u,e),a?Cr.addScaledVector(Xa,h):Cr.addScaledVector(Xa.sub(t),h))}t.add(Cr)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(r),Ti.copy(e.ray).recast(e.near),!(wr.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(wr,Pc)===null||Ti.origin.distanceToSquared(Pc)>(e.far-e.near)**2))&&(Rc.copy(r).invert(),Ti.copy(e.ray).applyMatrix4(Rc),!(n.boundingBox!==null&&Ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ti)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=_;v<A;v+=3){const S=o.getX(v),C=o.getX(v+1),L=o.getX(v+2);i=Pr(this,p,e,n,c,h,u,S,C,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const y=o.getX(g),_=o.getX(g+1),v=o.getX(g+2);i=Pr(this,a,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=_;v<A;v+=3){const S=v,C=v+1,L=v+2;i=Pr(this,p,e,n,c,h,u,S,C,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const y=g,_=g+1,v=g+2;i=Pr(this,a,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function bf(s,e,t,n,i,r,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Jn,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:s}}function Pr(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Tr),s.getVertexPosition(l,Er),s.getVertexPosition(c,Ar);const h=bf(s,e,t,n,Tr,Er,Ar,Lc);if(h){const u=new E;dn.getBarycoord(Lc,Tr,Er,Ar,u),i&&(h.uv=dn.getInterpolatedAttribute(i,o,l,c,u,new ne)),r&&(h.uv1=dn.getInterpolatedAttribute(r,o,l,c,u,new ne)),a&&(h.normal=dn.getInterpolatedAttribute(a,o,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new E,materialIndex:0};dn.getNormal(Tr,Er,Ar,d.normal),h.face=d,h.barycoord=u}return h}class Se extends _t{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(u,2));function m(x,g,p,y,_,v,A,S,C,L,b){const M=v/C,I=A/L,H=v/2,F=A/2,O=S/2,Y=C+1,V=L+1;let J=0,G=0;const N=new E;for(let W=0;W<V;W++){const j=W*I-F;for(let ce=0;ce<Y;ce++){const ze=ce*M-H;N[x]=ze*y,N[g]=j*_,N[p]=O,c.push(N.x,N.y,N.z),N[x]=0,N[g]=0,N[p]=S>0?1:-1,h.push(N.x,N.y,N.z),u.push(ce/C),u.push(1-W/L),J+=1}}for(let W=0;W<L;W++)for(let j=0;j<C;j++){const ce=d+j+Y*W,ze=d+j+Y*(W+1),Z=d+(j+1)+Y*(W+1),ae=d+(j+1)+Y*W;l.push(ce,ze,ae),l.push(ze,Z,ae),G+=6}o.addGroup(f,G,b),f+=G,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Se(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _s(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Zt(s){const e={};for(let t=0;t<s.length;t++){const n=_s(s[t]);for(const i in n)e[i]=n[i]}return e}function wf(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Mu(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ut.workingColorSpace}const ar={clone:_s,merge:Zt};var Tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ef=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends bn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tf,this.fragmentShader=Ef,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=wf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Su extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=Yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new E,Ic=new ne,Dc=new ne;class $t extends Su{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vs*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,Ic,Dc),t.subVectors(Dc,Ic)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $i=-90,Ji=1;class Af extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $t($i,Ji,e,t);i.layers=this.layers,this.add(i);const r=new $t($i,Ji,e,t);r.layers=this.layers,this.add(r);const a=new $t($i,Ji,e,t);a.layers=this.layers,this.add(a);const o=new $t($i,Ji,e,t);o.layers=this.layers,this.add(o);const l=new $t($i,Ji,e,t);l.layers=this.layers,this.add(l);const c=new $t($i,Ji,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Yn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ca)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class bu extends Bt{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ps,super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cf extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new bu(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Se(5,5,5),r=new Ht({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:jn});r.uniforms.tEquirect.value=t;const a=new R(i,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=ln),new Af(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const qa=new E,Rf=new E,Pf=new nt;class Pi{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=qa.subVectors(n,t).cross(Rf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(qa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Pf.getNormalMatrix(e),i=this.coplanarPoint(qa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new In,Lr=new E;class Vl{constructor(e=new Pi,t=new Pi,n=new Pi,i=new Pi,r=new Pi,a=new Pi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],x=i[10],g=i[11],p=i[12],y=i[13],_=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,g-f,v-p).normalize(),n[1].setComponents(l+r,d+c,g+f,v+p).normalize(),n[2].setComponents(l+a,d+h,g+m,v+y).normalize(),n[3].setComponents(l-a,d-h,g-m,v-y).normalize(),n[4].setComponents(l-o,d-u,g-x,v-_).normalize(),t===Yn)n[5].setComponents(l+o,d+u,g+x,v+_).normalize();else if(t===ca)n[5].setComponents(o,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Lr.x=i.normal.x>0?e.max.x:e.min.x,Lr.y=i.normal.y>0?e.max.y:e.min.y,Lr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wu(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Lf(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],x=u[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}class tn extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const y=p*d-a;for(let _=0;_<c;_++){const v=_*u-r;m.push(v,-y,0),x.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const _=y+c*p,v=y+c*(p+1),A=y+1+c*(p+1),S=y+1+c*p;f.push(_,v,S),f.push(v,A,S)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tn(e.width,e.height,e.widthSegments,e.heightSegments)}}var If=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Df=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ff=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Of=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Gf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,tp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,np=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ip=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,op=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_p=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ap=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ip=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Np=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Up=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Op=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,em=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,im=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,am=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,um=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,pm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,mm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,gm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ym=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Em=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Im=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Bm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,km=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ym=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Qm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,n0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,a0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,c0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:If,alphahash_pars_fragment:Df,alphamap_fragment:Nf,alphamap_pars_fragment:Uf,alphatest_fragment:Ff,alphatest_pars_fragment:Of,aomap_fragment:Bf,aomap_pars_fragment:kf,batching_pars_vertex:zf,batching_vertex:Gf,begin_vertex:Hf,beginnormal_vertex:Vf,bsdfs:Wf,iridescence_fragment:Xf,bumpmap_pars_fragment:qf,clipping_planes_fragment:Kf,clipping_planes_pars_fragment:Yf,clipping_planes_pars_vertex:jf,clipping_planes_vertex:Zf,color_fragment:$f,color_pars_fragment:Jf,color_pars_vertex:Qf,color_vertex:ep,common:tp,cube_uv_reflection_fragment:np,defaultnormal_vertex:ip,displacementmap_pars_vertex:sp,displacementmap_vertex:rp,emissivemap_fragment:ap,emissivemap_pars_fragment:op,colorspace_fragment:lp,colorspace_pars_fragment:cp,envmap_fragment:hp,envmap_common_pars_fragment:up,envmap_pars_fragment:dp,envmap_pars_vertex:fp,envmap_physical_pars_fragment:wp,envmap_vertex:pp,fog_vertex:mp,fog_pars_vertex:gp,fog_fragment:xp,fog_pars_fragment:vp,gradientmap_pars_fragment:_p,lightmap_pars_fragment:yp,lights_lambert_fragment:Mp,lights_lambert_pars_fragment:Sp,lights_pars_begin:bp,lights_toon_fragment:Tp,lights_toon_pars_fragment:Ep,lights_phong_fragment:Ap,lights_phong_pars_fragment:Cp,lights_physical_fragment:Rp,lights_physical_pars_fragment:Pp,lights_fragment_begin:Lp,lights_fragment_maps:Ip,lights_fragment_end:Dp,logdepthbuf_fragment:Np,logdepthbuf_pars_fragment:Up,logdepthbuf_pars_vertex:Fp,logdepthbuf_vertex:Op,map_fragment:Bp,map_pars_fragment:kp,map_particle_fragment:zp,map_particle_pars_fragment:Gp,metalnessmap_fragment:Hp,metalnessmap_pars_fragment:Vp,morphinstance_vertex:Wp,morphcolor_vertex:Xp,morphnormal_vertex:qp,morphtarget_pars_vertex:Kp,morphtarget_vertex:Yp,normal_fragment_begin:jp,normal_fragment_maps:Zp,normal_pars_fragment:$p,normal_pars_vertex:Jp,normal_vertex:Qp,normalmap_pars_fragment:em,clearcoat_normal_fragment_begin:tm,clearcoat_normal_fragment_maps:nm,clearcoat_pars_fragment:im,iridescence_pars_fragment:sm,opaque_fragment:rm,packing:am,premultiplied_alpha_fragment:om,project_vertex:lm,dithering_fragment:cm,dithering_pars_fragment:hm,roughnessmap_fragment:um,roughnessmap_pars_fragment:dm,shadowmap_pars_fragment:fm,shadowmap_pars_vertex:pm,shadowmap_vertex:mm,shadowmask_pars_fragment:gm,skinbase_vertex:xm,skinning_pars_vertex:vm,skinning_vertex:_m,skinnormal_vertex:ym,specularmap_fragment:Mm,specularmap_pars_fragment:Sm,tonemapping_fragment:bm,tonemapping_pars_fragment:wm,transmission_fragment:Tm,transmission_pars_fragment:Em,uv_pars_fragment:Am,uv_pars_vertex:Cm,uv_vertex:Rm,worldpos_vertex:Pm,background_vert:Lm,background_frag:Im,backgroundCube_vert:Dm,backgroundCube_frag:Nm,cube_vert:Um,cube_frag:Fm,depth_vert:Om,depth_frag:Bm,distanceRGBA_vert:km,distanceRGBA_frag:zm,equirect_vert:Gm,equirect_frag:Hm,linedashed_vert:Vm,linedashed_frag:Wm,meshbasic_vert:Xm,meshbasic_frag:qm,meshlambert_vert:Km,meshlambert_frag:Ym,meshmatcap_vert:jm,meshmatcap_frag:Zm,meshnormal_vert:$m,meshnormal_frag:Jm,meshphong_vert:Qm,meshphong_frag:e0,meshphysical_vert:t0,meshphysical_frag:n0,meshtoon_vert:i0,meshtoon_frag:s0,points_vert:r0,points_frag:a0,shadow_vert:o0,shadow_frag:l0,sprite_vert:c0,sprite_frag:h0},ye={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},En={basic:{uniforms:Zt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:Zt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ue(0)}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:Zt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:Zt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:Zt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ue(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:Zt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:Zt([ye.points,ye.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:Zt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:Zt([ye.common,ye.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:Zt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:Zt([ye.sprite,ye.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distanceRGBA:{uniforms:Zt([ye.common,ye.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distanceRGBA_vert,fragmentShader:it.distanceRGBA_frag},shadow:{uniforms:Zt([ye.lights,ye.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};En.physical={uniforms:Zt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const Ir={r:0,b:0,g:0},Ai=new Cn,u0=new et;function d0(s,e,t,n,i,r,a){const o=new Ue(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function x(y){let _=!1;const v=m(y);v===null?p(o,l):v&&v.isColor&&(p(v,1),_=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(y,_){const v=m(_);v&&(v.isCubeTexture||v.mapping===xa)?(h===void 0&&(h=new R(new Se(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:_s(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ai.copy(_.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(u0.makeRotationFromEuler(Ai)),h.material.toneMapped=ut.getTransfer(v.colorSpace)!==yt,(u!==v||d!==v.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new R(new tn(2,2),new Ht({name:"BackgroundMaterial",uniforms:_s(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ut.getTransfer(v.colorSpace)!==yt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Ir,Mu(s)),n.buffers.color.setClear(Ir.r,Ir.g,Ir.b,_,a)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),l=_,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:x,addToRenderList:g}}function f0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(M,I,H,F,O){let Y=!1;const V=u(F,H,I);r!==V&&(r=V,c(r.object)),Y=f(M,F,H,O),Y&&m(M,F,H,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,v(M,I,H,F),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,I,H){const F=H.wireframe===!0;let O=n[M.id];O===void 0&&(O={},n[M.id]=O);let Y=O[I.id];Y===void 0&&(Y={},O[I.id]=Y);let V=Y[F];return V===void 0&&(V=d(l()),Y[F]=V),V}function d(M){const I=[],H=[],F=[];for(let O=0;O<t;O++)I[O]=0,H[O]=0,F[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:F,object:M,attributes:{},index:null}}function f(M,I,H,F){const O=r.attributes,Y=I.attributes;let V=0;const J=H.getAttributes();for(const G in J)if(J[G].location>=0){const W=O[G];let j=Y[G];if(j===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(j=M.instanceColor)),W===void 0||W.attribute!==j||j&&W.data!==j.data)return!0;V++}return r.attributesNum!==V||r.index!==F}function m(M,I,H,F){const O={},Y=I.attributes;let V=0;const J=H.getAttributes();for(const G in J)if(J[G].location>=0){let W=Y[G];W===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(W=M.instanceColor));const j={};j.attribute=W,W&&W.data&&(j.data=W.data),O[G]=j,V++}r.attributes=O,r.attributesNum=V,r.index=F}function x(){const M=r.newAttributes;for(let I=0,H=M.length;I<H;I++)M[I]=0}function g(M){p(M,0)}function p(M,I){const H=r.newAttributes,F=r.enabledAttributes,O=r.attributeDivisors;H[M]=1,F[M]===0&&(s.enableVertexAttribArray(M),F[M]=1),O[M]!==I&&(s.vertexAttribDivisor(M,I),O[M]=I)}function y(){const M=r.newAttributes,I=r.enabledAttributes;for(let H=0,F=I.length;H<F;H++)I[H]!==M[H]&&(s.disableVertexAttribArray(H),I[H]=0)}function _(M,I,H,F,O,Y,V){V===!0?s.vertexAttribIPointer(M,I,H,O,Y):s.vertexAttribPointer(M,I,H,F,O,Y)}function v(M,I,H,F){x();const O=F.attributes,Y=H.getAttributes(),V=I.defaultAttributeValues;for(const J in Y){const G=Y[J];if(G.location>=0){let N=O[J];if(N===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(N=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(N=M.instanceColor)),N!==void 0){const W=N.normalized,j=N.itemSize,ce=e.get(N);if(ce===void 0)continue;const ze=ce.buffer,Z=ce.type,ae=ce.bytesPerElement,Ie=Z===s.INT||Z===s.UNSIGNED_INT||N.gpuType===Ul;if(N.isInterleavedBufferAttribute){const pe=N.data,Be=pe.stride,Ke=N.offset;if(pe.isInstancedInterleavedBuffer){for(let We=0;We<G.locationSize;We++)p(G.location+We,pe.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let We=0;We<G.locationSize;We++)g(G.location+We);s.bindBuffer(s.ARRAY_BUFFER,ze);for(let We=0;We<G.locationSize;We++)_(G.location+We,j/G.locationSize,Z,W,Be*ae,(Ke+j/G.locationSize*We)*ae,Ie)}else{if(N.isInstancedBufferAttribute){for(let pe=0;pe<G.locationSize;pe++)p(G.location+pe,N.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let pe=0;pe<G.locationSize;pe++)g(G.location+pe);s.bindBuffer(s.ARRAY_BUFFER,ze);for(let pe=0;pe<G.locationSize;pe++)_(G.location+pe,j/G.locationSize,Z,W,j*ae,j/G.locationSize*pe*ae,Ie)}}else if(V!==void 0){const W=V[J];if(W!==void 0)switch(W.length){case 2:s.vertexAttrib2fv(G.location,W);break;case 3:s.vertexAttrib3fv(G.location,W);break;case 4:s.vertexAttrib4fv(G.location,W);break;default:s.vertexAttrib1fv(G.location,W)}}}}y()}function A(){L();for(const M in n){const I=n[M];for(const H in I){const F=I[H];for(const O in F)h(F[O].object),delete F[O];delete I[H]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const H in I){const F=I[H];for(const O in F)h(F[O].object),delete F[O];delete I[H]}delete n[M.id]}function C(M){for(const I in n){const H=n[I];if(H[M.id]===void 0)continue;const F=H[M.id];for(const O in F)h(F[O].object),delete F[O];delete H[M.id]}}function L(){b(),a=!0,r!==i&&(r=i,c(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function p0(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*d[x];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function m0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(C){return!(C!==fn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const L=C===Zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==ei&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Mn&&!L)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),_=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,S=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:A,maxSamples:S}}function g0(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Pi,o=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,_=y*4;let v=p.clippingState||null;l.value=v,v=h(m,d,_,f);for(let A=0;A!==_;++A)v[A]=t[A];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,v=f;_!==x;++_,v+=4)a.copy(u[_]).applyMatrix4(y,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function x0(s){let e=new WeakMap;function t(a,o){return o===Go?a.mapping=ps:o===Ho&&(a.mapping=ms),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Go||o===Ho)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Cf(l.height);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ya extends Su{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const os=4,Nc=[.125,.215,.35,.446,.526,.582],Di=20,Ka=new ya,Uc=new Ue;let Ya=null,ja=0,Za=0,$a=!1;const Li=(1+Math.sqrt(5))/2,Qi=1/Li,Fc=[new E(-Li,Qi,0),new E(Li,Qi,0),new E(-Qi,0,Li),new E(Qi,0,Li),new E(0,Li,-Qi),new E(0,Li,Qi),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ya=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ya,ja,Za),this._renderer.xr.enabled=$a,e.scissorTest=!1,Dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ps||e.mapping===ms?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ya=this._renderer.getRenderTarget(),ja=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Zn,format:fn,colorSpace:en,depthBuffer:!1},i=Oc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=v0(r)),this._blurMaterial=_0(r,e,t)}return i}_compileMaterial(e){const t=new R(this._lodPlanes[0],e);this._renderer.compile(t,Ka)}_sceneToCubeUV(e,t,n,i){const o=new $t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Uc),h.toneMapping=vi,h.autoClear=!1;const f=new ke({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),m=new R(new Se,f);let x=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,x=!0):(f.color.copy(Uc),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):y===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const _=this._cubeSize;Dr(i,y*_,p>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ps||e.mapping===ms;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new R(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Fc[(i-r-1)%Fc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new R(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):Di;g>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Di}`);const p=[];let y=0;for(let C=0;C<Di;++C){const L=C/x,b=Math.exp(-L*L/2);p.push(b),C===0?y+=b:C<g&&(y+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=m,d.mipInt.value=_-n;const v=this._sizeLods[i],A=3*v*(i>_-os?i-_+os:0),S=4*(this._cubeSize-v);Dr(t,A,S,3*v,2*v),l.setRenderTarget(t),l.render(u,Ka)}}function v0(s){const e=[],t=[],n=[];let i=s;const r=s-os+1+Nc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-os?l=Nc[a-s+os-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*f),_=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let S=0;S<f;S++){const C=S%3*2/3-1,L=S>2?0:-1,b=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];y.set(b,x*m*S),_.set(d,g*m*S);const M=[S,S,S,S,S,S];v.set(M,p*m*S)}const A=new _t;A.setAttribute("position",new Ft(y,x)),A.setAttribute("uv",new Ft(_,g)),A.setAttribute("faceIndex",new Ft(v,p)),e.push(A),i>os&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Oc(s,e,t){const n=new Sn(s,e,t);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function _0(s,e,t){const n=new Float32Array(Di),i=new E(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Bc(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function kc(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function y0(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Go||l===Ho,h=l===ps||l===ms;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new xl(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new xl(s)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function M0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ks("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function S0(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const x=d.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)e.update(d[m],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const x=f[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,m=u.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let _=0,v=y.length;_<v;_+=3){const A=y[_+0],S=y[_+1],C=y[_+2];d.push(A,S,S,C,C,A)}}else if(m!==void 0){const y=m.array;x=m.version;for(let _=0,v=y.length/3-1;_<v;_+=3){const A=_+0,S=_+1,C=_+2;d.push(A,S,S,C,C,A)}}else return;const g=new(pu(d)?yu:_u)(d,1);g.version=x;const p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function b0(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,x){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*x[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function w0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function T0(s,e,t){const n=new WeakMap,i=new gt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let v=o.attributes.position.count*_,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const S=new Float32Array(v*A*4*u),C=new gu(S,v,A,u);C.type=Mn,C.needsUpdate=!0;const L=_*4;for(let M=0;M<u;M++){const I=g[M],H=p[M],F=y[M],O=v*A*4*M;for(let Y=0;Y<I.count;Y++){const V=Y*L;f===!0&&(i.fromBufferAttribute(I,Y),S[O+V+0]=i.x,S[O+V+1]=i.y,S[O+V+2]=i.z,S[O+V+3]=0),m===!0&&(i.fromBufferAttribute(H,Y),S[O+V+4]=i.x,S[O+V+5]=i.y,S[O+V+6]=i.z,S[O+V+7]=0),x===!0&&(i.fromBufferAttribute(F,Y),S[O+V+8]=i.x,S[O+V+9]=i.y,S[O+V+10]=i.z,S[O+V+11]=F.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new ne(v,A)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function E0(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Tu extends Bt{constructor(e,t,n,i,r,a,o,l,c,h=hs){if(h!==hs&&h!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===hs&&(n=Ui),n===void 0&&h===xs&&(n=gs),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Qt,this.minFilter=l!==void 0?l:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Eu=new Bt,zc=new Tu(1,1),Au=new gu,Cu=new ff,Ru=new bu,Gc=[],Hc=[],Vc=new Float32Array(16),Wc=new Float32Array(9),Xc=new Float32Array(4);function Ts(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Gc[i];if(r===void 0&&(r=new Float32Array(i),Gc[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function kt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ma(s,e){let t=Hc[e];t===void 0&&(t=new Int32Array(e),Hc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function A0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function C0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2fv(this.addr,e),zt(t,e)}}function R0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;s.uniform3fv(this.addr,e),zt(t,e)}}function P0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4fv(this.addr,e),zt(t,e)}}function L0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Xc.set(n),s.uniformMatrix2fv(this.addr,!1,Xc),zt(t,n)}}function I0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Wc.set(n),s.uniformMatrix3fv(this.addr,!1,Wc),zt(t,n)}}function D0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Vc.set(n),s.uniformMatrix4fv(this.addr,!1,Vc),zt(t,n)}}function N0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function U0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2iv(this.addr,e),zt(t,e)}}function F0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;s.uniform3iv(this.addr,e),zt(t,e)}}function O0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4iv(this.addr,e),zt(t,e)}}function B0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function k0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2uiv(this.addr,e),zt(t,e)}}function z0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;s.uniform3uiv(this.addr,e),zt(t,e)}}function G0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4uiv(this.addr,e),zt(t,e)}}function H0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(zc.compareFunction=fu,r=zc):r=Eu,t.setTexture2D(e||r,i)}function V0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cu,i)}function W0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ru,i)}function X0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Au,i)}function q0(s){switch(s){case 5126:return A0;case 35664:return C0;case 35665:return R0;case 35666:return P0;case 35674:return L0;case 35675:return I0;case 35676:return D0;case 5124:case 35670:return N0;case 35667:case 35671:return U0;case 35668:case 35672:return F0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return k0;case 36295:return z0;case 36296:return G0;case 35678:case 36198:case 36298:case 36306:case 35682:return H0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return W0;case 36289:case 36303:case 36311:case 36292:return X0}}function K0(s,e){s.uniform1fv(this.addr,e)}function Y0(s,e){const t=Ts(e,this.size,2);s.uniform2fv(this.addr,t)}function j0(s,e){const t=Ts(e,this.size,3);s.uniform3fv(this.addr,t)}function Z0(s,e){const t=Ts(e,this.size,4);s.uniform4fv(this.addr,t)}function $0(s,e){const t=Ts(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function J0(s,e){const t=Ts(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Q0(s,e){const t=Ts(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function eg(s,e){s.uniform1iv(this.addr,e)}function tg(s,e){s.uniform2iv(this.addr,e)}function ng(s,e){s.uniform3iv(this.addr,e)}function ig(s,e){s.uniform4iv(this.addr,e)}function sg(s,e){s.uniform1uiv(this.addr,e)}function rg(s,e){s.uniform2uiv(this.addr,e)}function ag(s,e){s.uniform3uiv(this.addr,e)}function og(s,e){s.uniform4uiv(this.addr,e)}function lg(s,e,t){const n=this.cache,i=e.length,r=Ma(t,i);kt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Eu,r[a])}function cg(s,e,t){const n=this.cache,i=e.length,r=Ma(t,i);kt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Cu,r[a])}function hg(s,e,t){const n=this.cache,i=e.length,r=Ma(t,i);kt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Ru,r[a])}function ug(s,e,t){const n=this.cache,i=e.length,r=Ma(t,i);kt(n,r)||(s.uniform1iv(this.addr,r),zt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Au,r[a])}function dg(s){switch(s){case 5126:return K0;case 35664:return Y0;case 35665:return j0;case 35666:return Z0;case 35674:return $0;case 35675:return J0;case 35676:return Q0;case 5124:case 35670:return eg;case 35667:case 35671:return tg;case 35668:case 35672:return ng;case 35669:case 35673:return ig;case 5125:return sg;case 36294:return rg;case 36295:return ag;case 36296:return og;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return cg;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return ug}}class fg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=q0(t.type)}}class pg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dg(t.type)}}class mg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Ja=/(\w+)(\])?(\[|\.)?/g;function qc(s,e){s.seq.push(e),s.map[e.id]=e}function gg(s,e,t){const n=s.name,i=n.length;for(Ja.lastIndex=0;;){const r=Ja.exec(n),a=Ja.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){qc(t,c===void 0?new fg(o,s,e):new pg(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new mg(o),qc(t,u)),t=u}}}class oa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);gg(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Kc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const xg=37297;let vg=0;function _g(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Yc=new nt;function yg(s){ut._getMatrix(Yc,ut.workingColorSpace,s);const e=`mat3( ${Yc.elements.map(t=>t.toFixed(4))} )`;switch(ut.getTransfer(s)){case va:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function jc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+_g(s.getShaderSource(e),a)}else return i}function Mg(s,e){const t=yg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sg(s,e){let t;switch(e){case jh:t="Linear";break;case Zh:t="Reinhard";break;case $h:t="Cineon";break;case Nl:t="ACESFilmic";break;case Jh:t="AgX";break;case Qh:t="Neutral";break;case Cd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nr=new E;function bg(){ut.getLuminanceCoefficients(Nr);const s=Nr.x.toFixed(4),e=Nr.y.toFixed(4),t=Nr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function Tg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Eg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ys(s){return s!==""}function Zc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $c(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ag=/^[ \t]*#include +<([\w\d./]+)>/gm;function vl(s){return s.replace(Ag,Rg)}const Cg=new Map;function Rg(s,e){let t=it[e];if(t===void 0){const n=Cg.get(e);if(n!==void 0)t=it[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vl(t)}const Pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jc(s){return s.replace(Pg,Lg)}function Lg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Qc(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ig(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Kh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===od?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function Dg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ps:case ms:e="ENVMAP_TYPE_CUBE";break;case xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ng(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ms:e="ENVMAP_MODE_REFRACTION";break}return e}function Ug(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Yh:e="ENVMAP_BLENDING_MULTIPLY";break;case Ed:e="ENVMAP_BLENDING_MIX";break;case Ad:e="ENVMAP_BLENDING_ADD";break}return e}function Fg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Og(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ig(t),c=Dg(t),h=Ng(t),u=Ug(t),d=Fg(t),f=wg(t),m=Tg(r),x=i.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ys).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ys).join(`
`),p.length>0&&(p+=`
`)):(g=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),p=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vi?"#define TONE_MAPPING":"",t.toneMapping!==vi?it.tonemapping_pars_fragment:"",t.toneMapping!==vi?Sg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,Mg("linearToOutputTexel",t.outputColorSpace),bg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ys).join(`
`)),a=vl(a),a=Zc(a,t),a=$c(a,t),o=vl(o),o=Zc(o,t),o=$c(o,t),a=Jc(a),o=Jc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+g+a,v=y+p+o,A=Kc(i,i.VERTEX_SHADER,_),S=Kc(i,i.FRAGMENT_SHADER,v);i.attachShader(x,A),i.attachShader(x,S),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(I){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(x).trim(),F=i.getShaderInfoLog(A).trim(),O=i.getShaderInfoLog(S).trim();let Y=!0,V=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,A,S);else{const J=jc(i,A,"vertex"),G=jc(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+J+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(F===""||O==="")&&(V=!1);V&&(I.diagnostics={runnable:Y,programLog:H,vertexShader:{log:F,prefix:g},fragmentShader:{log:O,prefix:p}})}i.deleteShader(A),i.deleteShader(S),L=new oa(i,x),b=Eg(i,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,xg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=S,this}let Bg=0;class kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zg(e),t.set(e,n)),n}}class zg{constructor(e){this.id=Bg++,this.code=e,this.usedTimes=0}}function Gg(s,e,t,n,i,r,a){const o=new xu,l=new kg,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,I,H,F){const O=H.fog,Y=F.geometry,V=b.isMeshStandardMaterial?H.environment:null,J=(b.isMeshStandardMaterial?t:e).get(b.envMap||V),G=J&&J.mapping===xa?J.image.height:null,N=m[b.type];b.precision!==null&&(f=i.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const W=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,j=W!==void 0?W.length:0;let ce=0;Y.morphAttributes.position!==void 0&&(ce=1),Y.morphAttributes.normal!==void 0&&(ce=2),Y.morphAttributes.color!==void 0&&(ce=3);let ze,Z,ae,Ie;if(N){const ft=En[N];ze=ft.vertexShader,Z=ft.fragmentShader}else ze=b.vertexShader,Z=b.fragmentShader,l.update(b),ae=l.getVertexShaderID(b),Ie=l.getFragmentShaderID(b);const pe=s.getRenderTarget(),Be=s.state.buffers.depth.getReversed(),Ke=F.isInstancedMesh===!0,We=F.isBatchedMesh===!0,ct=!!b.map,te=!!b.matcap,ue=!!J,D=!!b.aoMap,Fe=!!b.lightMap,oe=!!b.bumpMap,Ae=!!b.normalMap,me=!!b.displacementMap,He=!!b.emissiveMap,Ce=!!b.metalnessMap,P=!!b.roughnessMap,w=b.anisotropy>0,q=b.clearcoat>0,Q=b.dispersion>0,re=b.iridescence>0,ee=b.sheen>0,Le=b.transmission>0,ge=w&&!!b.anisotropyMap,Re=q&&!!b.clearcoatMap,tt=q&&!!b.clearcoatNormalMap,le=q&&!!b.clearcoatRoughnessMap,De=re&&!!b.iridescenceMap,Xe=re&&!!b.iridescenceThicknessMap,qe=ee&&!!b.sheenColorMap,Ne=ee&&!!b.sheenRoughnessMap,st=!!b.specularMap,Ye=!!b.specularColorMap,rt=!!b.specularIntensityMap,k=Le&&!!b.transmissionMap,xe=Le&&!!b.thicknessMap,$=!!b.gradientMap,se=!!b.alphaMap,Me=b.alphaTest>0,be=!!b.alphaHash,Je=!!b.extensions;let bt=vi;b.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(bt=s.toneMapping);const It={shaderID:N,shaderType:b.type,shaderName:b.name,vertexShader:ze,fragmentShader:Z,defines:b.defines,customVertexShaderID:ae,customFragmentShaderID:Ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:We,batchingColor:We&&F._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&F.instanceColor!==null,instancingMorph:Ke&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pe===null?s.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:en,alphaToCoverage:!!b.alphaToCoverage,map:ct,matcap:te,envMap:ue,envMapMode:ue&&J.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Fe,bumpMap:oe,normalMap:Ae,displacementMap:d&&me,emissiveMap:He,normalMapObjectSpace:Ae&&b.normalMapType===Nd,normalMapTangentSpace:Ae&&b.normalMapType===du,metalnessMap:Ce,roughnessMap:P,anisotropy:w,anisotropyMap:ge,clearcoat:q,clearcoatMap:Re,clearcoatNormalMap:tt,clearcoatRoughnessMap:le,dispersion:Q,iridescence:re,iridescenceMap:De,iridescenceThicknessMap:Xe,sheen:ee,sheenColorMap:qe,sheenRoughnessMap:Ne,specularMap:st,specularColorMap:Ye,specularIntensityMap:rt,transmission:Le,transmissionMap:k,thicknessMap:xe,gradientMap:$,opaque:b.transparent===!1&&b.blending===cs&&b.alphaToCoverage===!1,alphaMap:se,alphaTest:Me,alphaHash:be,combine:b.combine,mapUv:ct&&x(b.map.channel),aoMapUv:D&&x(b.aoMap.channel),lightMapUv:Fe&&x(b.lightMap.channel),bumpMapUv:oe&&x(b.bumpMap.channel),normalMapUv:Ae&&x(b.normalMap.channel),displacementMapUv:me&&x(b.displacementMap.channel),emissiveMapUv:He&&x(b.emissiveMap.channel),metalnessMapUv:Ce&&x(b.metalnessMap.channel),roughnessMapUv:P&&x(b.roughnessMap.channel),anisotropyMapUv:ge&&x(b.anisotropyMap.channel),clearcoatMapUv:Re&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:tt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&x(b.sheenRoughnessMap.channel),specularMapUv:st&&x(b.specularMap.channel),specularColorMapUv:Ye&&x(b.specularColorMap.channel),specularIntensityMapUv:rt&&x(b.specularIntensityMap.channel),transmissionMapUv:k&&x(b.transmissionMap.channel),thicknessMapUv:xe&&x(b.thicknessMap.channel),alphaMapUv:se&&x(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Ae||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(ct||se),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Be,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:bt,decodeVideoTexture:ct&&b.map.isVideoTexture===!0&&ut.getTransfer(b.map.colorSpace)===yt,decodeVideoTextureEmissive:He&&b.emissiveMap.isVideoTexture===!0&&ut.getTransfer(b.emissiveMap.colorSpace)===yt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Jt,flipSided:b.side===Yt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Je&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&b.extensions.multiDraw===!0||We)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(y(M,b),_(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function v(b){const M=m[b.type];let I;if(M){const H=En[M];I=ar.clone(H.uniforms)}else I=b.uniforms;return I}function A(b,M){let I;for(let H=0,F=h.length;H<F;H++){const O=h[H];if(O.cacheKey===M){I=O,++I.usedTimes;break}}return I===void 0&&(I=new Og(s,M,b,r),h.push(I)),I}function S(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:S,releaseShaderCache:C,programs:h,dispose:L}}function Hg(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Vg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function eh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function th(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,x,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function o(u,d,f,m,x,g){const p=a(u,d,f,m,x,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,m,x,g){const p=a(u,d,f,m,x,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Vg),n.length>1&&n.sort(d||eh),i.length>1&&i.sort(d||eh)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Wg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new th,s.set(n,[a])):i>=r.length?(a=new th,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Xg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new Ue};break;case"SpotLight":t={position:new E,direction:new E,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function qg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Kg=0;function Yg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function jg(s){const e=new Xg,t=qg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const i=new E,r=new et,a=new et;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,y=0,_=0,v=0,A=0,S=0,C=0;c.sort(Yg);for(let b=0,M=c.length;b<M;b++){const I=c[b],H=I.color,F=I.intensity,O=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=H.r*F,u+=H.g*F,d+=H.b*F;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],F);C++}else if(I.isDirectionalLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=V,f++}else if(I.isSpotLight){const V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(H).multiplyScalar(F),V.distance=O,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[x]=V;const J=I.shadow;if(I.map&&(n.spotLightMap[A]=I.map,A++,J.updateMatrices(I),I.castShadow&&S++),n.spotLightMatrix[x]=J.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=Y,v++}x++}else if(I.isRectAreaLight){const V=e.get(I);V.color.copy(H).multiplyScalar(F),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=V,g++}else if(I.isPointLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=I.shadow.matrix,_++}n.point[m]=V,m++}else if(I.isHemisphereLight){const V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(F),V.groundColor.copy(I.groundColor).multiplyScalar(F),n.hemi[p]=V,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==f||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==y||L.numPointShadows!==_||L.numSpotShadows!==v||L.numSpotMaps!==A||L.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+A-S,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=C,L.directionalLength=f,L.pointLength=m,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=y,L.numPointShadows=_,L.numSpotShadows=v,L.numSpotMaps=A,L.numLightProbes=C,n.version=Kg++)}function l(c,h){let u=0,d=0,f=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const _=c[p];if(_.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),u++}else if(_.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(_.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),d++}else if(_.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function nh(s){const e=new jg(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Zg(s){let e=new WeakMap;function t(i,r=0){const a=e.get(i);let o;return a===void 0?(o=new nh(s),e.set(i,[o])):r>=a.length?(o=new nh(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class $g extends bn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jg extends bn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ex=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function tx(s,e,t){let n=new Vl;const i=new ne,r=new ne,a=new gt,o=new $g({depthPacking:Dd}),l=new Jg,c={},h=t.maxTextureSize,u={[Jn]:Yt,[Yt]:Jn,[Jt]:Jt},d=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Qg,fragmentShader:ex}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new _t;m.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new R(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kh;let p=this.type;this.render=function(S,C,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const b=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),H=s.state;H.setBlending(jn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const F=p!==Wn&&this.type===Wn,O=p===Wn&&this.type!==Wn;for(let Y=0,V=S.length;Y<V;Y++){const J=S[Y],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const N=G.getFrameExtents();if(i.multiply(N),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/N.x),i.x=r.x*N.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/N.y),i.y=r.y*N.y,G.mapSize.y=r.y)),G.map===null||F===!0||O===!0){const j=this.type!==Wn?{minFilter:Qt,magFilter:Qt}:{};G.map!==null&&G.map.dispose(),G.map=new Sn(i.x,i.y,j),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const W=G.getViewportCount();for(let j=0;j<W;j++){const ce=G.getViewport(j);a.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),H.viewport(a),G.updateMatrices(J,j),n=G.getFrustum(),v(C,L,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===Wn&&y(G,L),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(b,M,I)};function y(S,C){const L=e.update(x);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Sn(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(C,null,L,d,x,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(C,null,L,f,x,null)}function _(S,C,L,b){let M=null;const I=L.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)M=I;else if(M=L.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const H=M.uuid,F=C.uuid;let O=c[H];O===void 0&&(O={},c[H]=O);let Y=O[F];Y===void 0&&(Y=M.clone(),O[F]=Y,C.addEventListener("dispose",A)),M=Y}if(M.visible=C.visible,M.wireframe=C.wireframe,b===Wn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=s.properties.get(M);H.light=L}return M}function v(S,C,L,b,M){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===Wn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,S.matrixWorld);const F=e.update(S),O=S.material;if(Array.isArray(O)){const Y=F.groups;for(let V=0,J=Y.length;V<J;V++){const G=Y[V],N=O[G.materialIndex];if(N&&N.visible){const W=_(S,N,b,M);S.onBeforeShadow(s,S,C,L,F,W,G),s.renderBufferDirect(L,null,F,W,S,G),S.onAfterShadow(s,S,C,L,F,W,G)}}}else if(O.visible){const Y=_(S,O,b,M);S.onBeforeShadow(s,S,C,L,F,Y,null),s.renderBufferDirect(L,null,F,Y,S,null),S.onAfterShadow(s,S,C,L,F,Y,null)}}const H=S.children;for(let F=0,O=H.length;F<O;F++)v(H[F],C,L,b,M)}function A(S){S.target.removeEventListener("dispose",A);for(const L in c){const b=c[L],M=S.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const nx={[No]:Uo,[Fo]:ko,[Oo]:zo,[fs]:Bo,[Uo]:No,[ko]:Fo,[zo]:Oo,[Bo]:fs};function ix(s,e){function t(){let k=!1;const xe=new gt;let $=null;const se=new gt(0,0,0,0);return{setMask:function(Me){$!==Me&&!k&&(s.colorMask(Me,Me,Me,Me),$=Me)},setLocked:function(Me){k=Me},setClear:function(Me,be,Je,bt,It){It===!0&&(Me*=bt,be*=bt,Je*=bt),xe.set(Me,be,Je,bt),se.equals(xe)===!1&&(s.clearColor(Me,be,Je,bt),se.copy(xe))},reset:function(){k=!1,$=null,se.set(-1,0,0,0)}}}function n(){let k=!1,xe=!1,$=null,se=null,Me=null;return{setReversed:function(be){if(xe!==be){const Je=e.get("EXT_clip_control");xe?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT);const bt=Me;Me=null,this.setClear(bt)}xe=be},getReversed:function(){return xe},setTest:function(be){be?pe(s.DEPTH_TEST):Be(s.DEPTH_TEST)},setMask:function(be){$!==be&&!k&&(s.depthMask(be),$=be)},setFunc:function(be){if(xe&&(be=nx[be]),se!==be){switch(be){case No:s.depthFunc(s.NEVER);break;case Uo:s.depthFunc(s.ALWAYS);break;case Fo:s.depthFunc(s.LESS);break;case fs:s.depthFunc(s.LEQUAL);break;case Oo:s.depthFunc(s.EQUAL);break;case Bo:s.depthFunc(s.GEQUAL);break;case ko:s.depthFunc(s.GREATER);break;case zo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}se=be}},setLocked:function(be){k=be},setClear:function(be){Me!==be&&(xe&&(be=1-be),s.clearDepth(be),Me=be)},reset:function(){k=!1,$=null,se=null,Me=null,xe=!1}}}function i(){let k=!1,xe=null,$=null,se=null,Me=null,be=null,Je=null,bt=null,It=null;return{setTest:function(ft){k||(ft?pe(s.STENCIL_TEST):Be(s.STENCIL_TEST))},setMask:function(ft){xe!==ft&&!k&&(s.stencilMask(ft),xe=ft)},setFunc:function(ft,ie,Te){($!==ft||se!==ie||Me!==Te)&&(s.stencilFunc(ft,ie,Te),$=ft,se=ie,Me=Te)},setOp:function(ft,ie,Te){(be!==ft||Je!==ie||bt!==Te)&&(s.stencilOp(ft,ie,Te),be=ft,Je=ie,bt=Te)},setLocked:function(ft){k=ft},setClear:function(ft){It!==ft&&(s.clearStencil(ft),It=ft)},reset:function(){k=!1,xe=null,$=null,se=null,Me=null,be=null,Je=null,bt=null,It=null}}}const r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,A=null,S=null,C=new Ue(0,0,0),L=0,b=!1,M=null,I=null,H=null,F=null,O=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=J>=2);let N=null,W={};const j=s.getParameter(s.SCISSOR_BOX),ce=s.getParameter(s.VIEWPORT),ze=new gt().fromArray(j),Z=new gt().fromArray(ce);function ae(k,xe,$,se){const Me=new Uint8Array(4),be=s.createTexture();s.bindTexture(k,be),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Je=0;Je<$;Je++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(xe,0,s.RGBA,1,1,se,0,s.RGBA,s.UNSIGNED_BYTE,Me):s.texImage2D(xe+Je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Me);return be}const Ie={};Ie[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ie[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pe(s.DEPTH_TEST),a.setFunc(fs),oe(!1),Ae(sc),pe(s.CULL_FACE),D(jn);function pe(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function Be(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function Ke(k,xe){return u[k]!==xe?(s.bindFramebuffer(k,xe),u[k]=xe,k===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=xe),k===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=xe),!0):!1}function We(k,xe){let $=f,se=!1;if(k){$=d.get(xe),$===void 0&&($=[],d.set(xe,$));const Me=k.textures;if($.length!==Me.length||$[0]!==s.COLOR_ATTACHMENT0){for(let be=0,Je=Me.length;be<Je;be++)$[be]=s.COLOR_ATTACHMENT0+be;$.length=Me.length,se=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,se=!0);se&&s.drawBuffers($)}function ct(k){return m!==k?(s.useProgram(k),m=k,!0):!1}const te={[Ii]:s.FUNC_ADD,[cd]:s.FUNC_SUBTRACT,[hd]:s.FUNC_REVERSE_SUBTRACT};te[ud]=s.MIN,te[dd]=s.MAX;const ue={[fd]:s.ZERO,[pd]:s.ONE,[md]:s.SRC_COLOR,[Io]:s.SRC_ALPHA,[Md]:s.SRC_ALPHA_SATURATE,[_d]:s.DST_COLOR,[xd]:s.DST_ALPHA,[gd]:s.ONE_MINUS_SRC_COLOR,[Do]:s.ONE_MINUS_SRC_ALPHA,[yd]:s.ONE_MINUS_DST_COLOR,[vd]:s.ONE_MINUS_DST_ALPHA,[Sd]:s.CONSTANT_COLOR,[bd]:s.ONE_MINUS_CONSTANT_COLOR,[wd]:s.CONSTANT_ALPHA,[Td]:s.ONE_MINUS_CONSTANT_ALPHA};function D(k,xe,$,se,Me,be,Je,bt,It,ft){if(k===jn){x===!0&&(Be(s.BLEND),x=!1);return}if(x===!1&&(pe(s.BLEND),x=!0),k!==ld){if(k!==g||ft!==b){if((p!==Ii||v!==Ii)&&(s.blendEquation(s.FUNC_ADD),p=Ii,v=Ii),ft)switch(k){case cs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rt:s.blendFunc(s.ONE,s.ONE);break;case rc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ac:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case cs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rt:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case rc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ac:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,_=null,A=null,S=null,C.set(0,0,0),L=0,g=k,b=ft}return}Me=Me||xe,be=be||$,Je=Je||se,(xe!==p||Me!==v)&&(s.blendEquationSeparate(te[xe],te[Me]),p=xe,v=Me),($!==y||se!==_||be!==A||Je!==S)&&(s.blendFuncSeparate(ue[$],ue[se],ue[be],ue[Je]),y=$,_=se,A=be,S=Je),(bt.equals(C)===!1||It!==L)&&(s.blendColor(bt.r,bt.g,bt.b,It),C.copy(bt),L=It),g=k,b=!1}function Fe(k,xe){k.side===Jt?Be(s.CULL_FACE):pe(s.CULL_FACE);let $=k.side===Yt;xe&&($=!$),oe($),k.blending===cs&&k.transparent===!1?D(jn):D(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const se=k.stencilWrite;o.setTest(se),se&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),He(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Be(s.SAMPLE_ALPHA_TO_COVERAGE)}function oe(k){M!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),M=k)}function Ae(k){k!==rd?(pe(s.CULL_FACE),k!==I&&(k===sc?s.cullFace(s.BACK):k===ad?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Be(s.CULL_FACE),I=k}function me(k){k!==H&&(V&&s.lineWidth(k),H=k)}function He(k,xe,$){k?(pe(s.POLYGON_OFFSET_FILL),(F!==xe||O!==$)&&(s.polygonOffset(xe,$),F=xe,O=$)):Be(s.POLYGON_OFFSET_FILL)}function Ce(k){k?pe(s.SCISSOR_TEST):Be(s.SCISSOR_TEST)}function P(k){k===void 0&&(k=s.TEXTURE0+Y-1),N!==k&&(s.activeTexture(k),N=k)}function w(k,xe,$){$===void 0&&(N===null?$=s.TEXTURE0+Y-1:$=N);let se=W[$];se===void 0&&(se={type:void 0,texture:void 0},W[$]=se),(se.type!==k||se.texture!==xe)&&(N!==$&&(s.activeTexture($),N=$),s.bindTexture(k,xe||Ie[k]),se.type=k,se.texture=xe)}function q(){const k=W[N];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ee(){try{s.texSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{s.texSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Re(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function tt(){try{s.texStorage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function le(){try{s.texStorage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function De(){try{s.texImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xe(){try{s.texImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function qe(k){ze.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),ze.copy(k))}function Ne(k){Z.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function st(k,xe){let $=c.get(xe);$===void 0&&($=new WeakMap,c.set(xe,$));let se=$.get(k);se===void 0&&(se=s.getUniformBlockIndex(xe,k.name),$.set(k,se))}function Ye(k,xe){const se=c.get(xe).get(k);l.get(xe)!==se&&(s.uniformBlockBinding(xe,se,k.__bindingPointIndex),l.set(xe,se))}function rt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},N=null,W={},u={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,A=null,S=null,C=new Ue(0,0,0),L=0,b=!1,M=null,I=null,H=null,F=null,O=null,ze.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:pe,disable:Be,bindFramebuffer:Ke,drawBuffers:We,useProgram:ct,setBlending:D,setMaterial:Fe,setFlipSided:oe,setCullFace:Ae,setLineWidth:me,setPolygonOffset:He,setScissorTest:Ce,activeTexture:P,bindTexture:w,unbindTexture:q,compressedTexImage2D:Q,compressedTexImage3D:re,texImage2D:De,texImage3D:Xe,updateUBOMapping:st,uniformBlockBinding:Ye,texStorage2D:tt,texStorage3D:le,texSubImage2D:ee,texSubImage3D:Le,compressedTexSubImage2D:ge,compressedTexSubImage3D:Re,scissor:qe,viewport:Ne,reset:rt}}function ih(s,e,t,n){const i=sx(n);switch(t){case ru:return s*e;case ou:return s*e;case lu:return s*e*2;case Bl:return s*e/i.components*i.byteLength;case kl:return s*e/i.components*i.byteLength;case cu:return s*e*2/i.components*i.byteLength;case zl:return s*e*2/i.components*i.byteLength;case au:return s*e*3/i.components*i.byteLength;case fn:return s*e*4/i.components*i.byteLength;case Gl:return s*e*4/i.components*i.byteLength;case na:case ia:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case sa:case ra:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Wo:case qo:return Math.max(s,16)*Math.max(e,8)/4;case Vo:case Xo:return Math.max(s,8)*Math.max(e,8)/2;case Ko:case Yo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case el:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case tl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case nl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case il:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case sl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case rl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case al:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ol:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ll:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case cl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case aa:case hl:case ul:return Math.ceil(s/4)*Math.ceil(e/4)*16;case hu:case dl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case fl:case pl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sx(s){switch(s){case ei:case nu:return{byteLength:1,components:1};case nr:case iu:case Zn:return{byteLength:2,components:1};case Fl:case Ol:return{byteLength:2,components:4};case Ui:case Ul:case Mn:return{byteLength:4,components:1};case su:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function rx(s,e,t,n,i,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return f?new OffscreenCanvas(P,w):rr("canvas")}function x(P,w,q){let Q=1;const re=Ce(P);if((re.width>q||re.height>q)&&(Q=q/Math.max(re.width,re.height)),Q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ee=Math.floor(Q*re.width),Le=Math.floor(Q*re.height);u===void 0&&(u=m(ee,Le));const ge=w?m(ee,Le):u;return ge.width=ee,ge.height=Le,ge.getContext("2d").drawImage(P,0,0,ee,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Le+")."),ge}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){s.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(P,w,q,Q,re=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ee=w;if(w===s.RED&&(q===s.FLOAT&&(ee=s.R32F),q===s.HALF_FLOAT&&(ee=s.R16F),q===s.UNSIGNED_BYTE&&(ee=s.R8)),w===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.R8UI),q===s.UNSIGNED_SHORT&&(ee=s.R16UI),q===s.UNSIGNED_INT&&(ee=s.R32UI),q===s.BYTE&&(ee=s.R8I),q===s.SHORT&&(ee=s.R16I),q===s.INT&&(ee=s.R32I)),w===s.RG&&(q===s.FLOAT&&(ee=s.RG32F),q===s.HALF_FLOAT&&(ee=s.RG16F),q===s.UNSIGNED_BYTE&&(ee=s.RG8)),w===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RG8UI),q===s.UNSIGNED_SHORT&&(ee=s.RG16UI),q===s.UNSIGNED_INT&&(ee=s.RG32UI),q===s.BYTE&&(ee=s.RG8I),q===s.SHORT&&(ee=s.RG16I),q===s.INT&&(ee=s.RG32I)),w===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),q===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),q===s.UNSIGNED_INT&&(ee=s.RGB32UI),q===s.BYTE&&(ee=s.RGB8I),q===s.SHORT&&(ee=s.RGB16I),q===s.INT&&(ee=s.RGB32I)),w===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),q===s.UNSIGNED_INT&&(ee=s.RGBA32UI),q===s.BYTE&&(ee=s.RGBA8I),q===s.SHORT&&(ee=s.RGBA16I),q===s.INT&&(ee=s.RGBA32I)),w===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),w===s.RGBA){const Le=re?va:ut.getTransfer(Q);q===s.FLOAT&&(ee=s.RGBA32F),q===s.HALF_FLOAT&&(ee=s.RGBA16F),q===s.UNSIGNED_BYTE&&(ee=Le===yt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function v(P,w){let q;return P?w===null||w===Ui||w===gs?q=s.DEPTH24_STENCIL8:w===Mn?q=s.DEPTH32F_STENCIL8:w===nr&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ui||w===gs?q=s.DEPTH_COMPONENT24:w===Mn?q=s.DEPTH_COMPONENT32F:w===nr&&(q=s.DEPTH_COMPONENT16),q}function A(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Qt&&P.minFilter!==ln?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function S(P){const w=P.target;w.removeEventListener("dispose",S),L(w),w.isVideoTexture&&h.delete(w)}function C(P){const w=P.target;w.removeEventListener("dispose",C),M(w)}function L(P){const w=n.get(P);if(w.__webglInit===void 0)return;const q=P.source,Q=d.get(q);if(Q){const re=Q[w.__cacheKey];re.usedTimes--,re.usedTimes===0&&b(P),Object.keys(Q).length===0&&d.delete(q)}n.remove(P)}function b(P){const w=n.get(P);s.deleteTexture(w.__webglTexture);const q=P.source,Q=d.get(q);delete Q[w.__cacheKey],a.memory.textures--}function M(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let re=0;re<w.__webglFramebuffer[Q].length;re++)s.deleteFramebuffer(w.__webglFramebuffer[Q][re]);else s.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)s.deleteFramebuffer(w.__webglFramebuffer[Q]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const q=P.textures;for(let Q=0,re=q.length;Q<re;Q++){const ee=n.get(q[Q]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(q[Q])}n.remove(P)}let I=0;function H(){I=0}function F(){const P=I;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function O(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function Y(P,w){const q=n.get(P);if(P.isVideoTexture&&me(P),P.isRenderTargetTexture===!1&&P.version>0&&q.__version!==P.version){const Q=P.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(q,P,w);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+w)}function V(P,w){const q=n.get(P);if(P.version>0&&q.__version!==P.version){Z(q,P,w);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+w)}function J(P,w){const q=n.get(P);if(P.version>0&&q.__version!==P.version){Z(q,P,w);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+w)}function G(P,w){const q=n.get(P);if(P.version>0&&q.__version!==P.version){ae(q,P,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+w)}const N={[Qn]:s.REPEAT,[mi]:s.CLAMP_TO_EDGE,[la]:s.MIRRORED_REPEAT},W={[Qt]:s.NEAREST,[tu]:s.NEAREST_MIPMAP_NEAREST,[qs]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[ta]:s.LINEAR_MIPMAP_NEAREST,[Kn]:s.LINEAR_MIPMAP_LINEAR},j={[Ud]:s.NEVER,[Gd]:s.ALWAYS,[Fd]:s.LESS,[fu]:s.LEQUAL,[Od]:s.EQUAL,[zd]:s.GEQUAL,[Bd]:s.GREATER,[kd]:s.NOTEQUAL};function ce(P,w){if(w.type===Mn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===ln||w.magFilter===ta||w.magFilter===qs||w.magFilter===Kn||w.minFilter===ln||w.minFilter===ta||w.minFilter===qs||w.minFilter===Kn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,N[w.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,N[w.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,N[w.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,W[w.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,W[w.minFilter]),w.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,j[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qt||w.minFilter!==qs&&w.minFilter!==Kn||w.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ze(P,w){let q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",S));const Q=w.source;let re=d.get(Q);re===void 0&&(re={},d.set(Q,re));const ee=O(w);if(ee!==P.__cacheKey){re[ee]===void 0&&(re[ee]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,q=!0),re[ee].usedTimes++;const Le=re[P.__cacheKey];Le!==void 0&&(re[P.__cacheKey].usedTimes--,Le.usedTimes===0&&b(w)),P.__cacheKey=ee,P.__webglTexture=re[ee].texture}return q}function Z(P,w,q){let Q=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=s.TEXTURE_3D);const re=ze(P,w),ee=w.source;t.bindTexture(Q,P.__webglTexture,s.TEXTURE0+q);const Le=n.get(ee);if(ee.version!==Le.__version||re===!0){t.activeTexture(s.TEXTURE0+q);const ge=ut.getPrimaries(ut.workingColorSpace),Re=w.colorSpace===pi?null:ut.getPrimaries(w.colorSpace),tt=w.colorSpace===pi||ge===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let le=x(w.image,!1,i.maxTextureSize);le=He(w,le);const De=r.convert(w.format,w.colorSpace),Xe=r.convert(w.type);let qe=_(w.internalFormat,De,Xe,w.colorSpace,w.isVideoTexture);ce(Q,w);let Ne;const st=w.mipmaps,Ye=w.isVideoTexture!==!0,rt=Le.__version===void 0||re===!0,k=ee.dataReady,xe=A(w,le);if(w.isDepthTexture)qe=v(w.format===xs,w.type),rt&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,qe,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,qe,le.width,le.height,0,De,Xe,null));else if(w.isDataTexture)if(st.length>0){Ye&&rt&&t.texStorage2D(s.TEXTURE_2D,xe,qe,st[0].width,st[0].height);for(let $=0,se=st.length;$<se;$++)Ne=st[$],Ye?k&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,Ne.width,Ne.height,De,Xe,Ne.data):t.texImage2D(s.TEXTURE_2D,$,qe,Ne.width,Ne.height,0,De,Xe,Ne.data);w.generateMipmaps=!1}else Ye?(rt&&t.texStorage2D(s.TEXTURE_2D,xe,qe,le.width,le.height),k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le.width,le.height,De,Xe,le.data)):t.texImage2D(s.TEXTURE_2D,0,qe,le.width,le.height,0,De,Xe,le.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ye&&rt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xe,qe,st[0].width,st[0].height,le.depth);for(let $=0,se=st.length;$<se;$++)if(Ne=st[$],w.format!==fn)if(De!==null)if(Ye){if(k)if(w.layerUpdates.size>0){const Me=ih(Ne.width,Ne.height,w.format,w.type);for(const be of w.layerUpdates){const Je=Ne.data.subarray(be*Me/Ne.data.BYTES_PER_ELEMENT,(be+1)*Me/Ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,be,Ne.width,Ne.height,1,De,Je)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Ne.width,Ne.height,le.depth,De,Ne.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,qe,Ne.width,Ne.height,le.depth,0,Ne.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Ne.width,Ne.height,le.depth,De,Xe,Ne.data):t.texImage3D(s.TEXTURE_2D_ARRAY,$,qe,Ne.width,Ne.height,le.depth,0,De,Xe,Ne.data)}else{Ye&&rt&&t.texStorage2D(s.TEXTURE_2D,xe,qe,st[0].width,st[0].height);for(let $=0,se=st.length;$<se;$++)Ne=st[$],w.format!==fn?De!==null?Ye?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,Ne.width,Ne.height,De,Ne.data):t.compressedTexImage2D(s.TEXTURE_2D,$,qe,Ne.width,Ne.height,0,Ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?k&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,Ne.width,Ne.height,De,Xe,Ne.data):t.texImage2D(s.TEXTURE_2D,$,qe,Ne.width,Ne.height,0,De,Xe,Ne.data)}else if(w.isDataArrayTexture)if(Ye){if(rt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xe,qe,le.width,le.height,le.depth),k)if(w.layerUpdates.size>0){const $=ih(le.width,le.height,w.format,w.type);for(const se of w.layerUpdates){const Me=le.data.subarray(se*$/le.data.BYTES_PER_ELEMENT,(se+1)*$/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,se,le.width,le.height,1,De,Xe,Me)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,De,Xe,le.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,qe,le.width,le.height,le.depth,0,De,Xe,le.data);else if(w.isData3DTexture)Ye?(rt&&t.texStorage3D(s.TEXTURE_3D,xe,qe,le.width,le.height,le.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,De,Xe,le.data)):t.texImage3D(s.TEXTURE_3D,0,qe,le.width,le.height,le.depth,0,De,Xe,le.data);else if(w.isFramebufferTexture){if(rt)if(Ye)t.texStorage2D(s.TEXTURE_2D,xe,qe,le.width,le.height);else{let $=le.width,se=le.height;for(let Me=0;Me<xe;Me++)t.texImage2D(s.TEXTURE_2D,Me,qe,$,se,0,De,Xe,null),$>>=1,se>>=1}}else if(st.length>0){if(Ye&&rt){const $=Ce(st[0]);t.texStorage2D(s.TEXTURE_2D,xe,qe,$.width,$.height)}for(let $=0,se=st.length;$<se;$++)Ne=st[$],Ye?k&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,De,Xe,Ne):t.texImage2D(s.TEXTURE_2D,$,qe,De,Xe,Ne);w.generateMipmaps=!1}else if(Ye){if(rt){const $=Ce(le);t.texStorage2D(s.TEXTURE_2D,xe,qe,$.width,$.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,De,Xe,le)}else t.texImage2D(s.TEXTURE_2D,0,qe,De,Xe,le);g(w)&&p(Q),Le.__version=ee.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ae(P,w,q){if(w.image.length!==6)return;const Q=ze(P,w),re=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+q);const ee=n.get(re);if(re.version!==ee.__version||Q===!0){t.activeTexture(s.TEXTURE0+q);const Le=ut.getPrimaries(ut.workingColorSpace),ge=w.colorSpace===pi?null:ut.getPrimaries(w.colorSpace),Re=w.colorSpace===pi||Le===ge?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const tt=w.isCompressedTexture||w.image[0].isCompressedTexture,le=w.image[0]&&w.image[0].isDataTexture,De=[];for(let se=0;se<6;se++)!tt&&!le?De[se]=x(w.image[se],!0,i.maxCubemapSize):De[se]=le?w.image[se].image:w.image[se],De[se]=He(w,De[se]);const Xe=De[0],qe=r.convert(w.format,w.colorSpace),Ne=r.convert(w.type),st=_(w.internalFormat,qe,Ne,w.colorSpace),Ye=w.isVideoTexture!==!0,rt=ee.__version===void 0||Q===!0,k=re.dataReady;let xe=A(w,Xe);ce(s.TEXTURE_CUBE_MAP,w);let $;if(tt){Ye&&rt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,st,Xe.width,Xe.height);for(let se=0;se<6;se++){$=De[se].mipmaps;for(let Me=0;Me<$.length;Me++){const be=$[Me];w.format!==fn?qe!==null?Ye?k&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,0,0,be.width,be.height,qe,be.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,st,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?k&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,0,0,be.width,be.height,qe,Ne,be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,st,be.width,be.height,0,qe,Ne,be.data)}}}else{if($=w.mipmaps,Ye&&rt){$.length>0&&xe++;const se=Ce(De[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,st,se.width,se.height)}for(let se=0;se<6;se++)if(le){Ye?k&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De[se].width,De[se].height,qe,Ne,De[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,st,De[se].width,De[se].height,0,qe,Ne,De[se].data);for(let Me=0;Me<$.length;Me++){const Je=$[Me].image[se].image;Ye?k&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,0,0,Je.width,Je.height,qe,Ne,Je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,st,Je.width,Je.height,0,qe,Ne,Je.data)}}else{Ye?k&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,qe,Ne,De[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,st,qe,Ne,De[se]);for(let Me=0;Me<$.length;Me++){const be=$[Me];Ye?k&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,0,0,qe,Ne,be.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,st,qe,Ne,be.image[se])}}}g(w)&&p(s.TEXTURE_CUBE_MAP),ee.__version=re.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Ie(P,w,q,Q,re,ee){const Le=r.convert(q.format,q.colorSpace),ge=r.convert(q.type),Re=_(q.internalFormat,Le,ge,q.colorSpace),tt=n.get(w),le=n.get(q);if(le.__renderTarget=w,!tt.__hasExternalTextures){const De=Math.max(1,w.width>>ee),Xe=Math.max(1,w.height>>ee);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,ee,Re,De,Xe,w.depth,0,Le,ge,null):t.texImage2D(re,ee,Re,De,Xe,0,Le,ge,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),Ae(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,re,le.__webglTexture,0,oe(w)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,re,le.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(P,w,q){if(s.bindRenderbuffer(s.RENDERBUFFER,P),w.depthBuffer){const Q=w.depthTexture,re=Q&&Q.isDepthTexture?Q.type:null,ee=v(w.stencilBuffer,re),Le=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=oe(w);Ae(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ge,ee,w.width,w.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,ge,ee,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ee,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Le,s.RENDERBUFFER,P)}else{const Q=w.textures;for(let re=0;re<Q.length;re++){const ee=Q[re],Le=r.convert(ee.format,ee.colorSpace),ge=r.convert(ee.type),Re=_(ee.internalFormat,Le,ge,ee.colorSpace),tt=oe(w);q&&Ae(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,Re,w.width,w.height):Ae(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,Re,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,Re,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Be(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(w.depthTexture);Q.__renderTarget=w,(!Q.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Y(w.depthTexture,0);const re=Q.__webglTexture,ee=oe(w);if(w.depthTexture.format===hs)Ae(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0);else if(w.depthTexture.format===xs)Ae(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Ke(P){const w=n.get(P),q=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const Q=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Q){const re=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Q.removeEventListener("dispose",re)};Q.addEventListener("dispose",re),w.__depthDisposeCallback=re}w.__boundDepthTexture=Q}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Be(w.__webglFramebuffer,P)}else if(q){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]===void 0)w.__webglDepthbuffer[Q]=s.createRenderbuffer(),pe(w.__webglDepthbuffer[Q],P,!1);else{const re=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=w.__webglDepthbuffer[Q];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),pe(w.__webglDepthbuffer,P,!1);else{const Q=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,re)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(P,w,q){const Q=n.get(P);w!==void 0&&Ie(Q.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&Ke(P)}function ct(P){const w=P.texture,q=n.get(P),Q=n.get(w);P.addEventListener("dispose",C);const re=P.textures,ee=P.isWebGLCubeRenderTarget===!0,Le=re.length>1;if(Le||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=w.version,a.memory.textures++),ee){q.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer[ge]=[];for(let Re=0;Re<w.mipmaps.length;Re++)q.__webglFramebuffer[ge][Re]=s.createFramebuffer()}else q.__webglFramebuffer[ge]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){q.__webglFramebuffer=[];for(let ge=0;ge<w.mipmaps.length;ge++)q.__webglFramebuffer[ge]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Le)for(let ge=0,Re=re.length;ge<Re;ge++){const tt=n.get(re[ge]);tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture(),a.memory.textures++)}if(P.samples>0&&Ae(P)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ge=0;ge<re.length;ge++){const Re=re[ge];q.__webglColorRenderbuffer[ge]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[ge]);const tt=r.convert(Re.format,Re.colorSpace),le=r.convert(Re.type),De=_(Re.internalFormat,tt,le,Re.colorSpace,P.isXRRenderTarget===!0),Xe=oe(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xe,De,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,q.__webglColorRenderbuffer[ge])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),pe(q.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),ce(s.TEXTURE_CUBE_MAP,w);for(let ge=0;ge<6;ge++)if(w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)Ie(q.__webglFramebuffer[ge][Re],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Re);else Ie(q.__webglFramebuffer[ge],P,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);g(w)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ge=0,Re=re.length;ge<Re;ge++){const tt=re[ge],le=n.get(tt);t.bindTexture(s.TEXTURE_2D,le.__webglTexture),ce(s.TEXTURE_2D,tt),Ie(q.__webglFramebuffer,P,tt,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,0),g(tt)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ge=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ge=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ge,Q.__webglTexture),ce(ge,w),w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)Ie(q.__webglFramebuffer[Re],P,w,s.COLOR_ATTACHMENT0,ge,Re);else Ie(q.__webglFramebuffer,P,w,s.COLOR_ATTACHMENT0,ge,0);g(w)&&p(ge),t.unbindTexture()}P.depthBuffer&&Ke(P)}function te(P){const w=P.textures;for(let q=0,Q=w.length;q<Q;q++){const re=w[q];if(g(re)){const ee=y(P),Le=n.get(re).__webglTexture;t.bindTexture(ee,Le),p(ee),t.unbindTexture()}}}const ue=[],D=[];function Fe(P){if(P.samples>0){if(Ae(P)===!1){const w=P.textures,q=P.width,Q=P.height;let re=s.COLOR_BUFFER_BIT;const ee=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Le=n.get(P),ge=w.length>1;if(ge)for(let Re=0;Re<w.length;Re++)t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Re=0;Re<w.length;Re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),ge){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const tt=n.get(w[Re]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,tt,0)}s.blitFramebuffer(0,0,q,Q,0,0,q,Q,re,s.NEAREST),l===!0&&(ue.length=0,D.length=0,ue.push(s.COLOR_ATTACHMENT0+Re),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ue.push(ee),D.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ge)for(let Re=0;Re<w.length;Re++){t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const tt=n.get(w[Re]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,tt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function oe(P){return Math.min(i.maxSamples,P.samples)}function Ae(P){const w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function me(P){const w=a.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function He(P,w){const q=P.colorSpace,Q=P.format,re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||q!==en&&q!==pi&&(ut.getTransfer(q)===yt?(Q!==fn||re!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),w}function Ce(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=We,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=Ae}function ax(s,e){function t(n,i=pi){let r;const a=ut.getTransfer(i);if(n===ei)return s.UNSIGNED_BYTE;if(n===Fl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ol)return s.UNSIGNED_SHORT_5_5_5_1;if(n===su)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===nu)return s.BYTE;if(n===iu)return s.SHORT;if(n===nr)return s.UNSIGNED_SHORT;if(n===Ul)return s.INT;if(n===Ui)return s.UNSIGNED_INT;if(n===Mn)return s.FLOAT;if(n===Zn)return s.HALF_FLOAT;if(n===ru)return s.ALPHA;if(n===au)return s.RGB;if(n===fn)return s.RGBA;if(n===ou)return s.LUMINANCE;if(n===lu)return s.LUMINANCE_ALPHA;if(n===hs)return s.DEPTH_COMPONENT;if(n===xs)return s.DEPTH_STENCIL;if(n===Bl)return s.RED;if(n===kl)return s.RED_INTEGER;if(n===cu)return s.RG;if(n===zl)return s.RG_INTEGER;if(n===Gl)return s.RGBA_INTEGER;if(n===na||n===ia||n===sa||n===ra)if(a===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vo||n===Wo||n===Xo||n===qo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ko||n===Yo||n===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ko||n===Yo)return a===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zo||n===$o||n===Jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zo)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$o)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qo)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===el)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===il)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===al)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ll)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===aa||n===hl||n===ul)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===aa)return a===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hu||n===dl||n===fl||n===pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===aa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class ox extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Oe extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lx={type:"move"};class Qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lx)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const cx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ux{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Bt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ht({vertexShader:cx,fragmentShader:hx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new R(new tn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dx extends Bi{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const x=new ux,g=t.getContextAttributes();let p=null,y=null;const _=[],v=[],A=new ne;let S=null;const C=new $t;C.viewport=new gt;const L=new $t;L.viewport=new gt;const b=[C,L],M=new ox;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ae=_[Z];return ae===void 0&&(ae=new Qa,_[Z]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(Z){let ae=_[Z];return ae===void 0&&(ae=new Qa,_[Z]=ae),ae.getGripSpace()},this.getHand=function(Z){let ae=_[Z];return ae===void 0&&(ae=new Qa,_[Z]=ae),ae.getHandSpace()};function F(Z){const ae=v.indexOf(Z.inputSource);if(ae===-1)return;const Ie=_[ae];Ie!==void 0&&(Ie.update(Z.inputSource,Z.frame,c||a),Ie.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",Y);for(let Z=0;Z<_.length;Z++){const ae=v[Z];ae!==null&&(v[Z]=null,_[Z].disconnect(ae))}I=null,H=null,x.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",O),i.addEventListener("inputsourceschange",Y),g.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0){const ae={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ae),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Sn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ae=null,Ie=null,pe=null;g.depth&&(pe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=g.stencil?xs:hs,Ie=g.stencil?gs:Ui);const Be={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Be),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Sn(d.textureWidth,d.textureHeight,{format:fn,type:ei,depthTexture:new Tu(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ze.setContext(i),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(Z){for(let ae=0;ae<Z.removed.length;ae++){const Ie=Z.removed[ae],pe=v.indexOf(Ie);pe>=0&&(v[pe]=null,_[pe].disconnect(Ie))}for(let ae=0;ae<Z.added.length;ae++){const Ie=Z.added[ae];let pe=v.indexOf(Ie);if(pe===-1){for(let Ke=0;Ke<_.length;Ke++)if(Ke>=v.length){v.push(Ie),pe=Ke;break}else if(v[Ke]===null){v[Ke]=Ie,pe=Ke;break}if(pe===-1)break}const Be=_[pe];Be&&Be.connect(Ie)}}const V=new E,J=new E;function G(Z,ae,Ie){V.setFromMatrixPosition(ae.matrixWorld),J.setFromMatrixPosition(Ie.matrixWorld);const pe=V.distanceTo(J),Be=ae.projectionMatrix.elements,Ke=Ie.projectionMatrix.elements,We=Be[14]/(Be[10]-1),ct=Be[14]/(Be[10]+1),te=(Be[9]+1)/Be[5],ue=(Be[9]-1)/Be[5],D=(Be[8]-1)/Be[0],Fe=(Ke[8]+1)/Ke[0],oe=We*D,Ae=We*Fe,me=pe/(-D+Fe),He=me*-D;if(ae.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(He),Z.translateZ(me),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Be[10]===-1)Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Ce=We+me,P=ct+me,w=oe-He,q=Ae+(pe-He),Q=te*ct/P*Ce,re=ue*ct/P*Ce;Z.projectionMatrix.makePerspective(w,q,Q,re,Ce,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function N(Z,ae){ae===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ae.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ae=Z.near,Ie=Z.far;x.texture!==null&&(x.depthNear>0&&(ae=x.depthNear),x.depthFar>0&&(Ie=x.depthFar)),M.near=L.near=C.near=ae,M.far=L.far=C.far=Ie,(I!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,H=M.far),C.layers.mask=Z.layers.mask|2,L.layers.mask=Z.layers.mask|4,M.layers.mask=C.layers.mask|L.layers.mask;const pe=Z.parent,Be=M.cameras;N(M,pe);for(let Ke=0;Ke<Be.length;Ke++)N(Be[Ke],pe);Be.length===2?G(M,C,L):M.projectionMatrix.copy(C.projectionMatrix),W(Z,M,pe)};function W(Z,ae,Ie){Ie===null?Z.matrix.copy(ae.matrixWorld):(Z.matrix.copy(Ie.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ae.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ae.projectionMatrix),Z.projectionMatrixInverse.copy(ae.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=vs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let j=null;function ce(Z,ae){if(h=ae.getViewerPose(c||a),m=ae,h!==null){const Ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let pe=!1;Ie.length!==M.cameras.length&&(M.cameras.length=0,pe=!0);for(let Ke=0;Ke<Ie.length;Ke++){const We=Ie[Ke];let ct=null;if(f!==null)ct=f.getViewport(We);else{const ue=u.getViewSubImage(d,We);ct=ue.viewport,Ke===0&&(e.setRenderTargetTextures(y,ue.colorTexture,d.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(y))}let te=b[Ke];te===void 0&&(te=new $t,te.layers.enable(Ke),te.viewport=new gt,b[Ke]=te),te.matrix.fromArray(We.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(We.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(ct.x,ct.y,ct.width,ct.height),Ke===0&&(M.matrix.copy(te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),pe===!0&&M.cameras.push(te)}const Be=i.enabledFeatures;if(Be&&Be.includes("depth-sensing")){const Ke=u.getDepthInformation(Ie[0]);Ke&&Ke.isValid&&Ke.texture&&x.init(e,Ke,i.renderState)}}for(let Ie=0;Ie<_.length;Ie++){const pe=v[Ie],Be=_[Ie];pe!==null&&Be!==void 0&&Be.update(pe,ae,c||a)}j&&j(Z,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}const ze=new wu;ze.setAnimationLoop(ce),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}}const Ci=new Cn,fx=new et;function px(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Mu(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,y,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Yt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Yt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),_=y.envMap,v=y.envMapRotation;_&&(g.envMap.value=_,Ci.copy(v),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),g.envMapRotation.value.setFromMatrix4(fx.makeRotationFromEuler(Ci)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mx(s,e,t,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const v=_.program;n.uniformBlockBinding(y,v)}function c(y,_){let v=i[y.id];v===void 0&&(m(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",g));const A=_.program;n.updateUBOMapping(y,A);const S=e.render.frame;r[y.id]!==S&&(d(y),r[y.id]=S)}function h(y){const _=u();y.__bindingPointIndex=_;const v=s.createBuffer(),A=y.__size,S=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,A,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=i[y.id],v=y.uniforms,A=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let S=0,C=v.length;S<C;S++){const L=Array.isArray(v[S])?v[S]:[v[S]];for(let b=0,M=L.length;b<M;b++){const I=L[b];if(f(I,S,b,A)===!0){const H=I.__offset,F=Array.isArray(I.value)?I.value:[I.value];let O=0;for(let Y=0;Y<F.length;Y++){const V=F[Y],J=x(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,H+O,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,O),O+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,_,v,A){const S=y.value,C=_+"_"+v;if(A[C]===void 0)return typeof S=="number"||typeof S=="boolean"?A[C]=S:A[C]=S.clone(),!0;{const L=A[C];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return A[C]=S,!0}else if(L.equals(S)===!1)return L.copy(S),!0}return!1}function m(y){const _=y.uniforms;let v=0;const A=16;for(let C=0,L=_.length;C<L;C++){const b=Array.isArray(_[C])?_[C]:[_[C]];for(let M=0,I=b.length;M<I;M++){const H=b[M],F=Array.isArray(H.value)?H.value:[H.value];for(let O=0,Y=F.length;O<Y;O++){const V=F[O],J=x(V),G=v%A,N=G%J.boundary,W=G+N;v+=N,W!==0&&A-W<J.storage&&(v+=A-W),H.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=v,v+=J.storage}}}const S=v%A;return S>0&&(v+=A-S),y.__size=v,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){const _=y.target;_.removeEventListener("dispose",g);const v=a.indexOf(_.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class gx{constructor(e={}){const{canvas:t=rf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const y=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this.toneMapping=vi,this.toneMappingExposure=1;const v=this;let A=!1,S=0,C=0,L=null,b=-1,M=null;const I=new gt,H=new gt;let F=null;const O=new Ue(0);let Y=0,V=t.width,J=t.height,G=1,N=null,W=null;const j=new gt(0,0,V,J),ce=new gt(0,0,V,J);let ze=!1;const Z=new Vl;let ae=!1,Ie=!1;const pe=new et,Be=new et,Ke=new E,We=new gt,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function ue(){return L===null?G:1}let D=n;function Fe(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dl}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",be,!1),D===null){const U="webgl2";if(D=Fe(U,T),D===null)throw Fe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let oe,Ae,me,He,Ce,P,w,q,Q,re,ee,Le,ge,Re,tt,le,De,Xe,qe,Ne,st,Ye,rt,k;function xe(){oe=new M0(D),oe.init(),Ye=new ax(D,oe),Ae=new m0(D,oe,e,Ye),me=new ix(D,oe),Ae.reverseDepthBuffer&&d&&me.buffers.depth.setReversed(!0),He=new w0(D),Ce=new Hg,P=new rx(D,oe,me,Ce,Ae,Ye,He),w=new x0(v),q=new y0(v),Q=new Lf(D),rt=new f0(D,Q),re=new S0(D,Q,He,rt),ee=new E0(D,re,Q,He),qe=new T0(D,Ae,P),le=new g0(Ce),Le=new Gg(v,w,q,oe,Ae,rt,le),ge=new px(v,Ce),Re=new Wg,tt=new Zg(oe),Xe=new d0(v,w,q,me,ee,f,l),De=new tx(v,ee,Ae),k=new mx(D,He,Ae,me),Ne=new p0(D,oe,He),st=new b0(D,oe,He),He.programs=Le.programs,v.capabilities=Ae,v.extensions=oe,v.properties=Ce,v.renderLists=Re,v.shadowMap=De,v.state=me,v.info=He}xe();const $=new dx(v,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=oe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=oe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(V,J,!1))},this.getSize=function(T){return T.set(V,J)},this.setSize=function(T,U,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,J=U,t.width=Math.floor(T*G),t.height=Math.floor(U*G),X===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(V*G,J*G).floor()},this.setDrawingBufferSize=function(T,U,X){V=T,J=U,G=X,t.width=Math.floor(T*X),t.height=Math.floor(U*X),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(j)},this.setViewport=function(T,U,X,K){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,U,X,K),me.viewport(I.copy(j).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(ce)},this.setScissor=function(T,U,X,K){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,U,X,K),me.scissor(H.copy(ce).multiplyScalar(G).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(T){me.setScissorTest(ze=T)},this.setOpaqueSort=function(T){N=T},this.setTransparentSort=function(T){W=T},this.getClearColor=function(T){return T.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(T=!0,U=!0,X=!0){let K=0;if(T){let z=!1;if(L!==null){const de=L.texture.format;z=de===Gl||de===zl||de===kl}if(z){const de=L.texture.type,ve=de===ei||de===Ui||de===nr||de===gs||de===Fl||de===Ol,he=Xe.getClearColor(),fe=Xe.getClearAlpha(),Pe=he.r,_e=he.g,we=he.b;ve?(m[0]=Pe,m[1]=_e,m[2]=we,m[3]=fe,D.clearBufferuiv(D.COLOR,0,m)):(x[0]=Pe,x[1]=_e,x[2]=we,x[3]=fe,D.clearBufferiv(D.COLOR,0,x))}else K|=D.COLOR_BUFFER_BIT}U&&(K|=D.DEPTH_BUFFER_BIT),X&&(K|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Re.dispose(),tt.dispose(),Ce.dispose(),w.dispose(),q.dispose(),ee.dispose(),rt.dispose(),k.dispose(),Le.dispose(),$.dispose(),$.removeEventListener("sessionstart",at),$.removeEventListener("sessionend",Ze),ht.stop()};function se(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=He.autoReset,U=De.enabled,X=De.autoUpdate,K=De.needsUpdate,z=De.type;xe(),He.autoReset=T,De.enabled=U,De.autoUpdate=X,De.needsUpdate=K,De.type=z}function be(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Je(T){const U=T.target;U.removeEventListener("dispose",Je),bt(U)}function bt(T){It(T),Ce.remove(T)}function It(T){const U=Ce.get(T).programs;U!==void 0&&(U.forEach(function(X){Le.releaseProgram(X)}),T.isShaderMaterial&&Le.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,X,K,z,de){U===null&&(U=ct);const ve=z.isMesh&&z.matrixWorld.determinant()<0,he=Si(T,U,X,K,z);me.setMaterial(K,ve);let fe=X.index,Pe=1;if(K.wireframe===!0){if(fe=re.getWireframeAttribute(X),fe===void 0)return;Pe=2}const _e=X.drawRange,we=X.attributes.position;let Qe=_e.start*Pe,pt=(_e.start+_e.count)*Pe;de!==null&&(Qe=Math.max(Qe,de.start*Pe),pt=Math.min(pt,(de.start+de.count)*Pe)),fe!==null?(Qe=Math.max(Qe,0),pt=Math.min(pt,fe.count)):we!=null&&(Qe=Math.max(Qe,0),pt=Math.min(pt,we.count));const wt=pt-Qe;if(wt<0||wt===1/0)return;rt.setup(z,K,he,X,fe);let sn,xt=Ne;if(fe!==null&&(sn=Q.get(fe),xt=st,xt.setIndex(sn)),z.isMesh)K.wireframe===!0?(me.setLineWidth(K.wireframeLinewidth*ue()),xt.setMode(D.LINES)):xt.setMode(D.TRIANGLES);else if(z.isLine){let Ge=K.linewidth;Ge===void 0&&(Ge=1),me.setLineWidth(Ge*ue()),z.isLineSegments?xt.setMode(D.LINES):z.isLineLoop?xt.setMode(D.LINE_LOOP):xt.setMode(D.LINE_STRIP)}else z.isPoints?xt.setMode(D.POINTS):z.isSprite&&xt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)xt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))xt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Ge=z._multiDrawStarts,Fn=z._multiDrawCounts,vt=z._multiDrawCount,gn=fe?Q.get(fe).bytesPerElement:1,ki=Ce.get(K).currentProgram.getUniforms();for(let rn=0;rn<vt;rn++)ki.setValue(D,"_gl_DrawID",rn),xt.render(Ge[rn]/gn,Fn[rn])}else if(z.isInstancedMesh)xt.renderInstances(Qe,wt,z.count);else if(X.isInstancedBufferGeometry){const Ge=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Fn=Math.min(X.instanceCount,Ge);xt.renderInstances(Qe,wt,Fn)}else xt.render(Qe,wt)};function ft(T,U,X){T.transparent===!0&&T.side===Jt&&T.forceSinglePass===!1?(T.side=Yt,T.needsUpdate=!0,mn(T,U,X),T.side=Jn,T.needsUpdate=!0,mn(T,U,X),T.side=Jt):mn(T,U,X)}this.compile=function(T,U,X=null){X===null&&(X=T),p=tt.get(X),p.init(U),_.push(p),X.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),T!==X&&T.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const K=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const de=z.material;if(de)if(Array.isArray(de))for(let ve=0;ve<de.length;ve++){const he=de[ve];ft(he,X,z),K.add(he)}else ft(de,X,z),K.add(de)}),_.pop(),p=null,K},this.compileAsync=function(T,U,X=null){const K=this.compile(T,U,X);return new Promise(z=>{function de(){if(K.forEach(function(ve){Ce.get(ve).currentProgram.isReady()&&K.delete(ve)}),K.size===0){z(T);return}setTimeout(de,10)}oe.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let ie=null;function Te(T){ie&&ie(T)}function at(){ht.stop()}function Ze(){ht.start()}const ht=new wu;ht.setAnimationLoop(Te),typeof self<"u"&&ht.setContext(self),this.setAnimationLoop=function(T){ie=T,$.setAnimationLoop(T),T===null?ht.stop():ht.start()},$.addEventListener("sessionstart",at),$.addEventListener("sessionend",Ze),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(U),U=$.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,U,L),p=tt.get(T,_.length),p.init(U),_.push(p),Be.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(Be),Ie=this.localClippingEnabled,ae=le.init(this.clippingPlanes,Ie),g=Re.get(T,y.length),g.init(),y.push(g),$.enabled===!0&&$.isPresenting===!0){const de=v.xr.getDepthSensingMesh();de!==null&&Lt(de,U,-1/0,v.sortObjects)}Lt(T,U,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(N,W),te=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,te&&Xe.addToRenderList(g,T),this.info.render.frame++,ae===!0&&le.beginShadows();const X=p.state.shadowsArray;De.render(X,T,U),ae===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=g.opaque,z=g.transmissive;if(p.setupLights(),U.isArrayCamera){const de=U.cameras;if(z.length>0)for(let ve=0,he=de.length;ve<he;ve++){const fe=de[ve];Ct(K,z,T,fe)}te&&Xe.render(T);for(let ve=0,he=de.length;ve<he;ve++){const fe=de[ve];ti(g,T,fe,fe.viewport)}}else z.length>0&&Ct(K,z,T,U),te&&Xe.render(T),ti(g,T,U);L!==null&&(P.updateMultisampleRenderTarget(L),P.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(v,T,U),rt.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(p=_[_.length-1],ae===!0&&le.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Lt(T,U,X,K){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){K&&We.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Be);const ve=ee.update(T),he=T.material;he.visible&&g.push(T,ve,he,X,We.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){const ve=ee.update(T),he=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),We.copy(T.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),We.copy(ve.boundingSphere.center)),We.applyMatrix4(T.matrixWorld).applyMatrix4(Be)),Array.isArray(he)){const fe=ve.groups;for(let Pe=0,_e=fe.length;Pe<_e;Pe++){const we=fe[Pe],Qe=he[we.materialIndex];Qe&&Qe.visible&&g.push(T,ve,Qe,X,We.z,we)}}else he.visible&&g.push(T,ve,he,X,We.z,null)}}const de=T.children;for(let ve=0,he=de.length;ve<he;ve++)Lt(de[ve],U,X,K)}function ti(T,U,X,K){const z=T.opaque,de=T.transmissive,ve=T.transparent;p.setupLightsView(X),ae===!0&&le.setGlobalState(v.clippingPlanes,X),K&&me.viewport(I.copy(K)),z.length>0&&nn(z,U,X),de.length>0&&nn(de,U,X),ve.length>0&&nn(ve,U,X),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Ct(T,U,X,K){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[K.id]===void 0&&(p.state.transmissionRenderTarget[K.id]=new Sn(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?Zn:ei,minFilter:Kn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ut.workingColorSpace}));const de=p.state.transmissionRenderTarget[K.id],ve=K.viewport||I;de.setSize(ve.z,ve.w);const he=v.getRenderTarget();v.setRenderTarget(de),v.getClearColor(O),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),te&&Xe.render(X);const fe=v.toneMapping;v.toneMapping=vi;const Pe=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),p.setupLightsView(K),ae===!0&&le.setGlobalState(v.clippingPlanes,K),nn(T,X,K),P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de),oe.has("WEBGL_multisampled_render_to_texture")===!1){let _e=!1;for(let we=0,Qe=U.length;we<Qe;we++){const pt=U[we],wt=pt.object,sn=pt.geometry,xt=pt.material,Ge=pt.group;if(xt.side===Jt&&wt.layers.test(K.layers)){const Fn=xt.side;xt.side=Yt,xt.needsUpdate=!0,Mi(wt,X,K,sn,xt,Ge),xt.side=Fn,xt.needsUpdate=!0,_e=!0}}_e===!0&&(P.updateMultisampleRenderTarget(de),P.updateRenderTargetMipmap(de))}v.setRenderTarget(he),v.setClearColor(O,Y),Pe!==void 0&&(K.viewport=Pe),v.toneMapping=fe}function nn(T,U,X){const K=U.isScene===!0?U.overrideMaterial:null;for(let z=0,de=T.length;z<de;z++){const ve=T[z],he=ve.object,fe=ve.geometry,Pe=K===null?ve.material:K,_e=ve.group;he.layers.test(X.layers)&&Mi(he,U,X,fe,Pe,_e)}}function Mi(T,U,X,K,z,de){T.onBeforeRender(v,U,X,K,z,de),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(v,U,X,K,T,de),z.transparent===!0&&z.side===Jt&&z.forceSinglePass===!1?(z.side=Yt,z.needsUpdate=!0,v.renderBufferDirect(X,U,K,z,T,de),z.side=Jn,z.needsUpdate=!0,v.renderBufferDirect(X,U,K,z,T,de),z.side=Jt):v.renderBufferDirect(X,U,K,z,T,de),T.onAfterRender(v,U,X,K,z,de)}function mn(T,U,X){U.isScene!==!0&&(U=ct);const K=Ce.get(T),z=p.state.lights,de=p.state.shadowsArray,ve=z.state.version,he=Le.getParameters(T,z.state,de,U,X),fe=Le.getProgramCacheKey(he);let Pe=K.programs;K.environment=T.isMeshStandardMaterial?U.environment:null,K.fog=U.fog,K.envMap=(T.isMeshStandardMaterial?q:w).get(T.envMap||K.environment),K.envMapRotation=K.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Pe===void 0&&(T.addEventListener("dispose",Je),Pe=new Map,K.programs=Pe);let _e=Pe.get(fe);if(_e!==void 0){if(K.currentProgram===_e&&K.lightsStateVersion===ve)return ni(T,he),_e}else he.uniforms=Le.getUniforms(T),T.onBeforeCompile(he,v),_e=Le.acquireProgram(he,fe),Pe.set(fe,_e),K.uniforms=he.uniforms;const we=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(we.clippingPlanes=le.uniform),ni(T,he),K.needsLights=si(T),K.lightsStateVersion=ve,K.needsLights&&(we.ambientLightColor.value=z.state.ambient,we.lightProbe.value=z.state.probe,we.directionalLights.value=z.state.directional,we.directionalLightShadows.value=z.state.directionalShadow,we.spotLights.value=z.state.spot,we.spotLightShadows.value=z.state.spotShadow,we.rectAreaLights.value=z.state.rectArea,we.ltc_1.value=z.state.rectAreaLTC1,we.ltc_2.value=z.state.rectAreaLTC2,we.pointLights.value=z.state.point,we.pointLightShadows.value=z.state.pointShadow,we.hemisphereLights.value=z.state.hemi,we.directionalShadowMap.value=z.state.directionalShadowMap,we.directionalShadowMatrix.value=z.state.directionalShadowMatrix,we.spotShadowMap.value=z.state.spotShadowMap,we.spotLightMatrix.value=z.state.spotLightMatrix,we.spotLightMap.value=z.state.spotLightMap,we.pointShadowMap.value=z.state.pointShadowMap,we.pointShadowMatrix.value=z.state.pointShadowMatrix),K.currentProgram=_e,K.uniformsList=null,_e}function Un(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=oa.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function ni(T,U){const X=Ce.get(T);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function Si(T,U,X,K,z){U.isScene!==!0&&(U=ct),P.resetTextureUnits();const de=U.fog,ve=K.isMeshStandardMaterial?U.environment:null,he=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:en,fe=(K.isMeshStandardMaterial?q:w).get(K.envMap||ve),Pe=K.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,_e=!!X.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),we=!!X.morphAttributes.position,Qe=!!X.morphAttributes.normal,pt=!!X.morphAttributes.color;let wt=vi;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(wt=v.toneMapping);const sn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,xt=sn!==void 0?sn.length:0,Ge=Ce.get(K),Fn=p.state.lights;if(ae===!0&&(Ie===!0||T!==M)){const cn=T===M&&K.id===b;le.setState(K,T,cn)}let vt=!1;K.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Fn.state.version||Ge.outputColorSpace!==he||z.isBatchedMesh&&Ge.batching===!1||!z.isBatchedMesh&&Ge.batching===!0||z.isBatchedMesh&&Ge.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Ge.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Ge.instancing===!1||!z.isInstancedMesh&&Ge.instancing===!0||z.isSkinnedMesh&&Ge.skinning===!1||!z.isSkinnedMesh&&Ge.skinning===!0||z.isInstancedMesh&&Ge.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ge.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ge.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ge.instancingMorph===!1&&z.morphTexture!==null||Ge.envMap!==fe||K.fog===!0&&Ge.fog!==de||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==le.numPlanes||Ge.numIntersection!==le.numIntersection)||Ge.vertexAlphas!==Pe||Ge.vertexTangents!==_e||Ge.morphTargets!==we||Ge.morphNormals!==Qe||Ge.morphColors!==pt||Ge.toneMapping!==wt||Ge.morphTargetsCount!==xt)&&(vt=!0):(vt=!0,Ge.__version=K.version);let gn=Ge.currentProgram;vt===!0&&(gn=mn(K,U,z));let ki=!1,rn=!1,Ps=!1;const Tt=gn.getUniforms(),wn=Ge.uniforms;if(me.useProgram(gn.program)&&(ki=!0,rn=!0,Ps=!0),K.id!==b&&(b=K.id,rn=!0),ki||M!==T){me.buffers.depth.getReversed()?(pe.copy(T.projectionMatrix),of(pe),lf(pe),Tt.setValue(D,"projectionMatrix",pe)):Tt.setValue(D,"projectionMatrix",T.projectionMatrix),Tt.setValue(D,"viewMatrix",T.matrixWorldInverse);const ri=Tt.map.cameraPosition;ri!==void 0&&ri.setValue(D,Ke.setFromMatrixPosition(T.matrixWorld)),Ae.logarithmicDepthBuffer&&Tt.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Tt.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,rn=!0,Ps=!0)}if(z.isSkinnedMesh){Tt.setOptional(D,z,"bindMatrix"),Tt.setOptional(D,z,"bindMatrixInverse");const cn=z.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Tt.setValue(D,"boneTexture",cn.boneTexture,P))}z.isBatchedMesh&&(Tt.setOptional(D,z,"batchingTexture"),Tt.setValue(D,"batchingTexture",z._matricesTexture,P),Tt.setOptional(D,z,"batchingIdTexture"),Tt.setValue(D,"batchingIdTexture",z._indirectTexture,P),Tt.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&Tt.setValue(D,"batchingColorTexture",z._colorsTexture,P));const Ls=X.morphAttributes;if((Ls.position!==void 0||Ls.normal!==void 0||Ls.color!==void 0)&&qe.update(z,X,gn),(rn||Ge.receiveShadow!==z.receiveShadow)&&(Ge.receiveShadow=z.receiveShadow,Tt.setValue(D,"receiveShadow",z.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(wn.envMap.value=fe,wn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&U.environment!==null&&(wn.envMapIntensity.value=U.environmentIntensity),rn&&(Tt.setValue(D,"toneMappingExposure",v.toneMappingExposure),Ge.needsLights&&ii(wn,Ps),de&&K.fog===!0&&ge.refreshFogUniforms(wn,de),ge.refreshMaterialUniforms(wn,K,G,J,p.state.transmissionRenderTarget[T.id]),oa.upload(D,Un(Ge),wn,P)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(oa.upload(D,Un(Ge),wn,P),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Tt.setValue(D,"center",z.center),Tt.setValue(D,"modelViewMatrix",z.modelViewMatrix),Tt.setValue(D,"normalMatrix",z.normalMatrix),Tt.setValue(D,"modelMatrix",z.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const cn=K.uniformsGroups;for(let ri=0,ai=cn.length;ri<ai;ri++){const ic=cn[ri];k.update(ic,gn),k.bind(ic,gn)}}return gn}function ii(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function si(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,U,X){Ce.get(T.texture).__webglTexture=U,Ce.get(T.depthTexture).__webglTexture=X;const K=Ce.get(T);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=X===void 0,K.__autoAllocateDepthBuffer||oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,U){const X=Ce.get(T);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,X=0){L=T,S=U,C=X;let K=!0,z=null,de=!1,ve=!1;if(T){const fe=Ce.get(T);if(fe.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(D.FRAMEBUFFER,null),K=!1;else if(fe.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(fe.__hasExternalTextures)P.rebindTextures(T,Ce.get(T.texture).__webglTexture,Ce.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const we=T.depthTexture;if(fe.__boundDepthTexture!==we){if(we!==null&&Ce.has(we)&&(T.width!==we.image.width||T.height!==we.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}const Pe=T.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(ve=!0);const _e=Ce.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(_e[U])?z=_e[U][X]:z=_e[U],de=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?z=Ce.get(T).__webglMultisampledFramebuffer:Array.isArray(_e)?z=_e[X]:z=_e,I.copy(T.viewport),H.copy(T.scissor),F=T.scissorTest}else I.copy(j).multiplyScalar(G).floor(),H.copy(ce).multiplyScalar(G).floor(),F=ze;if(me.bindFramebuffer(D.FRAMEBUFFER,z)&&K&&me.drawBuffers(T,z),me.viewport(I),me.scissor(H),me.setScissorTest(F),de){const fe=Ce.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,fe.__webglTexture,X)}else if(ve){const fe=Ce.get(T.texture),Pe=U||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,fe.__webglTexture,X||0,Pe)}b=-1},this.readRenderTargetPixels=function(T,U,X,K,z,de,ve){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(he=he[ve]),he){me.bindFramebuffer(D.FRAMEBUFFER,he);try{const fe=T.texture,Pe=fe.format,_e=fe.type;if(!Ae.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ae.textureTypeReadable(_e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-K&&X>=0&&X<=T.height-z&&D.readPixels(U,X,K,z,Ye.convert(Pe),Ye.convert(_e),de)}finally{const fe=L!==null?Ce.get(L).__webglFramebuffer:null;me.bindFramebuffer(D.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(T,U,X,K,z,de,ve){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(he=he[ve]),he){const fe=T.texture,Pe=fe.format,_e=fe.type;if(!Ae.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ae.textureTypeReadable(_e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=T.width-K&&X>=0&&X<=T.height-z){me.bindFramebuffer(D.FRAMEBUFFER,he);const we=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.bufferData(D.PIXEL_PACK_BUFFER,de.byteLength,D.STREAM_READ),D.readPixels(U,X,K,z,Ye.convert(Pe),Ye.convert(_e),0);const Qe=L!==null?Ce.get(L).__webglFramebuffer:null;me.bindFramebuffer(D.FRAMEBUFFER,Qe);const pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await af(D,pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,we),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,de),D.deleteBuffer(we),D.deleteSync(pt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,U=null,X=0){T.isTexture!==!0&&(Ks("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,T=arguments[1]);const K=Math.pow(2,-X),z=Math.floor(T.image.width*K),de=Math.floor(T.image.height*K),ve=U!==null?U.x:0,he=U!==null?U.y:0;P.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,ve,he,z,de),me.unbindTexture()},this.copyTextureToTexture=function(T,U,X=null,K=null,z=0){T.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,T=arguments[1],U=arguments[2],z=arguments[3]||0,X=null);let de,ve,he,fe,Pe,_e,we,Qe,pt;const wt=T.isCompressedTexture?T.mipmaps[z]:T.image;X!==null?(de=X.max.x-X.min.x,ve=X.max.y-X.min.y,he=X.isBox3?X.max.z-X.min.z:1,fe=X.min.x,Pe=X.min.y,_e=X.isBox3?X.min.z:0):(de=wt.width,ve=wt.height,he=wt.depth||1,fe=0,Pe=0,_e=0),K!==null?(we=K.x,Qe=K.y,pt=K.z):(we=0,Qe=0,pt=0);const sn=Ye.convert(U.format),xt=Ye.convert(U.type);let Ge;U.isData3DTexture?(P.setTexture3D(U,0),Ge=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(P.setTexture2DArray(U,0),Ge=D.TEXTURE_2D_ARRAY):(P.setTexture2D(U,0),Ge=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const Fn=D.getParameter(D.UNPACK_ROW_LENGTH),vt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),gn=D.getParameter(D.UNPACK_SKIP_PIXELS),ki=D.getParameter(D.UNPACK_SKIP_ROWS),rn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,wt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Pe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,_e);const Ps=T.isDataArrayTexture||T.isData3DTexture,Tt=U.isDataArrayTexture||U.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const wn=Ce.get(T),Ls=Ce.get(U),cn=Ce.get(wn.__renderTarget),ri=Ce.get(Ls.__renderTarget);me.bindFramebuffer(D.READ_FRAMEBUFFER,cn.__webglFramebuffer),me.bindFramebuffer(D.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let ai=0;ai<he;ai++)Ps&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(T).__webglTexture,z,_e+ai),T.isDepthTexture?(Tt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(U).__webglTexture,z,pt+ai),D.blitFramebuffer(fe,Pe,de,ve,we,Qe,de,ve,D.DEPTH_BUFFER_BIT,D.NEAREST)):Tt?D.copyTexSubImage3D(Ge,z,we,Qe,pt+ai,fe,Pe,de,ve):D.copyTexSubImage2D(Ge,z,we,Qe,pt+ai,fe,Pe,de,ve);me.bindFramebuffer(D.READ_FRAMEBUFFER,null),me.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Tt?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(Ge,z,we,Qe,pt,de,ve,he,sn,xt,wt.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Ge,z,we,Qe,pt,de,ve,he,sn,wt.data):D.texSubImage3D(Ge,z,we,Qe,pt,de,ve,he,sn,xt,wt):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,z,we,Qe,de,ve,sn,xt,wt.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,z,we,Qe,wt.width,wt.height,sn,wt.data):D.texSubImage2D(D.TEXTURE_2D,z,we,Qe,de,ve,sn,xt,wt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Fn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,vt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,gn),D.pixelStorei(D.UNPACK_SKIP_ROWS,ki),D.pixelStorei(D.UNPACK_SKIP_IMAGES,rn),z===0&&U.generateMipmaps&&D.generateMipmap(Ge),me.unbindTexture()},this.copyTextureToTexture3D=function(T,U,X=null,K=null,z=0){return T.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,K=arguments[1]||null,T=arguments[2],U=arguments[3],z=arguments[4]||0),Ks('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,U,X,K,z)},this.initRenderTarget=function(T){Ce.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),me.unbindTexture()},this.resetState=function(){S=0,C=0,L=null,me.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ut._getDrawingBufferColorSpace(e),t.unpackColorSpace=ut._getUnpackColorSpace()}}class ha{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new ha(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Pu extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Lu{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gl,this.updateRanges=[],this.version=0,this.uuid=pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new E;class or{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new or(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Wt extends bn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let es;const Fs=new E,ts=new E,ns=new E,is=new ne,Os=new ne,Iu=new et,Ur=new E,Bs=new E,Fr=new E,sh=new ne,eo=new ne,rh=new ne;class Kt extends At{constructor(e=new Wt){if(super(),this.isSprite=!0,this.type="Sprite",es===void 0){es=new _t;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lu(t,5);es.setIndex([0,1,2,0,2,3]),es.setAttribute("position",new or(n,3,0,!1)),es.setAttribute("uv",new or(n,2,3,!1))}this.geometry=es,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ts.setFromMatrixScale(this.matrixWorld),Iu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ns.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ts.multiplyScalar(-ns.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Or(Ur.set(-.5,-.5,0),ns,a,ts,i,r),Or(Bs.set(.5,-.5,0),ns,a,ts,i,r),Or(Fr.set(.5,.5,0),ns,a,ts,i,r),sh.set(0,0),eo.set(1,0),rh.set(1,1);let o=e.ray.intersectTriangle(Ur,Bs,Fr,!1,Fs);if(o===null&&(Or(Bs.set(-.5,.5,0),ns,a,ts,i,r),eo.set(0,1),o=e.ray.intersectTriangle(Ur,Fr,Bs,!1,Fs),o===null))return;const l=e.ray.origin.distanceTo(Fs);l<e.near||l>e.far||t.push({distance:l,point:Fs.clone(),uv:dn.getInterpolation(Fs,Ur,Bs,Fr,sh,eo,rh,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Or(s,e,t,n,i,r){is.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Os.x=r*is.x-i*is.y,Os.y=i*is.x+r*is.y):Os.copy(is),s.copy(e),s.x+=Os.x,s.y+=Os.y,s.applyMatrix4(Iu)}const ah=new E,oh=new gt,lh=new gt,xx=new E,ch=new et,Br=new E,to=new In,hh=new et,no=new _a;class vx extends R{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=oc,this.bindMatrix=new et,this.bindMatrixInverse=new et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Br),this.boundingBox.expandByPoint(Br)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new In),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Br),this.boundingSphere.expandByPoint(Br)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),to.copy(this.boundingSphere),to.applyMatrix4(i),e.ray.intersectsSphere(to)!==!1&&(hh.copy(i).invert(),no.copy(e.ray).applyMatrix4(hh),!(this.boundingBox!==null&&no.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,no)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new gt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===oc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;oh.fromBufferAttribute(i.attributes.skinIndex,e),lh.fromBufferAttribute(i.attributes.skinWeight,e),ah.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=lh.getComponent(r);if(a!==0){const o=oh.getComponent(r);ch.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(xx.copy(ah).applyMatrix4(ch),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Du extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Nu extends Bt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Qt,h=Qt,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const uh=new et,_x=new et;class Xl{constructor(e=[],t=[]){this.uuid=pn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new et;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:_x;uh.multiplyMatrices(o,t[r]),uh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Xl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Nu(t,e,e,fn,Mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Du),this.bones.push(a),this.boneInverses.push(new et().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class _l extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ss=new et,dh=new et,kr=[],fh=new Ln,yx=new et,ks=new R,zs=new In;class Mx extends R{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _l(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,yx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),fh.copy(e.boundingBox).applyMatrix4(ss),this.boundingBox.union(fh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new In),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),zs.copy(e.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(n),e.ray.intersectsSphere(zs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ss),dh.multiplyMatrices(n,ss),ks.matrixWorld=dh,ks.raycast(e,kr);for(let a=0,o=kr.length;a<o;a++){const l=kr[a];l.instanceId=r,l.object=this,t.push(l)}kr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new _l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nu(new Float32Array(i*this.count),i,this.count,Bl,Mn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Uu extends bn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ua=new E,da=new E,ph=new et,Gs=new _a,zr=new In,io=new E,mh=new E;class ql extends At{constructor(e=new _t,t=new Uu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ua.fromBufferAttribute(t,i-1),da.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ua.distanceTo(da);e.setAttribute("lineDistance",new je(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(i),zr.radius+=r,e.ray.intersectsSphere(zr)===!1)return;ph.copy(i).invert(),Gs.copy(e.ray).applyMatrix4(ph);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=h.getX(x),y=h.getX(x+1),_=Gr(this,e,Gs,l,p,y);_&&t.push(_)}if(this.isLineLoop){const x=h.getX(m-1),g=h.getX(f),p=Gr(this,e,Gs,l,x,g);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,g=m-1;x<g;x+=c){const p=Gr(this,e,Gs,l,x,x+1);p&&t.push(p)}if(this.isLineLoop){const x=Gr(this,e,Gs,l,m-1,f);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gr(s,e,t,n,i,r){const a=s.geometry.attributes.position;if(ua.fromBufferAttribute(a,i),da.fromBufferAttribute(a,r),t.distanceSqToSegment(ua,da,io,mh)>n)return;io.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(io);if(!(l<e.near||l>e.far))return{distance:l,point:mh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const gh=new E,xh=new E;class Sx extends ql{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)gh.fromBufferAttribute(t,i),xh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+gh.distanceTo(xh);e.setAttribute("lineDistance",new je(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bx extends ql{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Sa extends bn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vh=new et,yl=new _a,Hr=new In,Vr=new E;class Kl extends At{constructor(e=new _t,t=new Sa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Hr.radius+=r,e.ray.intersectsSphere(Hr)===!1)return;vh.copy(i).invert(),yl.copy(e.ray).applyMatrix4(vh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,x=f;m<x;m++){const g=c.getX(m);Vr.fromBufferAttribute(u,g),_h(Vr,g,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,x=f;m<x;m++)Vr.fromBufferAttribute(u,m),_h(Vr,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function _h(s,e,t,n,i,r,a){const o=yl.distanceSqToPoint(s);if(o<t){const l=new E;yl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ot extends Bt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new ne:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new E,i=[],r=[],a=[],o=new E,l=new et;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Ut(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ut(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Yl extends Dn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ne){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class wx extends Yl{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function jl(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+n*o}}}const Wr=new E,so=new jl,ro=new jl,ao=new jl;class Ni extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){const n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Wr.subVectors(i[0],i[1]).add(i[0]),c=Wr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Wr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Wr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),so.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,x,g),ro.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,x,g),ao.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(so.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ro.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ao.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(so.calc(l),ro.calc(l),ao.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function yh(s,e,t,n,i){const r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Tx(s,e){const t=1-s;return t*t*e}function Ex(s,e){return 2*(1-s)*s*e}function Ax(s,e){return s*s*e}function Qs(s,e,t,n){return Tx(s,e)+Ex(s,t)+Ax(s,n)}function Cx(s,e){const t=1-s;return t*t*t*e}function Rx(s,e){const t=1-s;return 3*t*t*s*e}function Px(s,e){return 3*(1-s)*s*s*e}function Lx(s,e){return s*s*s*e}function er(s,e,t,n,i){return Cx(s,e)+Rx(s,t)+Px(s,n)+Lx(s,i)}class Fu extends Dn{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(er(e,i.x,r.x,a.x,o.x),er(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ix extends Dn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(er(e,i.x,r.x,a.x,o.x),er(e,i.y,r.y,a.y,o.y),er(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ou extends Dn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Dx extends Dn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bu extends Dn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,i.x,r.x,a.x),Qs(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ku extends Dn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,i.x,r.x,a.x),Qs(e,i.y,r.y,a.y),Qs(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zu extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(yh(o,l.x,c.x,h.x,u.x),yh(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ne().fromArray(i))}return this}}var fa=Object.freeze({__proto__:null,ArcCurve:wx,CatmullRomCurve3:Ni,CubicBezierCurve:Fu,CubicBezierCurve3:Ix,EllipseCurve:Yl,LineCurve:Ou,LineCurve3:Dx,QuadraticBezierCurve:Bu,QuadraticBezierCurve3:ku,SplineCurve:zu});class Nx extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new fa[i.type]().fromJSON(i))}return this}}class Ml extends Nx{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ou(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Bu(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){const o=new Fu(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new zu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){const c=new Yl(e,t,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ys extends _t{constructor(e=[new ne(0,-.5),new ne(.5,0),new ne(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ut(i,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/t,u=new E,d=new ne,f=new E,m=new E,x=new E;let g=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(m)}for(let y=0;y<=t;y++){const _=n+y*h*i,v=Math.sin(_),A=Math.cos(_);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*v,u.y=e[S].y,u.z=e[S].x*A,a.push(u.x,u.y,u.z),d.x=y/t,d.y=S/(e.length-1),o.push(d.x,d.y);const C=l[3*S+0]*v,L=l[3*S+1],b=l[3*S+0]*A;c.push(C,L,b)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){const v=_+y*e.length,A=v,S=v+e.length,C=v+e.length+1,L=v+1;r.push(A,S,L),r.push(C,L,S)}this.setIndex(r),this.setAttribute("position",new je(a,3)),this.setAttribute("uv",new je(o,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ys(e.points,e.segments,e.phiStart,e.phiLength)}}class Dt extends ys{constructor(e=1,t=1,n=4,i=8){const r=new Ml;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Dt(e.radius,e.length,e.capSegments,e.radialSegments)}}class Gu extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new E,h=new ne;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(o,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gu(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class $e extends _t{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const x=[],g=n/2;let p=0;y(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(f,2));function y(){const v=new E,A=new E;let S=0;const C=(t-e)/n;for(let L=0;L<=r;L++){const b=[],M=L/r,I=M*(t-e)+e;for(let H=0;H<=i;H++){const F=H/i,O=F*l+o,Y=Math.sin(O),V=Math.cos(O);A.x=I*Y,A.y=-M*n+g,A.z=I*V,u.push(A.x,A.y,A.z),v.set(Y,C,V).normalize(),d.push(v.x,v.y,v.z),f.push(F,1-M),b.push(m++)}x.push(b)}for(let L=0;L<i;L++)for(let b=0;b<r;b++){const M=x[b][L],I=x[b+1][L],H=x[b+1][L+1],F=x[b][L+1];(e>0||b!==0)&&(h.push(M,I,F),S+=3),(t>0||b!==r-1)&&(h.push(I,H,F),S+=3)}c.addGroup(p,S,0),p+=S}function _(v){const A=m,S=new ne,C=new E;let L=0;const b=v===!0?e:t,M=v===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const I=m;for(let H=0;H<=i;H++){const O=H/i*l+o,Y=Math.cos(O),V=Math.sin(O);C.x=b*V,C.y=g*M,C.z=b*Y,u.push(C.x,C.y,C.z),d.push(0,M,0),S.x=Y*.5+.5,S.y=V*.5*M+.5,f.push(S.x,S.y),m++}for(let H=0;H<i;H++){const F=A+H,O=I+H;v===!0?h.push(O,O+1,F):h.push(O+1,O,F),L+=3}c.addGroup(p,L,v===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mt extends $e{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new mt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zl extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new je(r,3)),this.setAttribute("normal",new je(r.slice(),3)),this.setAttribute("uv",new je(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const _=new E,v=new E,A=new E;for(let S=0;S<t.length;S+=3)f(t[S+0],_),f(t[S+1],v),f(t[S+2],A),l(_,v,A,y)}function l(y,_,v,A){const S=A+1,C=[];for(let L=0;L<=S;L++){C[L]=[];const b=y.clone().lerp(v,L/S),M=_.clone().lerp(v,L/S),I=S-L;for(let H=0;H<=I;H++)H===0&&L===S?C[L][H]=b:C[L][H]=b.clone().lerp(M,H/I)}for(let L=0;L<S;L++)for(let b=0;b<2*(S-L)-1;b++){const M=Math.floor(b/2);b%2===0?(d(C[L][M+1]),d(C[L+1][M]),d(C[L][M])):(d(C[L][M+1]),d(C[L+1][M+1]),d(C[L+1][M]))}}function c(y){const _=new E;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(y),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){const y=new E;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const v=g(y)/2/Math.PI+.5,A=p(y)/Math.PI+.5;a.push(v,1-A)}m(),u()}function u(){for(let y=0;y<a.length;y+=6){const _=a[y+0],v=a[y+2],A=a[y+4],S=Math.max(_,v,A),C=Math.min(_,v,A);S>.9&&C<.1&&(_<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,_){const v=y*3;_.x=e[v+0],_.y=e[v+1],_.z=e[v+2]}function m(){const y=new E,_=new E,v=new E,A=new E,S=new ne,C=new ne,L=new ne;for(let b=0,M=0;b<r.length;b+=9,M+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),S.set(a[M+0],a[M+1]),C.set(a[M+2],a[M+3]),L.set(a[M+4],a[M+5]),A.copy(y).add(_).add(v).divideScalar(3);const I=g(A);x(S,M+0,y,I),x(C,M+2,_,I),x(L,M+4,v,I)}}function x(y,_,v,A){A<0&&y.x===1&&(a[_]=y.x-1),v.x===0&&v.z===0&&(a[_]=A/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zl(e.vertices,e.indices,e.radius,e.details)}}class ur extends Ml{constructor(e){super(e),this.uuid=pn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Ml().fromJSON(i))}return this}}const Ux={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Hu(s,0,i,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(n&&(r=zx(s,e,r,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let m=t;m<i;m+=t)u=s[m],d=s[m+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return lr(r,a,t,o,l,f,0),a}};function Hu(s,e,t,n,i){let r,a;if(i===$x(s,e,t,n)>0)for(r=e;r<t;r+=n)a=Mh(r,s[r],s[r+1],a);else for(r=t-n;r>=e;r-=n)a=Mh(r,s[r],s[r+1],a);return a&&ba(a,a.next)&&(hr(a),a=a.next),a}function Fi(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(ba(t,t.next)||Pt(t.prev,t,t.next)===0)){if(hr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function lr(s,e,t,n,i,r,a){if(!s)return;!a&&r&&Xx(s,n,i,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Ox(s,n,i,r):Fx(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),hr(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Bx(Fi(s),e,t),lr(s,e,t,n,i,r,2)):a===2&&kx(s,e,t,n,i,r):lr(Fi(s),e,t,n,i,r,1);break}}}function Fx(s){const e=s.prev,t=s,n=s.next;if(Pt(e,t,n)>=0)return!1;const i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<r?i<a?i:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&ls(i,o,r,l,a,c,m.x,m.y)&&Pt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ox(s,e,t,n){const i=s.prev,r=s,a=s.next;if(Pt(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,x=o>l?o>c?o:c:l>c?l:c,g=h>u?h>d?h:d:u>d?u:d,p=Sl(f,m,e,t,n),y=Sl(x,g,e,t,n);let _=s.prevZ,v=s.nextZ;for(;_&&_.z>=p&&v&&v.z<=y;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&ls(o,h,l,u,c,d,_.x,_.y)&&Pt(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&ls(o,h,l,u,c,d,v.x,v.y)&&Pt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=m&&_.y<=g&&_!==i&&_!==a&&ls(o,h,l,u,c,d,_.x,_.y)&&Pt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&ls(o,h,l,u,c,d,v.x,v.y)&&Pt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Bx(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!ba(i,r)&&Vu(i,n,n.next,r)&&cr(i,r)&&cr(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),hr(n),hr(n.next),n=s=r),n=n.next}while(n!==s);return Fi(n)}function kx(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Yx(a,o)){let l=Wu(a,o);a=Fi(a,a.next),l=Fi(l,l.next),lr(a,e,t,n,i,r,0),lr(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function zx(s,e,t,n){const i=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=Hu(s,o,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Kx(c));for(i.sort(Gx),r=0;r<i.length;r++)t=Hx(i[r],t);return t}function Gx(s,e){return s.x-e.x}function Hx(s,e){const t=Vx(s,e);if(!t)return e;const n=Wu(t,s);return Fi(n,n.next),Fi(t,t.next)}function Vx(s,e){let t=e,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&ls(a<c?r:n,a,l,c,a<c?n:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),cr(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Wx(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function Wx(s,e){return Pt(s.prev,s,e.prev)<0&&Pt(e.next,s,s.next)<0}function Xx(s,e,t,n){let i=s;do i.z===0&&(i.z=Sl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,qx(i)}function qx(s){let e,t,n,i,r,a,o,l,c=1;do{for(t=s,s=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(a>1);return s}function Sl(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Kx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function ls(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function Yx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!jx(s,e)&&(cr(s,e)&&cr(e,s)&&Zx(s,e)&&(Pt(s.prev,s,e.prev)||Pt(s,e.prev,e))||ba(s,e)&&Pt(s.prev,s,s.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ba(s,e){return s.x===e.x&&s.y===e.y}function Vu(s,e,t,n){const i=qr(Pt(s,e,t)),r=qr(Pt(s,e,n)),a=qr(Pt(t,n,s)),o=qr(Pt(t,n,e));return!!(i!==r&&a!==o||i===0&&Xr(s,t,e)||r===0&&Xr(s,n,e)||a===0&&Xr(t,s,n)||o===0&&Xr(t,e,n))}function Xr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function qr(s){return s>0?1:s<0?-1:0}function jx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Vu(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function cr(s,e){return Pt(s.prev,s,s.next)<0?Pt(s,e,s.next)>=0&&Pt(s,s.prev,e)>=0:Pt(s,e,s.prev)<0||Pt(s,s.next,e)<0}function Zx(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Wu(s,e){const t=new bl(s.i,s.x,s.y),n=new bl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Mh(s,e,t,n){const i=new bl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function hr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function bl(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $x(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class _i{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return _i.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];Sh(e),bh(n,e);let a=e.length;t.forEach(Sh);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,bh(n,t[l]);const o=Ux.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Sh(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function bh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class dr extends _t{constructor(e=new ur([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new je(i,3)),this.setAttribute("uv",new je(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Jx;let _,v=!1,A,S,C,L;p&&(_=p.getSpacedPoints(h),v=!0,d=!1,A=p.computeFrenetFrames(h,!1),S=new E,C=new E,L=new E),d||(g=0,f=0,m=0,x=0);const b=o.extractPoints(c);let M=b.shape;const I=b.holes;if(!_i.isClockWise(M)){M=M.reverse();for(let te=0,ue=I.length;te<ue;te++){const D=I[te];_i.isClockWise(D)&&(I[te]=D.reverse())}}const F=_i.triangulateShape(M,I),O=M;for(let te=0,ue=I.length;te<ue;te++){const D=I[te];M=M.concat(D)}function Y(te,ue,D){return ue||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(ue,D)}const V=M.length,J=F.length;function G(te,ue,D){let Fe,oe,Ae;const me=te.x-ue.x,He=te.y-ue.y,Ce=D.x-te.x,P=D.y-te.y,w=me*me+He*He,q=me*P-He*Ce;if(Math.abs(q)>Number.EPSILON){const Q=Math.sqrt(w),re=Math.sqrt(Ce*Ce+P*P),ee=ue.x-He/Q,Le=ue.y+me/Q,ge=D.x-P/re,Re=D.y+Ce/re,tt=((ge-ee)*P-(Re-Le)*Ce)/(me*P-He*Ce);Fe=ee+me*tt-te.x,oe=Le+He*tt-te.y;const le=Fe*Fe+oe*oe;if(le<=2)return new ne(Fe,oe);Ae=Math.sqrt(le/2)}else{let Q=!1;me>Number.EPSILON?Ce>Number.EPSILON&&(Q=!0):me<-Number.EPSILON?Ce<-Number.EPSILON&&(Q=!0):Math.sign(He)===Math.sign(P)&&(Q=!0),Q?(Fe=-He,oe=me,Ae=Math.sqrt(w)):(Fe=me,oe=He,Ae=Math.sqrt(w/2))}return new ne(Fe/Ae,oe/Ae)}const N=[];for(let te=0,ue=O.length,D=ue-1,Fe=te+1;te<ue;te++,D++,Fe++)D===ue&&(D=0),Fe===ue&&(Fe=0),N[te]=G(O[te],O[D],O[Fe]);const W=[];let j,ce=N.concat();for(let te=0,ue=I.length;te<ue;te++){const D=I[te];j=[];for(let Fe=0,oe=D.length,Ae=oe-1,me=Fe+1;Fe<oe;Fe++,Ae++,me++)Ae===oe&&(Ae=0),me===oe&&(me=0),j[Fe]=G(D[Fe],D[Ae],D[me]);W.push(j),ce=ce.concat(j)}for(let te=0;te<g;te++){const ue=te/g,D=f*Math.cos(ue*Math.PI/2),Fe=m*Math.sin(ue*Math.PI/2)+x;for(let oe=0,Ae=O.length;oe<Ae;oe++){const me=Y(O[oe],N[oe],Fe);pe(me.x,me.y,-D)}for(let oe=0,Ae=I.length;oe<Ae;oe++){const me=I[oe];j=W[oe];for(let He=0,Ce=me.length;He<Ce;He++){const P=Y(me[He],j[He],Fe);pe(P.x,P.y,-D)}}}const ze=m+x;for(let te=0;te<V;te++){const ue=d?Y(M[te],ce[te],ze):M[te];v?(C.copy(A.normals[0]).multiplyScalar(ue.x),S.copy(A.binormals[0]).multiplyScalar(ue.y),L.copy(_[0]).add(C).add(S),pe(L.x,L.y,L.z)):pe(ue.x,ue.y,0)}for(let te=1;te<=h;te++)for(let ue=0;ue<V;ue++){const D=d?Y(M[ue],ce[ue],ze):M[ue];v?(C.copy(A.normals[te]).multiplyScalar(D.x),S.copy(A.binormals[te]).multiplyScalar(D.y),L.copy(_[te]).add(C).add(S),pe(L.x,L.y,L.z)):pe(D.x,D.y,u/h*te)}for(let te=g-1;te>=0;te--){const ue=te/g,D=f*Math.cos(ue*Math.PI/2),Fe=m*Math.sin(ue*Math.PI/2)+x;for(let oe=0,Ae=O.length;oe<Ae;oe++){const me=Y(O[oe],N[oe],Fe);pe(me.x,me.y,u+D)}for(let oe=0,Ae=I.length;oe<Ae;oe++){const me=I[oe];j=W[oe];for(let He=0,Ce=me.length;He<Ce;He++){const P=Y(me[He],j[He],Fe);v?pe(P.x,P.y+_[h-1].y,_[h-1].x+D):pe(P.x,P.y,u+D)}}}Z(),ae();function Z(){const te=i.length/3;if(d){let ue=0,D=V*ue;for(let Fe=0;Fe<J;Fe++){const oe=F[Fe];Be(oe[2]+D,oe[1]+D,oe[0]+D)}ue=h+g*2,D=V*ue;for(let Fe=0;Fe<J;Fe++){const oe=F[Fe];Be(oe[0]+D,oe[1]+D,oe[2]+D)}}else{for(let ue=0;ue<J;ue++){const D=F[ue];Be(D[2],D[1],D[0])}for(let ue=0;ue<J;ue++){const D=F[ue];Be(D[0]+V*h,D[1]+V*h,D[2]+V*h)}}n.addGroup(te,i.length/3-te,0)}function ae(){const te=i.length/3;let ue=0;Ie(O,ue),ue+=O.length;for(let D=0,Fe=I.length;D<Fe;D++){const oe=I[D];Ie(oe,ue),ue+=oe.length}n.addGroup(te,i.length/3-te,1)}function Ie(te,ue){let D=te.length;for(;--D>=0;){const Fe=D;let oe=D-1;oe<0&&(oe=te.length-1);for(let Ae=0,me=h+g*2;Ae<me;Ae++){const He=V*Ae,Ce=V*(Ae+1),P=ue+Fe+He,w=ue+oe+He,q=ue+oe+Ce,Q=ue+Fe+Ce;Ke(P,w,q,Q)}}}function pe(te,ue,D){l.push(te),l.push(ue),l.push(D)}function Be(te,ue,D){We(te),We(ue),We(D);const Fe=i.length/3,oe=y.generateTopUV(n,i,Fe-3,Fe-2,Fe-1);ct(oe[0]),ct(oe[1]),ct(oe[2])}function Ke(te,ue,D,Fe){We(te),We(ue),We(Fe),We(ue),We(D),We(Fe);const oe=i.length/3,Ae=y.generateSideWallUV(n,i,oe-6,oe-3,oe-2,oe-1);ct(Ae[0]),ct(Ae[1]),ct(Ae[3]),ct(Ae[1]),ct(Ae[2]),ct(Ae[3])}function We(te){i.push(l[te*3+0]),i.push(l[te*3+1]),i.push(l[te*3+2])}function ct(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Qx(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new fa[i.type]().fromJSON(i)),new dr(n,e.options)}}const Jx={generateTopUV:function(s,e,t,n,i){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ne(r,a),new ne(o,l),new ne(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],x=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-u),new ne(d,1-m),new ne(x,1-p)]:[new ne(o,1-l),new ne(h,1-u),new ne(f,1-m),new ne(g,1-p)]}};function Qx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Oi extends Zl{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Oi(e.radius,e.detail)}}class $l extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new E,m=new ne;for(let x=0;x<=i;x++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let x=0;x<i;x++){const g=x*(n+1);for(let p=0;p<n;p++){const y=p+g,_=y,v=y+n+1,A=y+n+2,S=y+1;o.push(_,v,S),o.push(v,A,S)}}this.setIndex(o),this.setAttribute("position",new je(l,3)),this.setAttribute("normal",new je(c,3)),this.setAttribute("uv",new je(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Xu extends _t{constructor(e=new ur([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new je(i,3)),this.setAttribute("normal",new je(r,3)),this.setAttribute("uv",new je(a,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const m=d.holes;_i.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){const y=m[g];_i.isClockWise(y)===!0&&(m[g]=y.reverse())}const x=_i.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){const y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){const y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,p=x.length;g<p;g++){const y=x[g],_=y[0]+u,v=y[1]+u,A=y[2]+u;n.push(_,v,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ev(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const a=t[e.shapes[i]];n.push(a)}return new Xu(n,e.curveSegments)}}function ev(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Ve extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let A=0;A<=t;A++){const S=A/t;u.x=-e*Math.cos(i+S*r)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(i+S*r)*Math.sin(a+_*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),g.push(S+v,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const _=h[p][y+1],v=h[p][y],A=h[p+1][y],S=h[p+1][y+1];(p!==0||a>0)&&f.push(_,v,S),(p!==n-1||l<Math.PI)&&f.push(v,A,S)}this.setIndex(f),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ve(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vt extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const x=m/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const x=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;a.push(x,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class gi extends _t{constructor(e=new ku(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new E,l=new E,c=new ne;let h=new E;const u=[],d=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new je(u,3)),this.setAttribute("normal",new je(d,3)),this.setAttribute("uv",new je(f,2));function x(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),y(),p()}function g(_){h=e.getPointAt(_/t,h);const v=a.normals[_],A=a.binormals[_];for(let S=0;S<=i;S++){const C=S/i*Math.PI*2,L=Math.sin(C),b=-Math.cos(C);l.x=b*v.x+L*A.x,l.y=b*v.y+L*A.y,l.z=b*v.z+L*A.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let _=1;_<=t;_++)for(let v=1;v<=i;v++){const A=(i+1)*(_-1)+(v-1),S=(i+1)*_+(v-1),C=(i+1)*_+v,L=(i+1)*(_-1)+v;m.push(A,S,L),m.push(S,C,L)}}function y(){for(let _=0;_<=t;_++)for(let v=0;v<=i;v++)c.x=_/t,c.y=v/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new gi(new fa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class tv extends Ht{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class Ee extends bn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=du,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ot extends Ee{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Kr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function nv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function iv(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function wh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function qu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class fr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class sv extends fr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:lc,endingEnd:lc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case cc:r=e,o=2*t-n;break;case hc:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cc:a=e,l=2*n-t;break;case hc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,y=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,_=(-1-f)*g+(1.5+f)*x+.5*m,v=f*g-f*x;for(let A=0;A!==o;++A)r[A]=p*a[h+A]+y*a[c+A]+_*a[l+A]+v*a[u+A];return r}}class rv extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class av extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Nn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Kr(t,this.TimeBufferType),this.values=Kr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Kr(e.times,Array),values:Kr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new av(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ir:t=this.InterpolantFactoryMethodDiscrete;break;case sr:t=this.InterpolantFactoryMethodLinear;break;case Ea:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return sr;case this.InterpolantFactoryMethodSmooth:return Ea}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&nv(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ea,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const x=t[u+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=sr;class Es extends Nn{constructor(e,t,n){super(e,t,n)}}Es.prototype.ValueTypeName="bool";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=ir;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;class Ku extends Nn{}Ku.prototype.ValueTypeName="color";class Ms extends Nn{}Ms.prototype.ValueTypeName="number";class ov extends fr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)yi.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Ss extends Nn{InterpolantFactoryMethodLinear(e){return new ov(this.times,this.values,this.getValueSize(),e)}}Ss.prototype.ValueTypeName="quaternion";Ss.prototype.InterpolantFactoryMethodSmooth=void 0;class As extends Nn{constructor(e,t,n){super(e,t,n)}}As.prototype.ValueTypeName="string";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=ir;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;class bs extends Nn{}bs.prototype.ValueTypeName="vector";class lv{constructor(e="",t=-1,n=[],i=Pd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=pn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(hv(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Nn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=iv(l);l=wh(l,1,h),c=wh(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ms(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,x){if(f.length!==0){const g=[],p=[];qu(f,g,p,m),g.length!==0&&x.push(new u(d,g,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(const x in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const _=d[m];g.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new Ms(".morphTargetInfluence["+x+"]",g,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(bs,f+".position",d,"pos",i),n(Ss,f+".quaternion",d,"rot",i),n(bs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function cv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ms;case"vector":case"vector2":case"vector3":case"vector4":return bs;case"color":return Ku;case"quaternion":return Ss;case"bool":case"boolean":return Es;case"string":return As}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function hv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cv(s.type);if(s.times===void 0){const t=[],n=[];qu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const xi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class uv{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const dv=new uv;class Cs{constructor(e){this.manager=e!==void 0?e:dv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cs.DEFAULT_MATERIAL_NAME="__DEFAULT";const Hn={};class fv extends Error{constructor(e,t){super(e),this.response=t}}class Yu extends Cs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=xi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Hn[e]!==void 0){Hn[e].push({onLoad:t,onProgress:n,onError:i});return}Hn[e]=[],Hn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Hn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let x=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:_,value:v})=>{if(_)p.close();else{x+=v.byteLength;const A=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:f});for(let S=0,C=h.length;S<C;S++){const L=h[S];L.onProgress&&L.onProgress(A)}p.enqueue(v),y()}},_=>{p.error(_)})}}});return new Response(g)}else throw new fv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{xi.add(e,c);const h=Hn[e];delete Hn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Hn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Hn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class pv extends Cs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=xi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=rr("img");function l(){h(),xi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class mv extends Cs{constructor(e){super(e)}load(e,t,n,i){const r=new Bt,a=new pv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class wa extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class gv extends wa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const oo=new et,Th=new E,Eh=new E;class Jl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vl,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Th.setFromMatrixPosition(e.matrixWorld),t.position.copy(Th),Eh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Eh),t.updateMatrixWorld(),oo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(oo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class xv extends Jl{constructor(){super(new $t(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=vs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class vv extends wa{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new xv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ah=new et,Hs=new E,lo=new E;class _v extends Jl{constructor(){super(new $t(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new gt(2,1,1,1),new gt(0,1,1,1),new gt(3,1,1,1),new gt(1,1,1,1),new gt(3,0,1,1),new gt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hs),lo.copy(n.position),lo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(lo),n.updateMatrixWorld(),i.makeTranslation(-Hs.x,-Hs.y,-Hs.z),Ah.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ah)}}class pa extends wa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _v}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class yv extends Jl{constructor(){super(new ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wl extends wa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new yv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class tr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Mv extends Cs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=xi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return xi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),xi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});xi.add(e,l),r.manager.itemStart(e)}}class Sv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ch(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Ch();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Ch(){return performance.now()}const Ql="\\[\\]\\.:\\/",bv=new RegExp("["+Ql+"]","g"),ec="[^"+Ql+"]",wv="[^"+Ql.replace("\\.","")+"]",Tv=/((?:WC+[\/:])*)/.source.replace("WC",ec),Ev=/(WCOD+)?/.source.replace("WCOD",wv),Av=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ec),Cv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ec),Rv=new RegExp("^"+Tv+Ev+Av+Cv+"$"),Pv=["material","materials","bones","map"];class Lv{constructor(e,t,n){const i=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class St{constructor(e,t,n){this.path=t,this.parsedPath=n||St.parseTrackName(t),this.node=St.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new St.Composite(e,t,n):new St(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bv,"")}static parseTrackName(e){const t=Rv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Pv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=St.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}St.Composite=Lv;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class My{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Sy extends Bi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dl);function js(s){return 440*Math.pow(2,(s-69)/12)}const Et=[60,64,67,71,74],Yr=[65,69,72,76,79],Tn=[62,67,71,74,77],co=[60,64,69,72,76],Iv=[62,65,69,72,76],ho=[62,66,69,72,76],Dv=[64,67,71,74,79],Rh=[{bpm:132,steps:[{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:79,beats:1},{lead:72,beats:1.5,bass:43},{lead:74,beats:.5},{lead:76,beats:4,bass:48,chord:Et},{lead:77,beats:1,bass:41,chord:Yr},{lead:77,beats:1},{lead:77,beats:1.5,bass:48},{lead:77,beats:.5},{lead:77,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:1,bass:43},{lead:76,beats:.5},{lead:76,beats:.5},{lead:76,beats:1,bass:38,chord:ho},{lead:74,beats:1},{lead:74,beats:1,bass:45},{lead:76,beats:1},{lead:74,beats:2,bass:43,chord:Tn},{lead:79,beats:2,bass:50},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:79,beats:1},{lead:72,beats:1.5,bass:43},{lead:74,beats:.5},{lead:76,beats:4,bass:48,chord:Et},{lead:77,beats:1,bass:41,chord:Yr},{lead:77,beats:1},{lead:77,beats:1.5,bass:48},{lead:77,beats:.5},{lead:77,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:1,bass:43},{lead:76,beats:.5},{lead:76,beats:.5},{lead:79,beats:1,bass:43,chord:Tn},{lead:79,beats:1},{lead:77,beats:1,bass:50},{lead:74,beats:1},{lead:72,beats:4,bass:48,chord:Et}]},{bpm:138,steps:[{lead:62,beats:1,bass:43,chord:Tn},{lead:67,beats:1,bass:43,chord:Tn},{lead:67,beats:.5},{lead:69,beats:.5},{lead:67,beats:.5},{lead:66,beats:.5},{lead:64,beats:1,bass:48,chord:Et},{lead:64,beats:1},{lead:64,beats:1},{lead:69,beats:1,bass:45,chord:co},{lead:69,beats:.5},{lead:71,beats:.5},{lead:69,beats:.5},{lead:67,beats:.5},{lead:66,beats:1,bass:38,chord:ho},{lead:62,beats:1},{lead:62,beats:1},{lead:71,beats:1,bass:47,chord:Dv},{lead:71,beats:.5},{lead:72,beats:.5},{lead:71,beats:.5},{lead:69,beats:.5},{lead:67,beats:1,bass:48,chord:Et},{lead:64,beats:1},{lead:62,beats:.5},{lead:62,beats:.5},{lead:64,beats:1,bass:38,chord:ho},{lead:69,beats:1},{lead:66,beats:1},{lead:67,beats:3,bass:43,chord:Tn}]},{bpm:124,steps:[{lead:79,beats:1.5,bass:48,chord:Et},{lead:77,beats:.5},{lead:76,beats:1,bass:43},{lead:74,beats:1},{lead:72,beats:1,bass:48,chord:co},{lead:74,beats:1},{lead:76,beats:1,bass:45},{lead:72,beats:1},{lead:74,beats:.5,bass:41,chord:Yr},{lead:76,beats:.5},{lead:77,beats:.5},{lead:74,beats:.5},{lead:76,beats:1.5,bass:43,chord:Tn},{lead:74,beats:.5},{lead:72,beats:1,bass:48,chord:Et},{lead:71,beats:1},{lead:72,beats:2,bass:48},{lead:79,beats:1.5,bass:48,chord:Et},{lead:77,beats:.5},{lead:76,beats:1,bass:43},{lead:74,beats:1},{lead:72,beats:1,bass:48,chord:co},{lead:74,beats:1},{lead:76,beats:1,bass:45},{lead:72,beats:1},{lead:74,beats:.5,bass:41,chord:Iv},{lead:76,beats:.5},{lead:77,beats:.5},{lead:74,beats:.5},{lead:76,beats:1.5,bass:43,chord:Tn},{lead:74,beats:.5},{lead:72,beats:1,bass:48,chord:Et},{lead:71,beats:1},{lead:72,beats:2,bass:48}]},{bpm:96,steps:[{lead:67,beats:1.5,bass:48,chord:Et},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48,chord:Et},{lead:67,beats:1.5,bass:48},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48,chord:Et},{lead:74,beats:2,bass:43,chord:Tn},{lead:74,beats:1},{lead:71,beats:3,bass:43},{lead:72,beats:2,bass:48,chord:Et},{lead:72,beats:1},{lead:67,beats:3,bass:48},{lead:69,beats:2,bass:41,chord:Yr},{lead:69,beats:1},{lead:72,beats:1.5,bass:45},{lead:71,beats:.5},{lead:69,beats:1},{lead:67,beats:1.5,bass:48,chord:Et},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48},{lead:74,beats:2,bass:43,chord:Tn},{lead:74,beats:1},{lead:77,beats:1.5,bass:43},{lead:74,beats:.5},{lead:71,beats:1},{lead:72,beats:3,bass:48,chord:Et},{lead:76,beats:3,bass:48},{lead:72,beats:1.5,bass:43,chord:Tn},{lead:67,beats:.5},{lead:64,beats:1},{lead:67,beats:1.5,bass:43},{lead:65,beats:.5},{lead:62,beats:1},{lead:60,beats:4,bass:48,chord:Et}]}],Nv=Et.map(js);function Ph(s,e,t=!1){const n=Math.floor(s.sampleRate*e),i=s.createBuffer(1,n,s.sampleRate),r=i.getChannelData(0);if(!t){for(let f=0;f<n;f++)r[f]=Math.random()*2-1;return i}let a=0,o=0,l=0,c=0,h=0,u=0,d=0;for(let f=0;f<n;f++){const m=Math.random()*2-1;a=.99886*a+m*.0555179,o=.99332*o+m*.0750759,l=.969*l+m*.153852,c=.8665*c+m*.3104856,h=.55*h+m*.5329522,u=-.7616*u-m*.016898,r[f]=(a+o+l+c+h+u+d+m*.5362)*.08,d=m*.115926}return i}function Uv(s,e=1.9){const t=Math.floor(s.sampleRate*e),n=s.createBuffer(2,t,s.sampleRate);for(let i=0;i<2;i++){const r=n.getChannelData(i);let a=0;for(let o=0;o<t;o++){const l=o/t,c=Math.pow(1-l,2.7),h=(Math.random()*2-1)*c;a=a*.72+h*.28,r[o]=a*.75}}return n}function Fv(){const t=Math.floor(16537.5),n=new ArrayBuffer(44+t*2),i=new DataView(n),r=(c,h)=>{for(let u=0;u<h.length;u++)i.setUint8(c+u,h.charCodeAt(u))};r(0,"RIFF"),i.setUint32(4,36+t*2,!0),r(8,"WAVE"),r(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,22050,!0),i.setUint32(28,22050*2,!0),i.setUint16(32,2,!0),i.setUint16(34,16,!0),r(36,"data"),i.setUint32(40,t*2,!0);const a=[1046.5,1318.51,1567.98,2093];for(let c=0;c<t;c++){const h=c/22050;let u=0;for(let f=0;f<a.length;f++){const m=f*.055;if(h>=m){const x=h-m,g=Math.exp(-x*5.2)*Math.min(1,x*120);u+=Math.sin(2*Math.PI*a[f]*x)*g*.22,u+=Math.sin(2*Math.PI*a[f]*2*x)*g*.06}}const d=Math.max(-.95,Math.min(.95,u));i.setInt16(44+c*2,d*32767,!0)}const o=new Uint8Array(n);let l="";for(let c=0;c<o.length;c++)l+=String.fromCharCode(o[c]);return`data:audio/wav;base64,${btoa(l)}`}class by{constructor(){B(this,"ctx",null);B(this,"masterGain",null);B(this,"dryBus",null);B(this,"reverbBus",null);B(this,"analyser",null);B(this,"analyserBuf",null);B(this,"mediaDest",null);B(this,"mediaAudioEl",null);B(this,"musicBus",null);B(this,"padFilter",null);B(this,"padVoice",null);B(this,"windGain",null);B(this,"windFilter",null);B(this,"whiteNoiseBuf",null);B(this,"mixMode","full");B(this,"routing","direct");B(this,"musicStyle","classic");B(this,"volume",.72);B(this,"songIdx",0);B(this,"stepIdx",0);B(this,"stepWaitSec",.25);B(this,"bellTimer",0);B(this,"prevBraking",!1);B(this,"lastEventTriggered",null);B(this,"beatPulse",0);B(this,"smoothMicEnergy",0);B(this,"micState","off");B(this,"micStream",null);B(this,"micAnalyser",null);B(this,"micData",null);B(this,"lastScrapeMs",0);B(this,"lastChurchBellMs",0);B(this,"wavDataUri",null);try{const e=localStorage.getItem("tesla-xmas-mix");(e==="full"||e==="sfx"||e==="muted")&&(this.mixMode=e);const t=localStorage.getItem("tesla-xmas-route");(t==="direct"||t==="media")&&(this.routing=t);const n=localStorage.getItem("tesla-xmas-vol");if(n!==null){const i=Number(n);Number.isFinite(i)&&(this.volume=Math.max(0,Math.min(1,i)))}}catch{}}getMixMode(){return this.mixMode}setMixMode(e){this.mixMode=e;try{localStorage.setItem("tesla-xmas-mix",e)}catch{}this.applyGainStates()}getRouting(){return this.routing}setRouting(e){this.routing=e;try{localStorage.setItem("tesla-xmas-route",e)}catch{}this.ctx&&this.reconnectOutput()}getVolume(){return this.volume}setVolume(e){this.volume=Math.max(0,Math.min(1,e));try{localStorage.setItem("tesla-xmas-vol",this.volume.toFixed(2))}catch{}this.applyGainStates()}setMusicStyle(e){this.musicStyle=e}getMicState(){return this.micState}async setMicReactive(e){var t;if(!e)return this.micStream&&(this.micStream.getTracks().forEach(n=>n.stop()),this.micStream=null),this.micAnalyser=null,this.micData=null,this.smoothMicEnergy=0,this.micState="off","off";if(this.unlock(),!this.ctx||!((t=navigator.mediaDevices)!=null&&t.getUserMedia))return this.micState="denied","denied";try{const n=await navigator.mediaDevices.getUserMedia({audio:!0}),i=this.ctx.createMediaStreamSource(n),r=this.ctx.createAnalyser();return r.fftSize=256,r.smoothingTimeConstant=.72,i.connect(r),this.micStream=n,this.micAnalyser=r,this.micData=new Uint8Array(new ArrayBuffer(r.frequencyBinCount)),this.micState="active","active"}catch{return this.micState="denied","denied"}}getBeatEnergy(){return this.micState==="active"?Math.min(1,this.smoothMicEnergy):Math.min(1,this.beatPulse)}unlock(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=0;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-16,t.knee.value=18,t.ratio.value=4,t.attack.value=.01,t.release.value=.25,this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=512,this.analyserBuf=new Float32Array(new ArrayBuffer(this.analyser.fftSize*4)),this.dryBus=this.ctx.createGain(),this.dryBus.gain.value=.85;const n=this.ctx.createConvolver();n.buffer=Uv(this.ctx,1.9),this.reverbBus=this.ctx.createGain(),this.reverbBus.gain.value=.34,this.dryBus.connect(t),this.reverbBus.connect(n),n.connect(t),t.connect(this.masterGain),this.masterGain.connect(this.analyser),this.whiteNoiseBuf=Ph(this.ctx,2,!1),this.setupMusicPad(),this.setupWindBed(),this.reconnectOutput(),this.applyGainStates()}this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.routing==="media"&&this.mediaAudioEl&&this.mediaAudioEl.play().catch(()=>{})}reconnectOutput(){var e;if(!(!this.ctx||!this.masterGain)){try{this.masterGain.disconnect()}catch{}if(this.analyser&&this.masterGain.connect(this.analyser),this.routing==="direct")this.masterGain.connect(this.ctx.destination),this.mediaAudioEl&&this.mediaAudioEl.pause();else{if(!this.mediaDest&&typeof this.ctx.createMediaStreamDestination=="function"){this.mediaDest=this.ctx.createMediaStreamDestination();const t=document.createElement("audio");t.autoplay=!0,t.setAttribute("playsinline",""),t.style.display="none",t.srcObject=this.mediaDest.stream,document.body.appendChild(t),this.mediaAudioEl=t}this.mediaDest?(this.masterGain.connect(this.mediaDest),(e=this.mediaAudioEl)==null||e.play().catch(()=>{})):this.masterGain.connect(this.ctx.destination)}}}setupMusicPad(){if(!this.ctx||!this.dryBus||!this.reverbBus)return;this.musicBus=this.ctx.createGain(),this.musicBus.gain.value=this.mixMode==="full"?.34:0,this.padFilter=this.ctx.createBiquadFilter(),this.padFilter.type="lowpass",this.padFilter.frequency.value=520,this.padFilter.Q.value=.7,this.padFilter.connect(this.musicBus),this.musicBus.connect(this.dryBus),this.musicBus.connect(this.reverbBus);const e=Nv,t=[],n=[];for(let i=0;i<e.length;i++){const r=this.ctx.createOscillator();r.type=i%2===0?"triangle":"sine",r.frequency.value=e[i],r.detune.value=(i-2)*3.5;const a=this.ctx.createGain();a.gain.value=.065,r.connect(a),a.connect(this.padFilter),r.start(),t.push(r),n.push(a)}this.padVoice={oscs:t,gains:n}}setupWindBed(){if(!this.ctx||!this.dryBus||!this.reverbBus)return;const e=Ph(this.ctx,4,!0),t=this.ctx.createBufferSource();t.buffer=e,t.loop=!0,this.windFilter=this.ctx.createBiquadFilter(),this.windFilter.type="bandpass",this.windFilter.frequency.value=260,this.windFilter.Q.value=1.6,this.windGain=this.ctx.createGain(),this.windGain.gain.value=.015,t.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.dryBus),this.windGain.connect(this.reverbBus),t.start()}applyGainStates(){if(!this.ctx)return;const e=this.ctx.currentTime;if(this.masterGain){const t=this.mixMode==="muted"?0:this.volume;this.masterGain.gain.setTargetAtTime(t,e,.08)}if(this.musicBus){const t=this.mixMode==="full"?.36:0;this.musicBus.gain.setTargetAtTime(t,e,.15)}}update(e,t,n){if(this.beatPulse=Math.max(0,this.beatPulse-e*2.8),this.micState==="active"&&this.micAnalyser&&this.micData){this.micAnalyser.getByteFrequencyData(this.micData);let o=0;const l=Math.min(16,this.micData.length);for(let h=0;h<l;h++)o+=this.micData[h];const c=Math.min(1,o/(l*255)*1.9);this.smoothMicEnergy+=(c-this.smoothMicEnergy)*Math.min(1,e*12)}else this.smoothMicEnergy=Math.max(0,this.smoothMicEnergy-e*4);if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const i=this.ctx.currentTime,r=Math.min(1,t.speedKmh/120);if(this.mixMode==="full"&&this.padVoice&&this.padFilter){const o=480+r*780+(t.inTunnel?-120:0);if(this.padFilter.frequency.setTargetAtTime(Math.max(260,o),i,.25),this.stepWaitSec-=e,this.stepWaitSec<=0){const l=Rh[this.songIdx],c=l.steps[this.stepIdx],h=t.speedKmh<3?.92:1+r*.16,u=60/(l.bpm*h),d=c.beats*u;if(this.stepWaitSec=d,this.beatPulse=Math.max(this.beatPulse,c.bass?.95:.62),c.chord){const f=c.chord.map(js);this.padVoice.oscs.forEach((m,x)=>{m.frequency.setTargetAtTime(f[x%f.length],i,.18)})}if(c.bass&&this.playBassNote(js(c.bass),.14,Math.min(1.4,d*1.1)),this.playCelestaNote(js(c.lead),.11+r*.025,Math.max(.32,d*1.15)),c.beats>=1.5&&c.chord){const f=js(c.chord[2]+12),m=Math.round(d*500);setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.mixMode==="full"&&this.playCelestaNote(f,.055,.55)},m)}this.stepIdx++,this.stepIdx>=l.steps.length&&(this.stepIdx=0,this.songIdx=(this.songIdx+1)%Rh.length)}}if(this.windFilter&&this.windGain){const o=Math.abs(t.turnRate)*140,l=t.tunnelBlend*180,c=240+r*650+o+l,h=.012+r*.095+t.tunnelBlend*.035;this.windFilter.frequency.setTargetAtTime(c,i,.15),this.windGain.gain.setTargetAtTime(h,i,.15)}this.bellTimer+=e;const a=t.speedKmh<2.5?1.9:t.speedKmh<35?.62-t.speedKmh/35*.24:Math.max(.16,.38-(t.speedKmh-35)/95*.21);if(this.bellTimer>=a){this.bellTimer=0;const o=t.speedKmh<2.5?.16:.28+r*.55;this.triggerSleighBell(o,t.turnRate*.35)}t.isBraking&&!this.prevBraking&&t.speedKmh>12&&this.playBrakeJingle(),this.prevBraking=t.isBraking,n&&n!==this.lastEventTriggered?(this.lastEventTriggered=n,n==="starship"?this.playRocketRumble():this.playSparkleChime()):n||(this.lastEventTriggered=null)}playCelestaNote(e,t,n,i){if(!this.ctx)return;const r=this.ctx.currentTime,a=this.ctx.createOscillator(),o=this.ctx.createOscillator(),l=this.musicStyle==="cyber2099"&&!i;a.type=l?"sawtooth":"sine",o.type=l?"square":"triangle",a.frequency.value=e,o.frequency.value=l?e*.5:e*2;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=l?2400:8e3;const h=this.ctx.createGain();h.gain.value=l?.16:.18;const u=this.ctx.createGain();u.gain.setValueAtTime(1e-4,r),u.gain.linearRampToValueAtTime(l?t*.65:t,r+.015),u.gain.exponentialRampToValueAtTime(1e-4,r+n),a.connect(c),o.connect(h),h.connect(c),c.connect(u),i?u.connect(i):(this.dryBus&&u.connect(this.dryBus),this.reverbBus&&u.connect(this.reverbBus)),a.start(r),o.start(r),a.stop(r+n+.05),o.stop(r+n+.05)}playBassNote(e,t,n){if(!this.ctx||!this.musicBus)return;const i=this.ctx.currentTime,r=this.musicStyle==="cyber2099",a=this.ctx.createOscillator();a.type=r?"sawtooth":"triangle",a.frequency.value=e;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(r?860:520,i),o.frequency.exponentialRampToValueAtTime(160,i+n);const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(t,i+.02),l.gain.exponentialRampToValueAtTime(1e-4,i+n),a.connect(o),o.connect(l),l.connect(this.musicBus),a.start(i),a.stop(i+n+.04)}triggerSleighBell(e,t=0,n){if(!this.ctx||!this.whiteNoiseBuf)return;const i=this.ctx.currentTime,r=this.ctx.createBufferSource();r.buffer=this.whiteNoiseBuf;const a=this.ctx.createBiquadFilter();a.type="highpass",a.frequency.value=3800;const o=this.ctx.createBiquadFilter();o.type="bandpass",o.frequency.value=5400+Math.random()*1100,o.Q.value=2.6;const l=this.ctx.createGain(),c=Math.min(.24,e*.22);l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(c,i+.008),l.gain.exponentialRampToValueAtTime(1e-4,i+.14);const h=[3520,4978,6645];for(const d of h){const f=this.ctx.createOscillator();f.type="sine",f.frequency.value=d*(.97+Math.random()*.06);const m=this.ctx.createGain();m.gain.setValueAtTime(1e-4,i),m.gain.linearRampToValueAtTime(c*.14,i+.005),m.gain.exponentialRampToValueAtTime(1e-4,i+.17),f.connect(m),n?m.connect(n):this.dryBus&&m.connect(this.dryBus),f.start(i),f.stop(i+.19)}r.connect(a),a.connect(o),o.connect(l);let u=l;if(typeof this.ctx.createStereoPanner=="function"){const d=this.ctx.createStereoPanner();d.pan.value=Math.max(-.7,Math.min(.7,t)),l.connect(d),u=d}n?u.connect(n):(this.dryBus&&u.connect(this.dryBus),this.reverbBus&&u.connect(this.reverbBus)),r.start(i,Math.random()*.8,.18)}playSparkleChime(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[523.25,659.25,783.99,987.77,1174.66,1567.98].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(t,.095,.9)},n*65)})}playLightWaveChime(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[392,493.88,587.33,739.99,987.77,1174.66].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(t,.1,1.05)},n*75)})}playGlobeShake(){if(this.unlock(),!(!this.ctx||this.mixMode==="muted")){for(let e=0;e<4;e++)setTimeout(()=>{this.triggerSleighBell(.75-e*.12,(e%2===0?-1:1)*.4)},e*85);this.playSparkleChime()}}playBrakeJingle(){!this.ctx||this.mixMode==="muted"||(this.triggerSleighBell(.6,-.3),setTimeout(()=>this.triggerSleighBell(.45,.3),90))}playHoHoHo(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[196,246.94,293.66].forEach((t,n)=>{setTimeout(()=>{if(!this.ctx||this.ctx.state!=="running")return;const i=this.ctx.currentTime,r=this.ctx.createOscillator(),a=this.ctx.createOscillator();r.type="triangle",a.type="sine",r.frequency.setValueAtTime(t*.92,i),r.frequency.exponentialRampToValueAtTime(t,i+.08),a.frequency.value=t*.5;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=950;const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(.18,i+.03),l.gain.exponentialRampToValueAtTime(1e-4,i+.32),r.connect(o),a.connect(o),o.connect(l),this.dryBus&&l.connect(this.dryBus),this.reverbBus&&l.connect(this.reverbBus),r.start(i),a.start(i),r.stop(i+.35),a.stop(i+.35),this.triggerSleighBell(.75,(n-1)*.3)},n*230)}),setTimeout(()=>this.playSparkleChime(),580)}playRocketRumble(){if(!this.ctx||!this.whiteNoiseBuf||this.mixMode==="muted")return;const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.whiteNoiseBuf,t.loop=!0;const n=this.ctx.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(160,e),n.frequency.exponentialRampToValueAtTime(520,e+2.4),n.frequency.exponentialRampToValueAtTime(120,e+5);const i=this.ctx.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.linearRampToValueAtTime(.18,e+1.1),i.gain.exponentialRampToValueAtTime(1e-4,e+5.2),t.connect(n),n.connect(i),this.dryBus&&i.connect(this.dryBus),this.reverbBus&&i.connect(this.reverbBus),t.start(e),t.stop(e+5.3)}playGiftLaunch(){if(this.unlock(),!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=this.ctx.currentTime,t=this.ctx.createOscillator();t.type="sine",t.frequency.setValueAtTime(340,e),t.frequency.exponentialRampToValueAtTime(980,e+.16);const n=this.ctx.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.linearRampToValueAtTime(.11,e+.02),n.gain.exponentialRampToValueAtTime(1e-4,e+.22),t.connect(n),this.dryBus&&n.connect(this.dryBus),this.reverbBus&&n.connect(this.reverbBus),t.start(e),t.stop(e+.24)}playChimneyPop(){this.unlock(),!(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")&&([523.25,659.25,783.99,1046.5].forEach((e,t)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(e,.1,.42)},t*35)}),this.triggerSleighBell(.7,.2))}playIceScrape(){if(!this.ctx||!this.whiteNoiseBuf||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=performance.now();if(e-this.lastScrapeMs<140)return;this.lastScrapeMs=e;const t=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.whiteNoiseBuf;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=3400+Math.random()*900,i.Q.value=2;const r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.055,t+.012),r.gain.exponentialRampToValueAtTime(1e-4,t+.09),n.connect(i),i.connect(r),this.dryBus&&r.connect(this.dryBus),n.start(t,Math.random()*.5,.11)}playConvoyHorn(){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=this.dryBus??this.ctx.destination,t=this.ctx.currentTime,n=[{start:0,dur:.34,gain:.22},{start:.42,dur:.72,gain:.26}],i=[146.83,185,220];for(const r of n){const a=this.ctx.createBiquadFilter();a.type="lowpass",a.Q.value=1.9,a.frequency.setValueAtTime(520,t+r.start),a.frequency.exponentialRampToValueAtTime(1180,t+r.start+.09),a.frequency.exponentialRampToValueAtTime(640,t+r.start+r.dur);const o=this.ctx.createGain();o.gain.setValueAtTime(1e-4,t+r.start),o.gain.linearRampToValueAtTime(r.gain,t+r.start+.045),o.gain.setValueAtTime(r.gain*.88,t+r.start+r.dur*.72),o.gain.exponentialRampToValueAtTime(1e-4,t+r.start+r.dur+.14),a.connect(o),o.connect(e);for(const l of i){const c=this.ctx.createOscillator();c.type="sawtooth",c.frequency.setValueAtTime(l,t+r.start),c.detune.setValueAtTime((Math.random()-.5)*9,t+r.start),c.connect(a),c.start(t+r.start),c.stop(t+r.start+r.dur+.16)}}}playChurchBells(){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=performance.now();if(e-this.lastChurchBellMs<26e3)return;this.lastChurchBellMs=e;const t=this.dryBus??this.ctx.destination,n=this.ctx.currentTime;[329.63,392,293.66,261.63].forEach((r,a)=>{if(!this.ctx)return;const o=n+a*.52,l=[{mult:1,amp:.11,decay:2.1},{mult:2,amp:.045,decay:1.4},{mult:2.756,amp:.025,decay:.85}];for(const c of l){const h=this.ctx.createOscillator();h.type="sine",h.frequency.setValueAtTime(r*c.mult,o);const u=this.ctx.createGain();u.gain.setValueAtTime(1e-4,o),u.gain.linearRampToValueAtTime(c.amp,o+.015),u.gain.exponentialRampToValueAtTime(1e-4,o+c.decay),h.connect(u),u.connect(t),h.start(o),h.stop(o+c.decay+.05)}})}playComboFanfare(e){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const t=1+Math.min(4,Math.max(0,e-2))*.06;[523.25,659.25,783.99,1046.5,1318.5].forEach((n,i)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(n*t,.13,.45)},i*45)}),this.triggerSleighBell(.82,.18)}testDirect(){if(this.unlock(),!this.ctx)return;const e=this.ctx.destination;[523.25,659.25,783.99,1046.5].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.playCelestaNote(t,.16,.7,e)},n*80)}),this.triggerSleighBell(.85,0,e)}testMedia(){var t;if(this.unlock(),!this.ctx)return;if(!this.mediaDest&&typeof this.ctx.createMediaStreamDestination=="function"){this.mediaDest=this.ctx.createMediaStreamDestination();const n=document.createElement("audio");n.autoplay=!0,n.setAttribute("playsinline",""),n.style.display="none",n.srcObject=this.mediaDest.stream,document.body.appendChild(n),this.mediaAudioEl=n}(t=this.mediaAudioEl)==null||t.play().catch(()=>{});const e=this.mediaDest??this.ctx.destination;[587.33,739.99,880,1174.66].forEach((n,i)=>{setTimeout(()=>{this.ctx&&this.playCelestaNote(n,.16,.7,e)},i*80)}),this.triggerSleighBell(.85,0,e)}testAudioFile(){this.wavDataUri||(this.wavDataUri=Fv());const e=new Audio(this.wavDataUri);e.volume=Math.max(.5,this.volume),e.play().catch(()=>{})}getDiagnostics(){let e=-100;if(this.ctx&&this.analyser&&this.analyserBuf&&this.ctx.state==="running"){this.analyser.getFloatTimeDomainData(this.analyserBuf);let t=0;for(let i=0;i<this.analyserBuf.length;i++)t+=this.analyserBuf[i]*this.analyserBuf[i];const n=Math.sqrt(t/this.analyserBuf.length);n>1e-5&&(e=Math.max(-100,Math.round(20*Math.log10(n))))}return{state:this.ctx?this.ctx.state:"uninitialized",sampleRate:this.ctx?this.ctx.sampleRate:0,routing:this.routing,outputDb:e}}dispose(){this.micStream&&(this.micStream.getTracks().forEach(e=>e.stop()),this.micStream=null),this.mediaAudioEl&&(this.mediaAudioEl.pause(),this.mediaAudioEl.remove(),this.mediaAudioEl=null),this.ctx&&(this.ctx.close().catch(()=>{}),this.ctx=null)}}const Ov={appTitle:"TESLA XMAS MODE",appSubtitle:"Coca-Cola Holiday Edition · Välj din julvärld",safetyTitle:"Innan du rullar ut i julnatten",safetyRules:["1 · Du är föraren. Du ansvarar alltid för körningen och att följa trafikreglerna.","2 · Håll ljudvolymen på en nivå där du alltid hör trafik, sirener och tutningar.","3 · Välj läge och gör inställningar medan bilen står stilla — skärmen tonar ner automatiskt under färd."],safetyDisclaimer:"Skapad för magisk passagerar- och bilstämning via webbläsarens GPS & Web Audio. Används på eget ansvar.",safetyAccept:"Starta Julmagin",soundTestBtn:"Ljudtest",menuDriveLabel:"Körkälla",menuAudioLabel:"Ljudmix",driveGps:"GPS (Bil)",driveDemo:"Demo Drive",driveManual:"Manuell",audioFull:"Full Jul",audioSfx:"Bara SFX (Spotify)",audioMuted:"Tyst",backToMenu:"← Meny",controlsBtn:"⚙ Kontroller",hoHoHoBtn:"🎅 Ho-Ho-Ho",northPoleShort:"Nordpolen",gpsActive:"GPS Aktiv",gpsWaiting:"Söker GPS…",gpsError:"GPS Saknas",demoActive:"Demo Drive",manualActive:"Manuell",tunnelActive:"Boring-tunnel",plaidBadge:"PLAID SLEIGH",drawerTitle:"Julkontroller & Test",drawerSwitchMode:"Byt läge direkt",drawerDriveSection:"Körning & Telemetri",drawerSpeedLabel:"Hastighet",drawerTurnLabel:"Sväng / Kurva",drawerTurnLeft:"Vänster",drawerTurnCenter:"Rakt",drawerTurnRight:"Höger",drawerTunnelToggle:"Testa Boring-tunnel",drawerElonSection:"Trigga Elon-händelse",drawerAudioSection:"Ljud & Tesla-högtalare",drawerVolume:"Volym",drawerRouting:"Ljudutgång",drawerRoutingDirect:"Direct",drawerRoutingMedia:"Media Player",drawerSoundCheckTitle:"Inget ljud? Tesla Ljudtest",drawerSoundCheckHint:"Skruva upp bilens rattvolym och testa knapparna en i taget. Välj sedan den utgång som hörs i högtalarna.",soundCheckDirect:"1 · Bjällra (Direct)",soundCheckMedia:"2 · Bjällra (Media Player)",soundCheckWav:"3 · Julklocka (Audio WAV)",drawerEnvSection:"Himmel, Frost & Språk",skyMidnight:"Julnatt",skyTwilight:"Blå timmen",skyDaylight:"Vinterdag",skyAuto:"Auto-tid",qualityLabel:"3D-Grafik",qualityUltra:"Pixar Ultra",qualityEco:"Eco (MCU2)",frostLabel:"Isfrost i hörnen",languageLabel:"Språk",closeDrawer:"Stäng",soundCheckModalTitle:"Tesla Högtalartest",modes:{express:{id:"express",title:"Coca-Cola Winter Express",subtitle:"3D Pixar-panorama med skulpterad Tomte & renar som galopperar längs gnistrande alptoppar, norrsken och varma julstugor.",badge:"3D Pixar Panorama",actionLabel:"🎁 Släpp julklapp"},caravan:{id:"caravan",title:"Holidays Are Coming: Caravan",subtitle:"Glödande 3D-konvoj av julbelysta Tesla Semis & Cybertruck som tänder en gyllene ljusvåg längs den snöiga dalen.",badge:"3D Coca-Cola Caravan",actionLabel:"✨ Ljusvåg"},flight3d:{id:"flight3d",title:"North Pole Flight Deck",subtitle:"Flagship Pixar 3D-vinterväg med Coca-Cola & Tesla-karavaner, realtidsflyg, norrsken, hus från OpenStreetMap & Julklappskanon!",badge:"Disney/Pixar All-in-One ★",actionLabel:"🎁 Tänd byn & Starlink"},snowglobe:{id:"snowglobe",title:"The Enchanted Snowglobe",subtitle:"Äkta 3D-kristallglob med miniatyrby & kretsande släde där snön virvlar av bilens G-krafter, plus riktig Nordpolen-kompass.",badge:"3D Crystal Snowglobe",actionLabel:"❄️ Skaka globen"},timeline:{id:"timeline",title:"Elon Holiday Timeline (2006–2026)",subtitle:"Kör förbi 14 fullskaliga Elon-händelser längs vintervägen — från Secret Master Plan & $420 till Starman, Mechazilla & Cybercab!",badge:"3D Väghändelser · 14 År",actionLabel:"⏭ Nästa längs vägen"}},elonEvents:{starman:{label:"🚗 Starman",toast:"Starman med tomteluva passerar framför fullmånen!"},starlink:{label:"🛰 Starlink",toast:"Starlink-julbelysning glider över stjärnhimlen"},starship:{label:"🚀 Starship",toast:"Starship lyfter mot Nordpolens norrsken!"},supercharger:{label:"⚡ Supercharger",toast:"Nordpolens Supercharger-Oas · Glöggbod & Optimus!"},cyberplow:{label:"🎄 Cybertruck",toast:"Cybertruck-snöplog med lysande julgran på flaket!"}},reindeerGears:{park:"PARK",trot:"TROT",dash:"DASH",prance:"PRANCE",comet:"COMET",blitzen:"BLITZEN",plaid:"PLAID"},snowglobeTitle:"TESLA XMAS EDITION",snowglobeSpeedLabel:"SLÄDFART",snowglobeCompassLabel:"NORDPOLEN",snowglobeGearLabel:"RENVÄXEL",snowglobeNorthPoleKm:"km till Tomten",tunnelBanner:"THE BORING CO. · NORTH POLE EXPRESS",webglFallbackTitle:"WebGL kunde inte startas",webglFallbackText:"Din webbläsare nekade 3D-kontext just nu. Prova något av de andra tre lägena i menyn!",osmSectionLabel:"Plats & OpenStreetMap",osmEnableLabel:"Använd OpenStreetMap (GPS-miljö)",osmNextStopBtn:"📍 Nästa demo-plats",osmGreetingPrefix:"God Jul,",osmBiomes:{village:"Julstad",forest:"Vinterskog",water:"Frusen sjö",highway:"Vinterväg",open:"Öppet landskap"},timelinePrev:"Föregående",timelineNext:"Nästa",timelinePassingLabel:"Passerar nu!",timelineUpcomingLabel:"Längre fram längs vägen",osmBuildingsLabel:"byggnader",osmWaterLabel:"vatten",osmWildlifeLabel:"🦌 Skogsdjur",osmLiveGpsTag:"Live OSM",osmDemoTourTag:"Demo-rutt",cinematicCamBtn:"🎥 Bio",cinematicCamLabel:"Cinematic Bio-kamera",themeLabel:"Jul-tema / Skinn",themeClassic:"Coca-Cola",themeNordic:"Sagovinter",themeCyber:"Cyber 2099",calendarLabel:"Advents- & Julkalender",calAuto:"Auto (Idag)",calAdvent:"4:e Advent",calLucia:"Lucia (13 dec)",calXmasEve:"Julafton (24 dec)",micLabel:"🎤 Lyssna på bilens musik",micOff:"Av",micActive:"Aktiv",micDenied:"Ej tillåten",liveSectionLabel:"Live Rymd, Väder & Flyg",frostWipeHint:"Dra fingret på kanterna för att skrapa frost",giftsLabel:"🎁",elonTimelineToggleLabel:"Visa Elon-tidslinje längs vägen",convoyHornBtn:"📯 Tuta",townTreeLitToast:"🎄 Torggranen tänd! +5 🎁 Hela kvarteret strålar!",snowmanCrownToast:"⛄ Snögubben jublar med guldkrona! +2 🎁",wishStarToast:"🌠 Fångade ett stjärnfall! +3 Önskebonus 🎁",convoyHornToast:"📯 Konvojen tutar julhälsning · Strålkastarvåg!"},Bv={appTitle:"TESLA XMAS MODE",appSubtitle:"Coca-Cola Holiday Edition · Choose your holiday world",safetyTitle:"Before you roll into the winter night",safetyRules:["1 · You are the driver. You are always responsible for driving safely and obeying traffic laws.","2 · Keep volume at a level where you can clearly hear traffic, sirens, and horns.","3 · Choose modes and adjust settings while parked — the HUD gently dims automatically while driving."],safetyDisclaimer:"Built for festive cabin ambience via browser GPS & Web Audio. Use at your own risk.",safetyAccept:"Ignite Holiday Magic",soundTestBtn:"Sound Check",menuDriveLabel:"Drive Source",menuAudioLabel:"Audio Mix",driveGps:"GPS (Car)",driveDemo:"Demo Drive",driveManual:"Manual",audioFull:"Full Holiday",audioSfx:"SFX Only (Spotify)",audioMuted:"Muted",backToMenu:"← Menu",controlsBtn:"⚙ Controls",hoHoHoBtn:"🎅 Ho-Ho-Ho",northPoleShort:"North Pole",gpsActive:"GPS Live",gpsWaiting:"Acquiring GPS…",gpsError:"No GPS",demoActive:"Demo Drive",manualActive:"Manual",tunnelActive:"Boring Tunnel",plaidBadge:"PLAID SLEIGH",drawerTitle:"Holiday Controls & Test",drawerSwitchMode:"Switch mode",drawerDriveSection:"Driving & Telemetry",drawerSpeedLabel:"Speed",drawerTurnLabel:"Steering / Curve",drawerTurnLeft:"Left",drawerTurnCenter:"Straight",drawerTurnRight:"Right",drawerTunnelToggle:"Test Boring Tunnel",drawerElonSection:"Trigger Elon Easter Egg",drawerAudioSection:"Audio & Tesla Speakers",drawerVolume:"Volume",drawerRouting:"Audio Output",drawerRoutingDirect:"Direct",drawerRoutingMedia:"Media Player",drawerSoundCheckTitle:"No sound? Tesla Sound Check",drawerSoundCheckHint:"Turn up the car volume on the steering wheel and test the buttons one by one. Select the route you hear.",soundCheckDirect:"1 · Sleigh Bell (Direct)",soundCheckMedia:"2 · Sleigh Bell (Media Player)",soundCheckWav:"3 · Holiday Chime (Audio WAV)",drawerEnvSection:"Sky, Frost & Language",skyMidnight:"Holiday Night",skyTwilight:"Blue Hour",skyDaylight:"Winter Day",skyAuto:"Auto Time",qualityLabel:"3D Graphics",qualityUltra:"Pixar Ultra",qualityEco:"Eco (MCU2)",frostLabel:"Corner Ice Frost",languageLabel:"Language",closeDrawer:"Close",soundCheckModalTitle:"Tesla Speaker Check",modes:{express:{id:"express",title:"Coca-Cola Winter Express",subtitle:"3D Pixar side-tracking cinema shot with sculpted Santa & galloping reindeer soaring over alpine peaks, aurora, and glowing cottages.",badge:"3D Pixar Panorama",actionLabel:"🎁 Drop Gift"},caravan:{id:"caravan",title:"Holidays Are Coming: Caravan",subtitle:"Illuminated 3D convoy of Coca-Cola-crimson Tesla Semis & Cybertruck sparking a golden wave of lights down the snowy valley.",badge:"3D Coca-Cola Caravan",actionLabel:"✨ Light Wave"},flight3d:{id:"flight3d",title:"North Pole Flight Deck",subtitle:"Flagship Pixar 3D winter boulevard fusing Coca-Cola & Tesla Semis, live sky data, OSM cottages & Gigafactories, plus a Gift Cannon!",badge:"Disney/Pixar All-in-One ★",actionLabel:"🎁 Light Up & Starlink"},snowglobe:{id:"snowglobe",title:"The Enchanted Snowglobe",subtitle:"True 3D crystal snowglobe with orbiting sleigh & miniature village swirling with G-forces, plus a live North Pole compass.",badge:"3D Crystal Snowglobe",actionLabel:"❄️ Shake Globe"},timeline:{id:"timeline",title:"Elon Holiday Timeline (2006–2026)",subtitle:"Drive past 14 full-scale Elon spectacles erupting along the winter highway — from Secret Master Plan & $420 to Starman & Mechazilla!",badge:"3D Road Events · 14 Years",actionLabel:"⏭ Next Roadside Event"}},elonEvents:{starman:{label:"🚗 Starman",toast:"Santa-hat Starman glides across the full moon!"},starlink:{label:"🛰 Starlink",toast:"Starlink holiday train sparkles across the night sky"},starship:{label:"🚀 Starship",toast:"Starship launches into the northern lights!"},supercharger:{label:"⚡ Supercharger",toast:"North Pole Supercharger Oasis · Glögg & Optimus!"},cyberplow:{label:"🎄 Cybertruck",toast:"Cybertruck Snowplow hauling a glowing Christmas tree!"}},reindeerGears:{park:"PARK",trot:"TROT",dash:"DASH",prance:"PRANCE",comet:"COMET",blitzen:"BLITZEN",plaid:"PLAID"},snowglobeTitle:"TESLA XMAS EDITION",snowglobeSpeedLabel:"SLEIGH SPEED",snowglobeCompassLabel:"NORTH POLE",snowglobeGearLabel:"REINDEER GEAR",snowglobeNorthPoleKm:"km to Santa",tunnelBanner:"THE BORING CO. · NORTH POLE EXPRESS",webglFallbackTitle:"WebGL unavailable",webglFallbackText:"Your browser declined a 3D WebGL context. Try any of the other holiday modes from the menu!",osmSectionLabel:"Location & OpenStreetMap",osmEnableLabel:"Enable OpenStreetMap World",osmNextStopBtn:"📍 Next Demo Location",osmGreetingPrefix:"Merry Christmas,",osmBiomes:{village:"Winter Town",forest:"Snowy Forest",water:"Frozen Lake",highway:"Winter Highway",open:"Open Countryside"},timelinePrev:"Previous",timelineNext:"Next",timelinePassingLabel:"Passing now!",timelineUpcomingLabel:"Ahead down the road",osmBuildingsLabel:"buildings",osmWaterLabel:"water",osmWildlifeLabel:"🦌 Forest wildlife",osmLiveGpsTag:"Live OSM",osmDemoTourTag:"Demo Tour",cinematicCamBtn:"🎥 Cinema",cinematicCamLabel:"Cinematic Commercial Cam",themeLabel:"Holiday Theme",themeClassic:"Coca-Cola",themeNordic:"Nordic Tale",themeCyber:"Cyber 2099",calendarLabel:"Advent & Holiday Calendar",calAuto:"Auto (Today)",calAdvent:"4th Advent",calLucia:"Lucia (Dec 13)",calXmasEve:"Xmas Eve (Dec 24)",micLabel:"🎤 Cabin Music Light Show",micOff:"Off",micActive:"Active",micDenied:"Blocked",liveSectionLabel:"Live Space, Wind & Flights",frostWipeHint:"Drag edges to wipe windshield frost",giftsLabel:"🎁",elonTimelineToggleLabel:"Show Elon Timeline along road",convoyHornBtn:"📯 Horn",townTreeLitToast:"🎄 Town Square Tree Ignited! +5 🎁 Full Block Glowing!",snowmanCrownToast:"⛄ Snowman Crowned with Gold! +2 🎁",wishStarToast:"🌠 Shooting Star Caught! +3 Wish Bonus 🎁",convoyHornToast:"📯 Convoy Horn Salute · Synchronized Light Flash!"},kv={sv:Ov,en:Bv};class zv{constructor(){B(this,"locale","sv");B(this,"listeners",new Set);try{const e=localStorage.getItem("tesla-xmas-locale");(e==="sv"||e==="en")&&(this.locale=e)}catch{}}getLocale(){return this.locale}setLocale(e){if(this.locale!==e){this.locale=e;try{localStorage.setItem("tesla-xmas-locale",e)}catch{}for(const t of this.listeners)t(e)}}t(){return kv[this.locale]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}const ma=new zv;class wy{constructor(){B(this,"streaks",[]);B(this,"scrollPhase",0);for(let e=0;e<65;e++)this.streaks.push({angle:Math.random()*Math.PI*2,z:Math.random(),len:.04+Math.random()*.09,gold:Math.random()>.72})}render(e,t,n,i,r){const a=r.tunnelBlend;if(a<=.01)return;const l=.55+(r.speedKmh>3?r.speedKmh:68)/80*1.45;this.scrollPhase=(this.scrollPhase+i*l*1.35)%1,e.save(),e.globalAlpha=Math.min(1,a);const c=t*.5+r.turnRate*t*.08,h=n*.46,u=e.createRadialGradient(c,h,12,c,h,Math.max(t,n)*.78);u.addColorStop(0,"#fff4dc"),u.addColorStop(.08,"#ffb868"),u.addColorStop(.24,"#5a1324"),u.addColorStop(.65,"#190612"),u.addColorStop(1,"#090208"),e.fillStyle=u,e.fillRect(0,0,t,n);const d=22,f=Math.hypot(t,n)*.78,m=18;for(let g=d-1;g>=0;g--){const p=(g/d+this.scrollPhase/d)%1,y=Math.pow(p,2.35),_=m+y*f,v=(c-t*.5)*(1-y)+r.turnRate*45*(1-y),A=t*.5+v,S=h+(1-y)*-10,C=(g+Math.floor(this.scrollPhase*d))%3;let L="#e6223a";C===1&&(L="#f7f1e8"),C===2&&(L="#ffcf70");const b=2+y*24;e.save(),e.beginPath(),e.ellipse(A,S,_*1.18,_*.88,0,0,Math.PI*2),e.strokeStyle=L,e.globalAlpha=a*(.18+y*.78),e.lineWidth=b,e.stroke(),y>.14&&g%2===0&&(e.beginPath(),e.ellipse(A,S,_*1.13,_*.84,0,Math.PI*1.1,Math.PI*1.9),e.strokeStyle="rgba(255, 224, 150, 0.65)",e.lineWidth=1.5+y*4,e.setLineDash([4+y*12,10+y*24]),e.stroke(),e.setLineDash([])),e.restore()}const x=e.createLinearGradient(0,h+20,0,n);x.addColorStop(0,"rgba(255, 210, 140, 0.2)"),x.addColorStop(.35,"rgba(130, 30, 48, 0.35)"),x.addColorStop(1,"rgba(12, 5, 16, 0.88)"),e.fillStyle=x,e.beginPath(),e.moveTo(c-28,h+16),e.lineTo(c+28,h+16),e.lineTo(t*.96,n),e.lineTo(t*.04,n),e.closePath(),e.fill();for(let g=0;g<12;g++){const p=(g/12+this.scrollPhase)%1,y=Math.pow(p,2.2),_=h+20+y*(n-h-20),v=c+r.turnRate*(1-y)*26,A=2+y*8;e.fillStyle=g%2===0?"rgba(255, 216, 132, 0.85)":"rgba(255, 86, 104, 0.85)",e.beginPath(),e.ellipse(v,_,A*1.8,A*.7,0,0,Math.PI*2),e.fill()}for(const g of this.streaks){g.z+=i*l*.85,g.z>=1&&(g.z-=1);const p=Math.pow(g.z,2),y=Math.pow(Math.min(1,g.z+g.len),2),_=22+p*f*.95,v=22+y*f*.95,A=Math.cos(g.angle),S=Math.sin(g.angle);e.strokeStyle=g.gold?`rgba(255, 224, 145, ${.25+p*.6})`:`rgba(235, 246, 255, ${.22+p*.55})`,e.lineWidth=1+p*2.5,e.beginPath(),e.moveTo(c+A*_*1.15,h+S*_*.85),e.lineTo(c+A*v*1.15,h+S*v*.85),e.stroke()}e.save(),e.font=`600 ${Math.max(11,Math.round(t*.011))}px "Cinzel", Georgia, serif`,e.textAlign="center",e.fillStyle="rgba(255, 232, 182, 0.92)",e.shadowColor="rgba(255, 170, 70, 0.9)",e.shadowBlur=14,e.fillText(ma.t().tunnelBanner,t*.5,Math.max(76,n*.14)),e.restore(),e.restore()}}const Gv={starman:12,starlink:11,starship:13,supercharger:11,cyberplow:11},jr=["starman","starlink","starship","supercharger","cyberplow"];class Ty{constructor(){B(this,"active",null);B(this,"cooldownSec",9);B(this,"lastType",null);B(this,"onStartCallbacks",new Set)}onEventStart(e){return this.onStartCallbacks.add(e),()=>this.onStartCallbacks.delete(e)}getActiveEvent(){return this.active}trigger(e){const t=Gv[e];this.active={type:e,duration:t,elapsed:0,progress:0},this.lastType=e,this.cooldownSec=28+Math.random()*16;for(const n of this.onStartCallbacks)n(e)}triggerNext(){const e=this.lastType?(jr.indexOf(this.lastType)+1)%jr.length:0,t=jr[e];return this.trigger(t),t}update(e,t){if(this.active)return this.active.elapsed+=e,this.active.progress=Math.min(1,this.active.elapsed/this.active.duration),this.active.elapsed>=this.active.duration&&(this.active=null),this.active;if(t&&(this.cooldownSec-=e,this.cooldownSec<=0)){const n=jr.filter(r=>r!==this.lastType),i=n[Math.floor(Math.random()*n.length)];this.trigger(i)}return null}reset(){this.active=null,this.cooldownSec=10}}function Hv(s){const e=25514428610880003e-7,t=Date.UTC(2e3,0,6,18,14,0);return((s.getTime()-t)%e+e)%e/e}function Vv(s,e){const t=s.getFullYear(),n=new Date(t,11,24,15,0,0);s.getTime()>new Date(t,11,26).getTime()&&n.setFullYear(t+1);const i=Math.max(0,Math.ceil((n.getTime()-s.getTime())/864e5));if(e==="lucia")return{adventCandles:2,isLucia:!0,isXmasEve:!1,daysToXmas:i,badgeSv:"🕯 Luciatåg längs snövallen!",badgeEn:"🕯 St. Lucia Procession!"};if(e==="xmas_eve"){const x=new Date(s.getFullYear(),s.getMonth(),s.getDate(),15,0,0),g=Math.max(0,Math.floor((x.getTime()-s.getTime())/36e5)),p=Math.max(0,Math.floor((x.getTime()-s.getTime())%36e5/6e4));return{adventCandles:4,isLucia:!1,isXmasEve:!0,daysToXmas:0,badgeSv:s.getHours()<15?`🎆 Julafton! Kalle Anka om ${g}h ${p}m`:"🎆 Julafton · Fyrverkerier över bergen!",badgeEn:"🎆 Christmas Eve Fireworks!"}}if(e.startsWith("advent")){const x=Number(e.replace("advent",""));return{adventCandles:x,isLucia:!1,isXmasEve:!1,daysToXmas:i,badgeSv:`🕯 ${x}:a–4:e Advent (${x}/4 ljus tända)`,badgeEn:`🕯 Advent Candle ${x}/4 Lit`}}const a=new Date(t,11,24).getDay(),o=24-(a===0?0:a),l=new Date(t,11,o,0,0,0),c=new Date(l.getTime()-21*864e5);let h=0;if(s>=c){const x=Math.floor((s.getTime()-c.getTime())/6048e5)+1;h=Math.min(4,Math.max(1,x))}const u=s.getMonth()===11&&s.getDate()===13,d=s.getMonth()===11&&(s.getDate()===24||s.getDate()===25);let f=null,m=null;return d?(f="🎆 God Jul & Gott Nytt!",m="🎆 Merry Christmas Eve!"):u?(f="🕯 Glad Lucia (13 dec)",m="🕯 Happy St. Lucia Day!"):h>0&&(f=`🕯 ${h} adventljus · ${i} dgr till jul`,m=`🕯 Advent ${h}/4 · ${i}d to Xmas`),{adventCandles:h,isLucia:u,isXmasEve:d,daysToXmas:i,badgeSv:f,badgeEn:m}}class Ey{constructor(){B(this,"skyMood","midnight");B(this,"quality","ultra");B(this,"frostEnabled",!0);B(this,"theme","classic");B(this,"calendarMode","auto");B(this,"cinematicCam",!1);B(this,"elonTimelineEnabled",!0);B(this,"temperatureC",-6);B(this,"windSpeedKmh",14);B(this,"windDirDeg",250);B(this,"precipMm",.4);B(this,"isSnowingReal",!0);B(this,"sunriseMin",480);B(this,"sunsetMin",915);B(this,"sunriseText","08:00");B(this,"sunsetText","15:15");B(this,"lastWeatherFetchMs",0);B(this,"lastLat",59.33);B(this,"lastLon",18.07);try{const e=localStorage.getItem("tesla-xmas-sky");(e==="midnight"||e==="twilight"||e==="daylight"||e==="auto")&&(this.skyMood=e);const t=localStorage.getItem("tesla-xmas-quality");(t==="ultra"||t==="eco")&&(this.quality=t),localStorage.getItem("tesla-xmas-frost")==="0"&&(this.frostEnabled=!1);const i=localStorage.getItem("tesla-xmas-theme");(i==="classic"||i==="nordic"||i==="cyber2099")&&(this.theme=i);const r=localStorage.getItem("tesla-xmas-cal");(r==="auto"||r==="advent1"||r==="advent2"||r==="advent3"||r==="advent4"||r==="lucia"||r==="xmas_eve")&&(this.calendarMode=r),localStorage.getItem("tesla-xmas-cinecam")==="1"&&(this.cinematicCam=!0),localStorage.getItem("tesla-xmas-elon-timeline")==="0"&&(this.elonTimelineEnabled=!1)}catch{}}getQuality(){return this.quality}setQuality(e){this.quality=e;try{localStorage.setItem("tesla-xmas-quality",e)}catch{}}getSkyMood(){return this.skyMood}setSkyMood(e){this.skyMood=e;try{localStorage.setItem("tesla-xmas-sky",e)}catch{}}isFrostEnabled(){return this.frostEnabled}setFrostEnabled(e){this.frostEnabled=e;try{localStorage.setItem("tesla-xmas-frost",e?"1":"0")}catch{}}isElonTimelineEnabled(){return this.elonTimelineEnabled}setElonTimelineEnabled(e){this.elonTimelineEnabled=e;try{localStorage.setItem("tesla-xmas-elon-timeline",e?"1":"0")}catch{}}getTheme(){return this.theme}setTheme(e){this.theme=e;try{localStorage.setItem("tesla-xmas-theme",e)}catch{}}getCalendarMode(){return this.calendarMode}setCalendarMode(e){this.calendarMode=e;try{localStorage.setItem("tesla-xmas-cal",e)}catch{}}isCinematicCam(){return this.cinematicCam}setCinematicCam(e){this.cinematicCam=e;try{localStorage.setItem("tesla-xmas-cinecam",e?"1":"0")}catch{}}maybeRefreshWeather(e,t){const n=Date.now(),i=Math.abs(e-this.lastLat)>.25||Math.abs(t-this.lastLon)>.25;if(this.lastWeatherFetchMs!==0&&n-this.lastWeatherFetchMs<900*1e3&&!i)return;this.lastWeatherFetchMs=n,this.lastLat=e,this.lastLon=t;const r=`https://api.open-meteo.com/v1/forecast?latitude=${e.toFixed(3)}&longitude=${t.toFixed(3)}&current=temperature_2m,snowfall,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=auto&forecast_days=1`;fetch(r).then(a=>a.ok?a.json():null).then(a=>{var g,p,y,_;if(!a||!a.current)return;const o=a.current.temperature_2m,l=a.current.snowfall,c=a.current.precipitation,h=a.current.weather_code,u=a.current.wind_speed_10m,d=a.current.wind_direction_10m;typeof o=="number"&&Number.isFinite(o)&&(this.temperatureC=Math.round(o)),typeof u=="number"&&Number.isFinite(u)&&(this.windSpeedKmh=Math.max(0,Math.round(u))),typeof d=="number"&&Number.isFinite(d)&&(this.windDirDeg=(d%360+360)%360),typeof c=="number"&&Number.isFinite(c)&&(this.precipMm=Math.max(0,c));const f=new Set([71,73,75,77,85,86]);this.isSnowingReal=typeof l=="number"&&l>0||typeof c=="number"&&c>.2||f.has(h);const m=(p=(g=a.daily)==null?void 0:g.sunrise)==null?void 0:p[0],x=(_=(y=a.daily)==null?void 0:y.sunset)==null?void 0:_[0];if(typeof m=="string"&&m.includes("T")){const v=m.split("T")[1].slice(0,5),[A,S]=v.split(":").map(Number);Number.isFinite(A)&&Number.isFinite(S)&&(this.sunriseMin=A*60+S,this.sunriseText=v)}if(typeof x=="string"&&x.includes("T")){const v=x.split("T")[1].slice(0,5),[A,S]=v.split(":").map(Number);Number.isFinite(A)&&Number.isFinite(S)&&(this.sunsetMin=A*60+S,this.sunsetText=v)}}).catch(()=>{})}getState(){const e=new Date,t=e.getHours()*60+e.getMinutes();let n="midnight",i=0,r=0;if(this.skyMood==="daylight")n="daylight",i=1,r=.08;else if(this.skyMood==="twilight")n="twilight",i=.32,r=1;else if(this.skyMood==="auto"){const g=Math.abs(t-this.sunriseMin),p=Math.abs(t-this.sunsetMin);g<=42||p<=48?(n="twilight",i=.34,r=1):t>this.sunriseMin+42&&t<this.sunsetMin-48?(n="daylight",i=.95,r=.1):(n="midnight",i=0,r=0)}const a=this.temperatureC<=0?Math.min(1,.45+Math.abs(this.temperatureC)*.04):.28,o=this.isSnowingReal?.14:0,l=this.frostEnabled?Math.min(1,a+o):0,c=Hv(e),h=Vv(e,this.calendarMode);let u="#040a1d",d="#0b1a42",f="#192d5c",m="#0c1b42",x=.65;return this.theme==="cyber2099"?(u=n==="daylight"?"#1e2c64":"#060318",d=n==="daylight"?"#4a3f92":"#16093b",f=n==="daylight"?"#8c4b86":"#311259",m=n==="daylight"?"#4e3978":"#150b35",x=.85):n==="daylight"?(u="#3a75b8",d="#7cb3e2",f="#deebf8",m="#9cbfe4",x=.45):this.theme==="nordic"?(u="#04122e",d="#0e2959",f=n==="twilight"?"#70496c":"#234472",m=n==="twilight"?"#2c2c58":"#132854",x=.82):n==="twilight"&&(u="#0b1c48",d="#27427c",f="#8c5a74",m="#233262",x=1),{skyMood:this.skyMood,effectiveSky:n,daylightFactor:i,blueHourFactor:r,sunriseText:this.sunriseText,sunsetText:this.sunsetText,fogColor:m,quality:this.quality,temperatureC:this.temperatureC,windSpeedKmh:this.windSpeedKmh,windDirDeg:this.windDirDeg,precipMm:this.precipMm,moonPhase:c,isSnowingReal:this.isSnowingReal,frostEnabled:this.frostEnabled,frostAmount:l,theme:this.theme,calendarMode:this.calendarMode,holidayCalendar:h,cinematicCam:this.cinematicCam,elonTimelineEnabled:this.elonTimelineEnabled,skyTopColor:u,skyMidColor:d,skyHorizonColor:f,horizonWarmGlow:x}}}const Xn=[{placeName:"Stockholm",roadName:"Strandvägen",biome:"village",nearbyLandmark:"Kungliga Slottet",nearbyChargerName:null,lat:59.3322,lon:18.0815},{placeName:"Upplandsslätten",roadName:"Landsväg 255",biome:"open",nearbyLandmark:"Vintervidderna",nearbyChargerName:null,lat:59.721,lon:17.785},{placeName:"Roslagen",roadName:"Nordskogen",biome:"forest",nearbyLandmark:"Glittrande Granskog",nearbyChargerName:null,lat:59.685,lon:18.705},{placeName:"Giga Nord",roadName:"E4 Express",biome:"highway",nearbyLandmark:"Tesla Gigafactory Nord",nearbyChargerName:"Supercharger Giga Nord",lat:59.506,lon:17.921},{placeName:"Sigtuna",roadName:"Stora Gatan",biome:"village",nearbyLandmark:"Mariakyrkan",nearbyChargerName:null,lat:59.617,lon:17.723},{placeName:"Uppsala",roadName:"Fyrisån",biome:"water",nearbyLandmark:"Uppsala Domkyrka",nearbyChargerName:null,lat:59.858,lon:17.634}];function Tl(s,e,t,n){const i=Math.cos(s*Math.PI/180);return{x:(n-e)*111320*i,z:-(t-s)*110540}}function Wv(s,e,t,n){const r=(t-s)*Math.PI/180,a=(n-e)*Math.PI/180,o=Math.sin(r/2)**2+Math.cos(s*Math.PI/180)*Math.cos(t*Math.PI/180)*Math.sin(a/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}function Xv(s,e,t,n,i=0){const r=t*.5,a=n*.5,o=Math.cos(i),l=Math.sin(i);return[[-r,-a],[r,-a],[r,a],[-r,a]].map(([h,u])=>({x:s+h*o-u*l,z:e+h*l+u*o}))}function Lh(s){let e=0,t=0,n=0,i=1/0,r=-1/0,a=1/0,o=-1/0;const l=s.length;for(let c=0;c<l;c++){const h=s[c],u=s[(c+1)%l];e+=h.x*u.z-u.x*h.z,t+=h.x,n+=h.z,i=Math.min(i,h.x),r=Math.max(r,h.x),a=Math.min(a,h.z),o=Math.max(o,h.z)}return{area:Math.abs(e*.5),cx:t/Math.max(1,l),cz:n/Math.max(1,l),widthM:Math.max(3,r-i),depthM:Math.max(3,o-a)}}function qv(s,e){if(s.length<=e)return s;const t=s.length/e,n=[];for(let i=0;i<e;i++)n.push(s[Math.floor(i*t)]);return n}function Kv(s,e){const t=s.building??"yes",n=Number.parseFloat(s["building:levels"]??""),i=s.amenity??"",r=s.name??"";let a=0;const o=Number.parseFloat(s.height??"");Number.isFinite(o)&&o>2?a=o:Number.isFinite(n)&&n>0&&(a=n*3.4+1.5);let l="small_cottage";const c=t==="industrial"||t==="warehouse"||t==="factory"||t==="supermarket"||t==="retail"||t==="hangar"||s.landuse==="industrial";return t==="church"||t==="cathedral"||i==="place_of_worship"||/kyrka|cathedral|chapel/i.test(r)?(l="church",a||(a=16)):/^(house|detached|semidetached_house|bungalow|cabin|hut|cottage|farm|terrace)$/.test(t)?(l="small_cottage",a||(a=5)):c&&e>=280||e>=660||/giga|factory|warehouse|hall|center|fabrik/i.test(r)?(l="gigafactory",a||(a=13.5+Math.min(6,e*.004))):e>=290||(s.tourism==="attraction"||s.historic)||a>=14||/slott|palace|muse|school|skola|hospital/i.test(r)?(l="large_building",a||(a=15+Math.min(14,e*.012))):t==="apartments"||Number.isFinite(n)&&n>=3?(l="large_building",a||(a=12)):e>=115||t==="residential"?(l="medium_house",a||(a=6)):(l="small_cottage",a||(a=4.8+(e>60?1.5:0))),{kind:l,heightM:Math.max(4.4,Math.min(34,a))}}function uo(s,e){const t=Xn[s%Xn.length],n=[],i=[],r=[],a=[],o=[],l=(c,h,u,d,f,m,x,g=null,p=0)=>{n.push({id:c,footprint:Xv(h,u,d,f,p),centerX:h,centerZ:u,widthM:d,depthM:f,areaM2:d*f,heightM:m,kind:x,name:g})};if(t.placeName==="Stockholm"){r.push({points:[{x:-16,z:30},{x:-16,z:-240},{x:-110,z:-240},{x:-110,z:30}],isPolygon:!0,widthM:80,name:"Nybroviken"});for(let c=0;c<8;c++){const h=-14-c*26;l(`sthlm-a-${c}`,22,h,15,16,12.5+c%3*2.5,"medium_house"),c%2===0&&l(`sthlm-b-${c}`,44,h-6,17,15,14+c%2*3,"medium_house")}l("sthlm-palace",-30,-125,22,32,19,"large_building","Kungliga Slottet"),o.push({x:-13,z:-125,kind:"landmark",name:"Kungliga Slottet"}),i.push({points:[{x:11,z:-60},{x:75,z:-60}],widthM:6,isMajor:!1,name:"Torggatan"}),i.push({points:[{x:11,z:-134},{x:75,z:-134}],widthM:6,isMajor:!1,name:"Slottsbacken"}),a.push({centerX:-14,centerZ:-45,radiusM:8,density:.35},{centerX:14,centerZ:-102,radiusM:8,density:.35})}else if(t.placeName==="Upplandsslätten")l("upp-stuga",-22,-92,7.6,6.2,5.2,"small_cottage","Lillstugan",.14),l("upp-stuga-2",26,-158,7.2,5.8,5,"small_cottage",null,-.18),a.push({centerX:-48,centerZ:-140,radiusM:10,density:.28}),o.push({x:13,z:-88,kind:"landmark",name:"Vintervidderna"});else if(t.placeName==="Roslagen"){for(let c=0;c<9;c++){const h=c%2===0?-1:1,u=-18-c*23;a.push({centerX:h*(22+c%3*9),centerZ:u,radiusM:18,density:.85}),c===2?l("ros-cottage-1",-20,u,8.2,6.6,5.4,"small_cottage","Skogstorpet",.18):c===5&&l("ros-cottage-2",21,u,7.8,6.4,5.2,"small_cottage","Jägarstugan",-.2)}i.push({points:[{x:11,z:-76},{x:68,z:-92}],widthM:4.5,isMajor:!1,name:"Skogsvägen"}),o.push({x:13,z:-76,kind:"landmark",name:"Glittrande Granskog"})}else if(t.placeName==="Giga Nord")l("giga-factory-1",-34,-96,26,44,14.5,"gigafactory","Tesla Gigafactory Nord"),l("giga-office-2",28,-148,22,18,12,"large_building","Giga Design Hub"),l("giga-cottage-gate",22,-46,8,6.5,5.4,"small_cottage","Entrévakt",-.15),o.push({x:15,z:-96,kind:"charger",name:"Supercharger Giga Nord"}),i.push({points:[{x:-75,z:-64},{x:75,z:-64}],widthM:8,isMajor:!0,name:"Giga Allé"}),a.push({centerX:46,centerZ:-64,radiusM:14,density:.45});else if(t.placeName==="Sigtuna"){r.push({points:[{x:-34,z:30},{x:-38,z:-240},{x:-115,z:-240},{x:-115,z:30}],isPolygon:!0,widthM:70,name:"Sigtunafjärden"});for(let c=0;c<8;c++){const h=-16-c*24;l(`sig-l-${c}`,-19,h,c%2===0?7.8:11.2,c%2===0?6.4:9,c%2===0?5.4:8.5,c%2===0?"small_cottage":"medium_house"),l(`sig-r-${c}`,19,h-6,c%2===1?8:12,c%2===1?6.6:9.4,c%2===1?5.6:9,c%2===1?"small_cottage":"medium_house")}l("sig-church",31,-110,14,22,18,"church","Mariakyrkan"),o.push({x:13,z:-92,kind:"landmark",name:"Sigtuna Julmarknad"}),i.push({points:[{x:-34,z:-92},{x:64,z:-92}],widthM:5,isMajor:!1,name:"Stora Torget"}),a.push({centerX:-30,centerZ:-175,radiusM:12,density:.42})}else{r.push({points:[{x:-20,z:30},{x:-22,z:-110},{x:-27,z:-240}],isPolygon:!1,widthM:16,name:"Fyrisån"});for(let c=0;c<7;c++){const h=-18-c*28;l(`upp-r-${c}`,22,h,14.5,13.5,11.5+c%2*3,"medium_house"),c%2===0&&l(`upp-l-${c}`,-39,h-8,12,11,10.5,"medium_house")}l("upp-dom",-40,-116,20,32,26,"church","Uppsala Domkyrka"),o.push({x:-16,z:-116,kind:"church",name:"Uppsala Domkyrka"}),i.push({points:[{x:-65,z:-116},{x:65,z:-116}],widthM:6,isMajor:!1,name:"Dombron"}),a.push({centerX:34,centerZ:-182,radiusM:14,density:.42})}return{version:e,biome:t.biome,originLat:t.lat,originLon:t.lon,buildings:n,roads:i,waters:r,forests:a,pois:o}}async function Yv(s,e,t,n){try{const h=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:new URLSearchParams({data:s}),signal:AbortSignal.any([n,AbortSignal.timeout(7500)])});if(h.ok){const u=await h.json();if(Array.isArray(u.elements)&&u.elements.some(d=>{var f,m;return((f=d.tags)==null?void 0:f.highway)&&((m=d.geometry)==null?void 0:m.length)}))return u.elements}}catch(h){if(n.aborted)throw h}const i=390/110540,r=390/(111320*Math.max(.05,Math.cos(e*Math.PI/180))),a=[t-r,e-i,t+r,e+i].map(h=>h.toFixed(6)).join(","),o=await fetch("https://api.openstreetmap.org/api/0.6/map.json?bbox="+a,{signal:n});if(!o.ok)throw new Error("OSM map unavailable");const l=(await o.json()).elements,c=new Map;for(const h of l)h.type==="node"&&h.lat!==void 0&&h.lon!==void 0&&c.set(h.id,{lat:h.lat,lon:h.lon});for(const h of l)h.type==="way"&&h.nodes&&(h.geometry=h.nodes.flatMap(u=>c.get(u)??[]));return l.filter(h=>h.tags&&(!h.tags.highway||/^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$/.test(h.tags.highway)))}class Ay{constructor(e=!1){B(this,"enabled",!0);B(this,"isLiveOsm",!1);B(this,"placeName",Xn[0].placeName);B(this,"roadName",Xn[0].roadName);B(this,"biome",Xn[0].biome);B(this,"nearbyLandmark",Xn[0].nearbyLandmark);B(this,"nearbyChargerName",Xn[0].nearbyChargerName);B(this,"isNearRealTunnel",!1);B(this,"landmarkPulse",.7);B(this,"demoIdx",0);B(this,"demoTravelM",0);B(this,"snapshotVersion",1);B(this,"snapshot",uo(0,1));B(this,"lastFetchMs",0);B(this,"lastFetchLat",0);B(this,"lastFetchLon",0);B(this,"retryMap",!1);B(this,"inflightAbort",null);B(this,"placeListeners",new Set);if(!e)try{localStorage.getItem("tesla-xmas-osm")==="0"&&(this.enabled=!1)}catch{}}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e;try{localStorage.setItem("tesla-xmas-osm",e?"1":"0")}catch{}}onPlaceChange(e){return this.placeListeners.add(e),()=>this.placeListeners.delete(e)}emitPlaceChange(){const e=this.getState();for(const t of this.placeListeners)t(e)}nextDemoStop(){this.demoIdx=(this.demoIdx+1)%Xn.length,this.demoTravelM=0;const e=Xn[this.demoIdx];this.isLiveOsm=!1,this.placeName=e.placeName,this.roadName=e.roadName,this.biome=e.biome,this.nearbyLandmark=e.nearbyLandmark,this.nearbyChargerName=e.nearbyChargerName,this.isNearRealTunnel=!1,this.landmarkPulse=1,this.snapshotVersion++,this.snapshot=uo(this.demoIdx,this.snapshotVersion),this.emitPlaceChange()}update(e,t,n,i,r,a=55,o=!0){if(this.landmarkPulse>0&&(this.landmarkPulse=Math.max(0,this.landmarkPulse-e*.25)),(!this.enabled||t!=="gps")&&this.inflightAbort&&(this.inflightAbort.abort(),this.inflightAbort=null),(!this.enabled||t!=="gps")&&(this.lastFetchMs=0),!this.enabled||t==="gps"&&!o)return this.getState();if(t==="gps"){const l=Date.now(),c=this.lastFetchMs===0?9999:Wv(this.lastFetchLat,this.lastFetchLon,n,i);!this.inflightAbort&&(this.lastFetchMs===0||l-this.lastFetchMs>=8e3&&c>=120||l-this.lastFetchMs>=3e4&&(!this.isLiveOsm||this.retryMap))&&(this.lastFetchMs=l,this.lastFetchLat=n,this.lastFetchLon=i,this.fetchLiveOsm(n,i))}else this.isLiveOsm&&(this.isLiveOsm=!1,this.snapshotVersion++,this.snapshot=uo(this.demoIdx,this.snapshotVersion)),r&&(this.demoTravelM+=Math.max(12,a)/3.6*e*.65,this.demoTravelM>=185&&this.nextDemoStop());return this.getState()}async fetchLiveOsm(e,t){var r;(r=this.inflightAbort)==null||r.abort();const n=new AbortController;this.inflightAbort=n;const i=setTimeout(()=>n.abort(),2e4);try{const a=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.toFixed(5)}&lon=${t.toFixed(5)}&zoom=18&addressdetails=1`,o=e.toFixed(4),l=t.toFixed(4),h=`[out:json][timeout:6];${`way(around:650,${o},${l})["highway"~"^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$"]`};out body geom;(way(around:460,${o},${l})["building"];way(around:320,${o},${l})["natural"~"water|wood|grassland|heath"];way(around:300,${o},${l})["waterway"~"river|canal|stream"];way(around:300,${o},${l})["landuse"~"forest|farmland|meadow|field|farmyard|pasture|industrial|commercial|retail|residential|recreation_ground"];way(around:300,${o},${l})["leisure"="park"];way(around:120,${o},${l})["tunnel"="yes"];node(around:450,${o},${l})["amenity"~"charging_station|place_of_worship|cafe|restaurant|school|library"];node(around:450,${o},${l})["tourism"="attraction"];node(around:450,${o},${l})["railway"="station"];node(around:450,${o},${l})["historic"];node(around:350,${o},${l})["natural"="tree"];);out body geom;`,[u,d]=await Promise.all([fetch(a,{signal:AbortSignal.timeout(3500)}).catch(()=>null),Yv(h,e,t,n.signal)]);let f=this.isLiveOsm?this.placeName:"",m=this.isLiveOsm?this.roadName:"";if(u!=null&&u.ok){const F=await u.json(),O=(F==null?void 0:F.address)??{};f=O.city||O.town||O.village||O.suburb||O.municipality||f,m=O.road||O.neighbourhood||f}let x="open",g=null,p=null,y=!1;const _=[],v=[],A=[],S=[],C=[],L=[],b=[],M=new Set;{let F=!1,O=!1,Y=!1,V=!1,J=!1;for(const G of d){const N=G.tags;if(!N)continue;if(N.tunnel==="yes"&&(y=!0),G.type==="node"&&G.lat!==void 0&&G.lon!==void 0){const j=Tl(e,t,G.lat,G.lon);if(N.natural==="tree")L.push(j);else if(N.amenity==="charging_station"){const ce=N.name||N.operator||"Laddstation";p||(p=ce),C.push({x:j.x,z:j.z,kind:"charger",name:ce,tesla:/tesla|supercharger/i.test([N.name,N.brand,N.operator,N.network].join(" "))})}else N.amenity==="place_of_worship"&&N.name?(g||(g=N.name),C.push({x:j.x,z:j.z,kind:"church",name:N.name})):N.railway==="station"&&N.name?(g||(g=N.name),C.push({x:j.x,z:j.z,kind:"station",name:N.name})):N.name&&(g||(g=N.name),C.push({x:j.x,z:j.z,kind:"landmark",name:N.name}));continue}if(G.type!=="way"||!G.geometry||G.geometry.length<2||M.has(G.id))continue;M.add(G.id);const W=G.geometry.map(j=>Tl(e,t,j.lat,j.lon));if(N.building){const j=W.length>3&&Math.hypot(W[0].x-W[W.length-1].x,W[0].z-W[W.length-1].z)<.3?W.slice(0,-1):W;if(j.length<3)continue;const ce=Lh(j);if(ce.area<8)continue;const ze=Kv(N,ce.area);_.push({id:`w-${G.id}`,footprint:j,centerX:ce.cx,centerZ:ce.cz,widthM:ce.widthM,depthM:ce.depthM,areaM2:ce.area,heightM:ze.heightM,levels:Number.parseFloat(N["building:levels"]??"")||void 0,roofShape:N["roof:shape"],kind:ze.kind,tesla:/tesla|gigafactory/i.test([N.name,N.brand,N.operator].join(" "))&&/industrial|warehouse|factory|commercial/.test(N.building+" "+N.landuse)||/gigafactory/i.test(N.name??""),name:N.name??null}),ze.kind==="church"&&N.name&&(g=N.name)}else if(N.highway){const j=N.highway,ce=j==="motorway"||j==="trunk"||j==="primary"||j==="secondary";ce&&(J=!0);const ze=ce?8.5:j==="tertiary"||j==="residential"?6.2:4.2;v.push({points:W,widthM:ze,isMajor:ce,tunnel:N.tunnel==="yes"||N.tunnel==="building_passage",name:N.name??N.ref??null})}else if(N.natural==="water"||N.waterway){F=!0;const j=W.length>3&&Math.hypot(W[0].x-W[W.length-1].x,W[0].z-W[W.length-1].z)<2;A.push({points:qv(j?W.slice(0,-1):W,20),isPolygon:j&&N.natural==="water",widthM:N.waterway==="river"||N.waterway==="canal"?14:7,name:N.name??N.ref??null})}else if(N.natural==="wood"||N.landuse==="forest"||N.leisure==="park"){O=!0,W.length>3&&Math.hypot(W[0].x-W.at(-1).x,W[0].z-W.at(-1).z)<1&&b.push(W);const j=Lh(W),ce=Math.max(8,Math.min(34,Math.sqrt(Math.max(50,j.area)/Math.PI)));S.push({centerX:j.cx,centerZ:j.cz,radiusM:ce,density:N.leisure==="park"?.45:.88})}else N.landuse==="farmland"||N.landuse==="meadow"||N.landuse==="field"||N.landuse==="farmyard"||N.landuse==="pasture"||N.natural==="grassland"||N.natural==="heath"?V=!0:(N.landuse==="residential"||N.landuse==="commercial"||N.landuse==="retail")&&(Y=!0)}F&&A.length>0?x="water":O&&_.length<7?x="forest":_.length>=4||Y?x="village":V||!O&&_.length<=3&&!J?x="open":x="highway"}const I=(F,O)=>F*F+O*O;_.sort((F,O)=>I(F.centerX,F.centerZ)-I(O.centerX,O.centerZ)),S.sort((F,O)=>I(F.centerX,F.centerZ)-I(O.centerX,O.centerZ)),C.sort((F,O)=>I(F.x,F.z)-I(O.x,O.z));const H=f!==this.placeName||x!==this.biome||g!==this.nearbyLandmark;if(n.signal.aborted)return;this.retryMap=!1,this.isLiveOsm=!0,this.placeName=f,this.roadName=m,this.biome=x,this.nearbyLandmark=g,this.nearbyChargerName=p,this.isNearRealTunnel=y,this.snapshotVersion++,this.snapshot={version:this.snapshotVersion,biome:x,originLat:e,originLon:t,buildings:_.slice(0,350),trees:L,woodland:b,roads:v,waters:A.slice(0,10),forests:S.slice(0,14),pois:C.slice(0,8)},H&&(this.landmarkPulse=1,this.emitPlaceChange())}catch{this.retryMap=!0}finally{clearTimeout(i),this.inflightAbort===n&&(this.inflightAbort=null)}}getState(){return{enabled:this.enabled,isLiveOsm:this.isLiveOsm,placeName:this.placeName,roadName:this.roadName,biome:this.biome,nearbyLandmark:this.nearbyLandmark,nearbyChargerName:this.nearbyChargerName,isNearRealTunnel:this.isNearRealTunnel,landmarkPulse:this.landmarkPulse,snapshot:this.snapshot,buildingCount:this.snapshot.buildings.length,waterCount:this.snapshot.waters.length,forestCount:this.snapshot.forests.length,demoTravelM:this.demoTravelM}}}class Cy{constructor(){B(this,"canvas");B(this,"ctx");B(this,"baseCanvas");B(this,"baseCtx");B(this,"w",640);B(this,"h",360);B(this,"scale",.5);B(this,"seeded",!1);B(this,"lastEnabled",!1);this.canvas=document.createElement("canvas"),this.canvas.className="frost-canvas",this.ctx=this.canvas.getContext("2d"),this.baseCanvas=document.createElement("canvas"),this.baseCtx=this.baseCanvas.getContext("2d")}resize(e,t){const n=Math.min(.55,Math.max(.35,640/Math.max(1,e))),i=Math.max(240,Math.round(e*n)),r=Math.max(160,Math.round(t*n));i===this.w&&r===this.h&&this.seeded||(this.scale=i/Math.max(1,e),this.w=i,this.h=r,this.canvas.width=i,this.canvas.height=r,this.baseCanvas.width=i,this.baseCanvas.height=r,this.buildBaseFrostPattern(),this.ctx.clearRect(0,0,i,r),this.ctx.drawImage(this.baseCanvas,0,0),this.seeded=!0)}buildBaseFrostPattern(){const{baseCtx:e,w:t,h:n}=this;e.clearRect(0,0,t,n);const i=t*.5,r=n*.5,a=Math.hypot(i,r),o=e.createRadialGradient(i,r,a*.44,i,r,a);o.addColorStop(0,"rgba(220, 242, 255, 0)"),o.addColorStop(.58,"rgba(210, 236, 255, 0.08)"),o.addColorStop(.84,"rgba(225, 245, 255, 0.34)"),o.addColorStop(1,"rgba(242, 252, 255, 0.72)"),e.fillStyle=o,e.fillRect(0,0,t,n);const l=[[0,0],[t,0],[0,n],[t,n]];e.lineCap="round",l.forEach(([c,h],u)=>{for(let d=0;d<16;d++){const f=Math.atan2(r-h,i-c)+(d-7.5)/15*1.35+u*.13%.2,m=(.14+d*37%10*.018)*Math.min(t,n),x=c+Math.cos(f)*m,g=h+Math.sin(f)*m;e.strokeStyle="rgba(240, 250, 255, 0.36)",e.lineWidth=1.4,e.beginPath(),e.moveTo(c,h),e.lineTo(x,g),e.stroke();for(let p=.35;p<=.85;p+=.25){const y=c+(x-c)*p,_=h+(g-h)*p,v=m*.24*(1.15-p);for(const A of[-.65,.65])e.beginPath(),e.moveTo(y,_),e.lineTo(y+Math.cos(f+A)*v,_+Math.sin(f+A)*v),e.stroke()}}})}wipeAt(e,t,n=58){if(!this.seeded||!this.lastEnabled)return!1;const i=e*this.scale,r=t*this.scale,a=n*this.scale,o=this.ctx;o.save(),o.globalCompositeOperation="destination-out";const l=o.createRadialGradient(i,r,a*.2,i,r,a);l.addColorStop(0,"rgba(0, 0, 0, 0.92)"),l.addColorStop(.65,"rgba(0, 0, 0, 0.55)"),l.addColorStop(1,"rgba(0, 0, 0, 0)"),o.fillStyle=l,o.beginPath(),o.arc(i,r,a,0,Math.PI*2),o.fill(),o.restore();const c=e/Math.max(1,this.w/this.scale),h=t/Math.max(1,this.h/this.scale);return Math.hypot(c-.5,h-.5)>.28}update(e,t){if(this.lastEnabled=t.frostEnabled&&t.frostAmount>.02,this.canvas.style.opacity=this.lastEnabled?String(Math.min(.92,t.frostAmount*.92)):"0",!this.lastEnabled||!this.seeded)return;const n=Math.min(.08,e*(t.isSnowingReal?.075:.038));this.ctx.save(),this.ctx.globalCompositeOperation="source-over",this.ctx.globalAlpha=n,this.ctx.drawImage(this.baseCanvas,0,0),this.ctx.restore()}}let fo=null,po=null,mo=null,go=null;function ju(){if(go)return go;const s=256,e=32,t=document.createElement("canvas");t.width=s,t.height=e;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,s,0);i.addColorStop(0,"rgba(255, 224, 150, 0)"),i.addColorStop(.28,"rgba(255, 224, 150, 0.25)"),i.addColorStop(.5,"rgba(255, 248, 224, 0.92)"),i.addColorStop(.72,"rgba(255, 224, 150, 0.25)"),i.addColorStop(1,"rgba(255, 224, 150, 0)");const r=n.createLinearGradient(0,0,0,e);r.addColorStop(0,"rgba(255, 255, 255, 0)"),r.addColorStop(.5,"rgba(255, 255, 255, 1)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),n.fillStyle=i,n.fillRect(0,0,s,e),n.globalCompositeOperation="destination-in",n.fillStyle=r,n.fillRect(0,0,s,e);const a=new Ot(t);return a.colorSpace=dt,go=a,a}function Rn(){if(fo)return fo;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.22,"rgba(255, 248, 224, 0.85)"),n.addColorStop(.55,"rgba(255, 224, 155, 0.28)"),n.addColorStop(1,"rgba(255, 200, 120, 0)"),t.fillStyle=n,t.fillRect(0,0,s,s);const i=new Ot(e);return i.colorSpace=dt,fo=i,i}function jv(){if(po)return po;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=t.createRadialGradient(n,n,2,n,n,n);i.addColorStop(0,"rgba(255, 255, 255, 0.96)"),i.addColorStop(.36,"rgba(235, 246, 255, 0.66)"),i.addColorStop(.76,"rgba(210, 232, 255, 0.16)"),i.addColorStop(1,"rgba(210, 232, 255, 0)"),t.fillStyle=i,t.fillRect(0,0,s,s),t.save(),t.translate(n,n),t.strokeStyle="rgba(255, 255, 255, 0.72)",t.lineWidth=3,t.lineCap="round";for(let a=0;a<6;a++)t.rotate(Math.PI/3),t.beginPath(),t.moveTo(0,0),t.lineTo(0,-28),t.moveTo(0,-14),t.lineTo(7,-21),t.moveTo(0,-14),t.lineTo(-7,-21),t.stroke();t.restore();const r=new Ot(e);return r.colorSpace=dt,po=r,r}function Zu(){if(mo)return mo;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=t.createRadialGradient(n,n,1,n,n,n);i.addColorStop(0,"rgba(255, 252, 230, 1)"),i.addColorStop(.25,"rgba(255, 224, 130, 0.75)"),i.addColorStop(.6,"rgba(255, 190, 80, 0.2)"),i.addColorStop(1,"rgba(255, 180, 70, 0)"),t.fillStyle=i,t.fillRect(0,0,s,s),t.fillStyle="#fff9df",t.beginPath(),t.ellipse(n,n,n*.88,4.5,0,0,Math.PI*2),t.ellipse(n,n,4.5,n*.88,0,0,Math.PI*2),t.fill();const r=new Ot(e);return r.colorSpace=dt,mo=r,r}function Zv(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d");t.fillStyle="#808080",t.fillRect(0,0,256,256),i.fillStyle="#d4d4d4",i.fillRect(0,0,256,256);for(let o=0;o<65;o++){const l=Math.random()*256,c=Math.random()*256,h=18+Math.random()*44,u=t.createRadialGradient(l,c,2,l,c,h),d=Math.random()>.5?215:55;u.addColorStop(0,`rgba(${d},${d},${d},0.22)`),u.addColorStop(1,"rgba(128,128,128,0)"),t.fillStyle=u,t.beginPath(),t.arc(l,c,h,0,Math.PI*2),t.fill()}for(let o=0;o<520;o++){const l=Math.random()*256,c=Math.random()*256;i.fillStyle=Math.random()>.35?"#1c1c1c":"#555555",i.fillRect(l,c,2,2)}const r=new Ot(e);r.wrapS=r.wrapT=Qn,r.repeat.set(16,16);const a=new Ot(n);return a.wrapS=a.wrapT=Qn,a.repeat.set(22,22),{bumpMap:r,roughnessMap:a}}function Pn(s="#94b0d8"){const{bumpMap:e,roughnessMap:t}=Zv();return new ot({color:s,roughness:.82,metalness:.02,clearcoat:.14,clearcoatRoughness:.48,bumpMap:e,bumpScale:.16,roughnessMap:t,sheen:.2,sheenColor:new Ue("#9ec0ee"),sheenRoughness:.7})}function $v(s="#7c1a28"){const n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d");i.fillStyle=s,i.fillRect(0,0,256,256);const r=8,a=256/r;for(let l=0;l<r;l++){const c=l*a,h=i.createLinearGradient(0,c,0,c+a);h.addColorStop(0,"rgba(255, 220, 190, 0.14)"),h.addColorStop(.5,"rgba(0, 0, 0, 0)"),h.addColorStop(1,"rgba(20, 4, 8, 0.38)"),i.fillStyle=h,i.fillRect(0,c,256,a),i.strokeStyle="rgba(255, 235, 210, 0.07)",i.lineWidth=1.5,i.beginPath(),i.moveTo(0,c+a*.45),i.bezierCurveTo(256*.3,c+a*.3,256*.7,c+a*.65,256,c+a*.48),i.stroke()}i.fillStyle="#efe6d8",i.fillRect(0,0,14,256),i.fillRect(242,0,14,256);const o=new Ot(n);return o.colorSpace=dt,o}function Jv(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(128*.5,128*.62,6,128*.5,128*.5,128*.72);n.addColorStop(0,"#fff7cf"),n.addColorStop(.42,"#ffbe55"),n.addColorStop(.82,"#e87a24"),n.addColorStop(1,"#7c2b12"),t.fillStyle=n,t.fillRect(0,0,128,128),t.fillStyle="rgba(84, 30, 12, 0.32)",t.beginPath(),t.moveTo(128*.68,128*.34),t.lineTo(128*.52,128*.88),t.lineTo(128*.84,128*.88),t.closePath(),t.fill(),t.strokeStyle="#381512",t.lineWidth=9,t.strokeRect(4,4,120,120),t.lineWidth=6,t.beginPath(),t.moveTo(128*.5,0),t.lineTo(128*.5,128),t.moveTo(0,128*.5),t.lineTo(128,128*.5),t.stroke();const i=new Ot(e);return i.colorSpace=dt,i}function Qv(){const t=document.createElement("canvas");t.width=512,t.height=192;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,512,192);i.addColorStop(0,"#8d081e"),i.addColorStop(.5,"#d91234"),i.addColorStop(1,"#780618"),n.fillStyle=i,n.fillRect(0,0,512,192),n.strokeStyle="rgba(255, 255, 255, 0.92)",n.lineWidth=9,n.beginPath(),n.moveTo(-10,192*.76),n.bezierCurveTo(512*.25,192*.2,512*.68,192*1.05,522,192*.26),n.stroke(),n.strokeStyle="rgba(255, 224, 140, 0.85)",n.lineWidth=4,n.beginPath(),n.moveTo(-10,192*.84),n.bezierCurveTo(512*.28,192*.34,512*.65,192*1.1,522,192*.36),n.stroke();for(let a=0;a<24;a++){const o=a*53%512,l=a*37%160+16;n.fillStyle="rgba(255, 244, 200, 0.6)",n.beginPath(),n.arc(o,l,2.2+a%3,0,Math.PI*2),n.fill()}n.fillStyle="#fff9ee",n.shadowColor="rgba(255, 210, 115, 0.9)",n.shadowBlur=16,n.font='italic 700 46px Georgia, "Cinzel", serif',n.textAlign="center",n.textBaseline="middle",n.fillText("Coca-Cola",512*.5,192*.41),n.shadowBlur=8,n.fillStyle="#ffe29c",n.font="700 17px Inter, sans-serif",n.fillText("✦  HOLIDAY EXPRESS · JULKARAVAN  ✦",512*.5,192*.74);const r=new Ot(t);return r.colorSpace=dt,r}function $u(s,e,t,n){s.save(),s.translate(e,t),s.fillStyle="#e31937",s.beginPath(),s.moveTo(-n*.68,-n*.28),s.quadraticCurveTo(0,-n*.46,n*.68,-n*.28),s.lineTo(n*.56,-n*.16),s.quadraticCurveTo(0,-n*.31,-n*.56,-n*.16),s.closePath(),s.fill(),s.beginPath(),s.moveTo(-n*.52,-n*.08),s.quadraticCurveTo(0,-n*.21,n*.52,-n*.08),s.lineTo(n*.14,n*.04),s.lineTo(0,n*.68),s.lineTo(-n*.14,n*.04),s.closePath(),s.fill(),s.restore()}function e_(){const t=document.createElement("canvas");t.width=512,t.height=192;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,512,192);i.addColorStop(0,"#a80c24"),i.addColorStop(.5,"#dc1230"),i.addColorStop(1,"#84081a"),n.fillStyle=i,n.fillRect(0,0,512,192),n.fillStyle="rgba(244, 248, 255, 0.94)",n.fillRect(0,0,512,12),n.fillRect(0,180,512,12),n.strokeStyle="#ffd878",n.lineWidth=3,n.strokeRect(10,14,492,164);for(let h=0;h<22;h++){const u=(h*47+22)%512,d=(h*31+19)%144+24;n.fillStyle=h%2===0?"rgba(255, 246, 210, 0.72)":"rgba(255, 255, 255, 0.62)",n.beginPath(),n.arc(u,d,2+h%3,0,Math.PI*2),n.fill()}const r=38,a=38,o=114,l=102;n.fillStyle="#ffffff",n.beginPath(),n.roundRect(r,a,o,l,20),n.fill(),n.strokeStyle="#ffd166",n.lineWidth=3,n.stroke(),$u(n,r+o*.5,a+l*.52,46),n.fillStyle="#fff9eb",n.shadowColor="rgba(255, 218, 125, 0.75)",n.shadowBlur=14,n.font='700 42px "Cinzel", Georgia, serif',n.textAlign="center",n.textBaseline="middle",n.fillText("T E S L A",512*.64,192*.41),n.shadowBlur=6,n.fillStyle="#ffe099",n.font="600 16px Inter, sans-serif",n.fillText("✦  ELECTRIC HOLIDAY EXPRESS · GOD JUL  ✦",512*.64,192*.72);const c=new Ot(t);return c.colorSpace=dt,c}function t_(s){const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s==="tesla"?"#dc1230":"#c40d28"),i.addColorStop(1,"#7a0616"),n.fillStyle=i,n.fillRect(0,0,256,256),n.strokeStyle="#ffe08a",n.lineWidth=8,n.strokeRect(10,10,236,236),s==="tesla"?(n.fillStyle="#ffffff",n.beginPath(),n.roundRect(58,36,140,104,20),n.fill(),$u(n,128,90,48),n.fillStyle="#fff6de",n.font='700 26px "Cinzel", Georgia, serif',n.textAlign="center",n.textBaseline="middle",n.fillText("TESLA · GOD JUL!",128,186)):(n.fillStyle="#fff8ee",n.font="italic 700 44px Georgia, serif",n.textAlign="center",n.textBaseline="middle",n.fillText("Coca-Cola",128,92),n.fillStyle="#ffe29c",n.font='700 26px "Cinzel", Georgia, serif',n.fillText("GOD JUL!",128,172));const r=new Ot(t);return r.colorSpace=dt,r}function n_(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(256*.38,256*.38,12,256*.5,256*.5,256*.55);n.addColorStop(0,"#fffdf2"),n.addColorStop(.65,"#fae9c4"),n.addColorStop(1,"#dfc08b"),t.fillStyle=n,t.fillRect(0,0,256,256);const i=[[.3,.35,.14],[.62,.28,.1],[.54,.62,.16],[.26,.68,.08],[.74,.54,.09],[.44,.22,.07]];for(const[a,o,l]of i){const c=t.createRadialGradient(a*256,o*256,2,a*256,o*256,l*256);c.addColorStop(0,"rgba(170, 140, 96, 0.28)"),c.addColorStop(.75,"rgba(182, 152, 108, 0.14)"),c.addColorStop(1,"rgba(255, 240, 200, 0)"),t.fillStyle=c,t.beginPath(),t.arc(a*256,o*256,l*256,0,Math.PI*2),t.fill()}const r=new Ot(e);return r.colorSpace=dt,r}function Ta(s="#ffdf9e",e=.28){return new Ht({uniforms:{uColor:{value:new Ue(s)},uOpacity:{value:e}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main() {
        vUv = uv;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPos.xyz;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPos;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main() {
        vec3 viewDir = normalize(vViewPos);
        float edge = pow(abs(dot(vNormalView, viewDir)), 1.65);
        float verticalFade = smoothstep(0.0, 0.72, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
        float alpha = edge * verticalFade * uOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,transparent:!0,depthWrite:!1,blending:Rt,side:Jt})}const i_=`
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,s_=`
  varying vec3 vWorldDir;
  uniform float uTime;
  uniform float uAuroraBoost;
  uniform float uThemeMode;
  uniform float uDaylight;
  uniform vec3 uTopColor;
  uniform vec3 uMidColor;
  uniform vec3 uHorizonColor;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 dir = normalize(vWorldDir);
    float y = clamp(dir.y, -0.2, 1.0);
    float h = clamp(y, 0.0, 1.0);

    vec3 col = mix(uHorizonColor, uMidColor, smoothstep(0.0, 0.32, h));
    col = mix(col, uTopColor, smoothstep(0.28, 0.92, h));

    float nightVis = 1.0 - clamp(uDaylight * 1.15, 0.0, 0.92);
    float horizonGlow = exp(-abs(y - 0.03) * 10.5);
    vec3 glowTint = uThemeMode > 1.5
      ? vec3(0.75, 0.14, 0.56)
      : (uThemeMode > 0.5 ? vec3(0.22, 0.42, 0.58) : mix(vec3(0.48, 0.21, 0.14), vec3(0.95, 0.72, 0.48), uDaylight));
    col += glowTint * horizonGlow * 0.58;

    // Soft Milky Way diagonal stardust band across upper zenith in winter night
    if (y > 0.06 && nightVis > 0.08) {
      float mwCoord = dir.x * 0.78 + dir.y * 0.62 - 0.32;
      float mwBand = exp(-mwCoord * mwCoord * 18.0);
      float mwCloud = 0.55 + 0.45 * sin(dir.z * 9.0 + dir.x * 7.0) * cos(dir.y * 11.0);
      col += vec3(0.22, 0.32, 0.58) * mwBand * mwCloud * smoothstep(0.06, 0.28, y) * 0.32 * nightVis;
    }

    float az = atan(dir.z, dir.x);
    float w1 = sin(az * 3.0 + uTime * 0.26) * 0.08 + cos(az * 5.0 - uTime * 0.18) * 0.04;
    float w2 = cos(az * 4.0 - uTime * 0.32 + 1.4) * 0.07 + sin(az * 7.0 + uTime * 0.22) * 0.03;

    float band1 = exp(-pow((y - (0.31 + w1)) * 7.8, 2.0));
    float band2 = exp(-pow((y - (0.43 + w2)) * 9.0, 2.0));
    float rays1 = 0.58 + 0.42 * sin(az * 24.0 + uTime * 0.85 + y * 8.0);
    float rays2 = 0.55 + 0.45 * cos(az * 18.0 - uTime * 0.65);

    vec3 emerald = uThemeMode > 1.5
      ? vec3(0.12, 0.95, 1.0)
      : vec3(0.14, 0.96, 0.72);
    vec3 goldTint = uThemeMode > 1.5
      ? vec3(1.0, 0.24, 0.78)
      : vec3(1.0, 0.8, 0.42);
    vec3 violetTint = uThemeMode > 1.5
      ? vec3(0.72, 0.32, 1.0)
      : vec3(0.55, 0.42, 0.98);

    col += mix(emerald, goldTint, 0.28 + 0.22 * sin(az * 2.0 + uTime * 0.3)) * band1 * rays1 * (0.48 * uAuroraBoost * nightVis);
    col += mix(vec3(0.22, 0.82, 1.0), violetTint, 0.4) * band2 * rays2 * (0.34 * uAuroraBoost * nightVis);

    if (y > 0.04 && nightVis > 0.08) {
      vec2 starGrid = vec2(az * 38.0, y * 74.0);
      vec2 cell = floor(starGrid);
      vec2 f = fract(starGrid) - 0.5;
      float rnd = hash21(cell);
      if (rnd > 0.925) {
        float d = length(f);
        float star = smoothstep(0.24, 0.0, d);
        float tw = 0.55 + 0.45 * sin(uTime * (1.8 + rnd * 4.5) + rnd * 62.0);
        vec3 sCol = rnd > 0.97 ? vec3(1.25, 1.08, 0.82) : vec3(0.95, 1.05, 1.25);
        col += sCol * star * tw * smoothstep(0.04, 0.22, y) * 1.15 * nightVis;
      }
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;function Ry(s=300){const e=new Ve(s,36,24),t=new Ht({vertexShader:i_,fragmentShader:s_,uniforms:{uTime:{value:0},uAuroraBoost:{value:1},uThemeMode:{value:0},uDaylight:{value:0},uTopColor:{value:new Ue("#040a1e")},uMidColor:{value:new Ue("#0c1e4a")},uHorizonColor:{value:new Ue("#1d3364")}},side:Yt,depthWrite:!1});return{mesh:new R(e,t),material:t}}function Py(s=10){const e=new Oe,t=n_(),n=new Ht({uniforms:{uMap:{value:t},uSunDir:{value:new E(.25,.15,.96).normalize()}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormalView;
      void main() {
        vUv = uv;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uMap;
      uniform vec3 uSunDir;
      varying vec2 vUv;
      varying vec3 vNormalView;
      void main() {
        vec3 texCol = texture2D(uMap, vUv).rgb * vec3(1.0, 0.97, 0.91);
        float ndotl = dot(normalize(vNormalView), normalize(uSunDir));
        float lit = smoothstep(-0.18, 0.24, ndotl);
        vec3 shadowCol = texCol * vec3(0.18, 0.24, 0.42);
        vec3 finalCol = mix(shadowCol, texCol, max(0.08, lit));
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `,fog:!1}),i=new R(new Ve(s,28,28),n);e.add(i);const r=new Wt({map:Rn(),color:"#ffdf9a",transparent:!0,opacity:.72,blending:Rt,depthWrite:!1,fog:!1}),a=new Kt(r);a.scale.set(s*5.8,s*5.8,1),e.add(a);const o=new Wt({map:ju(),color:"#ffe8b8",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1,fog:!1}),l=new Kt(o);l.scale.set(s*12.5,s*1.2,1),e.add(l);let c=1;return e.userData.setMoonPhase=h=>{const u=(.5-h)*Math.PI*2;n.uniforms.uSunDir.value.set(Math.sin(u),.12,Math.cos(u)).normalize(),c=.5-.5*Math.cos(h*Math.PI*2),r.opacity=.28+c*.48},e.userData.setDaylight=h=>{const u=1-Math.min(.8,h*.8);r.opacity=(.28+c*.48)*u,o.opacity=(.14+c*.26)*u},e}function Ly(s,e){const t=new Oe,n=Math.floor(s*.72),i=Math.max(20,s-n),r=(h,u,d)=>{const f=new Float32Array(h*3),m=new Float32Array(h);for(let y=0;y<h;y++)f[y*3]=e.minX+Math.random()*(e.maxX-e.minX),f[y*3+1]=e.minY+Math.random()*(e.maxY-e.minY),f[y*3+2]=e.minZ+Math.random()*(e.maxZ-e.minZ),m[y]=Math.random()*Math.PI*2;const x=new _t;x.setAttribute("position",new Ft(f,3));const g=new Sa({map:jv(),color:"#f2f8ff",size:u,transparent:!0,opacity:d,depthWrite:!1,blending:Rt}),p=new Kl(x,g);return t.add(p),{pts:p,pos:f,seeds:m,count:h}},a=r(n,.52,.85),o=r(i,1.35,.45);let l=0;const c=(h,u,d,f,m,x)=>{const{pos:g,seeds:p,count:y}=h;for(let _=0;_<y;_++){const v=_*3,A=Math.sin(l*1.4+p[_])*.65;g[v]+=(d*x+A)*u,g[v+1]-=m*x*u,g[v+2]+=f*x*u,g[v+1]<e.minY&&(g[v+1]=e.maxY),g[v+1]>e.maxY&&(g[v+1]=e.minY),g[v]<e.minX&&(g[v]+=e.maxX-e.minX),g[v]>e.maxX&&(g[v]-=e.maxX-e.minX),g[v+2]<e.minZ&&(g[v+2]+=e.maxZ-e.minZ),g[v+2]>e.maxZ&&(g[v+2]-=e.maxZ-e.minZ)}h.pts.geometry.attributes.position.needsUpdate=!0};return{group:t,update(h,u,d,f){l+=h,c(a,h,u,d,f,1),c(o,h,u,d,f,1.38)}}}function r_(s,e,t,n,i,r){s.clearRect(0,0,e,t),s.fillStyle="rgba(10, 18, 42, 0.86)",s.beginPath(),s.roundRect(4,4,e-8,t-8,16),s.fill(),s.strokeStyle=r,s.lineWidth=3,s.stroke(),s.fillStyle="#fff9eb",s.font="700 24px Inter, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(n.slice(0,26),e*.5,t*.36,e-24),s.fillStyle=r,s.font="600 18px Inter, sans-serif",s.fillText(i.slice(0,32),e*.5,t*.7,e-24)}class Iy{constructor(){B(this,"group",new Oe);B(this,"issGroup");B(this,"issTagTex");B(this,"issTagCtx");B(this,"issLastTag","");B(this,"adventGroup",new Oe);B(this,"candles",[]);B(this,"luciaGroup",new Oe);B(this,"luciaZ",-58);B(this,"spaceXGantry",new Oe);B(this,"spaceXGantryZ",-118);B(this,"spaceXTex");B(this,"spaceXCtx");B(this,"spaceXLastText","");B(this,"spaceXMiniRocket");B(this,"fireworkBursts",[]);B(this,"fireworksGroup",new Oe);B(this,"meteors",[]);const e=Rn(),t=Zu();this.issGroup=new Oe;const n=new Ee({color:"#e5a93c",metalness:.72,roughness:.28,emissive:"#4d3206",emissiveIntensity:.6,fog:!1}),i=new Ee({color:"#dce6f5",metalness:.75,roughness:.3,fog:!1}),r=new R(new Se(6.8,.22,.22),i),a=new R(new $e(.42,.42,2.4,10),i);a.rotation.x=Math.PI*.5,this.issGroup.add(r,a);for(const F of[-2.5,-1.65,1.65,2.5])for(const O of[-1,1]){const Y=new R(new Se(.65,.05,2.2),n);Y.position.set(F,0,O*1.45),this.issGroup.add(Y)}const o=new ke({color:"#e61938",toneMapped:!1,fog:!1}),l=new ke({color:"#ffffff",toneMapped:!1,fog:!1}),c=new R(new mt(.42,.95,10),o);c.position.set(0,.9,0),c.rotation.z=-.2;const h=new R(new Vt(.4,.1,6,12),l);h.rotation.x=Math.PI*.5,h.position.set(0,.48,0),this.issGroup.add(c,h);const u=document.createElement("canvas");u.width=384,u.height=96,this.issTagCtx=u.getContext("2d"),this.issTagTex=new Ot(u),this.issTagTex.colorSpace=dt;const d=new Kt(new Wt({map:this.issTagTex,transparent:!0,fog:!1,depthWrite:!1}));d.scale.set(12.5,3.1,1),d.position.set(0,2.9,0),this.issGroup.add(d),this.issGroup.visible=!1,this.group.add(this.issGroup);const f=new Ee({color:"#fff5df",roughness:.45,emissive:"#381e06",emissiveIntensity:.35,fog:!1}),m=new Ee({color:"#8f1224",roughness:.5,fog:!1}),x=new ke({color:"#ffcf5c",toneMapped:!1,fog:!1}),g=[-48,-19,19,48];for(let F=0;F<4;F++){const O=new Oe;O.position.set(g[F],14,-160);const Y=new R(new $e(1.1,1.25,14,12),f);Y.position.y=7;const V=new R(new $e(1.28,1.28,2.2,12),m);V.position.y=1.6;const J=new R(new mt(.85,3.4,10),x);J.position.y=16;const G=new Kt(new Wt({map:e,color:"#ffd26a",transparent:!0,opacity:.9,blending:Rt,depthWrite:!1,fog:!1}));G.scale.set(16,16,1),G.position.y=16,O.add(Y,V,J,G),this.adventGroup.add(O),this.candles.push({root:O,flame:J,halo:G})}this.adventGroup.visible=!1,this.group.add(this.adventGroup);const p=new Ee({color:"#f7faff",roughness:.65}),y=new Ee({color:"#cf1530",roughness:.5}),_=new ke({color:"#ffd866",toneMapped:!1}),v=new Ee({color:"#ffd9be",roughness:.65});for(let F=0;F<5;F++){const O=new Oe;O.position.set(F%2===0?-.4:.4,0,F*1.9);const Y=new R(new mt(.42,1.55,10),p);Y.position.y=.78;const V=new R(new Ve(.22,10,10),v);if(V.position.y=1.72,O.add(Y,V),F===0){const G=new R(new $e(.27,.29,.18,10),y);G.position.y=.98;const N=new R(new Vt(.22,.04,6,12),_);N.rotation.x=Math.PI*.5,N.position.y=1.92,O.add(G,N);for(let W=0;W<5;W++){const j=W/5*Math.PI*2,ce=new R(new Ve(.055,6,6),x);ce.position.set(Math.cos(j)*.21,2.04,Math.sin(j)*.21),O.add(ce)}}else{const G=new R(new $e(.03,.03,.36,6),l);G.position.set(.26,1.25,-.24);const N=new R(new Ve(.075,6,6),x);N.position.set(.26,1.46,-.24),O.add(G,N)}const J=new Kt(new Wt({map:e,color:"#ffdb8a",transparent:!0,opacity:.45,blending:Rt,depthWrite:!1}));J.scale.set(2.4,2.4,1),J.position.y=1.7,O.add(J),this.luciaGroup.add(O)}this.luciaGroup.visible=!1,this.group.add(this.luciaGroup);const A=["#ffd966","#ff4769","#56f5b8"];for(let F=0;F<3;F++){const Y=new Float32Array(126),V=new Float32Array(126),J=new _t;J.setAttribute("position",new Ft(Y,3));const G=new Kl(J,new Sa({map:t,color:A[F],size:2.6,transparent:!0,opacity:.95,blending:Rt,depthWrite:!1,fog:!1}));G.frustumCulled=!1,this.fireworksGroup.add(G);const N={points:G,pos:Y,vel:V,age:-F*.85,maxAge:2.2,cx:(F-1)*32,cy:30+F%2*8,cz:-135};this.resetFirework(N),this.fireworkBursts.push(N)}this.fireworksGroup.visible=!1,this.group.add(this.fireworksGroup);const S=new ke({color:"#ffe9a8",transparent:!0,opacity:.9,toneMapped:!1,fog:!1});for(let F=0;F<2;F++){const O=new Oe,Y=new Kt(new Wt({map:t,color:"#fff6cf",transparent:!0,opacity:.96,blending:Rt,depthWrite:!1,fog:!1}));Y.scale.set(5.2,5.2,1);const V=new R(new Se(16,.25,.25),S);V.position.set(-7.5,2.2,0),V.rotation.z=-.32;const J=new Kt(new Wt({map:e,color:"#ffe066",transparent:!0,opacity:0,blending:Rt,depthWrite:!1,fog:!1}));J.scale.set(16,16,1),O.add(Y,V,J),O.visible=!1,this.group.add(O),this.meteors.push({group:O,wishRing:J,age:0,cooldown:3.5+F*5.2,startX:-55+F*30,startY:48,endX:25+F*25,endY:22,wishBurstAge:-1})}const C=new Ee({color:"#1b2234",metalness:.7,roughness:.35});for(const F of[-2.4,2.4]){const O=new R(new $e(.14,.16,6.2,8),C);O.position.set(F,3.1,0),this.spaceXGantry.add(O)}const L=document.createElement("canvas");L.width=512,L.height=160,this.spaceXCtx=L.getContext("2d"),this.spaceXTex=new Ot(L),this.spaceXTex.colorSpace=dt;const b=new R(new tn(5.6,1.75),new ke({map:this.spaceXTex,toneMapped:!1,side:Jt}));b.position.set(0,5.1,0),this.spaceXGantry.add(b),this.spaceXMiniRocket=new Oe;const M=new R(new $e(.32,.36,3.6,12),i);M.position.y=1.8;const I=new R(new mt(.32,.9,12),i);I.position.y=4.05;const H=new R(new mt(.45,1.2,10),new ke({color:"#ffb84d",toneMapped:!1}));H.rotation.x=Math.PI,H.position.y=-.4,this.spaceXMiniRocket.add(M,I,H),this.spaceXMiniRocket.position.set(3.2,.2,.4),this.spaceXGantry.add(this.spaceXMiniRocket),this.spaceXGantry.rotation.y=-.35,this.spaceXGantry.name="SpaceX roadside countdown",this.group.add(this.spaceXGantry)}resetFirework(e){e.cx=-42+Math.random()*84,e.cy=24+Math.random()*14,e.cz=-132-Math.random()*20;const t=e.pos.length/3;for(let n=0;n<t;n++){e.pos[n*3]=e.cx,e.pos[n*3+1]=e.cy,e.pos[n*3+2]=e.cz;const i=Math.random()*Math.PI*2,r=(Math.random()-.5)*Math.PI,a=6+Math.random()*10;e.vel[n*3]=Math.cos(i)*Math.cos(r)*a,e.vel[n*3+1]=Math.sin(r)*a+3,e.vel[n*3+2]=Math.sin(i)*Math.cos(r)*a*.4}}update(e,t,n,i,r,a,o,l=!0){if(this.issGroup.visible=r.issNearby,this.issGroup.visible){const u=t*.045%1*150-75,d=48+Math.sin((u+75)/150*Math.PI)*10;this.issGroup.position.set(u,d,-138),this.issGroup.rotation.y=.25+Math.sin(t*.4)*.1;const f=`🛰 ISS · ${r.issDistanceKm.toLocaleString()} km`,m=`${r.issVelocityKmh.toLocaleString()} km/h`,x=`${f}|${m}`;this.issLastTag!==x&&(this.issLastTag=x,r_(this.issTagCtx,384,96,f,m,"#ffd878"),this.issTagTex.needsUpdate=!0)}const c=i.holidayCalendar.adventCandles;if(this.adventGroup.visible=c>0,this.adventGroup.visible){this.adventGroup.position.x=-o*16;for(let u=0;u<4;u++){const d=this.candles[u],f=u<c;if(d.flame.visible=f,d.halo.visible=f,f){const m=.92+Math.sin(t*9+u*1.7)*.14;d.flame.scale.set(1,m,1),d.halo.scale.set(14*m,14*m,1)}}}if(this.luciaGroup.visible=l&&i.holidayCalendar.isLucia,this.luciaGroup.visible){this.luciaZ+=n*.55,this.luciaZ>16&&(this.luciaZ=-138);const u=a(this.luciaZ),d=a(this.luciaZ-5),f=Math.atan2(u-d,5);this.luciaGroup.position.set(u-8.6,.05,this.luciaZ),this.luciaGroup.rotation.y=f,this.luciaGroup.children.forEach((m,x)=>{m.position.y=Math.abs(Math.sin(t*4.5+x*.9))*.08})}if(this.fireworksGroup.visible=i.holidayCalendar.isXmasEve,this.fireworksGroup.visible)for(const u of this.fireworkBursts)if(u.age+=e,u.age>u.maxAge&&(u.age=0,this.resetFirework(u)),u.age>=0){u.points.visible=!0;const d=u.pos.length/3;for(let f=0;f<d;f++)u.pos[f*3]+=u.vel[f*3]*e,u.pos[f*3+1]+=u.vel[f*3+1]*e,u.pos[f*3+2]+=u.vel[f*3+2]*e,u.vel[f*3+1]-=4.2*e;u.points.geometry.attributes.position.needsUpdate=!0,u.points.material.opacity=Math.max(0,1-u.age/u.maxAge)}else u.points.visible=!1;if(this.spaceXGantry.visible=l,l){this.spaceXGantryZ+=n,this.spaceXGantryZ>22&&(this.spaceXGantryZ-=165);const u=a(this.spaceXGantryZ),d=a(this.spaceXGantryZ-5);this.spaceXGantry.position.set(u+13.5,0,this.spaceXGantryZ),this.spaceXGantry.rotation.y=Math.atan2(u-d,5)-.35,this.spaceXMiniRocket.visible=r.nextSpaceXLaunchToday,this.spaceXMiniRocket.visible&&(this.spaceXMiniRocket.position.y=.25+Math.abs(Math.sin(t*2))*.35);const f=`${r.nextSpaceXCountdown}|${r.nextSpaceXName}`;if(this.spaceXLastText!==f){this.spaceXLastText=f;const m=this.spaceXCtx;m.clearRect(0,0,512,160);const x=m.createLinearGradient(0,0,512,160);x.addColorStop(0,"#0d193a"),x.addColorStop(1,"#290f32"),m.fillStyle=x,m.beginPath(),m.roundRect(6,6,500,148,18),m.fill(),m.strokeStyle="#70e2ff",m.lineWidth=5,m.stroke(),m.fillStyle="#70e2ff",m.font="700 22px Inter, sans-serif",m.textAlign="center",m.textBaseline="middle",m.fillText(`🚀 SPACEX · ${r.nextSpaceXCountdown}`,256,52,470),m.fillStyle="#fff8ea",m.font='600 24px "Cinzel", Georgia, serif',m.fillText(r.nextSpaceXName.slice(0,28),256,108,470),this.spaceXTex.needsUpdate=!0}}const h=i.daylightFactor<.65;for(const u of this.meteors){if(u.wishBurstAge>=0){u.wishBurstAge+=e,u.group.visible=!0;const d=16+u.wishBurstAge*44;u.wishRing.scale.set(d,d,1),u.wishRing.material.opacity=Math.max(0,1-u.wishBurstAge/.85),u.wishBurstAge>.85&&(u.wishBurstAge=-1,u.group.visible=!1,u.cooldown=7.5+Math.random()*4.5);continue}if(!h){u.group.visible=!1;continue}if(u.cooldown>0){if(u.cooldown-=e,u.group.visible=!1,u.cooldown<=0){u.age=0;const d=Math.random()>.5?1:-1;u.startX=-d*(38+Math.random()*26),u.startY=44+Math.random()*14,u.endX=d*(28+Math.random()*28),u.endY=20+Math.random()*10}}else{u.age+=e;const d=2.4;if(u.age>=d)u.cooldown=7+Math.random()*5,u.group.visible=!1;else{const f=u.age/d;u.group.visible=!0,u.wishRing.material.opacity=0,u.group.position.set(An.lerp(u.startX,u.endX,f),An.lerp(u.startY,u.endY,f),-136),u.group.scale.y=u.endX>u.startX?1:-1}}}}tryCatchShootingStar(){const e=this.meteors.find(t=>t.cooldown<=0&&t.wishBurstAge<0&&t.group.visible);return e?(e.wishBurstAge=0,!0):!1}dispose(){this.issTagTex.dispose(),this.spaceXTex.dispose();for(const e of this.fireworkBursts)e.points.geometry.dispose(),e.points.material.dispose();this.group.traverse(e=>{var t,n;if(e.isMesh){const i=e;(t=i.geometry)==null||t.dispose(),Array.isArray(i.material)?i.material.forEach(r=>r.dispose()):(n=i.material)==null||n.dispose()}})}}function Dy(s,e){const t=[],n=[],i=[];for(const a of s){const o=a.points.filter((d,f,m)=>!f||d.x!==m[f-1].x||d.z!==m[f-1].z);if(o.length<2)continue;const l=e?o.flatMap((d,f)=>{if(!f)return[d];const m=o[f-1],x=Math.ceil(Math.hypot(d.x-m.x,d.z-m.z)/2.5);return Array.from({length:x},(g,p)=>{const y=(p+1)/x;return{x:An.lerp(m.x,d.x,y),z:An.lerp(m.z,d.z,y)}})}):o;let c=0;const h=e?4:1,u=h+1;for(let d=0;d<l.length;d++){const f=l[d],m=l[Math.max(0,d-1)],x=l[Math.min(l.length-1,d+1)],g=Math.hypot(x.x-m.x,x.z-m.z)||1,p=(x.z-m.z)*a.widthM/(2*g),y=(m.x-x.x)*a.widthM/(2*g);d&&(c+=Math.hypot(f.x-m.x,f.z-m.z));const _=t.length/3;for(let v=0;v<=h;v++){const A=1-2*v/h,S=f.x+p*A,C=f.z+y*A;if(i.push(v/h,c),t.push(S,((e==null?void 0:e(S,C))??0)+.047,C),d&&v>0){const L=_+v;n.push(L-u-1,L-u,L-1,L-1,L-u,L)}}}}const r=new _t;return r.setAttribute("position",new je(t,3)),r.setIndex(n),r.setAttribute("uv",new je(i,2)),r.computeVertexNormals(),r}function Ny(s,e){const t=Tl(s.originLat,s.originLon,e.latitude,e.longitude),n=e.headingDeg*Math.PI/180;let i=1/0,r;for(const a of s.roads)for(let o=1;o<a.points.length;o++){const l=a.points[o-1],c=a.points[o],h=c.x-l.x,u=c.z-l.z,d=Math.hypot(h,u);if(!d)continue;const f=An.clamp(((t.x-l.x)*h+(t.z-l.z)*u)/(d*d),0,1),m=Math.hypot(l.x+f*h-t.x,l.z+f*u-t.z);if(m>a.widthM/2+12)continue;const x=Math.abs((h*Math.sin(n)-u*Math.cos(n))/d),g=m+(1-x)*5;g<i&&(i=g,r=a)}return r}function Uy(s,e,t,n){let i=1/0,r=0,a=1,o=0;const l=s.points.slice(1).flatMap((p,y)=>{const _=s.points[y],v=p.x-_.x,A=p.z-_.z,S=Math.hypot(v,A);if(!S)return[];const C=An.clamp(((e.x-_.x)*v+(e.z-_.z)*A)/(S*S),0,1),L=Math.hypot(e.x-_.x-C*v,e.z-_.z-C*A);return L<i&&(i=L,r=o+C*S,a=v*Math.sin(t)-A*Math.cos(t)>=0?1:-1),o+=S,[{a:_,dx:v,dz:A,meters:S,end:o}]}),c=r+n*a;if(c<0||c>o)return;const h=l.find(p=>p.end>=c);if(!h)return;const{a:u,dx:d,dz:f,meters:m,end:x}=h,g=1-(x-c)/m;return{x:u.x+g*d,z:u.z+g*f,heading:Math.atan2(a*d,-a*f)}}function Fy(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new _t;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ih(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][d]);const m=Ih(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Ih(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const a=new e(r),o=new Ft(a,t,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){const x=h.getComponent(d,m);o.setComponent(d+u,m,x)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function Dh(s,e){if(e===Ld)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ml||e===uu){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ml)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class a_ extends Cs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new u_(t)}),this.register(function(t){return new d_(t)}),this.register(function(t){return new M_(t)}),this.register(function(t){return new S_(t)}),this.register(function(t){return new b_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new m_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new x_(t)}),this.register(function(t){return new h_(t)}),this.register(function(t){return new v_(t)}),this.register(function(t){return new f_(t)}),this.register(function(t){return new y_(t)}),this.register(function(t){return new __(t)}),this.register(function(t){return new l_(t)}),this.register(function(t){return new w_(t)}),this.register(function(t){return new T_(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=tr.extractUrlBase(e);a=tr.resolveURL(c,this.path)}else a=tr.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Yu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ju){try{a[lt.KHR_BINARY_GLTF]=new E_(e)}catch(u){i&&i(u);return}r=JSON.parse(a[lt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new k_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case lt.KHR_MATERIALS_UNLIT:a[u]=new c_;break;case lt.KHR_DRACO_MESH_COMPRESSION:a[u]=new A_(r,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:a[u]=new C_;break;case lt.KHR_MESH_QUANTIZATION:a[u]=new R_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function o_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class l_{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ue(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],en);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new wl(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new pa(h),c.distance=u;break;case"spot":c=new vv(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,qn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class c_{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return ke}extendParams(e,t,n){const i=[];e.color=new Ue(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],en),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,dt))}return Promise.all(i)}}class h_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class u_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(o,o)}return Promise.all(r)}}class d_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class f_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class p_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],en)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,dt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class m_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class g_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(o[0],o[1],o[2],en),Promise.all(r)}}class x_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class v_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(o[0],o[1],o[2],en),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,dt)),Promise.all(r)}}class __{constructor(e){this.parser=e,this.name=lt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class y_{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ot}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class M_{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class S_{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class b_{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class w_{constructor(e){this.name=lt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class T_{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==un.TRIANGLES&&c.mode!==un.TRIANGLE_STRIP&&c.mode!==un.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const m of u){const x=new et,g=new E,p=new yi,y=new E(1,1,1),_=new Mx(m.geometry,m.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),_.setMatrixAt(v,x.compose(g,p,y));for(const v in l)if(v==="_COLOR_0"){const A=l[v];_.instanceColor=new _l(A.array,A.itemSize,A.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,l[v]);At.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ju="glTF",Vs=12,Nh={JSON:1313821514,BIN:5130562};class E_{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Vs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ju)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Vs,r=new DataView(e,Vs);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Nh.JSON){const c=new Uint8Array(e,Vs+a,o);this.content=n.decode(c)}else if(l===Nh.BIN){const c=Vs+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class A_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=El[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=El[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=ds[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const x=f.attributes[m],g=l[m];g!==void 0&&(x.normalized=g)}u(f)},o,c,en,d)})})}}class C_{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class R_{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}}class Qu extends fr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*c,x=m-c,g=-2*f+3*d,p=f-d,y=1-g,_=p-d+u;for(let v=0;v!==o;v++){const A=a[x+v+o],S=a[x+v+l]*h,C=a[m+v+o],L=a[m+v]*h;r[v]=y*A+_*S+g*C+p*L}return r}}const P_=new yi;class L_ extends Qu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return P_.fromArray(r).normalize().toArray(r),r}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ds={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Uh={9728:Qt,9729:ln,9984:tu,9985:ta,9986:qs,9987:Kn},Fh={33071:mi,33648:la,10497:Qn},xo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},El={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},I_={CUBICSPLINE:void 0,LINEAR:sr,STEP:ir},vo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function D_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ee({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Jn})),s.DefaultMaterial}function Ri(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function N_(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function U_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function F_(s){let e;const t=s.extensions&&s.extensions[lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_o(t.attributes):e=s.indices+":"+_o(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+_o(s.targets[n]);return e}function _o(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Al(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function O_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const B_=new et;class k_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new o_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new mv(this.options.manager):this.textureLoader=new Mv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ri(r,o,i),qn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(tr.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=xo[i.type],o=ds[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Ft(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=xo[i.type],c=ds[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let x,g;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let _=t.cache.get(y);_||(x=new c(o,p*f,i.count*f/h),_=new Lu(x,f/h),t.cache.add(y,_)),g=new or(_,l,d%f/h,m)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),g=new Ft(x,l,m);if(i.sparse!==void 0){const p=xo.SCALAR,y=ds[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,A=new y(a[1],_,i.sparse.count*p),S=new c(a[2],v,i.sparse.count*l);o!==null&&(g=new Ft(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,L=A.length;C<L;C++){const b=A[C];if(g.setX(b,S[C*l]),l>=2&&g.setY(b,S[C*l+1]),l>=3&&g.setZ(b,S[C*l+2]),l>=4&&g.setW(b,S[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Uh[d.magFilter]||ln,h.minFilter=Uh[d.minFilter]||Kn,h.wrapS=Fh[d.wrapS]||Qn,h.wrapT=Fh[d.wrapT]||Qn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Qt&&h.minFilter!==ln,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(x){const g=new Bt(x);g.needsUpdate=!0,d(g)}),t.load(tr.resolveURL(u,r.path),m,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),qn(u,a),u.userData.mimeType=a.mimeType||O_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[lt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Sa,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Uu,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ee}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[lt.KHR_MATERIALS_UNLIT]){const u=i[lt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ue(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],en),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,dt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Jt);const h=r.alphaMode||vo.OPAQUE;if(h===vo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===vo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ke&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==ke&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ke){const u=r.emissiveFactor;o.emissive=new Ue().setRGB(u[0],u[1],u[2],en)}return r.emissiveTexture!==void 0&&a!==ke&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,dt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),qn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ri(i,u,r),u})}createUniqueName(e){const t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Oh(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=F_(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Oh(new _t,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?D_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const x=h[f],g=a[f];let p;const y=c[f];if(g.mode===un.TRIANGLES||g.mode===un.TRIANGLE_STRIP||g.mode===un.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new vx(x,y):new R(x,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===un.TRIANGLE_STRIP?p.geometry=Dh(p.geometry,uu):g.mode===un.TRIANGLE_FAN&&(p.geometry=Dh(p.geometry,ml));else if(g.mode===un.LINES)p=new Sx(x,y);else if(g.mode===un.LINE_STRIP)p=new ql(x,y);else if(g.mode===un.LINE_LOOP)p=new bx(x,y);else if(g.mode===un.POINTS)p=new Kl(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&U_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),qn(p,r),g.extensions&&Ri(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ri(i,u[0],r),u[0];const d=new Oe;r.extensions&&Ri(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new $t(An.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ya(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new et;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Xl(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],x=f.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,y=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(m),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],x=u[3],g=u[4],p=[];for(let y=0,_=d.length;y<_;y++){const v=d[y],A=f[y],S=m[y],C=x[y],L=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const b=n._createAnimationTracks(v,A,S,C,L);if(b)for(let M=0;M<b.length;M++)p.push(b[M])}return new lv(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,B_)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Du:c.length>1?h=new Oe:c.length===1?h=c[0]:h=new At,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),qn(h,r),r.extensions&&Ri(n,h,r),r.matrix!==void 0){const u=new et;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Oe;n.name&&(r.name=i.createUniqueName(n.name)),qn(r,n),n.extensions&&Ri(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof bn||d instanceof Bt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];fi[r.path]===fi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(fi[r.path]){case fi.weights:c=Ms;break;case fi.rotation:c=Ss;break;case fi.position:case fi.scale:c=bs;break;default:switch(n.itemSize){case 1:c=Ms;break;case 2:case 3:default:c=bs;break}break}const h=i.interpolation!==void 0?I_[i.interpolation]:sr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const m=new c(l[d]+"."+fi[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Al(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ss?L_:Qu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function z_(s,e,t){const n=e.attributes,i=new Ln;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),o.normalized){const h=Al(ds[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new E,l=new E;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const x=Al(ds[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new In;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Oh(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=El[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return ut.workingColorSpace!==en&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ut.workingColorSpace}" not supported.`),qn(s,e),z_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?N_(s,e.targets,t):s})}let rs=null,yo=null;const G_=new a_;async function H_(){return rs||(yo||(yo=fetch("./models/manifest.json").then(s=>s.ok?s.json():{}).then(s=>(rs=s&&typeof s=="object"?s:{},rs)).catch(()=>(rs={},rs))),yo)}function pr(s,e,t){H_().then(n=>{const i=n[s];i&&G_.load(`./models/${i}`,r=>{const a=r.scene,o=new Ln().setFromObject(a),l=new E,c=new E;o.getSize(l),o.getCenter(c);const h=Math.max(l.x,l.y,l.z,.001),u=e/h;a.scale.setScalar(u),a.position.sub(c.multiplyScalar(u)),a.position.y-=o.min.y*u,t(a)},void 0,()=>{})})}const Mo={},So={};let bo=null,wo=null;function V_(s){return Mo[s]||(Mo[s]=s==="tesla"?e_():Qv()),Mo[s]}function W_(s){return So[s]||(So[s]=t_(s)),So[s]}function Bh(){if(bo)return bo;const s=256,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");t.fillStyle="#151820",t.fillRect(0,0,s,s);const n=12,i=n*1.732,r=n*1.5;t.strokeStyle="#07080c",t.lineWidth=2;for(let o=-1;o<s/r+2;o++)for(let l=-1;l<s/i+2;l++){const c=l*i+(o%2===0?0:i*.5),h=o*r;t.beginPath();for(let u=0;u<6;u++){const d=u/6*Math.PI*2+Math.PI/6,f=c+Math.cos(d)*(n-.8),m=h+Math.sin(d)*(n-.8);u===0?t.moveTo(f,m):t.lineTo(f,m)}t.closePath(),t.fillStyle=(o+l)%3===0?"#1b1f29":"#141720",t.fill(),t.stroke()}const a=new Ot(e);return a.wrapS=a.wrapT=Qn,a.repeat.set(3,5),a.colorSpace=dt,bo=a,a}function kh(){if(wo)return wo;const s=document.createElement("canvas");s.width=256,s.height=64;const e=s.getContext("2d");e.fillStyle="#0e1118",e.fillRect(0,0,256,64),e.fillStyle="#ff2a40",e.font="700 28px Inter, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("T E S L A",128,34);const t=new Ot(s);return t.colorSpace=dt,wo=t,t}function Cl(s,e,t,n,i){const r=new E().subVectors(t,e),a=new E().subVectors(n,e),o=new E().crossVectors(r,a),l=new E().addVectors(e,t).add(n).multiplyScalar(1/3);o.dot(l.sub(i))>=0?s.push(e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z):s.push(e.x,e.y,e.z,n.x,n.y,n.z,t.x,t.y,t.z)}function Rl(s,e,t,n,i,r){Cl(s,e,t,n,r),Cl(s,e,n,i,r)}function Pl(s){const e=[],t=s[0].length;for(let r=0;r<s.length-1;r++){const a=s[r],o=s[r+1],l=new E;for(let c=0;c<t;c++)l.add(a[c]).add(o[c]);l.multiplyScalar(1/(t*2));for(let c=0;c<t;c++){const h=(c+1)%t;Rl(e,a[c],a[h],o[h],o[c],l)}}const n=(r,a)=>{const o=new E;for(const c of r)o.add(c);o.multiplyScalar(1/r.length);const l=o.clone().add(new E(0,0,a));for(let c=0;c<r.length;c++){const h=(c+1)%r.length;Cl(e,o,r[c],r[h],l)}};n(s[0],1),n(s[s.length-1],-1);const i=new _t;return i.setAttribute("position",new je(e,3)),i.computeVertexNormals(),i}function X_(s=1){const e=new Oe,t=new Ee({color:"#f4f7fc",metalness:.94,roughness:.1}),n=new R(new Se(.42,.055,.04),t);n.position.set(0,.14,0);const i=new R(new Se(.16,.045,.04),t);i.position.set(-.15,.11,0),i.rotation.z=.25;const r=i.clone();r.position.x=.15,r.rotation.z=-.25;const a=new R(new mt(.055,.34,4),t);return a.rotation.z=Math.PI,a.rotation.y=Math.PI*.25,a.scale.set(1,1,.45),a.position.set(0,-.02,0),e.add(n,i,r,a),e.scale.setScalar(s),e}function ed(s="coca_cola"){const e=new Oe,t=new ot({color:s==="tesla"?"#f2f6fc":"#c40d2a",metalness:s==="tesla"?.28:.42,roughness:.14,clearcoat:1,clearcoatRoughness:.08}),n=new ot({color:s==="tesla"?"#dc1230":"#c40d2a",metalness:.38,roughness:.16,clearcoat:1,clearcoatRoughness:.08}),i=new Ee({color:"#12151e",roughness:.65,metalness:.2}),r=new ot({color:"#060c18",metalness:.15,roughness:.14,clearcoat:.35,clearcoatRoughness:.15,envMapIntensity:.35}),a=new Ee({color:"#dfe7f2",metalness:.9,roughness:.15}),o=Pn("#b8cee8"),c=[[-5.86,.68,.46,.88,.64,1.24,.52],[-5.52,.96,.42,1.02,.92,1.54,.78],[-4.96,1.18,.39,1.18,1.14,1.78,1.02],[-3.88,1.27,.38,1.26,1.24,3.08,1.08],[-2.68,1.28,.38,1.28,1.26,3.68,1.16],[-1.42,1.28,.38,1.28,1.27,4.02,1.22]].map(([N,W,j,ce,ze,Z,ae])=>[new E(-W*.88,j,N),new E(-W,ce,N),new E(-ze,ce+(Z-ce)*.48,N),new E(-ae,Z,N),new E(ae,Z,N),new E(ze,ce+(Z-ce)*.48,N),new E(W,ce,N),new E(W*.88,j,N)]),h=new R(Pl(c),t);e.add(h);const u=new R(new Se(1.75,.22,.35),i);u.position.set(0,.48,-5.76),e.add(u);const d=X_(.88);d.position.set(0,1.38,-5.68),d.rotation.x=.56,e.add(d);const f=[],m=new E(0,2.2,-3.9);Rl(f,new E(-.96,1.84,-4.99),new E(.96,1.84,-4.99),new E(1.04,3.07,-3.94),new E(-1.04,3.07,-3.94),m);for(const N of[-1,1])Rl(f,new E(N*1.19,1.82,-4.74),new E(N*1.16,2.95,-3.86),new E(N*1.27,2.95,-2.76),new E(N*1.31,1.84,-3.02),m);const x=new _t;x.setAttribute("position",new je(f,3)),x.computeVertexNormals();const g=new R(x,r);e.add(g);const p=new ke({color:"#fff8e8",toneMapped:!1}),y=Ta("#ffdf9e",.24);for(const N of[-1,1]){const W=new R(new Se(.58,.34,.38),i);W.position.set(N*.92,.88,-5.45),W.rotation.y=N*.42,e.add(W);const j=new R(new Se(.54,.085,.1),p);j.position.set(N*.92,.88,-5.58),j.rotation.y=N*.45,j.rotation.z=N*.24;const ce=new R(new Se(.085,.34,.1),p);ce.position.set(N*1.12,.96,-5.4),ce.rotation.y=N*.35,ce.rotation.z=N*-.15,e.add(j,ce);const ze=new R(new mt(2.6,14.5,18,1,!0),y);ze.rotation.x=Math.PI*.5,ze.position.set(N*.92,.86,-12.8),e.add(ze)}const _=new ke({color:"#ffad3b",toneMapped:!1});for(let N=-2;N<=2;N++){const W=new R(new Se(.14,.05,.07),_);W.position.set(N*.32,3.16,-3.82),e.add(W)}for(const N of[-1,1]){const W=new R(new Se(.32,.06,.08),i);W.position.set(N*1.38,2.15,-4.32),W.rotation.y=N*-.25;const j=new R(new Se(.11,.82,.22),i);j.position.set(N*1.54,2.38,-4.38),j.rotation.x=-.08,e.add(W,j)}for(const N of[-1,1]){const W=new R(new Se(.12,.72,1.55),n);W.position.set(N*1.24,.74,-3.55);const j=new R(new Se(.12,.65,2),n);j.position.set(N*1.24,.92,-2),e.add(W,j)}const v=new R(new Se(2.62,3.22,9.1),n);v.position.set(0,2.42,3.3),e.add(v);for(const N of[-1,1]){const W=new R(new Se(.1,.56,5.2),n);W.position.set(N*1.28,.68,1.85),e.add(W)}for(const N of[-1.31,1.31])for(const W of[-1.25,7.85]){const j=new R(new Se(.08,3.26,.08),a);j.position.set(N,2.42,W),e.add(j)}const A=new R(new Se(2.68,.16,9.16),o);A.position.set(0,4.08,3.3),e.add(A);const S=V_(s),C=W_(s),L=new Ee({map:S,emissiveMap:S,emissive:new Ue("#ffda99"),emissiveIntensity:.85,roughness:.24});for(const N of[-1,1]){const W=new R(new tn(8.5,2.75),L);W.rotation.y=N*Math.PI*.5,W.position.set(N*1.33,2.44,3.3),e.add(W)}const b=new Ee({map:C,emissiveMap:C,emissive:new Ue("#ffda99"),emissiveIntensity:.78,roughness:.24}),M=new R(new tn(2.35,2.55),b);M.position.set(0,2.55,7.87),e.add(M);const I=new Ve(.085,6,6),H=[],F=(N,W,j)=>{const ce=new ke({color:"#ffdf88",toneMapped:!1});H.push(ce);const ze=new R(I,ce);ze.position.set(N,W,j),e.add(ze)};for(let N=0;N<=16;N++){const W=-1.1+N/16*8.8;for(const j of[-1.34,1.34])F(j,3.96,W),F(j,.88,W)}for(let N=0;N<6;N++){const W=-1.2+N/5*2.4;F(W,3.96,7.86),F(W,.88,7.86)}const O=new ke({color:"#c41022",toneMapped:!1});for(const N of[-.98,.98]){const W=new R(new Se(.48,.22,.08),O);W.position.set(N,1.04,7.88),e.add(W)}const Y=[],V=new Ee({color:"#10141e",roughness:.82}),J=new Ee({color:"#1b202d",metalness:.55,roughness:.35}),G=[-4.6,-2.55,-1.62,5.55,6.65];for(const N of G)for(const W of[-1,1]){const j=new Oe;j.position.set(W*1.18,.56,N);const ce=new R(new $e(.56,.56,.36,18),V);ce.rotation.z=Math.PI*.5;const ze=new R(new $e(.38,.38,.38,14),J);ze.rotation.z=Math.PI*.5;const Z=new R(new $e(.14,.14,.4,10),a);Z.rotation.z=Math.PI*.5;const ae=new R(new Se(.41,.06,.58),a);j.add(ce,ze,Z,ae),e.add(j),Y.push(j)}return pr("semi",14,N=>{e.clear(),e.add(N)}),{group:e,update(N,W,j,ce,ze,Z=0){for(const ae of Y)ae.rotation.x=-W;H.forEach((ae,Ie)=>{const Be=.68+.32*Math.sin(ze*5.2+Ie*.45)+ce*1.4+Z*1.1;ae.color.setRGB(1.28*Be,.98*Be,.45*Be)}),L.emissiveIntensity=.85+ce*.9+Z*.8,b.emissiveIntensity=.78+ce*.85+Z*.8,y.uniforms.uOpacity.value=.24+ce*.14+Z*.46,p.color.setRGB(1+Z*.7,.97+Z*.6,.91+Z*.5),O.color.setRGB(j?2.3:.9,j?.22:.1,j?.26:.16)}}}function ga(s=!0,e=!1){const t=new Oe,n=new ot({color:"#bfcbe0",metalness:.92,roughness:.22,clearcoat:.5,flatShading:!0}),i=new Ee({color:"#141720",roughness:.8}),r=new ot({color:"#080e1a",metalness:.2,roughness:.04,clearcoat:1}),a=1.01,o=.72,l=[[new E(-.92,.46,-2.8),new E(-.98,1.04,-2.84),new E(-.96,1.05,-2.84),new E(.96,1.05,-2.84),new E(.98,1.04,-2.84),new E(.92,.46,-2.8)],[new E(-a*.95,.44,-1.78),new E(-a,1.36,-1.78),new E(-a,1.36,-1.78),new E(a,1.36,-1.78),new E(a,1.36,-1.78),new E(a*.95,.44,-1.78)],[new E(-a*.95,.44,-.32),new E(-a,1.36,-.32),new E(-o,1.84,-.32),new E(o,1.84,-.32),new E(a,1.36,-.32),new E(a*.95,.44,-.32)],[new E(-a*.95,.44,.55),new E(-a,1.36,.55),new E(-o*1.08,1.68,.55),new E(o*1.08,1.68,.55),new E(a,1.36,.55),new E(a*.95,.44,.55)]],c=Pl(l);t.add(new R(c,n));const h=new R(new Se(1.88,.48,2.25),i);h.position.set(0,.68,1.68),t.add(h);for(const M of[-1,1]){const I=[[new E(M*.78,.85,.55),new E(M*o*1.08,1.68,.55),new E(M*a,1.36,.55),new E(M*a*.95,.44,.55)],[new E(M*.84,.85,2.82),new E(M*.96,1.34,2.82),new E(M*.98,1.34,2.82),new E(M*.94,.48,2.82)]];t.add(new R(Pl(I),n))}const u=new R(new Se(1.94,.84,.14),n);u.position.set(0,.92,2.77),t.add(u);const d=new Float32Array([-.88,1.4,-1.78,.88,1.4,-1.78,.68,1.82,-.35,-.88,1.4,-1.78,.68,1.82,-.35,-.68,1.82,-.35]),f=new _t;f.setAttribute("position",new Ft(d,3)),f.computeVertexNormals();const m=new R(f,r);m.position.set(0,.02,-.02),t.add(m);const x=new R(new Se(.045,.04,1.35),i);x.position.set(-.74,1.63,-1.08),x.rotation.x=-.29,x.rotation.y=-.14,t.add(x);for(const M of[-1,1]){const I=new Float32Array([M*.96,1.36,-1.65,M*.74,1.78,-.32,M*.84,1.56,.55,M*.96,1.36,-1.65,M*.84,1.56,.55,M*.96,1.24,.55]),H=new _t;H.setAttribute("position",new Ft(I,3)),H.computeVertexNormals();const F=new R(H,r);F.position.x=M*.02,t.add(F)}const g=new R(new Se(1.98,.28,.28),i);g.position.set(0,.44,-2.84);const p=new R(new Se(1.98,.28,.24),i);p.position.set(0,.46,2.86),t.add(g,p);for(const M of[-1.72,1.72])for(const I of[-1,1]){const H=new R(new Se(.14,.22,1.05),i);H.position.set(I*1.02,1.02,M),t.add(H)}const y=new R(new Se(1.96,.065,.08),new ke({color:"#f2fbff",toneMapped:!1}));y.position.set(0,1.04,-2.86),t.add(y);const _=new R(new mt(2.2,11.5,16,1,!0),Ta("#d8f2ff",.22));_.rotation.x=Math.PI*.5,_.position.set(0,.94,-8.6),t.add(_);const v=new R(new Se(1.96,.075,.08),new ke({color:"#ff2438",toneMapped:!1}));v.position.set(0,1.3,2.85),t.add(v);const A=[],S=new Ee({color:"#11141c",roughness:.88}),C=new Ee({color:"#1e2430",metalness:.45,roughness:.45});for(const M of[-1.72,1.72])for(const I of[-1,1]){const H=new Oe;H.position.set(I*.98,.48,M);const F=new R(new $e(.49,.49,.34,16),S);F.rotation.z=Math.PI*.5;const O=new R(new $e(.32,.32,.36,7),C);O.rotation.z=Math.PI*.5,H.add(F,O),t.add(H),A.push(H)}let L=null;if(s){const M=new R(new $e(.1,.14,.5,6),new Ee({color:"#3b2016"}));M.position.set(0,1.05,1.72),t.add(M);const I=new Ee({color:"#0e3a2f",roughness:.8}),H=Pn("#b2cae8"),F=[];for(let Y=0;Y<4;Y++){const V=.88-Y*.18,J=.85-Y*.08,G=1.45+Y*.48,N=new R(new mt(V,J,9),I);N.position.set(0,G,1.72);const W=new R(new mt(V*.78,J*.46,9),H);W.position.set(0,G+J*.28,1.72),t.add(N,W)}for(let Y=0;Y<10;Y++){const V=Y/10,J=Y*1.4,G=.74*(1-V*.75),N=new ke({color:Y%2===0?"#ffdf78":"#ff384c",toneMapped:!1});F.push(N);const W=new R(new Ve(.06,6,6),N);W.position.set(Math.cos(J)*G,1.35+V*1.9,1.72+Math.sin(J)*G),t.add(W)}const O=new R(new Oi(.16,0),new ke({color:"#ffe588",toneMapped:!1}));O.position.set(0,3.45,1.72),t.add(O),L=Y=>{F.forEach((V,J)=>{const G=.75+.25*Math.sin(Y*5+J);J%2===0?V.color.setRGB(1.3*G,1.05*G,.45*G):V.color.setRGB(1.3*G,.22*G,.28*G)})}}let b=null;if(e){const M=new Oe,I=new Ee({color:"#ffbe2e",metalness:.45,roughness:.35}),H=new Ee({color:"#d41630",metalness:.35,roughness:.4});for(const N of[-1,1]){const W=new R(new Se(1.45,.72,.14),I);W.position.set(N*.64,.42,-3.28-.16),W.rotation.y=N*.28,M.add(W);const j=new R(new Se(1.46,.16,.16),H);j.position.set(N*.64,.7,-3.28-.16),j.rotation.y=N*.28,M.add(j);const ce=new R(new Se(.1,.12,.6),i);ce.position.set(N*.45,.46,-2.98),M.add(ce)}const F=new R(new Se(2.65,.12,.2),Pn("#d2e4fa"));F.position.set(0,.8,-3.42),M.add(F);const O=new R(new Se(1.18,.08,.22),i);O.position.set(0,1.88,-.35),M.add(O);const Y=new ke({color:"#ffaa22",toneMapped:!1}),V=new ke({color:"#ff2442",toneMapped:!1}),J=new R(new Se(.36,.1,.24),Y);J.position.set(-.34,1.93,-.35);const G=new R(new Se(.36,.1,.24),V);G.position.set(.34,1.93,-.35),M.add(J,G),t.add(M),b=N=>{const W=Math.sin(N*14)>0?1.7:.22,j=Math.sin(N*14)<=0?1.7:.22;Y.color.setRGB(1*W,.68*W,.12*W),V.color.setRGB(1*j,.15*j,.24*j)}}return pr("cybertruck",5.7,M=>{t.clear(),t.add(M)}),{group:t,update(M,I){for(const H of A)H.rotation.x=-M;L==null||L(I),b==null||b(I)}}}function Ll(){const s=new Oe,e=new ot({color:"#d4dfed",metalness:.9,roughness:.2,clearcoat:.55,fog:!1}),t=new Ee({map:Bh(),bumpMap:Bh(),bumpScale:.04,roughness:.85,metalness:.15,fog:!1}),n=new Ee({color:"#1b202b",metalness:.65,roughness:.4,fog:!1}),i=.92,r=new R(new $e(i,i,7.2,22),e);r.position.y=-3.6,s.add(r);for(const _ of[-1,1]){const v=new R(new Se(.14,6.8,.16),n);v.position.set(_*(i+.02),-3.6,0),s.add(v)}for(let _=0;_<4;_++){const v=_/4*Math.PI*2+Math.PI*.25,A=new R(new Se(.68,.14,.88),n);A.position.set(Math.cos(v)*(i+.42),-.55,Math.sin(v)*(i+.42)),A.rotation.y=-v+Math.PI*.5,s.add(A)}const a=new R(new $e(i*1.01,i*1.01,.44,22),n);a.position.y=.22,s.add(a);const o=4.2,l=new R(new $e(i,i,o,22),e);l.position.y=.44+o*.5,s.add(l);const c=new R(new $e(i*1.015,i*1.015,o,18,1,!0,-Math.PI*.5,Math.PI),t);c.position.y=.44+o*.5,s.add(c);const h=[],u=2.65;for(let _=0;_<=14;_++){const v=_/14,A=v*u,S=Math.max(.02,i*Math.cos(v*Math.PI*.48));h.push(new ne(S,A))}const d=new R(new ys(h,22),e);d.position.y=.44+o,s.add(d);const f=new R(new ys(h,16,-Math.PI*.5,Math.PI),t);f.scale.set(1.015,1,1.015),f.position.y=.44+o,s.add(f);const m=(_,v,A)=>{const S=new ur;return S.moveTo(0,0),S.lineTo(v,.18),S.lineTo(_,A),S.lineTo(0,A),S.closePath(),new dr(S,{depth:.1,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02})},x=m(.28,.72,1.35),g=m(.55,1.15,2.15);for(const _ of[-1,1]){const v=new R(x,t);v.position.set(_*(i*.62),5,0),v.scale.x=_,v.rotation.y=_*-.15,s.add(v);const A=new R(g,t);A.position.set(_*(i*.88),.58,0),A.scale.x=_,s.add(A)}const p=new R(new mt(.9,6.8,16),new ke({color:"#6ec4ff",transparent:!0,opacity:.95,blending:Rt,depthWrite:!1,toneMapped:!1,fog:!1}));p.rotation.x=Math.PI,p.position.y=-10.4,s.add(p);const y=new R(new mt(1.75,11.8,18),new ke({color:"#ff9d3b",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1,toneMapped:!1,fog:!1}));return y.rotation.x=Math.PI,y.position.y=-12.9,s.add(y),pr("starship",14,_=>{s.clear(),s.add(_)}),s}function Il(){const s=new Oe,e=new ot({color:"#c80c28",metalness:.5,roughness:.12,clearcoat:1,clearcoatRoughness:.08,fog:!1}),t=new Ee({color:"#11141c",roughness:.5,fog:!1}),n=new Ee({color:"#dce4f0",metalness:.85,roughness:.2,fog:!1}),i=new ur;i.moveTo(-2.05,.26),i.lineTo(-2.08,.62),i.lineTo(-1.35,.72),i.lineTo(-.55,.72),i.lineTo(.35,.64),i.lineTo(.85,.64),i.quadraticCurveTo(1.85,.56,2.08,.34),i.lineTo(1.98,.2),i.closePath();const r=new dr(i,{depth:1.72,bevelEnabled:!0,bevelThickness:.12,bevelSize:.08,bevelSegments:3});r.translate(0,0,-.86),s.add(new R(r,e));const a=new R(new Se(.08,.52,1.54),new ot({color:"#111a2c",roughness:.05,clearcoat:1,transparent:!0,opacity:.78}));a.position.set(.38,.85,0),a.rotation.z=.76,s.add(a);const o=new ke({color:"#fff8e2",toneMapped:!1,fog:!1}),l=new ke({color:"#ff283c",toneMapped:!1,fog:!1});for(const p of[-.66,.66]){const y=new R(new Se(.24,.07,.18),o);y.position.set(1.92,.45,p),y.rotation.z=-.25;const _=new R(new Se(.08,.08,.34),l);_.position.set(-2.08,.56,p*.9),s.add(y,_)}for(const p of[-1.32,1.32])for(const y of[-.88,.88]){const _=new R(new $e(.36,.36,.24,14),t);_.rotation.x=Math.PI*.5,_.position.set(p,.34,y);const v=new R(new $e(.22,.22,.26,8),n);v.rotation.x=Math.PI*.5,v.position.set(p,.34,y),s.add(_,v)}const c=new ot({color:"#f2f5fa",roughness:.45,fog:!1}),h=new R(new Dt(.22,.36,6,10),c);h.position.set(-.22,.9,-.28),h.rotation.z=.16,s.add(h);const u=new R(new Vt(.22,.035,6,12),t);u.rotation.x=Math.PI*.5,u.position.set(-.22,1,-.28),s.add(u);const d=new R(new Ve(.21,14,14),c);d.position.set(-.26,1.32,-.28);const f=new R(new Ve(.185,12,12),new ot({color:"#090d16",roughness:.05,clearcoat:1,fog:!1}));f.position.set(-.18,1.32,-.28),s.add(d,f);const m=new R(new Dt(.065,.42,4,8),c);m.position.set(-.15,.95,-.66),m.rotation.z=Math.PI*.42,s.add(m);const x=new R(new mt(.2,.44,10),new Ee({color:"#d91632",fog:!1}));x.position.set(-.34,1.62,-.28),x.rotation.z=.35;const g=new R(new Ve(.065,8,8),c);return g.position.set(-.46,1.82,-.28),s.add(x,g),pr("roadster",4.2,p=>{s.clear(),s.add(p)}),s}function tc(){const s=new Oe,e=new ot({color:"#f2f5fa",roughness:.22,clearcoat:.9}),t=new Ee({color:"#141720",roughness:.6,metalness:.25}),n=new ot({color:"#070a12",roughness:.04,metalness:.15,clearcoat:1}),i=new Ee({color:"#d91632",roughness:.6}),r=new R(new Dt(.16,.28,6,10),t);r.position.y=.98;const a=new R(new Dt(.23,.22,6,12),e);a.scale.set(1.1,1,.72),a.position.y=1.3,s.add(r,a);for(const g of[-.12,.12]){const p=new R(new Dt(.075,.32,4,8),t);p.position.set(g,.64,0);const y=new R(new Dt(.08,.34,4,8),e);y.position.set(g,.25,0),s.add(p,y)}const o=new R(new Dt(.055,.44,4,8),t);o.position.set(.28,1.15,0),o.rotation.z=-.18,s.add(o);const l=new R(new Ve(.16,12,12),e);l.scale.set(.88,1.12,.96),l.position.set(0,1.66,-.02);const c=new R(new Ve(.15,14,14),n);c.scale.set(.82,1.08,.65),c.position.set(0,1.66,.08),s.add(l,c);const h=new R(new Vt(.17,.045,6,12),i);h.rotation.x=Math.PI*.5,h.position.y=1.48;const u=new R(new mt(.17,.38,10),i);u.position.set(0,1.94,-.04),u.rotation.x=-.22,s.add(h,u);const d=new Oe;d.position.set(-.28,1.38,0);const f=new R(new Dt(.055,.22,4,8),t);f.position.y=.1;const m=new R(new Dt(.06,.24,4,8),e);m.position.y=.3;const x=new R(new Ve(.1,8,8),new ke({color:"#ffdf7e",toneMapped:!1}));return x.position.set(-.04,.5,.06),d.add(f,m,x),s.add(d),pr("optimus",1.8,g=>{s.clear(),s.add(g)}),{group:s,update(g){d.rotation.z=.35+Math.sin(g*5.2)*.42,s.rotation.y=Math.sin(g*1.4)*.16}}}let To=null;function q_(){if(To)return To;const s=document.createElement("canvas");s.width=512,s.height=96;const e=s.getContext("2d"),t=e.createLinearGradient(0,0,512,96);t.addColorStop(0,"#8f0a20"),t.addColorStop(.5,"#c8122f"),t.addColorStop(1,"#780819"),e.fillStyle=t,e.beginPath(),e.roundRect(4,4,504,88,16),e.fill(),e.strokeStyle="#ffe08a",e.lineWidth=4,e.stroke(),e.fillStyle="#fff9ea",e.font='700 28px "Cinzel", Georgia, serif',e.textAlign="center",e.textBaseline="middle",e.fillText("⚡ NORDPOLEN SUPERCHARGER",256,36),e.fillStyle="#ffe08a",e.font="600 18px Inter, sans-serif",e.fillText("GLÖGG · PEPPARKAKOR · 250 kW JULKRAFT",256,68);const n=new Ot(s);return n.colorSpace=dt,To=n,n}function td(){const s=new Oe,e=new ot({color:"#f0f4fa",roughness:.2,clearcoat:.9}),t=new Ee({color:"#141720",roughness:.7}),n=new Ee({map:kh(),emissiveMap:kh(),emissive:new Ue("#ff384c"),emissiveIntensity:1.2}),i=Pn("#b8cee8"),r=new Ee({color:"#d91632",roughness:.4}),a=new Ee({color:"#f8f9fc",roughness:.35}),o=new R(new Se(10.6,.2,4.4),i);o.position.set(.4,.1,0),s.add(o);for(const A of[-3.6,1.8])for(let S=0;S<6;S++){const C=new R(new $e(.14,.14,.56,10),S%2===0?r:a);C.position.set(A,.45+S*.54,1.35),s.add(C)}const l=new R(new tn(5.6,1.08),new ke({map:q_(),toneMapped:!1,side:Jt}));l.position.set(-.9,3.85,1.35),s.add(l);for(let A=0;A<3;A++){const S=(A-1.55)*2,C=new R(new Se(.84,2.45,.34),e);C.position.set(S,1.34,-.35),s.add(C);const L=new R(new Se(.28,2.15,.36),t);L.position.set(S+.2,1.32,-.35),s.add(L);const b=new R(new tn(.68,.18),n);b.position.set(S,2.36,-.17),s.add(b);const M=new Ni([new E(S+.22,2.17,-.21),new E(S+.44,1.37,-.09),new E(S+.32,.97,-.19)]);s.add(new R(new gi(M,12,.032,6,!1),t));const I=new R(new Ve(.46,10,8),i);I.scale.set(1.05,.32,.65),I.position.set(S,2.6,-.35),s.add(I);const H=new R(new Ve(.09,8,8),r);H.position.set(S,2.54,-.15),s.add(H)}const c=new Ee({color:"#7a1924",roughness:.78}),h=new ke({color:"#ffcf70",toneMapped:!1}),u=new R(new Se(2.1,1.9,1.9),c);u.position.set(3.8,1.15,-.2);const d=new R(new Se(1.3,.62,.12),h);d.position.set(3.8,1.3,.76);const f=new R(new mt(1.75,1.05,4),i);f.rotation.y=Math.PI*.25,f.position.set(3.8,2.58,-.2);const m=new R(new Se(.28,.75,.28),t);m.position.set(4.25,2.85,-.5),s.add(u,d,f,m);const x=new ke({color:"#f2f7ff",transparent:!0,opacity:.4}),g=[];for(let A=0;A<3;A++){const S=new R(new Ve(.14,7,7),x.clone());S.position.set(4.25,3.3+A*.35,-.5),s.add(S),g.push(S)}const p=new Ee({color:"#0f3c2d",roughness:.85});for(let A=0;A<3;A++){const S=new R(new mt(.72-A*.18,.9,8),p);S.position.set(-4.3,.9+A*.52,-.1),s.add(S)}const y=new R(new Oi(.16,0),new ke({color:"#ffe688",toneMapped:!1}));y.position.set(-4.3,2.52,-.1),s.add(y);const _=new Kt(new Wt({map:Rn(),color:"#ff6678",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1}));_.scale.set(9.5,5.2,1),_.position.set(.2,1.8,.4),s.add(_);const v=tc();return v.group.position.set(1.9,.2,.65),s.add(v.group),{group:s,update(A){v.update(A),y.rotation.y=A*1.4,g.forEach((S,C)=>{const L=(A*.42+C*.33)%1;S.position.set(4.25+Math.sin(A*2+C)*.08,3.25+L*1.1,-.5),S.scale.setScalar(.8+L*1.3),S.material.opacity=(1-L)*.42})}}}class Oy{constructor(){B(this,"group",new Oe);B(this,"starmanGroup");B(this,"starlinkGroup");B(this,"starshipGroup");B(this,"starshipStar");B(this,"superchargerPlaza");B(this,"cybertruck");B(this,"tempPos",new E);B(this,"wheelPhase",0);B(this,"lastEventType",null);B(this,"superchargerZ",-126);B(this,"cyberplowZ",-135);this.starmanGroup=Il(),this.starmanGroup.visible=!1,this.group.add(this.starmanGroup),this.starlinkGroup=new Oe;for(let e=0;e<18;e++){const t=new Kt(new Wt({map:Rn(),color:e%3===0?"#ffe082":"#d2f0ff",blending:Rt,depthWrite:!1,fog:!1}));t.scale.set(2.4,2.4,1),t.position.set(-e*3.8,Math.sin(e*.4)*1.1,0),this.starlinkGroup.add(t)}this.starlinkGroup.visible=!1,this.group.add(this.starlinkGroup),this.starshipGroup=Ll(),this.starshipStar=new Kt(new Wt({map:Zu(),color:"#ffe696",transparent:!0,opacity:0,blending:Rt,depthWrite:!1,fog:!1})),this.starshipStar.position.y=8.2,this.starshipStar.scale.set(26,26,1),this.starshipGroup.add(this.starshipStar),this.starshipGroup.visible=!1,this.group.add(this.starshipGroup),this.superchargerPlaza=td(),this.superchargerPlaza.group.visible=!1,this.group.add(this.superchargerPlaza.group),this.cybertruck=ga(!0,!0),this.cybertruck.group.visible=!1,this.group.add(this.cybertruck.group)}update(e,t,n,i){const r=(e==null?void 0:e.type)??null,a=(e==null?void 0:e.progress)??0;if(r!==this.lastEventType&&(r==="supercharger"&&(this.superchargerZ=i.superchargerStartZ??-126),r==="cyberplow"&&(this.cyberplowZ=-135),this.lastEventType=r),this.starmanGroup.visible=r==="starman",this.starmanGroup.visible&&(this.starmanGroup.position.set(i.moonPos.x-36+a*72,i.moonPos.y+Math.sin(a*Math.PI)*7,i.moonPos.z+18),this.starmanGroup.rotation.z=.12,this.starmanGroup.scale.setScalar(1.85)),this.starlinkGroup.visible=r==="starlink",this.starlinkGroup.visible&&(this.starlinkGroup.position.set(-75+a*165,38,i.starlinkZ??-118),this.starlinkGroup.rotation.z=.08),this.starshipGroup.visible=r==="starship",this.starshipGroup.visible){const o=Math.pow(Math.min(1,a/.78),.76);if(this.starshipGroup.scale.setScalar(i.starshipScale??1.45),this.starshipGroup.position.set(i.starshipOrigin.x,i.starshipOrigin.y+o*48,i.starshipOrigin.z),this.starshipGroup.rotation.y=a*.4,a>.65){const l=(a-.65)/.35;this.starshipStar.material.opacity=Math.sin(l*Math.PI)*.95;const c=18+l*26;this.starshipStar.scale.set(c,c,1)}else this.starshipStar.material.opacity=0}if(this.superchargerPlaza.group.visible=r==="supercharger"&&i.mappedSupercharger!==null,this.superchargerPlaza.group.visible){if(i.mappedSupercharger)this.superchargerPlaza.group.position.copy(i.mappedSupercharger),this.superchargerPlaza.group.rotation.y=0;else if(i.forwardStep!==void 0&&i.getRoadCurveX){this.superchargerZ+=i.forwardStep;const o=i.superchargerWrapZ??24;this.superchargerZ>o&&(this.superchargerZ=i.superchargerStartZ??-132);const l=i.getRoadCurveX(this.superchargerZ),c=i.getRoadCurveX(this.superchargerZ-5),h=Math.atan2(l-c,5),u=i.superchargerSideOffset??12.6;this.superchargerPlaza.group.position.set(l+u,0,this.superchargerZ),this.superchargerPlaza.group.rotation.y=h-Math.PI*.5}else i.roadPointAt(a,11.8,this.tempPos),this.superchargerPlaza.group.position.copy(this.tempPos),this.superchargerPlaza.group.rotation.y=0;this.superchargerPlaza.update(n)}if(this.cybertruck.group.visible=r==="cyberplow"&&i.showRoadVehicles!==!1,this.cybertruck.group.visible){if(this.wheelPhase+=t*16,i.forwardStep!==void 0&&i.getRoadCurveX){this.cyberplowZ+=i.forwardStep+14.5*t,this.cyberplowZ>24&&(this.cyberplowZ=-140);const o=i.getRoadCurveX(this.cyberplowZ),l=i.getRoadCurveX(this.cyberplowZ-5),c=Math.atan2(o-l,5);this.cybertruck.group.position.set(o-2.45,0,this.cyberplowZ),this.cybertruck.group.rotation.y=c+Math.PI}else i.roadPointAt(a,-2.4,this.tempPos),this.cybertruck.group.position.copy(this.tempPos),this.cybertruck.group.rotation.y=i.cybertruckYaw??0;this.cybertruck.update(this.wheelPhase,n)}}}const K_=[{id:"masterplan",year:"2006",accentHex:"#ffd166",diorama:"masterplan",sv:{title:"The Secret Master Plan",text:"Elon publicerar planen som ingen tror på: bygg en sportbil, använd vinsten till billigare elbilar och ställ om världens energi."},en:{title:"The Secret Master Plan",text:"Elon publishes the audacious blueprint: build a sports car, fund an affordable EV lineup, and accelerate sustainable energy."}},{id:"roadster_f1",year:"2008",accentHex:"#ff4d5a",diorama:"roadster_f1",sv:{title:"Roadster & Falcon 1 i omloppsbana",text:"På julveckan 2008 räddas båda bolagen i elfte timmen — Tesla levererar Roadster och Falcon 1 når rymden på fjärde försöket."},en:{title:"Roadster & Falcon 1 Reach Orbit",text:"In late 2008 both companies survive on the brink — Tesla ships the Roadster while Falcon 1 becomes the first private liquid rocket in orbit."}},{id:"models_sc",year:"2012",accentHex:"#ff6678",diorama:"models_supercharger",sv:{title:"Model S & De Första Superchargers",text:"Model S utses till årets bil och Tesla börjar bygga det globala nätverket av snabbladdare för elbilslångresor."},en:{title:"Model S & First Superchargers",text:"Model S redefines electric sedans and Tesla sparks the first Supercharger stations to make long-distance EV road trips effortless."}},{id:"falcon_landing",year:"2015",accentHex:"#6edcff",diorama:"falcon_landing",sv:{title:"Falcon 9 Landar Historiskt (Dec 2015)",text:"En orbital raket landar stående på Landing Zone 1 precis före jul — rymdresor blir plötsligt återanvändbara."},en:{title:"Falcon 9 Historic Landing (Dec 2015)",text:"Days before Christmas, an orbital rocket booster touches down upright at LZ-1, transforming spaceflight forever."}},{id:"boring",year:"2016",accentHex:"#ff9266",diorama:"boring",sv:{title:"The Boring Company",text:'"Trafiken gör mig galen. Jag ska bygga en tunnelborrmaskin och börja gräva." — En julig polkagristunnel tar form!'},en:{title:"The Boring Company",text:'"Traffic is driving me nuts. Am going to build a tunnel boring machine and just start digging." — Candy-cane tunnels begin!'}},{id:"prod_hell",year:"2017",accentHex:"#ffb85c",diorama:"prod_hell",sv:{title:'Model 3 & "Production Hell"',text:"Elon sover på golvet i Fremont-fabriken för att skala upp folk-Teslan från hantverk till massproduktion."},en:{title:'Model 3 & "Production Hell"',text:"Sleeping on the Fremont factory floor, the team turns Model 3 from a stressful bottleneck into a global EV phenomenon."}},{id:"starman",year:"2018",accentHex:"#ff384c",diorama:"starman",sv:{title:"Starman & Falcon Heavy",text:'En körsbärsröd Roadster skjuts upp i solomloppsbana med Starman bakom ratten — med "Don’t Panic!" på skärmen.'},en:{title:"Starman & Falcon Heavy",text:'A cherry-red Tesla Roadster blasts into heliocentric orbit with Starman at the wheel and "Don’t Panic!" on the dash.'}},{id:"funding_420",year:"2018",accentHex:"#48e59b",diorama:"funding_420",sv:{title:"Tesla Private at $420 — Funding Secured",text:'Tweeten som skakade Wall Street i augusti 2018 ("Am considering taking Tesla private at $420. Funding secured.") — odödlig meme-historia!'},en:{title:"Tesla Private at $420 — Funding Secured",text:'The unforgettable August 2018 tweet ("Am considering taking Tesla private at $420. Funding secured.") — forever etched in tech folklore.'}},{id:"armor_glass",year:"2019",accentHex:"#b8cde8",diorama:"armor_glass",sv:{title:"Cybertruck & Armor Glass-kraschen",text:'Origami i rostfritt stål rullar in på scenen — och stålkulan spräcker "okrossbara" sidorutan inför miljoner tittare.'},en:{title:"Cybertruck & The Armor Glass Smash",text:'Faceted stainless origami rolls onstage — and a steel ball shatters the "unbreakable" glass live in front of the world.'}},{id:"dragon_starlink",year:"2020",accentHex:"#7ed8ff",diorama:"dragon_starlink",sv:{title:"Crew Dragon, Starlink & S&P 500",text:"SpaceX flyger astronauter till ISS, Starlink-julbelysning tänds på natthimlen och Tesla gör entré i S&P 500."},en:{title:"Crew Dragon, Starlink & S&P 500",text:"SpaceX returns astronauts to orbit, Starlink satellites trace twinkling lines in the sky, and Tesla joins the S&P 500."}},{id:"semi_x",year:"2022",accentHex:"#e6223a",diorama:"semi_x",sv:{title:"Tesla Semi Leverans & Twitter blir X",text:"Den aerodynamiska el-lastbilen Tesla Semi levereras med 800 km räckvidd — samma år som Twitter blir X."},en:{title:"Tesla Semi Delivery & Twitter → X",text:"The bullet-nosed Tesla Semi hits highways hauling 82,000 lbs silently — the same whirlwind year Twitter becomes X."}},{id:"cyber_starship",year:"2023",accentHex:"#ffd166",diorama:"cyber_starship",sv:{title:"Cybertruck på Vägarna & Starship Lyfter",text:"De första kund-Cybertrucksen rullar ut i trafiken medan världens största raket Starship lyfter från Starbase."},en:{title:"Cybertruck Deliveries & Starship Liftoff",text:"Customer Cybertrucks hit public roads while the towering 121-meter Starship blasts off from Starbase Texas."}},{id:"mechazilla",year:"2024",accentHex:"#6ec4ff",diorama:"mechazilla",sv:{title:"Mechazilla Fångar Super Heavy!",text:'Oktober 2024: Ett 20-våningars raketsteg flyger tillbaka från rymden och fångas mitt i luften av tornets jättelika "chopsticks"!'},en:{title:"Mechazilla Catches Super Heavy!",text:"October 2024: A 20-story Super Heavy booster plunges back from space and hovers cleanly into the launch tower’s giant chopsticks!"}},{id:"cybercab_mars",year:"2025–2026",accentHex:"#ff964f",diorama:"cybercab_mars",sv:{title:"Optimus Gen 2, Cybercab & Resan mot Mars",text:"Självkörande guldtaxis utan ratt, humanoida Optimus-robotar och Starships nästa språng mot månen och Mars. God Jul!"},en:{title:"Optimus Gen 2, Cybercab & Road to Mars",text:"Steering-wheel-free golden Cybercabs, helpful Optimus humanoids, and Starship’s leap toward the Moon and Mars. Merry Christmas!"}}];class Ws{constructor(e=0,t=120,n=14){B(this,"value");B(this,"velocity",0);B(this,"stiffness");B(this,"damping");this.value=e,this.stiffness=t,this.damping=n}impulse(e){this.velocity+=e}update(e,t){const n=Math.min(e,.033),i=(t-this.value)*this.stiffness,r=-this.velocity*this.damping;return this.velocity+=(i+r)*n,this.value+=this.velocity*n,this.value}}class zh{constructor(e,t,n){B(this,"points");B(this,"prevPoints");B(this,"segLen");this.segLen=t,this.points=[],this.prevPoints=[];for(let i=0;i<e;i++){const r=n.clone().add(new E(0,-i*t*.4,i*t*.9));this.points.push(r),this.prevPoints.push(r.clone())}}update(e,t,n,i=-3.8){const r=Math.min(e,.033),a=.91;this.points[0].copy(t),this.prevPoints[0].copy(t);for(let o=1;o<this.points.length;o++){const l=this.points[o],c=this.prevPoints[o],h=(l.x-c.x)*a,u=(l.y-c.y)*a,d=(l.z-c.z)*a;c.copy(l);const f=Math.sin(performance.now()*.011+o*1.4)*(.25+n.length()*.08);l.x+=h+(n.x+f*.45)*r*r*14,l.y+=u+(n.y+i+f*.3)*r*r*12,l.z+=d+n.z*r*r*14}for(let o=0;o<3;o++){this.points[0].copy(t);for(let l=1;l<this.points.length;l++){const c=this.points[l-1],h=this.points[l],u=h.x-c.x,d=h.y-c.y,f=h.z-c.z,m=Math.hypot(u,d,f)||1e-4,x=(m-this.segLen)/m;l===1?(h.x-=u*x,h.y-=d*x,h.z-=f*x):(c.x+=u*x*.28,c.y+=d*x*.28,c.z+=f*x*.28,h.x-=u*x*.72,h.y-=d*x*.72,h.z-=f*x*.72)}}}}function Zr(s,e){const t=s.attributes.position,n=t.count,i=Object.keys(e),r=[],a=new E;for(const o of i){const l=e[o],c=new Float32Array(n*3);for(let u=0;u<n;u++){const d=t.getX(u),f=t.getY(u),m=t.getZ(u);a.set(d,f,m),l(d,f,m,a),c[u*3]=a.x,c[u*3+1]=a.y,c[u*3+2]=a.z}const h=new je(c,3);h.name=o,r.push(h)}return s.morphAttributes.position=r,i}function Y_(s,e){const t=Math.max(0,Math.min(1,e)),n=.1+t*.76,i=s,r=s+.42,a=s+2.35,o=s+2.75,l=(v,A)=>{const S=Math.sin(v)*A,C=Math.max(0,Math.sin(v+.9));return{upper:S,shin:C*(.25+t*1.15)}},c=l(a,n),h=l(o,n),u=l(i,n),d=l(r,n),f=Math.sin(s),m=Math.cos(s),x=f*(.03+t*.28),g=m*(.02+t*.19),p=-m*(.03+t*.14),y=Math.max(0,-f)*(.15+t*.85),_=Math.max(0,f)*(.12+t*.88);return{flUpper:c.upper,flShin:c.shin,frUpper:h.upper,frShin:h.shin,blUpper:u.upper,blShin:u.shin,brUpper:d.upper,brShin:d.shin,bodyY:x,bodyPitch:g,headPitch:p,spineArch:y,spineExtend:_}}let Eo=null,Ao=null;function j_(){return Eo||(Eo=$v("#7a1826")),Eo}function Gh(){return Ao||(Ao=Jv()),Ao}const $r=new E,Z_=new E(0,0,1);function Jr(s,e,t){s.position.addVectors(e,t).multiplyScalar(.5),$r.subVectors(t,e);const n=$r.length();s.scale.set(1,1,Math.max(.01,n)),n>1e-4&&($r.multiplyScalar(1/n),s.quaternion.setFromUnitVectors(Z_,$r))}function By(){const s=new Oe,e=new ot({color:"#c80e2b",metalness:.35,roughness:.16,clearcoat:1,clearcoatRoughness:.1}),t=e.clone(),n=new ot({color:"#8f0a20",roughness:.85,sheen:.85,sheenColor:new Ue("#ff5e73"),sheenRoughness:.45}),i=new Ee({color:"#ffd166",metalness:.88,roughness:.2}),r=i.clone(),a=new ot({color:"#f8f5ef",roughness:.85,sheen:.65,sheenColor:new Ue("#ffffff")}),o=new Oe;s.add(o);const l=new ur;l.moveTo(-1.35,.35),l.bezierCurveTo(-1.45,.95,-1.25,1.48,-.78,1.48),l.bezierCurveTo(-.45,1.48,-.25,.95,.05,.92),l.bezierCurveTo(.45,.88,.78,1.12,1.18,1.24),l.bezierCurveTo(1.42,1.3,1.48,.95,1.24,.62),l.bezierCurveTo(.95,.32,.35,.3,-1.35,.35);const c=new dr(l,{depth:.12,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:3,curveSegments:18});c.rotateY(Math.PI*.5);for(const ie of[-.88,.76]){const Te=new R(c,t);Te.position.set(ie,.15,.65),o.add(Te)}const h=new R(new Se(1.62,.18,2.35),t);h.position.set(0,.56,.62),o.add(h);const u=new R(new Se(1.62,.82,.24),t);u.position.set(0,1.08,1.72),u.rotation.x=-.24,o.add(u);const d=new R(new Dt(.32,.92,8,12),n);d.rotation.z=Math.PI*.5,d.position.set(0,.85,.88),o.add(d);const f=new R(new $e(.84,.84,.55,16,1,!1,0,Math.PI),t);f.rotation.z=Math.PI*.5,f.rotation.x=-.35,f.position.set(0,1.05,-.38),o.add(f);for(const ie of[-.82,.82]){const Te=new Ni([new E(ie,.16,2.02),new E(ie,.12,.95),new E(ie,.12,-.45),new E(ie,.42,-1.05),new E(ie,.85,-1.16),new E(ie,.98,-.92)]);o.add(new R(new gi(Te,28,.055,8,!1),r));for(const Ze of[1.4,.35,-.45]){const ht=new R(new $e(.035,.045,.46,8),r);ht.position.set(ie,.34,Ze),o.add(ht)}const at=new Ni([new E(ie*1.06,1.62,1.45),new E(ie*1.06,1.08,.65),new E(ie*1.06,1.4,-.48)]);o.add(new R(new gi(at,20,.032,6,!1),r))}const m=new R(new Vt(.24,.03,6,12,Math.PI),i);m.rotation.y=Math.PI*.5,m.position.set(0,1.38,-.78),o.add(m);const x=new Oe;x.position.set(0,1.36,-.98);const g=new R(new Ve(.14,10,10),new ke({color:"#fff3c4",toneMapped:!1}));g.position.y=-.14;const p=new R(new mt(.19,.16,6),i);p.position.y=-.02;const y=new pa("#ffcc75",6,18);y.position.set(0,-.05,-.15),x.add(g,p,y),o.add(x);const _=new R(new Ve(.62,14,12),new Ee({color:"#8a5d3b",roughness:.92}));_.scale.set(1.05,.92,.85),_.position.set(0,1.26,1.35),o.add(_);const v=new Oe;v.position.set(0,1.56,1.28);const A=[{x:-.36,y:.1,z:-.03,col:"#1f8a52",rib:"#ffd166",s:.42},{x:.34,y:.16,z:.1,col:"#e62e3d",rib:"#fff6e0",s:.38},{x:.02,y:.28,z:-.08,col:"#2c68c9",rib:"#ffd166",s:.35}];for(const ie of A){const Te=new Oe,at=new R(new Se(ie.s,ie.s,ie.s),new ot({color:ie.col,roughness:.35,clearcoat:.5})),Ze=new Ee({color:ie.rib,metalness:.6,roughness:.25}),ht=new R(new Se(ie.s*1.05,ie.s*1.05,ie.s*.18),Ze),Lt=new R(new Se(ie.s*.18,ie.s*1.05,ie.s*1.05),Ze);Te.add(at,ht,Lt),Te.position.set(ie.x,ie.y,ie.z),Te.rotation.set(.2,ie.x,-.15),v.add(Te)}o.add(v);const S=new Oe;S.position.set(0,1.05,.52);const C=new Oe;S.add(C);const L=new Ve(.42,20,16);Zr(L,{laughJiggle:(ie,Te,at,Ze)=>{if(Te<.1){const ht=(.1-Te)*1.6;Ze.set(ie*(1+ht*.14),Te-ht*.05,at*(1+ht*.14)-ht*.05)}}});const b=new R(L,e);b.scale.set(1.05,1.15,.95),b.position.y=.32,b.updateMorphTargets(),C.add(b);const M=new R(new Vt(.4,.08,8,16),a);M.rotation.x=Math.PI*.5,M.position.y=.05,C.add(M);const I=new R(new $e(.43,.43,.11,16),new Ee({color:"#17171f",roughness:.4}));I.position.y=.26,C.add(I);const H=new R(new Vt(.08,.024,6,4),i);H.rotation.z=Math.PI*.25,H.position.set(0,.26,-.43),C.add(H);const F=new Oe;F.position.set(0,.88,-.02),C.add(F);const O=new Ve(.28,22,18);Zr(O,{smile:(ie,Te,at,Ze)=>{at<-.1&&Math.abs(ie)>.06&&Te<.03&&(Ze.y+=.026,Ze.z-=.016)},hoHoHo:(ie,Te,at,Ze)=>{at<-.15&&Math.abs(ie)<.095&&Te<-.02&&(Ze.z+=.048,Ze.y-=.032),at<-.1&&Math.abs(ie)>.07&&(Ze.y+=.022,Ze.x*=1.07)},blink:(ie,Te,at,Ze)=>{at<-.15&&Te>.01&&Te<.1&&Math.abs(ie)>.035&&(Ze.y-=.018)},windSquint:(ie,Te,at,Ze)=>{at<-.14&&Math.abs(ie)>.05&&Te>-.03&&Te<.05&&(Ze.y+=.022,Ze.z-=.014)},surprise:(ie,Te,at,Ze)=>{at<-.12&&Te>.07&&(Ze.y+=.028),at<-.14&&Te<-.08&&(Ze.y-=.024)}});const Y=new ot({color:"#f7c8ae",roughness:.6,sheen:.3}),V=new R(O,Y);V.updateMorphTargets(),F.add(V);const J=new Ee({color:"#ef767a",roughness:.55}),G=[],N=[];for(const ie of[-.14,.14]){const Te=new R(new Ve(.068,10,10),J);Te.position.set(ie,-.04,-.23),F.add(Te),G.push(Te);const at=new R(new Ve(.038,10,10),new ot({color:"#14141d",roughness:.08,clearcoat:1}));at.position.set(ie*.68,.05,-.255);const Ze=new R(new Ve(.013,6,6),new ke({color:"#ffffff"}));Ze.position.set(.01,.014,-.032),at.add(Ze),F.add(at),N.push(at)}const W=new R(new Ve(.055,10,10),J);W.position.set(0,.01,-.29),F.add(W);const j=[[0,-.16,-.21,.2],[-.12,-.11,-.17,.14],[.12,-.11,-.17,.14],[0,-.28,-.19,.15]];for(const[ie,Te,at,Ze]of j){const ht=new R(new Ve(Ze,10,10),a);ht.position.set(ie,Te,at),F.add(ht)}for(const ie of[-.08,.08]){const Te=new R(new Dt(.045,.07,4,8),a);Te.rotation.z=ie<0?1.2:-1.2,Te.position.set(ie,-.05,-.27),F.add(Te)}const ce=new R(new Vt(.26,.068,8,16),a);ce.rotation.x=Math.PI*.5,ce.position.y=.19,F.add(ce);const ze=new zh(5,.16,new E(0,.22,0)),Z=[];for(let ie=0;ie<4;ie++){const Te=.22-ie*.045,at=.17-ie*.04,Ze=new R(new $e(at,Te,1,10),e);Ze.geometry.rotateX(Math.PI*.5),F.add(Ze),Z.push(Ze)}const ae=new R(new Ve(.085,10,10),a);F.add(ae);const Ie=new zh(6,.22,new E(.16,.65,.06)),pe=[];for(let ie=0;ie<5;ie++){const Te=new R(new $e(.055-ie*.005,.06-ie*.005,1,8),i);Te.geometry.rotateX(Math.PI*.5),C.add(Te),pe.push(Te)}const Be=new E(-.31,.44,-.48),Ke=new E(.31,.44,-.48),We=new R(new Dt(.11,.32,6,8),e);We.position.set(-.36,.52,-.24),We.rotation.x=-.95,We.rotation.z=.25;const ct=new R(new Ve(.1,8,8),n);ct.position.set(-.31,.44,-.48),C.add(We,ct);const te=new Oe;te.position.set(.36,.64,-.1);const ue=new R(new Dt(.11,.32,6,8),e);ue.position.set(0,-.12,-.14),ue.rotation.x=-.95,ue.rotation.z=-.25;const D=new R(new Ve(.1,8,8),n);D.position.set(-.05,-.2,-.38);const Fe=new Oe;Fe.position.set(-.04,-.12,-.46);const oe=new R(new $e(.08,.07,.16,10),e),Ae=new R(new Vt(.08,.016,6,10),i);Ae.rotation.x=Math.PI*.5,Ae.position.y=.08;const me=new R(new Ve(.06,6,6),new ke({color:"#eef7ff",transparent:!0,opacity:.48}));me.position.y=.16,Fe.add(oe,Ae,me),Fe.visible=!1,te.add(ue,D,Fe),C.add(te),o.add(S);const He=new ot({color:"#8c5330",roughness:.72,sheen:.55,sheenColor:new Ue("#c9956b")}),Ce=new ot({color:"#d8b490",roughness:.75}),P=new Ee({color:"#e6caa2",roughness:.55}),w=new Ee({color:"#1b1614",roughness:.35}),q=new ke({color:"#eef7ff",transparent:!0,opacity:.42}),Q=new $e(.015,.015,1,5);Q.rotateX(Math.PI*.5);const re=[{x:-.78,z:-2.65,phase:.35,rudolph:!1},{x:.78,z:-2.65,phase:1.25,rudolph:!1},{x:-.75,z:-5.45,phase:2.1,rudolph:!1},{x:.75,z:-5.45,phase:0,rudolph:!0}],ee=[];let Le=null,ge=null;const Re=[];for(const ie of re){const Te=new Oe;Te.position.set(ie.x,.82,ie.z);const at=new Dt(.24,.68,10,16);Zr(at,{archSpine:(he,fe,Pe,_e)=>{const we=Math.max(0,1-Math.abs(fe)*2.2);_e.z=Pe-we*.075},extendSpine:(he,fe,Pe,_e)=>{_e.y=fe*1.1,_e.x=he*.94,_e.z=Pe*.96},breathe:(he,fe,Pe,_e)=>{fe<.05&&(_e.x=he*1.07,_e.z=Pe*1.07)}});const Ze=new R(at,He);Ze.rotation.x=Math.PI*.5,Ze.updateMorphTargets(),Te.add(Ze);const ht=new R(new Ve(.22,10,10),Ce);ht.position.set(0,-.02,-.34),Te.add(ht);const Lt=new R(new mt(.08,.24,8),a);Lt.rotation.x=.85,Lt.position.set(0,.14,.52),Te.add(Lt);const ti=new R(new Vt(.25,.045,8,14),e);ti.rotation.x=.35,ti.position.set(0,.1,-.32),Te.add(ti);for(const he of[-.12,0,.12]){const fe=new R(new Ve(.048,8,8),i);fe.position.set(he,-.08,-.45),Te.add(fe)}const Ct=new Oe;Ct.position.set(0,.24,-.38);const nn=new R(new Dt(.13,.32,6,10),He);nn.rotation.x=-.45,nn.position.set(0,.14,-.08),Ct.add(nn);const Mi=new Ve(.18,16,14);Zr(Mi,{blink:(he,fe,Pe,_e)=>{Pe<-.05&&fe>.01&&fe<.09&&(_e.y-=.016)},earPerk:(he,fe,Pe,_e)=>{fe>.06&&(_e.z=Pe-.025)},snoutFlare:(he,fe,Pe,_e)=>{Pe<-.1&&fe<0&&(_e.x=he*1.1,_e.z=Pe-.018)}});const mn=new R(Mi,He);mn.position.set(0,.36,-.2),mn.updateMorphTargets(),Ct.add(mn);const Un=new R(new Dt(.11,.16,6,10),Ce);Un.rotation.x=Math.PI*.5,Un.position.set(0,.31,-.36),Ct.add(Un);const ni=[],Si=[];for(const he of[-1,1]){const fe=new R(new Ve(.042,8,8),new ot({color:"#121218",roughness:.05,clearcoat:1}));fe.position.set(he*.12,.41,-.31);const Pe=new R(new Ve(.015,6,6),new ke({color:"#ffffff"}));Pe.position.set(.012,.015,-.035),fe.add(Pe),Ct.add(fe),ni.push(fe);const _e=new R(new mt(.06,.18,6),He);_e.rotation.z=he*-1.1,_e.rotation.x=.25,_e.position.set(he*.19,.45,-.14),Ct.add(_e),Si.push(_e);const we=new Ni([new E(he*.07,.5,-.16),new E(he*.19,.72,-.12),new E(he*.24,.92,-.02)]);Ct.add(new R(new gi(we,10,.024,6,!1),P));const Qe=new Ni([new E(he*.17,.68,-.13),new E(he*.11,.84,-.25)]);Ct.add(new R(new gi(Qe,6,.018,5,!1),P))}if(ie.rudolph){const he=new R(new Ve(.095,12,12),new ke({color:"#ff2b3d",toneMapped:!1}));he.position.set(0,.34,-.49),Ct.add(he),Le=new Kt(new Wt({map:Rn(),color:"#ff364c",transparent:!0,opacity:.65,blending:Rt,depthWrite:!1})),Le.scale.set(.95,.95,1),Le.position.set(0,.34,-.54),Ct.add(Le),ge=new pa("#ff3b4c",5.5,16),ge.position.set(0,.42,-.82),Ct.add(ge)}else{const he=new R(new Ve(.055,8,8),w);he.position.set(0,.34,-.47),Ct.add(he)}const ii=new Kt(new Wt({map:Rn(),color:"#ffe288",transparent:!0,opacity:0,blending:Rt,depthWrite:!1}));ii.scale.set(.85,.45,1),ii.position.set(0,-.65,.3),Te.add(ii),Re.push(ii),Te.add(Ct);const si=(he,fe)=>{const Pe=new Oe;Pe.position.set(he,-.1,fe);const _e=new R(new Dt(.058,.28,4,8),He);_e.position.y=-.16,Pe.add(_e);const we=new Oe;we.position.set(0,-.32,0);const Qe=new R(new Dt(.044,.26,4,8),He);Qe.position.y=-.14;const pt=new R(new $e(.05,.062,.07,8),w);return pt.position.y=-.3,we.add(Qe,pt),Pe.add(we),Te.add(Pe),{upper:Pe,shin:we}},T=si(-.15,-.28),U=si(.15,-.28),X=si(-.15,.32),K=si(.15,.32),z=[];for(let he=0;he<3;he++){const fe=new R(new Ve(.08,8,8),q.clone());fe.visible=!1,Ct.add(fe),z.push(fe)}const de=new R(Q,i),ve=new R(Q,i);s.add(de,ve),s.add(Te),ee.push({group:Te,slotX:ie.x,slotZ:ie.z,torsoMesh:Ze,craniumMesh:mn,eyes:ni,ears:Si,fl:T.upper,flShin:T.shin,fr:U.upper,frShin:U.shin,bl:X.upper,blShin:X.shin,br:K.upper,brShin:K.shin,headGroup:Ct,phaseOffset:ie.phase,blinkTimer:1.5+Math.random()*3,blinkVal:0,breathPuffs:z,reinSegA:de,reinSegB:ve})}let tt=0;const le=new Ws(0,95,7),De=new Ws(0,95,7),Xe=new Ws(0,85,11),qe=new Ws(0,75,10),Ne=new Ws(0,70,6);let st=2.6,Ye=0,rt=0,k=0,xe=0,$=0,se="classic";const Me=new E,be=new E(0,.22,0),Je=new E(.16,.65,.06),bt=new E,It=new E,ft=new E;return{group:s,triggerReaction(ie){ie==="hohoho"?(rt=2.6,le.impulse(3.2),Xe.impulse(-1.4)):ie==="landmark"?(k=2.2,qe.impulse(1.8)):ie==="gift"&&(xe=1.6,le.impulse(-2.2))},setStoppedMode(ie){$=ie},setTheme(ie){ie!==se&&(se=ie,ie==="cyber2099"?(t.color.set("#c4d2e6"),t.metalness=.92,t.roughness=.2,r.color.set("#3ceeff"),r.emissive.set("#0e90b8"),r.emissiveIntensity=.95):(t.color.set(ie==="nordic"?"#8c1622":"#c80e2b"),t.metalness=.35,t.roughness=.16,r.color.set("#ffd166"),r.emissive.set("#000000"),r.emissiveIntensity=0))},update(ie,Te,at,Ze,ht){const Lt=Math.min(1,Te/110),ti=Te<2?2.2:5.8+Lt*10.5;tt+=ti*ie,rt>0&&(rt=Math.max(0,rt-ie)),k>0&&(k=Math.max(0,k-ie)),xe>0&&(xe=Math.max(0,xe-ie)),st-=ie,st<=0&&(st=2.8+Math.random()*2.5,Ye=1),Ye=Math.max(0,Ye-ie*7.5),Ne.update(ie,-at*.38),v.rotation.z=Ne.value,v.rotation.x=An.clamp(-Ze*.04,-.22,.22),v.position.y=1.56+Math.abs(Math.sin(tt*.5))*(.04+Lt*.07);const Ct=Math.max(0,(Lt-.55)/.45)+(xe>0?.5:0);if(Le&&ge){const T=1+Math.sin(ht*9)*.15+Ct*1.15;Le.scale.setScalar(.95*T),Le.material.opacity=Math.min(.96,.52+Ct*.38),ge.intensity=5.5+Ct*9}Re.forEach((T,U)=>{T.material.opacity=Ct>.2?(.3+.25*Math.sin(ht*12+U))*Math.min(1,Ct):0}),le.update(ie,-Ze*.08+Math.sin(tt)*(.04+Lt*.1)),De.update(ie,at*.35),x.rotation.x=le.value,x.rotation.z=De.value,Xe.update(ie,-Ze*.045-Lt*.12+(rt>0?-.14:0)),C.rotation.x=Xe.value;const nn=$>3.2,Mi=nn?2.45:0;C.rotation.y+=(Mi-C.rotation.y)*Math.min(1,ie*3.5),Fe.visible=nn,nn?(te.rotation.z=-.85+Math.sin(ht*4.2)*.28,te.rotation.x=.65,me.position.y=.14+ht*.45%.16):(te.rotation.z+=(0-te.rotation.z)*Math.min(1,ie*6),te.rotation.x+=(0-te.rotation.x)*Math.min(1,ie*6));const mn=nn?Math.sin(ht*2.1)*.14:rt>0?Math.sin(ht*3.5)*.28+.25:-at*.36;qe.update(ie,mn),F.rotation.y=qe.value,F.rotation.x=rt>0?Math.sin(ht*12)*.09:Lt*.06;const Un=rt>0?Math.max(0,Math.sin(ht*13)):0,ni=Math.min(1,.35+(nn?.65:0)+(k>0?.65:0)+(rt>0?.6:0)),Si=Math.max(0,Lt-.55)*1.4,ii=Math.max(xe>0?.85:0,Ze<-1.5?.75:0);V.morphTargetInfluences&&(V.morphTargetInfluences[0]=ni,V.morphTargetInfluences[1]=Un,V.morphTargetInfluences[2]=Ye,V.morphTargetInfluences[3]=Si,V.morphTargetInfluences[4]=ii),b.morphTargetInfluences&&(b.morphTargetInfluences[0]=rt>0?.45+Un*.55:0);const si=Math.max(.12,1-Ye*.88-Si*.32);for(const T of N)T.scale.y=si;for(const T of G)T.position.y=-.04+ni*.022;Me.set(-at*4.5,.6+Lt*1.6,3.2+Lt*14),ze.update(ie,be,Me,-3.2);for(let T=0;T<Z.length;T++)Jr(Z[T],ze.points[T],ze.points[T+1]);ae.position.copy(ze.points[ze.points.length-1]),Ie.update(ie,Je,Me,-2.8);for(let T=0;T<pe.length;T++)Jr(pe[T],Ie.points[T],Ie.points[T+1]);for(let T=0;T<ee.length;T++){const U=ee[T],X=Y_(tt+U.phaseOffset,Lt);U.group.position.y=.82+X.bodyY,U.group.rotation.x=X.bodyPitch,U.group.rotation.y=-at*(T>=2?.22:.1),U.headGroup.rotation.x=X.headPitch,U.headGroup.rotation.z=$>1.5?Math.sin(ht*9+T*1.4)*Math.max(0,Math.sin(ht*.9+T))*.22:0,U.fl.rotation.x=X.flUpper,U.flShin.rotation.x=X.flShin,U.fr.rotation.x=X.frUpper,U.frShin.rotation.x=X.frShin,U.bl.rotation.x=X.blUpper,U.blShin.rotation.x=X.blShin,U.br.rotation.x=X.brUpper,U.brShin.rotation.x=X.brShin;const K=Te<5?.5+.5*Math.sin(ht*2.1+U.phaseOffset):0;U.torsoMesh.morphTargetInfluences&&(U.torsoMesh.morphTargetInfluences[0]=X.spineArch,U.torsoMesh.morphTargetInfluences[1]=X.spineExtend,U.torsoMesh.morphTargetInfluences[2]=K),U.blinkTimer-=ie,U.blinkTimer<=0&&(U.blinkTimer=2.6+Math.random()*3.4,U.blinkVal=1),U.blinkVal=Math.max(0,U.blinkVal-ie*8);const z=k>0||rt>0?1:.25,de=Te<5?K*.7:0;U.craniumMesh.morphTargetInfluences&&(U.craniumMesh.morphTargetInfluences[0]=U.blinkVal,U.craniumMesh.morphTargetInfluences[1]=z,U.craniumMesh.morphTargetInfluences[2]=de);for(const _e of U.eyes)_e.scale.y=Math.max(.12,1-U.blinkVal*.88);U.ears.forEach((_e,we)=>{_e.rotation.x=.25-z*.35+Lt*.28+(we===0?.04:-.04)});const ve=Te<5||$>.8,he=$>1.5?1.45:1;U.breathPuffs.forEach((_e,we)=>{if(_e.visible=ve,!ve)return;const Qe=(ht*.6+U.phaseOffset+we*.33)%1;_e.position.set(Math.sin(Qe*4)*.05,.32+Qe*.42,-.52-Qe*.48);const pt=(.65+Qe*1.85)*he;_e.scale.set(pt,pt,pt),_e.material.opacity=Math.min(.65,(1-Qe)*.42*he)});const fe=U.slotX<0?Be:Ke;bt.set(fe.x,1.05+fe.y,.52+fe.z),ft.set(U.group.position.x,U.group.position.y+.14,U.slotZ-.32);const Pe=.32-Lt*.18+Math.sin(tt+U.phaseOffset)*.05;It.addVectors(bt,ft).multiplyScalar(.5),It.y-=Pe,Jr(U.reinSegA,bt,It),Jr(U.reinSegB,It,ft)}},getTrailOrigin(ie){return ie.set(0,.32,2.05),s.localToWorld(ie)}}}function $_(s=0){const e=new Oe,t=new Ee({map:j_(),roughness:.78}),n=Pn("#b2cae8"),i=new R(new Se(3.8,2.4,3.3),t);i.position.y=1.2,e.add(i);const r=new Ee({color:"#1b1d32",roughness:.85}),a=new R(new mt(3.3,2.2,4),r);a.rotation.y=Math.PI*.25,a.position.y=3.4,e.add(a);const o=new R(new mt(3.48,1.9,4),n);o.rotation.y=Math.PI*.25,o.position.y=3.65,e.add(o);for(const A of[-1.85,0,1.85])for(const S of[-1.75,1.75]){const C=new R(new Ve(.32,8,8),n);C.scale.set(1.5,.7,1.1),C.position.set(A,2.42,S),e.add(C)}const l=new R(new Se(.55,1.35,.55),new Ee({color:"#4c383d",roughness:.9}));l.position.set(1.05,3.85,.65),e.add(l);const c=[];for(let A=0;A<4;A++){const S=new R(new Ve(.24,8,8),new ke({color:"#dbe8fa",transparent:!0,opacity:.26}));e.add(S),c.push(S)}const h=new Ee({map:Gh(),emissiveMap:Gh(),emissive:new Ue("#ffbd59"),emissiveIntensity:1.85,roughness:.3}),u=new tn(.9,.95),d=new Ee({color:"#efe5d6",roughness:.7}),f=[[-.98,1.25,1.67,0],[.98,1.25,1.67,0],[-.98,1.25,-1.67,Math.PI],[.98,1.25,-1.67,Math.PI],[-1.92,1.25,0,-Math.PI*.5],[1.92,1.25,0,Math.PI*.5]];for(const[A,S,C,L]of f){const b=new R(new Se(1.05,1.1,.08),d);b.position.set(A,S,C),b.rotation.y=L,e.add(b);const M=new R(u,h);M.position.set(A+Math.sin(L)*.05,S,C+Math.cos(L)*.05),M.rotation.y=L,e.add(M)}const m=new R(new Se(.75,1.4,.1),new Ee({color:"#3b1c14",roughness:.8}));m.position.set(0,.7,1.67),e.add(m);const x=new R(new Vt(.2,.06,6,12),new Ee({color:"#14452f",roughness:.8}));x.position.set(0,1.05,1.74),e.add(x);const g=new R(new Ve(.07,6,6),new Ee({color:"#d91632"}));g.position.set(0,.88,1.78),e.add(g);const p=new ke({color:"#ffe49e",toneMapped:!1}),y=new R(new Ve(.11,8,8),p);y.position.set(.55,1.55,1.78),e.add(y);const _=new Kt(new Wt({map:Rn(),color:"#ffba52",transparent:!0,opacity:.35,blending:Rt,depthWrite:!1}));_.scale.set(5.5,4,1),_.position.set(0,1.2,2),e.add(_);let v=1;return{group:e,setLit(A){v=Math.max(0,Math.min(1,A)),p.color.setRGB(.25+v*.75,.2+v*.68,.18+v*.44)},update(A,S){const C=.92+.08*Math.sin(S*5.1+s)+.04*Math.sin(S*11.3+s*2);h.emissiveIntensity=.08+v*2.1*C,_.material.opacity=v*.36*C,c.forEach((L,b)=>{const M=(S*.34+b*.25+s*.13)%1;L.position.set(1.05+Math.sin(M*4+s)*.25-M*.35,4.6+M*2.4,.65+Math.cos(M*3)*.18);const I=.7+M*2;L.scale.set(I,I,I),L.material.opacity=(1-M)*.26})}}}function ky(s=!0,e=0){const t=new Oe,n=new R(new $e(.22,.38,1.3,8),new Ee({color:"#3b2016",roughness:.9}));n.position.y=.65,t.add(n);const i=new ot({color:"#0e3a2f",roughness:.78,sheen:.25,sheenColor:new Ue("#286e58")}),r=Pn("#b2cae8");for(let h=0;h<5;h++){const u=2.18-h*.36,d=2.08-h*.16,f=1.65+h*1.15,m=new R(new mt(u,d,10),i);m.position.set(Math.sin(h*2.1+e)*.08,f,Math.cos(h*1.7+e)*.08),m.rotation.set((h%2===0?1:-1)*.035,h*.65+e,(h%2===0?-1:1)*.03),t.add(m);const x=new R(new mt(u*.78,d*.48,10),r);if(x.position.set(m.position.x,f+d*.3,m.position.z),x.rotation.copy(m.rotation),t.add(x),h<3)for(let g=0;g<3;g++){const p=g/3*Math.PI*2+h+e,y=new R(new Ve(u*.22,6,6),r);y.scale.set(1.25,.55,1),y.position.set(Math.cos(p)*u*.72,f-d*.38,Math.sin(p)*u*.72),t.add(y)}}const a=new Wt({map:Rn(),color:"#ffcf6e",transparent:!0,opacity:s?.34:0,blending:Rt,depthWrite:!1}),o=new Kt(a);o.scale.set(5.4,6.2,1),o.position.y=3.8,t.add(o);const l=[];let c=null;if(s){const h=["#ffd468","#ff3b4c","#fff4cc"];for(let d=0;d<12;d++){const f=d/12,m=d*1.45+e,x=1.45+f*5,g=1.65*(1-f*.76),p=new ke({color:h[d%h.length],toneMapped:!1});l.push(p);const y=new R(new Ve(.11,8,8),p);y.position.set(Math.cos(m)*g,x,Math.sin(m)*g),t.add(y)}c=new ke({color:"#ffe588",toneMapped:!1});const u=new R(new Oi(.26,0),c);u.position.y=7.35,t.add(u)}return{group:t,setLit(h){const u=Math.max(.06,Math.min(1,h));a.opacity=s?u*.36:0,l.forEach((d,f)=>{f%3===1?d.color.setRGB(u*1.35,u*.2,u*.26):d.color.setRGB(u*1.35,u*1.08,u*.48)}),c&&c.color.setRGB(u*1.4,u*1.2,u*.55)}}}function zy(){const s=new Oe,e=new Ee({color:"#1b2030",metalness:.75,roughness:.35}),t=[new ne(.28,0),new ne(.24,.35),new ne(.14,.9),new ne(.09,1.3),new ne(.075,4.3),new ne(.18,4.42)],n=new R(new ys(t,12),e);s.add(n);const i=new R(new Vt(.16,.045,6,12),new Ee({color:"#14452f",roughness:.8}));i.position.set(0,3.2,.1),s.add(i);const r=new R(new Ve(.065,6,6),new Ee({color:"#d91632"}));r.position.set(0,3.05,.14),s.add(r);const a=new ke({color:"#ffeaad",toneMapped:!1}),o=new R(new $e(.24,.17,.52,6),a);o.position.y=4.68,s.add(o);const l=new R(new mt(.3,.25,6),e);l.position.y=5.05,s.add(l);const c=Ta("#ffdc92",.26),h=new R(new mt(2.3,4.6,18,1,!0),c);h.position.y=2.35,s.add(h);const u=new ke({map:Rn(),color:"#ffcf76",transparent:!0,opacity:.45,blending:Rt,depthWrite:!1}),d=new R(new tn(4.4,4.4),u);d.rotation.x=-Math.PI*.5,d.position.y=.03,s.add(d);const f=new Wt({map:ju(),color:"#ffe090",transparent:!0,opacity:.28,blending:Rt,depthWrite:!1}),m=new Kt(f);return m.scale.set(2.9,.34,1),m.position.y=4.68,s.add(m),{group:s,setLit(x){const g=Math.max(.04,Math.min(1,x));a.color.setRGB(.2+g*1.15,.18+g*.98,.22+g*.52),c.uniforms.uOpacity.value=g*.26,u.opacity=g*.45,f.opacity=g*.3}}}function Gy(){const s=new Oe,e=Pn("#f4f9ff"),t=[.55,.4,.28],n=[.52,1.3,1.88];t.forEach((h,u)=>{const d=new R(new Ve(h,14,12),e);d.position.y=n[u],s.add(d)});const i=new R(new mt(.06,.26,8),new Ee({color:"#ff7a29",roughness:.5}));i.rotation.x=Math.PI*.5,i.position.set(0,1.88,.34),s.add(i);const r=new Ee({color:"#17171f",roughness:.4});for(const h of[-.1,.1]){const u=new R(new Ve(.036,8,8),r);u.position.set(h,1.97,.25),s.add(u)}const a=new Ee({color:"#d91632",roughness:.8}),o=new R(new Vt(.29,.07,8,14),a);o.rotation.x=Math.PI*.5,o.position.y=1.62,s.add(o);const l=new R(new $e(.32,.32,.05,14),r);l.position.y=2.13;const c=new R(new $e(.22,.21,.32,14),r);return c.position.y=2.3,s.add(l,c),s}function Hy(){const s=new Oe,e=new Ee({color:"#78849a",metalness:.72,roughness:.35}),t=Pn("#b8cee8");for(const u of[-1.45,1.45]){const d=new R(new $e(.08,.1,4.1,8),e);d.position.set(u,2.05,0),s.add(d)}const n=document.createElement("canvas");n.width=512,n.height=224;const i=n.getContext("2d"),r=new Ot(n);r.colorSpace=dt;const a=new R(new Se(3.8,1.68,.14),e);a.position.set(0,3.2,0);const o=new R(new Se(3.9,.16,.22),t);o.position.set(0,4.1,0),s.add(a,o);const l=new ke({map:r,toneMapped:!1});for(const u of[-1,1]){const d=new R(new tn(3.72,1.6),l);d.position.set(0,3.2,u*.08),u<0&&(d.rotation.y=Math.PI),s.add(d)}let c="";const h=(u,d,f)=>{const m=Math.round(u),x=`${m}|${d}|${f}`;if(x===c)return;c=x,i.fillStyle="#00529b",i.beginPath(),i.roundRect(4,4,504,216,16),i.fill(),i.strokeStyle="#ffffff",i.lineWidth=7,i.strokeRect(10,10,492,204);const g=f.match(/\b(E\d+|\d{2,3})\b/),p=g?g[1]:"N";i.fillStyle=p.startsWith("E")?"#0b8a3a":"#f2c12e",i.beginPath(),i.roundRect(418,22,68,34,6),i.fill(),i.strokeStyle="#ffffff",i.lineWidth=2.5,i.stroke(),i.fillStyle=p.startsWith("E")?"#ffffff":"#111827",i.font="800 20px Inter, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(p,452,40),i.textAlign="left",i.fillStyle="#ffffff",i.font="800 38px Inter, sans-serif",i.fillText(`↑  Nordpolen  ${m.toLocaleString()} km`,26,56,382),i.font="800 36px Inter, sans-serif",i.fillText(`→  ${d}`,26,112,456),i.fillStyle="#ffe588",i.font="750 32px Inter, sans-serif",i.fillText(f,26,168,456),r.needsUpdate=!0};return h(3414,"Stockholm","E4"),{group:s,setDirections:h}}function Vy(){const s=new Oe,e=new Ee({color:"#4d281a",roughness:.85}),t=Pn("#b8cee8"),n=new R(new $e(.14,.18,3.6,8),e);n.position.y=1.8,s.add(n);const i=new R(new Se(3.4,1.25,.18),e);i.position.set(0,2.75,0),s.add(i);const r=new R(new Se(3.5,.16,.26),t);r.position.set(0,3.44,0),s.add(r);const a=new R(new Ve(.14,8,8),new ke({color:"#ffe59c",toneMapped:!1}));a.position.set(-1.5,3.62,.15),s.add(a);const o=document.createElement("canvas");o.width=512,o.height=192;const l=o.getContext("2d"),c=new Ot(o);c.colorSpace=dt;const h=new Ee({map:c,emissiveMap:c,emissive:new Ue("#ffd990"),emissiveIntensity:.65,roughness:.4});for(const f of[-1,1]){const m=new R(new tn(3.2,1.12),h);m.position.set(0,2.75,f*.1),f<0&&(m.rotation.y=Math.PI),s.add(m)}let u="";const d=(f,m)=>{const x=`${f}|${m}`;if(x===u)return;u=x;const g=l.createLinearGradient(0,0,512,192);g.addColorStop(0,"#5e1020"),g.addColorStop(1,"#360914"),l.fillStyle=g,l.fillRect(0,0,512,192),l.strokeStyle="#f6cf78",l.lineWidth=8,l.strokeRect(10,10,492,172),l.fillStyle="#fff6df",l.font='800 47px "Cinzel", Georgia, serif',l.textAlign="center",l.textBaseline="middle",l.fillText(f.slice(0,22),256,72,468),l.fillStyle="#ffcf76",l.font="750 35px Inter, sans-serif",l.fillText(m.slice(0,32),256,130,468),c.needsUpdate=!0};return d("NORTH POLE","Stockholm"),{group:s,setText:d}}function Wy(s=80,e=80){const t=new ot({color:"#1b3a6b",roughness:.08,metalness:.25,clearcoat:1,clearcoatRoughness:.06,transparent:!0,opacity:0}),n=new R(new tn(s,e),t);return n.rotation.x=-Math.PI*.5,n}function Xy(){return tc()}function qy(s="coca_cola"){return ed(s)}function Ky(){return ga(!0)}let Co=null,Ro=null,Po=null,Lo=null;function Qr(s){return s.userData.shared=!0,s}function J_(){return Co||(Co=Qr(new Ee({color:"#ffd166",metalness:.88,roughness:.2}))),Ro||(Ro=Qr(new ot({color:"#dce6f5",metalness:.9,roughness:.2}))),Po||(Po=Qr(new ke({color:"#fff3c4",toneMapped:!1}))),Lo||(Lo=Qr(Pn("#9ab7df"))),{gold:Co,steel:Ro,bulb:Po,snow:Lo}}function Xs(s,e,t,n=512,i=160,r=4.6){const a=document.createElement("canvas");a.width=n,a.height=i;const o=a.getContext("2d");o.fillStyle=e,o.fillRect(0,0,n,i),o.strokeStyle=t,o.lineWidth=8,o.strokeRect(8,8,n-16,i-16),o.fillStyle=t,o.font=`700 ${Math.round(i*.4)}px "Cinzel", Georgia, serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(s,n*.5,i*.52,n-44);const l=new Ot(a);return l.colorSpace=dt,l.userData.ownedByTimeline=!0,new R(new tn(r,r*i/n),new ke({map:l,transparent:!0,toneMapped:!1,side:Jt}))}function Yy(s){s.traverse(e=>{var r;const t=e;t.geometry&&!((r=t.geometry.userData)!=null&&r.shared)&&t.geometry.dispose();const n=t.material,i=a=>{var l,c,h,u,d;if((l=a.userData)!=null&&l.shared)return;const o=a;(h=(c=o.map)==null?void 0:c.userData)!=null&&h.ownedByTimeline&&o.map.dispose(),(d=(u=o.emissiveMap)==null?void 0:u.userData)!=null&&d.ownedByTimeline&&o.emissiveMap.dispose(),a.dispose()};Array.isArray(n)?n.forEach(i):n&&i(n)}),s.clear()}function Hh(s,e,t=28){const n=e.trim();if(n.length<=t)return`${s} · ${n}`;const i=n.slice(0,t),r=i.lastIndexOf(" "),a=r>10?i.slice(0,r):i;return`${s} · ${a}…`}function jy(s,e,t,n=13.4,i){const r=K_[s],a=i??(s%2===0?-1:1),o=r.diorama==="starman"||r.diorama==="dragon_starlink",l=new Oe,c=J_(),h=5.2,u=new Oe,d=new R(new Vt(h,.17,10,30,Math.PI),c.gold);d.position.y=1.65,u.add(d);for(const p of[-h,h]){const y=new R(new $e(.42,.54,.5,10),c.snow);y.position.set(p,.24,0);const _=new R(new $e(.22,.28,1.85,8),c.gold);_.position.set(p,.9,0),u.add(y,_)}for(let p=0;p<=10;p++){const y=p/10*Math.PI,_=new R(new Ve(.15,6,6),c.bulb);_.position.set(Math.cos(y)*h,1.65+Math.sin(y)*h,.14),u.add(_)}const f=Xs(Hh(r.year,r[ma.getLocale()].title,28),"#2c0d1c","#ffd87a",640,128,6.2);f.position.set(0,h+2.25,.15),u.add(f),l.add(u);const m=new Oe;let x;if(o)m.position.set(0,0,-2);else{m.position.set(a*n,0,0),m.scale.setScalar(1.42),m.rotation.y=a>0?-.45:.45;const p=new R(new Ve(5.2,20,10,0,Math.PI*2,0,Math.PI*.5),c.snow);p.scale.set(1,.08,1),p.position.y=-.02,m.add(p);const y=new R(new $l(4.6,5.15,28),new ke({color:r.accentHex,transparent:!0,opacity:.62,side:Jt,toneMapped:!1}));y.rotation.x=-Math.PI*.5,y.position.y=.06,m.add(y);const _=new R(new mt(3.4,24,16,1,!0),Ta(r.accentHex,.18));_.rotation.x=Math.PI,_.position.set(0,12.2,0),m.add(_);const v=c.gold;for(const S of[-1.8,1.8]){const C=new R(new $e(.1,.12,4.6,8),v);C.position.set(S,2.3,-2.9),m.add(C)}const A=Xs(Hh(r.year,r[ma.getLocale()].title,26),"#1e0918",r.accentHex,640,192,4.6);A.position.set(0,4.9,-2.9),m.add(A)}const g=r.diorama;if(g==="masterplan"){const p=new R(new $e(.55,.72,3.2,16),c.gold);p.position.y=1.6;const y=Xs("SECRET MASTER PLAN","#3d101c","#ffd166",512,160,4.4);y.position.set(0,2.5,.75);const _=new R(new Oi(.85,0),new ke({color:"#ffe588",toneMapped:!1}));_.position.y=4.2,m.add(p,y,_),x=v=>{_.rotation.y=v*1.8,_.position.y=4.2+Math.sin(v*2.8)*.25}}else if(g==="roadster_f1"){const p=Il();p.scale.setScalar(1.05),p.position.set(-.9,.12,.6);const y=new R(new $e(.26,.28,4.2,12),c.steel);y.position.set(1.8,2.1,-.8);const _=new R(new mt(.26,.8,12),c.steel);_.position.set(1.8,4.6,-.8),m.add(p,y,_)}else if(g==="models_supercharger"){const p=td();p.group.scale.setScalar(.76),p.group.position.y=.1,p.group.rotation.y=a>0?-Math.PI*.25:Math.PI*.25,m.add(p.group),x=y=>p.update(y)}else if(g==="falcon_landing"){const p=Xs("LZ-1","#1a2236","#6edcff",256,128,3.6);p.rotation.x=-Math.PI*.5,p.position.y=.18;const y=new Oe,_=new R(new $e(.38,.38,5.2,14),c.steel);_.position.y=2.6;const v=new R(new $e(.4,.4,1,14),new Ee({color:"#141720"}));v.position.y=4.8,y.add(_,v);for(let S=0;S<4;S++){const C=S/4*Math.PI*2,L=new R(new Se(.14,1.25,.18),new Ee({color:"#1b202e"}));L.position.set(Math.cos(C)*.72,.45,Math.sin(C)*.72),L.rotation.z=Math.cos(C)*-.55,L.rotation.x=Math.sin(C)*.55,y.add(L)}const A=new R(new mt(.5,2,12),new ke({color:"#ffbd55",transparent:!0,opacity:.85,toneMapped:!1}));A.rotation.x=Math.PI,A.position.y=-.9,y.add(A),m.add(p,y),x=(S,C,L)=>{const b=Math.max(0,1-L*1.15);y.position.y=.22+b*b*9.5,A.visible=b>.06}}else if(g==="boring"){const p=new R(new Vt(2.6,.48,12,24),new ot({color:"#d91632",clearcoat:.9}));p.position.y=2.8;const y=new Oe;y.position.y=2.8;for(let _=0;_<6;_++){const v=new R(new Se(.32,4.6,.24),c.gold);v.rotation.z=_/6*Math.PI,y.add(v)}m.add(p,y),x=_=>{y.rotation.z=_*1.9}}else if(g==="prod_hell"){const p=$_(7);p.group.scale.setScalar(1),p.group.position.y=.08,p.setLit(1),m.add(p.group),x=(y,_)=>p.update(_,y)}else if(g==="starman"){const p=Il();p.scale.setScalar(1.25),p.position.set(0,8.8,0),m.add(p),x=(y,_,v)=>{const A=(v-.5)*18;p.position.set(A,8.6+Math.cos(v*Math.PI-Math.PI*.5)*2.2,0),p.rotation.z=.22,p.rotation.y=Math.sin(y*.6)*.15}}else if(g==="funding_420"){const p=Xs("$420 · FUNDING SECURED","#0e3a28","#48e59b",512,176,4.8);p.position.set(0,3.6,0);const y=new R(new Ve(.95,16,16),c.gold);y.position.y=1.3;const _=new Kt(new Wt({map:Rn(),color:"#48e59b",transparent:!0,opacity:.58,blending:Rt,depthWrite:!1}));_.scale.set(8.5,6.2,1),_.position.y=3.2;const v=[new E(-3.4,.7,.5),new E(-1.7,1.8,.5),new E(0,3.9,.5),new E(1.7,3.1,.5),new E(3.4,5.1,.5)],A=new R(new gi(new Ni(v),24,.14,8,!1),new ke({color:"#48e59b",toneMapped:!1}));m.add(p,y,_,A),x=S=>{y.position.y=1.3+Math.sin(S*4)*.2}}else if(g==="armor_glass"){const p=ga(!1);p.group.scale.setScalar(1.1),p.group.position.y=.08;const y=new R(new Ve(.32,12,12),c.steel),_=new R(new Oi(.28,0),new ke({color:"#d8f4ff",wireframe:!0,toneMapped:!1}));_.position.set(1.25,1.72,-.85),m.add(p.group,y,_),x=v=>{p.update(v*4,v),y.position.set(1.75+Math.abs(Math.sin(v*3.5))*1.4,1.72,-.85)}}else if(g==="dragon_starlink"){const p=new R(new mt(1.1,2.2,16),c.steel);p.position.set(-4.5,8.6,0),p.rotation.z=-.35;const y=new Oe;y.position.set(0,10.2,0);for(let _=0;_<16;_++){const v=new R(new Se(.45,.1,.25),new ke({color:_%3===0?"#ffe082":"#9ee8ff",toneMapped:!1}));v.position.set(-9+_*1.25,Math.sin(_*.45)*.65,0),y.add(v)}m.add(p,y),x=_=>{y.position.y=10+Math.sin(_*1.4)*.35}}else if(g==="semi_x"){const p=ed("coca_cola");p.group.scale.setScalar(.62),p.group.position.set(-.4,.08,-.4);const y=new ke({color:"#eef6ff",toneMapped:!1}),_=new R(new Se(.32,3.2,.32),y);_.rotation.z=.72;const v=new R(new Se(.32,3.2,.32),y);v.rotation.z=-.72;const A=new Oe;A.add(_,v),A.position.set(2.4,4.2,0),m.add(p.group,A),x=(S,C)=>{p.update(C,S*8,!1,0,S),A.rotation.y=S*1.2}}else if(g==="cyber_starship"){const p=ga(!0);p.group.scale.setScalar(.95),p.group.position.set(-1.6,.08,.8);const y=Ll();y.scale.setScalar(.4),y.position.set(2.1,4.2,-.8),m.add(p.group,y),x=_=>p.update(_*4,_)}else if(g==="mechazilla"){const p=new Ee({color:"#2b3242",metalness:.7,roughness:.4}),y=new R(new Se(1.15,7.6,1.15),p);y.position.set(-1.9,3.8,0);const _=new R(new Se(2.6,.24,.28),c.gold),v=new R(new Se(2.6,.24,.28),c.gold);_.position.set(-.3,6,-.58),v.position.set(-.3,6,.58);const A=Ll();A.scale.setScalar(.34),A.position.set(.5,3.6,0),m.add(y,_,v,A),x=(S,C,L)=>{const b=Math.sin(S*2.2)*.35+(1-Math.min(1,L*1.2))*2.6;A.position.y=3.6+b;const M=Math.sin(S*1.6)*.16;_.rotation.y=M,v.rotation.y=-M}}else{const p=tc();p.group.scale.setScalar(1.65),p.group.position.set(-1.9,.08,.8);const y=new R(new Dt(.88,2,6,12),c.gold);y.rotation.z=Math.PI*.5,y.scale.set(.8,1,1.15),y.position.set(.9,.96,.6);const _=new R(new Ve(1.35,18,18),new Ee({color:"#d85432",emissive:"#942812",emissiveIntensity:.65}));_.position.set(1.5,4.6,-1.6),m.add(p.group,y,_),x=v=>p.update(v)}return l.add(m),l.position.set(t(e),0,e),{milestoneIndex:s,root:l,spectacle:m,side:a,isOverhead:o,zOffset:e,announced:!1,updater:x}}function Vh(s,e,t,n){const r=(t-s)*Math.PI/180,a=(n-e)*Math.PI/180,o=Math.sin(r/2)**2+Math.cos(s*Math.PI/180)*Math.cos(t*Math.PI/180)*Math.sin(a/2)**2;return 6371*2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))}function Wh(s,e,t,n){const i=s*Math.PI/180,r=t*Math.PI/180,a=(n-e)*Math.PI/180,o=Math.sin(a)*Math.cos(r),l=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(a);return(Math.atan2(o,l)*180/Math.PI+360)%360}function Q_(s){if(!s)return{label:"T-12h 40m",isToday:!1};const e=Date.parse(s);if(!Number.isFinite(e))return{label:"T-12h 40m",isToday:!1};const t=Math.round((e-Date.now())/1e3),i=Math.abs(t)/3600<=18;if(t<=0){const l=Math.round(Math.abs(t)/60);return{label:l<90?`T+${l}m LIVE!`:"LIFTOFF!",isToday:i}}const r=Math.floor(t/86400),a=Math.floor(t%86400/3600),o=Math.floor(t%3600/60);return r>0?{label:`T-${r}d ${a}h`,isToday:!1}:{label:`T-${a}h ${String(o).padStart(2,"0")}m`,isToday:i}}const ey=[{callsign:"SK142",altitudeM:9400,headingDeg:12,groundspeedKts:445,bearingDeg:325,distanceKm:18,isLive:!1},{callsign:"DY4012",altitudeM:8100,headingDeg:295,groundspeedKts:410,bearingDeg:42,distanceKm:26,isLive:!1}];class Zy{constructor(){B(this,"lastLat",59.3322);B(this,"lastLon",18.0815);B(this,"lastKpFetchMs",0);B(this,"lastIssFetchMs",0);B(this,"lastSpaceXFetchMs",0);B(this,"lastFlightsFetchMs",0);B(this,"kpIndex",3.3);B(this,"kpLive",!1);B(this,"issLat",51.5);B(this,"issLon",10.2);B(this,"issVelocityKmh",27600);B(this,"issLive",!1);B(this,"nextSpaceXName","Falcon 9 · Starlink Holiday");B(this,"nextSpaceXNetIso",null);B(this,"spaceXLive",!1);B(this,"aircraft",[]);B(this,"gpsFlights",!1);B(this,"flightRequest",0);B(this,"flightsLive",!1)}async fetchJson(e,t=8e3){const n=new AbortController,i=window.setTimeout(()=>n.abort(),t);try{const r=await fetch(e,{signal:n.signal});return r.ok?await r.json():null}catch{return null}finally{window.clearTimeout(i)}}refreshKp(e){this.lastKpFetchMs!==0&&e-this.lastKpFetchMs<900*1e3||(this.lastKpFetchMs=e,this.fetchJson("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",7e3).then(t=>{if(!Array.isArray(t)||t.length===0)return;const n=t[t.length-1];let i=NaN;if(n&&typeof n=="object"&&!Array.isArray(n)){const r=n.Kp;i=Number(r)}else Array.isArray(n)&&n.length>=2&&(i=Number(n[1]));Number.isFinite(i)&&i>=0&&i<=9.5&&(this.kpIndex=Math.round(i*10)/10,this.kpLive=!0)}))}refreshIss(e){this.lastIssFetchMs!==0&&e-this.lastIssFetchMs<45*1e3||(this.lastIssFetchMs=e,this.fetchJson("https://api.wheretheiss.at/v1/satellites/25544",6500).then(t=>{t&&typeof t.latitude=="number"&&typeof t.longitude=="number"&&Number.isFinite(t.latitude)&&Number.isFinite(t.longitude)&&(this.issLat=t.latitude,this.issLon=t.longitude,typeof t.velocity=="number"&&Number.isFinite(t.velocity)&&(this.issVelocityKmh=Math.round(t.velocity)),this.issLive=!0)}))}refreshSpaceX(e){this.lastSpaceXFetchMs!==0&&e-this.lastSpaceXFetchMs<1800*1e3||(this.lastSpaceXFetchMs=e,this.fetchJson("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?search=SpaceX&limit=1",8e3).then(t=>{var i;const n=(i=t==null?void 0:t.results)==null?void 0:i[0];n&&(typeof n.name=="string"&&n.name.trim()&&(this.nextSpaceXName=n.name.trim().slice(0,38)),typeof n.net=="string"&&(this.nextSpaceXNetIso=n.net),this.spaceXLive=!0)}))}refreshFlights(e){if(e-this.lastFlightsFetchMs<2e4)return;this.lastFlightsFetchMs=e;const t=++this.flightRequest,n=`https://api.adsb.lol/v2/lat/${this.lastLat.toFixed(3)}/lon/${this.lastLon.toFixed(3)}/dist/60`;this.fetchJson(n).then(i=>{t===this.flightRequest&&(this.flightsLive=Array.isArray(i==null?void 0:i.ac),this.aircraft=(i==null?void 0:i.ac)??[])})}update(e,t,n,i){this.gpsFlights!==n&&(this.flightRequest++,this.lastFlightsFetchMs=0,this.aircraft=[],this.flightsLive=!1),this.gpsFlights=n,this.lastLat=e,this.lastLon=t;const r=Date.now();this.refreshKp(r),this.refreshIss(r),this.refreshSpaceX(r),n&&i&&this.refreshFlights(r)}getState(){var u;const e=this.lastLat,t=this.lastLon,n=Math.round(Vh(e,t,this.issLat,this.issLon)),i=Math.round(Wh(e,t,this.issLat,this.issLon)),r=n<=2600||!this.issLive,a=Q_(this.nextSpaceXNetIso),o=[];for(const d of this.aircraft){if(!Number.isFinite(d.lat)||!Number.isFinite(d.lon)||typeof d.alt_baro!="number"||!d.hex||(d.seen_pos??0)>60)continue;const f=Vh(e,t,d.lat,d.lon);f>111.2||o.push({callsign:((u=d.flight)==null?void 0:u.trim())||d.r||d.hex,hex:d.hex,aircraft:d.t,registration:d.r,altitudeM:Math.round(d.alt_baro*.3048),groundspeedKts:d.gs??0,headingDeg:d.track??0,bearingDeg:Wh(e,t,d.lat,d.lon),distanceKm:f,isLive:!0})}const l=this.gpsFlights?o.sort((d,f)=>d.distanceKm-f.distanceKm):ey,c=this.kpIndex>=4,h=Math.max(.75,Math.min(2.15,.72+this.kpIndex*.2));return{kpIndex:this.kpIndex,auroraLiveBoost:h,isAuroraAlert:c,kpLive:this.kpLive,issLat:this.issLat,issLon:this.issLon,issDistanceKm:n,issBearingDeg:i,issVelocityKmh:this.issVelocityKmh,issNearby:r,issLive:this.issLive,nextSpaceXName:this.nextSpaceXName,nextSpaceXNetIso:this.nextSpaceXNetIso,nextSpaceXCountdown:a.label,nextSpaceXLaunchToday:a.isToday,spaceXLive:this.spaceXLive,flights:l,flightsLive:this.flightsLive&&o.length>0}}}const ty=59.3293,ny=18.0686;function Zs(s,e,t){return Math.max(e,Math.min(t,s))}function Vn(s,e,t){return s+(e-s)*t}function ea(s,e,t){const n=Zs((t-s)/(e-s),0,1);return n*n*(3-2*n)}function iy(s,e){return(s-e+540)%360-180}function sy(s){return Math.max(0,(90-s)*111.32)}class $y{constructor(e="demo"){B(this,"source","demo");B(this,"gpsStatus","off");B(this,"watchId",null);B(this,"rawSpeedKmh",0);B(this,"smoothedSpeedKmh",0);B(this,"prevSmoothedSpeedMs",0);B(this,"smoothedAccel",0);B(this,"rawTurnRate",0);B(this,"smoothedTurnRate",0);B(this,"headingDeg",18);B(this,"prevGpsHeadingDeg",null);B(this,"prevGpsTimeMs",null);B(this,"lastGpsFixMs",0);B(this,"wasMovingBeforeGpsLoss",!1);B(this,"gpsUnavailableError",!1);B(this,"latitude",ty);B(this,"longitude",ny);B(this,"accuracyMeters",null);B(this,"manualSpeedKmh",58);B(this,"manualTurnRate",0);B(this,"demoElapsed",0);B(this,"totalElapsed",0);B(this,"tripKm",0);B(this,"forceTunnel",!1);B(this,"tunnelBlend",0);this.setSource(e)}getSource(){return this.source}setSource(e){this.source===e&&(e!=="gps"||this.watchId!==null)||(this.source=e,e==="gps"?this.startGpsWatch():(this.stopGpsWatch(),this.gpsUnavailableError=!1))}setManualSpeed(e){this.manualSpeedKmh=Zs(e,0,160)}getManualSpeed(){return this.manualSpeedKmh}setManualTurn(e){this.manualTurnRate=Zs(e,-1,1)}getManualTurn(){return this.manualTurnRate}setForceTunnel(e){this.forceTunnel=e}getForceTunnel(){return this.forceTunnel}startGpsWatch(){if(typeof navigator>"u"||!("geolocation"in navigator)){this.gpsStatus="error";return}this.watchId===null&&(this.gpsStatus="searching",this.lastGpsFixMs=performance.now(),this.gpsUnavailableError=!1,this.watchId=navigator.geolocation.watchPosition(e=>this.handleGpsPosition(e),e=>this.handleGpsError(e),{enableHighAccuracy:!0,maximumAge:1e3,timeout:8e3}))}stopGpsWatch(){this.watchId!==null&&typeof navigator<"u"&&"geolocation"in navigator&&navigator.geolocation.clearWatch(this.watchId),this.watchId=null,this.gpsStatus="off"}handleGpsPosition(e){const t=performance.now(),{latitude:n,longitude:i,speed:r,accuracy:a}=e.coords;let o=e.coords.heading;const l=(i-this.longitude)*111320*Math.cos(n*Math.PI/180),c=(n-this.latitude)*110540,h=Math.hypot(l,c),u=(t-this.lastGpsFixMs)/1e3,d=this.gpsStatus==="active"&&u>.2&&u<20&&h>Math.max(3,a*.6)&&h/u<80;!Number.isFinite(o)&&d&&(o=Math.atan2(l,c)*180/Math.PI),this.latitude=n,this.longitude=i,this.accuracyMeters=Number.isFinite(a)?a:null,this.gpsStatus="active",this.gpsUnavailableError=!1;const f=r!==null&&Number.isFinite(r)&&r>=0?r*3.6:d?h/u*3.6:0;if(this.rawSpeedKmh=f,f>15?this.wasMovingBeforeGpsLoss=!0:f<3&&(this.wasMovingBeforeGpsLoss=!1),o!==null&&Number.isFinite(o)&&f>3){if(this.prevGpsHeadingDeg!==null&&this.prevGpsTimeMs!==null){const m=Math.max(.2,(t-this.prevGpsTimeMs)/1e3),g=iy(o,this.prevGpsHeadingDeg)/m;this.rawTurnRate=Zs(g/18,-1,1)}this.prevGpsHeadingDeg=o,this.prevGpsTimeMs=t,this.headingDeg=(o%360+360)%360}else this.rawTurnRate=0;this.lastGpsFixMs=t}handleGpsError(e){e.code===e.PERMISSION_DENIED?(this.gpsStatus="error",this.gpsUnavailableError=!1):(this.gpsStatus=this.wasMovingBeforeGpsLoss?"searching":"error",this.wasMovingBeforeGpsLoss&&(this.gpsUnavailableError=!0))}sampleDemoDrive(e){const t=e%90;let n=0,i=0;if(t<6)n=0,i=0;else if(t<24){const r=ea(6,16,t);n=Vn(0,46,r)+Math.sin(t*.9)*2.5,i=Math.sin((t-6)*.55)*.52}else if(t<46){const r=ea(24,34,t);n=Vn(46,75,r)+Math.sin(t*.6)*3,i=Math.sin((t-18)*.36)*.44}else if(t<70){const r=ea(46,54,t);n=Vn(75,112,r)+Math.sin(t*.45)*3.5,i=Math.sin((t-40)*.25)*.28}else if(t<84){const r=ea(70,82,t);n=Vn(112,0,r),i=(1-r)*Math.sin(t*.5)*.3}else n=0,i=0;return{speedKmh:Math.max(0,n),turnRate:i}}update(e){const t=Math.min(Math.max(e,.001),.05);if(this.totalElapsed+=t,this.source==="demo"){this.demoElapsed+=t;const m=this.sampleDemoDrive(this.demoElapsed);this.rawSpeedKmh=m.speedKmh,this.rawTurnRate=m.turnRate,this.headingDeg=((this.headingDeg+m.turnRate*14*t)%360+360)%360}else this.source==="manual"?(this.rawSpeedKmh=this.manualSpeedKmh,this.rawTurnRate=this.manualTurnRate,this.headingDeg=((this.headingDeg+this.manualTurnRate*22*t)%360+360)%360):this.source==="gps"&&performance.now()-this.lastGpsFixMs>2200&&(this.rawTurnRate=Vn(this.rawTurnRate,0,t*1.5));const n=1-Math.exp(-t*4.5),i=1-Math.exp(-t*5);this.smoothedSpeedKmh=Vn(this.smoothedSpeedKmh,this.rawSpeedKmh,n),this.smoothedTurnRate=Vn(this.smoothedTurnRate,this.rawTurnRate,i);const r=this.smoothedSpeedKmh/3.6,a=(r-this.prevSmoothedSpeedMs)/t;this.prevSmoothedSpeedMs=r;const o=1-Math.exp(-t*5.5);this.smoothedAccel=Vn(this.smoothedAccel,Zs(a,-8,8),o),this.tripKm+=this.smoothedSpeedKmh/3600*t;let l=!1;this.source==="gps"&&this.wasMovingBeforeGpsLoss&&(performance.now()-this.lastGpsFixMs>4500||this.gpsUnavailableError)&&(l=!0);const c=this.forceTunnel||l?1:0,h=1-Math.exp(-t*2.4);this.tunnelBlend=Vn(this.tunnelBlend,c,h),this.tunnelBlend<.002&&c===0&&(this.tunnelBlend=0);const u=sy(this.latitude),d=((0-this.headingDeg)%360+360)%360,f=this.computeReindeerGear(this.smoothedSpeedKmh);return{source:this.source,gpsStatus:this.gpsStatus,speedKmh:this.smoothedSpeedKmh,rawSpeedKmh:this.rawSpeedKmh,acceleration:this.smoothedAccel,turnRate:this.smoothedTurnRate,headingDeg:this.headingDeg,latitude:this.latitude,longitude:this.longitude,accuracyMeters:this.accuracyMeters,northPoleDistanceKm:u,northPoleRelativeBearingDeg:d,isMoving:this.smoothedSpeedKmh>1.8,isAccelerating:this.smoothedAccel>.65,isBraking:this.smoothedAccel<-.75,isPlaidSpeed:this.smoothedSpeedKmh>=85,tripKm:this.tripKm,tunnelBlend:this.tunnelBlend,inTunnel:this.tunnelBlend>.35,forceTunnel:this.forceTunnel,reindeerGearKey:f,elapsedSec:this.totalElapsed}}computeReindeerGear(e){return e<2?"park":e<22?"trot":e<45?"dash":e<68?"prance":e<88?"comet":e<110?"blitzen":"plaid"}dispose(){this.stopGpsWatch()}}class ry extends Pu{constructor(){super();const e=new Se;e.deleteAttribute("uv");const t=new Ee({side:Yt}),n=new Ee,i=new pa(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new R(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new R(e,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new R(e,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new R(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new R(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new R(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new R(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const d=new R(e,as(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const f=new R(e,as(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);const m=new R(e,as(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const x=new R(e,as(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const g=new R(e,as(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const p=new R(e,as(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function as(s){const e=new ke;return e.color.setScalar(s),e}const nd={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Rs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ay=new ya(-1,1,1,-1,0,1);class oy extends _t{constructor(){super(),this.setAttribute("position",new je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new je([0,2,0,0,2,0],2))}}const ly=new oy;class nc{constructor(e){this._mesh=new R(ly,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ay)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class cy extends Rs{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ht?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ar.clone(e.uniforms),this.material=new Ht({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new nc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Xh extends Rs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class hy extends Rs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class uy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new Sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Zn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cy(nd),this.copyPass.material.blending=jn,this.clock=new Sv}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Xh!==void 0&&(a instanceof Xh?n=!0:a instanceof hy&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const dy={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class fy extends Rs{constructor(){super();const e=dy;this.uniforms=ar.clone(e.uniforms),this.material=new tv({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new nc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ut.getTransfer(this._outputColorSpace)===yt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===$h?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Nl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Jh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Qh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class py extends Rs{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ue}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const my={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ue(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ws extends Rs{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new Ue(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Sn(r,a,{type:Zn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Sn(r,a,{type:Zn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new Sn(r,a,{type:Zn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=my;this.highPassUniforms=ar.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ht({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ne(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=nd;this.copyUniforms=ar.clone(h.uniforms),this.blendMaterial=new Ht({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Rt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ue,this.oldClearAlpha=1,this.basic=new ke,this.fsQuad=new nc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new ne(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ws.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ws.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ht({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Ht({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ws.BlurDirectionX=new ne(1,0);ws.BlurDirectionY=new ne(0,1);class gy{constructor(e,t={}){B(this,"renderer");B(this,"scene");B(this,"camera");B(this,"composer");B(this,"bloomPass");B(this,"hemiLight");B(this,"moonKeyLight");B(this,"rimLight");B(this,"baseBloomStrength");B(this,"baseExposure");B(this,"fogTargetColor",new Ue("#0c1b42"));B(this,"envRenderTarget");B(this,"quality","ultra");B(this,"curWidth");B(this,"curHeight");this.curWidth=Math.max(1,e.clientWidth||window.innerWidth),this.curHeight=Math.max(1,e.clientHeight||window.innerHeight),this.quality=t.initialQuality??"ultra",this.renderer=new gx({antialias:!0,powerPreference:"high-performance",alpha:!1});const n=this.getTargetDpr();this.renderer.setPixelRatio(n),this.renderer.setSize(this.curWidth,this.curHeight),this.baseExposure=t.exposure??1.02,this.baseBloomStrength=t.bloomStrength??.42,this.renderer.toneMapping=Nl,this.renderer.toneMappingExposure=this.baseExposure,this.renderer.outputColorSpace=dt,this.renderer.domElement.className="scene-canvas",e.appendChild(this.renderer.domElement),this.scene=new Pu,this.scene.background=new Ue("#050b1f"),t.fogDensity&&t.fogDensity>0&&(this.scene.fog=new ha(t.fogColor??"#081436",t.fogDensity));const i=new xl(this.renderer),r=new ry;this.envRenderTarget=i.fromScene(r,.04),this.scene.environment=this.envRenderTarget.texture,this.scene.environmentIntensity=.36,r.dispose(),i.dispose(),this.camera=new $t(t.fov??50,this.curWidth/this.curHeight,t.near??.2,t.far??450),this.hemiLight=new gv("#7ba8ef","#111b3a",.56),this.scene.add(this.hemiLight),this.moonKeyLight=new wl("#ffdfae",.88),this.moonKeyLight.position.set(28,42,-32),this.scene.add(this.moonKeyLight),this.rimLight=new wl("#54d8c5",.42),this.rimLight.position.set(-28,18,-45),this.scene.add(this.rimLight),this.composer=new uy(this.renderer),this.composer.setPixelRatio(n),this.composer.setSize(this.curWidth,this.curHeight);const a=new py(this.scene,this.camera);this.composer.addPass(a),this.bloomPass=new ws(new ne(Math.max(1,Math.floor(this.curWidth*.5)),Math.max(1,Math.floor(this.curHeight*.5))),this.baseBloomStrength,t.bloomRadius??.5,t.bloomThreshold??.8),this.composer.addPass(this.bloomPass);const o=new fy;this.composer.addPass(o),this.setQuality(this.quality)}setAtmosphere(e,t,n){const i=An.clamp(e,0,1),r=An.clamp(t,0,1);this.hemiLight.intensity=.56+i*.72+r*.16,this.moonKeyLight.intensity=.88+i*.95+r*.25,i>.65?this.moonKeyLight.color.set("#fff3db"):r>.4?this.moonKeyLight.color.set("#ffb88c"):this.moonKeyLight.color.set("#ffdfae"),this.rimLight.intensity=.42+r*.24-i*.15,this.scene.fog instanceof ha&&(this.fogTargetColor.set(n),this.scene.fog.color.lerp(this.fogTargetColor,.12)),this.bloomPass.strength=Math.max(.18,this.baseBloomStrength*(1-i*.52)),this.renderer.toneMappingExposure=this.baseExposure+i*.08}getTargetDpr(){const e=this.quality==="eco"?1.1:1.5;return Math.min(window.devicePixelRatio||1,e)}setQuality(e){if(this.quality===e&&this.bloomPass.enabled===(e==="ultra"))return;this.quality=e;const t=this.getTargetDpr();this.renderer.setPixelRatio(t),this.composer.setPixelRatio(t),this.bloomPass.enabled=e==="ultra",this.resize(this.curWidth,this.curHeight)}resize(e,t){this.curWidth=Math.max(1,e),this.curHeight=Math.max(1,t),this.camera.aspect=this.curWidth/this.curHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.curWidth,this.curHeight),this.composer.setSize(this.curWidth,this.curHeight),this.bloomPass.resolution.set(Math.max(1,Math.floor(this.curWidth*.5)),Math.max(1,Math.floor(this.curHeight*.5)))}render(){this.quality==="ultra"?this.composer.render():this.renderer.render(this.scene,this.camera)}dispose(){this.scene.traverse(e=>{const t=e;t.geometry&&t.geometry.dispose();const n=t.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.envRenderTarget.dispose(),this.bloomPass.dispose(),this.composer.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}function Jy(s,e={}){try{return{stage:new gy(s,e),fallbackEl:null}}catch{const t=ma.t(),n=document.createElement("div");return n.className="webgl-fallback",n.innerHTML=`<div class="webgl-fallback-card"><h2>${t.webglFallbackTitle}</h2><p>${t.webglFallbackText}</p></div>`,s.appendChild(n),{stage:null,fallbackEl:n}}}const qh=s=>[s==null?void 0:s.municipality,(s==null?void 0:s.iata_code)||(s==null?void 0:s.icao_code)].filter(Boolean).join(" · ")||"Okänd";class Qy{constructor(e){B(this,"root",document.createElement("div"));B(this,"panel",document.createElement("section"));B(this,"buttons",new Map);B(this,"flights",new Map);B(this,"poleKm",0);B(this,"selected","");B(this,"routes",new Map);this.root.className="flight-stars",this.panel.className="flight-details",this.panel.hidden=!0,this.panel.setAttribute("aria-live","polite");for(const t of["pointerdown","pointerup","click"])this.root.addEventListener(t,n=>n.stopPropagation());this.root.append(this.panel),e.append(this.root)}button(e,t){let n=this.buttons.get(e);return n||(n=document.createElement("button"),n.className="flight-star",n.textContent=e==="pole"?"✧ N":"✦",n.onclick=()=>{this.show(e)},n.addEventListener("pointerdown",i=>{i.button===0&&i.isPrimary&&i.currentTarget.setPointerCapture(i.pointerId)}),this.root.append(n),this.buttons.set(e,n)),n.setAttribute("aria-label",t),n.title=t,n}async show(e){var l;const t=this.flights.get(e);if(!t&&e!=="pole")return;this.selected=e,this.panel.hidden=!1;const n=document.createElement("button");n.textContent="Stäng ×",n.onclick=()=>{var c;this.selected="",this.panel.hidden=!0,(c=this.buttons.get(e))==null||c.focus()};const i=document.createElement("strong");i.textContent=t?[t.callsign,t.aircraft,t.registration].filter(Boolean).join(" · "):"Nordpolen";const r=document.createElement("div");r.textContent=t?`${t.isLive?"ADS-B":"Demoflyg"} · ${t.altitudeM} m · ${Math.round(t.distanceKm)} km från dig`:"Geografisk nord · 90° N";const a=document.createElement("div");a.textContent=`Från dig till Nordpolen: ${this.poleKm.toLocaleString("sv-SE")} km`;const o=document.createElement("div");if(this.panel.replaceChildren(n,i,r,o,a),!!t){if(!t.isLive){o.textContent=e==="SK142"?"Demorutt: Stockholm → Köpenhamn":"Demorutt: Oslo → Stockholm";return}if(o.textContent=this.routes.get(t.callsign)||"Hämtar avreseort och destination…",!this.routes.has(t.callsign))try{const c=await fetch("https://api.adsbdb.com/v0/callsign/"+encodeURIComponent(t.callsign),{signal:AbortSignal.timeout(6500)});if(!c.ok)throw new Error;const h=(l=(await c.json()).response)==null?void 0:l.flightroute;if(!h)throw new Error;const u=`Från ${qh(h.origin)} → ${qh(h.destination)}`;this.routes.set(t.callsign,u),o.textContent=u}catch{o.textContent="Avreseort och destination saknas i ruttregistret."}}}update(e,t,n){this.poleKm=Math.round(t.northPoleDistanceKm),this.flights.clear();const i=this.button("pole","Visa Nordpolen");i.classList.add("pole-star"),i.hidden=!!n;for(const r of e){const a=r.hex||r.callsign;this.flights.set(a,r);const o=this.button(a,"Visa flyg "+r.callsign);if(n){o.classList.add("starman-marker");let h=o.querySelector("span");h||(h=document.createElement("span"),o.replaceChildren(h)),h.textContent!==r.callsign&&(h.textContent=r.callsign);const u=n(r);o.hidden=!u.visible,o.style.left=u.x+"%",o.style.top=u.y+"%",u.width!==void 0&&(o.style.width=u.width+"%"),u.height!==void 0&&(o.style.height=u.height+"%");continue}const l=r.isLive?(r.bearingDeg-t.headingDeg+540)%360-180:(r.bearingDeg+180)%360-180;o.hidden=Math.abs(l)>85,o.style.left=50+l*.54+"%";const c=Math.atan2(r.altitudeM,Math.max(1,r.distanceKm*1e3));o.style.top=Math.max(12,35-c*30)+"%"}for(const[r,a]of this.buttons)r==="pole"||this.flights.has(r)||(a.remove(),this.buttons.delete(r),this.selected===r&&(this.panel.hidden=!0,this.selected=""))}dispose(){this.root.remove()}}export{Dy as $,Ve as A,_t as B,Ue as C,Jt as D,K_ as E,je as F,Oe as G,by as H,$e as I,mt as J,Vt as K,Iy as L,An as M,Sa as N,Rn as O,Oy as P,yi as Q,_a as R,Kt as S,_y as T,Rt as U,E as V,tn as W,ur as X,dr as Y,Ot as Z,dt as _,R as a,Xu as a0,At as a1,_i as a2,Fy as a3,Mx as a4,Ft as a5,yy as a6,Kl as a7,Jy as a8,By as a9,ql as aA,Gu as aB,td as aC,tc as aD,Hy as aE,pa as aF,ys as aG,jv as aH,ga as aa,Il as ab,Ry as ac,Ly as ad,wl as ae,od as af,Qy as ag,Ln as ah,$y as ai,Ay as aj,Zy as ak,Dt as al,ot as am,Py as an,Pn as ao,qy as ap,Ky as aq,Gy as ar,Xy as as,$_ as at,zy as au,ky as av,Wy as aw,Vy as ax,mi as ay,Oi as az,ke as b,jy as c,Yy as d,Ee as e,n_ as f,Tl as g,Se as h,ma as i,Ty as j,Ey as k,Cy as l,wy as m,ed as n,Wt as o,Uy as p,Zu as q,Sy as r,Ny as s,vy as t,My as u,ne as v,Pi as w,Zv as x,Qn as y,$v as z};

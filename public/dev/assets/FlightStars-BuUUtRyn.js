var qu=Object.defineProperty;var Ku=(s,e,t)=>e in s?qu(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var k=(s,e,t)=>Ku(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sl="170",ly={ROTATE:0,DOLLY:1,PAN:2},cy={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yu=0,ql=1,ju=2,Nh=1,Zu=2,Gn=3,jn=0,qt=1,an=2,qn=0,ls=1,Rt=2,Kl=3,Yl=4,$u=5,Li=100,Ju=101,Qu=102,ed=103,td=104,nd=200,id=201,sd=202,rd=203,ba=204,wa=205,od=206,ad=207,ld=208,cd=209,hd=210,ud=211,dd=212,fd=213,pd=214,Ta=0,Ea=1,Aa=2,ds=3,Ca=4,Ra=5,Pa=6,La=7,Uh=0,md=1,gd=2,gi=0,Fh=1,Oh=2,Bh=3,bl=4,xd=5,kh=6,zh=7,jl="attached",_d="detached",Gh=300,fs=301,ps=302,Ia=303,Da=304,po=306,Zn=1e3,pi=1001,oo=1002,Jt=1003,Hh=1004,Ws=1005,ln=1006,Qr=1007,Wn=1008,$n=1009,Vh=1010,Wh=1011,er=1012,wl=1013,Ni=1014,Mn=1015,Kn=1016,Tl=1017,El=1018,ms=1020,Xh=35902,qh=1021,Kh=1022,fn=1023,Yh=1024,jh=1025,cs=1026,gs=1027,Al=1028,Cl=1029,Zh=1030,Rl=1031,Pl=1033,eo=33776,to=33777,no=33778,io=33779,Na=35840,Ua=35841,Fa=35842,Oa=35843,Ba=36196,ka=37492,za=37496,Ga=37808,Ha=37809,Va=37810,Wa=37811,Xa=37812,qa=37813,Ka=37814,Ya=37815,ja=37816,Za=37817,$a=37818,Ja=37819,Qa=37820,el=37821,so=36492,tl=36494,nl=36495,$h=36283,il=36284,sl=36285,rl=36286,tr=2300,nr=2301,So=2302,Zl=2400,$l=2401,Jl=2402,vd=2500,yd=0,Jh=1,ol=2,Md=3200,Sd=3201,Qh=0,bd=1,fi="",dt="srgb",Qt="srgb-linear",mo="linear",vt="srgb",Bi=7680,Ql=519,wd=512,Td=513,Ed=514,eu=515,Ad=516,Cd=517,Rd=518,Pd=519,al=35044,hy=35048,ec="300 es",Xn=2e3,ao=2001;class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const js=Math.PI/180,xs=180/Math.PI;function pn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[s&255]+Vt[s>>8&255]+Vt[s>>16&255]+Vt[s>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function Ut(s,e,t){return Math.max(e,Math.min(t,s))}function Ll(s,e){return(s%e+e)%e}function Ld(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Id(s,e,t){return s!==e?(t-s)/(e-s):0}function Zs(s,e,t){return(1-t)*s+t*e}function Dd(s,e,t,n){return Zs(s,e,1-Math.exp(-t*n))}function Nd(s,e=1){return e-Math.abs(Ll(s,e*2)-e)}function Ud(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Fd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Od(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Bd(s,e){return s+Math.random()*(e-s)}function kd(s){return s*(.5-Math.random())}function zd(s){s!==void 0&&(tc=s);let e=tc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gd(s){return s*js}function Hd(s){return s*xs}function Vd(s){return(s&s-1)===0&&s!==0}function Wd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Xd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function qd(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function yt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const _i={DEG2RAD:js,RAD2DEG:xs,generateUUID:pn,clamp:Ut,euclideanModulo:Ll,mapLinear:Ld,inverseLerp:Id,lerp:Zs,damp:Dd,pingpong:Nd,smoothstep:Ud,smootherstep:Fd,randInt:Od,randFloat:Bd,randFloatSpread:kd,seededRandom:zd,degToRad:Gd,radToDeg:Hd,isPowerOfTwo:Vd,ceilPowerOfTwo:Wd,floorPowerOfTwo:Xd,setQuaternionFromProperEuler:qd,normalize:yt,denormalize:yn};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e,t,n,i,r,o,a,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],x=i[0],m=i[3],g=i[6],y=i[1],v=i[4],_=i[7],C=i[2],T=i[5],A=i[8];return r[0]=o*x+a*y+l*C,r[3]=o*m+a*v+l*T,r[6]=o*g+a*_+l*A,r[1]=c*x+h*y+u*C,r[4]=c*m+h*v+u*T,r[7]=c*g+h*_+u*A,r[2]=d*x+f*y+p*C,r[5]=d*m+f*v+p*T,r[8]=d*g+f*_+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(bo.makeScale(e,t)),this}rotate(e){return this.premultiply(bo.makeRotation(-e)),this}translate(e,t){return this.premultiply(bo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new tt;function tu(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ir(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Kd(){const s=ir("canvas");return s.style.display="block",s}const nc={};function Xs(s){s in nc||(nc[s]=!0,console.warn(s))}function Yd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function jd(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Zd(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ht={enabled:!0,workingColorSpace:Qt,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===vt&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===vt&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?mo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Yn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const ic=[.64,.33,.3,.6,.15,.06],sc=[.2126,.7152,.0722],rc=[.3127,.329],oc=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ac=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ht.define({[Qt]:{primaries:ic,whitePoint:rc,transfer:mo,toXYZ:oc,fromXYZ:ac,luminanceCoefficients:sc,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:ic,whitePoint:rc,transfer:vt,toXYZ:oc,fromXYZ:ac,luminanceCoefficients:sc,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}});let ki;class $d{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ki===void 0&&(ki=ir("canvas")),ki.width=e.width,ki.height=e.height;const n=ki.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ki}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ir("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Yn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jd=0;class nu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=pn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(wo(i[o].image)):r.push(wo(i[o]))}else r=wo(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function wo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?$d.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qd=0;class Ot extends Fi{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,n=pi,i=pi,r=ln,o=Wn,a=fn,l=$n,c=Ot.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=pn(),this.name="",this.source=new nu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Zn:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Zn:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Gh;Ot.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,i=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,_=(f+1)/2,C=(g+1)/2,T=(h+d)/4,A=(u+x)/4,P=(p+m)/4;return v>_&&v>C?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=T/n,r=A/n):_>C?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=T/i,r=P/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=A/r,i=P/r),this.set(n,i,r,t),this}let y=Math.sqrt((m-p)*(m-p)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ef extends Fi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ot(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new nu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Sn extends ef{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class iu extends Ot{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tf extends Ot{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],p=r[o+2],x=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=p,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==p){let m=1-a;const g=l*d+c*f+h*p+u*x,y=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){const C=Math.sqrt(v),T=Math.atan2(C,g*y);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const _=a*y;if(l=l*m+d*_,c=c*m+f*_,h=h*m+p*_,u=u*m+x*_,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(e=0,t=0,n=0){E.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return To.copy(this).projectOnVector(e),this.sub(To)}reflect(e){return this.sub(To.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const To=new E,lc=new vi;class Cn{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xn):xn.fromBufferAttribute(r,o),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pr.copy(n.boundingBox)),pr.applyMatrix4(e.matrixWorld),this.union(pr)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),mr.subVectors(this.max,Ls),zi.subVectors(e.a,Ls),Gi.subVectors(e.b,Ls),Hi.subVectors(e.c,Ls),oi.subVectors(Gi,zi),ai.subVectors(Hi,Gi),Si.subVectors(zi,Hi);let t=[0,-oi.z,oi.y,0,-ai.z,ai.y,0,-Si.z,Si.y,oi.z,0,-oi.x,ai.z,0,-ai.x,Si.z,0,-Si.x,-oi.y,oi.x,0,-ai.y,ai.x,0,-Si.y,Si.x,0];return!Eo(t,zi,Gi,Hi,mr)||(t=[1,0,0,0,1,0,0,0,1],!Eo(t,zi,Gi,Hi,mr))?!1:(gr.crossVectors(oi,ai),t=[gr.x,gr.y,gr.z],Eo(t,zi,Gi,Hi,mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Nn=[new E,new E,new E,new E,new E,new E,new E,new E],xn=new E,pr=new Cn,zi=new E,Gi=new E,Hi=new E,oi=new E,ai=new E,Si=new E,Ls=new E,mr=new E,gr=new E,bi=new E;function Eo(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){bi.fromArray(s,r);const a=i.x*Math.abs(bi.x)+i.y*Math.abs(bi.y)+i.z*Math.abs(bi.z),l=e.dot(bi),c=t.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const nf=new Cn,Is=new E,Ao=new E;class Rn{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nf.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Is.subVectors(e,this.center);const t=Is.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Is,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Is.copy(e.center).add(Ao)),this.expandByPoint(Is.copy(e.center).sub(Ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Un=new E,Co=new E,xr=new E,li=new E,Ro=new E,_r=new E,Po=new E;class go{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Co.copy(e).add(t).multiplyScalar(.5),xr.copy(t).sub(e).normalize(),li.copy(this.origin).sub(Co);const r=e.distanceTo(t)*.5,o=-this.direction.dot(xr),a=li.dot(this.direction),l=-li.dot(xr),c=li.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Co).addScaledVector(xr,d),f}intersectSphere(e,t){Un.subVectors(e.center,this.origin);const n=Un.dot(this.direction),i=Un.dot(Un)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,i,r){Ro.subVectors(t,e),_r.subVectors(n,e),Po.crossVectors(Ro,_r);let o=this.direction.dot(Po),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;li.subVectors(this.origin,e);const l=a*this.direction.dot(_r.crossVectors(li,_r));if(l<0)return null;const c=a*this.direction.dot(Ro.cross(li));if(c<0||l+c>o)return null;const h=-a*li.dot(Po);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,p,x,m){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,x,m)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,x,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),o=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,p=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d+x*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,p=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,p=a*h,x=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,p=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-x*u}else if(e.order==="XZY"){const d=o*l,f=o*c,p=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sf,e,rf)}lookAt(e,t,n){const i=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ci.crossVectors(n,rn),ci.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ci.crossVectors(n,rn)),ci.normalize(),vr.crossVectors(rn,ci),i[0]=ci.x,i[4]=vr.x,i[8]=rn.x,i[1]=ci.y,i[5]=vr.y,i[9]=rn.y,i[2]=ci.z,i[6]=vr.z,i[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],x=n[6],m=n[10],g=n[14],y=n[3],v=n[7],_=n[11],C=n[15],T=i[0],A=i[4],P=i[8],w=i[12],M=i[1],I=i[5],H=i[9],U=i[13],O=i[2],Y=i[6],V=i[10],J=i[14],G=i[3],F=i[7],W=i[11],j=i[15];return r[0]=o*T+a*M+l*O+c*G,r[4]=o*A+a*I+l*Y+c*F,r[8]=o*P+a*H+l*V+c*W,r[12]=o*w+a*U+l*J+c*j,r[1]=h*T+u*M+d*O+f*G,r[5]=h*A+u*I+d*Y+f*F,r[9]=h*P+u*H+d*V+f*W,r[13]=h*w+u*U+d*J+f*j,r[2]=p*T+x*M+m*O+g*G,r[6]=p*A+x*I+m*Y+g*F,r[10]=p*P+x*H+m*V+g*W,r[14]=p*w+x*U+m*J+g*j,r[3]=y*T+v*M+_*O+C*G,r[7]=y*A+v*I+_*Y+C*F,r[11]=y*P+v*H+_*V+C*W,r[15]=y*w+v*U+_*J+C*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],x=e[7],m=e[11],g=e[15];return p*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+g*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],x=e[13],m=e[14],g=e[15],y=u*m*c-x*d*c+x*l*f-a*m*f-u*l*g+a*d*g,v=p*d*c-h*m*c-p*l*f+o*m*f+h*l*g-o*d*g,_=h*x*c-p*u*c+p*a*f-o*x*f-h*a*g+o*u*g,C=p*u*l-h*x*l-p*a*d+o*x*d+h*a*m-o*u*m,T=t*y+n*v+i*_+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=y*A,e[1]=(x*d*r-u*m*r-x*i*f+n*m*f+u*i*g-n*d*g)*A,e[2]=(a*m*r-x*l*r+x*i*c-n*m*c-a*i*g+n*l*g)*A,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=v*A,e[5]=(h*m*r-p*d*r+p*i*f-t*m*f-h*i*g+t*d*g)*A,e[6]=(p*l*r-o*m*r-p*i*c+t*m*c+o*i*g-t*l*g)*A,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*f+t*l*f)*A,e[8]=_*A,e[9]=(p*u*r-h*x*r-p*n*f+t*x*f+h*n*g-t*u*g)*A,e[10]=(o*x*r-p*a*r+p*n*c-t*x*c-o*n*g+t*a*g)*A,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=C*A,e[13]=(h*x*i-p*u*i+p*n*d-t*x*d-h*n*m+t*u*m)*A,e[14]=(p*a*i-o*x*i-p*n*l+t*x*l+o*n*m-t*a*m)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,x=o*h,m=o*u,g=a*u,y=l*c,v=l*h,_=l*u,C=n.x,T=n.y,A=n.z;return i[0]=(1-(x+g))*C,i[1]=(f+_)*C,i[2]=(p-v)*C,i[3]=0,i[4]=(f-_)*T,i[5]=(1-(d+g))*T,i[6]=(m+y)*T,i[7]=0,i[8]=(p+v)*A,i[9]=(m-y)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Vi.set(i[0],i[1],i[2]).length();const o=Vi.set(i[4],i[5],i[6]).length(),a=Vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],_n.copy(this);const c=1/r,h=1/o,u=1/a;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=u,_n.elements[9]*=u,_n.elements[10]*=u,t.setFromRotationMatrix(_n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Xn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,p;if(a===Xn)f=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===ao)f=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Xn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,f=(n+i)*h;let p,x;if(a===Xn)p=(o+r)*u,x=-2*u;else if(a===ao)p=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vi=new E,_n=new Qe,sf=new E(0,0,0),rf=new E(1,1,1),ci=new E,vr=new E,rn=new E,cc=new Qe,hc=new vi;class An{constructor(e=0,t=0,n=0,i=An.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hc.setFromEuler(this),this.setFromQuaternion(hc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class su{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let of=0;const uc=new E,Wi=new vi,Fn=new Qe,yr=new E,Ds=new E,af=new E,lf=new vi,dc=new E(1,0,0),fc=new E(0,1,0),pc=new E(0,0,1),mc={type:"added"},cf={type:"removed"},Xi={type:"childadded",child:null},Lo={type:"childremoved",child:null};class At extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new E,t=new An,n=new vi,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qe},normalMatrix:{value:new tt}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new su,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(dc,e)}rotateY(e){return this.rotateOnAxis(fc,e)}rotateZ(e){return this.rotateOnAxis(pc,e)}translateOnAxis(e,t){return uc.copy(e).applyQuaternion(this.quaternion),this.position.add(uc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dc,e)}translateY(e){return this.translateOnAxis(fc,e)}translateZ(e){return this.translateOnAxis(pc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yr.copy(e):yr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Ds,yr,this.up):Fn.lookAt(yr,Ds,this.up),this.quaternion.setFromRotationMatrix(Fn),i&&(Fn.extractRotation(i.matrixWorld),Wi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mc),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(cf),Lo.child=e,this.dispatchEvent(Lo),Lo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mc),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,lf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}At.DEFAULT_UP=new E(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new E,On=new E,Io=new E,Bn=new E,qi=new E,Ki=new E,gc=new E,Do=new E,No=new E,Uo=new E,Fo=new mt,Oo=new mt,Bo=new mt;class dn{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){vn.subVectors(i,t),On.subVectors(n,t),Io.subVectors(e,t);const o=vn.dot(vn),a=vn.dot(On),l=vn.dot(Io),c=On.dot(On),h=On.dot(Io),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(o,Bn.y),l.addScaledVector(a,Bn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Fo.setScalar(0),Oo.setScalar(0),Bo.setScalar(0),Fo.fromBufferAttribute(e,t),Oo.fromBufferAttribute(e,n),Bo.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Fo,r.x),o.addScaledVector(Oo,r.y),o.addScaledVector(Bo,r.z),o}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),On.subVectors(e,t),vn.cross(On).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),vn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;qi.subVectors(i,n),Ki.subVectors(r,n),Do.subVectors(e,n);const l=qi.dot(Do),c=Ki.dot(Do);if(l<=0&&c<=0)return t.copy(n);No.subVectors(e,i);const h=qi.dot(No),u=Ki.dot(No);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(qi,o);Uo.subVectors(e,r);const f=qi.dot(Uo),p=Ki.dot(Uo);if(p>=0&&f<=p)return t.copy(r);const x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Ki,a);const m=h*p-f*u;if(m<=0&&u-h>=0&&f-p>=0)return gc.subVectors(r,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(gc,a);const g=1/(m+x+d);return o=x*g,a=d*g,t.copy(n).addScaledVector(qi,o).addScaledVector(Ki,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Mr={h:0,s:0,l:0};function ko(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ht.workingColorSpace){if(e=Ll(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ko(o,r,e+1/3),this.g=ko(o,r,e),this.b=ko(o,r,e-1/3)}return ht.toWorkingColorSpace(this,i),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){const n=ru[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return ht.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Ut(Wt.r*255,0,255))*65536+Math.round(Ut(Wt.g*255,0,255))*256+Math.round(Ut(Wt.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,i=Wt.g,r=Wt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=dt){ht.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,i=Wt.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Mr);const n=Zs(hi.h,Mr.h,t),i=Zs(hi.s,Mr.s,t),r=Zs(hi.l,Mr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new De;De.NAMES=ru;let hf=0;class bn extends Fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=pn(),this.name="",this.blending=ls,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ba,this.blendDst=wa,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ba&&(n.blendSrc=this.blendSrc),this.blendDst!==wa&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qe extends bn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Uh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new E,Sr=new ne;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=al,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sr.fromBufferAttribute(this,t),Sr.applyMatrix3(e),this.setXY(t,Sr.x,Sr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==al&&(e.usage=this.usage),e}}class ou extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class au extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ze extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let uf=0;const hn=new Qe,zo=new At,Yi=new E,on=new Cn,Ns=new Cn,Gt=new E;class _t extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tu(e)?au:ou)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return zo.lookAt(e),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ze(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Rn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(on.min,Ns.min),on.expandByPoint(Gt),Gt.addVectors(on.max,Ns.max),on.expandByPoint(Gt)):(on.expandByPoint(Ns.min),on.expandByPoint(Ns.max))}on.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Gt.fromBufferAttribute(a,c),l&&(Yi.fromBufferAttribute(e,c),Gt.add(Yi)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new E,l[P]=new E;const c=new E,h=new E,u=new E,d=new ne,f=new ne,p=new ne,x=new E,m=new E;function g(P,w,M){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,w),p.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),p.sub(d);const I=1/(f.x*p.y-p.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(I),a[P].add(x),a[w].add(x),a[M].add(x),l[P].add(m),l[w].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,w=y.length;P<w;++P){const M=y[P],I=M.start,H=M.count;for(let U=I,O=I+H;U<O;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const v=new E,_=new E,C=new E,T=new E;function A(P){C.fromBufferAttribute(i,P),T.copy(C);const w=a[P];v.copy(w),v.sub(C.multiplyScalar(C.dot(w))).normalize(),_.crossVectors(T,w);const I=_.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,I)}for(let P=0,w=y.length;P<w;++P){const M=y[P],I=M.start,H=M.count;for(let U=I,O=I+H;U<O;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){const p=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,p=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let g=0;g<h;g++)d[p++]=c[f++]}return new Ft(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xc=new Qe,wi=new go,br=new Rn,_c=new E,wr=new E,Tr=new E,Er=new E,Go=new E,Ar=new E,vc=new E,Cr=new E;class L extends At{constructor(e=new _t,t=new qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Ar.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Go.fromBufferAttribute(u,e),o?Ar.addScaledVector(Go,h):Ar.addScaledVector(Go.sub(t),h))}t.add(Ar)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(br.containsPoint(wi.origin)===!1&&(wi.intersectSphere(br,_c)===null||wi.origin.distanceToSquared(_c)>(e.far-e.near)**2))&&(xc.copy(r).invert(),wi.copy(e.ray).applyMatrix4(xc),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,C=v;_<C;_+=3){const T=a.getX(_),A=a.getX(_+1),P=a.getX(_+2);i=Rr(this,g,e,n,c,h,u,T,A,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){const y=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);i=Rr(this,o,e,n,c,h,u,y,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,x=d.length;p<x;p++){const m=d[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,C=v;_<C;_+=3){const T=_,A=_+1,P=_+2;i=Rr(this,g,e,n,c,h,u,T,A,P),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=p,g=x;m<g;m+=3){const y=m,v=m+1,_=m+2;i=Rr(this,o,e,n,c,h,u,y,v,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function df(s,e,t,n,i,r,o,a){let l;if(e.side===qt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===jn,a),l===null)return null;Cr.copy(a),Cr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Cr);return c<t.near||c>t.far?null:{distance:c,point:Cr.clone(),object:s}}function Rr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,wr),s.getVertexPosition(l,Tr),s.getVertexPosition(c,Er);const h=df(s,e,t,n,wr,Tr,Er,vc);if(h){const u=new E;dn.getBarycoord(vc,wr,Tr,Er,u),i&&(h.uv=dn.getInterpolatedAttribute(i,a,l,c,u,new ne)),r&&(h.uv1=dn.getInterpolatedAttribute(r,a,l,c,u,new ne)),o&&(h.normal=dn.getInterpolatedAttribute(o,a,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new E,materialIndex:0};dn.getNormal(wr,Tr,Er,d.normal),h.face=d,h.barycoord=u}return h}class Ne extends _t{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(u,2));function p(x,m,g,y,v,_,C,T,A,P,w){const M=_/A,I=C/P,H=_/2,U=C/2,O=T/2,Y=A+1,V=P+1;let J=0,G=0;const F=new E;for(let W=0;W<V;W++){const j=W*I-U;for(let ce=0;ce<Y;ce++){const Be=ce*M-H;F[x]=Be*y,F[m]=j*v,F[g]=O,c.push(F.x,F.y,F.z),F[x]=0,F[m]=0,F[g]=T>0?1:-1,h.push(F.x,F.y,F.z),u.push(ce/A),u.push(1-W/P),J+=1}}for(let W=0;W<P;W++)for(let j=0;j<A;j++){const ce=d+j+Y*W,Be=d+j+Y*(W+1),Z=d+(j+1)+Y*(W+1),oe=d+(j+1)+Y*W;l.push(ce,Be,oe),l.push(Be,Z,oe),G+=6}a.addGroup(f,G,w),f+=G,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ne(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _s(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yt(s){const e={};for(let t=0;t<s.length;t++){const n=_s(s[t]);for(const i in n)e[i]=n[i]}return e}function ff(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function lu(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const sr={clone:_s,merge:Yt};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends bn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=ff(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class cu extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ui=new E,yc=new ne,Mc=new ne;class jt extends cu{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,yc,Mc),t.subVectors(Mc,yc)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(js*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=-90,Zi=1;class gf extends At{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jt(ji,Zi,e,t);i.layers=this.layers,this.add(i);const r=new jt(ji,Zi,e,t);r.layers=this.layers,this.add(r);const o=new jt(ji,Zi,e,t);o.layers=this.layers,this.add(o);const a=new jt(ji,Zi,e,t);a.layers=this.layers,this.add(a);const l=new jt(ji,Zi,e,t);l.layers=this.layers,this.add(l);const c=new jt(ji,Zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ao)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class hu extends Ot{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:fs,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xf extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new hu(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ne(5,5,5),r=new Ht({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:qn});r.uniforms.tEquirect.value=t;const o=new L(i,r),a=t.minFilter;return t.minFilter===Wn&&(t.minFilter=ln),new gf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const Ho=new E,_f=new E,vf=new tt;class Ri{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ho.subVectors(n,t).cross(_f.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ho),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vf.getNormalMatrix(e),i=this.coplanarPoint(Ho).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new Rn,Pr=new E;class Il{constructor(e=new Ri,t=new Ri,n=new Ri,i=new Ri,r=new Ri,o=new Ri){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],x=i[10],m=i[11],g=i[12],y=i[13],v=i[14],_=i[15];if(n[0].setComponents(l-r,d-c,m-f,_-g).normalize(),n[1].setComponents(l+r,d+c,m+f,_+g).normalize(),n[2].setComponents(l+o,d+h,m+p,_+y).normalize(),n[3].setComponents(l-o,d-h,m-p,_-y).normalize(),n[4].setComponents(l-a,d-u,m-x,_-v).normalize(),t===Xn)n[5].setComponents(l+a,d+u,m+x,_+v).normalize();else if(t===ao)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Pr.x=i.normal.x>0?e.max.x:e.min.x,Pr.y=i.normal.y>0?e.max.y:e.min.y,Pr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uu(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function yf(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],x=u[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class nn extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],x=[],m=[];for(let g=0;g<h;g++){const y=g*d-o;for(let v=0;v<c;v++){const _=v*u-r;p.push(_,-y,0),x.push(0,0,1),m.push(v/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<a;y++){const v=y+c*g,_=y+c*(g+1),C=y+1+c*(g+1),T=y+1+c*g;f.push(v,_,T),f.push(_,C,T)}this.setIndex(f),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sf=`#ifdef USE_ALPHAHASH
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
#endif`,bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ef=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Af=`#ifdef USE_AOMAP
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
#endif`,Cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rf=`#ifdef USE_BATCHING
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
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,If=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nf=`#ifdef USE_IRIDESCENCE
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
#endif`,Uf=`#ifdef USE_BUMPMAP
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
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wf=`#define PI 3.141592653589793
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
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qf=`vec3 transformedNormal = objectNormal;
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
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$f="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qf=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
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
#endif`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_p=`PhysicalMaterial material;
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
#endif`,vp=`struct PhysicalMaterial {
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
}`,yp=`
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
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ep=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ap=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pp=`#if defined( USE_POINTS_UV )
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
#endif`,Lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`#ifdef USE_MORPHTARGETS
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
#endif`,Op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
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
#endif`,Wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$p=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rm=`float getShadowMask() {
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
}`,om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,am=`#ifdef USE_SKINNING
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
#endif`,lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,um=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pm=`#ifdef USE_TRANSMISSION
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
#endif`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mm=`uniform sampler2D t2D;
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
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`#include <common>
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
}`,Am=`#if DEPTH_PACKING == 3200
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
}`,Cm=`#define DISTANCE
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
}`,Rm=`#define DISTANCE
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
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Um=`uniform vec3 diffuse;
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
}`,Fm=`#define LAMBERT
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
}`,Om=`#define LAMBERT
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
}`,Bm=`#define MATCAP
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
}`,km=`#define MATCAP
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
}`,zm=`#define NORMAL
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
}`,Gm=`#define NORMAL
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
}`,Hm=`#define PHONG
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
}`,Vm=`#define PHONG
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
}`,Wm=`#define STANDARD
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define TOON
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
}`,Km=`#define TOON
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
}`,Ym=`uniform float size;
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
}`,jm=`uniform vec3 diffuse;
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
}`,Zm=`#include <common>
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
}`,$m=`uniform vec3 color;
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
}`,Jm=`uniform float rotation;
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
}`,Qm=`uniform vec3 diffuse;
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
}`,nt={alphahash_fragment:Mf,alphahash_pars_fragment:Sf,alphamap_fragment:bf,alphamap_pars_fragment:wf,alphatest_fragment:Tf,alphatest_pars_fragment:Ef,aomap_fragment:Af,aomap_pars_fragment:Cf,batching_pars_vertex:Rf,batching_vertex:Pf,begin_vertex:Lf,beginnormal_vertex:If,bsdfs:Df,iridescence_fragment:Nf,bumpmap_pars_fragment:Uf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:kf,color_fragment:zf,color_pars_fragment:Gf,color_pars_vertex:Hf,color_vertex:Vf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:Kf,displacementmap_vertex:Yf,emissivemap_fragment:jf,emissivemap_pars_fragment:Zf,colorspace_fragment:$f,colorspace_pars_fragment:Jf,envmap_fragment:Qf,envmap_common_pars_fragment:ep,envmap_pars_fragment:tp,envmap_pars_vertex:np,envmap_physical_pars_fragment:fp,envmap_vertex:ip,fog_vertex:sp,fog_pars_vertex:rp,fog_fragment:op,fog_pars_fragment:ap,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:hp,lights_lambert_pars_fragment:up,lights_pars_begin:dp,lights_toon_fragment:pp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:xp,lights_physical_fragment:_p,lights_physical_pars_fragment:vp,lights_fragment_begin:yp,lights_fragment_maps:Mp,lights_fragment_end:Sp,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ep,map_fragment:Ap,map_pars_fragment:Cp,map_particle_fragment:Rp,map_particle_pars_fragment:Pp,metalnessmap_fragment:Lp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Dp,morphcolor_vertex:Np,morphnormal_vertex:Up,morphtarget_pars_vertex:Fp,morphtarget_vertex:Op,normal_fragment_begin:Bp,normal_fragment_maps:kp,normal_pars_fragment:zp,normal_pars_vertex:Gp,normal_vertex:Hp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:Kp,opaque_fragment:Yp,packing:jp,premultiplied_alpha_fragment:Zp,project_vertex:$p,dithering_fragment:Jp,dithering_pars_fragment:Qp,roughnessmap_fragment:em,roughnessmap_pars_fragment:tm,shadowmap_pars_fragment:nm,shadowmap_pars_vertex:im,shadowmap_vertex:sm,shadowmask_pars_fragment:rm,skinbase_vertex:om,skinning_pars_vertex:am,skinning_vertex:lm,skinnormal_vertex:cm,specularmap_fragment:hm,specularmap_pars_fragment:um,tonemapping_fragment:dm,tonemapping_pars_fragment:fm,transmission_fragment:pm,transmission_pars_fragment:mm,uv_pars_fragment:gm,uv_pars_vertex:xm,uv_vertex:_m,worldpos_vertex:vm,background_vert:ym,background_frag:Mm,backgroundCube_vert:Sm,backgroundCube_frag:bm,cube_vert:wm,cube_frag:Tm,depth_vert:Em,depth_frag:Am,distanceRGBA_vert:Cm,distanceRGBA_frag:Rm,equirect_vert:Pm,equirect_frag:Lm,linedashed_vert:Im,linedashed_frag:Dm,meshbasic_vert:Nm,meshbasic_frag:Um,meshlambert_vert:Fm,meshlambert_frag:Om,meshmatcap_vert:Bm,meshmatcap_frag:km,meshnormal_vert:zm,meshnormal_frag:Gm,meshphong_vert:Hm,meshphong_frag:Vm,meshphysical_vert:Wm,meshphysical_frag:Xm,meshtoon_vert:qm,meshtoon_frag:Km,points_vert:Ym,points_frag:jm,shadow_vert:Zm,shadow_frag:$m,sprite_vert:Jm,sprite_frag:Qm},ye={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},En={basic:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new De(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:Yt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:Yt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new De(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:Yt([ye.points,ye.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:Yt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:Yt([ye.common,ye.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:Yt([ye.sprite,ye.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:Yt([ye.common,ye.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:Yt([ye.lights,ye.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};En.physical={uniforms:Yt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};const Lr={r:0,b:0,g:0},Ei=new An,e0=new Qe;function t0(s,e,t,n,i,r,o){const a=new De(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function p(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function x(y){let v=!1;const _=p(y);_===null?g(a,l):_&&_.isColor&&(g(_,1),v=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(y,v){const _=p(v);_&&(_.isCubeTexture||_.mapping===po)?(h===void 0&&(h=new L(new Ne(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:_s(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Ei.copy(v.backgroundRotation),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(Ei)),h.material.toneMapped=ht.getTransfer(_.colorSpace)!==vt,(u!==_||d!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new L(new nn(2,2),new Ht({name:"BackgroundMaterial",uniforms:_s(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ht.getTransfer(_.colorSpace)!==vt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function g(y,v){y.getRGB(Lr,lu(s)),n.buffers.color.setClear(Lr.r,Lr.g,Lr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,g(a,l)},render:x,addToRenderList:m}}function n0(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(M,I,H,U,O){let Y=!1;const V=u(U,H,I);r!==V&&(r=V,c(r.object)),Y=f(M,U,H,O),Y&&p(M,U,H,O),O!==null&&e.update(O,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,_(M,I,H,U),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return s.createVertexArray()}function c(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,I,H){const U=H.wireframe===!0;let O=n[M.id];O===void 0&&(O={},n[M.id]=O);let Y=O[I.id];Y===void 0&&(Y={},O[I.id]=Y);let V=Y[U];return V===void 0&&(V=d(l()),Y[U]=V),V}function d(M){const I=[],H=[],U=[];for(let O=0;O<t;O++)I[O]=0,H[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:U,object:M,attributes:{},index:null}}function f(M,I,H,U){const O=r.attributes,Y=I.attributes;let V=0;const J=H.getAttributes();for(const G in J)if(J[G].location>=0){const W=O[G];let j=Y[G];if(j===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(j=M.instanceColor)),W===void 0||W.attribute!==j||j&&W.data!==j.data)return!0;V++}return r.attributesNum!==V||r.index!==U}function p(M,I,H,U){const O={},Y=I.attributes;let V=0;const J=H.getAttributes();for(const G in J)if(J[G].location>=0){let W=Y[G];W===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(W=M.instanceColor));const j={};j.attribute=W,W&&W.data&&(j.data=W.data),O[G]=j,V++}r.attributes=O,r.attributesNum=V,r.index=U}function x(){const M=r.newAttributes;for(let I=0,H=M.length;I<H;I++)M[I]=0}function m(M){g(M,0)}function g(M,I){const H=r.newAttributes,U=r.enabledAttributes,O=r.attributeDivisors;H[M]=1,U[M]===0&&(s.enableVertexAttribArray(M),U[M]=1),O[M]!==I&&(s.vertexAttribDivisor(M,I),O[M]=I)}function y(){const M=r.newAttributes,I=r.enabledAttributes;for(let H=0,U=I.length;H<U;H++)I[H]!==M[H]&&(s.disableVertexAttribArray(H),I[H]=0)}function v(M,I,H,U,O,Y,V){V===!0?s.vertexAttribIPointer(M,I,H,O,Y):s.vertexAttribPointer(M,I,H,U,O,Y)}function _(M,I,H,U){x();const O=U.attributes,Y=H.getAttributes(),V=I.defaultAttributeValues;for(const J in Y){const G=Y[J];if(G.location>=0){let F=O[J];if(F===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(F=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(F=M.instanceColor)),F!==void 0){const W=F.normalized,j=F.itemSize,ce=e.get(F);if(ce===void 0)continue;const Be=ce.buffer,Z=ce.type,oe=ce.bytesPerElement,Pe=Z===s.INT||Z===s.UNSIGNED_INT||F.gpuType===wl;if(F.isInterleavedBufferAttribute){const pe=F.data,Oe=pe.stride,Ke=F.offset;if(pe.isInstancedInterleavedBuffer){for(let Ge=0;Ge<G.locationSize;Ge++)g(G.location+Ge,pe.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Ge=0;Ge<G.locationSize;Ge++)m(G.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let Ge=0;Ge<G.locationSize;Ge++)v(G.location+Ge,j/G.locationSize,Z,W,Oe*oe,(Ke+j/G.locationSize*Ge)*oe,Pe)}else{if(F.isInstancedBufferAttribute){for(let pe=0;pe<G.locationSize;pe++)g(G.location+pe,F.meshPerAttribute);M.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let pe=0;pe<G.locationSize;pe++)m(G.location+pe);s.bindBuffer(s.ARRAY_BUFFER,Be);for(let pe=0;pe<G.locationSize;pe++)v(G.location+pe,j/G.locationSize,Z,W,j*oe,j/G.locationSize*pe*oe,Pe)}}else if(V!==void 0){const W=V[J];if(W!==void 0)switch(W.length){case 2:s.vertexAttrib2fv(G.location,W);break;case 3:s.vertexAttrib3fv(G.location,W);break;case 4:s.vertexAttrib4fv(G.location,W);break;default:s.vertexAttrib1fv(G.location,W)}}}}y()}function C(){P();for(const M in n){const I=n[M];for(const H in I){const U=I[H];for(const O in U)h(U[O].object),delete U[O];delete I[H]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const H in I){const U=I[H];for(const O in U)h(U[O].object),delete U[O];delete I[H]}delete n[M.id]}function A(M){for(const I in n){const H=n[I];if(H[M.id]===void 0)continue;const U=H[M.id];for(const O in U)h(U[O].object),delete U[O];delete H[M.id]}}function P(){w(),o=!0,r!==i&&(r=i,c(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function i0(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)o(c[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let p=0;for(let x=0;x<u;x++)p+=h[x]*d[x];t.update(p,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function s0(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==fn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===Kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==$n&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mn&&!P)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=p>0,T=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:C,maxSamples:T}}function r0(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new Ri,a=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,g=s.get(u);if(!i||p===null||p.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,v=y*4;let _=g.clippingState||null;l.value=_,_=h(p,d,v,f);for(let C=0;C!==v;++C)_[C]=t[C];g.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,p!==!0||m===null){const g=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let v=0,_=f;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function o0(s){let e=new WeakMap;function t(o,a){return a===Ia?o.mapping=fs:a===Da&&(o.mapping=ps),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ia||a===Da)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new xf(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class xo extends cu{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const rs=4,Sc=[.125,.215,.35,.446,.526,.582],Ii=20,Vo=new xo,bc=new De;let Wo=null,Xo=0,qo=0,Ko=!1;const Pi=(1+Math.sqrt(5))/2,$i=1/Pi,wc=[new E(-Pi,$i,0),new E(Pi,$i,0),new E(-$i,0,Pi),new E($i,0,Pi),new E(0,Pi,-$i),new E(0,Pi,$i),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)];class ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wo,Xo,qo),this._renderer.xr.enabled=Ko,e.scissorTest=!1,Ir(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Kn,format:fn,colorSpace:Qt,depthBuffer:!1},i=Tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=a0(r)),this._blurMaterial=l0(r,e,t)}return i}_compileMaterial(e){const t=new L(this._lodPlanes[0],e);this._renderer.compile(t,Vo)}_sceneToCubeUV(e,t,n,i){const a=new jt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(bc),h.toneMapping=gi,h.autoClear=!1;const f=new qe({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),p=new L(new Ne,f);let x=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(bc),x=!0);for(let g=0;g<6;g++){const y=g%3;y===0?(a.up.set(0,l[g],0),a.lookAt(c[g],0,0)):y===1?(a.up.set(0,0,l[g]),a.lookAt(0,c[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,c[g]));const v=this._cubeSize;Ir(i,y*v,g>2?v:0,v,v),h.setRenderTarget(i),x&&h.render(p,a),h.render(e,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===fs||e.mapping===ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ec());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new L(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ir(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Vo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=wc[(i-r-1)%wc.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new L(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ii-1),x=r/p,m=isFinite(r)?1+Math.floor(h*x):Ii;m>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ii}`);const g=[];let y=0;for(let A=0;A<Ii;++A){const P=A/x,w=Math.exp(-P*P/2);g.push(w),A===0?y+=w:A<m&&(y+=2*w)}for(let A=0;A<g.length;A++)g[A]=g[A]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=p,d.mipInt.value=v-n;const _=this._sizeLods[i],C=3*_*(i>v-rs?i-v+rs:0),T=4*(this._cubeSize-_);Ir(t,C,T,3*_,2*_),l.setRenderTarget(t),l.render(u,Vo)}}function a0(s){const e=[],t=[],n=[];let i=s;const r=s-rs+1+Sc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-rs?l=Sc[o-s+rs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,x=3,m=2,g=1,y=new Float32Array(x*p*f),v=new Float32Array(m*p*f),_=new Float32Array(g*p*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,P=T>2?0:-1,w=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];y.set(w,x*p*T),v.set(d,m*p*T);const M=[T,T,T,T,T,T];_.set(M,g*p*T)}const C=new _t;C.setAttribute("position",new Ft(y,x)),C.setAttribute("uv",new Ft(v,m)),C.setAttribute("faceIndex",new Ft(_,g)),e.push(C),i>rs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Tc(s,e,t){const n=new Sn(s,e,t);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ir(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function l0(s,e,t){const n=new Float32Array(Ii),i=new E(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ec(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ac(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Dl(){return`

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
	`}function c0(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ia||l===Da,h=l===fs||l===ps;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new ll(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new ll(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function h0(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Xs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function u0(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const p in d.attributes)e.remove(d.attributes[p]);for(const p in d.morphAttributes){const x=d.morphAttributes[p];for(let m=0,g=x.length;m<g;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)e.update(d[p],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const x=f[p];for(let m=0,g=x.length;m<g;m++)e.update(x[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,p=u.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let v=0,_=y.length;v<_;v+=3){const C=y[v+0],T=y[v+1],A=y[v+2];d.push(C,T,T,A,A,C)}}else if(p!==void 0){const y=p.array;x=p.version;for(let v=0,_=y.length/3-1;v<_;v+=3){const C=v+0,T=v+1,A=v+2;d.push(C,T,T,A,A,C)}}else return;const m=new(tu(d)?au:ou)(d,1);m.version=x;const g=r.get(u);g&&e.remove(g),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function d0(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,p){p!==0&&(s.drawElementsInstanced(n,f,r,d*o,p),t.update(f,n,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,p);let m=0;for(let g=0;g<p;g++)m+=f[g];t.update(m,n,1)}function u(d,f,p,x){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<d.length;g++)c(d[g]/o,f[g],x[g]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,p);let g=0;for(let y=0;y<p;y++)g+=f[y]*x[y];t.update(g,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function f0(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function p0(s,e,t){const n=new WeakMap,i=new mt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let w=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;f===!0&&(v=1),p===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,C=1;_>e.maxTextureSize&&(C=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const T=new Float32Array(_*C*4*u),A=new iu(T,_,C,u);A.type=Mn,A.needsUpdate=!0;const P=v*4;for(let M=0;M<u;M++){const I=m[M],H=g[M],U=y[M],O=_*C*4*M;for(let Y=0;Y<I.count;Y++){const V=Y*P;f===!0&&(i.fromBufferAttribute(I,Y),T[O+V+0]=i.x,T[O+V+1]=i.y,T[O+V+2]=i.z,T[O+V+3]=0),p===!0&&(i.fromBufferAttribute(H,Y),T[O+V+4]=i.x,T[O+V+5]=i.y,T[O+V+6]=i.z,T[O+V+7]=0),x===!0&&(i.fromBufferAttribute(U,Y),T[O+V+8]=i.x,T[O+V+9]=i.y,T[O+V+10]=i.z,T[O+V+11]=U.itemSize===4?i.w:1)}}d={count:u,texture:A,size:new ne(_,C)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function m0(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class du extends Ot{constructor(e,t,n,i,r,o,a,l,c,h=cs){if(h!==cs&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===cs&&(n=Ni),n===void 0&&h===gs&&(n=ms),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Jt,this.minFilter=l!==void 0?l:Jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fu=new Ot,Cc=new du(1,1),pu=new iu,mu=new tf,gu=new hu,Rc=[],Pc=[],Lc=new Float32Array(16),Ic=new Float32Array(9),Dc=new Float32Array(4);function ws(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Rc[i];if(r===void 0&&(r=new Float32Array(i),Rc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Bt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function kt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function _o(s,e){let t=Pc[e];t===void 0&&(t=new Int32Array(e),Pc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function g0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function x0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2fv(this.addr,e),kt(t,e)}}function _0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;s.uniform3fv(this.addr,e),kt(t,e)}}function v0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4fv(this.addr,e),kt(t,e)}}function y0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Dc.set(n),s.uniformMatrix2fv(this.addr,!1,Dc),kt(t,n)}}function M0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Ic.set(n),s.uniformMatrix3fv(this.addr,!1,Ic),kt(t,n)}}function S0(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Lc.set(n),s.uniformMatrix4fv(this.addr,!1,Lc),kt(t,n)}}function b0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function w0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2iv(this.addr,e),kt(t,e)}}function T0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;s.uniform3iv(this.addr,e),kt(t,e)}}function E0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4iv(this.addr,e),kt(t,e)}}function A0(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function C0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;s.uniform2uiv(this.addr,e),kt(t,e)}}function R0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;s.uniform3uiv(this.addr,e),kt(t,e)}}function P0(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;s.uniform4uiv(this.addr,e),kt(t,e)}}function L0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Cc.compareFunction=eu,r=Cc):r=fu,t.setTexture2D(e||r,i)}function I0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||mu,i)}function D0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||gu,i)}function N0(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||pu,i)}function U0(s){switch(s){case 5126:return g0;case 35664:return x0;case 35665:return _0;case 35666:return v0;case 35674:return y0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return w0;case 35668:case 35672:return T0;case 35669:case 35673:return E0;case 5125:return A0;case 36294:return C0;case 36295:return R0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return L0;case 35679:case 36299:case 36307:return I0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return N0}}function F0(s,e){s.uniform1fv(this.addr,e)}function O0(s,e){const t=ws(e,this.size,2);s.uniform2fv(this.addr,t)}function B0(s,e){const t=ws(e,this.size,3);s.uniform3fv(this.addr,t)}function k0(s,e){const t=ws(e,this.size,4);s.uniform4fv(this.addr,t)}function z0(s,e){const t=ws(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function G0(s,e){const t=ws(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function H0(s,e){const t=ws(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function V0(s,e){s.uniform1iv(this.addr,e)}function W0(s,e){s.uniform2iv(this.addr,e)}function X0(s,e){s.uniform3iv(this.addr,e)}function q0(s,e){s.uniform4iv(this.addr,e)}function K0(s,e){s.uniform1uiv(this.addr,e)}function Y0(s,e){s.uniform2uiv(this.addr,e)}function j0(s,e){s.uniform3uiv(this.addr,e)}function Z0(s,e){s.uniform4uiv(this.addr,e)}function $0(s,e,t){const n=this.cache,i=e.length,r=_o(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||fu,r[o])}function J0(s,e,t){const n=this.cache,i=e.length,r=_o(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||mu,r[o])}function Q0(s,e,t){const n=this.cache,i=e.length,r=_o(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||gu,r[o])}function eg(s,e,t){const n=this.cache,i=e.length,r=_o(t,i);Bt(n,r)||(s.uniform1iv(this.addr,r),kt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||pu,r[o])}function tg(s){switch(s){case 5126:return F0;case 35664:return O0;case 35665:return B0;case 35666:return k0;case 35674:return z0;case 35675:return G0;case 35676:return H0;case 5124:case 35670:return V0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return K0;case 36294:return Y0;case 36295:return j0;case 36296:return Z0;case 35678:case 36198:case 36298:case 36306:case 35682:return $0;case 35679:case 36299:case 36307:return J0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return eg}}class ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=U0(t.type)}}class ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tg(t.type)}}class sg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function Nc(s,e){s.seq.push(e),s.map[e.id]=e}function rg(s,e,t){const n=s.name,i=n.length;for(Yo.lastIndex=0;;){const r=Yo.exec(n),o=Yo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Nc(t,c===void 0?new ng(a,s,e):new ig(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new sg(a),Nc(t,u)),t=u}}}class ro{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);rg(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Uc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const og=37297;let ag=0;function lg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Fc=new tt;function cg(s){ht._getMatrix(Fc,ht.workingColorSpace,s);const e=`mat3( ${Fc.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(s)){case mo:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Oc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+lg(s.getShaderSource(e),o)}else return i}function hg(s,e){const t=cg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ug(s,e){let t;switch(e){case Fh:t="Linear";break;case Oh:t="Reinhard";break;case Bh:t="Cineon";break;case bl:t="ACESFilmic";break;case kh:t="AgX";break;case zh:t="Neutral";break;case xd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Dr=new E;function dg(){ht.getLuminanceCoefficients(Dr);const s=Dr.x.toFixed(4),e=Dr.y.toFixed(4),t=Dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qs).join(`
`)}function pg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function qs(s){return s!==""}function Bc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function cl(s){return s.replace(gg,_g)}const xg=new Map;function _g(s,e){let t=nt[e];if(t===void 0){const n=xg.get(e);if(n!==void 0)t=nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return cl(t)}const vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(s){return s.replace(vg,yg)}function yg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Gc(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}function Mg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Nh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Zu?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function Sg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case fs:case ps:e="ENVMAP_TYPE_CUBE";break;case po:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ps:e="ENVMAP_MODE_REFRACTION";break}return e}function wg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Uh:e="ENVMAP_BLENDING_MULTIPLY";break;case md:e="ENVMAP_BLENDING_MIX";break;case gd:e="ENVMAP_BLENDING_ADD";break}return e}function Tg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Eg(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Mg(t),c=Sg(t),h=bg(t),u=wg(t),d=Tg(t),f=fg(t),p=pg(r),x=i.createProgram();let m,g,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(qs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(qs).join(`
`),g.length>0&&(g+=`
`)):(m=[Gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),g=[Gc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?nt.tonemapping_pars_fragment:"",t.toneMapping!==gi?ug("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,hg("linearToOutputTexel",t.outputColorSpace),dg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qs).join(`
`)),o=cl(o),o=Bc(o,t),o=kc(o,t),a=cl(a),a=Bc(a,t),a=kc(a,t),o=zc(o),a=zc(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const v=y+m+o,_=y+g+a,C=Uc(i,i.VERTEX_SHADER,v),T=Uc(i,i.FRAGMENT_SHADER,_);i.attachShader(x,C),i.attachShader(x,T),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function A(I){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(x).trim(),U=i.getShaderInfoLog(C).trim(),O=i.getShaderInfoLog(T).trim();let Y=!0,V=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,C,T);else{const J=Oc(i,C,"vertex"),G=Oc(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+J+`
`+G)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(U===""||O==="")&&(V=!1);V&&(I.diagnostics={runnable:Y,programLog:H,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:g}})}i.deleteShader(C),i.deleteShader(T),P=new ro(i,x),w=mg(i,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(x,og)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ag++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=T,this}let Ag=0;class Cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Rg(e),t.set(e,n)),n}}class Rg{constructor(e){this.id=Ag++,this.code=e,this.usedTimes=0}}function Pg(s,e,t,n,i,r,o){const a=new su,l=new Cg,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,I,H,U){const O=H.fog,Y=U.geometry,V=w.isMeshStandardMaterial?H.environment:null,J=(w.isMeshStandardMaterial?t:e).get(w.envMap||V),G=J&&J.mapping===po?J.image.height:null,F=p[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const W=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,j=W!==void 0?W.length:0;let ce=0;Y.morphAttributes.position!==void 0&&(ce=1),Y.morphAttributes.normal!==void 0&&(ce=2),Y.morphAttributes.color!==void 0&&(ce=3);let Be,Z,oe,Pe;if(F){const ft=En[F];Be=ft.vertexShader,Z=ft.fragmentShader}else Be=w.vertexShader,Z=w.fragmentShader,l.update(w),oe=l.getVertexShaderID(w),Pe=l.getFragmentShaderID(w);const pe=s.getRenderTarget(),Oe=s.state.buffers.depth.getReversed(),Ke=U.isInstancedMesh===!0,Ge=U.isBatchedMesh===!0,lt=!!w.map,te=!!w.matcap,ue=!!J,D=!!w.aoMap,Fe=!!w.lightMap,ae=!!w.bumpMap,Te=!!w.normalMap,me=!!w.displacementMap,ze=!!w.emissiveMap,Ee=!!w.metalnessMap,R=!!w.roughnessMap,S=w.anisotropy>0,q=w.clearcoat>0,Q=w.dispersion>0,re=w.iridescence>0,ee=w.sheen>0,Re=w.transmission>0,ge=S&&!!w.anisotropyMap,Ae=q&&!!w.clearcoatMap,et=q&&!!w.clearcoatNormalMap,le=q&&!!w.clearcoatRoughnessMap,Le=re&&!!w.iridescenceMap,He=re&&!!w.iridescenceThicknessMap,We=ee&&!!w.sheenColorMap,Ie=ee&&!!w.sheenRoughnessMap,it=!!w.specularMap,Ye=!!w.specularColorMap,st=!!w.specularIntensityMap,B=Re&&!!w.transmissionMap,xe=Re&&!!w.thicknessMap,$=!!w.gradientMap,se=!!w.alphaMap,Me=w.alphaTest>0,Se=!!w.alphaHash,$e=!!w.extensions;let bt=gi;w.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(bt=s.toneMapping);const It={shaderID:F,shaderType:w.type,shaderName:w.name,vertexShader:Be,fragmentShader:Z,defines:w.defines,customVertexShaderID:oe,customFragmentShaderID:Pe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&U._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&U.instanceColor!==null,instancingMorph:Ke&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pe===null?s.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Qt,alphaToCoverage:!!w.alphaToCoverage,map:lt,matcap:te,envMap:ue,envMapMode:ue&&J.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Fe,bumpMap:ae,normalMap:Te,displacementMap:d&&me,emissiveMap:ze,normalMapObjectSpace:Te&&w.normalMapType===bd,normalMapTangentSpace:Te&&w.normalMapType===Qh,metalnessMap:Ee,roughnessMap:R,anisotropy:S,anisotropyMap:ge,clearcoat:q,clearcoatMap:Ae,clearcoatNormalMap:et,clearcoatRoughnessMap:le,dispersion:Q,iridescence:re,iridescenceMap:Le,iridescenceThicknessMap:He,sheen:ee,sheenColorMap:We,sheenRoughnessMap:Ie,specularMap:it,specularColorMap:Ye,specularIntensityMap:st,transmission:Re,transmissionMap:B,thicknessMap:xe,gradientMap:$,opaque:w.transparent===!1&&w.blending===ls&&w.alphaToCoverage===!1,alphaMap:se,alphaTest:Me,alphaHash:Se,combine:w.combine,mapUv:lt&&x(w.map.channel),aoMapUv:D&&x(w.aoMap.channel),lightMapUv:Fe&&x(w.lightMap.channel),bumpMapUv:ae&&x(w.bumpMap.channel),normalMapUv:Te&&x(w.normalMap.channel),displacementMapUv:me&&x(w.displacementMap.channel),emissiveMapUv:ze&&x(w.emissiveMap.channel),metalnessMapUv:Ee&&x(w.metalnessMap.channel),roughnessMapUv:R&&x(w.roughnessMap.channel),anisotropyMapUv:ge&&x(w.anisotropyMap.channel),clearcoatMapUv:Ae&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:et&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:He&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:We&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&x(w.sheenRoughnessMap.channel),specularMapUv:it&&x(w.specularMap.channel),specularColorMapUv:Ye&&x(w.specularColorMap.channel),specularIntensityMapUv:st&&x(w.specularIntensityMap.channel),transmissionMapUv:B&&x(w.transmissionMap.channel),thicknessMapUv:xe&&x(w.thicknessMap.channel),alphaMapUv:se&&x(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Te||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!Y.attributes.uv&&(lt||se),fog:!!O,useFog:w.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Oe,skinning:U.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:bt,decodeVideoTexture:lt&&w.map.isVideoTexture===!0&&ht.getTransfer(w.map.colorSpace)===vt,decodeVideoTextureEmissive:ze&&w.emissiveMap.isVideoTexture===!0&&ht.getTransfer(w.emissiveMap.colorSpace)===vt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===an,flipSided:w.side===qt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:$e&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&w.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function g(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)M.push(I),M.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(y(M,w),v(M,w),M.push(s.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function y(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function _(w){const M=p[w.type];let I;if(M){const H=En[M];I=sr.clone(H.uniforms)}else I=w.uniforms;return I}function C(w,M){let I;for(let H=0,U=h.length;H<U;H++){const O=h[H];if(O.cacheKey===M){I=O,++I.usedTimes;break}}return I===void 0&&(I=new Eg(s,M,w,r),h.push(I)),I}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function A(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:_,acquireProgram:C,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:P}}function Lg(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Ig(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Hc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Vc(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,p,x,m){let g=s[e];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:x,group:m},s[e]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=p,g.renderOrder=u.renderOrder,g.z=x,g.group=m),e++,g}function a(u,d,f,p,x,m){const g=o(u,d,f,p,x,m);f.transmission>0?n.push(g):f.transparent===!0?i.push(g):t.push(g)}function l(u,d,f,p,x,m){const g=o(u,d,f,p,x,m);f.transmission>0?n.unshift(g):f.transparent===!0?i.unshift(g):t.unshift(g)}function c(u,d){t.length>1&&t.sort(u||Ig),n.length>1&&n.sort(d||Hc),i.length>1&&i.sort(d||Hc)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Dg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Vc,s.set(n,[o])):i>=r.length?(o=new Vc,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Ng(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new De};break;case"SpotLight":t={position:new E,direction:new E,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function Ug(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Fg=0;function Og(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Bg(s){const e=new Ng,t=Ug(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);const i=new E,r=new Qe,o=new Qe;function a(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,p=0,x=0,m=0,g=0,y=0,v=0,_=0,C=0,T=0,A=0;c.sort(Og);for(let w=0,M=c.length;w<M;w++){const I=c[w],H=I.color,U=I.intensity,O=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=H.r*U,u+=H.g*U,d+=H.b*U;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],U);A++}else if(I.isDirectionalLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=I.shadow.matrix,y++}n.directional[f]=V,f++}else if(I.isSpotLight){const V=e.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(H).multiplyScalar(U),V.distance=O,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[x]=V;const J=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,J.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[x]=J.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[x]=G,n.spotShadowMap[x]=Y,_++}x++}else if(I.isRectAreaLight){const V=e.get(I);V.color.copy(H).multiplyScalar(U),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=V,m++}else if(I.isPointLight){const V=e.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[p]=G,n.pointShadowMap[p]=Y,n.pointShadowMatrix[p]=I.shadow.matrix,v++}n.point[p]=V,p++}else if(I.isHemisphereLight){const V=e.get(I);V.skyColor.copy(I.color).multiplyScalar(U),V.groundColor.copy(I.groundColor).multiplyScalar(U),n.hemi[g]=V,g++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==f||P.pointLength!==p||P.spotLength!==x||P.rectAreaLength!==m||P.hemiLength!==g||P.numDirectionalShadows!==y||P.numPointShadows!==v||P.numSpotShadows!==_||P.numSpotMaps!==C||P.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,P.directionalLength=f,P.pointLength=p,P.spotLength=x,P.rectAreaLength=m,P.hemiLength=g,P.numDirectionalShadows=y,P.numPointShadows=v,P.numSpotShadows=_,P.numSpotMaps=C,P.numLightProbes=A,n.version=Fg++)}function l(c,h){let u=0,d=0,f=0,p=0,x=0;const m=h.matrixWorldInverse;for(let g=0,y=c.length;g<y;g++){const v=c[g];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),u++}else if(v.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const _=n.rectArea[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),p++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Wc(s){const e=new Bg(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function kg(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new Wc(s),e.set(i,[a])):r>=o.length?(a=new Wc(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class zg extends bn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gg extends bn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vg=`uniform sampler2D shadow_pass;
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
}`;function Wg(s,e,t){let n=new Il;const i=new ne,r=new ne,o=new mt,a=new zg({depthPacking:Sd}),l=new Gg,c={},h=t.maxTextureSize,u={[jn]:qt,[qt]:jn,[an]:an},d=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Hg,fragmentShader:Vg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new _t;p.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new L(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nh;let g=this.type;this.render=function(T,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const w=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),H=s.state;H.setBlending(qn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const U=g!==Gn&&this.type===Gn,O=g===Gn&&this.type!==Gn;for(let Y=0,V=T.length;Y<V;Y++){const J=T[Y],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const F=G.getFrameExtents();if(i.multiply(F),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/F.x),i.x=r.x*F.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/F.y),i.y=r.y*F.y,G.mapSize.y=r.y)),G.map===null||U===!0||O===!0){const j=this.type!==Gn?{minFilter:Jt,magFilter:Jt}:{};G.map!==null&&G.map.dispose(),G.map=new Sn(i.x,i.y,j),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const W=G.getViewportCount();for(let j=0;j<W;j++){const ce=G.getViewport(j);o.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),H.viewport(o),G.updateMatrices(J,j),n=G.getFrustum(),_(A,P,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===Gn&&y(G,P),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(w,M,I)};function y(T,A){const P=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Sn(i.x,i.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(A,null,P,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(A,null,P,f,x,null)}function v(T,A,P,w){let M=null;const I=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=M.uuid,U=A.uuid;let O=c[H];O===void 0&&(O={},c[H]=O);let Y=O[U];Y===void 0&&(Y=M.clone(),O[U]=Y,A.addEventListener("dispose",C)),M=Y}if(M.visible=A.visible,M.wireframe=A.wireframe,w===Gn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=s.properties.get(M);H.light=P}return M}function _(T,A,P,w,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Gn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const U=e.update(T),O=T.material;if(Array.isArray(O)){const Y=U.groups;for(let V=0,J=Y.length;V<J;V++){const G=Y[V],F=O[G.materialIndex];if(F&&F.visible){const W=v(T,F,w,M);T.onBeforeShadow(s,T,A,P,U,W,G),s.renderBufferDirect(P,null,U,W,T,G),T.onAfterShadow(s,T,A,P,U,W,G)}}}else if(O.visible){const Y=v(T,O,w,M);T.onBeforeShadow(s,T,A,P,U,Y,null),s.renderBufferDirect(P,null,U,Y,T,null),T.onAfterShadow(s,T,A,P,U,Y,null)}}const H=T.children;for(let U=0,O=H.length;U<O;U++)_(H[U],A,P,w,M)}function C(T){T.target.removeEventListener("dispose",C);for(const P in c){const w=c[P],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const Xg={[Ta]:Ea,[Aa]:Pa,[Ca]:La,[ds]:Ra,[Ea]:Ta,[Pa]:Aa,[La]:Ca,[Ra]:ds};function qg(s,e){function t(){let B=!1;const xe=new mt;let $=null;const se=new mt(0,0,0,0);return{setMask:function(Me){$!==Me&&!B&&(s.colorMask(Me,Me,Me,Me),$=Me)},setLocked:function(Me){B=Me},setClear:function(Me,Se,$e,bt,It){It===!0&&(Me*=bt,Se*=bt,$e*=bt),xe.set(Me,Se,$e,bt),se.equals(xe)===!1&&(s.clearColor(Me,Se,$e,bt),se.copy(xe))},reset:function(){B=!1,$=null,se.set(-1,0,0,0)}}}function n(){let B=!1,xe=!1,$=null,se=null,Me=null;return{setReversed:function(Se){if(xe!==Se){const $e=e.get("EXT_clip_control");xe?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT);const bt=Me;Me=null,this.setClear(bt)}xe=Se},getReversed:function(){return xe},setTest:function(Se){Se?pe(s.DEPTH_TEST):Oe(s.DEPTH_TEST)},setMask:function(Se){$!==Se&&!B&&(s.depthMask(Se),$=Se)},setFunc:function(Se){if(xe&&(Se=Xg[Se]),se!==Se){switch(Se){case Ta:s.depthFunc(s.NEVER);break;case Ea:s.depthFunc(s.ALWAYS);break;case Aa:s.depthFunc(s.LESS);break;case ds:s.depthFunc(s.LEQUAL);break;case Ca:s.depthFunc(s.EQUAL);break;case Ra:s.depthFunc(s.GEQUAL);break;case Pa:s.depthFunc(s.GREATER);break;case La:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}se=Se}},setLocked:function(Se){B=Se},setClear:function(Se){Me!==Se&&(xe&&(Se=1-Se),s.clearDepth(Se),Me=Se)},reset:function(){B=!1,$=null,se=null,Me=null,xe=!1}}}function i(){let B=!1,xe=null,$=null,se=null,Me=null,Se=null,$e=null,bt=null,It=null;return{setTest:function(ft){B||(ft?pe(s.STENCIL_TEST):Oe(s.STENCIL_TEST))},setMask:function(ft){xe!==ft&&!B&&(s.stencilMask(ft),xe=ft)},setFunc:function(ft,ie,we){($!==ft||se!==ie||Me!==we)&&(s.stencilFunc(ft,ie,we),$=ft,se=ie,Me=we)},setOp:function(ft,ie,we){(Se!==ft||$e!==ie||bt!==we)&&(s.stencilOp(ft,ie,we),Se=ft,$e=ie,bt=we)},setLocked:function(ft){B=ft},setClear:function(ft){It!==ft&&(s.clearStencil(ft),It=ft)},reset:function(){B=!1,xe=null,$=null,se=null,Me=null,Se=null,$e=null,bt=null,It=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,x=!1,m=null,g=null,y=null,v=null,_=null,C=null,T=null,A=new De(0,0,0),P=0,w=!1,M=null,I=null,H=null,U=null,O=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,J=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=J>=2);let F=null,W={};const j=s.getParameter(s.SCISSOR_BOX),ce=s.getParameter(s.VIEWPORT),Be=new mt().fromArray(j),Z=new mt().fromArray(ce);function oe(B,xe,$,se){const Me=new Uint8Array(4),Se=s.createTexture();s.bindTexture(B,Se),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let $e=0;$e<$;$e++)B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY?s.texImage3D(xe,0,s.RGBA,1,1,se,0,s.RGBA,s.UNSIGNED_BYTE,Me):s.texImage2D(xe+$e,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Me);return Se}const Pe={};Pe[s.TEXTURE_2D]=oe(s.TEXTURE_2D,s.TEXTURE_2D,1),Pe[s.TEXTURE_CUBE_MAP]=oe(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pe[s.TEXTURE_2D_ARRAY]=oe(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pe[s.TEXTURE_3D]=oe(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(s.DEPTH_TEST),o.setFunc(ds),ae(!1),Te(ql),pe(s.CULL_FACE),D(qn);function pe(B){h[B]!==!0&&(s.enable(B),h[B]=!0)}function Oe(B){h[B]!==!1&&(s.disable(B),h[B]=!1)}function Ke(B,xe){return u[B]!==xe?(s.bindFramebuffer(B,xe),u[B]=xe,B===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=xe),B===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ge(B,xe){let $=f,se=!1;if(B){$=d.get(xe),$===void 0&&($=[],d.set(xe,$));const Me=B.textures;if($.length!==Me.length||$[0]!==s.COLOR_ATTACHMENT0){for(let Se=0,$e=Me.length;Se<$e;Se++)$[Se]=s.COLOR_ATTACHMENT0+Se;$.length=Me.length,se=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,se=!0);se&&s.drawBuffers($)}function lt(B){return p!==B?(s.useProgram(B),p=B,!0):!1}const te={[Li]:s.FUNC_ADD,[Ju]:s.FUNC_SUBTRACT,[Qu]:s.FUNC_REVERSE_SUBTRACT};te[ed]=s.MIN,te[td]=s.MAX;const ue={[nd]:s.ZERO,[id]:s.ONE,[sd]:s.SRC_COLOR,[ba]:s.SRC_ALPHA,[hd]:s.SRC_ALPHA_SATURATE,[ld]:s.DST_COLOR,[od]:s.DST_ALPHA,[rd]:s.ONE_MINUS_SRC_COLOR,[wa]:s.ONE_MINUS_SRC_ALPHA,[cd]:s.ONE_MINUS_DST_COLOR,[ad]:s.ONE_MINUS_DST_ALPHA,[ud]:s.CONSTANT_COLOR,[dd]:s.ONE_MINUS_CONSTANT_COLOR,[fd]:s.CONSTANT_ALPHA,[pd]:s.ONE_MINUS_CONSTANT_ALPHA};function D(B,xe,$,se,Me,Se,$e,bt,It,ft){if(B===qn){x===!0&&(Oe(s.BLEND),x=!1);return}if(x===!1&&(pe(s.BLEND),x=!0),B!==$u){if(B!==m||ft!==w){if((g!==Li||_!==Li)&&(s.blendEquation(s.FUNC_ADD),g=Li,_=Li),ft)switch(B){case ls:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rt:s.blendFunc(s.ONE,s.ONE);break;case Kl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ls:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Rt:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Kl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Yl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}y=null,v=null,C=null,T=null,A.set(0,0,0),P=0,m=B,w=ft}return}Me=Me||xe,Se=Se||$,$e=$e||se,(xe!==g||Me!==_)&&(s.blendEquationSeparate(te[xe],te[Me]),g=xe,_=Me),($!==y||se!==v||Se!==C||$e!==T)&&(s.blendFuncSeparate(ue[$],ue[se],ue[Se],ue[$e]),y=$,v=se,C=Se,T=$e),(bt.equals(A)===!1||It!==P)&&(s.blendColor(bt.r,bt.g,bt.b,It),A.copy(bt),P=It),m=B,w=!1}function Fe(B,xe){B.side===an?Oe(s.CULL_FACE):pe(s.CULL_FACE);let $=B.side===qt;xe&&($=!$),ae($),B.blending===ls&&B.transparent===!1?D(qn):D(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const se=B.stencilWrite;a.setTest(se),se&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ze(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Oe(s.SAMPLE_ALPHA_TO_COVERAGE)}function ae(B){M!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),M=B)}function Te(B){B!==Yu?(pe(s.CULL_FACE),B!==I&&(B===ql?s.cullFace(s.BACK):B===ju?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Oe(s.CULL_FACE),I=B}function me(B){B!==H&&(V&&s.lineWidth(B),H=B)}function ze(B,xe,$){B?(pe(s.POLYGON_OFFSET_FILL),(U!==xe||O!==$)&&(s.polygonOffset(xe,$),U=xe,O=$)):Oe(s.POLYGON_OFFSET_FILL)}function Ee(B){B?pe(s.SCISSOR_TEST):Oe(s.SCISSOR_TEST)}function R(B){B===void 0&&(B=s.TEXTURE0+Y-1),F!==B&&(s.activeTexture(B),F=B)}function S(B,xe,$){$===void 0&&(F===null?$=s.TEXTURE0+Y-1:$=F);let se=W[$];se===void 0&&(se={type:void 0,texture:void 0},W[$]=se),(se.type!==B||se.texture!==xe)&&(F!==$&&(s.activeTexture($),F=$),s.bindTexture(B,xe||Pe[B]),se.type=B,se.texture=xe)}function q(){const B=W[F];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function re(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ee(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Re(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ge(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ae(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function le(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Le(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function He(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function We(B){Be.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),Be.copy(B))}function Ie(B){Z.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),Z.copy(B))}function it(B,xe){let $=c.get(xe);$===void 0&&($=new WeakMap,c.set(xe,$));let se=$.get(B);se===void 0&&(se=s.getUniformBlockIndex(xe,B.name),$.set(B,se))}function Ye(B,xe){const se=c.get(xe).get(B);l.get(xe)!==se&&(s.uniformBlockBinding(xe,se,B.__bindingPointIndex),l.set(xe,se))}function st(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},F=null,W={},u={},d=new WeakMap,f=[],p=null,x=!1,m=null,g=null,y=null,v=null,_=null,C=null,T=null,A=new De(0,0,0),P=0,w=!1,M=null,I=null,H=null,U=null,O=null,Be.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:Oe,bindFramebuffer:Ke,drawBuffers:Ge,useProgram:lt,setBlending:D,setMaterial:Fe,setFlipSided:ae,setCullFace:Te,setLineWidth:me,setPolygonOffset:ze,setScissorTest:Ee,activeTexture:R,bindTexture:S,unbindTexture:q,compressedTexImage2D:Q,compressedTexImage3D:re,texImage2D:Le,texImage3D:He,updateUBOMapping:it,uniformBlockBinding:Ye,texStorage2D:et,texStorage3D:le,texSubImage2D:ee,texSubImage3D:Re,compressedTexSubImage2D:ge,compressedTexSubImage3D:Ae,scissor:We,viewport:Ie,reset:st}}function Xc(s,e,t,n){const i=Kg(n);switch(t){case qh:return s*e;case Yh:return s*e;case jh:return s*e*2;case Al:return s*e/i.components*i.byteLength;case Cl:return s*e/i.components*i.byteLength;case Zh:return s*e*2/i.components*i.byteLength;case Rl:return s*e*2/i.components*i.byteLength;case Kh:return s*e*3/i.components*i.byteLength;case fn:return s*e*4/i.components*i.byteLength;case Pl:return s*e*4/i.components*i.byteLength;case eo:case to:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case no:case io:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ua:case Oa:return Math.max(s,16)*Math.max(e,8)/4;case Na:case Fa:return Math.max(s,8)*Math.max(e,8)/2;case Ba:case ka:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case za:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Va:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ja:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Za:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ja:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case el:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case so:case tl:case nl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case $h:case il:return Math.ceil(s/4)*Math.ceil(e/4)*8;case sl:case rl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Kg(s){switch(s){case $n:case Vh:return{byteLength:1,components:1};case er:case Wh:case Kn:return{byteLength:2,components:1};case Tl:case El:return{byteLength:2,components:4};case Ni:case wl:case Mn:return{byteLength:4,components:1};case Xh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Yg(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,S){return f?new OffscreenCanvas(R,S):ir("canvas")}function x(R,S,q){let Q=1;const re=Ee(R);if((re.width>q||re.height>q)&&(Q=q/Math.max(re.width,re.height)),Q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor(Q*re.width),Re=Math.floor(Q*re.height);u===void 0&&(u=p(ee,Re));const ge=S?p(ee,Re):u;return ge.width=ee,ge.height=Re,ge.getContext("2d").drawImage(R,0,0,ee,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Re+")."),ge}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),R;return R}function m(R){return R.generateMipmaps}function g(R){s.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(R,S,q,Q,re=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=S;if(S===s.RED&&(q===s.FLOAT&&(ee=s.R32F),q===s.HALF_FLOAT&&(ee=s.R16F),q===s.UNSIGNED_BYTE&&(ee=s.R8)),S===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.R8UI),q===s.UNSIGNED_SHORT&&(ee=s.R16UI),q===s.UNSIGNED_INT&&(ee=s.R32UI),q===s.BYTE&&(ee=s.R8I),q===s.SHORT&&(ee=s.R16I),q===s.INT&&(ee=s.R32I)),S===s.RG&&(q===s.FLOAT&&(ee=s.RG32F),q===s.HALF_FLOAT&&(ee=s.RG16F),q===s.UNSIGNED_BYTE&&(ee=s.RG8)),S===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RG8UI),q===s.UNSIGNED_SHORT&&(ee=s.RG16UI),q===s.UNSIGNED_INT&&(ee=s.RG32UI),q===s.BYTE&&(ee=s.RG8I),q===s.SHORT&&(ee=s.RG16I),q===s.INT&&(ee=s.RG32I)),S===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RGB8UI),q===s.UNSIGNED_SHORT&&(ee=s.RGB16UI),q===s.UNSIGNED_INT&&(ee=s.RGB32UI),q===s.BYTE&&(ee=s.RGB8I),q===s.SHORT&&(ee=s.RGB16I),q===s.INT&&(ee=s.RGB32I)),S===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(ee=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(ee=s.RGBA16UI),q===s.UNSIGNED_INT&&(ee=s.RGBA32UI),q===s.BYTE&&(ee=s.RGBA8I),q===s.SHORT&&(ee=s.RGBA16I),q===s.INT&&(ee=s.RGBA32I)),S===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(ee=s.RGB9_E5),S===s.RGBA){const Re=re?mo:ht.getTransfer(Q);q===s.FLOAT&&(ee=s.RGBA32F),q===s.HALF_FLOAT&&(ee=s.RGBA16F),q===s.UNSIGNED_BYTE&&(ee=Re===vt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(R,S){let q;return R?S===null||S===Ni||S===ms?q=s.DEPTH24_STENCIL8:S===Mn?q=s.DEPTH32F_STENCIL8:S===er&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ni||S===ms?q=s.DEPTH_COMPONENT24:S===Mn?q=s.DEPTH_COMPONENT32F:S===er&&(q=s.DEPTH_COMPONENT16),q}function C(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Jt&&R.minFilter!==ln?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){const S=R.target;S.removeEventListener("dispose",T),P(S),S.isVideoTexture&&h.delete(S)}function A(R){const S=R.target;S.removeEventListener("dispose",A),M(S)}function P(R){const S=n.get(R);if(S.__webglInit===void 0)return;const q=R.source,Q=d.get(q);if(Q){const re=Q[S.__cacheKey];re.usedTimes--,re.usedTimes===0&&w(R),Object.keys(Q).length===0&&d.delete(q)}n.remove(R)}function w(R){const S=n.get(R);s.deleteTexture(S.__webglTexture);const q=R.source,Q=d.get(q);delete Q[S.__cacheKey],o.memory.textures--}function M(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let re=0;re<S.__webglFramebuffer[Q].length;re++)s.deleteFramebuffer(S.__webglFramebuffer[Q][re]);else s.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)s.deleteFramebuffer(S.__webglFramebuffer[Q]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const q=R.textures;for(let Q=0,re=q.length;Q<re;Q++){const ee=n.get(q[Q]);ee.__webglTexture&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),n.remove(q[Q])}n.remove(R)}let I=0;function H(){I=0}function U(){const R=I;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),I+=1,R}function O(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function Y(R,S){const q=n.get(R);if(R.isVideoTexture&&me(R),R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){const Q=R.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(q,R,S);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+S)}function V(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){Z(q,R,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+S)}function J(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){Z(q,R,S);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+S)}function G(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){oe(q,R,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+S)}const F={[Zn]:s.REPEAT,[pi]:s.CLAMP_TO_EDGE,[oo]:s.MIRRORED_REPEAT},W={[Jt]:s.NEAREST,[Hh]:s.NEAREST_MIPMAP_NEAREST,[Ws]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[Qr]:s.LINEAR_MIPMAP_NEAREST,[Wn]:s.LINEAR_MIPMAP_LINEAR},j={[wd]:s.NEVER,[Pd]:s.ALWAYS,[Td]:s.LESS,[eu]:s.LEQUAL,[Ed]:s.EQUAL,[Rd]:s.GEQUAL,[Ad]:s.GREATER,[Cd]:s.NOTEQUAL};function ce(R,S){if(S.type===Mn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===ln||S.magFilter===Qr||S.magFilter===Ws||S.magFilter===Wn||S.minFilter===ln||S.minFilter===Qr||S.minFilter===Ws||S.minFilter===Wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,F[S.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,F[S.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,F[S.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,W[S.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,W[S.minFilter]),S.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Jt||S.minFilter!==Ws&&S.minFilter!==Wn||S.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Be(R,S){let q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",T));const Q=S.source;let re=d.get(Q);re===void 0&&(re={},d.set(Q,re));const ee=O(S);if(ee!==R.__cacheKey){re[ee]===void 0&&(re[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),re[ee].usedTimes++;const Re=re[R.__cacheKey];Re!==void 0&&(re[R.__cacheKey].usedTimes--,Re.usedTimes===0&&w(S)),R.__cacheKey=ee,R.__webglTexture=re[ee].texture}return q}function Z(R,S,q){let Q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=s.TEXTURE_3D);const re=Be(R,S),ee=S.source;t.bindTexture(Q,R.__webglTexture,s.TEXTURE0+q);const Re=n.get(ee);if(ee.version!==Re.__version||re===!0){t.activeTexture(s.TEXTURE0+q);const ge=ht.getPrimaries(ht.workingColorSpace),Ae=S.colorSpace===fi?null:ht.getPrimaries(S.colorSpace),et=S.colorSpace===fi||ge===Ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let le=x(S.image,!1,i.maxTextureSize);le=ze(S,le);const Le=r.convert(S.format,S.colorSpace),He=r.convert(S.type);let We=v(S.internalFormat,Le,He,S.colorSpace,S.isVideoTexture);ce(Q,S);let Ie;const it=S.mipmaps,Ye=S.isVideoTexture!==!0,st=Re.__version===void 0||re===!0,B=ee.dataReady,xe=C(S,le);if(S.isDepthTexture)We=_(S.format===gs,S.type),st&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,We,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,We,le.width,le.height,0,Le,He,null));else if(S.isDataTexture)if(it.length>0){Ye&&st&&t.texStorage2D(s.TEXTURE_2D,xe,We,it[0].width,it[0].height);for(let $=0,se=it.length;$<se;$++)Ie=it[$],Ye?B&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Le,He,Ie.data):t.texImage2D(s.TEXTURE_2D,$,We,Ie.width,Ie.height,0,Le,He,Ie.data);S.generateMipmaps=!1}else Ye?(st&&t.texStorage2D(s.TEXTURE_2D,xe,We,le.width,le.height),B&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le.width,le.height,Le,He,le.data)):t.texImage2D(s.TEXTURE_2D,0,We,le.width,le.height,0,Le,He,le.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ye&&st&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xe,We,it[0].width,it[0].height,le.depth);for(let $=0,se=it.length;$<se;$++)if(Ie=it[$],S.format!==fn)if(Le!==null)if(Ye){if(B)if(S.layerUpdates.size>0){const Me=Xc(Ie.width,Ie.height,S.format,S.type);for(const Se of S.layerUpdates){const $e=Ie.data.subarray(Se*Me/Ie.data.BYTES_PER_ELEMENT,(Se+1)*Me/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,Se,Ie.width,Ie.height,1,Le,$e)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Ie.width,Ie.height,le.depth,Le,Ie.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,We,Ie.width,Ie.height,le.depth,0,Ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?B&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,Ie.width,Ie.height,le.depth,Le,He,Ie.data):t.texImage3D(s.TEXTURE_2D_ARRAY,$,We,Ie.width,Ie.height,le.depth,0,Le,He,Ie.data)}else{Ye&&st&&t.texStorage2D(s.TEXTURE_2D,xe,We,it[0].width,it[0].height);for(let $=0,se=it.length;$<se;$++)Ie=it[$],S.format!==fn?Le!==null?Ye?B&&t.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Le,Ie.data):t.compressedTexImage2D(s.TEXTURE_2D,$,We,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?B&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,Ie.width,Ie.height,Le,He,Ie.data):t.texImage2D(s.TEXTURE_2D,$,We,Ie.width,Ie.height,0,Le,He,Ie.data)}else if(S.isDataArrayTexture)if(Ye){if(st&&t.texStorage3D(s.TEXTURE_2D_ARRAY,xe,We,le.width,le.height,le.depth),B)if(S.layerUpdates.size>0){const $=Xc(le.width,le.height,S.format,S.type);for(const se of S.layerUpdates){const Me=le.data.subarray(se*$/le.data.BYTES_PER_ELEMENT,(se+1)*$/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,se,le.width,le.height,1,Le,He,Me)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Le,He,le.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,We,le.width,le.height,le.depth,0,Le,He,le.data);else if(S.isData3DTexture)Ye?(st&&t.texStorage3D(s.TEXTURE_3D,xe,We,le.width,le.height,le.depth),B&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Le,He,le.data)):t.texImage3D(s.TEXTURE_3D,0,We,le.width,le.height,le.depth,0,Le,He,le.data);else if(S.isFramebufferTexture){if(st)if(Ye)t.texStorage2D(s.TEXTURE_2D,xe,We,le.width,le.height);else{let $=le.width,se=le.height;for(let Me=0;Me<xe;Me++)t.texImage2D(s.TEXTURE_2D,Me,We,$,se,0,Le,He,null),$>>=1,se>>=1}}else if(it.length>0){if(Ye&&st){const $=Ee(it[0]);t.texStorage2D(s.TEXTURE_2D,xe,We,$.width,$.height)}for(let $=0,se=it.length;$<se;$++)Ie=it[$],Ye?B&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,Le,He,Ie):t.texImage2D(s.TEXTURE_2D,$,We,Le,He,Ie);S.generateMipmaps=!1}else if(Ye){if(st){const $=Ee(le);t.texStorage2D(s.TEXTURE_2D,xe,We,$.width,$.height)}B&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Le,He,le)}else t.texImage2D(s.TEXTURE_2D,0,We,Le,He,le);m(S)&&g(Q),Re.__version=ee.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function oe(R,S,q){if(S.image.length!==6)return;const Q=Be(R,S),re=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+q);const ee=n.get(re);if(re.version!==ee.__version||Q===!0){t.activeTexture(s.TEXTURE0+q);const Re=ht.getPrimaries(ht.workingColorSpace),ge=S.colorSpace===fi?null:ht.getPrimaries(S.colorSpace),Ae=S.colorSpace===fi||Re===ge?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const et=S.isCompressedTexture||S.image[0].isCompressedTexture,le=S.image[0]&&S.image[0].isDataTexture,Le=[];for(let se=0;se<6;se++)!et&&!le?Le[se]=x(S.image[se],!0,i.maxCubemapSize):Le[se]=le?S.image[se].image:S.image[se],Le[se]=ze(S,Le[se]);const He=Le[0],We=r.convert(S.format,S.colorSpace),Ie=r.convert(S.type),it=v(S.internalFormat,We,Ie,S.colorSpace),Ye=S.isVideoTexture!==!0,st=ee.__version===void 0||Q===!0,B=re.dataReady;let xe=C(S,He);ce(s.TEXTURE_CUBE_MAP,S);let $;if(et){Ye&&st&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,it,He.width,He.height);for(let se=0;se<6;se++){$=Le[se].mipmaps;for(let Me=0;Me<$.length;Me++){const Se=$[Me];S.format!==fn?We!==null?Ye?B&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,0,0,Se.width,Se.height,We,Se.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,it,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?B&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,0,0,Se.width,Se.height,We,Ie,Se.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me,it,Se.width,Se.height,0,We,Ie,Se.data)}}}else{if($=S.mipmaps,Ye&&st){$.length>0&&xe++;const se=Ee(Le[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,it,se.width,se.height)}for(let se=0;se<6;se++)if(le){Ye?B&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Le[se].width,Le[se].height,We,Ie,Le[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,it,Le[se].width,Le[se].height,0,We,Ie,Le[se].data);for(let Me=0;Me<$.length;Me++){const $e=$[Me].image[se].image;Ye?B&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,0,0,$e.width,$e.height,We,Ie,$e.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,it,$e.width,$e.height,0,We,Ie,$e.data)}}else{Ye?B&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,We,Ie,Le[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,it,We,Ie,Le[se]);for(let Me=0;Me<$.length;Me++){const Se=$[Me];Ye?B&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,0,0,We,Ie,Se.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,Me+1,it,We,Ie,Se.image[se])}}}m(S)&&g(s.TEXTURE_CUBE_MAP),ee.__version=re.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Pe(R,S,q,Q,re,ee){const Re=r.convert(q.format,q.colorSpace),ge=r.convert(q.type),Ae=v(q.internalFormat,Re,ge,q.colorSpace),et=n.get(S),le=n.get(q);if(le.__renderTarget=S,!et.__hasExternalTextures){const Le=Math.max(1,S.width>>ee),He=Math.max(1,S.height>>ee);re===s.TEXTURE_3D||re===s.TEXTURE_2D_ARRAY?t.texImage3D(re,ee,Ae,Le,He,S.depth,0,Re,ge,null):t.texImage2D(re,ee,Ae,Le,He,0,Re,ge,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),Te(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,re,le.__webglTexture,0,ae(S)):(re===s.TEXTURE_2D||re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,re,le.__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(R,S,q){if(s.bindRenderbuffer(s.RENDERBUFFER,R),S.depthBuffer){const Q=S.depthTexture,re=Q&&Q.isDepthTexture?Q.type:null,ee=_(S.stencilBuffer,re),Re=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=ae(S);Te(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ge,ee,S.width,S.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,ge,ee,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ee,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Re,s.RENDERBUFFER,R)}else{const Q=S.textures;for(let re=0;re<Q.length;re++){const ee=Q[re],Re=r.convert(ee.format,ee.colorSpace),ge=r.convert(ee.type),Ae=v(ee.internalFormat,Re,ge,ee.colorSpace),et=ae(S);q&&Te(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,et,Ae,S.width,S.height):Te(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,et,Ae,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Ae,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Oe(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(S.depthTexture);Q.__renderTarget=S,(!Q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const re=Q.__webglTexture,ee=ae(S);if(S.depthTexture.format===cs)Te(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,re,0);else if(S.depthTexture.format===gs)Te(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Ke(R){const S=n.get(R),q=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Q=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Q){const re=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Q.removeEventListener("dispose",re)};Q.addEventListener("dispose",re),S.__depthDisposeCallback=re}S.__boundDepthTexture=Q}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Oe(S.__webglFramebuffer,R)}else if(q){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]===void 0)S.__webglDepthbuffer[Q]=s.createRenderbuffer(),pe(S.__webglDepthbuffer[Q],R,!1);else{const re=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer[Q];s.bindRenderbuffer(s.RENDERBUFFER,ee),s.framebufferRenderbuffer(s.FRAMEBUFFER,re,s.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),pe(S.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,re=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,re),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,re)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ge(R,S,q){const Q=n.get(R);S!==void 0&&Pe(Q.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&Ke(R)}function lt(R){const S=R.texture,q=n.get(R),Q=n.get(S);R.addEventListener("dispose",A);const re=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Re=re.length>1;if(Re||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=S.version,o.memory.textures++),ee){q.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer[ge]=[];for(let Ae=0;Ae<S.mipmaps.length;Ae++)q.__webglFramebuffer[ge][Ae]=s.createFramebuffer()}else q.__webglFramebuffer[ge]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer=[];for(let ge=0;ge<S.mipmaps.length;ge++)q.__webglFramebuffer[ge]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Re)for(let ge=0,Ae=re.length;ge<Ae;ge++){const et=n.get(re[ge]);et.__webglTexture===void 0&&(et.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Te(R)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ge=0;ge<re.length;ge++){const Ae=re[ge];q.__webglColorRenderbuffer[ge]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[ge]);const et=r.convert(Ae.format,Ae.colorSpace),le=r.convert(Ae.type),Le=v(Ae.internalFormat,et,le,Ae.colorSpace,R.isXRRenderTarget===!0),He=ae(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,He,Le,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,q.__webglColorRenderbuffer[ge])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),pe(q.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),ce(s.TEXTURE_CUBE_MAP,S);for(let ge=0;ge<6;ge++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)Pe(q.__webglFramebuffer[ge][Ae],R,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ae);else Pe(q.__webglFramebuffer[ge],R,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(S)&&g(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ge=0,Ae=re.length;ge<Ae;ge++){const et=re[ge],le=n.get(et);t.bindTexture(s.TEXTURE_2D,le.__webglTexture),ce(s.TEXTURE_2D,et),Pe(q.__webglFramebuffer,R,et,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,0),m(et)&&g(s.TEXTURE_2D)}t.unbindTexture()}else{let ge=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ge=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ge,Q.__webglTexture),ce(ge,S),S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)Pe(q.__webglFramebuffer[Ae],R,S,s.COLOR_ATTACHMENT0,ge,Ae);else Pe(q.__webglFramebuffer,R,S,s.COLOR_ATTACHMENT0,ge,0);m(S)&&g(ge),t.unbindTexture()}R.depthBuffer&&Ke(R)}function te(R){const S=R.textures;for(let q=0,Q=S.length;q<Q;q++){const re=S[q];if(m(re)){const ee=y(R),Re=n.get(re).__webglTexture;t.bindTexture(ee,Re),g(ee),t.unbindTexture()}}}const ue=[],D=[];function Fe(R){if(R.samples>0){if(Te(R)===!1){const S=R.textures,q=R.width,Q=R.height;let re=s.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(R),ge=S.length>1;if(ge)for(let Ae=0;Ae<S.length;Ae++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ae=0;Ae<S.length;Ae++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(re|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(re|=s.STENCIL_BUFFER_BIT)),ge){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Ae]);const et=n.get(S[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,et,0)}s.blitFramebuffer(0,0,q,Q,0,0,q,Q,re,s.NEAREST),l===!0&&(ue.length=0,D.length=0,ue.push(s.COLOR_ATTACHMENT0+Ae),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ue.push(ee),D.push(ee),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ge)for(let Ae=0;Ae<S.length;Ae++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Re.__webglColorRenderbuffer[Ae]);const et=n.get(S[Ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,et,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function ae(R){return Math.min(i.maxSamples,R.samples)}function Te(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function me(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function ze(R,S){const q=R.colorSpace,Q=R.format,re=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||q!==Qt&&q!==fi&&(ht.getTransfer(q)===vt?(Q!==fn||re!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),S}function Ee(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=H,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Ge,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Te}function jg(s,e){function t(n,i=fi){let r;const o=ht.getTransfer(i);if(n===$n)return s.UNSIGNED_BYTE;if(n===Tl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===El)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Xh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Vh)return s.BYTE;if(n===Wh)return s.SHORT;if(n===er)return s.UNSIGNED_SHORT;if(n===wl)return s.INT;if(n===Ni)return s.UNSIGNED_INT;if(n===Mn)return s.FLOAT;if(n===Kn)return s.HALF_FLOAT;if(n===qh)return s.ALPHA;if(n===Kh)return s.RGB;if(n===fn)return s.RGBA;if(n===Yh)return s.LUMINANCE;if(n===jh)return s.LUMINANCE_ALPHA;if(n===cs)return s.DEPTH_COMPONENT;if(n===gs)return s.DEPTH_STENCIL;if(n===Al)return s.RED;if(n===Cl)return s.RED_INTEGER;if(n===Zh)return s.RG;if(n===Rl)return s.RG_INTEGER;if(n===Pl)return s.RGBA_INTEGER;if(n===eo||n===to||n===no||n===io)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===io)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Ua||n===Fa||n===Oa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===ka||n===za)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===ka)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===za)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ga||n===Ha||n===Va||n===Wa||n===Xa||n===qa||n===Ka||n===Ya||n===ja||n===Za||n===$a||n===Ja||n===Qa||n===el)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ga)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ha)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Va)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ka)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ya)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ja)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Za)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$a)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ja)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qa)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===el)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===so||n===tl||n===nl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===so)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$h||n===il||n===sl||n===rl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===so)return r.COMPRESSED_RED_RGTC1_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Zg extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ve extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $g={type:"move"};class jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($g)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ve;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Jg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Qg=`
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

}`;class ex{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Ot,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ht({vertexShader:Jg,fragmentShader:Qg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new L(new nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tx extends Fi{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null;const x=new ex,m=t.getContextAttributes();let g=null,y=null;const v=[],_=[],C=new ne;let T=null;const A=new jt;A.viewport=new mt;const P=new jt;P.viewport=new mt;const w=[A,P],M=new Zg;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let oe=v[Z];return oe===void 0&&(oe=new jo,v[Z]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(Z){let oe=v[Z];return oe===void 0&&(oe=new jo,v[Z]=oe),oe.getGripSpace()},this.getHand=function(Z){let oe=v[Z];return oe===void 0&&(oe=new jo,v[Z]=oe),oe.getHandSpace()};function U(Z){const oe=_.indexOf(Z.inputSource);if(oe===-1)return;const Pe=v[oe];Pe!==void 0&&(Pe.update(Z.inputSource,Z.frame,c||o),Pe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function O(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",Y);for(let Z=0;Z<v.length;Z++){const oe=_[Z];oe!==null&&(_[Z]=null,v[Z].disconnect(oe))}I=null,H=null,x.reset(),e.setRenderTarget(g),f=null,d=null,u=null,i=null,y=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",O),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),i.renderState.layers===void 0){const oe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,oe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Sn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let oe=null,Pe=null,pe=null;m.depth&&(pe=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=m.stencil?gs:cs,Pe=m.stencil?ms:Ni);const Oe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Oe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Sn(d.textureWidth,d.textureHeight,{format:fn,type:$n,depthTexture:new du(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Be.setContext(i),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(Z){for(let oe=0;oe<Z.removed.length;oe++){const Pe=Z.removed[oe],pe=_.indexOf(Pe);pe>=0&&(_[pe]=null,v[pe].disconnect(Pe))}for(let oe=0;oe<Z.added.length;oe++){const Pe=Z.added[oe];let pe=_.indexOf(Pe);if(pe===-1){for(let Ke=0;Ke<v.length;Ke++)if(Ke>=_.length){_.push(Pe),pe=Ke;break}else if(_[Ke]===null){_[Ke]=Pe,pe=Ke;break}if(pe===-1)break}const Oe=v[pe];Oe&&Oe.connect(Pe)}}const V=new E,J=new E;function G(Z,oe,Pe){V.setFromMatrixPosition(oe.matrixWorld),J.setFromMatrixPosition(Pe.matrixWorld);const pe=V.distanceTo(J),Oe=oe.projectionMatrix.elements,Ke=Pe.projectionMatrix.elements,Ge=Oe[14]/(Oe[10]-1),lt=Oe[14]/(Oe[10]+1),te=(Oe[9]+1)/Oe[5],ue=(Oe[9]-1)/Oe[5],D=(Oe[8]-1)/Oe[0],Fe=(Ke[8]+1)/Ke[0],ae=Ge*D,Te=Ge*Fe,me=pe/(-D+Fe),ze=me*-D;if(oe.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ze),Z.translateZ(me),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Oe[10]===-1)Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const Ee=Ge+me,R=lt+me,S=ae-ze,q=Te+(pe-ze),Q=te*lt/R*Ee,re=ue*lt/R*Ee;Z.projectionMatrix.makePerspective(S,q,Q,re,Ee,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function F(Z,oe){oe===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(oe.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let oe=Z.near,Pe=Z.far;x.texture!==null&&(x.depthNear>0&&(oe=x.depthNear),x.depthFar>0&&(Pe=x.depthFar)),M.near=P.near=A.near=oe,M.far=P.far=A.far=Pe,(I!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,H=M.far),A.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;const pe=Z.parent,Oe=M.cameras;F(M,pe);for(let Ke=0;Ke<Oe.length;Ke++)F(Oe[Ke],pe);Oe.length===2?G(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),W(Z,M,pe)};function W(Z,oe,Pe){Pe===null?Z.matrix.copy(oe.matrixWorld):(Z.matrix.copy(Pe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(oe.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(oe.projectionMatrix),Z.projectionMatrixInverse.copy(oe.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=xs*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let j=null;function ce(Z,oe){if(h=oe.getViewerPose(c||o),p=oe,h!==null){const Pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let pe=!1;Pe.length!==M.cameras.length&&(M.cameras.length=0,pe=!0);for(let Ke=0;Ke<Pe.length;Ke++){const Ge=Pe[Ke];let lt=null;if(f!==null)lt=f.getViewport(Ge);else{const ue=u.getViewSubImage(d,Ge);lt=ue.viewport,Ke===0&&(e.setRenderTargetTextures(y,ue.colorTexture,d.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(y))}let te=w[Ke];te===void 0&&(te=new jt,te.layers.enable(Ke),te.viewport=new mt,w[Ke]=te),te.matrix.fromArray(Ge.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(Ge.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(lt.x,lt.y,lt.width,lt.height),Ke===0&&(M.matrix.copy(te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),pe===!0&&M.cameras.push(te)}const Oe=i.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")){const Ke=u.getDepthInformation(Pe[0]);Ke&&Ke.isValid&&Ke.texture&&x.init(e,Ke,i.renderState)}}for(let Pe=0;Pe<v.length;Pe++){const pe=_[Pe],Oe=v[Pe];pe!==null&&Oe!==void 0&&Oe.update(pe,oe,c||o)}j&&j(Z,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),p=null}const Be=new uu;Be.setAnimationLoop(ce),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}}const Ai=new An,nx=new Qe;function ix(s,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,lu(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,y,v,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(m,g):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&f(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,y,v):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===qt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===qt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const y=e.get(g),v=y.envMap,_=y.envMapRotation;v&&(m.envMap.value=v,Ai.copy(_),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(nx.makeRotationFromEuler(Ai)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,v){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=v*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,y){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===qt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){const y=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sx(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const _=v.program;n.uniformBlockBinding(y,_)}function c(y,v){let _=i[y.id];_===void 0&&(p(y),_=h(y),i[y.id]=_,y.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(y,C);const T=e.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){const v=u();y.__bindingPointIndex=v;const _=s.createBuffer(),C=y.__size,T=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,C,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,_),_}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=i[y.id],_=y.uniforms,C=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let T=0,A=_.length;T<A;T++){const P=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,M=P.length;w<M;w++){const I=P[w];if(f(I,T,w,C)===!0){const H=I.__offset,U=Array.isArray(I.value)?I.value:[I.value];let O=0;for(let Y=0;Y<U.length;Y++){const V=U[Y],J=x(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,H+O,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,O),O+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,v,_,C){const T=y.value,A=v+"_"+_;if(C[A]===void 0)return typeof T=="number"||typeof T=="boolean"?C[A]=T:C[A]=T.clone(),!0;{const P=C[A];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return C[A]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function p(y){const v=y.uniforms;let _=0;const C=16;for(let A=0,P=v.length;A<P;A++){const w=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,I=w.length;M<I;M++){const H=w[M],U=Array.isArray(H.value)?H.value:[H.value];for(let O=0,Y=U.length;O<Y;O++){const V=U[O],J=x(V),G=_%C,F=G%J.boundary,W=G+F;_+=F,W!==0&&C-W<J.storage&&(_+=C-W),H.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=J.storage}}}const T=_%C;return T>0&&(_+=C-T),y.__size=_,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function g(){for(const y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:g}}class rx{constructor(e={}){const{canvas:t=Kd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),x=new Int32Array(4);let m=null,g=null;const y=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this.toneMapping=gi,this.toneMappingExposure=1;const _=this;let C=!1,T=0,A=0,P=null,w=-1,M=null;const I=new mt,H=new mt;let U=null;const O=new De(0);let Y=0,V=t.width,J=t.height,G=1,F=null,W=null;const j=new mt(0,0,V,J),ce=new mt(0,0,V,J);let Be=!1;const Z=new Il;let oe=!1,Pe=!1;const pe=new Qe,Oe=new Qe,Ke=new E,Ge=new mt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function ue(){return P===null?G:1}let D=n;function Fe(b,N){return t.getContext(b,N)}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Sl}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",Se,!1),D===null){const N="webgl2";if(D=Fe(N,b),D===null)throw Fe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ae,Te,me,ze,Ee,R,S,q,Q,re,ee,Re,ge,Ae,et,le,Le,He,We,Ie,it,Ye,st,B;function xe(){ae=new h0(D),ae.init(),Ye=new jg(D,ae),Te=new s0(D,ae,e,Ye),me=new qg(D,ae),Te.reverseDepthBuffer&&d&&me.buffers.depth.setReversed(!0),ze=new f0(D),Ee=new Lg,R=new Yg(D,ae,me,Ee,Te,Ye,ze),S=new o0(_),q=new c0(_),Q=new yf(D),st=new n0(D,Q),re=new u0(D,Q,ze,st),ee=new m0(D,re,Q,ze),We=new p0(D,Te,R),le=new r0(Ee),Re=new Pg(_,S,q,ae,Te,st,le),ge=new ix(_,Ee),Ae=new Dg,et=new kg(ae),He=new t0(_,S,q,me,ee,f,l),Le=new Wg(_,ee,Te),B=new sx(D,ze,Te,me),Ie=new i0(D,ae,ze),it=new d0(D,ae,ze),ze.programs=Re.programs,_.capabilities=Te,_.extensions=ae,_.properties=Ee,_.renderLists=Ae,_.shadowMap=Le,_.state=me,_.info=ze}xe();const $=new tx(_,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const b=ae.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ae.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(b){b!==void 0&&(G=b,this.setSize(V,J,!1))},this.getSize=function(b){return b.set(V,J)},this.setSize=function(b,N,X=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=b,J=N,t.width=Math.floor(b*G),t.height=Math.floor(N*G),X===!0&&(t.style.width=b+"px",t.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(V*G,J*G).floor()},this.setDrawingBufferSize=function(b,N,X){V=b,J=N,G=X,t.width=Math.floor(b*X),t.height=Math.floor(N*X),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(j)},this.setViewport=function(b,N,X,K){b.isVector4?j.set(b.x,b.y,b.z,b.w):j.set(b,N,X,K),me.viewport(I.copy(j).multiplyScalar(G).round())},this.getScissor=function(b){return b.copy(ce)},this.setScissor=function(b,N,X,K){b.isVector4?ce.set(b.x,b.y,b.z,b.w):ce.set(b,N,X,K),me.scissor(H.copy(ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(b){me.setScissorTest(Be=b)},this.setOpaqueSort=function(b){F=b},this.setTransparentSort=function(b){W=b},this.getClearColor=function(b){return b.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(b=!0,N=!0,X=!0){let K=0;if(b){let z=!1;if(P!==null){const de=P.texture.format;z=de===Pl||de===Rl||de===Cl}if(z){const de=P.texture.type,_e=de===$n||de===Ni||de===er||de===ms||de===Tl||de===El,he=He.getClearColor(),fe=He.getClearAlpha(),Ce=he.r,ve=he.g,be=he.b;_e?(p[0]=Ce,p[1]=ve,p[2]=be,p[3]=fe,D.clearBufferuiv(D.COLOR,0,p)):(x[0]=Ce,x[1]=ve,x[2]=be,x[3]=fe,D.clearBufferiv(D.COLOR,0,x))}else K|=D.COLOR_BUFFER_BIT}N&&(K|=D.DEPTH_BUFFER_BIT),X&&(K|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Ae.dispose(),et.dispose(),Ee.dispose(),S.dispose(),q.dispose(),ee.dispose(),st.dispose(),B.dispose(),Re.dispose(),$.dispose(),$.removeEventListener("sessionstart",rt),$.removeEventListener("sessionend",je),ct.stop()};function se(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const b=ze.autoReset,N=Le.enabled,X=Le.autoUpdate,K=Le.needsUpdate,z=Le.type;xe(),ze.autoReset=b,Le.enabled=N,Le.autoUpdate=X,Le.needsUpdate=K,Le.type=z}function Se(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function $e(b){const N=b.target;N.removeEventListener("dispose",$e),bt(N)}function bt(b){It(b),Ee.remove(b)}function It(b){const N=Ee.get(b).programs;N!==void 0&&(N.forEach(function(X){Re.releaseProgram(X)}),b.isShaderMaterial&&Re.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,X,K,z,de){N===null&&(N=lt);const _e=z.isMesh&&z.matrixWorld.determinant()<0,he=Mi(b,N,X,K,z);me.setMaterial(K,_e);let fe=X.index,Ce=1;if(K.wireframe===!0){if(fe=re.getWireframeAttribute(X),fe===void 0)return;Ce=2}const ve=X.drawRange,be=X.attributes.position;let Je=ve.start*Ce,pt=(ve.start+ve.count)*Ce;de!==null&&(Je=Math.max(Je,de.start*Ce),pt=Math.min(pt,(de.start+de.count)*Ce)),fe!==null?(Je=Math.max(Je,0),pt=Math.min(pt,fe.count)):be!=null&&(Je=Math.max(Je,0),pt=Math.min(pt,be.count));const wt=pt-Je;if(wt<0||wt===1/0)return;st.setup(z,K,he,X,fe);let tn,gt=Ie;if(fe!==null&&(tn=Q.get(fe),gt=it,gt.setIndex(tn)),z.isMesh)K.wireframe===!0?(me.setLineWidth(K.wireframeLinewidth*ue()),gt.setMode(D.LINES)):gt.setMode(D.TRIANGLES);else if(z.isLine){let ke=K.linewidth;ke===void 0&&(ke=1),me.setLineWidth(ke*ue()),z.isLineSegments?gt.setMode(D.LINES):z.isLineLoop?gt.setMode(D.LINE_LOOP):gt.setMode(D.LINE_STRIP)}else z.isPoints?gt.setMode(D.POINTS):z.isSprite&&gt.setMode(D.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)gt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))gt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const ke=z._multiDrawStarts,Dn=z._multiDrawCounts,xt=z._multiDrawCount,gn=fe?Q.get(fe).bytesPerElement:1,Oi=Ee.get(K).currentProgram.getUniforms();for(let sn=0;sn<xt;sn++)Oi.setValue(D,"_gl_DrawID",sn),gt.render(ke[sn]/gn,Dn[sn])}else if(z.isInstancedMesh)gt.renderInstances(Je,wt,z.count);else if(X.isInstancedBufferGeometry){const ke=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Dn=Math.min(X.instanceCount,ke);gt.renderInstances(Je,wt,Dn)}else gt.render(Je,wt)};function ft(b,N,X){b.transparent===!0&&b.side===an&&b.forceSinglePass===!1?(b.side=qt,b.needsUpdate=!0,mn(b,N,X),b.side=jn,b.needsUpdate=!0,mn(b,N,X),b.side=an):mn(b,N,X)}this.compile=function(b,N,X=null){X===null&&(X=b),g=et.get(X),g.init(N),v.push(g),X.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(g.pushLight(z),z.castShadow&&g.pushShadow(z))}),b!==X&&b.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(g.pushLight(z),z.castShadow&&g.pushShadow(z))}),g.setupLights();const K=new Set;return b.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const de=z.material;if(de)if(Array.isArray(de))for(let _e=0;_e<de.length;_e++){const he=de[_e];ft(he,X,z),K.add(he)}else ft(de,X,z),K.add(de)}),v.pop(),g=null,K},this.compileAsync=function(b,N,X=null){const K=this.compile(b,N,X);return new Promise(z=>{function de(){if(K.forEach(function(_e){Ee.get(_e).currentProgram.isReady()&&K.delete(_e)}),K.size===0){z(b);return}setTimeout(de,10)}ae.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let ie=null;function we(b){ie&&ie(b)}function rt(){ct.stop()}function je(){ct.start()}const ct=new uu;ct.setAnimationLoop(we),typeof self<"u"&&ct.setContext(self),this.setAnimationLoop=function(b){ie=b,$.setAnimationLoop(b),b===null?ct.stop():ct.start()},$.addEventListener("sessionstart",rt),$.addEventListener("sessionend",je),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(N),N=$.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,N,P),g=et.get(b,v.length),g.init(N),v.push(g),Oe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(Oe),Pe=this.localClippingEnabled,oe=le.init(this.clippingPlanes,Pe),m=Ae.get(b,y.length),m.init(),y.push(m),$.enabled===!0&&$.isPresenting===!0){const de=_.xr.getDepthSensingMesh();de!==null&&Lt(de,N,-1/0,_.sortObjects)}Lt(b,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(F,W),te=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,te&&He.addToRenderList(m,b),this.info.render.frame++,oe===!0&&le.beginShadows();const X=g.state.shadowsArray;Le.render(X,b,N),oe===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,z=m.transmissive;if(g.setupLights(),N.isArrayCamera){const de=N.cameras;if(z.length>0)for(let _e=0,he=de.length;_e<he;_e++){const fe=de[_e];Ct(K,z,b,fe)}te&&He.render(b);for(let _e=0,he=de.length;_e<he;_e++){const fe=de[_e];ei(m,b,fe,fe.viewport)}}else z.length>0&&Ct(K,z,b,N),te&&He.render(b),ei(m,b,N);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(_,b,N),st.resetDefaultState(),w=-1,M=null,v.pop(),v.length>0?(g=v[v.length-1],oe===!0&&le.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Lt(b,N,X,K){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)g.pushLight(b),b.castShadow&&g.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Z.intersectsSprite(b)){K&&Ge.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Oe);const _e=ee.update(b),he=b.material;he.visible&&m.push(b,_e,he,X,Ge.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Z.intersectsObject(b))){const _e=ee.update(b),he=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ge.copy(b.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ge.copy(_e.boundingSphere.center)),Ge.applyMatrix4(b.matrixWorld).applyMatrix4(Oe)),Array.isArray(he)){const fe=_e.groups;for(let Ce=0,ve=fe.length;Ce<ve;Ce++){const be=fe[Ce],Je=he[be.materialIndex];Je&&Je.visible&&m.push(b,_e,Je,X,Ge.z,be)}}else he.visible&&m.push(b,_e,he,X,Ge.z,null)}}const de=b.children;for(let _e=0,he=de.length;_e<he;_e++)Lt(de[_e],N,X,K)}function ei(b,N,X,K){const z=b.opaque,de=b.transmissive,_e=b.transparent;g.setupLightsView(X),oe===!0&&le.setGlobalState(_.clippingPlanes,X),K&&me.viewport(I.copy(K)),z.length>0&&en(z,N,X),de.length>0&&en(de,N,X),_e.length>0&&en(_e,N,X),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Ct(b,N,X,K){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[K.id]===void 0&&(g.state.transmissionRenderTarget[K.id]=new Sn(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?Kn:$n,minFilter:Wn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace}));const de=g.state.transmissionRenderTarget[K.id],_e=K.viewport||I;de.setSize(_e.z,_e.w);const he=_.getRenderTarget();_.setRenderTarget(de),_.getClearColor(O),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),te&&He.render(X);const fe=_.toneMapping;_.toneMapping=gi;const Ce=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),g.setupLightsView(K),oe===!0&&le.setGlobalState(_.clippingPlanes,K),en(b,X,K),R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de),ae.has("WEBGL_multisampled_render_to_texture")===!1){let ve=!1;for(let be=0,Je=N.length;be<Je;be++){const pt=N[be],wt=pt.object,tn=pt.geometry,gt=pt.material,ke=pt.group;if(gt.side===an&&wt.layers.test(K.layers)){const Dn=gt.side;gt.side=qt,gt.needsUpdate=!0,yi(wt,X,K,tn,gt,ke),gt.side=Dn,gt.needsUpdate=!0,ve=!0}}ve===!0&&(R.updateMultisampleRenderTarget(de),R.updateRenderTargetMipmap(de))}_.setRenderTarget(he),_.setClearColor(O,Y),Ce!==void 0&&(K.viewport=Ce),_.toneMapping=fe}function en(b,N,X){const K=N.isScene===!0?N.overrideMaterial:null;for(let z=0,de=b.length;z<de;z++){const _e=b[z],he=_e.object,fe=_e.geometry,Ce=K===null?_e.material:K,ve=_e.group;he.layers.test(X.layers)&&yi(he,N,X,fe,Ce,ve)}}function yi(b,N,X,K,z,de){b.onBeforeRender(_,N,X,K,z,de),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),z.onBeforeRender(_,N,X,K,b,de),z.transparent===!0&&z.side===an&&z.forceSinglePass===!1?(z.side=qt,z.needsUpdate=!0,_.renderBufferDirect(X,N,K,z,b,de),z.side=jn,z.needsUpdate=!0,_.renderBufferDirect(X,N,K,z,b,de),z.side=an):_.renderBufferDirect(X,N,K,z,b,de),b.onAfterRender(_,N,X,K,z,de)}function mn(b,N,X){N.isScene!==!0&&(N=lt);const K=Ee.get(b),z=g.state.lights,de=g.state.shadowsArray,_e=z.state.version,he=Re.getParameters(b,z.state,de,N,X),fe=Re.getProgramCacheKey(he);let Ce=K.programs;K.environment=b.isMeshStandardMaterial?N.environment:null,K.fog=N.fog,K.envMap=(b.isMeshStandardMaterial?q:S).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ce===void 0&&(b.addEventListener("dispose",$e),Ce=new Map,K.programs=Ce);let ve=Ce.get(fe);if(ve!==void 0){if(K.currentProgram===ve&&K.lightsStateVersion===_e)return ti(b,he),ve}else he.uniforms=Re.getUniforms(b),b.onBeforeCompile(he,_),ve=Re.acquireProgram(he,fe),Ce.set(fe,ve),K.uniforms=he.uniforms;const be=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(be.clippingPlanes=le.uniform),ti(b,he),K.needsLights=ii(b),K.lightsStateVersion=_e,K.needsLights&&(be.ambientLightColor.value=z.state.ambient,be.lightProbe.value=z.state.probe,be.directionalLights.value=z.state.directional,be.directionalLightShadows.value=z.state.directionalShadow,be.spotLights.value=z.state.spot,be.spotLightShadows.value=z.state.spotShadow,be.rectAreaLights.value=z.state.rectArea,be.ltc_1.value=z.state.rectAreaLTC1,be.ltc_2.value=z.state.rectAreaLTC2,be.pointLights.value=z.state.point,be.pointLightShadows.value=z.state.pointShadow,be.hemisphereLights.value=z.state.hemi,be.directionalShadowMap.value=z.state.directionalShadowMap,be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,be.spotShadowMap.value=z.state.spotShadowMap,be.spotLightMatrix.value=z.state.spotLightMatrix,be.spotLightMap.value=z.state.spotLightMap,be.pointShadowMap.value=z.state.pointShadowMap,be.pointShadowMatrix.value=z.state.pointShadowMatrix),K.currentProgram=ve,K.uniformsList=null,ve}function In(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=ro.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function ti(b,N){const X=Ee.get(b);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}function Mi(b,N,X,K,z){N.isScene!==!0&&(N=lt),R.resetTextureUnits();const de=N.fog,_e=K.isMeshStandardMaterial?N.environment:null,he=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Qt,fe=(K.isMeshStandardMaterial?q:S).get(K.envMap||_e),Ce=K.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ve=!!X.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),be=!!X.morphAttributes.position,Je=!!X.morphAttributes.normal,pt=!!X.morphAttributes.color;let wt=gi;K.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(wt=_.toneMapping);const tn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,gt=tn!==void 0?tn.length:0,ke=Ee.get(K),Dn=g.state.lights;if(oe===!0&&(Pe===!0||b!==M)){const cn=b===M&&K.id===w;le.setState(K,b,cn)}let xt=!1;K.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Dn.state.version||ke.outputColorSpace!==he||z.isBatchedMesh&&ke.batching===!1||!z.isBatchedMesh&&ke.batching===!0||z.isBatchedMesh&&ke.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&ke.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&ke.instancing===!1||!z.isInstancedMesh&&ke.instancing===!0||z.isSkinnedMesh&&ke.skinning===!1||!z.isSkinnedMesh&&ke.skinning===!0||z.isInstancedMesh&&ke.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&ke.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&ke.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&ke.instancingMorph===!1&&z.morphTexture!==null||ke.envMap!==fe||K.fog===!0&&ke.fog!==de||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==le.numPlanes||ke.numIntersection!==le.numIntersection)||ke.vertexAlphas!==Ce||ke.vertexTangents!==ve||ke.morphTargets!==be||ke.morphNormals!==Je||ke.morphColors!==pt||ke.toneMapping!==wt||ke.morphTargetsCount!==gt)&&(xt=!0):(xt=!0,ke.__version=K.version);let gn=ke.currentProgram;xt===!0&&(gn=mn(K,N,z));let Oi=!1,sn=!1,Rs=!1;const Tt=gn.getUniforms(),wn=ke.uniforms;if(me.useProgram(gn.program)&&(Oi=!0,sn=!0,Rs=!0),K.id!==w&&(w=K.id,sn=!0),Oi||M!==b){me.buffers.depth.getReversed()?(pe.copy(b.projectionMatrix),jd(pe),Zd(pe),Tt.setValue(D,"projectionMatrix",pe)):Tt.setValue(D,"projectionMatrix",b.projectionMatrix),Tt.setValue(D,"viewMatrix",b.matrixWorldInverse);const si=Tt.map.cameraPosition;si!==void 0&&si.setValue(D,Ke.setFromMatrixPosition(b.matrixWorld)),Te.logarithmicDepthBuffer&&Tt.setValue(D,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Tt.setValue(D,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,sn=!0,Rs=!0)}if(z.isSkinnedMesh){Tt.setOptional(D,z,"bindMatrix"),Tt.setOptional(D,z,"bindMatrixInverse");const cn=z.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),Tt.setValue(D,"boneTexture",cn.boneTexture,R))}z.isBatchedMesh&&(Tt.setOptional(D,z,"batchingTexture"),Tt.setValue(D,"batchingTexture",z._matricesTexture,R),Tt.setOptional(D,z,"batchingIdTexture"),Tt.setValue(D,"batchingIdTexture",z._indirectTexture,R),Tt.setOptional(D,z,"batchingColorTexture"),z._colorsTexture!==null&&Tt.setValue(D,"batchingColorTexture",z._colorsTexture,R));const Ps=X.morphAttributes;if((Ps.position!==void 0||Ps.normal!==void 0||Ps.color!==void 0)&&We.update(z,X,gn),(sn||ke.receiveShadow!==z.receiveShadow)&&(ke.receiveShadow=z.receiveShadow,Tt.setValue(D,"receiveShadow",z.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(wn.envMap.value=fe,wn.flipEnvMap.value=fe.isCubeTexture&&fe.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&N.environment!==null&&(wn.envMapIntensity.value=N.environmentIntensity),sn&&(Tt.setValue(D,"toneMappingExposure",_.toneMappingExposure),ke.needsLights&&ni(wn,Rs),de&&K.fog===!0&&ge.refreshFogUniforms(wn,de),ge.refreshMaterialUniforms(wn,K,G,J,g.state.transmissionRenderTarget[b.id]),ro.upload(D,In(ke),wn,R)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(ro.upload(D,In(ke),wn,R),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Tt.setValue(D,"center",z.center),Tt.setValue(D,"modelViewMatrix",z.modelViewMatrix),Tt.setValue(D,"normalMatrix",z.normalMatrix),Tt.setValue(D,"modelMatrix",z.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const cn=K.uniformsGroups;for(let si=0,ri=cn.length;si<ri;si++){const Xl=cn[si];B.update(Xl,gn),B.bind(Xl,gn)}}return gn}function ni(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function ii(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,N,X){Ee.get(b.texture).__webglTexture=N,Ee.get(b.depthTexture).__webglTexture=X;const K=Ee.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=X===void 0,K.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const X=Ee.get(b);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,X=0){P=b,T=N,A=X;let K=!0,z=null,de=!1,_e=!1;if(b){const fe=Ee.get(b);if(fe.__useDefaultFramebuffer!==void 0)me.bindFramebuffer(D.FRAMEBUFFER,null),K=!1;else if(fe.__webglFramebuffer===void 0)R.setupRenderTarget(b);else if(fe.__hasExternalTextures)R.rebindTextures(b,Ee.get(b.texture).__webglTexture,Ee.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const be=b.depthTexture;if(fe.__boundDepthTexture!==be){if(be!==null&&Ee.has(be)&&(b.width!==be.image.width||b.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(b)}}const Ce=b.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(_e=!0);const ve=Ee.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ve[N])?z=ve[N][X]:z=ve[N],de=!0):b.samples>0&&R.useMultisampledRTT(b)===!1?z=Ee.get(b).__webglMultisampledFramebuffer:Array.isArray(ve)?z=ve[X]:z=ve,I.copy(b.viewport),H.copy(b.scissor),U=b.scissorTest}else I.copy(j).multiplyScalar(G).floor(),H.copy(ce).multiplyScalar(G).floor(),U=Be;if(me.bindFramebuffer(D.FRAMEBUFFER,z)&&K&&me.drawBuffers(b,z),me.viewport(I),me.scissor(H),me.setScissorTest(U),de){const fe=Ee.get(b.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,X)}else if(_e){const fe=Ee.get(b.texture),Ce=N||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,fe.__webglTexture,X||0,Ce)}w=-1},this.readRenderTargetPixels=function(b,N,X,K,z,de,_e){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Ee.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(he=he[_e]),he){me.bindFramebuffer(D.FRAMEBUFFER,he);try{const fe=b.texture,Ce=fe.format,ve=fe.type;if(!Te.textureFormatReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-K&&X>=0&&X<=b.height-z&&D.readPixels(N,X,K,z,Ye.convert(Ce),Ye.convert(ve),de)}finally{const fe=P!==null?Ee.get(P).__webglFramebuffer:null;me.bindFramebuffer(D.FRAMEBUFFER,fe)}}},this.readRenderTargetPixelsAsync=async function(b,N,X,K,z,de,_e){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Ee.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(he=he[_e]),he){const fe=b.texture,Ce=fe.format,ve=fe.type;if(!Te.textureFormatReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-K&&X>=0&&X<=b.height-z){me.bindFramebuffer(D.FRAMEBUFFER,he);const be=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.bufferData(D.PIXEL_PACK_BUFFER,de.byteLength,D.STREAM_READ),D.readPixels(N,X,K,z,Ye.convert(Ce),Ye.convert(ve),0);const Je=P!==null?Ee.get(P).__webglFramebuffer:null;me.bindFramebuffer(D.FRAMEBUFFER,Je);const pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Yd(D,pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,de),D.deleteBuffer(be),D.deleteSync(pt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,X=0){b.isTexture!==!0&&(Xs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);const K=Math.pow(2,-X),z=Math.floor(b.image.width*K),de=Math.floor(b.image.height*K),_e=N!==null?N.x:0,he=N!==null?N.y:0;R.setTexture2D(b,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,_e,he,z,de),me.unbindTexture()},this.copyTextureToTexture=function(b,N,X=null,K=null,z=0){b.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],N=arguments[2],z=arguments[3]||0,X=null);let de,_e,he,fe,Ce,ve,be,Je,pt;const wt=b.isCompressedTexture?b.mipmaps[z]:b.image;X!==null?(de=X.max.x-X.min.x,_e=X.max.y-X.min.y,he=X.isBox3?X.max.z-X.min.z:1,fe=X.min.x,Ce=X.min.y,ve=X.isBox3?X.min.z:0):(de=wt.width,_e=wt.height,he=wt.depth||1,fe=0,Ce=0,ve=0),K!==null?(be=K.x,Je=K.y,pt=K.z):(be=0,Je=0,pt=0);const tn=Ye.convert(N.format),gt=Ye.convert(N.type);let ke;N.isData3DTexture?(R.setTexture3D(N,0),ke=D.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(R.setTexture2DArray(N,0),ke=D.TEXTURE_2D_ARRAY):(R.setTexture2D(N,0),ke=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const Dn=D.getParameter(D.UNPACK_ROW_LENGTH),xt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),gn=D.getParameter(D.UNPACK_SKIP_PIXELS),Oi=D.getParameter(D.UNPACK_SKIP_ROWS),sn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,wt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,wt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ce),D.pixelStorei(D.UNPACK_SKIP_IMAGES,ve);const Rs=b.isDataArrayTexture||b.isData3DTexture,Tt=N.isDataArrayTexture||N.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const wn=Ee.get(b),Ps=Ee.get(N),cn=Ee.get(wn.__renderTarget),si=Ee.get(Ps.__renderTarget);me.bindFramebuffer(D.READ_FRAMEBUFFER,cn.__webglFramebuffer),me.bindFramebuffer(D.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let ri=0;ri<he;ri++)Rs&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(b).__webglTexture,z,ve+ri),b.isDepthTexture?(Tt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ee.get(N).__webglTexture,z,pt+ri),D.blitFramebuffer(fe,Ce,de,_e,be,Je,de,_e,D.DEPTH_BUFFER_BIT,D.NEAREST)):Tt?D.copyTexSubImage3D(ke,z,be,Je,pt+ri,fe,Ce,de,_e):D.copyTexSubImage2D(ke,z,be,Je,pt+ri,fe,Ce,de,_e);me.bindFramebuffer(D.READ_FRAMEBUFFER,null),me.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Tt?b.isDataTexture||b.isData3DTexture?D.texSubImage3D(ke,z,be,Je,pt,de,_e,he,tn,gt,wt.data):N.isCompressedArrayTexture?D.compressedTexSubImage3D(ke,z,be,Je,pt,de,_e,he,tn,wt.data):D.texSubImage3D(ke,z,be,Je,pt,de,_e,he,tn,gt,wt):b.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,z,be,Je,de,_e,tn,gt,wt.data):b.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,z,be,Je,wt.width,wt.height,tn,wt.data):D.texSubImage2D(D.TEXTURE_2D,z,be,Je,de,_e,tn,gt,wt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Dn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,gn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Oi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,sn),z===0&&N.generateMipmaps&&D.generateMipmap(ke),me.unbindTexture()},this.copyTextureToTexture3D=function(b,N,X=null,K=null,z=0){return b.isTexture!==!0&&(Xs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,K=arguments[1]||null,b=arguments[2],N=arguments[3],z=arguments[4]||0),Xs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,N,X,K,z)},this.initRenderTarget=function(b){Ee.get(b).__webglFramebuffer===void 0&&R.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?R.setTextureCube(b,0):b.isData3DTexture?R.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?R.setTexture2DArray(b,0):R.setTexture2D(b,0),me.unbindTexture()},this.resetState=function(){T=0,A=0,P=null,me.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}class lo{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new De(e),this.density=t}clone(){return new lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xu extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class _u{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=al,this.updateRanges=[],this.version=0,this.uuid=pn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Kt=new E;class rr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),i=yt(i,this.array),r=yt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new rr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Xt extends bn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ji;const Us=new E,Qi=new E,es=new E,ts=new ne,Fs=new ne,vu=new Qe,Nr=new E,Os=new E,Ur=new E,qc=new ne,Zo=new ne,Kc=new ne;class $t extends At{constructor(e=new Xt){if(super(),this.isSprite=!0,this.type="Sprite",Ji===void 0){Ji=new _t;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _u(t,5);Ji.setIndex([0,1,2,0,2,3]),Ji.setAttribute("position",new rr(n,3,0,!1)),Ji.setAttribute("uv",new rr(n,2,3,!1))}this.geometry=Ji,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qi.setFromMatrixScale(this.matrixWorld),vu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qi.multiplyScalar(-es.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Fr(Nr.set(-.5,-.5,0),es,o,Qi,i,r),Fr(Os.set(.5,-.5,0),es,o,Qi,i,r),Fr(Ur.set(.5,.5,0),es,o,Qi,i,r),qc.set(0,0),Zo.set(1,0),Kc.set(1,1);let a=e.ray.intersectTriangle(Nr,Os,Ur,!1,Us);if(a===null&&(Fr(Os.set(-.5,.5,0),es,o,Qi,i,r),Zo.set(0,1),a=e.ray.intersectTriangle(Nr,Ur,Os,!1,Us),a===null))return;const l=e.ray.origin.distanceTo(Us);l<e.near||l>e.far||t.push({distance:l,point:Us.clone(),uv:dn.getInterpolation(Us,Nr,Os,Ur,qc,Zo,Kc,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Fr(s,e,t,n,i,r){ts.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Fs.x=r*ts.x-i*ts.y,Fs.y=i*ts.x+r*ts.y):Fs.copy(ts),s.copy(e),s.x+=Fs.x,s.y+=Fs.y,s.applyMatrix4(vu)}const Yc=new E,jc=new mt,Zc=new mt,ox=new E,$c=new Qe,Or=new E,$o=new Rn,Jc=new Qe,Jo=new go;class ax extends L{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jl,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Cn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Or),this.boundingBox.expandByPoint(Or)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Rn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Or),this.boundingSphere.expandByPoint(Or)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$o.copy(this.boundingSphere),$o.applyMatrix4(i),e.ray.intersectsSphere($o)!==!1&&(Jc.copy(i).invert(),Jo.copy(e.ray).applyMatrix4(Jc),!(this.boundingBox!==null&&Jo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_d?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;jc.fromBufferAttribute(i.attributes.skinIndex,e),Zc.fromBufferAttribute(i.attributes.skinWeight,e),Yc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Zc.getComponent(r);if(o!==0){const a=jc.getComponent(r);$c.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ox.copy(Yc).applyMatrix4($c),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class yu extends At{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Mu extends Ot{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Jt,h=Jt,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qc=new Qe,lx=new Qe;class Nl{constructor(e=[],t=[]){this.uuid=pn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:lx;Qc.multiplyMatrices(a,t[r]),Qc.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Nl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Mu(t,e,e,fn,Mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new yu),this.bones.push(o),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class hl extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ns=new Qe,eh=new Qe,Br=[],th=new Cn,cx=new Qe,Bs=new L,ks=new Rn;class hx extends L{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,cx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),th.copy(e.boundingBox).applyMatrix4(ns),this.boundingBox.union(th)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Rn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),ks.copy(e.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(ks)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),e.ray.intersectsSphere(ks)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ns),eh.multiplyMatrices(n,ns),Bs.matrixWorld=eh,Bs.raycast(e,Br);for(let o=0,a=Br.length;o<a;o++){const l=Br[o];l.instanceId=r,l.object=this,t.push(l)}Br.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new hl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Mu(new Float32Array(i*this.count),i,this.count,Al,Mn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Su extends bn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const co=new E,ho=new E,nh=new Qe,zs=new go,kr=new Rn,Qo=new E,ih=new E;class Ul extends At{constructor(e=new _t,t=new Su){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)co.fromBufferAttribute(t,i-1),ho.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=co.distanceTo(ho);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(i),kr.radius+=r,e.ray.intersectsSphere(kr)===!1)return;nh.copy(i).invert(),zs.copy(e.ray).applyMatrix4(nh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let x=f,m=p-1;x<m;x+=c){const g=h.getX(x),y=h.getX(x+1),v=zr(this,e,zs,l,g,y);v&&t.push(v)}if(this.isLineLoop){const x=h.getX(p-1),m=h.getX(f),g=zr(this,e,zs,l,x,m);g&&t.push(g)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let x=f,m=p-1;x<m;x+=c){const g=zr(this,e,zs,l,x,x+1);g&&t.push(g)}if(this.isLineLoop){const x=zr(this,e,zs,l,p-1,f);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zr(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(co.fromBufferAttribute(o,i),ho.fromBufferAttribute(o,r),t.distanceSqToSegment(co,ho,Qo,ih)>n)return;Qo.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Qo);if(!(l<e.near||l>e.far))return{distance:l,point:ih.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const sh=new E,rh=new E;class ux extends Ul{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)sh.fromBufferAttribute(t,i),rh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+sh.distanceTo(rh);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dx extends Ul{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class vo extends bn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oh=new Qe,ul=new go,Gr=new Rn,Hr=new E;class Fl extends At{constructor(e=new _t,t=new vo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(i),Gr.radius+=r,e.ray.intersectsSphere(Gr)===!1)return;oh.copy(i).invert(),ul.copy(e.ray).applyMatrix4(oh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,x=f;p<x;p++){const m=c.getX(p);Hr.fromBufferAttribute(u,m),ah(Hr,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,x=f;p<x;p++)Hr.fromBufferAttribute(u,p),ah(Hr,p,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ah(s,e,t,n,i,r,o){const a=ul.distanceSqToPoint(s);if(a<t){const l=new E;ul.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class zt extends Ot{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ne:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new E,i=[],r=[],o=[],a=new E,l=new Qe;for(let f=0;f<=e;f++){const p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ut(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ut(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ol extends Pn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ne){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class fx extends Ol{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Bl(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const Vr=new E,ea=new Bl,ta=new Bl,na=new Bl;class os extends Pn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Vr.subVectors(i[0],i[1]).add(i[0]),c=Vr);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Vr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),ea.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,x,m),ta.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,x,m),na.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(ea.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ta.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),na.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ea.calc(l),ta.calc(l),na.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lh(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function px(s,e){const t=1-s;return t*t*e}function mx(s,e){return 2*(1-s)*s*e}function gx(s,e){return s*s*e}function $s(s,e,t,n){return px(s,e)+mx(s,t)+gx(s,n)}function xx(s,e){const t=1-s;return t*t*t*e}function _x(s,e){const t=1-s;return 3*t*t*s*e}function vx(s,e){return 3*(1-s)*s*s*e}function yx(s,e){return s*s*s*e}function Js(s,e,t,n,i){return xx(s,e)+_x(s,t)+vx(s,n)+yx(s,i)}class bu extends Pn{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(e,i.x,r.x,o.x,a.x),Js(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mx extends Pn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(e,i.x,r.x,o.x,a.x),Js(e,i.y,r.y,o.y,a.y),Js(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class wu extends Pn{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sx extends Pn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tu extends Pn{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set($s(e,i.x,r.x,o.x),$s(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Eu extends Pn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set($s(e,i.x,r.x,o.x),$s(e,i.y,r.y,o.y),$s(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Au extends Pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(lh(a,l.x,c.x,h.x,u.x),lh(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ne().fromArray(i))}return this}}var uo=Object.freeze({__proto__:null,ArcCurve:fx,CatmullRomCurve3:os,CubicBezierCurve:bu,CubicBezierCurve3:Mx,EllipseCurve:Ol,LineCurve:wu,LineCurve3:Sx,QuadraticBezierCurve:Tu,QuadraticBezierCurve3:Eu,SplineCurve:Au});class bx extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new uo[i.type]().fromJSON(i))}return this}}class dl extends bx{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new wu(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Tu(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new bu(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Au(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){const c=new Ol(e,t,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class vs extends _t{constructor(e=[new ne(0,-.5),new ne(.5,0),new ne(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Ut(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/t,u=new E,d=new ne,f=new E,p=new E,x=new E;let m=0,g=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[y+1].x-e[y].x,g=e[y+1].y-e[y].y,f.x=g*1,f.y=-m,f.z=g*0,p.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(p)}for(let y=0;y<=t;y++){const v=n+y*h*i,_=Math.sin(v),C=Math.cos(v);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*_,u.y=e[T].y,u.z=e[T].x*C,o.push(u.x,u.y,u.z),d.x=y/t,d.y=T/(e.length-1),a.push(d.x,d.y);const A=l[3*T+0]*_,P=l[3*T+1],w=l[3*T+0]*C;c.push(A,P,w)}}for(let y=0;y<t;y++)for(let v=0;v<e.length-1;v++){const _=v+y*e.length,C=_,T=_+e.length,A=_+e.length+1,P=_+1;r.push(C,T,P),r.push(A,P,T)}this.setIndex(r),this.setAttribute("position",new Ze(o,3)),this.setAttribute("uv",new Ze(a,2)),this.setAttribute("normal",new Ze(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.points,e.segments,e.phiStart,e.phiLength)}}class Nt extends vs{constructor(e=1,t=1,n=4,i=8){const r=new dl;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new Nt(e.radius,e.length,e.capSegments,e.radialSegments)}}class Cu extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new E,h=new ne;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(a,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cu(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ot extends _t{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let p=0;const x=[],m=n/2;let g=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(d,3)),this.setAttribute("uv",new Ze(f,2));function y(){const _=new E,C=new E;let T=0;const A=(t-e)/n;for(let P=0;P<=r;P++){const w=[],M=P/r,I=M*(t-e)+e;for(let H=0;H<=i;H++){const U=H/i,O=U*l+a,Y=Math.sin(O),V=Math.cos(O);C.x=I*Y,C.y=-M*n+m,C.z=I*V,u.push(C.x,C.y,C.z),_.set(Y,A,V).normalize(),d.push(_.x,_.y,_.z),f.push(U,1-M),w.push(p++)}x.push(w)}for(let P=0;P<i;P++)for(let w=0;w<r;w++){const M=x[w][P],I=x[w+1][P],H=x[w+1][P+1],U=x[w][P+1];(e>0||w!==0)&&(h.push(M,I,U),T+=3),(t>0||w!==r-1)&&(h.push(I,H,U),T+=3)}c.addGroup(g,T,0),g+=T}function v(_){const C=p,T=new ne,A=new E;let P=0;const w=_===!0?e:t,M=_===!0?1:-1;for(let H=1;H<=i;H++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),p++;const I=p;for(let H=0;H<=i;H++){const O=H/i*l+a,Y=Math.cos(O),V=Math.sin(O);A.x=w*V,A.y=m*M,A.z=w*Y,u.push(A.x,A.y,A.z),d.push(0,M,0),T.x=Y*.5+.5,T.y=V*.5*M+.5,f.push(T.x,T.y),p++}for(let H=0;H<i;H++){const U=C+H,O=I+H;_===!0?h.push(O,O+1,U):h.push(O+1,O,U),P+=3}c.addGroup(g,P,_===!0?1:2),g+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ot(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class St extends ot{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new St(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class kl extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Ze(r,3)),this.setAttribute("normal",new Ze(r.slice(),3)),this.setAttribute("uv",new Ze(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new E,_=new E,C=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],v),f(t[T+1],_),f(t[T+2],C),l(v,_,C,y)}function l(y,v,_,C){const T=C+1,A=[];for(let P=0;P<=T;P++){A[P]=[];const w=y.clone().lerp(_,P/T),M=v.clone().lerp(_,P/T),I=T-P;for(let H=0;H<=I;H++)H===0&&P===T?A[P][H]=w:A[P][H]=w.clone().lerp(M,H/I)}for(let P=0;P<T;P++)for(let w=0;w<2*(T-P)-1;w++){const M=Math.floor(w/2);w%2===0?(d(A[P][M+1]),d(A[P+1][M]),d(A[P][M])):(d(A[P][M+1]),d(A[P+1][M+1]),d(A[P+1][M]))}}function c(y){const v=new E;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(y),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function h(){const y=new E;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const _=m(y)/2/Math.PI+.5,C=g(y)/Math.PI+.5;o.push(_,1-C)}p(),u()}function u(){for(let y=0;y<o.length;y+=6){const v=o[y+0],_=o[y+2],C=o[y+4],T=Math.max(v,_,C),A=Math.min(v,_,C);T>.9&&A<.1&&(v<.2&&(o[y+0]+=1),_<.2&&(o[y+2]+=1),C<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,v){const _=y*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function p(){const y=new E,v=new E,_=new E,C=new E,T=new ne,A=new ne,P=new ne;for(let w=0,M=0;w<r.length;w+=9,M+=6){y.set(r[w+0],r[w+1],r[w+2]),v.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),T.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),C.copy(y).add(v).add(_).divideScalar(3);const I=m(C);x(T,M+0,y,I),x(A,M+2,v,I),x(P,M+4,_,I)}}function x(y,v,_,C){C<0&&y.x===1&&(o[v]=y.x-1),_.x===0&&_.z===0&&(o[v]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function g(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kl(e.vertices,e.indices,e.radius,e.details)}}class cr extends dl{constructor(e){super(e),this.uuid=pn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new dl().fromJSON(i))}return this}}const wx={triangulate:function(s,e,t=2){const n=e&&e.length,i=n?e[0]*t:s.length;let r=Ru(s,0,i,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=Rx(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let p=t;p<i;p+=t)u=s[p],d=s[p+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return or(r,o,t,a,l,f,0),o}};function Ru(s,e,t,n,i){let r,o;if(i===zx(s,e,t,n)>0)for(r=e;r<t;r+=n)o=ch(r,s[r],s[r+1],o);else for(r=t-n;r>=e;r-=n)o=ch(r,s[r],s[r+1],o);return o&&yo(o,o.next)&&(lr(o),o=o.next),o}function Ui(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(yo(t,t.next)||Pt(t.prev,t,t.next)===0)){if(lr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function or(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Nx(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Ex(s,n,i,r):Tx(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),lr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Ax(Ui(s),e,t),or(s,e,t,n,i,r,2)):o===2&&Cx(s,e,t,n,i,r):or(Ui(s),e,t,n,i,r,1);break}}}function Tx(s){const e=s.prev,t=s,n=s.next;if(Pt(e,t,n)>=0)return!1;const i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&as(i,a,r,l,o,c,p.x,p.y)&&Pt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Ex(s,e,t,n){const i=s.prev,r=s,o=s.next;if(Pt(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,p=h<u?h<d?h:d:u<d?u:d,x=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,g=fl(f,p,e,t,n),y=fl(x,m,e,t,n);let v=s.prevZ,_=s.nextZ;for(;v&&v.z>=g&&_&&_.z<=y;){if(v.x>=f&&v.x<=x&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&as(a,h,l,u,c,d,v.x,v.y)&&Pt(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=f&&_.x<=x&&_.y>=p&&_.y<=m&&_!==i&&_!==o&&as(a,h,l,u,c,d,_.x,_.y)&&Pt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=g;){if(v.x>=f&&v.x<=x&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&as(a,h,l,u,c,d,v.x,v.y)&&Pt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=y;){if(_.x>=f&&_.x<=x&&_.y>=p&&_.y<=m&&_!==i&&_!==o&&as(a,h,l,u,c,d,_.x,_.y)&&Pt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ax(s,e,t){let n=s;do{const i=n.prev,r=n.next.next;!yo(i,r)&&Pu(i,n,n.next,r)&&ar(i,r)&&ar(r,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),lr(n),lr(n.next),n=s=r),n=n.next}while(n!==s);return Ui(n)}function Cx(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ox(o,a)){let l=Lu(o,a);o=Ui(o,o.next),l=Ui(l,l.next),or(o,e,t,n,i,r,0),or(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Rx(s,e,t,n){const i=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Ru(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Fx(c));for(i.sort(Px),r=0;r<i.length;r++)t=Lx(i[r],t);return t}function Px(s,e){return s.x-e.x}function Lx(s,e){const t=Ix(s,e);if(!t)return e;const n=Lu(t,s);return Ui(n,n.next),Ui(t,t.next)}function Ix(s,e){let t=e,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===r))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;t=i;do r>=t.x&&t.x>=l&&r!==t.x&&as(o<c?r:n,o,l,c,o<c?n:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),ar(t,s)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Dx(i,t)))&&(i=t,h=u)),t=t.next;while(t!==a);return i}function Dx(s,e){return Pt(s.prev,s,e.prev)<0&&Pt(e.next,s,s.next)<0}function Nx(s,e,t,n){let i=s;do i.z===0&&(i.z=fl(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ux(i)}function Ux(s){let e,t,n,i,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;t=n}r.nextZ=null,c*=2}while(o>1);return s}function fl(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Fx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function as(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Ox(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Bx(s,e)&&(ar(s,e)&&ar(e,s)&&kx(s,e)&&(Pt(s.prev,s,e.prev)||Pt(s,e.prev,e))||yo(s,e)&&Pt(s.prev,s,s.next)>0&&Pt(e.prev,e,e.next)>0)}function Pt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function yo(s,e){return s.x===e.x&&s.y===e.y}function Pu(s,e,t,n){const i=Xr(Pt(s,e,t)),r=Xr(Pt(s,e,n)),o=Xr(Pt(t,n,s)),a=Xr(Pt(t,n,e));return!!(i!==r&&o!==a||i===0&&Wr(s,t,e)||r===0&&Wr(s,n,e)||o===0&&Wr(t,s,n)||a===0&&Wr(t,e,n))}function Wr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Xr(s){return s>0?1:s<0?-1:0}function Bx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Pu(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ar(s,e){return Pt(s.prev,s,s.next)<0?Pt(s,e,s.next)>=0&&Pt(s,s.prev,e)>=0:Pt(s,e,s.prev)<0||Pt(s,s.next,e)<0}function kx(s,e){let t=s,n=!1;const i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Lu(s,e){const t=new pl(s.i,s.x,s.y),n=new pl(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ch(s,e,t,n){const i=new pl(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function lr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function pl(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function zx(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class xi{static area(e){const t=e.length;let n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return xi.area(e)<0}static triangulateShape(e,t){const n=[],i=[],r=[];hh(e),uh(n,e);let o=e.length;t.forEach(hh);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,uh(n,t[l]);const a=wx.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function hh(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function uh(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class hr extends _t{constructor(e=new cr([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Ze(i,3)),this.setAttribute("uv",new Ze(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Gx;let v,_=!1,C,T,A,P;g&&(v=g.getSpacedPoints(h),_=!0,d=!1,C=g.computeFrenetFrames(h,!1),T=new E,A=new E,P=new E),d||(m=0,f=0,p=0,x=0);const w=a.extractPoints(c);let M=w.shape;const I=w.holes;if(!xi.isClockWise(M)){M=M.reverse();for(let te=0,ue=I.length;te<ue;te++){const D=I[te];xi.isClockWise(D)&&(I[te]=D.reverse())}}const U=xi.triangulateShape(M,I),O=M;for(let te=0,ue=I.length;te<ue;te++){const D=I[te];M=M.concat(D)}function Y(te,ue,D){return ue||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(ue,D)}const V=M.length,J=U.length;function G(te,ue,D){let Fe,ae,Te;const me=te.x-ue.x,ze=te.y-ue.y,Ee=D.x-te.x,R=D.y-te.y,S=me*me+ze*ze,q=me*R-ze*Ee;if(Math.abs(q)>Number.EPSILON){const Q=Math.sqrt(S),re=Math.sqrt(Ee*Ee+R*R),ee=ue.x-ze/Q,Re=ue.y+me/Q,ge=D.x-R/re,Ae=D.y+Ee/re,et=((ge-ee)*R-(Ae-Re)*Ee)/(me*R-ze*Ee);Fe=ee+me*et-te.x,ae=Re+ze*et-te.y;const le=Fe*Fe+ae*ae;if(le<=2)return new ne(Fe,ae);Te=Math.sqrt(le/2)}else{let Q=!1;me>Number.EPSILON?Ee>Number.EPSILON&&(Q=!0):me<-Number.EPSILON?Ee<-Number.EPSILON&&(Q=!0):Math.sign(ze)===Math.sign(R)&&(Q=!0),Q?(Fe=-ze,ae=me,Te=Math.sqrt(S)):(Fe=me,ae=ze,Te=Math.sqrt(S/2))}return new ne(Fe/Te,ae/Te)}const F=[];for(let te=0,ue=O.length,D=ue-1,Fe=te+1;te<ue;te++,D++,Fe++)D===ue&&(D=0),Fe===ue&&(Fe=0),F[te]=G(O[te],O[D],O[Fe]);const W=[];let j,ce=F.concat();for(let te=0,ue=I.length;te<ue;te++){const D=I[te];j=[];for(let Fe=0,ae=D.length,Te=ae-1,me=Fe+1;Fe<ae;Fe++,Te++,me++)Te===ae&&(Te=0),me===ae&&(me=0),j[Fe]=G(D[Fe],D[Te],D[me]);W.push(j),ce=ce.concat(j)}for(let te=0;te<m;te++){const ue=te/m,D=f*Math.cos(ue*Math.PI/2),Fe=p*Math.sin(ue*Math.PI/2)+x;for(let ae=0,Te=O.length;ae<Te;ae++){const me=Y(O[ae],F[ae],Fe);pe(me.x,me.y,-D)}for(let ae=0,Te=I.length;ae<Te;ae++){const me=I[ae];j=W[ae];for(let ze=0,Ee=me.length;ze<Ee;ze++){const R=Y(me[ze],j[ze],Fe);pe(R.x,R.y,-D)}}}const Be=p+x;for(let te=0;te<V;te++){const ue=d?Y(M[te],ce[te],Be):M[te];_?(A.copy(C.normals[0]).multiplyScalar(ue.x),T.copy(C.binormals[0]).multiplyScalar(ue.y),P.copy(v[0]).add(A).add(T),pe(P.x,P.y,P.z)):pe(ue.x,ue.y,0)}for(let te=1;te<=h;te++)for(let ue=0;ue<V;ue++){const D=d?Y(M[ue],ce[ue],Be):M[ue];_?(A.copy(C.normals[te]).multiplyScalar(D.x),T.copy(C.binormals[te]).multiplyScalar(D.y),P.copy(v[te]).add(A).add(T),pe(P.x,P.y,P.z)):pe(D.x,D.y,u/h*te)}for(let te=m-1;te>=0;te--){const ue=te/m,D=f*Math.cos(ue*Math.PI/2),Fe=p*Math.sin(ue*Math.PI/2)+x;for(let ae=0,Te=O.length;ae<Te;ae++){const me=Y(O[ae],F[ae],Fe);pe(me.x,me.y,u+D)}for(let ae=0,Te=I.length;ae<Te;ae++){const me=I[ae];j=W[ae];for(let ze=0,Ee=me.length;ze<Ee;ze++){const R=Y(me[ze],j[ze],Fe);_?pe(R.x,R.y+v[h-1].y,v[h-1].x+D):pe(R.x,R.y,u+D)}}}Z(),oe();function Z(){const te=i.length/3;if(d){let ue=0,D=V*ue;for(let Fe=0;Fe<J;Fe++){const ae=U[Fe];Oe(ae[2]+D,ae[1]+D,ae[0]+D)}ue=h+m*2,D=V*ue;for(let Fe=0;Fe<J;Fe++){const ae=U[Fe];Oe(ae[0]+D,ae[1]+D,ae[2]+D)}}else{for(let ue=0;ue<J;ue++){const D=U[ue];Oe(D[2],D[1],D[0])}for(let ue=0;ue<J;ue++){const D=U[ue];Oe(D[0]+V*h,D[1]+V*h,D[2]+V*h)}}n.addGroup(te,i.length/3-te,0)}function oe(){const te=i.length/3;let ue=0;Pe(O,ue),ue+=O.length;for(let D=0,Fe=I.length;D<Fe;D++){const ae=I[D];Pe(ae,ue),ue+=ae.length}n.addGroup(te,i.length/3-te,1)}function Pe(te,ue){let D=te.length;for(;--D>=0;){const Fe=D;let ae=D-1;ae<0&&(ae=te.length-1);for(let Te=0,me=h+m*2;Te<me;Te++){const ze=V*Te,Ee=V*(Te+1),R=ue+Fe+ze,S=ue+ae+ze,q=ue+ae+Ee,Q=ue+Fe+Ee;Ke(R,S,q,Q)}}}function pe(te,ue,D){l.push(te),l.push(ue),l.push(D)}function Oe(te,ue,D){Ge(te),Ge(ue),Ge(D);const Fe=i.length/3,ae=y.generateTopUV(n,i,Fe-3,Fe-2,Fe-1);lt(ae[0]),lt(ae[1]),lt(ae[2])}function Ke(te,ue,D,Fe){Ge(te),Ge(ue),Ge(Fe),Ge(ue),Ge(D),Ge(Fe);const ae=i.length/3,Te=y.generateSideWallUV(n,i,ae-6,ae-3,ae-2,ae-1);lt(Te[0]),lt(Te[1]),lt(Te[3]),lt(Te[1]),lt(Te[2]),lt(Te[3])}function Ge(te){i.push(l[te*3+0]),i.push(l[te*3+1]),i.push(l[te*3+2])}function lt(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Hx(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new uo[i.type]().fromJSON(i)),new hr(n,e.options)}}const Gx={generateTopUV:function(s,e,t,n,i){const r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ne(r,o),new ne(a,l),new ne(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],x=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ne(o,1-l),new ne(c,1-u),new ne(d,1-p),new ne(x,1-g)]:[new ne(a,1-l),new ne(h,1-u),new ne(f,1-p),new ne(m,1-g)]}};function Hx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ur extends kl{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ur(e.radius,e.detail)}}class Iu extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new E,p=new ne;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const g=r+m/n*o;f.x=u*Math.cos(g),f.y=u*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let x=0;x<i;x++){const m=x*(n+1);for(let g=0;g<n;g++){const y=g+m,v=y,_=y+n+1,C=y+n+2,T=y+1;a.push(v,_,T),a.push(_,C,T)}}this.setIndex(a),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Iu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Du extends _t{constructor(e=new cr([new ne(0,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],i=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ze(i,3)),this.setAttribute("normal",new Ze(r,3)),this.setAttribute("uv",new Ze(o,2));function c(h){const u=i.length/3,d=h.extractPoints(t);let f=d.shape;const p=d.holes;xi.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,g=p.length;m<g;m++){const y=p[m];xi.isClockWise(y)===!0&&(p[m]=y.reverse())}const x=xi.triangulateShape(f,p);for(let m=0,g=p.length;m<g;m++){const y=p[m];f=f.concat(y)}for(let m=0,g=f.length;m<g;m++){const y=f[m];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let m=0,g=x.length;m<g;m++){const y=x[m],v=y[0]+u,_=y[1]+u,C=y[2]+u;n.push(v,_,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Vx(t,e)}static fromJSON(e,t){const n=[];for(let i=0,r=e.shapes.length;i<r;i++){const o=t[e.shapes[i]];n.push(o)}return new Du(n,e.curveSegments)}}function Vx(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){const i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}class Xe extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new E,d=new E,f=[],p=[],x=[],m=[];for(let g=0;g<=n;g++){const y=[],v=g/n;let _=0;g===0&&o===0?_=.5/t:g===n&&l===Math.PI&&(_=-.5/t);for(let C=0;C<=t;C++){const T=C/t;u.x=-e*Math.cos(i+T*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(i+T*r)*Math.sin(o+v*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(T+_,1-v),y.push(c++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<t;y++){const v=h[g][y+1],_=h[g][y],C=h[g+1][y],T=h[g+1][y+1];(g!==0||o>0)&&f.push(v,_,T),(g!==n-1||l<Math.PI)&&f.push(_,C,T)}this.setIndex(f),this.setAttribute("position",new Ze(p,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xe(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zt extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new E,u=new E,d=new E;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const x=p/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const x=(i+1)*f+p-1,m=(i+1)*(f-1)+p-1,g=(i+1)*(f-1)+p,y=(i+1)*f+p;o.push(x,m,y),o.push(m,g,y)}this.setIndex(o),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Di extends _t{constructor(e=new Eu(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new E,l=new E,c=new ne;let h=new E;const u=[],d=[],f=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new Ze(u,3)),this.setAttribute("normal",new Ze(d,3)),this.setAttribute("uv",new Ze(f,2));function x(){for(let v=0;v<t;v++)m(v);m(r===!1?t:0),y(),g()}function m(v){h=e.getPointAt(v/t,h);const _=o.normals[v],C=o.binormals[v];for(let T=0;T<=i;T++){const A=T/i*Math.PI*2,P=Math.sin(A),w=-Math.cos(A);l.x=w*_.x+P*C.x,l.y=w*_.y+P*C.y,l.z=w*_.z+P*C.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let v=1;v<=t;v++)for(let _=1;_<=i;_++){const C=(i+1)*(v-1)+(_-1),T=(i+1)*v+(_-1),A=(i+1)*v+_,P=(i+1)*(v-1)+_;p.push(C,T,P),p.push(T,A,P)}}function y(){for(let v=0;v<=t;v++)for(let _=0;_<=i;_++)c.x=v/t,c.y=_/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Di(new uo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Wx extends Ht{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class Ue extends bn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qh,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ut extends Ue{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function qr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Xx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qx(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function dh(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Nu(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class dr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Kx extends dr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Zl,endingEnd:Zl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case $l:r=e,a=2*t-n;break;case Jl:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $l:o=e,l=2*n-t;break;case Jl:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),x=p*p,m=x*p,g=-d*m+2*d*x-d*p,y=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*p+1,v=(-1-f)*m+(1.5+f)*x+.5*p,_=f*m-f*x;for(let C=0;C!==a;++C)r[C]=g*o[h+C]+y*o[c+C]+v*o[l+C]+_*o[u+C];return r}}class Yx extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class jx extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ln{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qr(t,this.TimeBufferType),this.values=qr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qr(e.times,Array),values:qr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new jx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Kx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case tr:t=this.InterpolantFactoryMethodDiscrete;break;case nr:t=this.InterpolantFactoryMethodLinear;break;case So:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return nr;case this.InterpolantFactoryMethodSmooth:return So}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Xx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===So,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){const x=t[u+p];if(x!==t[d+p]||x!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=nr;class Ts extends Ln{constructor(e,t,n){super(e,t,n)}}Ts.prototype.ValueTypeName="bool";Ts.prototype.ValueBufferType=Array;Ts.prototype.DefaultInterpolation=tr;Ts.prototype.InterpolantFactoryMethodLinear=void 0;Ts.prototype.InterpolantFactoryMethodSmooth=void 0;class Uu extends Ln{}Uu.prototype.ValueTypeName="color";class ys extends Ln{}ys.prototype.ValueTypeName="number";class Zx extends dr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)vi.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Ms extends Ln{InterpolantFactoryMethodLinear(e){return new Zx(this.times,this.values,this.getValueSize(),e)}}Ms.prototype.ValueTypeName="quaternion";Ms.prototype.InterpolantFactoryMethodSmooth=void 0;class Es extends Ln{constructor(e,t,n){super(e,t,n)}}Es.prototype.ValueTypeName="string";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=tr;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;class Ss extends Ln{}Ss.prototype.ValueTypeName="vector";class $x{constructor(e="",t=-1,n=[],i=vd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=pn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Qx(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Ln.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=qx(l);l=dh(l,1,h),c=dh(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new ys(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,p,x){if(f.length!==0){const m=[],g=[];Nu(f,m,g,p),m.length!==0&&x.push(new u(d,m,g))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let p;for(p=0;p<d.length;p++)if(d[p].morphTargets)for(let x=0;x<d[p].morphTargets.length;x++)f[d[p].morphTargets[x]]=-1;for(const x in f){const m=[],g=[];for(let y=0;y!==d[p].morphTargets.length;++y){const v=d[p];m.push(v.time),g.push(v.morphTarget===x?1:0)}i.push(new ys(".morphTargetInfluence["+x+"]",m,g))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(Ss,f+".position",d,"pos",i),n(Ms,f+".quaternion",d,"rot",i),n(Ss,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Jx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ys;case"vector":case"vector2":case"vector3":case"vector4":return Ss;case"color":return Uu;case"quaternion":return Ms;case"bool":case"boolean":return Ts;case"string":return Es}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Qx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Jx(s.type);if(s.times===void 0){const t=[],n=[];Nu(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const mi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class e_{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null}}}const t_=new e_;class As{constructor(e){this.manager=e!==void 0?e:t_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}As.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class n_ extends Error{constructor(e,t){super(e),this.response=t}}class Fu extends As{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=mi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:i});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=kn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0;let x=0;const m=new ReadableStream({start(g){y();function y(){u.read().then(({done:v,value:_})=>{if(v)g.close();else{x+=_.byteLength;const C=new ProgressEvent("progress",{lengthComputable:p,loaded:x,total:f});for(let T=0,A=h.length;T<A;T++){const P=h[T];P.onProgress&&P.onProgress(C)}g.enqueue(_),y()}},v=>{g.error(v)})}}});return new Response(m)}else throw new n_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{mi.add(e,c);const h=kn[e];delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=kn[e];if(h===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class i_ extends As{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=mi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=ir("img");function l(){h(),mi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class s_ extends As{constructor(e){super(e)}load(e,t,n,i){const r=new Ot,o=new i_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Mo extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class r_ extends Mo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ia=new Qe,fh=new E,ph=new E;class zl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Il,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fh.setFromMatrixPosition(e.matrixWorld),t.position.copy(fh),ph.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ph),t.updateMatrixWorld(),ia.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ia),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ia)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class o_ extends zl{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=xs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class a_ extends Mo{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new o_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const mh=new Qe,Gs=new E,sa=new E;class l_ extends zl{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Gs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gs),sa.copy(n.position),sa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(sa),n.updateMatrixWorld(),i.makeTranslation(-Gs.x,-Gs.y,-Gs.z),mh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mh)}}class fo extends Mo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new l_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class c_ extends zl{constructor(){super(new xo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ml extends Mo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new c_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class h_ extends As{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=mi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return mi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),mi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});mi.add(e,l),r.manager.itemStart(e)}}class u_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=gh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function gh(){return performance.now()}const Gl="\\[\\]\\.:\\/",d_=new RegExp("["+Gl+"]","g"),Hl="[^"+Gl+"]",f_="[^"+Gl.replace("\\.","")+"]",p_=/((?:WC+[\/:])*)/.source.replace("WC",Hl),m_=/(WCOD+)?/.source.replace("WCOD",f_),g_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hl),x_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hl),__=new RegExp("^"+p_+m_+g_+x_+"$"),v_=["material","materials","bones","map"];class y_{constructor(e,t,n){const i=n||Mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Mt{constructor(e,t,n){this.path=t,this.parsedPath=n||Mt.parseTrackName(t),this.node=Mt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Mt.Composite(e,t,n):new Mt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(d_,"")}static parseTrackName(e){const t=__.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);v_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=Mt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Mt.Composite=y_;Mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Mt.prototype.GetterByBindingType=[Mt.prototype._getValue_direct,Mt.prototype._getValue_array,Mt.prototype._getValue_arrayElement,Mt.prototype._getValue_toArray];Mt.prototype.SetterByBindingTypeAndVersioning=[[Mt.prototype._setValue_direct,Mt.prototype._setValue_direct_setNeedsUpdate,Mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_array,Mt.prototype._setValue_array_setNeedsUpdate,Mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_arrayElement,Mt.prototype._setValue_arrayElement_setNeedsUpdate,Mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Mt.prototype._setValue_fromArray,Mt.prototype._setValue_fromArray_setNeedsUpdate,Mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class uy{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dy extends Fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sl);function Ks(s){return 440*Math.pow(2,(s-69)/12)}const Et=[60,64,67,71,74],Kr=[65,69,72,76,79],Tn=[62,67,71,74,77],ra=[60,64,69,72,76],M_=[62,65,69,72,76],oa=[62,66,69,72,76],S_=[64,67,71,74,79],xh=[{bpm:132,steps:[{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:79,beats:1},{lead:72,beats:1.5,bass:43},{lead:74,beats:.5},{lead:76,beats:4,bass:48,chord:Et},{lead:77,beats:1,bass:41,chord:Kr},{lead:77,beats:1},{lead:77,beats:1.5,bass:48},{lead:77,beats:.5},{lead:77,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:1,bass:43},{lead:76,beats:.5},{lead:76,beats:.5},{lead:76,beats:1,bass:38,chord:oa},{lead:74,beats:1},{lead:74,beats:1,bass:45},{lead:76,beats:1},{lead:74,beats:2,bass:43,chord:Tn},{lead:79,beats:2,bass:50},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:2,bass:43},{lead:76,beats:1,bass:48,chord:Et},{lead:79,beats:1},{lead:72,beats:1.5,bass:43},{lead:74,beats:.5},{lead:76,beats:4,bass:48,chord:Et},{lead:77,beats:1,bass:41,chord:Kr},{lead:77,beats:1},{lead:77,beats:1.5,bass:48},{lead:77,beats:.5},{lead:77,beats:1,bass:48,chord:Et},{lead:76,beats:1},{lead:76,beats:1,bass:43},{lead:76,beats:.5},{lead:76,beats:.5},{lead:79,beats:1,bass:43,chord:Tn},{lead:79,beats:1},{lead:77,beats:1,bass:50},{lead:74,beats:1},{lead:72,beats:4,bass:48,chord:Et}]},{bpm:138,steps:[{lead:62,beats:1,bass:43,chord:Tn},{lead:67,beats:1,bass:43,chord:Tn},{lead:67,beats:.5},{lead:69,beats:.5},{lead:67,beats:.5},{lead:66,beats:.5},{lead:64,beats:1,bass:48,chord:Et},{lead:64,beats:1},{lead:64,beats:1},{lead:69,beats:1,bass:45,chord:ra},{lead:69,beats:.5},{lead:71,beats:.5},{lead:69,beats:.5},{lead:67,beats:.5},{lead:66,beats:1,bass:38,chord:oa},{lead:62,beats:1},{lead:62,beats:1},{lead:71,beats:1,bass:47,chord:S_},{lead:71,beats:.5},{lead:72,beats:.5},{lead:71,beats:.5},{lead:69,beats:.5},{lead:67,beats:1,bass:48,chord:Et},{lead:64,beats:1},{lead:62,beats:.5},{lead:62,beats:.5},{lead:64,beats:1,bass:38,chord:oa},{lead:69,beats:1},{lead:66,beats:1},{lead:67,beats:3,bass:43,chord:Tn}]},{bpm:124,steps:[{lead:79,beats:1.5,bass:48,chord:Et},{lead:77,beats:.5},{lead:76,beats:1,bass:43},{lead:74,beats:1},{lead:72,beats:1,bass:48,chord:ra},{lead:74,beats:1},{lead:76,beats:1,bass:45},{lead:72,beats:1},{lead:74,beats:.5,bass:41,chord:Kr},{lead:76,beats:.5},{lead:77,beats:.5},{lead:74,beats:.5},{lead:76,beats:1.5,bass:43,chord:Tn},{lead:74,beats:.5},{lead:72,beats:1,bass:48,chord:Et},{lead:71,beats:1},{lead:72,beats:2,bass:48},{lead:79,beats:1.5,bass:48,chord:Et},{lead:77,beats:.5},{lead:76,beats:1,bass:43},{lead:74,beats:1},{lead:72,beats:1,bass:48,chord:ra},{lead:74,beats:1},{lead:76,beats:1,bass:45},{lead:72,beats:1},{lead:74,beats:.5,bass:41,chord:M_},{lead:76,beats:.5},{lead:77,beats:.5},{lead:74,beats:.5},{lead:76,beats:1.5,bass:43,chord:Tn},{lead:74,beats:.5},{lead:72,beats:1,bass:48,chord:Et},{lead:71,beats:1},{lead:72,beats:2,bass:48}]},{bpm:96,steps:[{lead:67,beats:1.5,bass:48,chord:Et},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48,chord:Et},{lead:67,beats:1.5,bass:48},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48,chord:Et},{lead:74,beats:2,bass:43,chord:Tn},{lead:74,beats:1},{lead:71,beats:3,bass:43},{lead:72,beats:2,bass:48,chord:Et},{lead:72,beats:1},{lead:67,beats:3,bass:48},{lead:69,beats:2,bass:41,chord:Kr},{lead:69,beats:1},{lead:72,beats:1.5,bass:45},{lead:71,beats:.5},{lead:69,beats:1},{lead:67,beats:1.5,bass:48,chord:Et},{lead:69,beats:.5},{lead:67,beats:1},{lead:64,beats:3,bass:48},{lead:74,beats:2,bass:43,chord:Tn},{lead:74,beats:1},{lead:77,beats:1.5,bass:43},{lead:74,beats:.5},{lead:71,beats:1},{lead:72,beats:3,bass:48,chord:Et},{lead:76,beats:3,bass:48},{lead:72,beats:1.5,bass:43,chord:Tn},{lead:67,beats:.5},{lead:64,beats:1},{lead:67,beats:1.5,bass:43},{lead:65,beats:.5},{lead:62,beats:1},{lead:60,beats:4,bass:48,chord:Et}]}],b_=Et.map(Ks);function _h(s,e,t=!1){const n=Math.floor(s.sampleRate*e),i=s.createBuffer(1,n,s.sampleRate),r=i.getChannelData(0);if(!t){for(let f=0;f<n;f++)r[f]=Math.random()*2-1;return i}let o=0,a=0,l=0,c=0,h=0,u=0,d=0;for(let f=0;f<n;f++){const p=Math.random()*2-1;o=.99886*o+p*.0555179,a=.99332*a+p*.0750759,l=.969*l+p*.153852,c=.8665*c+p*.3104856,h=.55*h+p*.5329522,u=-.7616*u-p*.016898,r[f]=(o+a+l+c+h+u+d+p*.5362)*.08,d=p*.115926}return i}function w_(s,e=1.9){const t=Math.floor(s.sampleRate*e),n=s.createBuffer(2,t,s.sampleRate);for(let i=0;i<2;i++){const r=n.getChannelData(i);let o=0;for(let a=0;a<t;a++){const l=a/t,c=Math.pow(1-l,2.7),h=(Math.random()*2-1)*c;o=o*.72+h*.28,r[a]=o*.75}}return n}function T_(){const t=Math.floor(16537.5),n=new ArrayBuffer(44+t*2),i=new DataView(n),r=(c,h)=>{for(let u=0;u<h.length;u++)i.setUint8(c+u,h.charCodeAt(u))};r(0,"RIFF"),i.setUint32(4,36+t*2,!0),r(8,"WAVE"),r(12,"fmt "),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,22050,!0),i.setUint32(28,22050*2,!0),i.setUint16(32,2,!0),i.setUint16(34,16,!0),r(36,"data"),i.setUint32(40,t*2,!0);const o=[1046.5,1318.51,1567.98,2093];for(let c=0;c<t;c++){const h=c/22050;let u=0;for(let f=0;f<o.length;f++){const p=f*.055;if(h>=p){const x=h-p,m=Math.exp(-x*5.2)*Math.min(1,x*120);u+=Math.sin(2*Math.PI*o[f]*x)*m*.22,u+=Math.sin(2*Math.PI*o[f]*2*x)*m*.06}}const d=Math.max(-.95,Math.min(.95,u));i.setInt16(44+c*2,d*32767,!0)}const a=new Uint8Array(n);let l="";for(let c=0;c<a.length;c++)l+=String.fromCharCode(a[c]);return`data:audio/wav;base64,${btoa(l)}`}class fy{constructor(){k(this,"ctx",null);k(this,"masterGain",null);k(this,"dryBus",null);k(this,"reverbBus",null);k(this,"analyser",null);k(this,"analyserBuf",null);k(this,"mediaDest",null);k(this,"mediaAudioEl",null);k(this,"musicBus",null);k(this,"padFilter",null);k(this,"padVoice",null);k(this,"windGain",null);k(this,"windFilter",null);k(this,"whiteNoiseBuf",null);k(this,"mixMode","full");k(this,"routing","direct");k(this,"musicStyle","classic");k(this,"volume",.72);k(this,"songIdx",0);k(this,"stepIdx",0);k(this,"stepWaitSec",.25);k(this,"bellTimer",0);k(this,"prevBraking",!1);k(this,"lastEventTriggered",null);k(this,"beatPulse",0);k(this,"smoothMicEnergy",0);k(this,"micState","off");k(this,"micStream",null);k(this,"micAnalyser",null);k(this,"micData",null);k(this,"lastScrapeMs",0);k(this,"lastChurchBellMs",0);k(this,"wavDataUri",null);try{const e=localStorage.getItem("tesla-xmas-mix");(e==="full"||e==="sfx"||e==="muted")&&(this.mixMode=e);const t=localStorage.getItem("tesla-xmas-route");(t==="direct"||t==="media")&&(this.routing=t);const n=localStorage.getItem("tesla-xmas-vol");if(n!==null){const i=Number(n);Number.isFinite(i)&&(this.volume=Math.max(0,Math.min(1,i)))}}catch{}}getMixMode(){return this.mixMode}setMixMode(e){this.mixMode=e;try{localStorage.setItem("tesla-xmas-mix",e)}catch{}this.applyGainStates()}getRouting(){return this.routing}setRouting(e){this.routing=e;try{localStorage.setItem("tesla-xmas-route",e)}catch{}this.ctx&&this.reconnectOutput()}getVolume(){return this.volume}setVolume(e){this.volume=Math.max(0,Math.min(1,e));try{localStorage.setItem("tesla-xmas-vol",this.volume.toFixed(2))}catch{}this.applyGainStates()}setMusicStyle(e){this.musicStyle=e}getMicState(){return this.micState}async setMicReactive(e){var t;if(!e)return this.micStream&&(this.micStream.getTracks().forEach(n=>n.stop()),this.micStream=null),this.micAnalyser=null,this.micData=null,this.smoothMicEnergy=0,this.micState="off","off";if(this.unlock(),!this.ctx||!((t=navigator.mediaDevices)!=null&&t.getUserMedia))return this.micState="denied","denied";try{const n=await navigator.mediaDevices.getUserMedia({audio:!0}),i=this.ctx.createMediaStreamSource(n),r=this.ctx.createAnalyser();return r.fftSize=256,r.smoothingTimeConstant=.72,i.connect(r),this.micStream=n,this.micAnalyser=r,this.micData=new Uint8Array(new ArrayBuffer(r.frequencyBinCount)),this.micState="active","active"}catch{return this.micState="denied","denied"}}getBeatEnergy(){return this.micState==="active"?Math.min(1,this.smoothMicEnergy):Math.min(1,this.beatPulse)}unlock(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=0;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-16,t.knee.value=18,t.ratio.value=4,t.attack.value=.01,t.release.value=.25,this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=512,this.analyserBuf=new Float32Array(new ArrayBuffer(this.analyser.fftSize*4)),this.dryBus=this.ctx.createGain(),this.dryBus.gain.value=.85;const n=this.ctx.createConvolver();n.buffer=w_(this.ctx,1.9),this.reverbBus=this.ctx.createGain(),this.reverbBus.gain.value=.34,this.dryBus.connect(t),this.reverbBus.connect(n),n.connect(t),t.connect(this.masterGain),this.masterGain.connect(this.analyser),this.whiteNoiseBuf=_h(this.ctx,2,!1),this.setupMusicPad(),this.setupWindBed(),this.reconnectOutput(),this.applyGainStates()}this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.routing==="media"&&this.mediaAudioEl&&this.mediaAudioEl.play().catch(()=>{})}reconnectOutput(){var e;if(!(!this.ctx||!this.masterGain)){try{this.masterGain.disconnect()}catch{}if(this.analyser&&this.masterGain.connect(this.analyser),this.routing==="direct")this.masterGain.connect(this.ctx.destination),this.mediaAudioEl&&this.mediaAudioEl.pause();else{if(!this.mediaDest&&typeof this.ctx.createMediaStreamDestination=="function"){this.mediaDest=this.ctx.createMediaStreamDestination();const t=document.createElement("audio");t.autoplay=!0,t.setAttribute("playsinline",""),t.style.display="none",t.srcObject=this.mediaDest.stream,document.body.appendChild(t),this.mediaAudioEl=t}this.mediaDest?(this.masterGain.connect(this.mediaDest),(e=this.mediaAudioEl)==null||e.play().catch(()=>{})):this.masterGain.connect(this.ctx.destination)}}}setupMusicPad(){if(!this.ctx||!this.dryBus||!this.reverbBus)return;this.musicBus=this.ctx.createGain(),this.musicBus.gain.value=this.mixMode==="full"?.34:0,this.padFilter=this.ctx.createBiquadFilter(),this.padFilter.type="lowpass",this.padFilter.frequency.value=520,this.padFilter.Q.value=.7,this.padFilter.connect(this.musicBus),this.musicBus.connect(this.dryBus),this.musicBus.connect(this.reverbBus);const e=b_,t=[],n=[];for(let i=0;i<e.length;i++){const r=this.ctx.createOscillator();r.type=i%2===0?"triangle":"sine",r.frequency.value=e[i],r.detune.value=(i-2)*3.5;const o=this.ctx.createGain();o.gain.value=.065,r.connect(o),o.connect(this.padFilter),r.start(),t.push(r),n.push(o)}this.padVoice={oscs:t,gains:n}}setupWindBed(){if(!this.ctx||!this.dryBus||!this.reverbBus)return;const e=_h(this.ctx,4,!0),t=this.ctx.createBufferSource();t.buffer=e,t.loop=!0,this.windFilter=this.ctx.createBiquadFilter(),this.windFilter.type="bandpass",this.windFilter.frequency.value=260,this.windFilter.Q.value=1.6,this.windGain=this.ctx.createGain(),this.windGain.gain.value=.015,t.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.dryBus),this.windGain.connect(this.reverbBus),t.start()}applyGainStates(){if(!this.ctx)return;const e=this.ctx.currentTime;if(this.masterGain){const t=this.mixMode==="muted"?0:this.volume;this.masterGain.gain.setTargetAtTime(t,e,.08)}if(this.musicBus){const t=this.mixMode==="full"?.36:0;this.musicBus.gain.setTargetAtTime(t,e,.15)}}update(e,t,n){if(this.beatPulse=Math.max(0,this.beatPulse-e*2.8),this.micState==="active"&&this.micAnalyser&&this.micData){this.micAnalyser.getByteFrequencyData(this.micData);let a=0;const l=Math.min(16,this.micData.length);for(let h=0;h<l;h++)a+=this.micData[h];const c=Math.min(1,a/(l*255)*1.9);this.smoothMicEnergy+=(c-this.smoothMicEnergy)*Math.min(1,e*12)}else this.smoothMicEnergy=Math.max(0,this.smoothMicEnergy-e*4);if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const i=this.ctx.currentTime,r=Math.min(1,t.speedKmh/120);if(this.mixMode==="full"&&this.padVoice&&this.padFilter){const a=480+r*780+(t.inTunnel?-120:0);if(this.padFilter.frequency.setTargetAtTime(Math.max(260,a),i,.25),this.stepWaitSec-=e,this.stepWaitSec<=0){const l=xh[this.songIdx],c=l.steps[this.stepIdx],h=t.speedKmh<3?.92:1+r*.16,u=60/(l.bpm*h),d=c.beats*u;if(this.stepWaitSec=d,this.beatPulse=Math.max(this.beatPulse,c.bass?.95:.62),c.chord){const f=c.chord.map(Ks);this.padVoice.oscs.forEach((p,x)=>{p.frequency.setTargetAtTime(f[x%f.length],i,.18)})}if(c.bass&&this.playBassNote(Ks(c.bass),.14,Math.min(1.4,d*1.1)),this.playCelestaNote(Ks(c.lead),.11+r*.025,Math.max(.32,d*1.15)),c.beats>=1.5&&c.chord){const f=Ks(c.chord[2]+12),p=Math.round(d*500);setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.mixMode==="full"&&this.playCelestaNote(f,.055,.55)},p)}this.stepIdx++,this.stepIdx>=l.steps.length&&(this.stepIdx=0,this.songIdx=(this.songIdx+1)%xh.length)}}if(this.windFilter&&this.windGain){const a=Math.abs(t.turnRate)*140,l=t.tunnelBlend*180,c=240+r*650+a+l,h=.012+r*.095+t.tunnelBlend*.035;this.windFilter.frequency.setTargetAtTime(c,i,.15),this.windGain.gain.setTargetAtTime(h,i,.15)}this.bellTimer+=e;const o=t.speedKmh<2.5?1.9:t.speedKmh<35?.62-t.speedKmh/35*.24:Math.max(.16,.38-(t.speedKmh-35)/95*.21);if(this.bellTimer>=o){this.bellTimer=0;const a=t.speedKmh<2.5?.16:.28+r*.55;this.triggerSleighBell(a,t.turnRate*.35)}t.isBraking&&!this.prevBraking&&t.speedKmh>12&&this.playBrakeJingle(),this.prevBraking=t.isBraking,n&&n!==this.lastEventTriggered?(this.lastEventTriggered=n,n==="starship"?this.playRocketRumble():this.playSparkleChime()):n||(this.lastEventTriggered=null)}playCelestaNote(e,t,n,i){if(!this.ctx)return;const r=this.ctx.currentTime,o=this.ctx.createOscillator(),a=this.ctx.createOscillator(),l=this.musicStyle==="cyber2099"&&!i;o.type=l?"sawtooth":"sine",a.type=l?"square":"triangle",o.frequency.value=e,a.frequency.value=l?e*.5:e*2;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=l?2400:8e3;const h=this.ctx.createGain();h.gain.value=l?.16:.18;const u=this.ctx.createGain();u.gain.setValueAtTime(1e-4,r),u.gain.linearRampToValueAtTime(l?t*.65:t,r+.015),u.gain.exponentialRampToValueAtTime(1e-4,r+n),o.connect(c),a.connect(h),h.connect(c),c.connect(u),i?u.connect(i):(this.dryBus&&u.connect(this.dryBus),this.reverbBus&&u.connect(this.reverbBus)),o.start(r),a.start(r),o.stop(r+n+.05),a.stop(r+n+.05)}playBassNote(e,t,n){if(!this.ctx||!this.musicBus)return;const i=this.ctx.currentTime,r=this.musicStyle==="cyber2099",o=this.ctx.createOscillator();o.type=r?"sawtooth":"triangle",o.frequency.value=e;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(r?860:520,i),a.frequency.exponentialRampToValueAtTime(160,i+n);const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(t,i+.02),l.gain.exponentialRampToValueAtTime(1e-4,i+n),o.connect(a),a.connect(l),l.connect(this.musicBus),o.start(i),o.stop(i+n+.04)}triggerSleighBell(e,t=0,n){if(!this.ctx||!this.whiteNoiseBuf)return;const i=this.ctx.currentTime,r=this.ctx.createBufferSource();r.buffer=this.whiteNoiseBuf;const o=this.ctx.createBiquadFilter();o.type="highpass",o.frequency.value=3800;const a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.value=5400+Math.random()*1100,a.Q.value=2.6;const l=this.ctx.createGain(),c=Math.min(.24,e*.22);l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(c,i+.008),l.gain.exponentialRampToValueAtTime(1e-4,i+.14);const h=[3520,4978,6645];for(const d of h){const f=this.ctx.createOscillator();f.type="sine",f.frequency.value=d*(.97+Math.random()*.06);const p=this.ctx.createGain();p.gain.setValueAtTime(1e-4,i),p.gain.linearRampToValueAtTime(c*.14,i+.005),p.gain.exponentialRampToValueAtTime(1e-4,i+.17),f.connect(p),n?p.connect(n):this.dryBus&&p.connect(this.dryBus),f.start(i),f.stop(i+.19)}r.connect(o),o.connect(a),a.connect(l);let u=l;if(typeof this.ctx.createStereoPanner=="function"){const d=this.ctx.createStereoPanner();d.pan.value=Math.max(-.7,Math.min(.7,t)),l.connect(d),u=d}n?u.connect(n):(this.dryBus&&u.connect(this.dryBus),this.reverbBus&&u.connect(this.reverbBus)),r.start(i,Math.random()*.8,.18)}playSparkleChime(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[523.25,659.25,783.99,987.77,1174.66,1567.98].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(t,.095,.9)},n*65)})}playLightWaveChime(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[392,493.88,587.33,739.99,987.77,1174.66].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(t,.1,1.05)},n*75)})}playGlobeShake(){if(this.unlock(),!(!this.ctx||this.mixMode==="muted")){for(let e=0;e<4;e++)setTimeout(()=>{this.triggerSleighBell(.75-e*.12,(e%2===0?-1:1)*.4)},e*85);this.playSparkleChime()}}playBrakeJingle(){!this.ctx||this.mixMode==="muted"||(this.triggerSleighBell(.6,-.3),setTimeout(()=>this.triggerSleighBell(.45,.3),90))}playHoHoHo(){if(this.unlock(),!this.ctx||this.mixMode==="muted")return;[196,246.94,293.66].forEach((t,n)=>{setTimeout(()=>{if(!this.ctx||this.ctx.state!=="running")return;const i=this.ctx.currentTime,r=this.ctx.createOscillator(),o=this.ctx.createOscillator();r.type="triangle",o.type="sine",r.frequency.setValueAtTime(t*.92,i),r.frequency.exponentialRampToValueAtTime(t,i+.08),o.frequency.value=t*.5;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=950;const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,i),l.gain.linearRampToValueAtTime(.18,i+.03),l.gain.exponentialRampToValueAtTime(1e-4,i+.32),r.connect(a),o.connect(a),a.connect(l),this.dryBus&&l.connect(this.dryBus),this.reverbBus&&l.connect(this.reverbBus),r.start(i),o.start(i),r.stop(i+.35),o.stop(i+.35),this.triggerSleighBell(.75,(n-1)*.3)},n*230)}),setTimeout(()=>this.playSparkleChime(),580)}playRocketRumble(){if(!this.ctx||!this.whiteNoiseBuf||this.mixMode==="muted")return;const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.whiteNoiseBuf,t.loop=!0;const n=this.ctx.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(160,e),n.frequency.exponentialRampToValueAtTime(520,e+2.4),n.frequency.exponentialRampToValueAtTime(120,e+5);const i=this.ctx.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.linearRampToValueAtTime(.18,e+1.1),i.gain.exponentialRampToValueAtTime(1e-4,e+5.2),t.connect(n),n.connect(i),this.dryBus&&i.connect(this.dryBus),this.reverbBus&&i.connect(this.reverbBus),t.start(e),t.stop(e+5.3)}playGiftLaunch(){if(this.unlock(),!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=this.ctx.currentTime,t=this.ctx.createOscillator();t.type="sine",t.frequency.setValueAtTime(340,e),t.frequency.exponentialRampToValueAtTime(980,e+.16);const n=this.ctx.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.linearRampToValueAtTime(.11,e+.02),n.gain.exponentialRampToValueAtTime(1e-4,e+.22),t.connect(n),this.dryBus&&n.connect(this.dryBus),this.reverbBus&&n.connect(this.reverbBus),t.start(e),t.stop(e+.24)}playChimneyPop(){this.unlock(),!(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")&&([523.25,659.25,783.99,1046.5].forEach((e,t)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(e,.1,.42)},t*35)}),this.triggerSleighBell(.7,.2))}playIceScrape(){if(!this.ctx||!this.whiteNoiseBuf||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=performance.now();if(e-this.lastScrapeMs<140)return;this.lastScrapeMs=e;const t=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.whiteNoiseBuf;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=3400+Math.random()*900,i.Q.value=2;const r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.055,t+.012),r.gain.exponentialRampToValueAtTime(1e-4,t+.09),n.connect(i),i.connect(r),this.dryBus&&r.connect(this.dryBus),n.start(t,Math.random()*.5,.11)}playConvoyHorn(){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=this.dryBus??this.ctx.destination,t=this.ctx.currentTime,n=[{start:0,dur:.34,gain:.22},{start:.42,dur:.72,gain:.26}],i=[146.83,185,220];for(const r of n){const o=this.ctx.createBiquadFilter();o.type="lowpass",o.Q.value=1.9,o.frequency.setValueAtTime(520,t+r.start),o.frequency.exponentialRampToValueAtTime(1180,t+r.start+.09),o.frequency.exponentialRampToValueAtTime(640,t+r.start+r.dur);const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t+r.start),a.gain.linearRampToValueAtTime(r.gain,t+r.start+.045),a.gain.setValueAtTime(r.gain*.88,t+r.start+r.dur*.72),a.gain.exponentialRampToValueAtTime(1e-4,t+r.start+r.dur+.14),o.connect(a),a.connect(e);for(const l of i){const c=this.ctx.createOscillator();c.type="sawtooth",c.frequency.setValueAtTime(l,t+r.start),c.detune.setValueAtTime((Math.random()-.5)*9,t+r.start),c.connect(o),c.start(t+r.start),c.stop(t+r.start+r.dur+.16)}}}playChurchBells(){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const e=performance.now();if(e-this.lastChurchBellMs<26e3)return;this.lastChurchBellMs=e;const t=this.dryBus??this.ctx.destination,n=this.ctx.currentTime;[329.63,392,293.66,261.63].forEach((r,o)=>{if(!this.ctx)return;const a=n+o*.52,l=[{mult:1,amp:.11,decay:2.1},{mult:2,amp:.045,decay:1.4},{mult:2.756,amp:.025,decay:.85}];for(const c of l){const h=this.ctx.createOscillator();h.type="sine",h.frequency.setValueAtTime(r*c.mult,a);const u=this.ctx.createGain();u.gain.setValueAtTime(1e-4,a),u.gain.linearRampToValueAtTime(c.amp,a+.015),u.gain.exponentialRampToValueAtTime(1e-4,a+c.decay),h.connect(u),u.connect(t),h.start(a),h.stop(a+c.decay+.05)}})}playComboFanfare(e){if(!this.ctx||this.ctx.state!=="running"||this.mixMode==="muted")return;const t=1+Math.min(4,Math.max(0,e-2))*.06;[523.25,659.25,783.99,1046.5,1318.5].forEach((n,i)=>{setTimeout(()=>{this.ctx&&this.ctx.state==="running"&&this.playCelestaNote(n*t,.13,.45)},i*45)}),this.triggerSleighBell(.82,.18)}testDirect(){if(this.unlock(),!this.ctx)return;const e=this.ctx.destination;[523.25,659.25,783.99,1046.5].forEach((t,n)=>{setTimeout(()=>{this.ctx&&this.playCelestaNote(t,.16,.7,e)},n*80)}),this.triggerSleighBell(.85,0,e)}testMedia(){var t;if(this.unlock(),!this.ctx)return;if(!this.mediaDest&&typeof this.ctx.createMediaStreamDestination=="function"){this.mediaDest=this.ctx.createMediaStreamDestination();const n=document.createElement("audio");n.autoplay=!0,n.setAttribute("playsinline",""),n.style.display="none",n.srcObject=this.mediaDest.stream,document.body.appendChild(n),this.mediaAudioEl=n}(t=this.mediaAudioEl)==null||t.play().catch(()=>{});const e=this.mediaDest??this.ctx.destination;[587.33,739.99,880,1174.66].forEach((n,i)=>{setTimeout(()=>{this.ctx&&this.playCelestaNote(n,.16,.7,e)},i*80)}),this.triggerSleighBell(.85,0,e)}testAudioFile(){this.wavDataUri||(this.wavDataUri=T_());const e=new Audio(this.wavDataUri);e.volume=Math.max(.5,this.volume),e.play().catch(()=>{})}getDiagnostics(){let e=-100;if(this.ctx&&this.analyser&&this.analyserBuf&&this.ctx.state==="running"){this.analyser.getFloatTimeDomainData(this.analyserBuf);let t=0;for(let i=0;i<this.analyserBuf.length;i++)t+=this.analyserBuf[i]*this.analyserBuf[i];const n=Math.sqrt(t/this.analyserBuf.length);n>1e-5&&(e=Math.max(-100,Math.round(20*Math.log10(n))))}return{state:this.ctx?this.ctx.state:"uninitialized",sampleRate:this.ctx?this.ctx.sampleRate:0,routing:this.routing,outputDb:e}}dispose(){this.micStream&&(this.micStream.getTracks().forEach(e=>e.stop()),this.micStream=null),this.mediaAudioEl&&(this.mediaAudioEl.pause(),this.mediaAudioEl.remove(),this.mediaAudioEl=null),this.ctx&&(this.ctx.close().catch(()=>{}),this.ctx=null)}}const E_={appTitle:"TESLA XMAS MODE",appSubtitle:"Coca-Cola Holiday Edition · Välj din julvärld",safetyTitle:"Innan du rullar ut i julnatten",safetyRules:["1 · Du är föraren. Du ansvarar alltid för körningen och att följa trafikreglerna.","2 · Håll ljudvolymen på en nivå där du alltid hör trafik, sirener och tutningar.","3 · Välj läge och gör inställningar medan bilen står stilla — skärmen tonar ner automatiskt under färd."],safetyDisclaimer:"Skapad för magisk passagerar- och bilstämning via webbläsarens GPS & Web Audio. Används på eget ansvar.",safetyAccept:"Starta Julmagin",soundTestBtn:"Ljudtest",menuDriveLabel:"Körkälla",menuAudioLabel:"Ljudmix",driveGps:"GPS (Bil)",driveDemo:"Demo Drive",driveManual:"Manuell",audioFull:"Full Jul",audioSfx:"Bara SFX (Spotify)",audioMuted:"Tyst",backToMenu:"← Meny",controlsBtn:"⚙ Kontroller",hoHoHoBtn:"🎅 Ho-Ho-Ho",northPoleShort:"Nordpolen",gpsActive:"GPS Aktiv",gpsWaiting:"Söker GPS…",gpsError:"GPS Saknas",demoActive:"Demo Drive",manualActive:"Manuell",tunnelActive:"Boring-tunnel",plaidBadge:"PLAID SLEIGH",drawerTitle:"Julkontroller & Test",drawerSwitchMode:"Byt läge direkt",drawerDriveSection:"Körning & Telemetri",drawerSpeedLabel:"Hastighet",drawerTurnLabel:"Sväng / Kurva",drawerTurnLeft:"Vänster",drawerTurnCenter:"Rakt",drawerTurnRight:"Höger",drawerTunnelToggle:"Testa Boring-tunnel",drawerElonSection:"Trigga Elon-händelse",drawerAudioSection:"Ljud & Tesla-högtalare",drawerVolume:"Volym",drawerRouting:"Ljudutgång",drawerRoutingDirect:"Direct",drawerRoutingMedia:"Media Player",drawerSoundCheckTitle:"Inget ljud? Tesla Ljudtest",drawerSoundCheckHint:"Skruva upp bilens rattvolym och testa knapparna en i taget. Välj sedan den utgång som hörs i högtalarna.",soundCheckDirect:"1 · Bjällra (Direct)",soundCheckMedia:"2 · Bjällra (Media Player)",soundCheckWav:"3 · Julklocka (Audio WAV)",drawerEnvSection:"Himmel, Frost & Språk",skyMidnight:"Julnatt",skyTwilight:"Blå timmen",skyDaylight:"Vinterdag",skyAuto:"Auto-tid",qualityLabel:"3D-Grafik",qualityUltra:"Pixar Ultra",qualityEco:"Eco (MCU2)",frostLabel:"Isfrost i hörnen",languageLabel:"Språk",closeDrawer:"Stäng",soundCheckModalTitle:"Tesla Högtalartest",modes:{express:{id:"express",title:"Coca-Cola Winter Express",subtitle:"3D Pixar-panorama med skulpterad Tomte & renar som galopperar längs gnistrande alptoppar, norrsken och varma julstugor.",badge:"3D Pixar Panorama",actionLabel:"🎁 Släpp julklapp"},caravan:{id:"caravan",title:"Holidays Are Coming: Caravan",subtitle:"Glödande 3D-konvoj av julbelysta Tesla Semis & Cybertruck som tänder en gyllene ljusvåg längs den snöiga dalen.",badge:"3D Coca-Cola Caravan",actionLabel:"✨ Ljusvåg"},flight3d:{id:"flight3d",title:"North Pole Flight Deck",subtitle:"Flagship Pixar 3D-vinterväg med Coca-Cola & Tesla-karavaner, realtidsflyg, norrsken, hus från OpenStreetMap & Julklappskanon!",badge:"Disney/Pixar All-in-One ★",actionLabel:"🎁 Tänd byn & Starlink"},snowglobe:{id:"snowglobe",title:"The Enchanted Snowglobe",subtitle:"Äkta 3D-kristallglob med miniatyrby & kretsande släde där snön virvlar av bilens G-krafter, plus riktig Nordpolen-kompass.",badge:"3D Crystal Snowglobe",actionLabel:"❄️ Skaka globen"},timeline:{id:"timeline",title:"Elon Holiday Timeline (2006–2026)",subtitle:"Kör förbi 14 fullskaliga Elon-händelser längs vintervägen — från Secret Master Plan & $420 till Starman, Mechazilla & Cybercab!",badge:"3D Väghändelser · 14 År",actionLabel:"⏭ Nästa längs vägen"}},elonEvents:{starman:{label:"🚗 Starman",toast:"Starman med tomteluva passerar framför fullmånen!"},starlink:{label:"🛰 Starlink",toast:"Starlink-julbelysning glider över stjärnhimlen"},starship:{label:"🚀 Starship",toast:"Starship lyfter mot Nordpolens norrsken!"},supercharger:{label:"⚡ Supercharger",toast:"Nordpolens Supercharger-Oas · Glöggbod & Optimus!"},cyberplow:{label:"🎄 Cybertruck",toast:"Cybertruck-snöplog med lysande julgran på flaket!"}},reindeerGears:{park:"PARK",trot:"TROT",dash:"DASH",prance:"PRANCE",comet:"COMET",blitzen:"BLITZEN",plaid:"PLAID"},snowglobeTitle:"TESLA XMAS EDITION",snowglobeSpeedLabel:"SLÄDFART",snowglobeCompassLabel:"NORDPOLEN",snowglobeGearLabel:"RENVÄXEL",snowglobeNorthPoleKm:"km till Tomten",tunnelBanner:"THE BORING CO. · NORTH POLE EXPRESS",webglFallbackTitle:"WebGL kunde inte startas",webglFallbackText:"Din webbläsare nekade 3D-kontext just nu. Prova något av de andra tre lägena i menyn!",osmSectionLabel:"Plats & OpenStreetMap",osmEnableLabel:"Använd OpenStreetMap (GPS-miljö)",osmNextStopBtn:"📍 Nästa demo-plats",osmGreetingPrefix:"God Jul,",osmBiomes:{village:"Julstad",forest:"Vinterskog",water:"Frusen sjö",highway:"Vinterväg",open:"Öppet landskap"},timelinePrev:"Föregående",timelineNext:"Nästa",timelinePassingLabel:"Passerar nu!",timelineUpcomingLabel:"Längre fram längs vägen",osmBuildingsLabel:"byggnader",osmWaterLabel:"vatten",osmWildlifeLabel:"🦌 Skogsdjur",osmLiveGpsTag:"Live OSM",osmDemoTourTag:"Demo-rutt",cinematicCamBtn:"🎥 Bio",cinematicCamLabel:"Cinematic Bio-kamera",themeLabel:"Jul-tema / Skinn",themeClassic:"Coca-Cola",themeNordic:"Sagovinter",themeCyber:"Cyber 2099",calendarLabel:"Advents- & Julkalender",calAuto:"Auto (Idag)",calAdvent:"4:e Advent",calLucia:"Lucia (13 dec)",calXmasEve:"Julafton (24 dec)",micLabel:"🎤 Lyssna på bilens musik",micOff:"Av",micActive:"Aktiv",micDenied:"Ej tillåten",liveSectionLabel:"Live Rymd, Väder & Flyg",frostWipeHint:"Dra fingret på kanterna för att skrapa frost",giftsLabel:"🎁",elonTimelineToggleLabel:"Visa Elon-tidslinje längs vägen",convoyHornBtn:"📯 Tuta",townTreeLitToast:"🎄 Torggranen tänd! +5 🎁 Hela kvarteret strålar!",snowmanCrownToast:"⛄ Snögubben jublar med guldkrona! +2 🎁",wishStarToast:"🌠 Fångade ett stjärnfall! +3 Önskebonus 🎁",convoyHornToast:"📯 Konvojen tutar julhälsning · Strålkastarvåg!"},A_={appTitle:"TESLA XMAS MODE",appSubtitle:"Coca-Cola Holiday Edition · Choose your holiday world",safetyTitle:"Before you roll into the winter night",safetyRules:["1 · You are the driver. You are always responsible for driving safely and obeying traffic laws.","2 · Keep volume at a level where you can clearly hear traffic, sirens, and horns.","3 · Choose modes and adjust settings while parked — the HUD gently dims automatically while driving."],safetyDisclaimer:"Built for festive cabin ambience via browser GPS & Web Audio. Use at your own risk.",safetyAccept:"Ignite Holiday Magic",soundTestBtn:"Sound Check",menuDriveLabel:"Drive Source",menuAudioLabel:"Audio Mix",driveGps:"GPS (Car)",driveDemo:"Demo Drive",driveManual:"Manual",audioFull:"Full Holiday",audioSfx:"SFX Only (Spotify)",audioMuted:"Muted",backToMenu:"← Menu",controlsBtn:"⚙ Controls",hoHoHoBtn:"🎅 Ho-Ho-Ho",northPoleShort:"North Pole",gpsActive:"GPS Live",gpsWaiting:"Acquiring GPS…",gpsError:"No GPS",demoActive:"Demo Drive",manualActive:"Manual",tunnelActive:"Boring Tunnel",plaidBadge:"PLAID SLEIGH",drawerTitle:"Holiday Controls & Test",drawerSwitchMode:"Switch mode",drawerDriveSection:"Driving & Telemetry",drawerSpeedLabel:"Speed",drawerTurnLabel:"Steering / Curve",drawerTurnLeft:"Left",drawerTurnCenter:"Straight",drawerTurnRight:"Right",drawerTunnelToggle:"Test Boring Tunnel",drawerElonSection:"Trigger Elon Easter Egg",drawerAudioSection:"Audio & Tesla Speakers",drawerVolume:"Volume",drawerRouting:"Audio Output",drawerRoutingDirect:"Direct",drawerRoutingMedia:"Media Player",drawerSoundCheckTitle:"No sound? Tesla Sound Check",drawerSoundCheckHint:"Turn up the car volume on the steering wheel and test the buttons one by one. Select the route you hear.",soundCheckDirect:"1 · Sleigh Bell (Direct)",soundCheckMedia:"2 · Sleigh Bell (Media Player)",soundCheckWav:"3 · Holiday Chime (Audio WAV)",drawerEnvSection:"Sky, Frost & Language",skyMidnight:"Holiday Night",skyTwilight:"Blue Hour",skyDaylight:"Winter Day",skyAuto:"Auto Time",qualityLabel:"3D Graphics",qualityUltra:"Pixar Ultra",qualityEco:"Eco (MCU2)",frostLabel:"Corner Ice Frost",languageLabel:"Language",closeDrawer:"Close",soundCheckModalTitle:"Tesla Speaker Check",modes:{express:{id:"express",title:"Coca-Cola Winter Express",subtitle:"3D Pixar side-tracking cinema shot with sculpted Santa & galloping reindeer soaring over alpine peaks, aurora, and glowing cottages.",badge:"3D Pixar Panorama",actionLabel:"🎁 Drop Gift"},caravan:{id:"caravan",title:"Holidays Are Coming: Caravan",subtitle:"Illuminated 3D convoy of Coca-Cola-crimson Tesla Semis & Cybertruck sparking a golden wave of lights down the snowy valley.",badge:"3D Coca-Cola Caravan",actionLabel:"✨ Light Wave"},flight3d:{id:"flight3d",title:"North Pole Flight Deck",subtitle:"Flagship Pixar 3D winter boulevard fusing Coca-Cola & Tesla Semis, live sky data, OSM cottages & Gigafactories, plus a Gift Cannon!",badge:"Disney/Pixar All-in-One ★",actionLabel:"🎁 Light Up & Starlink"},snowglobe:{id:"snowglobe",title:"The Enchanted Snowglobe",subtitle:"True 3D crystal snowglobe with orbiting sleigh & miniature village swirling with G-forces, plus a live North Pole compass.",badge:"3D Crystal Snowglobe",actionLabel:"❄️ Shake Globe"},timeline:{id:"timeline",title:"Elon Holiday Timeline (2006–2026)",subtitle:"Drive past 14 full-scale Elon spectacles erupting along the winter highway — from Secret Master Plan & $420 to Starman & Mechazilla!",badge:"3D Road Events · 14 Years",actionLabel:"⏭ Next Roadside Event"}},elonEvents:{starman:{label:"🚗 Starman",toast:"Santa-hat Starman glides across the full moon!"},starlink:{label:"🛰 Starlink",toast:"Starlink holiday train sparkles across the night sky"},starship:{label:"🚀 Starship",toast:"Starship launches into the northern lights!"},supercharger:{label:"⚡ Supercharger",toast:"North Pole Supercharger Oasis · Glögg & Optimus!"},cyberplow:{label:"🎄 Cybertruck",toast:"Cybertruck Snowplow hauling a glowing Christmas tree!"}},reindeerGears:{park:"PARK",trot:"TROT",dash:"DASH",prance:"PRANCE",comet:"COMET",blitzen:"BLITZEN",plaid:"PLAID"},snowglobeTitle:"TESLA XMAS EDITION",snowglobeSpeedLabel:"SLEIGH SPEED",snowglobeCompassLabel:"NORTH POLE",snowglobeGearLabel:"REINDEER GEAR",snowglobeNorthPoleKm:"km to Santa",tunnelBanner:"THE BORING CO. · NORTH POLE EXPRESS",webglFallbackTitle:"WebGL unavailable",webglFallbackText:"Your browser declined a 3D WebGL context. Try any of the other holiday modes from the menu!",osmSectionLabel:"Location & OpenStreetMap",osmEnableLabel:"Enable OpenStreetMap World",osmNextStopBtn:"📍 Next Demo Location",osmGreetingPrefix:"Merry Christmas,",osmBiomes:{village:"Winter Town",forest:"Snowy Forest",water:"Frozen Lake",highway:"Winter Highway",open:"Open Countryside"},timelinePrev:"Previous",timelineNext:"Next",timelinePassingLabel:"Passing now!",timelineUpcomingLabel:"Ahead down the road",osmBuildingsLabel:"buildings",osmWaterLabel:"water",osmWildlifeLabel:"🦌 Forest wildlife",osmLiveGpsTag:"Live OSM",osmDemoTourTag:"Demo Tour",cinematicCamBtn:"🎥 Cinema",cinematicCamLabel:"Cinematic Commercial Cam",themeLabel:"Holiday Theme",themeClassic:"Coca-Cola",themeNordic:"Nordic Tale",themeCyber:"Cyber 2099",calendarLabel:"Advent & Holiday Calendar",calAuto:"Auto (Today)",calAdvent:"4th Advent",calLucia:"Lucia (Dec 13)",calXmasEve:"Xmas Eve (Dec 24)",micLabel:"🎤 Cabin Music Light Show",micOff:"Off",micActive:"Active",micDenied:"Blocked",liveSectionLabel:"Live Space, Wind & Flights",frostWipeHint:"Drag edges to wipe windshield frost",giftsLabel:"🎁",elonTimelineToggleLabel:"Show Elon Timeline along road",convoyHornBtn:"📯 Horn",townTreeLitToast:"🎄 Town Square Tree Ignited! +5 🎁 Full Block Glowing!",snowmanCrownToast:"⛄ Snowman Crowned with Gold! +2 🎁",wishStarToast:"🌠 Shooting Star Caught! +3 Wish Bonus 🎁",convoyHornToast:"📯 Convoy Horn Salute · Synchronized Light Flash!"},C_={sv:E_,en:A_};class R_{constructor(){k(this,"locale","sv");k(this,"listeners",new Set);try{const e=localStorage.getItem("tesla-xmas-locale");(e==="sv"||e==="en")&&(this.locale=e)}catch{}}getLocale(){return this.locale}setLocale(e){if(this.locale!==e){this.locale=e;try{localStorage.setItem("tesla-xmas-locale",e)}catch{}for(const t of this.listeners)t(e)}}t(){return C_[this.locale]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}const Ou=new R_;class py{constructor(){k(this,"streaks",[]);k(this,"scrollPhase",0);for(let e=0;e<65;e++)this.streaks.push({angle:Math.random()*Math.PI*2,z:Math.random(),len:.04+Math.random()*.09,gold:Math.random()>.72})}render(e,t,n,i,r){const o=r.tunnelBlend;if(o<=.01)return;const l=.55+(r.speedKmh>3?r.speedKmh:68)/80*1.45;this.scrollPhase=(this.scrollPhase+i*l*1.35)%1,e.save(),e.globalAlpha=Math.min(1,o);const c=t*.5+r.turnRate*t*.08,h=n*.46,u=e.createRadialGradient(c,h,12,c,h,Math.max(t,n)*.78);u.addColorStop(0,"#fff4dc"),u.addColorStop(.08,"#ffb868"),u.addColorStop(.24,"#5a1324"),u.addColorStop(.65,"#190612"),u.addColorStop(1,"#090208"),e.fillStyle=u,e.fillRect(0,0,t,n);const d=22,f=Math.hypot(t,n)*.78,p=18;for(let m=d-1;m>=0;m--){const g=(m/d+this.scrollPhase/d)%1,y=Math.pow(g,2.35),v=p+y*f,_=(c-t*.5)*(1-y)+r.turnRate*45*(1-y),C=t*.5+_,T=h+(1-y)*-10,A=(m+Math.floor(this.scrollPhase*d))%3;let P="#e6223a";A===1&&(P="#f7f1e8"),A===2&&(P="#ffcf70");const w=2+y*24;e.save(),e.beginPath(),e.ellipse(C,T,v*1.18,v*.88,0,0,Math.PI*2),e.strokeStyle=P,e.globalAlpha=o*(.18+y*.78),e.lineWidth=w,e.stroke(),y>.14&&m%2===0&&(e.beginPath(),e.ellipse(C,T,v*1.13,v*.84,0,Math.PI*1.1,Math.PI*1.9),e.strokeStyle="rgba(255, 224, 150, 0.65)",e.lineWidth=1.5+y*4,e.setLineDash([4+y*12,10+y*24]),e.stroke(),e.setLineDash([])),e.restore()}const x=e.createLinearGradient(0,h+20,0,n);x.addColorStop(0,"rgba(255, 210, 140, 0.2)"),x.addColorStop(.35,"rgba(130, 30, 48, 0.35)"),x.addColorStop(1,"rgba(12, 5, 16, 0.88)"),e.fillStyle=x,e.beginPath(),e.moveTo(c-28,h+16),e.lineTo(c+28,h+16),e.lineTo(t*.96,n),e.lineTo(t*.04,n),e.closePath(),e.fill();for(let m=0;m<12;m++){const g=(m/12+this.scrollPhase)%1,y=Math.pow(g,2.2),v=h+20+y*(n-h-20),_=c+r.turnRate*(1-y)*26,C=2+y*8;e.fillStyle=m%2===0?"rgba(255, 216, 132, 0.85)":"rgba(255, 86, 104, 0.85)",e.beginPath(),e.ellipse(_,v,C*1.8,C*.7,0,0,Math.PI*2),e.fill()}for(const m of this.streaks){m.z+=i*l*.85,m.z>=1&&(m.z-=1);const g=Math.pow(m.z,2),y=Math.pow(Math.min(1,m.z+m.len),2),v=22+g*f*.95,_=22+y*f*.95,C=Math.cos(m.angle),T=Math.sin(m.angle);e.strokeStyle=m.gold?`rgba(255, 224, 145, ${.25+g*.6})`:`rgba(235, 246, 255, ${.22+g*.55})`,e.lineWidth=1+g*2.5,e.beginPath(),e.moveTo(c+C*v*1.15,h+T*v*.85),e.lineTo(c+C*_*1.15,h+T*_*.85),e.stroke()}e.save(),e.font=`600 ${Math.max(11,Math.round(t*.011))}px "Cinzel", Georgia, serif`,e.textAlign="center",e.fillStyle="rgba(255, 232, 182, 0.92)",e.shadowColor="rgba(255, 170, 70, 0.9)",e.shadowBlur=14,e.fillText(Ou.t().tunnelBanner,t*.5,Math.max(76,n*.14)),e.restore(),e.restore()}}const P_={starman:12,starlink:11,starship:13,supercharger:11,cyberplow:11},Yr=["starman","starlink","starship","supercharger","cyberplow"];class my{constructor(){k(this,"active",null);k(this,"cooldownSec",9);k(this,"lastType",null);k(this,"onStartCallbacks",new Set)}onEventStart(e){return this.onStartCallbacks.add(e),()=>this.onStartCallbacks.delete(e)}getActiveEvent(){return this.active}trigger(e){const t=P_[e];this.active={type:e,duration:t,elapsed:0,progress:0},this.lastType=e,this.cooldownSec=28+Math.random()*16;for(const n of this.onStartCallbacks)n(e)}triggerNext(){const e=this.lastType?(Yr.indexOf(this.lastType)+1)%Yr.length:0,t=Yr[e];return this.trigger(t),t}update(e,t){if(this.active)return this.active.elapsed+=e,this.active.progress=Math.min(1,this.active.elapsed/this.active.duration),this.active.elapsed>=this.active.duration&&(this.active=null),this.active;if(t&&(this.cooldownSec-=e,this.cooldownSec<=0)){const n=Yr.filter(r=>r!==this.lastType),i=n[Math.floor(Math.random()*n.length)];this.trigger(i)}return null}reset(){this.active=null,this.cooldownSec=10}}function L_(s){const e=25514428610880003e-7,t=Date.UTC(2e3,0,6,18,14,0);return((s.getTime()-t)%e+e)%e/e}function I_(s,e){const t=s.getFullYear(),n=new Date(t,11,24,15,0,0);s.getTime()>new Date(t,11,26).getTime()&&n.setFullYear(t+1);const i=Math.max(0,Math.ceil((n.getTime()-s.getTime())/864e5));if(e==="lucia")return{adventCandles:2,isLucia:!0,isXmasEve:!1,daysToXmas:i,badgeSv:"🕯 Luciatåg längs snövallen!",badgeEn:"🕯 St. Lucia Procession!"};if(e==="xmas_eve"){const x=new Date(s.getFullYear(),s.getMonth(),s.getDate(),15,0,0),m=Math.max(0,Math.floor((x.getTime()-s.getTime())/36e5)),g=Math.max(0,Math.floor((x.getTime()-s.getTime())%36e5/6e4));return{adventCandles:4,isLucia:!1,isXmasEve:!0,daysToXmas:0,badgeSv:s.getHours()<15?`🎆 Julafton! Kalle Anka om ${m}h ${g}m`:"🎆 Julafton · Fyrverkerier över bergen!",badgeEn:"🎆 Christmas Eve Fireworks!"}}if(e.startsWith("advent")){const x=Number(e.replace("advent",""));return{adventCandles:x,isLucia:!1,isXmasEve:!1,daysToXmas:i,badgeSv:`🕯 ${x}:a–4:e Advent (${x}/4 ljus tända)`,badgeEn:`🕯 Advent Candle ${x}/4 Lit`}}const o=new Date(t,11,24).getDay(),a=24-(o===0?0:o),l=new Date(t,11,a,0,0,0),c=new Date(l.getTime()-21*864e5);let h=0;if(s>=c){const x=Math.floor((s.getTime()-c.getTime())/6048e5)+1;h=Math.min(4,Math.max(1,x))}const u=s.getMonth()===11&&s.getDate()===13,d=s.getMonth()===11&&(s.getDate()===24||s.getDate()===25);let f=null,p=null;return d?(f="🎆 God Jul & Gott Nytt!",p="🎆 Merry Christmas Eve!"):u?(f="🕯 Glad Lucia (13 dec)",p="🕯 Happy St. Lucia Day!"):h>0&&(f=`🕯 ${h} adventljus · ${i} dgr till jul`,p=`🕯 Advent ${h}/4 · ${i}d to Xmas`),{adventCandles:h,isLucia:u,isXmasEve:d,daysToXmas:i,badgeSv:f,badgeEn:p}}class gy{constructor(){k(this,"skyMood","midnight");k(this,"quality","ultra");k(this,"frostEnabled",!0);k(this,"theme","classic");k(this,"calendarMode","auto");k(this,"cinematicCam",!1);k(this,"elonTimelineEnabled",!0);k(this,"temperatureC",-6);k(this,"windSpeedKmh",14);k(this,"windDirDeg",250);k(this,"precipMm",.4);k(this,"isSnowingReal",!0);k(this,"sunriseMin",480);k(this,"sunsetMin",915);k(this,"sunriseText","08:00");k(this,"sunsetText","15:15");k(this,"lastWeatherFetchMs",0);k(this,"lastLat",59.33);k(this,"lastLon",18.07);try{const e=localStorage.getItem("tesla-xmas-sky");(e==="midnight"||e==="twilight"||e==="daylight"||e==="auto")&&(this.skyMood=e);const t=localStorage.getItem("tesla-xmas-quality");(t==="ultra"||t==="eco")&&(this.quality=t),localStorage.getItem("tesla-xmas-frost")==="0"&&(this.frostEnabled=!1);const i=localStorage.getItem("tesla-xmas-theme");(i==="classic"||i==="nordic"||i==="cyber2099")&&(this.theme=i);const r=localStorage.getItem("tesla-xmas-cal");(r==="auto"||r==="advent1"||r==="advent2"||r==="advent3"||r==="advent4"||r==="lucia"||r==="xmas_eve")&&(this.calendarMode=r),localStorage.getItem("tesla-xmas-cinecam")==="1"&&(this.cinematicCam=!0),localStorage.getItem("tesla-xmas-elon-timeline")==="0"&&(this.elonTimelineEnabled=!1)}catch{}}getQuality(){return this.quality}setQuality(e){this.quality=e;try{localStorage.setItem("tesla-xmas-quality",e)}catch{}}getSkyMood(){return this.skyMood}setSkyMood(e){this.skyMood=e;try{localStorage.setItem("tesla-xmas-sky",e)}catch{}}isFrostEnabled(){return this.frostEnabled}setFrostEnabled(e){this.frostEnabled=e;try{localStorage.setItem("tesla-xmas-frost",e?"1":"0")}catch{}}isElonTimelineEnabled(){return this.elonTimelineEnabled}setElonTimelineEnabled(e){this.elonTimelineEnabled=e;try{localStorage.setItem("tesla-xmas-elon-timeline",e?"1":"0")}catch{}}getTheme(){return this.theme}setTheme(e){this.theme=e;try{localStorage.setItem("tesla-xmas-theme",e)}catch{}}getCalendarMode(){return this.calendarMode}setCalendarMode(e){this.calendarMode=e;try{localStorage.setItem("tesla-xmas-cal",e)}catch{}}isCinematicCam(){return this.cinematicCam}setCinematicCam(e){this.cinematicCam=e;try{localStorage.setItem("tesla-xmas-cinecam",e?"1":"0")}catch{}}maybeRefreshWeather(e,t){const n=Date.now(),i=Math.abs(e-this.lastLat)>.25||Math.abs(t-this.lastLon)>.25;if(this.lastWeatherFetchMs!==0&&n-this.lastWeatherFetchMs<900*1e3&&!i)return;this.lastWeatherFetchMs=n,this.lastLat=e,this.lastLon=t;const r=`https://api.open-meteo.com/v1/forecast?latitude=${e.toFixed(3)}&longitude=${t.toFixed(3)}&current=temperature_2m,snowfall,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=auto&forecast_days=1`;fetch(r).then(o=>o.ok?o.json():null).then(o=>{var m,g,y,v;if(!o||!o.current)return;const a=o.current.temperature_2m,l=o.current.snowfall,c=o.current.precipitation,h=o.current.weather_code,u=o.current.wind_speed_10m,d=o.current.wind_direction_10m;typeof a=="number"&&Number.isFinite(a)&&(this.temperatureC=Math.round(a)),typeof u=="number"&&Number.isFinite(u)&&(this.windSpeedKmh=Math.max(0,Math.round(u))),typeof d=="number"&&Number.isFinite(d)&&(this.windDirDeg=(d%360+360)%360),typeof c=="number"&&Number.isFinite(c)&&(this.precipMm=Math.max(0,c));const f=new Set([71,73,75,77,85,86]);this.isSnowingReal=typeof l=="number"&&l>0||typeof c=="number"&&c>.2||f.has(h);const p=(g=(m=o.daily)==null?void 0:m.sunrise)==null?void 0:g[0],x=(v=(y=o.daily)==null?void 0:y.sunset)==null?void 0:v[0];if(typeof p=="string"&&p.includes("T")){const _=p.split("T")[1].slice(0,5),[C,T]=_.split(":").map(Number);Number.isFinite(C)&&Number.isFinite(T)&&(this.sunriseMin=C*60+T,this.sunriseText=_)}if(typeof x=="string"&&x.includes("T")){const _=x.split("T")[1].slice(0,5),[C,T]=_.split(":").map(Number);Number.isFinite(C)&&Number.isFinite(T)&&(this.sunsetMin=C*60+T,this.sunsetText=_)}}).catch(()=>{})}getState(){const e=new Date,t=e.getHours()*60+e.getMinutes();let n="midnight",i=0,r=0;if(this.skyMood==="daylight")n="daylight",i=1,r=.08;else if(this.skyMood==="twilight")n="twilight",i=.32,r=1;else if(this.skyMood==="auto"){const m=Math.abs(t-this.sunriseMin),g=Math.abs(t-this.sunsetMin);m<=42||g<=48?(n="twilight",i=.34,r=1):t>this.sunriseMin+42&&t<this.sunsetMin-48?(n="daylight",i=.95,r=.1):(n="midnight",i=0,r=0)}const o=this.temperatureC<=0?Math.min(1,.45+Math.abs(this.temperatureC)*.04):.28,a=this.isSnowingReal?.14:0,l=this.frostEnabled?Math.min(1,o+a):0,c=L_(e),h=I_(e,this.calendarMode);let u="#040a1d",d="#0b1a42",f="#192d5c",p="#0c1b42",x=.65;return this.theme==="cyber2099"?(u=n==="daylight"?"#1e2c64":"#060318",d=n==="daylight"?"#4a3f92":"#16093b",f=n==="daylight"?"#8c4b86":"#311259",p=n==="daylight"?"#4e3978":"#150b35",x=.85):n==="daylight"?(u="#3a75b8",d="#7cb3e2",f="#deebf8",p="#9cbfe4",x=.45):this.theme==="nordic"?(u="#04122e",d="#0e2959",f=n==="twilight"?"#70496c":"#234472",p=n==="twilight"?"#2c2c58":"#132854",x=.82):n==="twilight"&&(u="#0b1c48",d="#27427c",f="#8c5a74",p="#233262",x=1),{skyMood:this.skyMood,effectiveSky:n,daylightFactor:i,blueHourFactor:r,sunriseText:this.sunriseText,sunsetText:this.sunsetText,fogColor:p,quality:this.quality,temperatureC:this.temperatureC,windSpeedKmh:this.windSpeedKmh,windDirDeg:this.windDirDeg,precipMm:this.precipMm,moonPhase:c,isSnowingReal:this.isSnowingReal,frostEnabled:this.frostEnabled,frostAmount:l,theme:this.theme,calendarMode:this.calendarMode,holidayCalendar:h,cinematicCam:this.cinematicCam,elonTimelineEnabled:this.elonTimelineEnabled,skyTopColor:u,skyMidColor:d,skyHorizonColor:f,horizonWarmGlow:x}}}let aa=null,la=null,ca=null,ha=null;function Bu(){if(ha)return ha;const s=256,e=32,t=document.createElement("canvas");t.width=s,t.height=e;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,s,0);i.addColorStop(0,"rgba(255, 224, 150, 0)"),i.addColorStop(.28,"rgba(255, 224, 150, 0.25)"),i.addColorStop(.5,"rgba(255, 248, 224, 0.92)"),i.addColorStop(.72,"rgba(255, 224, 150, 0.25)"),i.addColorStop(1,"rgba(255, 224, 150, 0)");const r=n.createLinearGradient(0,0,0,e);r.addColorStop(0,"rgba(255, 255, 255, 0)"),r.addColorStop(.5,"rgba(255, 255, 255, 1)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),n.fillStyle=i,n.fillRect(0,0,s,e),n.globalCompositeOperation="destination-in",n.fillStyle=r,n.fillRect(0,0,s,e);const o=new zt(t);return o.colorSpace=dt,ha=o,o}function Jn(){if(aa)return aa;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=t.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.22,"rgba(255, 248, 224, 0.85)"),n.addColorStop(.55,"rgba(255, 224, 155, 0.28)"),n.addColorStop(1,"rgba(255, 200, 120, 0)"),t.fillStyle=n,t.fillRect(0,0,s,s);const i=new zt(e);return i.colorSpace=dt,aa=i,i}function D_(){if(la)return la;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=t.createRadialGradient(n,n,2,n,n,n);i.addColorStop(0,"rgba(255, 255, 255, 0.96)"),i.addColorStop(.36,"rgba(235, 246, 255, 0.66)"),i.addColorStop(.76,"rgba(210, 232, 255, 0.16)"),i.addColorStop(1,"rgba(210, 232, 255, 0)"),t.fillStyle=i,t.fillRect(0,0,s,s),t.save(),t.translate(n,n),t.strokeStyle="rgba(255, 255, 255, 0.72)",t.lineWidth=3,t.lineCap="round";for(let o=0;o<6;o++)t.rotate(Math.PI/3),t.beginPath(),t.moveTo(0,0),t.lineTo(0,-28),t.moveTo(0,-14),t.lineTo(7,-21),t.moveTo(0,-14),t.lineTo(-7,-21),t.stroke();t.restore();const r=new zt(e);return r.colorSpace=dt,la=r,r}function ku(){if(ca)return ca;const s=128,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d"),n=s/2,i=t.createRadialGradient(n,n,1,n,n,n);i.addColorStop(0,"rgba(255, 252, 230, 1)"),i.addColorStop(.25,"rgba(255, 224, 130, 0.75)"),i.addColorStop(.6,"rgba(255, 190, 80, 0.2)"),i.addColorStop(1,"rgba(255, 180, 70, 0)"),t.fillStyle=i,t.fillRect(0,0,s,s),t.fillStyle="#fff9df",t.beginPath(),t.ellipse(n,n,n*.88,4.5,0,0,Math.PI*2),t.ellipse(n,n,4.5,n*.88,0,0,Math.PI*2),t.fill();const r=new zt(e);return r.colorSpace=dt,ca=r,r}function N_(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d");t.fillStyle="#808080",t.fillRect(0,0,256,256),i.fillStyle="#d4d4d4",i.fillRect(0,0,256,256);for(let a=0;a<65;a++){const l=Math.random()*256,c=Math.random()*256,h=18+Math.random()*44,u=t.createRadialGradient(l,c,2,l,c,h),d=Math.random()>.5?215:55;u.addColorStop(0,`rgba(${d},${d},${d},0.22)`),u.addColorStop(1,"rgba(128,128,128,0)"),t.fillStyle=u,t.beginPath(),t.arc(l,c,h,0,Math.PI*2),t.fill()}for(let a=0;a<520;a++){const l=Math.random()*256,c=Math.random()*256;i.fillStyle=Math.random()>.35?"#1c1c1c":"#555555",i.fillRect(l,c,2,2)}const r=new zt(e);r.wrapS=r.wrapT=Zn,r.repeat.set(16,16);const o=new zt(n);return o.wrapS=o.wrapT=Zn,o.repeat.set(22,22),{bumpMap:r,roughnessMap:o}}function Qn(s="#94b0d8"){const{bumpMap:e,roughnessMap:t}=N_();return new ut({color:s,roughness:.82,metalness:.02,clearcoat:.14,clearcoatRoughness:.48,bumpMap:e,bumpScale:.16,roughnessMap:t,sheen:.2,sheenColor:new De("#9ec0ee"),sheenRoughness:.7})}function U_(s="#7c1a28"){const n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d");i.fillStyle=s,i.fillRect(0,0,256,256);const r=8,o=256/r;for(let l=0;l<r;l++){const c=l*o,h=i.createLinearGradient(0,c,0,c+o);h.addColorStop(0,"rgba(255, 220, 190, 0.14)"),h.addColorStop(.5,"rgba(0, 0, 0, 0)"),h.addColorStop(1,"rgba(20, 4, 8, 0.38)"),i.fillStyle=h,i.fillRect(0,c,256,o),i.strokeStyle="rgba(255, 235, 210, 0.07)",i.lineWidth=1.5,i.beginPath(),i.moveTo(0,c+o*.45),i.bezierCurveTo(256*.3,c+o*.3,256*.7,c+o*.65,256,c+o*.48),i.stroke()}i.fillStyle="#efe6d8",i.fillRect(0,0,14,256),i.fillRect(242,0,14,256);const a=new zt(n);return a.colorSpace=dt,a}function F_(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(128*.5,128*.62,6,128*.5,128*.5,128*.72);n.addColorStop(0,"#fff7cf"),n.addColorStop(.42,"#ffbe55"),n.addColorStop(.82,"#e87a24"),n.addColorStop(1,"#7c2b12"),t.fillStyle=n,t.fillRect(0,0,128,128),t.fillStyle="rgba(84, 30, 12, 0.32)",t.beginPath(),t.moveTo(128*.68,128*.34),t.lineTo(128*.52,128*.88),t.lineTo(128*.84,128*.88),t.closePath(),t.fill(),t.strokeStyle="#381512",t.lineWidth=9,t.strokeRect(4,4,120,120),t.lineWidth=6,t.beginPath(),t.moveTo(128*.5,0),t.lineTo(128*.5,128),t.moveTo(0,128*.5),t.lineTo(128,128*.5),t.stroke();const i=new zt(e);return i.colorSpace=dt,i}function O_(){const t=document.createElement("canvas");t.width=512,t.height=192;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,512,192);i.addColorStop(0,"#8d081e"),i.addColorStop(.5,"#d91234"),i.addColorStop(1,"#780618"),n.fillStyle=i,n.fillRect(0,0,512,192),n.strokeStyle="rgba(255, 255, 255, 0.92)",n.lineWidth=9,n.beginPath(),n.moveTo(-10,192*.76),n.bezierCurveTo(512*.25,192*.2,512*.68,192*1.05,522,192*.26),n.stroke(),n.strokeStyle="rgba(255, 224, 140, 0.85)",n.lineWidth=4,n.beginPath(),n.moveTo(-10,192*.84),n.bezierCurveTo(512*.28,192*.34,512*.65,192*1.1,522,192*.36),n.stroke();for(let o=0;o<24;o++){const a=o*53%512,l=o*37%160+16;n.fillStyle="rgba(255, 244, 200, 0.6)",n.beginPath(),n.arc(a,l,2.2+o%3,0,Math.PI*2),n.fill()}n.fillStyle="#fff9ee",n.shadowColor="rgba(255, 210, 115, 0.9)",n.shadowBlur=16,n.font='italic 700 46px Georgia, "Cinzel", serif',n.textAlign="center",n.textBaseline="middle",n.fillText("Coca-Cola",512*.5,192*.41),n.shadowBlur=8,n.fillStyle="#ffe29c",n.font="700 17px Inter, sans-serif",n.fillText("✦  HOLIDAY EXPRESS · JULKARAVAN  ✦",512*.5,192*.74);const r=new zt(t);return r.colorSpace=dt,r}function zu(s,e,t,n){s.save(),s.translate(e,t),s.fillStyle="#e31937",s.beginPath(),s.moveTo(-n*.68,-n*.28),s.quadraticCurveTo(0,-n*.46,n*.68,-n*.28),s.lineTo(n*.56,-n*.16),s.quadraticCurveTo(0,-n*.31,-n*.56,-n*.16),s.closePath(),s.fill(),s.beginPath(),s.moveTo(-n*.52,-n*.08),s.quadraticCurveTo(0,-n*.21,n*.52,-n*.08),s.lineTo(n*.14,n*.04),s.lineTo(0,n*.68),s.lineTo(-n*.14,n*.04),s.closePath(),s.fill(),s.restore()}function B_(){const t=document.createElement("canvas");t.width=512,t.height=192;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,512,192);i.addColorStop(0,"#a80c24"),i.addColorStop(.5,"#dc1230"),i.addColorStop(1,"#84081a"),n.fillStyle=i,n.fillRect(0,0,512,192),n.fillStyle="rgba(244, 248, 255, 0.94)",n.fillRect(0,0,512,12),n.fillRect(0,180,512,12),n.strokeStyle="#ffd878",n.lineWidth=3,n.strokeRect(10,14,492,164);for(let h=0;h<22;h++){const u=(h*47+22)%512,d=(h*31+19)%144+24;n.fillStyle=h%2===0?"rgba(255, 246, 210, 0.72)":"rgba(255, 255, 255, 0.62)",n.beginPath(),n.arc(u,d,2+h%3,0,Math.PI*2),n.fill()}const r=38,o=38,a=114,l=102;n.fillStyle="#ffffff",n.beginPath(),n.roundRect(r,o,a,l,20),n.fill(),n.strokeStyle="#ffd166",n.lineWidth=3,n.stroke(),zu(n,r+a*.5,o+l*.52,46),n.fillStyle="#fff9eb",n.shadowColor="rgba(255, 218, 125, 0.75)",n.shadowBlur=14,n.font='700 42px "Cinzel", Georgia, serif',n.textAlign="center",n.textBaseline="middle",n.fillText("T E S L A",512*.64,192*.41),n.shadowBlur=6,n.fillStyle="#ffe099",n.font="600 16px Inter, sans-serif",n.fillText("✦  ELECTRIC HOLIDAY EXPRESS · GOD JUL  ✦",512*.64,192*.72);const c=new zt(t);return c.colorSpace=dt,c}function k_(s){const t=document.createElement("canvas");t.width=256,t.height=256;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,s==="tesla"?"#dc1230":"#c40d28"),i.addColorStop(1,"#7a0616"),n.fillStyle=i,n.fillRect(0,0,256,256),n.strokeStyle="#ffe08a",n.lineWidth=8,n.strokeRect(10,10,236,236),s==="tesla"?(n.fillStyle="#ffffff",n.beginPath(),n.roundRect(58,36,140,104,20),n.fill(),zu(n,128,90,48),n.fillStyle="#fff6de",n.font='700 26px "Cinzel", Georgia, serif',n.textAlign="center",n.textBaseline="middle",n.fillText("TESLA · GOD JUL!",128,186)):(n.fillStyle="#fff8ee",n.font="italic 700 44px Georgia, serif",n.textAlign="center",n.textBaseline="middle",n.fillText("Coca-Cola",128,92),n.fillStyle="#ffe29c",n.font='700 26px "Cinzel", Georgia, serif',n.fillText("GOD JUL!",128,172));const r=new zt(t);return r.colorSpace=dt,r}function z_(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),n=t.createRadialGradient(256*.38,256*.38,12,256*.5,256*.5,256*.55);n.addColorStop(0,"#fffdf2"),n.addColorStop(.65,"#fae9c4"),n.addColorStop(1,"#dfc08b"),t.fillStyle=n,t.fillRect(0,0,256,256);const i=[[.3,.35,.14],[.62,.28,.1],[.54,.62,.16],[.26,.68,.08],[.74,.54,.09],[.44,.22,.07]];for(const[o,a,l]of i){const c=t.createRadialGradient(o*256,a*256,2,o*256,a*256,l*256);c.addColorStop(0,"rgba(170, 140, 96, 0.28)"),c.addColorStop(.75,"rgba(182, 152, 108, 0.14)"),c.addColorStop(1,"rgba(255, 240, 200, 0)"),t.fillStyle=c,t.beginPath(),t.arc(o*256,a*256,l*256,0,Math.PI*2),t.fill()}const r=new zt(e);return r.colorSpace=dt,r}function Vl(s="#ffdf9e",e=.28){return new Ht({uniforms:{uColor:{value:new De(s)},uOpacity:{value:e}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:Rt,side:an})}const G_=`
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,H_=`
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
`;function xy(s=300){const e=new Xe(s,36,24),t=new Ht({vertexShader:G_,fragmentShader:H_,uniforms:{uTime:{value:0},uAuroraBoost:{value:1},uThemeMode:{value:0},uDaylight:{value:0},uTopColor:{value:new De("#040a1e")},uMidColor:{value:new De("#0c1e4a")},uHorizonColor:{value:new De("#1d3364")}},side:qt,depthWrite:!1});return{mesh:new L(e,t),material:t}}function _y(s=10){const e=new Ve,t=z_(),n=new Ht({uniforms:{uMap:{value:t},uSunDir:{value:new E(.25,.15,.96).normalize()}},vertexShader:`
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
    `,fog:!1}),i=new L(new Xe(s,28,28),n);e.add(i);const r=new Xt({map:Jn(),color:"#ffdf9a",transparent:!0,opacity:.72,blending:Rt,depthWrite:!1,fog:!1}),o=new $t(r);o.scale.set(s*5.8,s*5.8,1),e.add(o);const a=new Xt({map:Bu(),color:"#ffe8b8",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1,fog:!1}),l=new $t(a);l.scale.set(s*12.5,s*1.2,1),e.add(l);let c=1;return e.userData.setMoonPhase=h=>{const u=(.5-h)*Math.PI*2;n.uniforms.uSunDir.value.set(Math.sin(u),.12,Math.cos(u)).normalize(),c=.5-.5*Math.cos(h*Math.PI*2),r.opacity=.28+c*.48},e.userData.setDaylight=h=>{const u=1-Math.min(.8,h*.8);r.opacity=(.28+c*.48)*u,a.opacity=(.14+c*.26)*u},e}function vy(s,e){const t=new Ve,n=Math.floor(s*.72),i=Math.max(20,s-n),r=(h,u,d)=>{const f=new Float32Array(h*3),p=new Float32Array(h);for(let y=0;y<h;y++)f[y*3]=e.minX+Math.random()*(e.maxX-e.minX),f[y*3+1]=e.minY+Math.random()*(e.maxY-e.minY),f[y*3+2]=e.minZ+Math.random()*(e.maxZ-e.minZ),p[y]=Math.random()*Math.PI*2;const x=new _t;x.setAttribute("position",new Ft(f,3));const m=new vo({map:D_(),color:"#f2f8ff",size:u,transparent:!0,opacity:d,depthWrite:!1,blending:Rt}),g=new Fl(x,m);return t.add(g),{pts:g,pos:f,seeds:p,count:h}},o=r(n,.52,.85),a=r(i,1.35,.45);let l=0;const c=(h,u,d,f,p,x)=>{const{pos:m,seeds:g,count:y}=h;for(let v=0;v<y;v++){const _=v*3,C=Math.sin(l*1.4+g[v])*.65;m[_]+=(d*x+C)*u,m[_+1]-=p*x*u,m[_+2]+=f*x*u,m[_+1]<e.minY&&(m[_+1]=e.maxY),m[_+1]>e.maxY&&(m[_+1]=e.minY),m[_]<e.minX&&(m[_]+=e.maxX-e.minX),m[_]>e.maxX&&(m[_]-=e.maxX-e.minX),m[_+2]<e.minZ&&(m[_+2]+=e.maxZ-e.minZ),m[_+2]>e.maxZ&&(m[_+2]-=e.maxZ-e.minZ)}h.pts.geometry.attributes.position.needsUpdate=!0};return{group:t,update(h,u,d,f){l+=h,c(o,h,u,d,f,1),c(a,h,u,d,f,1.38)}}}function V_(s,e,t,n,i,r){s.clearRect(0,0,e,t),s.fillStyle="rgba(10, 18, 42, 0.86)",s.beginPath(),s.roundRect(4,4,e-8,t-8,16),s.fill(),s.strokeStyle=r,s.lineWidth=3,s.stroke(),s.fillStyle="#fff9eb",s.font="700 24px Inter, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText(n.slice(0,26),e*.5,t*.36,e-24),s.fillStyle=r,s.font="600 18px Inter, sans-serif",s.fillText(i.slice(0,32),e*.5,t*.7,e-24)}class yy{constructor(){k(this,"group",new Ve);k(this,"issGroup");k(this,"issTagTex");k(this,"issTagCtx");k(this,"issLastTag","");k(this,"adventGroup",new Ve);k(this,"candles",[]);k(this,"luciaGroup",new Ve);k(this,"luciaZ",-58);k(this,"spaceXGantry",new Ve);k(this,"spaceXGantryZ",-118);k(this,"spaceXTex");k(this,"spaceXCtx");k(this,"spaceXLastText","");k(this,"spaceXMiniRocket");k(this,"fireworkBursts",[]);k(this,"fireworksGroup",new Ve);k(this,"meteors",[]);const e=Jn(),t=ku();this.issGroup=new Ve;const n=new Ue({color:"#e5a93c",metalness:.72,roughness:.28,emissive:"#4d3206",emissiveIntensity:.6,fog:!1}),i=new Ue({color:"#dce6f5",metalness:.75,roughness:.3,fog:!1}),r=new L(new Ne(6.8,.22,.22),i),o=new L(new ot(.42,.42,2.4,10),i);o.rotation.x=Math.PI*.5,this.issGroup.add(r,o);for(const U of[-2.5,-1.65,1.65,2.5])for(const O of[-1,1]){const Y=new L(new Ne(.65,.05,2.2),n);Y.position.set(U,0,O*1.45),this.issGroup.add(Y)}const a=new qe({color:"#e61938",toneMapped:!1,fog:!1}),l=new qe({color:"#ffffff",toneMapped:!1,fog:!1}),c=new L(new St(.42,.95,10),a);c.position.set(0,.9,0),c.rotation.z=-.2;const h=new L(new Zt(.4,.1,6,12),l);h.rotation.x=Math.PI*.5,h.position.set(0,.48,0),this.issGroup.add(c,h);const u=document.createElement("canvas");u.width=384,u.height=96,this.issTagCtx=u.getContext("2d"),this.issTagTex=new zt(u),this.issTagTex.colorSpace=dt;const d=new $t(new Xt({map:this.issTagTex,transparent:!0,fog:!1,depthWrite:!1}));d.scale.set(12.5,3.1,1),d.position.set(0,2.9,0),this.issGroup.add(d),this.issGroup.visible=!1,this.group.add(this.issGroup);const f=new Ue({color:"#fff5df",roughness:.45,emissive:"#381e06",emissiveIntensity:.35,fog:!1}),p=new Ue({color:"#8f1224",roughness:.5,fog:!1}),x=new qe({color:"#ffcf5c",toneMapped:!1,fog:!1}),m=[-48,-19,19,48];for(let U=0;U<4;U++){const O=new Ve;O.position.set(m[U],14,-160);const Y=new L(new ot(1.1,1.25,14,12),f);Y.position.y=7;const V=new L(new ot(1.28,1.28,2.2,12),p);V.position.y=1.6;const J=new L(new St(.85,3.4,10),x);J.position.y=16;const G=new $t(new Xt({map:e,color:"#ffd26a",transparent:!0,opacity:.9,blending:Rt,depthWrite:!1,fog:!1}));G.scale.set(16,16,1),G.position.y=16,O.add(Y,V,J,G),this.adventGroup.add(O),this.candles.push({root:O,flame:J,halo:G})}this.adventGroup.visible=!1,this.group.add(this.adventGroup);const g=new Ue({color:"#f7faff",roughness:.65}),y=new Ue({color:"#cf1530",roughness:.5}),v=new qe({color:"#ffd866",toneMapped:!1}),_=new Ue({color:"#ffd9be",roughness:.65});for(let U=0;U<5;U++){const O=new Ve;O.position.set(U%2===0?-.4:.4,0,U*1.9);const Y=new L(new St(.42,1.55,10),g);Y.position.y=.78;const V=new L(new Xe(.22,10,10),_);if(V.position.y=1.72,O.add(Y,V),U===0){const G=new L(new ot(.27,.29,.18,10),y);G.position.y=.98;const F=new L(new Zt(.22,.04,6,12),v);F.rotation.x=Math.PI*.5,F.position.y=1.92,O.add(G,F);for(let W=0;W<5;W++){const j=W/5*Math.PI*2,ce=new L(new Xe(.055,6,6),x);ce.position.set(Math.cos(j)*.21,2.04,Math.sin(j)*.21),O.add(ce)}}else{const G=new L(new ot(.03,.03,.36,6),l);G.position.set(.26,1.25,-.24);const F=new L(new Xe(.075,6,6),x);F.position.set(.26,1.46,-.24),O.add(G,F)}const J=new $t(new Xt({map:e,color:"#ffdb8a",transparent:!0,opacity:.45,blending:Rt,depthWrite:!1}));J.scale.set(2.4,2.4,1),J.position.y=1.7,O.add(J),this.luciaGroup.add(O)}this.luciaGroup.visible=!1,this.group.add(this.luciaGroup);const C=["#ffd966","#ff4769","#56f5b8"];for(let U=0;U<3;U++){const Y=new Float32Array(126),V=new Float32Array(126),J=new _t;J.setAttribute("position",new Ft(Y,3));const G=new Fl(J,new vo({map:t,color:C[U],size:2.6,transparent:!0,opacity:.95,blending:Rt,depthWrite:!1,fog:!1}));G.frustumCulled=!1,this.fireworksGroup.add(G);const F={points:G,pos:Y,vel:V,age:-U*.85,maxAge:2.2,cx:(U-1)*32,cy:30+U%2*8,cz:-135};this.resetFirework(F),this.fireworkBursts.push(F)}this.fireworksGroup.visible=!1,this.group.add(this.fireworksGroup);const T=new qe({color:"#ffe9a8",transparent:!0,opacity:.9,toneMapped:!1,fog:!1});for(let U=0;U<2;U++){const O=new Ve,Y=new $t(new Xt({map:t,color:"#fff6cf",transparent:!0,opacity:.96,blending:Rt,depthWrite:!1,fog:!1}));Y.scale.set(5.2,5.2,1);const V=new L(new Ne(16,.25,.25),T);V.position.set(-7.5,2.2,0),V.rotation.z=-.32;const J=new $t(new Xt({map:e,color:"#ffe066",transparent:!0,opacity:0,blending:Rt,depthWrite:!1,fog:!1}));J.scale.set(16,16,1),O.add(Y,V,J),O.visible=!1,this.group.add(O),this.meteors.push({group:O,wishRing:J,age:0,cooldown:3.5+U*5.2,startX:-55+U*30,startY:48,endX:25+U*25,endY:22,wishBurstAge:-1})}const A=new Ue({color:"#1b2234",metalness:.7,roughness:.35});for(const U of[-2.4,2.4]){const O=new L(new ot(.14,.16,6.2,8),A);O.position.set(U,3.1,0),this.spaceXGantry.add(O)}const P=document.createElement("canvas");P.width=512,P.height=160,this.spaceXCtx=P.getContext("2d"),this.spaceXTex=new zt(P),this.spaceXTex.colorSpace=dt;const w=new L(new nn(5.6,1.75),new qe({map:this.spaceXTex,toneMapped:!1,side:an}));w.position.set(0,5.1,0),this.spaceXGantry.add(w),this.spaceXMiniRocket=new Ve;const M=new L(new ot(.32,.36,3.6,12),i);M.position.y=1.8;const I=new L(new St(.32,.9,12),i);I.position.y=4.05;const H=new L(new St(.45,1.2,10),new qe({color:"#ffb84d",toneMapped:!1}));H.rotation.x=Math.PI,H.position.y=-.4,this.spaceXMiniRocket.add(M,I,H),this.spaceXMiniRocket.position.set(3.2,.2,.4),this.spaceXGantry.add(this.spaceXMiniRocket),this.spaceXGantry.rotation.y=-.35,this.group.add(this.spaceXGantry)}resetFirework(e){e.cx=-42+Math.random()*84,e.cy=24+Math.random()*14,e.cz=-132-Math.random()*20;const t=e.pos.length/3;for(let n=0;n<t;n++){e.pos[n*3]=e.cx,e.pos[n*3+1]=e.cy,e.pos[n*3+2]=e.cz;const i=Math.random()*Math.PI*2,r=(Math.random()-.5)*Math.PI,o=6+Math.random()*10;e.vel[n*3]=Math.cos(i)*Math.cos(r)*o,e.vel[n*3+1]=Math.sin(r)*o+3,e.vel[n*3+2]=Math.sin(i)*Math.cos(r)*o*.4}}update(e,t,n,i,r,o,a,l=!0){if(this.issGroup.visible=r.issNearby,this.issGroup.visible){const p=t*.045%1*150-75,x=48+Math.sin((p+75)/150*Math.PI)*10;this.issGroup.position.set(p,x,-138),this.issGroup.rotation.y=.25+Math.sin(t*.4)*.1;const m=`🛰 ISS · ${r.issDistanceKm.toLocaleString()} km`,g=`${r.issVelocityKmh.toLocaleString()} km/h`,y=`${m}|${g}`;this.issLastTag!==y&&(this.issLastTag=y,V_(this.issTagCtx,384,96,m,g,"#ffd878"),this.issTagTex.needsUpdate=!0)}const c=i.holidayCalendar.adventCandles;if(this.adventGroup.visible=c>0,this.adventGroup.visible){this.adventGroup.position.x=-a*16;for(let p=0;p<4;p++){const x=this.candles[p],m=p<c;if(x.flame.visible=m,x.halo.visible=m,m){const g=.92+Math.sin(t*9+p*1.7)*.14;x.flame.scale.set(1,g,1),x.halo.scale.set(14*g,14*g,1)}}}if(this.luciaGroup.visible=l&&i.holidayCalendar.isLucia,this.luciaGroup.visible){this.luciaZ+=n*.55,this.luciaZ>16&&(this.luciaZ=-138);const p=o(this.luciaZ),x=o(this.luciaZ-5),m=Math.atan2(p-x,5);this.luciaGroup.position.set(p-8.6,.05,this.luciaZ),this.luciaGroup.rotation.y=m,this.luciaGroup.children.forEach((g,y)=>{g.position.y=Math.abs(Math.sin(t*4.5+y*.9))*.08})}if(this.fireworksGroup.visible=i.holidayCalendar.isXmasEve,this.fireworksGroup.visible)for(const p of this.fireworkBursts)if(p.age+=e,p.age>p.maxAge&&(p.age=0,this.resetFirework(p)),p.age>=0){p.points.visible=!0;const x=p.pos.length/3;for(let m=0;m<x;m++)p.pos[m*3]+=p.vel[m*3]*e,p.pos[m*3+1]+=p.vel[m*3+1]*e,p.pos[m*3+2]+=p.vel[m*3+2]*e,p.vel[m*3+1]-=4.2*e;p.points.geometry.attributes.position.needsUpdate=!0,p.points.material.opacity=Math.max(0,1-p.age/p.maxAge)}else p.points.visible=!1;this.spaceXGantryZ+=n,this.spaceXGantryZ>22&&(this.spaceXGantryZ-=165);const h=o(this.spaceXGantryZ),u=o(this.spaceXGantryZ-5);this.spaceXGantry.position.set(h+13.5,0,this.spaceXGantryZ),this.spaceXGantry.rotation.y=Math.atan2(h-u,5)-.35,this.spaceXMiniRocket.visible=r.nextSpaceXLaunchToday,this.spaceXMiniRocket.visible&&(this.spaceXMiniRocket.position.y=.25+Math.abs(Math.sin(t*2))*.35);const d=`${r.nextSpaceXCountdown}|${r.nextSpaceXName}`;if(this.spaceXLastText!==d){this.spaceXLastText=d;const p=this.spaceXCtx;p.clearRect(0,0,512,160);const x=p.createLinearGradient(0,0,512,160);x.addColorStop(0,"#0d193a"),x.addColorStop(1,"#290f32"),p.fillStyle=x,p.beginPath(),p.roundRect(6,6,500,148,18),p.fill(),p.strokeStyle="#70e2ff",p.lineWidth=5,p.stroke(),p.fillStyle="#70e2ff",p.font="700 22px Inter, sans-serif",p.textAlign="center",p.textBaseline="middle",p.fillText(`🚀 SPACEX · ${r.nextSpaceXCountdown}`,256,52,470),p.fillStyle="#fff8ea",p.font='600 24px "Cinzel", Georgia, serif',p.fillText(r.nextSpaceXName.slice(0,28),256,108,470),this.spaceXTex.needsUpdate=!0}const f=i.daylightFactor<.65;for(const p of this.meteors){if(p.wishBurstAge>=0){p.wishBurstAge+=e,p.group.visible=!0;const x=16+p.wishBurstAge*44;p.wishRing.scale.set(x,x,1),p.wishRing.material.opacity=Math.max(0,1-p.wishBurstAge/.85),p.wishBurstAge>.85&&(p.wishBurstAge=-1,p.group.visible=!1,p.cooldown=7.5+Math.random()*4.5);continue}if(!f){p.group.visible=!1;continue}if(p.cooldown>0){if(p.cooldown-=e,p.group.visible=!1,p.cooldown<=0){p.age=0;const x=Math.random()>.5?1:-1;p.startX=-x*(38+Math.random()*26),p.startY=44+Math.random()*14,p.endX=x*(28+Math.random()*28),p.endY=20+Math.random()*10}}else{p.age+=e;const x=2.4;if(p.age>=x)p.cooldown=7+Math.random()*5,p.group.visible=!1;else{const m=p.age/x;p.group.visible=!0,p.wishRing.material.opacity=0,p.group.position.set(_i.lerp(p.startX,p.endX,m),_i.lerp(p.startY,p.endY,m),-136),p.group.scale.y=p.endX>p.startX?1:-1}}}}tryCatchShootingStar(){const e=this.meteors.find(t=>t.cooldown<=0&&t.wishBurstAge<0&&t.group.visible);return e?(e.wishBurstAge=0,!0):!1}dispose(){this.issTagTex.dispose(),this.spaceXTex.dispose();for(const e of this.fireworkBursts)e.points.geometry.dispose(),e.points.material.dispose();this.group.traverse(e=>{var t,n;if(e.isMesh){const i=e;(t=i.geometry)==null||t.dispose(),Array.isArray(i.material)?i.material.forEach(r=>r.dispose()):(n=i.material)==null||n.dispose()}})}}const Hn=[{placeName:"Stockholm",roadName:"Strandvägen",biome:"village",nearbyLandmark:"Kungliga Slottet",nearbyChargerName:null,lat:59.3322,lon:18.0815},{placeName:"Upplandsslätten",roadName:"Landsväg 255",biome:"open",nearbyLandmark:"Vintervidderna",nearbyChargerName:null,lat:59.721,lon:17.785},{placeName:"Roslagen",roadName:"Nordskogen",biome:"forest",nearbyLandmark:"Glittrande Granskog",nearbyChargerName:null,lat:59.685,lon:18.705},{placeName:"Giga Nord",roadName:"E4 Express",biome:"highway",nearbyLandmark:"Tesla Gigafactory Nord",nearbyChargerName:"Supercharger Giga Nord",lat:59.506,lon:17.921},{placeName:"Sigtuna",roadName:"Stora Gatan",biome:"village",nearbyLandmark:"Mariakyrkan",nearbyChargerName:null,lat:59.617,lon:17.723},{placeName:"Uppsala",roadName:"Fyrisån",biome:"water",nearbyLandmark:"Uppsala Domkyrka",nearbyChargerName:null,lat:59.858,lon:17.634}];function gl(s,e,t,n){const i=Math.cos(s*Math.PI/180);return{x:(n-e)*111320*i,z:-(t-s)*110540}}function W_(s,e,t,n){const r=(t-s)*Math.PI/180,o=(n-e)*Math.PI/180,a=Math.sin(r/2)**2+Math.cos(s*Math.PI/180)*Math.cos(t*Math.PI/180)*Math.sin(o/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}function X_(s,e,t,n,i=0){const r=t*.5,o=n*.5,a=Math.cos(i),l=Math.sin(i);return[[-r,-o],[r,-o],[r,o],[-r,o]].map(([h,u])=>({x:s+h*a-u*l,z:e+h*l+u*a}))}function vh(s){let e=0,t=0,n=0,i=1/0,r=-1/0,o=1/0,a=-1/0;const l=s.length;for(let c=0;c<l;c++){const h=s[c],u=s[(c+1)%l];e+=h.x*u.z-u.x*h.z,t+=h.x,n+=h.z,i=Math.min(i,h.x),r=Math.max(r,h.x),o=Math.min(o,h.z),a=Math.max(a,h.z)}return{area:Math.abs(e*.5),cx:t/Math.max(1,l),cz:n/Math.max(1,l),widthM:Math.max(3,r-i),depthM:Math.max(3,a-o)}}function q_(s,e){if(s.length<=e)return s;const t=s.length/e,n=[];for(let i=0;i<e;i++)n.push(s[Math.floor(i*t)]);return n}function K_(s,e){const t=s.building??"yes",n=s.amenity??"",i=s.name??"";let r=0;const o=Number.parseFloat(s.height??"");if(Number.isFinite(o)&&o>2)r=o;else if(s["building:levels"]){const c=Number.parseFloat(s["building:levels"]);Number.isFinite(c)&&c>0&&(r=c*3.4+1.5)}let a="small_cottage";const l=t==="industrial"||t==="warehouse"||t==="factory"||t==="supermarket"||t==="retail"||t==="hangar"||s.landuse==="industrial";return t==="church"||t==="cathedral"||n==="place_of_worship"||/kyrka|cathedral|chapel/i.test(i)?(a="church",r||(r=16)):l&&e>=280||e>=660||/giga|factory|warehouse|hall|center|fabrik/i.test(i)?(a="gigafactory",r||(r=13.5+Math.min(6,e*.004))):e>=290||(s.tourism==="attraction"||s.historic)||r>=14||/slott|palace|muse|school|skola|hospital/i.test(i)?(a="large_building",r||(r=15+Math.min(14,e*.012))):e>=115||t==="apartments"||t==="residential"||t==="terrace"?(a="medium_house",r||(r=8.5+Math.min(8,e*.02))):(a="small_cottage",r||(r=4.8+(e>60?1.5:0))),{kind:a,heightM:Math.max(4.4,Math.min(34,r))}}function ua(s,e){const t=Hn[s%Hn.length],n=[],i=[],r=[],o=[],a=[],l=(c,h,u,d,f,p,x,m=null,g=0)=>{n.push({id:c,footprint:X_(h,u,d,f,g),centerX:h,centerZ:u,widthM:d,depthM:f,areaM2:d*f,heightM:p,kind:x,name:m})};if(t.placeName==="Stockholm"){r.push({points:[{x:-16,z:30},{x:-16,z:-240},{x:-110,z:-240},{x:-110,z:30}],isPolygon:!0,widthM:80,name:"Nybroviken"});for(let c=0;c<8;c++){const h=-14-c*26;l(`sthlm-a-${c}`,22,h,15,16,12.5+c%3*2.5,"medium_house"),c%2===0&&l(`sthlm-b-${c}`,44,h-6,17,15,14+c%2*3,"medium_house")}l("sthlm-palace",-30,-125,22,32,19,"large_building","Kungliga Slottet"),a.push({x:-13,z:-125,kind:"landmark",name:"Kungliga Slottet"}),i.push({points:[{x:11,z:-60},{x:75,z:-60}],widthM:6,isMajor:!1,name:"Torggatan"}),i.push({points:[{x:11,z:-134},{x:75,z:-134}],widthM:6,isMajor:!1,name:"Slottsbacken"}),o.push({centerX:-14,centerZ:-45,radiusM:8,density:.35},{centerX:14,centerZ:-102,radiusM:8,density:.35})}else if(t.placeName==="Upplandsslätten")l("upp-stuga",-22,-92,7.6,6.2,5.2,"small_cottage","Lillstugan",.14),l("upp-stuga-2",26,-158,7.2,5.8,5,"small_cottage",null,-.18),o.push({centerX:-48,centerZ:-140,radiusM:10,density:.28}),a.push({x:13,z:-88,kind:"landmark",name:"Vintervidderna"});else if(t.placeName==="Roslagen"){for(let c=0;c<9;c++){const h=c%2===0?-1:1,u=-18-c*23;o.push({centerX:h*(22+c%3*9),centerZ:u,radiusM:18,density:.85}),c===2?l("ros-cottage-1",-20,u,8.2,6.6,5.4,"small_cottage","Skogstorpet",.18):c===5&&l("ros-cottage-2",21,u,7.8,6.4,5.2,"small_cottage","Jägarstugan",-.2)}i.push({points:[{x:11,z:-76},{x:68,z:-92}],widthM:4.5,isMajor:!1,name:"Skogsvägen"}),a.push({x:13,z:-76,kind:"landmark",name:"Glittrande Granskog"})}else if(t.placeName==="Giga Nord")l("giga-factory-1",-34,-96,26,44,14.5,"gigafactory","Tesla Gigafactory Nord"),l("giga-office-2",28,-148,22,18,12,"large_building","Giga Design Hub"),l("giga-cottage-gate",22,-46,8,6.5,5.4,"small_cottage","Entrévakt",-.15),a.push({x:15,z:-96,kind:"charger",name:"Supercharger Giga Nord"}),i.push({points:[{x:-75,z:-64},{x:75,z:-64}],widthM:8,isMajor:!0,name:"Giga Allé"}),o.push({centerX:46,centerZ:-64,radiusM:14,density:.45});else if(t.placeName==="Sigtuna"){r.push({points:[{x:-34,z:30},{x:-38,z:-240},{x:-115,z:-240},{x:-115,z:30}],isPolygon:!0,widthM:70,name:"Sigtunafjärden"});for(let c=0;c<8;c++){const h=-16-c*24;l(`sig-l-${c}`,-19,h,c%2===0?7.8:11.2,c%2===0?6.4:9,c%2===0?5.4:8.5,c%2===0?"small_cottage":"medium_house"),l(`sig-r-${c}`,19,h-6,c%2===1?8:12,c%2===1?6.6:9.4,c%2===1?5.6:9,c%2===1?"small_cottage":"medium_house")}l("sig-church",31,-110,14,22,18,"church","Mariakyrkan"),a.push({x:13,z:-92,kind:"landmark",name:"Sigtuna Julmarknad"}),i.push({points:[{x:-34,z:-92},{x:64,z:-92}],widthM:5,isMajor:!1,name:"Stora Torget"}),o.push({centerX:-30,centerZ:-175,radiusM:12,density:.42})}else{r.push({points:[{x:-20,z:30},{x:-22,z:-110},{x:-27,z:-240}],isPolygon:!1,widthM:16,name:"Fyrisån"});for(let c=0;c<7;c++){const h=-18-c*28;l(`upp-r-${c}`,22,h,14.5,13.5,11.5+c%2*3,"medium_house"),c%2===0&&l(`upp-l-${c}`,-39,h-8,12,11,10.5,"medium_house")}l("upp-dom",-40,-116,20,32,26,"church","Uppsala Domkyrka"),a.push({x:-16,z:-116,kind:"church",name:"Uppsala Domkyrka"}),i.push({points:[{x:-65,z:-116},{x:65,z:-116}],widthM:6,isMajor:!1,name:"Dombron"}),o.push({centerX:34,centerZ:-182,radiusM:14,density:.42})}return{version:e,biome:t.biome,originLat:t.lat,originLon:t.lon,buildings:n,roads:i,waters:r,forests:o,pois:a}}async function Y_(s,e,t,n){try{const h=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:new URLSearchParams({data:s}),signal:AbortSignal.any([n,AbortSignal.timeout(7500)])});if(h.ok){const u=await h.json();if(Array.isArray(u.elements)&&u.elements.some(d=>{var f,p;return((f=d.tags)==null?void 0:f.highway)&&((p=d.geometry)==null?void 0:p.length)}))return u.elements}}catch(h){if(n.aborted)throw h}const i=390/110540,r=390/(111320*Math.max(.05,Math.cos(e*Math.PI/180))),o=[t-r,e-i,t+r,e+i].map(h=>h.toFixed(6)).join(","),a=await fetch("https://api.openstreetmap.org/api/0.6/map.json?bbox="+o,{signal:n});if(!a.ok)throw new Error("OSM map unavailable");const l=(await a.json()).elements,c=new Map;for(const h of l)h.type==="node"&&h.lat!==void 0&&h.lon!==void 0&&c.set(h.id,{lat:h.lat,lon:h.lon});for(const h of l)h.type==="way"&&h.nodes&&(h.geometry=h.nodes.flatMap(u=>c.get(u)??[]));return l.filter(h=>h.tags&&(!h.tags.highway||/^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$/.test(h.tags.highway)))}class My{constructor(e=!1){k(this,"enabled",!0);k(this,"isLiveOsm",!1);k(this,"placeName",Hn[0].placeName);k(this,"roadName",Hn[0].roadName);k(this,"biome",Hn[0].biome);k(this,"nearbyLandmark",Hn[0].nearbyLandmark);k(this,"nearbyChargerName",Hn[0].nearbyChargerName);k(this,"isNearRealTunnel",!1);k(this,"landmarkPulse",.7);k(this,"demoIdx",0);k(this,"demoTravelM",0);k(this,"snapshotVersion",1);k(this,"snapshot",ua(0,1));k(this,"lastFetchMs",0);k(this,"lastFetchLat",0);k(this,"lastFetchLon",0);k(this,"retryMap",!1);k(this,"inflightAbort",null);k(this,"placeListeners",new Set);if(!e)try{localStorage.getItem("tesla-xmas-osm")==="0"&&(this.enabled=!1)}catch{}}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e;try{localStorage.setItem("tesla-xmas-osm",e?"1":"0")}catch{}}onPlaceChange(e){return this.placeListeners.add(e),()=>this.placeListeners.delete(e)}emitPlaceChange(){const e=this.getState();for(const t of this.placeListeners)t(e)}nextDemoStop(){this.demoIdx=(this.demoIdx+1)%Hn.length,this.demoTravelM=0;const e=Hn[this.demoIdx];this.isLiveOsm=!1,this.placeName=e.placeName,this.roadName=e.roadName,this.biome=e.biome,this.nearbyLandmark=e.nearbyLandmark,this.nearbyChargerName=e.nearbyChargerName,this.isNearRealTunnel=!1,this.landmarkPulse=1,this.snapshotVersion++,this.snapshot=ua(this.demoIdx,this.snapshotVersion),this.emitPlaceChange()}update(e,t,n,i,r,o=55,a=!0){if(this.landmarkPulse>0&&(this.landmarkPulse=Math.max(0,this.landmarkPulse-e*.25)),(!this.enabled||t!=="gps")&&this.inflightAbort&&(this.inflightAbort.abort(),this.inflightAbort=null),(!this.enabled||t!=="gps")&&(this.lastFetchMs=0),!this.enabled||t==="gps"&&!a)return this.getState();if(t==="gps"){const l=Date.now(),c=this.lastFetchMs===0?9999:W_(this.lastFetchLat,this.lastFetchLon,n,i);!this.inflightAbort&&(this.lastFetchMs===0||l-this.lastFetchMs>=8e3&&c>=120||l-this.lastFetchMs>=3e4&&(!this.isLiveOsm||this.retryMap))&&(this.lastFetchMs=l,this.lastFetchLat=n,this.lastFetchLon=i,this.fetchLiveOsm(n,i))}else this.isLiveOsm&&(this.isLiveOsm=!1,this.snapshotVersion++,this.snapshot=ua(this.demoIdx,this.snapshotVersion)),r&&(this.demoTravelM+=Math.max(12,o)/3.6*e*.65,this.demoTravelM>=185&&this.nextDemoStop());return this.getState()}async fetchLiveOsm(e,t){var r;(r=this.inflightAbort)==null||r.abort();const n=new AbortController;this.inflightAbort=n;const i=setTimeout(()=>n.abort(),2e4);try{const o=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.toFixed(5)}&lon=${t.toFixed(5)}&zoom=18&addressdetails=1`,a=e.toFixed(4),l=t.toFixed(4),h=`[out:json][timeout:6];${`way(around:650,${a},${l})["highway"~"^(motorway|trunk|primary|secondary|tertiary)(_link)?$|^(residential|living_street|unclassified|service|road)$"]`};out body geom;(way(around:460,${a},${l})["building"];way(around:320,${a},${l})["natural"~"water|wood|grassland|heath"];way(around:300,${a},${l})["waterway"~"river|canal|stream"];way(around:300,${a},${l})["landuse"~"forest|farmland|meadow|field|farmyard|pasture|industrial|commercial|retail|residential|recreation_ground"];way(around:300,${a},${l})["leisure"="park"];way(around:120,${a},${l})["tunnel"="yes"];node(around:450,${a},${l})["amenity"~"charging_station|place_of_worship|cafe|restaurant|school|library"];node(around:450,${a},${l})["tourism"="attraction"];node(around:450,${a},${l})["railway"="station"];node(around:450,${a},${l})["historic"];node(around:350,${a},${l})["natural"="tree"];);out body geom;`,[u,d]=await Promise.all([fetch(o,{signal:AbortSignal.timeout(3500)}).catch(()=>null),Y_(h,e,t,n.signal)]);let f=this.isLiveOsm?this.placeName:"",p=this.isLiveOsm?this.roadName:"";if(u!=null&&u.ok){const U=await u.json(),O=(U==null?void 0:U.address)??{};f=O.city||O.town||O.village||O.suburb||O.municipality||f,p=O.road||O.neighbourhood||f}let x="open",m=null,g=null,y=!1;const v=[],_=[],C=[],T=[],A=[],P=[],w=[],M=new Set;{let U=!1,O=!1,Y=!1,V=!1,J=!1;for(const G of d){const F=G.tags;if(!F)continue;if(F.tunnel==="yes"&&(y=!0),G.type==="node"&&G.lat!==void 0&&G.lon!==void 0){const j=gl(e,t,G.lat,G.lon);if(F.natural==="tree")P.push(j);else if(F.amenity==="charging_station"){const ce=F.name||F.operator||"Laddstation";g||(g=ce),A.push({x:j.x,z:j.z,kind:"charger",name:ce,tesla:/tesla|supercharger/i.test([F.name,F.brand,F.operator,F.network].join(" "))})}else F.amenity==="place_of_worship"&&F.name?(m||(m=F.name),A.push({x:j.x,z:j.z,kind:"church",name:F.name})):F.railway==="station"&&F.name?(m||(m=F.name),A.push({x:j.x,z:j.z,kind:"station",name:F.name})):F.name&&(m||(m=F.name),A.push({x:j.x,z:j.z,kind:"landmark",name:F.name}));continue}if(G.type!=="way"||!G.geometry||G.geometry.length<2||M.has(G.id))continue;M.add(G.id);const W=G.geometry.map(j=>gl(e,t,j.lat,j.lon));if(F.building){const j=W.length>3&&Math.hypot(W[0].x-W[W.length-1].x,W[0].z-W[W.length-1].z)<.3?W.slice(0,-1):W;if(j.length<3)continue;const ce=vh(j);if(ce.area<8)continue;const Be=K_(F,ce.area);v.push({id:`w-${G.id}`,footprint:j,centerX:ce.cx,centerZ:ce.cz,widthM:ce.widthM,depthM:ce.depthM,areaM2:ce.area,heightM:Be.heightM,kind:Be.kind,tesla:/tesla|gigafactory/i.test([F.name,F.brand,F.operator].join(" "))&&/industrial|warehouse|factory|commercial/.test(F.building+" "+F.landuse)||/gigafactory/i.test(F.name??""),name:F.name??null}),Be.kind==="church"&&F.name&&(m=F.name)}else if(F.highway){const j=F.highway,ce=j==="motorway"||j==="trunk"||j==="primary"||j==="secondary";ce&&(J=!0);const Be=ce?8.5:j==="tertiary"||j==="residential"?6.2:4.2;_.push({points:W,widthM:Be,isMajor:ce,tunnel:F.tunnel==="yes"||F.tunnel==="building_passage",name:F.name??F.ref??null})}else if(F.natural==="water"||F.waterway){U=!0;const j=W.length>3&&Math.hypot(W[0].x-W[W.length-1].x,W[0].z-W[W.length-1].z)<2;C.push({points:q_(j?W.slice(0,-1):W,20),isPolygon:j&&F.natural==="water",widthM:F.waterway==="river"||F.waterway==="canal"?14:7,name:F.name??F.ref??null})}else if(F.natural==="wood"||F.landuse==="forest"||F.leisure==="park"){O=!0,W.length>3&&Math.hypot(W[0].x-W.at(-1).x,W[0].z-W.at(-1).z)<1&&w.push(W);const j=vh(W),ce=Math.max(8,Math.min(34,Math.sqrt(Math.max(50,j.area)/Math.PI)));T.push({centerX:j.cx,centerZ:j.cz,radiusM:ce,density:F.leisure==="park"?.45:.88})}else F.landuse==="farmland"||F.landuse==="meadow"||F.landuse==="field"||F.landuse==="farmyard"||F.landuse==="pasture"||F.natural==="grassland"||F.natural==="heath"?V=!0:(F.landuse==="residential"||F.landuse==="commercial"||F.landuse==="retail")&&(Y=!0)}U&&C.length>0?x="water":O&&v.length<7?x="forest":v.length>=4||Y?x="village":V||!O&&v.length<=3&&!J?x="open":x="highway"}const I=(U,O)=>U*U+O*O;v.sort((U,O)=>I(U.centerX,U.centerZ)-I(O.centerX,O.centerZ)),T.sort((U,O)=>I(U.centerX,U.centerZ)-I(O.centerX,O.centerZ)),A.sort((U,O)=>I(U.x,U.z)-I(O.x,O.z));const H=f!==this.placeName||x!==this.biome||m!==this.nearbyLandmark;if(n.signal.aborted)return;this.retryMap=!1,this.isLiveOsm=!0,this.placeName=f,this.roadName=p,this.biome=x,this.nearbyLandmark=m,this.nearbyChargerName=g,this.isNearRealTunnel=y,this.snapshotVersion++,this.snapshot={version:this.snapshotVersion,biome:x,originLat:e,originLon:t,buildings:v.slice(0,350),trees:P,woodland:w,roads:_,waters:C.slice(0,10),forests:T.slice(0,14),pois:A.slice(0,8)},H&&(this.landmarkPulse=1,this.emitPlaceChange())}catch{this.retryMap=!0}finally{clearTimeout(i),this.inflightAbort===n&&(this.inflightAbort=null)}}getState(){return{enabled:this.enabled,isLiveOsm:this.isLiveOsm,placeName:this.placeName,roadName:this.roadName,biome:this.biome,nearbyLandmark:this.nearbyLandmark,nearbyChargerName:this.nearbyChargerName,isNearRealTunnel:this.isNearRealTunnel,landmarkPulse:this.landmarkPulse,snapshot:this.snapshot,buildingCount:this.snapshot.buildings.length,waterCount:this.snapshot.waters.length,forestCount:this.snapshot.forests.length,demoTravelM:this.demoTravelM}}}function Sy(s){const e=[],t=[];for(const i of s){const r=i.points.filter((o,a,l)=>!a||o.x!==l[a-1].x||o.z!==l[a-1].z);if(!(r.length<2))for(let o=0;o<r.length;o++){const a=r[o],l=r[Math.max(0,o-1)],c=r[Math.min(r.length-1,o+1)],h=Math.hypot(c.x-l.x,c.z-l.z)||1,u=(c.z-l.z)*i.widthM/(2*h),d=(l.x-c.x)*i.widthM/(2*h),f=e.length/3;e.push(a.x+u,.04,a.z+d,a.x-u,.04,a.z-d),o&&t.push(f-2,f-1,f,f,f-1,f+1)}}const n=new _t;return n.setAttribute("position",new Ze(e,3)),n.setIndex(t),n.computeVertexNormals(),n}function by(s,e){const t=gl(s.originLat,s.originLon,e.latitude,e.longitude),n=e.headingDeg*Math.PI/180;let i=1/0,r;for(const o of s.roads)for(let a=1;a<o.points.length;a++){const l=o.points[a-1],c=o.points[a],h=c.x-l.x,u=c.z-l.z,d=Math.hypot(h,u);if(!d)continue;const f=_i.clamp(((t.x-l.x)*h+(t.z-l.z)*u)/(d*d),0,1),p=Math.hypot(l.x+f*h-t.x,l.z+f*u-t.z);if(p>o.widthM/2+12)continue;const x=Math.abs((h*Math.sin(n)-u*Math.cos(n))/d),m=p+(1-x)*5;m<i&&(i=m,r=o)}return r}function wy(s,e,t,n){let i=1/0,r=0,o=1,a=0;const l=s.points.slice(1).flatMap((g,y)=>{const v=s.points[y],_=g.x-v.x,C=g.z-v.z,T=Math.hypot(_,C);if(!T)return[];const A=_i.clamp(((e.x-v.x)*_+(e.z-v.z)*C)/(T*T),0,1),P=Math.hypot(e.x-v.x-A*_,e.z-v.z-A*C);return P<i&&(i=P,r=a+A*T,o=_*Math.sin(t)-C*Math.cos(t)>=0?1:-1),a+=T,[{a:v,dx:_,dz:C,meters:T,end:a}]}),c=r+n*o;if(c<0||c>a)return;const h=l.find(g=>g.end>=c);if(!h)return;const{a:u,dx:d,dz:f,meters:p,end:x}=h,m=1-(x-c)/p;return{x:u.x+m*d,z:u.z+m*f,heading:Math.atan2(o*d,-o*f)}}function Ty(s,e=!1){const t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new _t;let c=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=yh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);const p=yh(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function yh(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new Ft(o,t,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){const x=h.getComponent(d,p);a.setComponent(d+u,p,x)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function Mh(s,e){if(e===yd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ol||e===Jh){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ol)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class j_ extends As{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)}),this.register(function(t){return new hv(t)}),this.register(function(t){return new uv(t)}),this.register(function(t){return new dv(t)}),this.register(function(t){return new iv(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new ov(t)}),this.register(function(t){return new Q_(t)}),this.register(function(t){return new av(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new cv(t)}),this.register(function(t){return new lv(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new fv(t)}),this.register(function(t){return new pv(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Qs.extractUrlBase(e);o=Qs.resolveURL(c,this.path)}else o=Qs.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Fu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Gu){try{o[at.KHR_BINARY_GLTF]=new mv(e)}catch(u){i&&i(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Cv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new J_;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new gv(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new xv;break;case at.KHR_MESH_QUANTIZATION:o[u]=new _v;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Z_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $_{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new De(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Qt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ml(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new fo(h),c.distance=u;break;case"spot":c=new a_(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Vn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class J_{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return qe}extendParams(e,t,n){const i=[];e.color=new De(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Qt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,dt))}return Promise.all(i)}}class Q_{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class ev{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(a,a)}return Promise.all(r)}}class tv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class nv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class iv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Qt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,dt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class sv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class rv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(a[0],a[1],a[2],Qt),Promise.all(r)}}class ov{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class av{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(a[0],a[1],a[2],Qt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,dt)),Promise.all(r)}}class lv{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class cv{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ut}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class hv{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class uv{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class dv{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class fv{constructor(e){this.name=at.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class pv{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==un.TRIANGLES&&c.mode!==un.TRIANGLE_STRIP&&c.mode!==un.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const p of u){const x=new Qe,m=new E,g=new vi,y=new E(1,1,1),v=new hx(p.geometry,p.material,d);for(let _=0;_<d;_++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,_),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,_),l.SCALE&&y.fromBufferAttribute(l.SCALE,_),v.setMatrixAt(_,x.compose(m,g,y));for(const _ in l)if(_==="_COLOR_0"){const C=l[_];v.instanceColor=new hl(C.array,C.itemSize,C.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&p.geometry.setAttribute(_,l[_]);At.prototype.copy.call(v,p),this.parser.assignFinalMaterial(v),f.push(v)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Gu="glTF",Hs=12,Sh={JSON:1313821514,BIN:5130562};class mv{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Hs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Gu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Hs,r=new DataView(e,Hs);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Sh.JSON){const c=new Uint8Array(e,Hs+o,a);this.content=n.decode(c)}else if(l===Sh.BIN){const c=Hs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=xl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=xl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=us[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const p in f.attributes){const x=f.attributes[p],m=l[p];m!==void 0&&(x.normalized=m)}u(f)},a,c,Qt,d)})})}}class xv{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class _v{constructor(){this.name=at.KHR_MESH_QUANTIZATION}}class Hu extends dr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,x=p-c,m=-2*f+3*d,g=f-d,y=1-m,v=g-d+u;for(let _=0;_!==a;_++){const C=o[x+_+a],T=o[x+_+l]*h,A=o[p+_+a],P=o[p+_]*h;r[_]=y*C+v*T+m*A+g*P}return r}}const vv=new vi;class yv extends Hu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return vv.fromArray(r).normalize().toArray(r),r}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},us={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bh={9728:Jt,9729:ln,9984:Hh,9985:Qr,9986:Ws,9987:Wn},wh={33071:pi,33648:oo,10497:Zn},da={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},xl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},di={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Mv={CUBICSPLINE:void 0,LINEAR:nr,STEP:tr},fa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Sv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ue({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:jn})),s.DefaultMaterial}function Ci(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Vn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function bv(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function wv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Tv(s){let e;const t=s.extensions&&s.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+pa(t.attributes):e=s.indices+":"+pa(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+pa(s.targets[n]);return e}function pa(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function _l(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ev(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Av=new Qe;class Cv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Z_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new s_(this.options.manager):this.textureLoader=new h_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ci(r,a,i),Vn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Qs.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=da[i.type],a=us[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Ft(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=da[i.type],c=us[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0;let x,m;if(f&&f!==u){const g=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let v=t.cache.get(y);v||(x=new c(a,g*f,i.count*f/h),v=new _u(x,f/h),t.cache.add(y,v)),m=new rr(v,l,d%f/h,p)}else a===null?x=new c(i.count*l):x=new c(a,d,i.count*l),m=new Ft(x,l,p);if(i.sparse!==void 0){const g=da.SCALAR,y=us[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,C=new y(o[1],v,i.sparse.count*g),T=new c(o[2],_,i.sparse.count*l);a!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,P=C.length;A<P;A++){const w=C[A];if(m.setX(w,T[A*l]),l>=2&&m.setY(w,T[A*l+1]),l>=3&&m.setZ(w,T[A*l+2]),l>=4&&m.setW(w,T[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=bh[d.magFilter]||ln,h.minFilter=bh[d.minFilter]||Wn,h.wrapS=wh[d.wrapS]||Zn,h.wrapT=wh[d.wrapT]||Zn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Jt&&h.minFilter!==ln,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let p=d;t.isImageBitmapLoader===!0&&(p=function(x){const m=new Ot(x);m.needsUpdate=!0,d(m)}),t.load(Qs.resolveURL(u,r.path),p,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),Vn(u,o),u.userData.mimeType=o.mimeType||Ev(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new vo,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Su,bn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ue}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){const u=i[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Qt),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,dt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=an);const h=r.alphaMode||fa.OPAQUE;if(h===fa.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===fa.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==qe&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ne(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==qe&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==qe){const u=r.emissiveFactor;a.emissive=new De().setRGB(u[0],u[1],u[2],Qt)}return r.emissiveTexture!==void 0&&o!==qe&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,dt)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Vn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Ci(i,u,r),u})}createUniqueName(e){const t=Mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Th(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Tv(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Th(new _t,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Sv(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){const x=h[f],m=o[f];let g;const y=c[f];if(m.mode===un.TRIANGLES||m.mode===un.TRIANGLE_STRIP||m.mode===un.TRIANGLE_FAN||m.mode===void 0)g=r.isSkinnedMesh===!0?new ax(x,y):new L(x,y),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===un.TRIANGLE_STRIP?g.geometry=Mh(g.geometry,Jh):m.mode===un.TRIANGLE_FAN&&(g.geometry=Mh(g.geometry,ol));else if(m.mode===un.LINES)g=new ux(x,y);else if(m.mode===un.LINE_STRIP)g=new Ul(x,y);else if(m.mode===un.LINE_LOOP)g=new dx(x,y);else if(m.mode===un.POINTS)g=new Fl(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&wv(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),Vn(g,r),m.extensions&&Ci(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Ci(i,u[0],r),u[0];const d=new Ve;r.extensions&&Ci(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(_i.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new xo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Qe;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Nl(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],p=i.samplers[f.sampler],x=f.target,m=x.node,g=i.parameters!==void 0?i.parameters[p.input]:p.input,y=i.parameters!==void 0?i.parameters[p.output]:p.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",y)),c.push(p),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],p=u[2],x=u[3],m=u[4],g=[];for(let y=0,v=d.length;y<v;y++){const _=d[y],C=f[y],T=p[y],A=x[y],P=m[y];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const w=n._createAnimationTracks(_,C,T,A,P);if(w)for(let M=0;M<w.length;M++)g.push(w[M])}return new $x(r,void 0,g)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Av)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new yu:c.length>1?h=new Ve:c.length===1?h=c[0]:h=new At,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Vn(h,r),r.extensions&&Ci(n,h,r),r.matrix!==void 0){const u=new Qe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ve;n.name&&(r.name=i.createUniqueName(n.name)),Vn(r,n),n.extensions&&Ci(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof bn||d instanceof Ot)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];di[r.path]===di.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(di[r.path]){case di.weights:c=ys;break;case di.rotation:c=Ms;break;case di.position:case di.scale:c=Ss;break;default:switch(n.itemSize){case 1:c=ys;break;case 2:case 3:default:c=Ss;break}break}const h=i.interpolation!==void 0?Mv[i.interpolation]:nr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const p=new c(l[d]+"."+di[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),o.push(p)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=_l(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ms?yv:Hu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Rv(s,e,t){const n=e.attributes,i=new Cn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),a.normalized){const h=_l(us[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new E,l=new E;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){const x=_l(us[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Rn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Th(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=xl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return ht.workingColorSpace!==Qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ht.workingColorSpace}" not supported.`),Vn(s,e),Rv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?bv(s,e.targets,t):s})}let is=null,ma=null;const Pv=new j_;async function Lv(){return is||(ma||(ma=fetch("./models/manifest.json").then(s=>s.ok?s.json():{}).then(s=>(is=s&&typeof s=="object"?s:{},is)).catch(()=>(is={},is))),ma)}function fr(s,e,t){Lv().then(n=>{const i=n[s];i&&Pv.load(`./models/${i}`,r=>{const o=r.scene,a=new Cn().setFromObject(o),l=new E,c=new E;a.getSize(l),a.getCenter(c);const h=Math.max(l.x,l.y,l.z,.001),u=e/h;o.scale.setScalar(u),o.position.sub(c.multiplyScalar(u)),o.position.y-=a.min.y*u,t(o)},void 0,()=>{})})}const ga={},xa={};let _a=null,va=null;function Iv(s){return ga[s]||(ga[s]=s==="tesla"?B_():O_()),ga[s]}function Dv(s){return xa[s]||(xa[s]=k_(s)),xa[s]}function Eh(){if(_a)return _a;const s=256,e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");t.fillStyle="#151820",t.fillRect(0,0,s,s);const n=12,i=n*1.732,r=n*1.5;t.strokeStyle="#07080c",t.lineWidth=2;for(let a=-1;a<s/r+2;a++)for(let l=-1;l<s/i+2;l++){const c=l*i+(a%2===0?0:i*.5),h=a*r;t.beginPath();for(let u=0;u<6;u++){const d=u/6*Math.PI*2+Math.PI/6,f=c+Math.cos(d)*(n-.8),p=h+Math.sin(d)*(n-.8);u===0?t.moveTo(f,p):t.lineTo(f,p)}t.closePath(),t.fillStyle=(a+l)%3===0?"#1b1f29":"#141720",t.fill(),t.stroke()}const o=new zt(e);return o.wrapS=o.wrapT=Zn,o.repeat.set(3,5),o.colorSpace=dt,_a=o,o}function Ah(){if(va)return va;const s=document.createElement("canvas");s.width=256,s.height=64;const e=s.getContext("2d");e.fillStyle="#0e1118",e.fillRect(0,0,256,64),e.fillStyle="#ff2a40",e.font="700 28px Inter, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText("T E S L A",128,34);const t=new zt(s);return t.colorSpace=dt,va=t,t}function vl(s,e,t,n,i){const r=new E().subVectors(t,e),o=new E().subVectors(n,e),a=new E().crossVectors(r,o),l=new E().addVectors(e,t).add(n).multiplyScalar(1/3);a.dot(l.sub(i))>=0?s.push(e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z):s.push(e.x,e.y,e.z,n.x,n.y,n.z,t.x,t.y,t.z)}function yl(s,e,t,n,i,r){vl(s,e,t,n,r),vl(s,e,n,i,r)}function Ml(s){const e=[],t=s[0].length;for(let r=0;r<s.length-1;r++){const o=s[r],a=s[r+1],l=new E;for(let c=0;c<t;c++)l.add(o[c]).add(a[c]);l.multiplyScalar(1/(t*2));for(let c=0;c<t;c++){const h=(c+1)%t;yl(e,o[c],o[h],a[h],a[c],l)}}const n=(r,o)=>{const a=new E;for(const c of r)a.add(c);a.multiplyScalar(1/r.length);const l=a.clone().add(new E(0,0,o));for(let c=0;c<r.length;c++){const h=(c+1)%r.length;vl(e,a,r[c],r[h],l)}};n(s[0],1),n(s[s.length-1],-1);const i=new _t;return i.setAttribute("position",new Ze(e,3)),i.computeVertexNormals(),i}function Nv(s=1){const e=new Ve,t=new Ue({color:"#f4f7fc",metalness:.94,roughness:.1}),n=new L(new Ne(.42,.055,.04),t);n.position.set(0,.14,0);const i=new L(new Ne(.16,.045,.04),t);i.position.set(-.15,.11,0),i.rotation.z=.25;const r=i.clone();r.position.x=.15,r.rotation.z=-.25;const o=new L(new St(.055,.34,4),t);return o.rotation.z=Math.PI,o.rotation.y=Math.PI*.25,o.scale.set(1,1,.45),o.position.set(0,-.02,0),e.add(n,i,r,o),e.scale.setScalar(s),e}function Uv(s="coca_cola"){const e=new Ve,t=new ut({color:s==="tesla"?"#f2f6fc":"#c40d2a",metalness:s==="tesla"?.28:.42,roughness:.14,clearcoat:1,clearcoatRoughness:.08}),n=new ut({color:s==="tesla"?"#dc1230":"#c40d2a",metalness:.38,roughness:.16,clearcoat:1,clearcoatRoughness:.08}),i=new Ue({color:"#12151e",roughness:.65,metalness:.2}),r=new ut({color:"#060c18",metalness:.15,roughness:.14,clearcoat:.35,clearcoatRoughness:.15,envMapIntensity:.35}),o=new Ue({color:"#dfe7f2",metalness:.9,roughness:.15}),a=Qn("#b8cee8"),c=[[-5.86,.68,.46,.88,.64,1.24,.52],[-5.52,.96,.42,1.02,.92,1.54,.78],[-4.96,1.18,.39,1.18,1.14,1.78,1.02],[-3.88,1.27,.38,1.26,1.24,3.08,1.08],[-2.68,1.28,.38,1.28,1.26,3.68,1.16],[-1.42,1.28,.38,1.28,1.27,4.02,1.22]].map(([F,W,j,ce,Be,Z,oe])=>[new E(-W*.88,j,F),new E(-W,ce,F),new E(-Be,ce+(Z-ce)*.48,F),new E(-oe,Z,F),new E(oe,Z,F),new E(Be,ce+(Z-ce)*.48,F),new E(W,ce,F),new E(W*.88,j,F)]),h=new L(Ml(c),t);e.add(h);const u=new L(new Ne(1.75,.22,.35),i);u.position.set(0,.48,-5.76),e.add(u);const d=Nv(.88);d.position.set(0,1.38,-5.68),d.rotation.x=.56,e.add(d);const f=[],p=new E(0,2.2,-3.9);yl(f,new E(-.96,1.84,-4.99),new E(.96,1.84,-4.99),new E(1.04,3.07,-3.94),new E(-1.04,3.07,-3.94),p);for(const F of[-1,1])yl(f,new E(F*1.19,1.82,-4.74),new E(F*1.16,2.95,-3.86),new E(F*1.27,2.95,-2.76),new E(F*1.31,1.84,-3.02),p);const x=new _t;x.setAttribute("position",new Ze(f,3)),x.computeVertexNormals();const m=new L(x,r);e.add(m);const g=new qe({color:"#fff8e8",toneMapped:!1}),y=Vl("#ffdf9e",.24);for(const F of[-1,1]){const W=new L(new Ne(.58,.34,.38),i);W.position.set(F*.92,.88,-5.45),W.rotation.y=F*.42,e.add(W);const j=new L(new Ne(.54,.085,.1),g);j.position.set(F*.92,.88,-5.58),j.rotation.y=F*.45,j.rotation.z=F*.24;const ce=new L(new Ne(.085,.34,.1),g);ce.position.set(F*1.12,.96,-5.4),ce.rotation.y=F*.35,ce.rotation.z=F*-.15,e.add(j,ce);const Be=new L(new St(2.6,14.5,18,1,!0),y);Be.rotation.x=Math.PI*.5,Be.position.set(F*.92,.86,-12.8),e.add(Be)}const v=new qe({color:"#ffad3b",toneMapped:!1});for(let F=-2;F<=2;F++){const W=new L(new Ne(.14,.05,.07),v);W.position.set(F*.32,3.16,-3.82),e.add(W)}for(const F of[-1,1]){const W=new L(new Ne(.32,.06,.08),i);W.position.set(F*1.38,2.15,-4.32),W.rotation.y=F*-.25;const j=new L(new Ne(.11,.82,.22),i);j.position.set(F*1.54,2.38,-4.38),j.rotation.x=-.08,e.add(W,j)}for(const F of[-1,1]){const W=new L(new Ne(.12,.72,1.55),n);W.position.set(F*1.24,.74,-3.55);const j=new L(new Ne(.12,.65,2),n);j.position.set(F*1.24,.92,-2),e.add(W,j)}const _=new L(new Ne(2.62,3.22,9.1),n);_.position.set(0,2.42,3.3),e.add(_);for(const F of[-1,1]){const W=new L(new Ne(.1,.56,5.2),n);W.position.set(F*1.28,.68,1.85),e.add(W)}for(const F of[-1.31,1.31])for(const W of[-1.25,7.85]){const j=new L(new Ne(.08,3.26,.08),o);j.position.set(F,2.42,W),e.add(j)}const C=new L(new Ne(2.68,.16,9.16),a);C.position.set(0,4.08,3.3),e.add(C);const T=Iv(s),A=Dv(s),P=new Ue({map:T,emissiveMap:T,emissive:new De("#ffda99"),emissiveIntensity:.85,roughness:.24});for(const F of[-1,1]){const W=new L(new nn(8.5,2.75),P);W.rotation.y=F*Math.PI*.5,W.position.set(F*1.33,2.44,3.3),e.add(W)}const w=new Ue({map:A,emissiveMap:A,emissive:new De("#ffda99"),emissiveIntensity:.78,roughness:.24}),M=new L(new nn(2.35,2.55),w);M.position.set(0,2.55,7.87),e.add(M);const I=new Xe(.085,6,6),H=[],U=(F,W,j)=>{const ce=new qe({color:"#ffdf88",toneMapped:!1});H.push(ce);const Be=new L(I,ce);Be.position.set(F,W,j),e.add(Be)};for(let F=0;F<=16;F++){const W=-1.1+F/16*8.8;for(const j of[-1.34,1.34])U(j,3.96,W),U(j,.88,W)}for(let F=0;F<6;F++){const W=-1.2+F/5*2.4;U(W,3.96,7.86),U(W,.88,7.86)}const O=new qe({color:"#c41022",toneMapped:!1});for(const F of[-.98,.98]){const W=new L(new Ne(.48,.22,.08),O);W.position.set(F,1.04,7.88),e.add(W)}const Y=[],V=new Ue({color:"#10141e",roughness:.82}),J=new Ue({color:"#1b202d",metalness:.55,roughness:.35}),G=[-4.6,-2.55,-1.62,5.55,6.65];for(const F of G)for(const W of[-1,1]){const j=new Ve;j.position.set(W*1.18,.56,F);const ce=new L(new ot(.56,.56,.36,18),V);ce.rotation.z=Math.PI*.5;const Be=new L(new ot(.38,.38,.38,14),J);Be.rotation.z=Math.PI*.5;const Z=new L(new ot(.14,.14,.4,10),o);Z.rotation.z=Math.PI*.5;const oe=new L(new Ne(.41,.06,.58),o);j.add(ce,Be,Z,oe),e.add(j),Y.push(j)}return fr("semi",14,F=>{e.clear(),e.add(F)}),{group:e,update(F,W,j,ce,Be,Z=0){for(const oe of Y)oe.rotation.x=-W;H.forEach((oe,Pe)=>{const Oe=.68+.32*Math.sin(Be*5.2+Pe*.45)+ce*1.4+Z*1.1;oe.color.setRGB(1.28*Oe,.98*Oe,.45*Oe)}),P.emissiveIntensity=.85+ce*.9+Z*.8,w.emissiveIntensity=.78+ce*.85+Z*.8,y.uniforms.uOpacity.value=.24+ce*.14+Z*.46,g.color.setRGB(1+Z*.7,.97+Z*.6,.91+Z*.5),O.color.setRGB(j?2.3:.9,j?.22:.1,j?.26:.16)}}}function Vu(s=!0,e=!1){const t=new Ve,n=new ut({color:"#bfcbe0",metalness:.92,roughness:.22,clearcoat:.5,flatShading:!0}),i=new Ue({color:"#141720",roughness:.8}),r=new ut({color:"#080e1a",metalness:.2,roughness:.04,clearcoat:1}),o=1.01,a=.72,l=[[new E(-.92,.46,-2.8),new E(-.98,1.04,-2.84),new E(-.96,1.05,-2.84),new E(.96,1.05,-2.84),new E(.98,1.04,-2.84),new E(.92,.46,-2.8)],[new E(-o*.95,.44,-1.78),new E(-o,1.36,-1.78),new E(-o,1.36,-1.78),new E(o,1.36,-1.78),new E(o,1.36,-1.78),new E(o*.95,.44,-1.78)],[new E(-o*.95,.44,-.32),new E(-o,1.36,-.32),new E(-a,1.84,-.32),new E(a,1.84,-.32),new E(o,1.36,-.32),new E(o*.95,.44,-.32)],[new E(-o*.95,.44,.55),new E(-o,1.36,.55),new E(-a*1.08,1.68,.55),new E(a*1.08,1.68,.55),new E(o,1.36,.55),new E(o*.95,.44,.55)]],c=Ml(l);t.add(new L(c,n));const h=new L(new Ne(1.88,.48,2.25),i);h.position.set(0,.68,1.68),t.add(h);for(const M of[-1,1]){const I=[[new E(M*.78,.85,.55),new E(M*a*1.08,1.68,.55),new E(M*o,1.36,.55),new E(M*o*.95,.44,.55)],[new E(M*.84,.85,2.82),new E(M*.96,1.34,2.82),new E(M*.98,1.34,2.82),new E(M*.94,.48,2.82)]];t.add(new L(Ml(I),n))}const u=new L(new Ne(1.94,.84,.14),n);u.position.set(0,.92,2.77),t.add(u);const d=new Float32Array([-.88,1.4,-1.78,.88,1.4,-1.78,.68,1.82,-.35,-.88,1.4,-1.78,.68,1.82,-.35,-.68,1.82,-.35]),f=new _t;f.setAttribute("position",new Ft(d,3)),f.computeVertexNormals();const p=new L(f,r);p.position.set(0,.02,-.02),t.add(p);const x=new L(new Ne(.045,.04,1.35),i);x.position.set(-.74,1.63,-1.08),x.rotation.x=-.29,x.rotation.y=-.14,t.add(x);for(const M of[-1,1]){const I=new Float32Array([M*.96,1.36,-1.65,M*.74,1.78,-.32,M*.84,1.56,.55,M*.96,1.36,-1.65,M*.84,1.56,.55,M*.96,1.24,.55]),H=new _t;H.setAttribute("position",new Ft(I,3)),H.computeVertexNormals();const U=new L(H,r);U.position.x=M*.02,t.add(U)}const m=new L(new Ne(1.98,.28,.28),i);m.position.set(0,.44,-2.84);const g=new L(new Ne(1.98,.28,.24),i);g.position.set(0,.46,2.86),t.add(m,g);for(const M of[-1.72,1.72])for(const I of[-1,1]){const H=new L(new Ne(.14,.22,1.05),i);H.position.set(I*1.02,1.02,M),t.add(H)}const y=new L(new Ne(1.96,.065,.08),new qe({color:"#f2fbff",toneMapped:!1}));y.position.set(0,1.04,-2.86),t.add(y);const v=new L(new St(2.2,11.5,16,1,!0),Vl("#d8f2ff",.22));v.rotation.x=Math.PI*.5,v.position.set(0,.94,-8.6),t.add(v);const _=new L(new Ne(1.96,.075,.08),new qe({color:"#ff2438",toneMapped:!1}));_.position.set(0,1.3,2.85),t.add(_);const C=[],T=new Ue({color:"#11141c",roughness:.88}),A=new Ue({color:"#1e2430",metalness:.45,roughness:.45});for(const M of[-1.72,1.72])for(const I of[-1,1]){const H=new Ve;H.position.set(I*.98,.48,M);const U=new L(new ot(.49,.49,.34,16),T);U.rotation.z=Math.PI*.5;const O=new L(new ot(.32,.32,.36,7),A);O.rotation.z=Math.PI*.5,H.add(U,O),t.add(H),C.push(H)}let P=null;if(s){const M=new L(new ot(.1,.14,.5,6),new Ue({color:"#3b2016"}));M.position.set(0,1.05,1.72),t.add(M);const I=new Ue({color:"#0e3a2f",roughness:.8}),H=Qn("#b2cae8"),U=[];for(let Y=0;Y<4;Y++){const V=.88-Y*.18,J=.85-Y*.08,G=1.45+Y*.48,F=new L(new St(V,J,9),I);F.position.set(0,G,1.72);const W=new L(new St(V*.78,J*.46,9),H);W.position.set(0,G+J*.28,1.72),t.add(F,W)}for(let Y=0;Y<10;Y++){const V=Y/10,J=Y*1.4,G=.74*(1-V*.75),F=new qe({color:Y%2===0?"#ffdf78":"#ff384c",toneMapped:!1});U.push(F);const W=new L(new Xe(.06,6,6),F);W.position.set(Math.cos(J)*G,1.35+V*1.9,1.72+Math.sin(J)*G),t.add(W)}const O=new L(new ur(.16,0),new qe({color:"#ffe588",toneMapped:!1}));O.position.set(0,3.45,1.72),t.add(O),P=Y=>{U.forEach((V,J)=>{const G=.75+.25*Math.sin(Y*5+J);J%2===0?V.color.setRGB(1.3*G,1.05*G,.45*G):V.color.setRGB(1.3*G,.22*G,.28*G)})}}let w=null;if(e){const M=new Ve,I=new Ue({color:"#ffbe2e",metalness:.45,roughness:.35}),H=new Ue({color:"#d41630",metalness:.35,roughness:.4});for(const F of[-1,1]){const W=new L(new Ne(1.45,.72,.14),I);W.position.set(F*.64,.42,-3.28-.16),W.rotation.y=F*.28,M.add(W);const j=new L(new Ne(1.46,.16,.16),H);j.position.set(F*.64,.7,-3.28-.16),j.rotation.y=F*.28,M.add(j);const ce=new L(new Ne(.1,.12,.6),i);ce.position.set(F*.45,.46,-2.98),M.add(ce)}const U=new L(new Ne(2.65,.12,.2),Qn("#d2e4fa"));U.position.set(0,.8,-3.42),M.add(U);const O=new L(new Ne(1.18,.08,.22),i);O.position.set(0,1.88,-.35),M.add(O);const Y=new qe({color:"#ffaa22",toneMapped:!1}),V=new qe({color:"#ff2442",toneMapped:!1}),J=new L(new Ne(.36,.1,.24),Y);J.position.set(-.34,1.93,-.35);const G=new L(new Ne(.36,.1,.24),V);G.position.set(.34,1.93,-.35),M.add(J,G),t.add(M),w=F=>{const W=Math.sin(F*14)>0?1.7:.22,j=Math.sin(F*14)<=0?1.7:.22;Y.color.setRGB(1*W,.68*W,.12*W),V.color.setRGB(1*j,.15*j,.24*j)}}return fr("cybertruck",5.7,M=>{t.clear(),t.add(M)}),{group:t,update(M,I){for(const H of C)H.rotation.x=-M;P==null||P(I),w==null||w(I)}}}function Fv(){const s=new Ve,e=new ut({color:"#d4dfed",metalness:.9,roughness:.2,clearcoat:.55,fog:!1}),t=new Ue({map:Eh(),bumpMap:Eh(),bumpScale:.04,roughness:.85,metalness:.15,fog:!1}),n=new Ue({color:"#1b202b",metalness:.65,roughness:.4,fog:!1}),i=.92,r=new L(new ot(i,i,7.2,22),e);r.position.y=-3.6,s.add(r);for(const v of[-1,1]){const _=new L(new Ne(.14,6.8,.16),n);_.position.set(v*(i+.02),-3.6,0),s.add(_)}for(let v=0;v<4;v++){const _=v/4*Math.PI*2+Math.PI*.25,C=new L(new Ne(.68,.14,.88),n);C.position.set(Math.cos(_)*(i+.42),-.55,Math.sin(_)*(i+.42)),C.rotation.y=-_+Math.PI*.5,s.add(C)}const o=new L(new ot(i*1.01,i*1.01,.44,22),n);o.position.y=.22,s.add(o);const a=4.2,l=new L(new ot(i,i,a,22),e);l.position.y=.44+a*.5,s.add(l);const c=new L(new ot(i*1.015,i*1.015,a,18,1,!0,-Math.PI*.5,Math.PI),t);c.position.y=.44+a*.5,s.add(c);const h=[],u=2.65;for(let v=0;v<=14;v++){const _=v/14,C=_*u,T=Math.max(.02,i*Math.cos(_*Math.PI*.48));h.push(new ne(T,C))}const d=new L(new vs(h,22),e);d.position.y=.44+a,s.add(d);const f=new L(new vs(h,16,-Math.PI*.5,Math.PI),t);f.scale.set(1.015,1,1.015),f.position.y=.44+a,s.add(f);const p=(v,_,C)=>{const T=new cr;return T.moveTo(0,0),T.lineTo(_,.18),T.lineTo(v,C),T.lineTo(0,C),T.closePath(),new hr(T,{depth:.1,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02})},x=p(.28,.72,1.35),m=p(.55,1.15,2.15);for(const v of[-1,1]){const _=new L(x,t);_.position.set(v*(i*.62),5,0),_.scale.x=v,_.rotation.y=v*-.15,s.add(_);const C=new L(m,t);C.position.set(v*(i*.88),.58,0),C.scale.x=v,s.add(C)}const g=new L(new St(.9,6.8,16),new qe({color:"#6ec4ff",transparent:!0,opacity:.95,blending:Rt,depthWrite:!1,toneMapped:!1,fog:!1}));g.rotation.x=Math.PI,g.position.y=-10.4,s.add(g);const y=new L(new St(1.75,11.8,18),new qe({color:"#ff9d3b",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1,toneMapped:!1,fog:!1}));return y.rotation.x=Math.PI,y.position.y=-12.9,s.add(y),fr("starship",14,v=>{s.clear(),s.add(v)}),s}function Ov(){const s=new Ve,e=new ut({color:"#c80c28",metalness:.5,roughness:.12,clearcoat:1,clearcoatRoughness:.08,fog:!1}),t=new Ue({color:"#11141c",roughness:.5,fog:!1}),n=new Ue({color:"#dce4f0",metalness:.85,roughness:.2,fog:!1}),i=new cr;i.moveTo(-2.05,.26),i.lineTo(-2.08,.62),i.lineTo(-1.35,.72),i.lineTo(-.55,.72),i.lineTo(.35,.64),i.lineTo(.85,.64),i.quadraticCurveTo(1.85,.56,2.08,.34),i.lineTo(1.98,.2),i.closePath();const r=new hr(i,{depth:1.72,bevelEnabled:!0,bevelThickness:.12,bevelSize:.08,bevelSegments:3});r.translate(0,0,-.86),s.add(new L(r,e));const o=new L(new Ne(.08,.52,1.54),new ut({color:"#111a2c",roughness:.05,clearcoat:1,transparent:!0,opacity:.78}));o.position.set(.38,.85,0),o.rotation.z=.76,s.add(o);const a=new qe({color:"#fff8e2",toneMapped:!1,fog:!1}),l=new qe({color:"#ff283c",toneMapped:!1,fog:!1});for(const g of[-.66,.66]){const y=new L(new Ne(.24,.07,.18),a);y.position.set(1.92,.45,g),y.rotation.z=-.25;const v=new L(new Ne(.08,.08,.34),l);v.position.set(-2.08,.56,g*.9),s.add(y,v)}for(const g of[-1.32,1.32])for(const y of[-.88,.88]){const v=new L(new ot(.36,.36,.24,14),t);v.rotation.x=Math.PI*.5,v.position.set(g,.34,y);const _=new L(new ot(.22,.22,.26,8),n);_.rotation.x=Math.PI*.5,_.position.set(g,.34,y),s.add(v,_)}const c=new ut({color:"#f2f5fa",roughness:.45,fog:!1}),h=new L(new Nt(.22,.36,6,10),c);h.position.set(-.22,.9,-.28),h.rotation.z=.16,s.add(h);const u=new L(new Zt(.22,.035,6,12),t);u.rotation.x=Math.PI*.5,u.position.set(-.22,1,-.28),s.add(u);const d=new L(new Xe(.21,14,14),c);d.position.set(-.26,1.32,-.28);const f=new L(new Xe(.185,12,12),new ut({color:"#090d16",roughness:.05,clearcoat:1,fog:!1}));f.position.set(-.18,1.32,-.28),s.add(d,f);const p=new L(new Nt(.065,.42,4,8),c);p.position.set(-.15,.95,-.66),p.rotation.z=Math.PI*.42,s.add(p);const x=new L(new St(.2,.44,10),new Ue({color:"#d91632",fog:!1}));x.position.set(-.34,1.62,-.28),x.rotation.z=.35;const m=new L(new Xe(.065,8,8),c);return m.position.set(-.46,1.82,-.28),s.add(x,m),fr("roadster",4.2,g=>{s.clear(),s.add(g)}),s}function Wu(){const s=new Ve,e=new ut({color:"#f2f5fa",roughness:.22,clearcoat:.9}),t=new Ue({color:"#141720",roughness:.6,metalness:.25}),n=new ut({color:"#070a12",roughness:.04,metalness:.15,clearcoat:1}),i=new Ue({color:"#d91632",roughness:.6}),r=new L(new Nt(.16,.28,6,10),t);r.position.y=.98;const o=new L(new Nt(.23,.22,6,12),e);o.scale.set(1.1,1,.72),o.position.y=1.3,s.add(r,o);for(const m of[-.12,.12]){const g=new L(new Nt(.075,.32,4,8),t);g.position.set(m,.64,0);const y=new L(new Nt(.08,.34,4,8),e);y.position.set(m,.25,0),s.add(g,y)}const a=new L(new Nt(.055,.44,4,8),t);a.position.set(.28,1.15,0),a.rotation.z=-.18,s.add(a);const l=new L(new Xe(.16,12,12),e);l.scale.set(.88,1.12,.96),l.position.set(0,1.66,-.02);const c=new L(new Xe(.15,14,14),n);c.scale.set(.82,1.08,.65),c.position.set(0,1.66,.08),s.add(l,c);const h=new L(new Zt(.17,.045,6,12),i);h.rotation.x=Math.PI*.5,h.position.y=1.48;const u=new L(new St(.17,.38,10),i);u.position.set(0,1.94,-.04),u.rotation.x=-.22,s.add(h,u);const d=new Ve;d.position.set(-.28,1.38,0);const f=new L(new Nt(.055,.22,4,8),t);f.position.y=.1;const p=new L(new Nt(.06,.24,4,8),e);p.position.y=.3;const x=new L(new Xe(.1,8,8),new qe({color:"#ffdf7e",toneMapped:!1}));return x.position.set(-.04,.5,.06),d.add(f,p,x),s.add(d),fr("optimus",1.8,m=>{s.clear(),s.add(m)}),{group:s,update(m){d.rotation.z=.35+Math.sin(m*5.2)*.42,s.rotation.y=Math.sin(m*1.4)*.16}}}let ya=null;function Bv(){if(ya)return ya;const s=document.createElement("canvas");s.width=512,s.height=96;const e=s.getContext("2d"),t=e.createLinearGradient(0,0,512,96);t.addColorStop(0,"#8f0a20"),t.addColorStop(.5,"#c8122f"),t.addColorStop(1,"#780819"),e.fillStyle=t,e.beginPath(),e.roundRect(4,4,504,88,16),e.fill(),e.strokeStyle="#ffe08a",e.lineWidth=4,e.stroke(),e.fillStyle="#fff9ea",e.font='700 28px "Cinzel", Georgia, serif',e.textAlign="center",e.textBaseline="middle",e.fillText("⚡ NORDPOLEN SUPERCHARGER",256,36),e.fillStyle="#ffe08a",e.font="600 18px Inter, sans-serif",e.fillText("GLÖGG · PEPPARKAKOR · 250 kW JULKRAFT",256,68);const n=new zt(s);return n.colorSpace=dt,ya=n,n}function kv(){const s=new Ve,e=new ut({color:"#f0f4fa",roughness:.2,clearcoat:.9}),t=new Ue({color:"#141720",roughness:.7}),n=new Ue({map:Ah(),emissiveMap:Ah(),emissive:new De("#ff384c"),emissiveIntensity:1.2}),i=Qn("#b8cee8"),r=new Ue({color:"#d91632",roughness:.4}),o=new Ue({color:"#f8f9fc",roughness:.35}),a=new L(new Ne(10.6,.2,4.4),i);a.position.set(.4,.1,0),s.add(a);for(const C of[-3.6,1.8])for(let T=0;T<6;T++){const A=new L(new ot(.14,.14,.56,10),T%2===0?r:o);A.position.set(C,.45+T*.54,1.35),s.add(A)}const l=new L(new nn(5.6,1.08),new qe({map:Bv(),toneMapped:!1,side:an}));l.position.set(-.9,3.85,1.35),s.add(l);for(let C=0;C<3;C++){const T=(C-1.55)*2,A=new L(new Ne(.84,2.45,.34),e);A.position.set(T,1.34,-.35),s.add(A);const P=new L(new Ne(.28,2.15,.36),t);P.position.set(T+.2,1.32,-.35),s.add(P);const w=new L(new nn(.68,.18),n);w.position.set(T,2.36,-.17),s.add(w);const M=new os([new E(T+.22,2.17,-.21),new E(T+.44,1.37,-.09),new E(T+.32,.97,-.19)]);s.add(new L(new Di(M,12,.032,6,!1),t));const I=new L(new Xe(.46,10,8),i);I.scale.set(1.05,.32,.65),I.position.set(T,2.6,-.35),s.add(I);const H=new L(new Xe(.09,8,8),r);H.position.set(T,2.54,-.15),s.add(H)}const c=new Ue({color:"#7a1924",roughness:.78}),h=new qe({color:"#ffcf70",toneMapped:!1}),u=new L(new Ne(2.1,1.9,1.9),c);u.position.set(3.8,1.15,-.2);const d=new L(new Ne(1.3,.62,.12),h);d.position.set(3.8,1.3,.76);const f=new L(new St(1.75,1.05,4),i);f.rotation.y=Math.PI*.25,f.position.set(3.8,2.58,-.2);const p=new L(new Ne(.28,.75,.28),t);p.position.set(4.25,2.85,-.5),s.add(u,d,f,p);const x=new qe({color:"#f2f7ff",transparent:!0,opacity:.4}),m=[];for(let C=0;C<3;C++){const T=new L(new Xe(.14,7,7),x.clone());T.position.set(4.25,3.3+C*.35,-.5),s.add(T),m.push(T)}const g=new Ue({color:"#0f3c2d",roughness:.85});for(let C=0;C<3;C++){const T=new L(new St(.72-C*.18,.9,8),g);T.position.set(-4.3,.9+C*.52,-.1),s.add(T)}const y=new L(new ur(.16,0),new qe({color:"#ffe688",toneMapped:!1}));y.position.set(-4.3,2.52,-.1),s.add(y);const v=new $t(new Xt({map:Jn(),color:"#ff6678",transparent:!0,opacity:.34,blending:Rt,depthWrite:!1}));v.scale.set(9.5,5.2,1),v.position.set(.2,1.8,.4),s.add(v);const _=Wu();return _.group.position.set(1.9,.2,.65),s.add(_.group),{group:s,update(C){_.update(C),y.rotation.y=C*1.4,m.forEach((T,A)=>{const P=(C*.42+A*.33)%1;T.position.set(4.25+Math.sin(C*2+A)*.08,3.25+P*1.1,-.5),T.scale.setScalar(.8+P*1.3),T.material.opacity=(1-P)*.42})}}}class Ey{constructor(){k(this,"group",new Ve);k(this,"starmanGroup");k(this,"starlinkGroup");k(this,"starshipGroup");k(this,"starshipStar");k(this,"superchargerPlaza");k(this,"cybertruck");k(this,"tempPos",new E);k(this,"wheelPhase",0);k(this,"lastEventType",null);k(this,"superchargerZ",-126);k(this,"cyberplowZ",-135);this.starmanGroup=Ov(),this.starmanGroup.visible=!1,this.group.add(this.starmanGroup),this.starlinkGroup=new Ve;for(let e=0;e<18;e++){const t=new $t(new Xt({map:Jn(),color:e%3===0?"#ffe082":"#d2f0ff",blending:Rt,depthWrite:!1,fog:!1}));t.scale.set(2.4,2.4,1),t.position.set(-e*3.8,Math.sin(e*.4)*1.1,0),this.starlinkGroup.add(t)}this.starlinkGroup.visible=!1,this.group.add(this.starlinkGroup),this.starshipGroup=Fv(),this.starshipStar=new $t(new Xt({map:ku(),color:"#ffe696",transparent:!0,opacity:0,blending:Rt,depthWrite:!1,fog:!1})),this.starshipStar.position.y=8.2,this.starshipStar.scale.set(26,26,1),this.starshipGroup.add(this.starshipStar),this.starshipGroup.visible=!1,this.group.add(this.starshipGroup),this.superchargerPlaza=kv(),this.superchargerPlaza.group.visible=!1,this.group.add(this.superchargerPlaza.group),this.cybertruck=Vu(!0,!0),this.cybertruck.group.visible=!1,this.group.add(this.cybertruck.group)}update(e,t,n,i){const r=(e==null?void 0:e.type)??null,o=(e==null?void 0:e.progress)??0;if(r!==this.lastEventType&&(r==="supercharger"&&(this.superchargerZ=i.superchargerStartZ??-126),r==="cyberplow"&&(this.cyberplowZ=-135),this.lastEventType=r),this.starmanGroup.visible=r==="starman",this.starmanGroup.visible&&(this.starmanGroup.position.set(i.moonPos.x-36+o*72,i.moonPos.y+Math.sin(o*Math.PI)*7,i.moonPos.z+18),this.starmanGroup.rotation.z=.12,this.starmanGroup.scale.setScalar(1.85)),this.starlinkGroup.visible=r==="starlink",this.starlinkGroup.visible&&(this.starlinkGroup.position.set(-75+o*165,38,i.starlinkZ??-118),this.starlinkGroup.rotation.z=.08),this.starshipGroup.visible=r==="starship",this.starshipGroup.visible){const a=Math.pow(Math.min(1,o/.78),.76);if(this.starshipGroup.scale.setScalar(i.starshipScale??1.45),this.starshipGroup.position.set(i.starshipOrigin.x,i.starshipOrigin.y+a*48,i.starshipOrigin.z),this.starshipGroup.rotation.y=o*.4,o>.65){const l=(o-.65)/.35;this.starshipStar.material.opacity=Math.sin(l*Math.PI)*.95;const c=18+l*26;this.starshipStar.scale.set(c,c,1)}else this.starshipStar.material.opacity=0}if(this.superchargerPlaza.group.visible=r==="supercharger"&&i.mappedSupercharger!==null,this.superchargerPlaza.group.visible){if(i.mappedSupercharger)this.superchargerPlaza.group.position.copy(i.mappedSupercharger),this.superchargerPlaza.group.rotation.y=0;else if(i.forwardStep!==void 0&&i.getRoadCurveX){this.superchargerZ+=i.forwardStep;const a=i.superchargerWrapZ??24;this.superchargerZ>a&&(this.superchargerZ=i.superchargerStartZ??-132);const l=i.getRoadCurveX(this.superchargerZ),c=i.getRoadCurveX(this.superchargerZ-5),h=Math.atan2(l-c,5),u=i.superchargerSideOffset??12.6;this.superchargerPlaza.group.position.set(l+u,0,this.superchargerZ),this.superchargerPlaza.group.rotation.y=h-Math.PI*.5}else i.roadPointAt(o,11.8,this.tempPos),this.superchargerPlaza.group.position.copy(this.tempPos),this.superchargerPlaza.group.rotation.y=0;this.superchargerPlaza.update(n)}if(this.cybertruck.group.visible=r==="cyberplow"&&i.showRoadVehicles!==!1,this.cybertruck.group.visible){if(this.wheelPhase+=t*16,i.forwardStep!==void 0&&i.getRoadCurveX){this.cyberplowZ+=i.forwardStep+14.5*t,this.cyberplowZ>24&&(this.cyberplowZ=-140);const a=i.getRoadCurveX(this.cyberplowZ),l=i.getRoadCurveX(this.cyberplowZ-5),c=Math.atan2(a-l,5);this.cybertruck.group.position.set(a-2.45,0,this.cyberplowZ),this.cybertruck.group.rotation.y=c+Math.PI}else i.roadPointAt(o,-2.4,this.tempPos),this.cybertruck.group.position.copy(this.tempPos),this.cybertruck.group.rotation.y=i.cybertruckYaw??0;this.cybertruck.update(this.wheelPhase,n)}}}function Ch(s,e,t,n){const r=(t-s)*Math.PI/180,o=(n-e)*Math.PI/180,a=Math.sin(r/2)**2+Math.cos(s*Math.PI/180)*Math.cos(t*Math.PI/180)*Math.sin(o/2)**2;return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}function Rh(s,e,t,n){const i=s*Math.PI/180,r=t*Math.PI/180,o=(n-e)*Math.PI/180,a=Math.sin(o)*Math.cos(r),l=Math.cos(i)*Math.sin(r)-Math.sin(i)*Math.cos(r)*Math.cos(o);return(Math.atan2(a,l)*180/Math.PI+360)%360}function zv(s){if(!s)return{label:"T-12h 40m",isToday:!1};const e=Date.parse(s);if(!Number.isFinite(e))return{label:"T-12h 40m",isToday:!1};const t=Math.round((e-Date.now())/1e3),i=Math.abs(t)/3600<=18;if(t<=0){const l=Math.round(Math.abs(t)/60);return{label:l<90?`T+${l}m LIVE!`:"LIFTOFF!",isToday:i}}const r=Math.floor(t/86400),o=Math.floor(t%86400/3600),a=Math.floor(t%3600/60);return r>0?{label:`T-${r}d ${o}h`,isToday:!1}:{label:`T-${o}h ${String(a).padStart(2,"0")}m`,isToday:i}}const Gv=[{callsign:"SK142",altitudeM:9400,headingDeg:12,groundspeedKts:445,bearingDeg:325,distanceKm:18,isLive:!1},{callsign:"DY4012",altitudeM:8100,headingDeg:295,groundspeedKts:410,bearingDeg:42,distanceKm:26,isLive:!1}];class Ay{constructor(){k(this,"lastLat",59.3322);k(this,"lastLon",18.0815);k(this,"lastKpFetchMs",0);k(this,"lastIssFetchMs",0);k(this,"lastSpaceXFetchMs",0);k(this,"lastFlightsFetchMs",0);k(this,"kpIndex",3.3);k(this,"kpLive",!1);k(this,"issLat",51.5);k(this,"issLon",10.2);k(this,"issVelocityKmh",27600);k(this,"issLive",!1);k(this,"nextSpaceXName","Falcon 9 · Starlink Holiday");k(this,"nextSpaceXNetIso",null);k(this,"spaceXLive",!1);k(this,"aircraft",[]);k(this,"gpsFlights",!1);k(this,"flightRequest",0);k(this,"flightsLive",!1)}async fetchJson(e,t=8e3){const n=new AbortController,i=window.setTimeout(()=>n.abort(),t);try{const r=await fetch(e,{signal:n.signal});return r.ok?await r.json():null}catch{return null}finally{window.clearTimeout(i)}}refreshKp(e){this.lastKpFetchMs!==0&&e-this.lastKpFetchMs<900*1e3||(this.lastKpFetchMs=e,this.fetchJson("https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json",7e3).then(t=>{if(!Array.isArray(t)||t.length===0)return;const n=t[t.length-1];let i=NaN;if(n&&typeof n=="object"&&!Array.isArray(n)){const r=n.Kp;i=Number(r)}else Array.isArray(n)&&n.length>=2&&(i=Number(n[1]));Number.isFinite(i)&&i>=0&&i<=9.5&&(this.kpIndex=Math.round(i*10)/10,this.kpLive=!0)}))}refreshIss(e){this.lastIssFetchMs!==0&&e-this.lastIssFetchMs<45*1e3||(this.lastIssFetchMs=e,this.fetchJson("https://api.wheretheiss.at/v1/satellites/25544",6500).then(t=>{t&&typeof t.latitude=="number"&&typeof t.longitude=="number"&&Number.isFinite(t.latitude)&&Number.isFinite(t.longitude)&&(this.issLat=t.latitude,this.issLon=t.longitude,typeof t.velocity=="number"&&Number.isFinite(t.velocity)&&(this.issVelocityKmh=Math.round(t.velocity)),this.issLive=!0)}))}refreshSpaceX(e){this.lastSpaceXFetchMs!==0&&e-this.lastSpaceXFetchMs<1800*1e3||(this.lastSpaceXFetchMs=e,this.fetchJson("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?search=SpaceX&limit=1",8e3).then(t=>{var i;const n=(i=t==null?void 0:t.results)==null?void 0:i[0];n&&(typeof n.name=="string"&&n.name.trim()&&(this.nextSpaceXName=n.name.trim().slice(0,38)),typeof n.net=="string"&&(this.nextSpaceXNetIso=n.net),this.spaceXLive=!0)}))}refreshFlights(e){if(e-this.lastFlightsFetchMs<2e4)return;this.lastFlightsFetchMs=e;const t=++this.flightRequest,n=`https://api.adsb.lol/v2/lat/${this.lastLat.toFixed(3)}/lon/${this.lastLon.toFixed(3)}/dist/60`;this.fetchJson(n).then(i=>{t===this.flightRequest&&(this.flightsLive=Array.isArray(i==null?void 0:i.ac),this.aircraft=(i==null?void 0:i.ac)??[])})}update(e,t,n,i){this.gpsFlights!==n&&(this.flightRequest++,this.lastFlightsFetchMs=0,this.aircraft=[],this.flightsLive=!1),this.gpsFlights=n,this.lastLat=e,this.lastLon=t;const r=Date.now();this.refreshKp(r),this.refreshIss(r),this.refreshSpaceX(r),n&&i&&this.refreshFlights(r)}getState(){var u;const e=this.lastLat,t=this.lastLon,n=Math.round(Ch(e,t,this.issLat,this.issLon)),i=Math.round(Rh(e,t,this.issLat,this.issLon)),r=n<=2600||!this.issLive,o=zv(this.nextSpaceXNetIso),a=[];for(const d of this.aircraft){if(!Number.isFinite(d.lat)||!Number.isFinite(d.lon)||typeof d.alt_baro!="number"||!d.hex||(d.seen_pos??0)>60)continue;const f=Ch(e,t,d.lat,d.lon);f>111.2||a.push({callsign:((u=d.flight)==null?void 0:u.trim())||d.r||d.hex,hex:d.hex,aircraft:d.t,registration:d.r,altitudeM:Math.round(d.alt_baro*.3048),groundspeedKts:d.gs??0,headingDeg:d.track??0,bearingDeg:Rh(e,t,d.lat,d.lon),distanceKm:f,isLive:!0})}const l=this.gpsFlights?a.sort((d,f)=>d.distanceKm-f.distanceKm):Gv,c=this.kpIndex>=4,h=Math.max(.75,Math.min(2.15,.72+this.kpIndex*.2));return{kpIndex:this.kpIndex,auroraLiveBoost:h,isAuroraAlert:c,kpLive:this.kpLive,issLat:this.issLat,issLon:this.issLon,issDistanceKm:n,issBearingDeg:i,issVelocityKmh:this.issVelocityKmh,issNearby:r,issLive:this.issLive,nextSpaceXName:this.nextSpaceXName,nextSpaceXNetIso:this.nextSpaceXNetIso,nextSpaceXCountdown:o.label,nextSpaceXLaunchToday:o.isToday,spaceXLive:this.spaceXLive,flights:l,flightsLive:this.flightsLive&&a.length>0}}}const Hv=59.3293,Vv=18.0686;function Ys(s,e,t){return Math.max(e,Math.min(t,s))}function zn(s,e,t){return s+(e-s)*t}function jr(s,e,t){const n=Ys((t-s)/(e-s),0,1);return n*n*(3-2*n)}function Wv(s,e){return(s-e+540)%360-180}function Xv(s){return Math.max(0,(90-s)*111.32)}class Cy{constructor(e="demo"){k(this,"source","demo");k(this,"gpsStatus","off");k(this,"watchId",null);k(this,"rawSpeedKmh",0);k(this,"smoothedSpeedKmh",0);k(this,"prevSmoothedSpeedMs",0);k(this,"smoothedAccel",0);k(this,"rawTurnRate",0);k(this,"smoothedTurnRate",0);k(this,"headingDeg",18);k(this,"prevGpsHeadingDeg",null);k(this,"prevGpsTimeMs",null);k(this,"lastGpsFixMs",0);k(this,"wasMovingBeforeGpsLoss",!1);k(this,"gpsUnavailableError",!1);k(this,"latitude",Hv);k(this,"longitude",Vv);k(this,"accuracyMeters",null);k(this,"manualSpeedKmh",58);k(this,"manualTurnRate",0);k(this,"demoElapsed",0);k(this,"totalElapsed",0);k(this,"tripKm",0);k(this,"forceTunnel",!1);k(this,"tunnelBlend",0);this.setSource(e)}getSource(){return this.source}setSource(e){this.source===e&&(e!=="gps"||this.watchId!==null)||(this.source=e,e==="gps"?this.startGpsWatch():(this.stopGpsWatch(),this.gpsUnavailableError=!1))}setManualSpeed(e){this.manualSpeedKmh=Ys(e,0,160)}getManualSpeed(){return this.manualSpeedKmh}setManualTurn(e){this.manualTurnRate=Ys(e,-1,1)}getManualTurn(){return this.manualTurnRate}setForceTunnel(e){this.forceTunnel=e}getForceTunnel(){return this.forceTunnel}startGpsWatch(){if(typeof navigator>"u"||!("geolocation"in navigator)){this.gpsStatus="error";return}this.watchId===null&&(this.gpsStatus="searching",this.lastGpsFixMs=performance.now(),this.gpsUnavailableError=!1,this.watchId=navigator.geolocation.watchPosition(e=>this.handleGpsPosition(e),e=>this.handleGpsError(e),{enableHighAccuracy:!0,maximumAge:1e3,timeout:8e3}))}stopGpsWatch(){this.watchId!==null&&typeof navigator<"u"&&"geolocation"in navigator&&navigator.geolocation.clearWatch(this.watchId),this.watchId=null,this.gpsStatus="off"}handleGpsPosition(e){const t=performance.now(),{latitude:n,longitude:i,speed:r,accuracy:o}=e.coords;let a=e.coords.heading;const l=(i-this.longitude)*111320*Math.cos(n*Math.PI/180),c=(n-this.latitude)*110540,h=Math.hypot(l,c),u=(t-this.lastGpsFixMs)/1e3,d=this.gpsStatus==="active"&&u>.2&&u<20&&h>Math.max(3,o*.6)&&h/u<80;!Number.isFinite(a)&&d&&(a=Math.atan2(l,c)*180/Math.PI),this.latitude=n,this.longitude=i,this.accuracyMeters=Number.isFinite(o)?o:null,this.gpsStatus="active",this.gpsUnavailableError=!1;const f=r!==null&&Number.isFinite(r)&&r>=0?r*3.6:d?h/u*3.6:0;if(this.rawSpeedKmh=f,f>15?this.wasMovingBeforeGpsLoss=!0:f<3&&(this.wasMovingBeforeGpsLoss=!1),a!==null&&Number.isFinite(a)&&f>3){if(this.prevGpsHeadingDeg!==null&&this.prevGpsTimeMs!==null){const p=Math.max(.2,(t-this.prevGpsTimeMs)/1e3),m=Wv(a,this.prevGpsHeadingDeg)/p;this.rawTurnRate=Ys(m/18,-1,1)}this.prevGpsHeadingDeg=a,this.prevGpsTimeMs=t,this.headingDeg=(a%360+360)%360}else this.rawTurnRate=0;this.lastGpsFixMs=t}handleGpsError(e){e.code===e.PERMISSION_DENIED?(this.gpsStatus="error",this.gpsUnavailableError=!1):(this.gpsStatus=this.wasMovingBeforeGpsLoss?"searching":"error",this.wasMovingBeforeGpsLoss&&(this.gpsUnavailableError=!0))}sampleDemoDrive(e){const t=e%90;let n=0,i=0;if(t<6)n=0,i=0;else if(t<24){const r=jr(6,16,t);n=zn(0,46,r)+Math.sin(t*.9)*2.5,i=Math.sin((t-6)*.55)*.52}else if(t<46){const r=jr(24,34,t);n=zn(46,75,r)+Math.sin(t*.6)*3,i=Math.sin((t-18)*.36)*.44}else if(t<70){const r=jr(46,54,t);n=zn(75,112,r)+Math.sin(t*.45)*3.5,i=Math.sin((t-40)*.25)*.28}else if(t<84){const r=jr(70,82,t);n=zn(112,0,r),i=(1-r)*Math.sin(t*.5)*.3}else n=0,i=0;return{speedKmh:Math.max(0,n),turnRate:i}}update(e){const t=Math.min(Math.max(e,.001),.05);if(this.totalElapsed+=t,this.source==="demo"){this.demoElapsed+=t;const p=this.sampleDemoDrive(this.demoElapsed);this.rawSpeedKmh=p.speedKmh,this.rawTurnRate=p.turnRate,this.headingDeg=((this.headingDeg+p.turnRate*14*t)%360+360)%360}else this.source==="manual"?(this.rawSpeedKmh=this.manualSpeedKmh,this.rawTurnRate=this.manualTurnRate,this.headingDeg=((this.headingDeg+this.manualTurnRate*22*t)%360+360)%360):this.source==="gps"&&performance.now()-this.lastGpsFixMs>2200&&(this.rawTurnRate=zn(this.rawTurnRate,0,t*1.5));const n=1-Math.exp(-t*4.5),i=1-Math.exp(-t*5);this.smoothedSpeedKmh=zn(this.smoothedSpeedKmh,this.rawSpeedKmh,n),this.smoothedTurnRate=zn(this.smoothedTurnRate,this.rawTurnRate,i);const r=this.smoothedSpeedKmh/3.6,o=(r-this.prevSmoothedSpeedMs)/t;this.prevSmoothedSpeedMs=r;const a=1-Math.exp(-t*5.5);this.smoothedAccel=zn(this.smoothedAccel,Ys(o,-8,8),a),this.tripKm+=this.smoothedSpeedKmh/3600*t;let l=!1;this.source==="gps"&&this.wasMovingBeforeGpsLoss&&(performance.now()-this.lastGpsFixMs>4500||this.gpsUnavailableError)&&(l=!0);const c=this.forceTunnel||l?1:0,h=1-Math.exp(-t*2.4);this.tunnelBlend=zn(this.tunnelBlend,c,h),this.tunnelBlend<.002&&c===0&&(this.tunnelBlend=0);const u=Xv(this.latitude),d=((0-this.headingDeg)%360+360)%360,f=this.computeReindeerGear(this.smoothedSpeedKmh);return{source:this.source,gpsStatus:this.gpsStatus,speedKmh:this.smoothedSpeedKmh,rawSpeedKmh:this.rawSpeedKmh,acceleration:this.smoothedAccel,turnRate:this.smoothedTurnRate,headingDeg:this.headingDeg,latitude:this.latitude,longitude:this.longitude,accuracyMeters:this.accuracyMeters,northPoleDistanceKm:u,northPoleRelativeBearingDeg:d,isMoving:this.smoothedSpeedKmh>1.8,isAccelerating:this.smoothedAccel>.65,isBraking:this.smoothedAccel<-.75,isPlaidSpeed:this.smoothedSpeedKmh>=85,tripKm:this.tripKm,tunnelBlend:this.tunnelBlend,inTunnel:this.tunnelBlend>.35,forceTunnel:this.forceTunnel,reindeerGearKey:f,elapsedSec:this.totalElapsed}}computeReindeerGear(e){return e<2?"park":e<22?"trot":e<45?"dash":e<68?"prance":e<88?"comet":e<110?"blitzen":"plaid"}dispose(){this.stopGpsWatch()}}class Vs{constructor(e=0,t=120,n=14){k(this,"value");k(this,"velocity",0);k(this,"stiffness");k(this,"damping");this.value=e,this.stiffness=t,this.damping=n}impulse(e){this.velocity+=e}update(e,t){const n=Math.min(e,.033),i=(t-this.value)*this.stiffness,r=-this.velocity*this.damping;return this.velocity+=(i+r)*n,this.value+=this.velocity*n,this.value}}class Ph{constructor(e,t,n){k(this,"points");k(this,"prevPoints");k(this,"segLen");this.segLen=t,this.points=[],this.prevPoints=[];for(let i=0;i<e;i++){const r=n.clone().add(new E(0,-i*t*.4,i*t*.9));this.points.push(r),this.prevPoints.push(r.clone())}}update(e,t,n,i=-3.8){const r=Math.min(e,.033),o=.91;this.points[0].copy(t),this.prevPoints[0].copy(t);for(let a=1;a<this.points.length;a++){const l=this.points[a],c=this.prevPoints[a],h=(l.x-c.x)*o,u=(l.y-c.y)*o,d=(l.z-c.z)*o;c.copy(l);const f=Math.sin(performance.now()*.011+a*1.4)*(.25+n.length()*.08);l.x+=h+(n.x+f*.45)*r*r*14,l.y+=u+(n.y+i+f*.3)*r*r*12,l.z+=d+n.z*r*r*14}for(let a=0;a<3;a++){this.points[0].copy(t);for(let l=1;l<this.points.length;l++){const c=this.points[l-1],h=this.points[l],u=h.x-c.x,d=h.y-c.y,f=h.z-c.z,p=Math.hypot(u,d,f)||1e-4,x=(p-this.segLen)/p;l===1?(h.x-=u*x,h.y-=d*x,h.z-=f*x):(c.x+=u*x*.28,c.y+=d*x*.28,c.z+=f*x*.28,h.x-=u*x*.72,h.y-=d*x*.72,h.z-=f*x*.72)}}}}function Zr(s,e){const t=s.attributes.position,n=t.count,i=Object.keys(e),r=[],o=new E;for(const a of i){const l=e[a],c=new Float32Array(n*3);for(let u=0;u<n;u++){const d=t.getX(u),f=t.getY(u),p=t.getZ(u);o.set(d,f,p),l(d,f,p,o),c[u*3]=o.x,c[u*3+1]=o.y,c[u*3+2]=o.z}const h=new Ze(c,3);h.name=a,r.push(h)}return s.morphAttributes.position=r,i}function qv(s,e){const t=Math.max(0,Math.min(1,e)),n=.1+t*.76,i=s,r=s+.42,o=s+2.35,a=s+2.75,l=(_,C)=>{const T=Math.sin(_)*C,A=Math.max(0,Math.sin(_+.9));return{upper:T,shin:A*(.25+t*1.15)}},c=l(o,n),h=l(a,n),u=l(i,n),d=l(r,n),f=Math.sin(s),p=Math.cos(s),x=f*(.03+t*.28),m=p*(.02+t*.19),g=-p*(.03+t*.14),y=Math.max(0,-f)*(.15+t*.85),v=Math.max(0,f)*(.12+t*.88);return{flUpper:c.upper,flShin:c.shin,frUpper:h.upper,frShin:h.shin,blUpper:u.upper,blShin:u.shin,brUpper:d.upper,brShin:d.shin,bodyY:x,bodyPitch:m,headPitch:g,spineArch:y,spineExtend:v}}let Ma=null,Sa=null;function Kv(){return Ma||(Ma=U_("#7a1826")),Ma}function Lh(){return Sa||(Sa=F_()),Sa}const $r=new E,Yv=new E(0,0,1);function Jr(s,e,t){s.position.addVectors(e,t).multiplyScalar(.5),$r.subVectors(t,e);const n=$r.length();s.scale.set(1,1,Math.max(.01,n)),n>1e-4&&($r.multiplyScalar(1/n),s.quaternion.setFromUnitVectors(Yv,$r))}function Ry(){const s=new Ve,e=new ut({color:"#c80e2b",metalness:.35,roughness:.16,clearcoat:1,clearcoatRoughness:.1}),t=e.clone(),n=new ut({color:"#8f0a20",roughness:.85,sheen:.85,sheenColor:new De("#ff5e73"),sheenRoughness:.45}),i=new Ue({color:"#ffd166",metalness:.88,roughness:.2}),r=i.clone(),o=new ut({color:"#f8f5ef",roughness:.85,sheen:.65,sheenColor:new De("#ffffff")}),a=new Ve;s.add(a);const l=new cr;l.moveTo(-1.35,.35),l.bezierCurveTo(-1.45,.95,-1.25,1.48,-.78,1.48),l.bezierCurveTo(-.45,1.48,-.25,.95,.05,.92),l.bezierCurveTo(.45,.88,.78,1.12,1.18,1.24),l.bezierCurveTo(1.42,1.3,1.48,.95,1.24,.62),l.bezierCurveTo(.95,.32,.35,.3,-1.35,.35);const c=new hr(l,{depth:.12,bevelEnabled:!0,bevelThickness:.04,bevelSize:.04,bevelSegments:3,curveSegments:18});c.rotateY(Math.PI*.5);for(const ie of[-.88,.76]){const we=new L(c,t);we.position.set(ie,.15,.65),a.add(we)}const h=new L(new Ne(1.62,.18,2.35),t);h.position.set(0,.56,.62),a.add(h);const u=new L(new Ne(1.62,.82,.24),t);u.position.set(0,1.08,1.72),u.rotation.x=-.24,a.add(u);const d=new L(new Nt(.32,.92,8,12),n);d.rotation.z=Math.PI*.5,d.position.set(0,.85,.88),a.add(d);const f=new L(new ot(.84,.84,.55,16,1,!1,0,Math.PI),t);f.rotation.z=Math.PI*.5,f.rotation.x=-.35,f.position.set(0,1.05,-.38),a.add(f);for(const ie of[-.82,.82]){const we=new os([new E(ie,.16,2.02),new E(ie,.12,.95),new E(ie,.12,-.45),new E(ie,.42,-1.05),new E(ie,.85,-1.16),new E(ie,.98,-.92)]);a.add(new L(new Di(we,28,.055,8,!1),r));for(const je of[1.4,.35,-.45]){const ct=new L(new ot(.035,.045,.46,8),r);ct.position.set(ie,.34,je),a.add(ct)}const rt=new os([new E(ie*1.06,1.62,1.45),new E(ie*1.06,1.08,.65),new E(ie*1.06,1.4,-.48)]);a.add(new L(new Di(rt,20,.032,6,!1),r))}const p=new L(new Zt(.24,.03,6,12,Math.PI),i);p.rotation.y=Math.PI*.5,p.position.set(0,1.38,-.78),a.add(p);const x=new Ve;x.position.set(0,1.36,-.98);const m=new L(new Xe(.14,10,10),new qe({color:"#fff3c4",toneMapped:!1}));m.position.y=-.14;const g=new L(new St(.19,.16,6),i);g.position.y=-.02;const y=new fo("#ffcc75",6,18);y.position.set(0,-.05,-.15),x.add(m,g,y),a.add(x);const v=new L(new Xe(.62,14,12),new Ue({color:"#8a5d3b",roughness:.92}));v.scale.set(1.05,.92,.85),v.position.set(0,1.26,1.35),a.add(v);const _=new Ve;_.position.set(0,1.56,1.28);const C=[{x:-.36,y:.1,z:-.03,col:"#1f8a52",rib:"#ffd166",s:.42},{x:.34,y:.16,z:.1,col:"#e62e3d",rib:"#fff6e0",s:.38},{x:.02,y:.28,z:-.08,col:"#2c68c9",rib:"#ffd166",s:.35}];for(const ie of C){const we=new Ve,rt=new L(new Ne(ie.s,ie.s,ie.s),new ut({color:ie.col,roughness:.35,clearcoat:.5})),je=new Ue({color:ie.rib,metalness:.6,roughness:.25}),ct=new L(new Ne(ie.s*1.05,ie.s*1.05,ie.s*.18),je),Lt=new L(new Ne(ie.s*.18,ie.s*1.05,ie.s*1.05),je);we.add(rt,ct,Lt),we.position.set(ie.x,ie.y,ie.z),we.rotation.set(.2,ie.x,-.15),_.add(we)}a.add(_);const T=new Ve;T.position.set(0,1.05,.52);const A=new Ve;T.add(A);const P=new Xe(.42,20,16);Zr(P,{laughJiggle:(ie,we,rt,je)=>{if(we<.1){const ct=(.1-we)*1.6;je.set(ie*(1+ct*.14),we-ct*.05,rt*(1+ct*.14)-ct*.05)}}});const w=new L(P,e);w.scale.set(1.05,1.15,.95),w.position.y=.32,w.updateMorphTargets(),A.add(w);const M=new L(new Zt(.4,.08,8,16),o);M.rotation.x=Math.PI*.5,M.position.y=.05,A.add(M);const I=new L(new ot(.43,.43,.11,16),new Ue({color:"#17171f",roughness:.4}));I.position.y=.26,A.add(I);const H=new L(new Zt(.08,.024,6,4),i);H.rotation.z=Math.PI*.25,H.position.set(0,.26,-.43),A.add(H);const U=new Ve;U.position.set(0,.88,-.02),A.add(U);const O=new Xe(.28,22,18);Zr(O,{smile:(ie,we,rt,je)=>{rt<-.1&&Math.abs(ie)>.06&&we<.03&&(je.y+=.026,je.z-=.016)},hoHoHo:(ie,we,rt,je)=>{rt<-.15&&Math.abs(ie)<.095&&we<-.02&&(je.z+=.048,je.y-=.032),rt<-.1&&Math.abs(ie)>.07&&(je.y+=.022,je.x*=1.07)},blink:(ie,we,rt,je)=>{rt<-.15&&we>.01&&we<.1&&Math.abs(ie)>.035&&(je.y-=.018)},windSquint:(ie,we,rt,je)=>{rt<-.14&&Math.abs(ie)>.05&&we>-.03&&we<.05&&(je.y+=.022,je.z-=.014)},surprise:(ie,we,rt,je)=>{rt<-.12&&we>.07&&(je.y+=.028),rt<-.14&&we<-.08&&(je.y-=.024)}});const Y=new ut({color:"#f7c8ae",roughness:.6,sheen:.3}),V=new L(O,Y);V.updateMorphTargets(),U.add(V);const J=new Ue({color:"#ef767a",roughness:.55}),G=[],F=[];for(const ie of[-.14,.14]){const we=new L(new Xe(.068,10,10),J);we.position.set(ie,-.04,-.23),U.add(we),G.push(we);const rt=new L(new Xe(.038,10,10),new ut({color:"#14141d",roughness:.08,clearcoat:1}));rt.position.set(ie*.68,.05,-.255);const je=new L(new Xe(.013,6,6),new qe({color:"#ffffff"}));je.position.set(.01,.014,-.032),rt.add(je),U.add(rt),F.push(rt)}const W=new L(new Xe(.055,10,10),J);W.position.set(0,.01,-.29),U.add(W);const j=[[0,-.16,-.21,.2],[-.12,-.11,-.17,.14],[.12,-.11,-.17,.14],[0,-.28,-.19,.15]];for(const[ie,we,rt,je]of j){const ct=new L(new Xe(je,10,10),o);ct.position.set(ie,we,rt),U.add(ct)}for(const ie of[-.08,.08]){const we=new L(new Nt(.045,.07,4,8),o);we.rotation.z=ie<0?1.2:-1.2,we.position.set(ie,-.05,-.27),U.add(we)}const ce=new L(new Zt(.26,.068,8,16),o);ce.rotation.x=Math.PI*.5,ce.position.y=.19,U.add(ce);const Be=new Ph(5,.16,new E(0,.22,0)),Z=[];for(let ie=0;ie<4;ie++){const we=.22-ie*.045,rt=.17-ie*.04,je=new L(new ot(rt,we,1,10),e);je.geometry.rotateX(Math.PI*.5),U.add(je),Z.push(je)}const oe=new L(new Xe(.085,10,10),o);U.add(oe);const Pe=new Ph(6,.22,new E(.16,.65,.06)),pe=[];for(let ie=0;ie<5;ie++){const we=new L(new ot(.055-ie*.005,.06-ie*.005,1,8),i);we.geometry.rotateX(Math.PI*.5),A.add(we),pe.push(we)}const Oe=new E(-.31,.44,-.48),Ke=new E(.31,.44,-.48),Ge=new L(new Nt(.11,.32,6,8),e);Ge.position.set(-.36,.52,-.24),Ge.rotation.x=-.95,Ge.rotation.z=.25;const lt=new L(new Xe(.1,8,8),n);lt.position.set(-.31,.44,-.48),A.add(Ge,lt);const te=new Ve;te.position.set(.36,.64,-.1);const ue=new L(new Nt(.11,.32,6,8),e);ue.position.set(0,-.12,-.14),ue.rotation.x=-.95,ue.rotation.z=-.25;const D=new L(new Xe(.1,8,8),n);D.position.set(-.05,-.2,-.38);const Fe=new Ve;Fe.position.set(-.04,-.12,-.46);const ae=new L(new ot(.08,.07,.16,10),e),Te=new L(new Zt(.08,.016,6,10),i);Te.rotation.x=Math.PI*.5,Te.position.y=.08;const me=new L(new Xe(.06,6,6),new qe({color:"#eef7ff",transparent:!0,opacity:.48}));me.position.y=.16,Fe.add(ae,Te,me),Fe.visible=!1,te.add(ue,D,Fe),A.add(te),a.add(T);const ze=new ut({color:"#8c5330",roughness:.72,sheen:.55,sheenColor:new De("#c9956b")}),Ee=new ut({color:"#d8b490",roughness:.75}),R=new Ue({color:"#e6caa2",roughness:.55}),S=new Ue({color:"#1b1614",roughness:.35}),q=new qe({color:"#eef7ff",transparent:!0,opacity:.42}),Q=new ot(.015,.015,1,5);Q.rotateX(Math.PI*.5);const re=[{x:-.78,z:-2.65,phase:.35,rudolph:!1},{x:.78,z:-2.65,phase:1.25,rudolph:!1},{x:-.75,z:-5.45,phase:2.1,rudolph:!1},{x:.75,z:-5.45,phase:0,rudolph:!0}],ee=[];let Re=null,ge=null;const Ae=[];for(const ie of re){const we=new Ve;we.position.set(ie.x,.82,ie.z);const rt=new Nt(.24,.68,10,16);Zr(rt,{archSpine:(he,fe,Ce,ve)=>{const be=Math.max(0,1-Math.abs(fe)*2.2);ve.z=Ce-be*.075},extendSpine:(he,fe,Ce,ve)=>{ve.y=fe*1.1,ve.x=he*.94,ve.z=Ce*.96},breathe:(he,fe,Ce,ve)=>{fe<.05&&(ve.x=he*1.07,ve.z=Ce*1.07)}});const je=new L(rt,ze);je.rotation.x=Math.PI*.5,je.updateMorphTargets(),we.add(je);const ct=new L(new Xe(.22,10,10),Ee);ct.position.set(0,-.02,-.34),we.add(ct);const Lt=new L(new St(.08,.24,8),o);Lt.rotation.x=.85,Lt.position.set(0,.14,.52),we.add(Lt);const ei=new L(new Zt(.25,.045,8,14),e);ei.rotation.x=.35,ei.position.set(0,.1,-.32),we.add(ei);for(const he of[-.12,0,.12]){const fe=new L(new Xe(.048,8,8),i);fe.position.set(he,-.08,-.45),we.add(fe)}const Ct=new Ve;Ct.position.set(0,.24,-.38);const en=new L(new Nt(.13,.32,6,10),ze);en.rotation.x=-.45,en.position.set(0,.14,-.08),Ct.add(en);const yi=new Xe(.18,16,14);Zr(yi,{blink:(he,fe,Ce,ve)=>{Ce<-.05&&fe>.01&&fe<.09&&(ve.y-=.016)},earPerk:(he,fe,Ce,ve)=>{fe>.06&&(ve.z=Ce-.025)},snoutFlare:(he,fe,Ce,ve)=>{Ce<-.1&&fe<0&&(ve.x=he*1.1,ve.z=Ce-.018)}});const mn=new L(yi,ze);mn.position.set(0,.36,-.2),mn.updateMorphTargets(),Ct.add(mn);const In=new L(new Nt(.11,.16,6,10),Ee);In.rotation.x=Math.PI*.5,In.position.set(0,.31,-.36),Ct.add(In);const ti=[],Mi=[];for(const he of[-1,1]){const fe=new L(new Xe(.042,8,8),new ut({color:"#121218",roughness:.05,clearcoat:1}));fe.position.set(he*.12,.41,-.31);const Ce=new L(new Xe(.015,6,6),new qe({color:"#ffffff"}));Ce.position.set(.012,.015,-.035),fe.add(Ce),Ct.add(fe),ti.push(fe);const ve=new L(new St(.06,.18,6),ze);ve.rotation.z=he*-1.1,ve.rotation.x=.25,ve.position.set(he*.19,.45,-.14),Ct.add(ve),Mi.push(ve);const be=new os([new E(he*.07,.5,-.16),new E(he*.19,.72,-.12),new E(he*.24,.92,-.02)]);Ct.add(new L(new Di(be,10,.024,6,!1),R));const Je=new os([new E(he*.17,.68,-.13),new E(he*.11,.84,-.25)]);Ct.add(new L(new Di(Je,6,.018,5,!1),R))}if(ie.rudolph){const he=new L(new Xe(.095,12,12),new qe({color:"#ff2b3d",toneMapped:!1}));he.position.set(0,.34,-.49),Ct.add(he),Re=new $t(new Xt({map:Jn(),color:"#ff364c",transparent:!0,opacity:.65,blending:Rt,depthWrite:!1})),Re.scale.set(.95,.95,1),Re.position.set(0,.34,-.54),Ct.add(Re),ge=new fo("#ff3b4c",5.5,16),ge.position.set(0,.42,-.82),Ct.add(ge)}else{const he=new L(new Xe(.055,8,8),S);he.position.set(0,.34,-.47),Ct.add(he)}const ni=new $t(new Xt({map:Jn(),color:"#ffe288",transparent:!0,opacity:0,blending:Rt,depthWrite:!1}));ni.scale.set(.85,.45,1),ni.position.set(0,-.65,.3),we.add(ni),Ae.push(ni),we.add(Ct);const ii=(he,fe)=>{const Ce=new Ve;Ce.position.set(he,-.1,fe);const ve=new L(new Nt(.058,.28,4,8),ze);ve.position.y=-.16,Ce.add(ve);const be=new Ve;be.position.set(0,-.32,0);const Je=new L(new Nt(.044,.26,4,8),ze);Je.position.y=-.14;const pt=new L(new ot(.05,.062,.07,8),S);return pt.position.y=-.3,be.add(Je,pt),Ce.add(be),we.add(Ce),{upper:Ce,shin:be}},b=ii(-.15,-.28),N=ii(.15,-.28),X=ii(-.15,.32),K=ii(.15,.32),z=[];for(let he=0;he<3;he++){const fe=new L(new Xe(.08,8,8),q.clone());fe.visible=!1,Ct.add(fe),z.push(fe)}const de=new L(Q,i),_e=new L(Q,i);s.add(de,_e),s.add(we),ee.push({group:we,slotX:ie.x,slotZ:ie.z,torsoMesh:je,craniumMesh:mn,eyes:ti,ears:Mi,fl:b.upper,flShin:b.shin,fr:N.upper,frShin:N.shin,bl:X.upper,blShin:X.shin,br:K.upper,brShin:K.shin,headGroup:Ct,phaseOffset:ie.phase,blinkTimer:1.5+Math.random()*3,blinkVal:0,breathPuffs:z,reinSegA:de,reinSegB:_e})}let et=0;const le=new Vs(0,95,7),Le=new Vs(0,95,7),He=new Vs(0,85,11),We=new Vs(0,75,10),Ie=new Vs(0,70,6);let it=2.6,Ye=0,st=0,B=0,xe=0,$=0,se="classic";const Me=new E,Se=new E(0,.22,0),$e=new E(.16,.65,.06),bt=new E,It=new E,ft=new E;return{group:s,triggerReaction(ie){ie==="hohoho"?(st=2.6,le.impulse(3.2),He.impulse(-1.4)):ie==="landmark"?(B=2.2,We.impulse(1.8)):ie==="gift"&&(xe=1.6,le.impulse(-2.2))},setStoppedMode(ie){$=ie},setTheme(ie){ie!==se&&(se=ie,ie==="cyber2099"?(t.color.set("#c4d2e6"),t.metalness=.92,t.roughness=.2,r.color.set("#3ceeff"),r.emissive.set("#0e90b8"),r.emissiveIntensity=.95):(t.color.set(ie==="nordic"?"#8c1622":"#c80e2b"),t.metalness=.35,t.roughness=.16,r.color.set("#ffd166"),r.emissive.set("#000000"),r.emissiveIntensity=0))},update(ie,we,rt,je,ct){const Lt=Math.min(1,we/110),ei=we<2?2.2:5.8+Lt*10.5;et+=ei*ie,st>0&&(st=Math.max(0,st-ie)),B>0&&(B=Math.max(0,B-ie)),xe>0&&(xe=Math.max(0,xe-ie)),it-=ie,it<=0&&(it=2.8+Math.random()*2.5,Ye=1),Ye=Math.max(0,Ye-ie*7.5),Ie.update(ie,-rt*.38),_.rotation.z=Ie.value,_.rotation.x=_i.clamp(-je*.04,-.22,.22),_.position.y=1.56+Math.abs(Math.sin(et*.5))*(.04+Lt*.07);const Ct=Math.max(0,(Lt-.55)/.45)+(xe>0?.5:0);if(Re&&ge){const b=1+Math.sin(ct*9)*.15+Ct*1.15;Re.scale.setScalar(.95*b),Re.material.opacity=Math.min(.96,.52+Ct*.38),ge.intensity=5.5+Ct*9}Ae.forEach((b,N)=>{b.material.opacity=Ct>.2?(.3+.25*Math.sin(ct*12+N))*Math.min(1,Ct):0}),le.update(ie,-je*.08+Math.sin(et)*(.04+Lt*.1)),Le.update(ie,rt*.35),x.rotation.x=le.value,x.rotation.z=Le.value,He.update(ie,-je*.045-Lt*.12+(st>0?-.14:0)),A.rotation.x=He.value;const en=$>3.2,yi=en?2.45:0;A.rotation.y+=(yi-A.rotation.y)*Math.min(1,ie*3.5),Fe.visible=en,en?(te.rotation.z=-.85+Math.sin(ct*4.2)*.28,te.rotation.x=.65,me.position.y=.14+ct*.45%.16):(te.rotation.z+=(0-te.rotation.z)*Math.min(1,ie*6),te.rotation.x+=(0-te.rotation.x)*Math.min(1,ie*6));const mn=en?Math.sin(ct*2.1)*.14:st>0?Math.sin(ct*3.5)*.28+.25:-rt*.36;We.update(ie,mn),U.rotation.y=We.value,U.rotation.x=st>0?Math.sin(ct*12)*.09:Lt*.06;const In=st>0?Math.max(0,Math.sin(ct*13)):0,ti=Math.min(1,.35+(en?.65:0)+(B>0?.65:0)+(st>0?.6:0)),Mi=Math.max(0,Lt-.55)*1.4,ni=Math.max(xe>0?.85:0,je<-1.5?.75:0);V.morphTargetInfluences&&(V.morphTargetInfluences[0]=ti,V.morphTargetInfluences[1]=In,V.morphTargetInfluences[2]=Ye,V.morphTargetInfluences[3]=Mi,V.morphTargetInfluences[4]=ni),w.morphTargetInfluences&&(w.morphTargetInfluences[0]=st>0?.45+In*.55:0);const ii=Math.max(.12,1-Ye*.88-Mi*.32);for(const b of F)b.scale.y=ii;for(const b of G)b.position.y=-.04+ti*.022;Me.set(-rt*4.5,.6+Lt*1.6,3.2+Lt*14),Be.update(ie,Se,Me,-3.2);for(let b=0;b<Z.length;b++)Jr(Z[b],Be.points[b],Be.points[b+1]);oe.position.copy(Be.points[Be.points.length-1]),Pe.update(ie,$e,Me,-2.8);for(let b=0;b<pe.length;b++)Jr(pe[b],Pe.points[b],Pe.points[b+1]);for(let b=0;b<ee.length;b++){const N=ee[b],X=qv(et+N.phaseOffset,Lt);N.group.position.y=.82+X.bodyY,N.group.rotation.x=X.bodyPitch,N.group.rotation.y=-rt*(b>=2?.22:.1),N.headGroup.rotation.x=X.headPitch,N.headGroup.rotation.z=$>1.5?Math.sin(ct*9+b*1.4)*Math.max(0,Math.sin(ct*.9+b))*.22:0,N.fl.rotation.x=X.flUpper,N.flShin.rotation.x=X.flShin,N.fr.rotation.x=X.frUpper,N.frShin.rotation.x=X.frShin,N.bl.rotation.x=X.blUpper,N.blShin.rotation.x=X.blShin,N.br.rotation.x=X.brUpper,N.brShin.rotation.x=X.brShin;const K=we<5?.5+.5*Math.sin(ct*2.1+N.phaseOffset):0;N.torsoMesh.morphTargetInfluences&&(N.torsoMesh.morphTargetInfluences[0]=X.spineArch,N.torsoMesh.morphTargetInfluences[1]=X.spineExtend,N.torsoMesh.morphTargetInfluences[2]=K),N.blinkTimer-=ie,N.blinkTimer<=0&&(N.blinkTimer=2.6+Math.random()*3.4,N.blinkVal=1),N.blinkVal=Math.max(0,N.blinkVal-ie*8);const z=B>0||st>0?1:.25,de=we<5?K*.7:0;N.craniumMesh.morphTargetInfluences&&(N.craniumMesh.morphTargetInfluences[0]=N.blinkVal,N.craniumMesh.morphTargetInfluences[1]=z,N.craniumMesh.morphTargetInfluences[2]=de);for(const ve of N.eyes)ve.scale.y=Math.max(.12,1-N.blinkVal*.88);N.ears.forEach((ve,be)=>{ve.rotation.x=.25-z*.35+Lt*.28+(be===0?.04:-.04)});const _e=we<5||$>.8,he=$>1.5?1.45:1;N.breathPuffs.forEach((ve,be)=>{if(ve.visible=_e,!_e)return;const Je=(ct*.6+N.phaseOffset+be*.33)%1;ve.position.set(Math.sin(Je*4)*.05,.32+Je*.42,-.52-Je*.48);const pt=(.65+Je*1.85)*he;ve.scale.set(pt,pt,pt),ve.material.opacity=Math.min(.65,(1-Je)*.42*he)});const fe=N.slotX<0?Oe:Ke;bt.set(fe.x,1.05+fe.y,.52+fe.z),ft.set(N.group.position.x,N.group.position.y+.14,N.slotZ-.32);const Ce=.32-Lt*.18+Math.sin(et+N.phaseOffset)*.05;It.addVectors(bt,ft).multiplyScalar(.5),It.y-=Ce,Jr(N.reinSegA,bt,It),Jr(N.reinSegB,It,ft)}},getTrailOrigin(ie){return ie.set(0,.32,2.05),s.localToWorld(ie)}}}function Py(s=0){const e=new Ve,t=new Ue({map:Kv(),roughness:.78}),n=Qn("#b2cae8"),i=new L(new Ne(3.8,2.4,3.3),t);i.position.y=1.2,e.add(i);const r=new Ue({color:"#1b1d32",roughness:.85}),o=new L(new St(3.3,2.2,4),r);o.rotation.y=Math.PI*.25,o.position.y=3.4,e.add(o);const a=new L(new St(3.48,1.9,4),n);a.rotation.y=Math.PI*.25,a.position.y=3.65,e.add(a);for(const C of[-1.85,0,1.85])for(const T of[-1.75,1.75]){const A=new L(new Xe(.32,8,8),n);A.scale.set(1.5,.7,1.1),A.position.set(C,2.42,T),e.add(A)}const l=new L(new Ne(.55,1.35,.55),new Ue({color:"#4c383d",roughness:.9}));l.position.set(1.05,3.85,.65),e.add(l);const c=[];for(let C=0;C<4;C++){const T=new L(new Xe(.24,8,8),new qe({color:"#dbe8fa",transparent:!0,opacity:.26}));e.add(T),c.push(T)}const h=new Ue({map:Lh(),emissiveMap:Lh(),emissive:new De("#ffbd59"),emissiveIntensity:1.85,roughness:.3}),u=new nn(.9,.95),d=new Ue({color:"#efe5d6",roughness:.7}),f=[[-.98,1.25,1.67,0],[.98,1.25,1.67,0],[-.98,1.25,-1.67,Math.PI],[.98,1.25,-1.67,Math.PI],[-1.92,1.25,0,-Math.PI*.5],[1.92,1.25,0,Math.PI*.5]];for(const[C,T,A,P]of f){const w=new L(new Ne(1.05,1.1,.08),d);w.position.set(C,T,A),w.rotation.y=P,e.add(w);const M=new L(u,h);M.position.set(C+Math.sin(P)*.05,T,A+Math.cos(P)*.05),M.rotation.y=P,e.add(M)}const p=new L(new Ne(.75,1.4,.1),new Ue({color:"#3b1c14",roughness:.8}));p.position.set(0,.7,1.67),e.add(p);const x=new L(new Zt(.2,.06,6,12),new Ue({color:"#14452f",roughness:.8}));x.position.set(0,1.05,1.74),e.add(x);const m=new L(new Xe(.07,6,6),new Ue({color:"#d91632"}));m.position.set(0,.88,1.78),e.add(m);const g=new qe({color:"#ffe49e",toneMapped:!1}),y=new L(new Xe(.11,8,8),g);y.position.set(.55,1.55,1.78),e.add(y);const v=new $t(new Xt({map:Jn(),color:"#ffba52",transparent:!0,opacity:.35,blending:Rt,depthWrite:!1}));v.scale.set(5.5,4,1),v.position.set(0,1.2,2),e.add(v);let _=1;return{group:e,setLit(C){_=Math.max(0,Math.min(1,C)),g.color.setRGB(.25+_*.75,.2+_*.68,.18+_*.44)},update(C,T){const A=.92+.08*Math.sin(T*5.1+s)+.04*Math.sin(T*11.3+s*2);h.emissiveIntensity=.08+_*2.1*A,v.material.opacity=_*.36*A,c.forEach((P,w)=>{const M=(T*.34+w*.25+s*.13)%1;P.position.set(1.05+Math.sin(M*4+s)*.25-M*.35,4.6+M*2.4,.65+Math.cos(M*3)*.18);const I=.7+M*2;P.scale.set(I,I,I),P.material.opacity=(1-M)*.26})}}}function Ly(s=!0,e=0){const t=new Ve,n=new L(new ot(.22,.38,1.3,8),new Ue({color:"#3b2016",roughness:.9}));n.position.y=.65,t.add(n);const i=new ut({color:"#0e3a2f",roughness:.78,sheen:.25,sheenColor:new De("#286e58")}),r=Qn("#b2cae8");for(let h=0;h<5;h++){const u=2.18-h*.36,d=2.08-h*.16,f=1.65+h*1.15,p=new L(new St(u,d,10),i);p.position.set(Math.sin(h*2.1+e)*.08,f,Math.cos(h*1.7+e)*.08),p.rotation.set((h%2===0?1:-1)*.035,h*.65+e,(h%2===0?-1:1)*.03),t.add(p);const x=new L(new St(u*.78,d*.48,10),r);if(x.position.set(p.position.x,f+d*.3,p.position.z),x.rotation.copy(p.rotation),t.add(x),h<3)for(let m=0;m<3;m++){const g=m/3*Math.PI*2+h+e,y=new L(new Xe(u*.22,6,6),r);y.scale.set(1.25,.55,1),y.position.set(Math.cos(g)*u*.72,f-d*.38,Math.sin(g)*u*.72),t.add(y)}}const o=new Xt({map:Jn(),color:"#ffcf6e",transparent:!0,opacity:s?.34:0,blending:Rt,depthWrite:!1}),a=new $t(o);a.scale.set(5.4,6.2,1),a.position.y=3.8,t.add(a);const l=[];let c=null;if(s){const h=["#ffd468","#ff3b4c","#fff4cc"];for(let d=0;d<12;d++){const f=d/12,p=d*1.45+e,x=1.45+f*5,m=1.65*(1-f*.76),g=new qe({color:h[d%h.length],toneMapped:!1});l.push(g);const y=new L(new Xe(.11,8,8),g);y.position.set(Math.cos(p)*m,x,Math.sin(p)*m),t.add(y)}c=new qe({color:"#ffe588",toneMapped:!1});const u=new L(new ur(.26,0),c);u.position.y=7.35,t.add(u)}return{group:t,setLit(h){const u=Math.max(.06,Math.min(1,h));o.opacity=s?u*.36:0,l.forEach((d,f)=>{f%3===1?d.color.setRGB(u*1.35,u*.2,u*.26):d.color.setRGB(u*1.35,u*1.08,u*.48)}),c&&c.color.setRGB(u*1.4,u*1.2,u*.55)}}}function Iy(){const s=new Ve,e=new Ue({color:"#1b2030",metalness:.75,roughness:.35}),t=[new ne(.28,0),new ne(.24,.35),new ne(.14,.9),new ne(.09,1.3),new ne(.075,4.3),new ne(.18,4.42)],n=new L(new vs(t,12),e);s.add(n);const i=new L(new Zt(.16,.045,6,12),new Ue({color:"#14452f",roughness:.8}));i.position.set(0,3.2,.1),s.add(i);const r=new L(new Xe(.065,6,6),new Ue({color:"#d91632"}));r.position.set(0,3.05,.14),s.add(r);const o=new qe({color:"#ffeaad",toneMapped:!1}),a=new L(new ot(.24,.17,.52,6),o);a.position.y=4.68,s.add(a);const l=new L(new St(.3,.25,6),e);l.position.y=5.05,s.add(l);const c=Vl("#ffdc92",.26),h=new L(new St(2.3,4.6,18,1,!0),c);h.position.y=2.35,s.add(h);const u=new qe({map:Jn(),color:"#ffcf76",transparent:!0,opacity:.45,blending:Rt,depthWrite:!1}),d=new L(new nn(4.4,4.4),u);d.rotation.x=-Math.PI*.5,d.position.y=.03,s.add(d);const f=new Xt({map:Bu(),color:"#ffe090",transparent:!0,opacity:.28,blending:Rt,depthWrite:!1}),p=new $t(f);return p.scale.set(2.9,.34,1),p.position.y=4.68,s.add(p),{group:s,setLit(x){const m=Math.max(.04,Math.min(1,x));o.color.setRGB(.2+m*1.15,.18+m*.98,.22+m*.52),c.uniforms.uOpacity.value=m*.26,u.opacity=m*.45,f.opacity=m*.3}}}function Dy(){const s=new Ve,e=Qn("#f4f9ff"),t=[.55,.4,.28],n=[.52,1.3,1.88];t.forEach((h,u)=>{const d=new L(new Xe(h,14,12),e);d.position.y=n[u],s.add(d)});const i=new L(new St(.06,.26,8),new Ue({color:"#ff7a29",roughness:.5}));i.rotation.x=Math.PI*.5,i.position.set(0,1.88,.34),s.add(i);const r=new Ue({color:"#17171f",roughness:.4});for(const h of[-.1,.1]){const u=new L(new Xe(.036,8,8),r);u.position.set(h,1.97,.25),s.add(u)}const o=new Ue({color:"#d91632",roughness:.8}),a=new L(new Zt(.29,.07,8,14),o);a.rotation.x=Math.PI*.5,a.position.y=1.62,s.add(a);const l=new L(new ot(.32,.32,.05,14),r);l.position.y=2.13;const c=new L(new ot(.22,.21,.32,14),r);return c.position.y=2.3,s.add(l,c),s}function Ny(){const s=new Ve,e=new Ue({color:"#78849a",metalness:.72,roughness:.35}),t=Qn("#b8cee8");for(const u of[-1.45,1.45]){const d=new L(new ot(.08,.1,4.1,8),e);d.position.set(u,2.05,0),s.add(d)}const n=document.createElement("canvas");n.width=512,n.height=224;const i=n.getContext("2d"),r=new zt(n);r.colorSpace=dt;const o=new L(new Ne(3.8,1.68,.14),e);o.position.set(0,3.2,0);const a=new L(new Ne(3.9,.16,.22),t);a.position.set(0,4.1,0),s.add(o,a);const l=new qe({map:r,toneMapped:!1});for(const u of[-1,1]){const d=new L(new nn(3.72,1.6),l);d.position.set(0,3.2,u*.08),u<0&&(d.rotation.y=Math.PI),s.add(d)}let c="";const h=(u,d,f)=>{const p=Math.round(u),x=`${p}|${d}|${f}`;if(x===c)return;c=x,i.fillStyle="#00529b",i.beginPath(),i.roundRect(4,4,504,216,16),i.fill(),i.strokeStyle="#ffffff",i.lineWidth=7,i.strokeRect(10,10,492,204);const m=f.match(/\b(E\d+|\d{2,3})\b/),g=m?m[1]:"N";i.fillStyle=g.startsWith("E")?"#0b8a3a":"#f2c12e",i.beginPath(),i.roundRect(418,22,68,34,6),i.fill(),i.strokeStyle="#ffffff",i.lineWidth=2.5,i.stroke(),i.fillStyle=g.startsWith("E")?"#ffffff":"#111827",i.font="800 20px Inter, sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(g,452,40),i.textAlign="left",i.fillStyle="#ffffff",i.font="800 38px Inter, sans-serif",i.fillText(`↑  Nordpolen  ${p.toLocaleString()} km`,26,56,382),i.font="800 36px Inter, sans-serif",i.fillText(`→  ${d}`,26,112,456),i.fillStyle="#ffe588",i.font="750 32px Inter, sans-serif",i.fillText(f,26,168,456),r.needsUpdate=!0};return h(3414,"Stockholm","E4"),{group:s,setDirections:h}}function Uy(){const s=new Ve,e=new Ue({color:"#4d281a",roughness:.85}),t=Qn("#b8cee8"),n=new L(new ot(.14,.18,3.6,8),e);n.position.y=1.8,s.add(n);const i=new L(new Ne(3.4,1.25,.18),e);i.position.set(0,2.75,0),s.add(i);const r=new L(new Ne(3.5,.16,.26),t);r.position.set(0,3.44,0),s.add(r);const o=new L(new Xe(.14,8,8),new qe({color:"#ffe59c",toneMapped:!1}));o.position.set(-1.5,3.62,.15),s.add(o);const a=document.createElement("canvas");a.width=512,a.height=192;const l=a.getContext("2d"),c=new zt(a);c.colorSpace=dt;const h=new Ue({map:c,emissiveMap:c,emissive:new De("#ffd990"),emissiveIntensity:.65,roughness:.4});for(const f of[-1,1]){const p=new L(new nn(3.2,1.12),h);p.position.set(0,2.75,f*.1),f<0&&(p.rotation.y=Math.PI),s.add(p)}let u="";const d=(f,p)=>{const x=`${f}|${p}`;if(x===u)return;u=x;const m=l.createLinearGradient(0,0,512,192);m.addColorStop(0,"#5e1020"),m.addColorStop(1,"#360914"),l.fillStyle=m,l.fillRect(0,0,512,192),l.strokeStyle="#f6cf78",l.lineWidth=8,l.strokeRect(10,10,492,172),l.fillStyle="#fff6df",l.font='800 47px "Cinzel", Georgia, serif',l.textAlign="center",l.textBaseline="middle",l.fillText(f.slice(0,22),256,72,468),l.fillStyle="#ffcf76",l.font="750 35px Inter, sans-serif",l.fillText(p.slice(0,32),256,130,468),c.needsUpdate=!0};return d("NORTH POLE","Stockholm"),{group:s,setText:d}}function Fy(s=80,e=80){const t=new ut({color:"#1b3a6b",roughness:.08,metalness:.25,clearcoat:1,clearcoatRoughness:.06,transparent:!0,opacity:0}),n=new L(new nn(s,e),t);return n.rotation.x=-Math.PI*.5,n}function Oy(){return Wu()}function By(s="coca_cola"){return Uv(s)}function ky(){return Vu(!0)}class jv extends xu{constructor(){super();const e=new Ne;e.deleteAttribute("uv");const t=new Ue({side:qt}),n=new Ue,i=new fo(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const r=new L(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new L(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new L(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new L(e,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new L(e,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new L(e,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new L(e,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const d=new L(e,ss(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const f=new L(e,ss(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);const p=new L(e,ss(17));p.position.set(14.904,12.198,-1.832),p.scale.set(.15,4.265,6.331),this.add(p);const x=new L(e,ss(43));x.position.set(-.462,8.89,14.52),x.scale.set(4.38,5.441,.088),this.add(x);const m=new L(e,ss(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const g=new L(e,ss(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ss(s){const e=new qe;return e.color.setScalar(s),e}const Xu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Cs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Zv=new xo(-1,1,1,-1,0,1);class $v extends _t{constructor(){super(),this.setAttribute("position",new Ze([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ze([0,2,0,0,2,0],2))}}const Jv=new $v;class Wl{constructor(e){this._mesh=new L(Jv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Zv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Qv extends Cs{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ht?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=sr.clone(e.uniforms),this.material=new Ht({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Wl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ih extends Cs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class ey extends Cs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ty{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new Sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qv(Xu),this.copyPass.material.blending=qn,this.clock=new u_}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ih!==void 0&&(o instanceof Ih?n=!0:o instanceof ey&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const ny={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class iy extends Cs{constructor(){super();const e=ny;this.uniforms=sr.clone(e.uniforms),this.material=new Wx({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Wl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ht.getTransfer(this._outputColorSpace)===vt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Oh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Bh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===bl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===kh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===zh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class sy extends Cs{constructor(e,t,n=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new De}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const ry={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new De(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class bs extends Cs{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new De(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Sn(r,o,{type:Kn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Sn(r,o,{type:Kn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new Sn(r,o,{type:Kn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=ry;this.highPassUniforms=sr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ht({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ne(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Xu;this.copyUniforms=sr.clone(h.uniforms),this.blendMaterial=new Ht({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Rt,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new De,this.oldClearAlpha=1,this.basic=new qe,this.fsQuad=new Wl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new ne(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=bs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=bs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ht({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}}bs.BlurDirectionX=new ne(1,0);bs.BlurDirectionY=new ne(0,1);class oy{constructor(e,t={}){k(this,"renderer");k(this,"scene");k(this,"camera");k(this,"composer");k(this,"bloomPass");k(this,"hemiLight");k(this,"moonKeyLight");k(this,"rimLight");k(this,"baseBloomStrength");k(this,"baseExposure");k(this,"fogTargetColor",new De("#0c1b42"));k(this,"envRenderTarget");k(this,"quality","ultra");k(this,"curWidth");k(this,"curHeight");this.curWidth=Math.max(1,e.clientWidth||window.innerWidth),this.curHeight=Math.max(1,e.clientHeight||window.innerHeight),this.quality=t.initialQuality??"ultra",this.renderer=new rx({antialias:!0,powerPreference:"high-performance",alpha:!1});const n=this.getTargetDpr();this.renderer.setPixelRatio(n),this.renderer.setSize(this.curWidth,this.curHeight),this.baseExposure=t.exposure??1.02,this.baseBloomStrength=t.bloomStrength??.42,this.renderer.toneMapping=bl,this.renderer.toneMappingExposure=this.baseExposure,this.renderer.outputColorSpace=dt,this.renderer.domElement.className="scene-canvas",e.appendChild(this.renderer.domElement),this.scene=new xu,this.scene.background=new De("#050b1f"),t.fogDensity&&t.fogDensity>0&&(this.scene.fog=new lo(t.fogColor??"#081436",t.fogDensity));const i=new ll(this.renderer),r=new jv;this.envRenderTarget=i.fromScene(r,.04),this.scene.environment=this.envRenderTarget.texture,this.scene.environmentIntensity=.36,r.dispose(),i.dispose(),this.camera=new jt(t.fov??50,this.curWidth/this.curHeight,t.near??.2,t.far??450),this.hemiLight=new r_("#7ba8ef","#111b3a",.56),this.scene.add(this.hemiLight),this.moonKeyLight=new ml("#ffdfae",.88),this.moonKeyLight.position.set(28,42,-32),this.scene.add(this.moonKeyLight),this.rimLight=new ml("#54d8c5",.42),this.rimLight.position.set(-28,18,-45),this.scene.add(this.rimLight),this.composer=new ty(this.renderer),this.composer.setPixelRatio(n),this.composer.setSize(this.curWidth,this.curHeight);const o=new sy(this.scene,this.camera);this.composer.addPass(o),this.bloomPass=new bs(new ne(Math.max(1,Math.floor(this.curWidth*.5)),Math.max(1,Math.floor(this.curHeight*.5))),this.baseBloomStrength,t.bloomRadius??.5,t.bloomThreshold??.8),this.composer.addPass(this.bloomPass);const a=new iy;this.composer.addPass(a),this.setQuality(this.quality)}setAtmosphere(e,t,n){const i=_i.clamp(e,0,1),r=_i.clamp(t,0,1);this.hemiLight.intensity=.56+i*.72+r*.16,this.moonKeyLight.intensity=.88+i*.95+r*.25,i>.65?this.moonKeyLight.color.set("#fff3db"):r>.4?this.moonKeyLight.color.set("#ffb88c"):this.moonKeyLight.color.set("#ffdfae"),this.rimLight.intensity=.42+r*.24-i*.15,this.scene.fog instanceof lo&&(this.fogTargetColor.set(n),this.scene.fog.color.lerp(this.fogTargetColor,.12)),this.bloomPass.strength=Math.max(.18,this.baseBloomStrength*(1-i*.52)),this.renderer.toneMappingExposure=this.baseExposure+i*.08}getTargetDpr(){const e=this.quality==="eco"?1.1:1.5;return Math.min(window.devicePixelRatio||1,e)}setQuality(e){if(this.quality===e&&this.bloomPass.enabled===(e==="ultra"))return;this.quality=e;const t=this.getTargetDpr();this.renderer.setPixelRatio(t),this.composer.setPixelRatio(t),this.bloomPass.enabled=e==="ultra",this.resize(this.curWidth,this.curHeight)}resize(e,t){this.curWidth=Math.max(1,e),this.curHeight=Math.max(1,t),this.camera.aspect=this.curWidth/this.curHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.curWidth,this.curHeight),this.composer.setSize(this.curWidth,this.curHeight),this.bloomPass.resolution.set(Math.max(1,Math.floor(this.curWidth*.5)),Math.max(1,Math.floor(this.curHeight*.5)))}render(){this.quality==="ultra"?this.composer.render():this.renderer.render(this.scene,this.camera)}dispose(){this.scene.traverse(e=>{const t=e;t.geometry&&t.geometry.dispose();const n=t.material;Array.isArray(n)?n.forEach(i=>i.dispose()):n&&n.dispose()}),this.envRenderTarget.dispose(),this.bloomPass.dispose(),this.composer.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}function zy(s,e={}){try{return{stage:new oy(s,e),fallbackEl:null}}catch{const t=Ou.t(),n=document.createElement("div");return n.className="webgl-fallback",n.innerHTML=`<div class="webgl-fallback-card"><h2>${t.webglFallbackTitle}</h2><p>${t.webglFallbackText}</p></div>`,s.appendChild(n),{stage:null,fallbackEl:n}}}const Dh=s=>[s==null?void 0:s.municipality,(s==null?void 0:s.iata_code)||(s==null?void 0:s.icao_code)].filter(Boolean).join(" · ")||"Okänd";class Gy{constructor(e){k(this,"root",document.createElement("div"));k(this,"panel",document.createElement("section"));k(this,"buttons",new Map);k(this,"flights",new Map);k(this,"poleKm",0);k(this,"selected","");k(this,"routes",new Map);this.root.className="flight-stars",this.panel.className="flight-details",this.panel.hidden=!0,this.panel.setAttribute("aria-live","polite");for(const t of["pointerdown","pointerup","click"])this.root.addEventListener(t,n=>n.stopPropagation());this.root.append(this.panel),e.append(this.root)}button(e,t){let n=this.buttons.get(e);return n||(n=document.createElement("button"),n.className="flight-star",n.textContent=e==="pole"?"✧ N":"✦",n.onclick=()=>{this.show(e)},this.root.append(n),this.buttons.set(e,n)),n.setAttribute("aria-label",t),n.title=t,n}async show(e){var l;const t=this.flights.get(e);if(!t&&e!=="pole")return;this.selected=e,this.panel.hidden=!1;const n=document.createElement("button");n.textContent="Stäng ×",n.onclick=()=>{var c;this.selected="",this.panel.hidden=!0,(c=this.buttons.get(e))==null||c.focus()};const i=document.createElement("strong");i.textContent=t?[t.callsign,t.aircraft,t.registration].filter(Boolean).join(" · "):"Nordpolen";const r=document.createElement("div");r.textContent=t?`${t.isLive?"ADS-B":"Demoflyg"} · ${t.altitudeM} m · ${Math.round(t.distanceKm)} km från dig`:"Geografisk nord · 90° N";const o=document.createElement("div");o.textContent=`Från dig till Nordpolen: ${this.poleKm.toLocaleString("sv-SE")} km`;const a=document.createElement("div");if(this.panel.replaceChildren(n,i,r,a,o),!!t){if(!t.isLive){a.textContent=e==="SK142"?"Demorutt: Stockholm → Köpenhamn":"Demorutt: Oslo → Stockholm";return}if(a.textContent=this.routes.get(t.callsign)||"Hämtar avreseort och destination…",!this.routes.has(t.callsign))try{const c=await fetch("https://api.adsbdb.com/v0/callsign/"+encodeURIComponent(t.callsign),{signal:AbortSignal.timeout(6500)});if(!c.ok)throw new Error;const h=(l=(await c.json()).response)==null?void 0:l.flightroute;if(!h)throw new Error;const u=`Från ${Dh(h.origin)} → ${Dh(h.destination)}`;this.routes.set(t.callsign,u),a.textContent=u}catch{a.textContent="Avreseort och destination saknas i ruttregistret."}}}update(e,t,n){this.poleKm=Math.round(t.northPoleDistanceKm),this.flights.clear();const i=this.button("pole","Visa Nordpolen");i.classList.add("pole-star"),i.hidden=!!n;for(const r of e){const o=r.hex||r.callsign;this.flights.set(o,r);const a=this.button(o,"Visa flyg "+r.callsign);if(n){a.classList.add("starman-marker"),a.textContent=r.callsign;const h=n(r);a.hidden=!h.visible,a.style.left=h.x+"%",a.style.top=h.y+"%";continue}const l=r.isLive?(r.bearingDeg-t.headingDeg+540)%360-180:(r.bearingDeg+180)%360-180;a.hidden=Math.abs(l)>85,a.style.left=50+l*.54+"%";const c=Math.atan2(r.altitudeM,Math.max(1,r.distanceKm*1e3));a.style.top=Math.max(12,35-c*30)+"%"}for(const[r,o]of this.buttons)r==="pole"||this.flights.has(r)||(o.remove(),this.buttons.delete(r),this.selected===r&&(this.panel.hidden=!0,this.selected=""))}dispose(){this.root.remove()}}export{vy as $,hr as A,Ne as B,dy as C,xi as D,my as E,Ty as F,Ve as G,fy as H,hx as I,Ze as J,cr as K,yy as L,L as M,_t as N,At as O,Ey as P,vi as Q,go as R,$t as S,cy as T,zy as U,E as V,Ry as W,Vu as X,Ov as Y,Jn as Z,xy as _,Ue as a,ml as a0,Zu as a1,Gy as a2,Cy as a3,My as a4,Ay as a5,gl as a6,Nt as a7,ot as a8,ut as a9,Cu as aA,vo as aB,Fl as aC,Ny as aD,fo as aE,vs as aF,D_ as aG,De as aa,Qn as ab,By as ac,ky as ad,Dy as ae,Oy as af,Py as ag,Iy as ah,Ly as ai,Fy as aj,Uy as ak,Zt as al,Iu as am,an,Vl as ao,ur as ap,kv as aq,Rt as ar,Di as as,os as at,Fv as au,Wu as av,Ft as aw,pi as ax,hy as ay,Ul as az,gy as b,py as c,Uv as d,_y as e,Xt as f,ku as g,_i as h,Ou as i,ly as j,uy as k,ne as l,Ri as m,N_ as n,Zn as o,wy as p,U_ as q,qe as r,by as s,Xe as t,zt as u,dt as v,nn as w,St as x,Sy as y,Du as z};

import{j as x}from"./jsx-runtime-D0bAEALd.js";import{r as n}from"./chunk-TMI4QPZX-DO0jBZYa.js";import{u as q,b as U,T as X,c as V,C as K,a as J,S as Q}from"./react-three-fiber.esm-DxgqWO6f.js";const N=r=>r===Object(r)&&!Array.isArray(r)&&typeof r!="function";function C(r,u){const a=q(i=>i.gl),t=U(X,N(r)?Object.values(r):r);return n.useLayoutEffect(()=>{u==null||u(t)},[u]),n.useEffect(()=>{if("initTexture"in a){let i=[];Array.isArray(t)?i=t:t instanceof V?i=[t]:N(t)&&(i=Object.values(t)),i.forEach(d=>{d instanceof V&&a.initTexture(d)})}},[a,t]),n.useMemo(()=>{if(N(r)){const i={};let d=0;for(const y in r)i[y]=t[d++];return i}else return t},[r,t])}C.preload=r=>U.preload(X,r);C.clear=r=>U.clear(X,r);const $=50,S=8,ee=8,te=()=>new Q({transparent:!0,uniforms:{map:{value:null},opacity:{value:1},blurAmount:{value:0},scrollForce:{value:0},time:{value:0},isHovered:{value:0}},vertexShader:`
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Add gentle cloth-like ripples
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        // Flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          // Create flag-like wave from left to right
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          // Damping effect - stronger wave on the right side (free edge)
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          
          // Add secondary smaller waves for more realistic flag motion
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        // Apply Z displacement for curving effect (inverted) with cloth ripples and flag wave
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Simple blur approximation
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        // Add subtle lighting effect based on curving
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `});function re({texture:r,position:u,scale:a,material:t}){const l=n.useRef(null),[i,d]=n.useState(!1);return n.useEffect(()=>{t&&r&&(t.uniforms.map.value=r)},[t,r]),n.useEffect(()=>{t&&t.uniforms&&(t.uniforms.isHovered.value=i?1:0)},[t,i]),x.jsx("mesh",{ref:l,position:u,scale:a,material:t,onPointerEnter:()=>d(!0),onPointerLeave:()=>d(!1),children:x.jsx("planeGeometry",{args:[1,1,32,32]})})}function ae({images:r,speed:u=1,visibleCount:a=8,fadeSettings:t={fadeIn:{start:.05,end:.15},fadeOut:{start:.85,end:.95}},blurSettings:l={blurIn:{start:0,end:.1},blurOut:{start:.9,end:1},maxBlur:3}}){const[i,d]=n.useState(0),[y,O]=n.useState(!0),M=n.useRef(Date.now()),L=n.useMemo(()=>r.map(e=>typeof e=="string"?{src:e,alt:""}:e),[r]),Z=C(L.map(e=>e.src)),z=n.useMemo(()=>Array.from({length:a},()=>te()),[a]),w=n.useMemo(()=>{const e=[],o=S,f=ee;for(let c=0;c<a;c++){const m=c*2.618%(Math.PI*2),s=(c*1.618+Math.PI/3)%(Math.PI*2),p=c%3*1.2,g=(c+1)%4*.8,j=Math.sin(m)*p*o/3,F=Math.cos(s)*g*f/4;e.push({x:j,y:F})}return e},[a]),h=L.length,I=$,D=n.useRef(Array.from({length:a},(e,o)=>{var f,c;return{index:o,z:a>0?I/a*o%I:0,imageIndex:h>0?o%h:0,x:((f=w[o])==null?void 0:f.x)??0,y:((c=w[o])==null?void 0:c.y)??0}}));n.useEffect(()=>{D.current=Array.from({length:a},(e,o)=>{var f,c;return{index:o,z:a>0?I/Math.max(a,1)*o%I:0,imageIndex:h>0?o%h:0,x:((f=w[o])==null?void 0:f.x)??0,y:((c=w[o])==null?void 0:c.y)??0}})},[I,w,h,a]);const R=n.useCallback(e=>{d(o=>o+e.deltaY*.01*u),O(!1),M.current=Date.now()},[u]),P=n.useRef(0),T=n.useRef(0),H=n.useCallback(e=>{P.current=e.touches[0].clientY,T.current=e.touches[0].clientX,O(!1),M.current=Date.now()},[]),_=n.useCallback(e=>{const o=e.touches[0].clientY,f=e.touches[0].clientX,c=P.current-o,m=T.current-f,s=Math.abs(c)>Math.abs(m)?c:m;d(p=>p+s*.05*u),P.current=o,T.current=f,M.current=Date.now()},[u]),B=n.useCallback(()=>{P.current=0,T.current=0},[]),W=n.useCallback(e=>{e.key==="ArrowUp"||e.key==="ArrowLeft"?(d(o=>o-2*u),O(!1),M.current=Date.now()):(e.key==="ArrowDown"||e.key==="ArrowRight")&&(d(o=>o+2*u),O(!1),M.current=Date.now())},[u]);return n.useEffect(()=>{const e=document.querySelector("canvas");if(e)return e.addEventListener("wheel",R,{passive:!0}),e.addEventListener("touchstart",H,{passive:!0}),e.addEventListener("touchmove",_,{passive:!0}),e.addEventListener("touchend",B,{passive:!0}),document.addEventListener("keydown",W),()=>{e.removeEventListener("wheel",R),e.removeEventListener("touchstart",H),e.removeEventListener("touchmove",_),e.removeEventListener("touchend",B),document.removeEventListener("keydown",W)}},[R,H,_,B,W]),n.useEffect(()=>{const e=setInterval(()=>{Date.now()-M.current>3e3&&O(!0)},1e3);return()=>clearInterval(e)},[]),J((e,o)=>{y&&d(s=>s+.3*o),d(s=>s*.95);const f=e.clock.getElapsedTime();z.forEach(s=>{s&&s.uniforms&&(s.uniforms.time.value=f,s.uniforms.scrollForce.value=i)});const c=h>0?a%h||h:0,m=I;D.current.forEach((s,p)=>{var G,Y;let g=s.z+i*o*10,j=0,F=0;if(g>=m?(j=Math.floor(g/m),g-=m*j):g<0&&(F=Math.ceil(-g/m),g+=m*F),j>0&&c>0&&h>0&&(s.imageIndex=(s.imageIndex+j*c)%h),F>0&&c>0&&h>0){const b=s.imageIndex-F*c;s.imageIndex=(b%h+h)%h}s.z=(g%m+m)%m,s.x=((G=w[p])==null?void 0:G.x)??0,s.y=((Y=w[p])==null?void 0:Y.y)??0;const v=s.z/m;let E=1;v>=t.fadeIn.start&&v<=t.fadeIn.end?E=(v-t.fadeIn.start)/(t.fadeIn.end-t.fadeIn.start):v<t.fadeIn.start?E=0:v>=t.fadeOut.start&&v<=t.fadeOut.end?E=1-(v-t.fadeOut.start)/(t.fadeOut.end-t.fadeOut.start):v>t.fadeOut.end&&(E=0),E=Math.max(0,Math.min(1,E));let A=0;if(v>=l.blurIn.start&&v<=l.blurIn.end){const b=(v-l.blurIn.start)/(l.blurIn.end-l.blurIn.start);A=l.maxBlur*(1-b)}else if(v<l.blurIn.start)A=l.maxBlur;else if(v>=l.blurOut.start&&v<=l.blurOut.end){const b=(v-l.blurOut.start)/(l.blurOut.end-l.blurOut.start);A=l.maxBlur*b}else v>l.blurOut.end&&(A=l.maxBlur);A=Math.max(0,Math.min(l.maxBlur,A));const k=z[p];k&&k.uniforms&&(k.uniforms.opacity.value=E,k.uniforms.blurAmount.value=A)})}),L.length===0?null:x.jsx(x.Fragment,{children:D.current.map((e,o)=>{const f=Z[e.imageIndex],c=z[o];if(!f||!c)return null;const m=e.z-I/2,s=f.image?f.image.width/f.image.height:1,p=s>1?[2*s,2,1]:[2,2/s,1];return x.jsx(re,{texture:f,position:[e.x,e.y,m],scale:p,material:c},e.index)})})}function oe({images:r}){const u=n.useMemo(()=>r.map(a=>typeof a=="string"?{src:a,alt:""}:a),[r]);return x.jsxs("div",{className:"flex flex-col items-center justify-center h-full bg-gray-100 p-4",children:[x.jsx("p",{className:"text-gray-600 mb-4",children:"WebGL not supported. Showing image list:"}),x.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto",children:u.map((a,t)=>x.jsx("img",{src:a.src||"/placeholder.svg",alt:a.alt,className:"w-full h-32 object-cover rounded"},t))})]})}function le({images:r,className:u="h-96 w-full",style:a,fadeSettings:t={fadeIn:{start:.05,end:.25},fadeOut:{start:.4,end:.43}},blurSettings:l={blurIn:{start:0,end:.1},blurOut:{start:.4,end:.43},maxBlur:8}}){const[i,d]=n.useState(!0);return n.useEffect(()=>{try{const y=document.createElement("canvas");y.getContext("webgl")||y.getContext("experimental-webgl")||d(!1)}catch{d(!1)}},[]),i?x.jsx("div",{className:u,style:a,children:x.jsx(K,{camera:{position:[0,0,0],fov:55},gl:{antialias:!0,alpha:!0},children:x.jsx(ae,{images:r,fadeSettings:t,blurSettings:l})})}):x.jsx("div",{className:u,style:a,children:x.jsx(oe,{images:r})})}export{le as default};


import {useEffect,useRef,useState} from 'react';
import { Link } from 'react-router-dom';
import projects from './projects.json';

// What plays on the television: CUCU's most established client brands, in this
// order. An entry with a project page links to it; Oryza Farmlands has no project
// page yet, so it shows its social media work and links to the portfolio.
const fromProject=slug=>{const p=projects.find(x=>x.slug===slug);return {title:p.title,category:p.category,coverImage:p.coverImage,to:'/project/'+p.slug,label:'View project'}};
const selection=[
  fromProject('ark-group'),
  {title:'Oryza Farmlands',category:'Social Media & Performance',coverImage:'/optimized/w1200/Clientwork/social/oryza.webp',to:'/work',label:'View portfolio'},
  fromProject('one-ent'),
  fromProject('subishi'),
];

export function StudioDisplay(){
  const mount=useRef(null);
  const [ready,setReady]=useState(false);
  const [projectIndex,setProjectIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const pauseRef=useRef(false);
  const currentProject=selection[projectIndex];
  useEffect(()=>{pauseRef.current=paused},[paused]);
  useEffect(()=>{
    const host=mount.current;
    if(!host)return;
    let disposed=false,frame=0,cleanup=()=>{},restart=()=>{};
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    Promise.all([import('three'),import('three/addons/geometries/RoundedBoxGeometry.js'),import('three/addons/environments/RoomEnvironment.js')]).then(([T,{RoundedBoxGeometry},{RoomEnvironment}])=>{
      if(disposed)return;
      let renderer;
      try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{return}
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
      renderer.outputColorSpace=T.SRGBColorSpace;
      renderer.toneMapping=T.ACESFilmicToneMapping;
      renderer.toneMappingExposure=1.15;
      renderer.shadowMap.enabled=true;
      renderer.shadowMap.type=T.PCFSoftShadowMap;
      host.appendChild(renderer.domElement);
      const scene=new T.Scene();
      const camera=new T.PerspectiveCamera(35,1,.1,50);
      camera.position.set(.12,.7,7.5);camera.lookAt(0,-.05,0);
      const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment();
      const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
      const key=new T.DirectionalLight(0xf1ffe8,3.8);key.position.set(-3,5,4);key.castShadow=true;
      key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.bias=-.001;scene.add(key);
      const rim=new T.DirectionalLight(0x72d5a0,2.5);rim.position.set(4,2,-3);scene.add(rim);
      scene.add(new T.AmbientLight(0xadc8b5,.5));
      const machine=new T.Group();scene.add(machine);
      const green=new T.MeshPhysicalMaterial({color:0x1e9b59,metalness:.38,roughness:.27,clearcoat:.75,clearcoatRoughness:.2});
      const dark=new T.MeshStandardMaterial({color:0x0b1810,metalness:.25,roughness:.38});
      const lime=new T.MeshStandardMaterial({color:0xcfe68e,metalness:.25,roughness:.35});
      const black=new T.MeshStandardMaterial({color:0x020805,metalness:.5,roughness:.2});
      const geometries=new Set();
      const materials=new Set([green,dark,lime,black]);
      const box=(w,h,d,r,material,x=0,y=0,z=0)=>{
        const g=new RoundedBoxGeometry(w,h,d,4,r);geometries.add(g);const mesh=new T.Mesh(g,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;machine.add(mesh);return mesh;
      };
      box(3.58,2.94,.88,.22,green,0,.08,0);
      box(3.29,2.55,.16,.19,dark,0,.18,.47);
      box(3.12,2.33,.12,.16,black,0,.23,.56);
      box(3.1,.19,.28,.07,green,0,-1.54,0);
      box(.32,.35,.56,.075,dark,-1.1,-1.42,0);box(.32,.35,.56,.075,dark,1.1,-1.42,0);
      // Recessed side ventilation and a small front control strip.
      for(let i=0;i<8;i++)box(.022,.34,.04,.007,dark,1.797,.2,.18-i*.065);
      const buttonGeometry=new T.CylinderGeometry(.055,.055,.035,24);geometries.add(buttonGeometry);
      for(let i=0;i<3;i++){const b=new T.Mesh(buttonGeometry,i===0?lime:dark);b.rotation.x=Math.PI/2;b.position.set(1.12-i*.19,-1.19,.464);machine.add(b)}
      // The display uses CUCU's existing portfolio; no reference artwork is reused.
      const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=790;
      const ctx=canvas.getContext('2d');if(!ctx){renderer.dispose();renderer.domElement.remove();environment.dispose();return}
      const screenTexture=new T.CanvasTexture(canvas);screenTexture.colorSpace=T.SRGBColorSpace;screenTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
      const screenMaterial=new T.MeshBasicMaterial({map:screenTexture,transparent:true,toneMapped:false});materials.add(screenMaterial);
      const screenGeometry=new T.PlaneGeometry(2.98,2.2,30,24);geometries.add(screenGeometry);
      const vertices=screenGeometry.attributes.position;
      for(let i=0;i<vertices.count;i++){const x=vertices.getX(i)/1.49,y=vertices.getY(i)/1.1;vertices.setZ(i,.045*(1-x*x)*(1-y*y))}
      screenGeometry.computeVertexNormals();
      const screen=new T.Mesh(screenGeometry,screenMaterial);screen.position.set(0,.23,.626);machine.add(screen);
      const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=72;
      const lc=labelCanvas.getContext('2d');lc.fillStyle='#cfe68e';lc.font='600 38px sans-serif';lc.fillText('CUCU',18,48);
      const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;
      const labelMaterial=new T.MeshBasicMaterial({map:labelTexture,transparent:true,toneMapped:false});materials.add(labelMaterial);
      const labelGeometry=new T.PlaneGeometry(.77,.108);geometries.add(labelGeometry);const label=new T.Mesh(labelGeometry,labelMaterial);label.position.set(-1.17,-1.19,.465);machine.add(label);
      const floorGeometry=new T.PlaneGeometry(12,12);geometries.add(floorGeometry);
      const shadowMaterial=new T.ShadowMaterial({opacity:.4});materials.add(shadowMaterial);
      const floor=new T.Mesh(floorGeometry,shadowMaterial);floor.rotation.x=-Math.PI/2;floor.position.y=-1.72;floor.receiveShadow=true;scene.add(floor);
      // An understated light pool provides depth without obscuring the headline.
      const glowCanvas=document.createElement('canvas');glowCanvas.width=256;glowCanvas.height=256;
      const gc=glowCanvas.getContext('2d'),gradient=gc.createRadialGradient(128,128,5,128,128,128);
      gradient.addColorStop(0,'rgba(81,184,108,.36)');gradient.addColorStop(1,'rgba(81,184,108,0)');gc.fillStyle=gradient;gc.fillRect(0,0,256,256);
      const glowTexture=new T.CanvasTexture(glowCanvas),glowMaterial=new T.MeshBasicMaterial({map:glowTexture,transparent:true,depthWrite:false});materials.add(glowMaterial);
      const glowGeometry=new T.PlaneGeometry(5.5,4);geometries.add(glowGeometry);const glow=new T.Mesh(glowGeometry,glowMaterial);glow.rotation.x=-Math.PI/2;glow.position.set(0,-1.71,0);scene.add(glow);
      const images=selection.map(p=>{const image=new Image();image.src=p.coverImage;image.onload=()=>{if(!disposed)restart()};return image});
      let pointerX=0,pointerY=0,activeTime=0,lastTime=0,lastDraw=-1,lastIndex=-1,inView=true;
      const draw=(index,fade)=>{
        ctx.clearRect(0,0,1024,790);ctx.save();ctx.beginPath();ctx.roundRect(0,0,1024,790,58);ctx.clip();
        ctx.fillStyle='#09130e';ctx.fillRect(0,0,1024,790);
        const drawImage=(i,alpha)=>{const im=images[i];if(!im.complete||!im.naturalWidth)return;const scale=Math.max(1024/im.naturalWidth,660/im.naturalHeight);ctx.globalAlpha=alpha;ctx.drawImage(im,(1024-im.naturalWidth*scale)/2,(660-im.naturalHeight*scale)/2,im.naturalWidth*scale,im.naturalHeight*scale);ctx.globalAlpha=1};
        drawImage(index,1);if(fade>0)drawImage((index+1)%selection.length,fade);
        const p=selection[fade>.5?(index+1)%selection.length:index];
        ctx.fillStyle='#09130e';ctx.fillRect(0,660,1024,130);ctx.fillStyle='#f3f7ef';ctx.font='500 36px sans-serif';ctx.fillText(p.title,48,720);ctx.fillStyle='#cfe68e';ctx.font='23px sans-serif';ctx.fillText(p.category,48,755);
        const shown=fade>.5?(index+1)%selection.length:index;for(let i=0;i<selection.length;i++){ctx.fillStyle=i===shown?'#cfe68e':'#496050';ctx.beginPath();ctx.arc(983-(selection.length-i)*26,724,5,0,Math.PI*2);ctx.fill()}
        ctx.fillStyle='rgba(0,0,0,.045)';for(let y=0;y<790;y+=4)ctx.fillRect(0,y,1024,1);
        ctx.restore();screenTexture.needsUpdate=true;
      };
      const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera)};
      const observer=new ResizeObserver(resize);observer.observe(host);resize();
      const move=(e)=>{if(e.pointerType!=='mouse')return;const rect=host.getBoundingClientRect();pointerX=Math.max(-1,Math.min(1,(e.clientX-rect.left)/rect.width*2-1));pointerY=Math.max(-1,Math.min(1,(e.clientY-rect.top)/rect.height*2-1))};
      const leave=()=>{pointerX=0;pointerY=0};host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
      const animate=(time)=>{
        if(disposed)return;
        const dt=lastTime?Math.min(time-lastTime,50):0;lastTime=time;
        const still=motion.matches||pauseRef.current;
        if(!still)activeTime+=dt;
        machine.rotation.y+=((-.25+(still?0:pointerX*.16))-machine.rotation.y)*.055;
        machine.rotation.x+=((.045+(still?0:pointerY*.075))-machine.rotation.x)*.055;
        machine.rotation.z=-.035;machine.position.y=still?0:Math.sin(activeTime*.00065)*.04;
        const index=still?lastIndex<0?0:lastIndex:Math.floor(activeTime/6000)%selection.length;
        const fade=still?0:Math.max(0,(activeTime%6000-5400)/600);
        if(time-lastDraw>80||still){draw(index,fade);lastDraw=time}
        if(index!==lastIndex){setProjectIndex(index);lastIndex=index}
        renderer.render(scene,camera);
        if(inView&&!document.hidden&&!still)frame=requestAnimationFrame(animate);else frame=0;
      };
      restart=()=>{if(!disposed&&inView&&!document.hidden&&!frame){lastTime=0;frame=requestAnimationFrame(animate)}};
      const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;lastTime=0}else restart()};
      document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',restart);
      const viewport=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)restart();else{cancelAnimationFrame(frame);frame=0;lastTime=0}},{threshold:.05});viewport.observe(host);
      const contextLost=(e)=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;setReady(false)};renderer.domElement.addEventListener('webglcontextlost',contextLost);
      restart();setReady(true);
      const onPause=()=>restart();host.addEventListener('cucu-display-state',onPause);
      cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();viewport.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);host.removeEventListener('cucu-display-state',onPause);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',restart);renderer.domElement.removeEventListener('webglcontextlost',contextLost);images.forEach(im=>im.onload=null);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());screenTexture.dispose();labelTexture.dispose();glowTexture.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove()};
    }).catch(()=>{});
    return()=>{disposed=true;cancelAnimationFrame(frame);cleanup()};
  },[]);
  useEffect(()=>{mount.current?.dispatchEvent(new Event('cucu-display-state'))},[paused]);
  return <div className={'studio-display'+(ready?' display-ready':'')}>
    <div className="display-fallback"><img src={selection[0].coverImage} alt="" width="1200" height="800"/></div>
    <div className="display-canvas" ref={mount} aria-hidden="true"/>
    <div className="display-controls"><Link to={currentProject.to} aria-label={currentProject.label+': '+currentProject.title}>{currentProject.title}<span>{currentProject.label}</span></Link>{ready&&<button onClick={()=>setPaused(!paused)} aria-label={paused?'Play animation':'Pause animation'} aria-pressed={paused}>{paused?'Play':'Pause'}</button>}</div>
  </div>;
}

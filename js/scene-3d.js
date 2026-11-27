function fan(r,x,y,z,top){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(r,.03,8,24),M(0xc5ced8)));const h=new THREE.Mesh(new THREE.CylinderGeometry(r*.28,r*.28,.05,16),M(0x1a2638));h.rotation.x=Math.PI/2;g.add(h);for(let i=0;i<7;i++){const a=i*Math.PI*2/7,b=B(r*.55,r*.2,.015,0x4a6a96,Math.cos(a)*r*.55,Math.sin(a)*r*.55,0);b.rotation.z=a+.5;g.add(b)}g.position.set(x,y,z);if(top)g.rotation.x=-Math.PI/2;return g}
function part(dir,...ms){const g=new THREE.Group();ms.forEach(m=>g.add(m));piv.add(g);P.push({g,dir:new THREE.Vector3(...dir),u:0,t:0,ex:null})}
function tube(pts,col){return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p))),24,.035,8),M(col,{metalness:.1}))}
function build(){
 try{R=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true,alpha:true});}catch(e){$('#nogl').hidden=false;return}
 R.setPixelRatio(Math.min(devicePixelRatio,2));S=new THREE.Scene();C=new THREE.PerspectiveCamera(38,1,.1,60);
 S.add(new THREE.AmbientLight(0xbcd0ea,.75));const d=new THREE.DirectionalLight(0xffffff,.9);d.position.set(3,5,6);S.add(d);const p=new THREE.PointLight(0x6f9fe0,.8,20);p.position.set(-5,2,4);S.add(p);
 piv=new THREE.Group();S.add(piv);
 const st=new THREE.Group();st.add(B(2.2,3.5,.05,0x1d2b3f,0,0,-1.02),B(2.2,.06,2,0x1d2b3f,0,-1.75,0));
 const ed=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2,3.5,2)),new THREE.LineBasicMaterial({color:0xc5ced8,transparent:true,opacity:.55}));st.add(ed);piv.add(st);
 const glass=new THREE.Mesh(new THREE.PlaneGeometry(2.2,3.5),M(0x9ec1e6,{transparent:true,opacity:.09,metalness:0,roughness:.1,side:2}));glass.position.z=1;
 part([3.2,0,0],glass);P[0].ex=[st];
 part([3,0,0],B(1.7,2.3,.05,0x2b4264,.1,.3,-.95));
 part([3,0,0],B(.42,.42,.05,0xc5ced8,.1,.85,-.9));
 const ck=new THREE.Group();ck.add(B(.75,.75,.4,0x7f93ad,0,0,0),fan(.3,0,0,.22));ck.position.set(.1,.85,-.62);part([3,.6,0],ck);
 part([3,0,0],B(.05,1,.3,0x3d5a80,.62,.85,-.78),B(.05,1,.3,0x3d5a80,.74,.85,-.78));
 part([3,0,0],B(.5,.13,.03,0x8fb8e8,-.35,.2,-.9));
 const gp=new THREE.Group();gp.add(B(1.5,.32,.5,0x2c3f5c,0,0,0),fan(.14,-.35,0,.26),fan(.14,.3,0,.26));gp.position.set(.15,-.3,-.62);part([3,0,0],gp);
 part([3,-.4,0],B(1.9,.7,1.2,0x20314a,0,-1.4,-.35),B(.04,.5,.8,0x8fb8e8,.97,-1.4,-.35));
 part([2,2.2,0],fan(.38,-.45,1.62,-.3,true),fan(.38,.45,1.62,-.3,true));
 part([3.2,0,0],tube([[.7,-1.05,-.2],[.9,-.6,-.7],[.9,.1,-.9]],0x9fb4cc),tube([[-.5,-1.05,-.5],[-.95,.5,-.85],[-.4,1.3,-.9],[.1,1.4,-.88]],0x9fb4cc),tube([[0,-1.05,0],[.15,-.7,-.3],[.5,-.5,-.45]],0x9fb4cc));
 const ro=new ResizeObserver(rs);ro.observe($('#stage'));rs();bindCtl();ready=true;
}
function rs(){if(!R)return;const w=$('#stage').clientWidth,h=$('#stage').clientHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix()}
function glow(p,c){[p.g,...(p.ex||[])].forEach(g=>g.traverse(o=>{if(o.material&&o.material.emissive)o.material.emissive.setHex(c)}))}
function bindCtl(){const c=$('#c'),ptr=new Map();let pd=0;
 c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);ptr.set(e.pointerId,e);if(ptr.size==2){const[a,b]=[...ptr.values()];pd=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)}});
 c.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;const o=ptr.get(e.pointerId);ptr.set(e.pointerId,e);
  if(ptr.size==1){yaw+=(e.clientX-o.clientX)*.008;pit=Math.max(-.5,Math.min(.7,pit+(e.clientY-o.clientY)*.006))}
  else if(ptr.size==2){const[a,b]=[...ptr.values()],n=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);dist=Math.max(4.5,Math.min(14,dist-(n-pd)*.02));pd=n}});
 ['pointerup','pointercancel'].forEach(k=>c.addEventListener(k,e=>ptr.delete(e.pointerId)));
 c.addEventListener('wheel',e=>{e.preventDefault();dist=Math.max(4.5,Math.min(14,dist+e.deltaY*.005))},{passive:false});
 c.addEventListener('keydown',e=>{const k=e.key;if(k=='ArrowLeft')yaw-=.15;else if(k=='ArrowRight')yaw+=.15;else if(k=='ArrowUp')pit=Math.max(-.5,pit-.1);else if(k=='ArrowDown')pit=Math.min(.7,pit+.1);else if(k=='+'||k=='=')dist=Math.max(4.5,dist-.8);else if(k=='-')dist=Math.min(14,dist+.8);else return;e.preventDefault()});
 $('#ctl').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.v){pit=.12;yaw={lat:.45,fr:-Math.PI/2,tr:Math.PI/2}[b.dataset.v]}if(b.dataset.z)dist=Math.max(4.5,Math.min(14,dist+ +b.dataset.z*1.2))})}
function loop(now){if(!on)return;requestAnimationFrame(loop);if(!R||GM.matches)return;
 const k=RM?1:.12;piv.rotation.y+=(yaw-piv.rotation.y)*k;piv.rotation.x+=(pit-piv.rotation.x)*k;
 piv.position.x+=(tgtX-piv.position.x)*k;piv.position.y+=(tgtY+(RM?0:Math.sin(now/1400)*.05)-piv.position.y)*k;
 C.position.z+=(dist-C.position.z)*k;C.position.y=.3;C.lookAt(0,0,0);
 P.forEach(p=>{p.u+=(p.t-p.u)*(RM?1:.07);const e=p.u*p.u*(3-2*p.u);p.g.position.copy(p.dir).multiplyScalar(e)});
 R.render(S,C)}
function pick(i,cardOpen){if(!ready)return;if(sel>=0&&sel!==i&&P[sel]){glow(P[sel],0);P[sel].t=0}sel=i;
 if(i<0){tgtX=tgtY=0;return}
 const p=P[i];if(p)glow(p,0x2f6fb5);const narrow=innerWidth<760;tgtX=cardOpen&&!narrow?-1.5:0;tgtY=cardOpen&&narrow?.9:0;
 if(p)setTimeout(()=>{if(sel===i)p.t=1},RM?0:260)}

/* 3D dice for the floating dice roller.
 *
 * Loaded only when someone first opens the dice roller, together with
 * three.js and cannon.js from /vendor/. The result is always decided first
 * by the site's normal random roll; this file just throws the dice so they
 * land showing that result.
 *
 * How it works: the throw is simulated instantly with the physics engine,
 * we see which face ends up on top, then draw the numbers so that face
 * carries the rolled value, and replay the recorded throw on screen.
 *
 * window.FPDice3D.throwDice([{ type:'d20', label:'17' }, ...]) returns a
 * promise that resolves when the dice have settled (or the roll was skipped).
 */
(function(){
'use strict';

/* ---------- Shapes (plain maths) ---------- */
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2], scl=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const len=a=>Math.hypot(a[0],a[1],a[2]), nrm=a=>scl(a,1/len(a));
const rand=(a,b)=>a+Math.random()*(b-a);
const PHI=(1+Math.sqrt(5))/2;

function signs(base){
  let out=[[]];
  base.forEach(c=>{ const n=[]; out.forEach(p=>{ if(c===0) n.push(p.concat(0)); else { n.push(p.concat(c)); n.push(p.concat(-c)); } }); out=n; });
  return out;
}
function cyc(v){ return [v,[v[1],v[2],v[0]],[v[2],v[0],v[1]]]; }
const ICO = [].concat(...cyc([0,1,PHI]).map(signs));
const DOD = signs([1,1,1]).concat(...cyc([0,PHI,1/PHI]).map(signs));

function facesFromNormals(verts, normals){
  return normals.map(n0=>{ const n=nrm(n0); let m=-Infinity; verts.forEach(p=>{ m=Math.max(m,dot(p,n)); });
    return verts.map((p,i)=>[i,dot(p,n)]).filter(x=>x[1]>m-1e-4).map(x=>x[0]); });
}
function orderFace(verts, idx){
  const c=scl(idx.reduce((s,i)=>add(s,verts[i]),[0,0,0]),1/idx.length);
  let n=nrm(cross(sub(verts[idx[1]],verts[idx[0]]),sub(verts[idx[2]],verts[idx[0]])));
  if(dot(n,c)<0) n=scl(n,-1);
  const e1=nrm(sub(verts[idx[0]],c)), e2=cross(n,e1);
  return idx.slice().sort((a,b)=>{ const pa=sub(verts[a],c), pb=sub(verts[b],c); return Math.atan2(dot(pa,e2),dot(pa,e1))-Math.atan2(dot(pb,e2),dot(pb,e1)); });
}
function d10Shape(){
  // Pentagonal trapezohedron: the apex height keeps each kite face flat.
  const z=0.1, h=z*(1+Math.cos(Math.PI/5))/(1-Math.cos(Math.PI/5));
  const v=[[0,h,0],[0,-h,0]];
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; v.push([Math.cos(a), i%2===0?z:-z, Math.sin(a)]); }
  const R=i=>2+((i%10)+10)%10, faces=[];
  for(let j=0;j<5;j++) faces.push([0,R(2*j),R(2*j+1),R(2*j+2)]);
  for(let j=0;j<5;j++) faces.push([1,R(2*j+1),R(2*j+2),R(2*j+3)]);
  return {verts:v, faces};
}
const SHAPES = {};
function shape(type){
  if(SHAPES[type]) return SHAPES[type];
  let verts, faces;
  if(type==='d4'){ verts=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]]; faces=[0,1,2,3].map(i=>[0,1,2,3].filter(j=>j!==i)); }
  else if(type==='d6'){ verts=signs([1,1,1]); faces=facesFromNormals(verts,[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]); }
  else if(type==='d8'){ verts=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]; faces=facesFromNormals(verts,signs([1,1,1])); }
  else if(type==='d10'||type==='d100'){ const s=d10Shape(); verts=s.verts; faces=s.faces; }
  else if(type==='d12'){ verts=DOD; faces=facesFromNormals(verts,ICO); }
  else { verts=ICO; faces=facesFromNormals(verts,DOD); }
  const R=Math.max(...verts.map(len)); verts=verts.map(p=>scl(p,1/R));
  faces=faces.map(f=>orderFace(verts,f));
  const normals=faces.map(f=>{ const c=f.reduce((s,i)=>add(s,verts[i]),[0,0,0]); const n=nrm(cross(sub(verts[f[1]],verts[f[0]]),sub(verts[f[2]],verts[f[0]]))); return dot(n,c)<0?scl(n,-1):n; });
  return (SHAPES[type] = {verts, faces, normals});
}
const SIZE = { d4:1.35, d6:1.12, d8:1.12, d10:1.08, d100:1.08, d12:1.1, d20:1.15 };
function baseLabels(type){
  if(type==='d4') return ['1','2','3','4'];
  if(type==='d10') return ['1','2','3','4','5','6','7','8','9','0'];
  if(type==='d100') return ['00','10','20','30','40','50','60','70','80','90'];
  const n=+type.slice(1); return Array.from({length:n},(_,i)=>String(i+1));
}

/* ---------- Colours follow the account accent ---------- */
const ACCENTS = {
  brass:{ body:'#7a5523', hi:'#a87a38', num:'#fbecc4', edge:'#3b2610' },
  crimson:{ body:'#7A2E28', hi:'#a4453c', num:'#f6dc9c', edge:'#3d1411' },
  ledger:{ body:'#3F4F3A', hi:'#5b7153', num:'#f2e9c9', edge:'#1f281c' },
  arcane:{ body:'#3e2f68', hi:'#5c4a96', num:'#ece4ff', edge:'#1d1534' },
  frost:{ body:'#28506e', hi:'#3f7499', num:'#eaf4fb', edge:'#122636' },
};
const colours = () => ACCENTS[document.documentElement.getAttribute('data-accent')] || ACCENTS.brass;

/* ---------- Stage ---------- */
let stageEl = null, three = null, current = null;
function ensureStage(){
  if(stageEl) return;
  stageEl = document.createElement('div');
  stageEl.className = 'dice3d-stage'; stageEl.hidden = true;
  stageEl.innerHTML = '<canvas class="dice3d-canvas"></canvas><div class="dice3d-flash"></div>';
  document.body.appendChild(stageEl);
  // Tap anywhere to skip to the result. Stop the click here so it doesn't
  // also close the dice panel.
  stageEl.addEventListener('click', e => { e.stopPropagation(); if(current) current.skip(); });

  const renderer = new THREE.WebGLRenderer({ canvas: stageEl.querySelector('canvas'), alpha:true, antialias:true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 200);
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x403020, 0.75));
  const sun = new THREE.DirectionalLight(0xffffff, 0.95);
  sun.castShadow = true; sun.shadow.mapSize.set(1024,1024); sun.shadow.bias = -0.0015;
  scene.add(sun); scene.add(sun.target);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(400,400), new THREE.ShadowMaterial({ opacity:0.3 }));
  floor.rotation.x = -Math.PI/2; floor.receiveShadow = true; scene.add(floor);
  three = { renderer, scene, camera, sun, meshes:[] };
}
function sizeStage(){
  const w = window.innerWidth, h = window.innerHeight, aspect = w/h;
  const { renderer, camera, sun } = three;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  renderer.setSize(w, h, false);
  const halfD = 10, H = halfD / Math.tan(camera.fov*Math.PI/360);
  camera.aspect = aspect; camera.position.set(0,H,0); camera.up.set(0,0,-1); camera.lookAt(0,0,0); camera.updateProjectionMatrix();
  const halfW = halfD*aspect;
  sun.position.set(-halfW*0.4, 40, -halfD*0.8);
  const sc = sun.shadow.camera; sc.left=-halfW-4; sc.right=halfW+4; sc.top=halfD+4; sc.bottom=-halfD-4; sc.near=1; sc.far=90; sc.updateProjectionMatrix();
  const r = Math.max(1.1, Math.min(1.15, Math.min(halfW, halfD)*0.15));
  return { halfW, halfD, r };
}

/* ---------- Physics: simulate the whole throw in one go ---------- */
function simulate(specs, stage){
  const { halfW, halfD, r } = stage;
  const world = new CANNON.World(); world.gravity.set(0,-60,0);
  world.allowSleep = true; world.solver.iterations = 12;
  const dieMat = new CANNON.Material(), floorMat = new CANNON.Material(), wallMat = new CANNON.Material();
  world.addContactMaterial(new CANNON.ContactMaterial(dieMat, floorMat, { friction:0.25, restitution:0.35 }));
  world.addContactMaterial(new CANNON.ContactMaterial(dieMat, wallMat, { friction:0.05, restitution:0.75 }));
  world.addContactMaterial(new CANNON.ContactMaterial(dieMat, dieMat, { friction:0.1, restitution:0.5 }));
  const floor = new CANNON.Body({ mass:0, material:floorMat }); floor.addShape(new CANNON.Plane()); floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2); world.addBody(floor);
  const inset = r;
  [[halfW-inset,0,-Math.PI/2],[-(halfW-inset),0,Math.PI/2],[0,halfD-inset,Math.PI],[0,-(halfD-inset),0]].forEach(([x,z,a])=>{
    const w = new CANNON.Body({ mass:0, material:wallMat }); w.addShape(new CANNON.Plane()); w.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), a); w.position.set(x,0,z); world.addBody(w);
  });
  const side = Math.random()<0.5 ? -1 : 1;
  const bodies = specs.map((s,i)=>{
    const S = s.shape, k = r*SIZE[s.type];
    const body = new CANNON.Body({ mass:1, material:dieMat, linearDamping:0.08, angularDamping:0.12 });
    body.addShape(new CANNON.ConvexPolyhedron(S.verts.map(p=>new CANNON.Vec3(p[0]*k,p[1]*k,p[2]*k)), S.faces));
    body.allowSleep = true; body.sleepSpeedLimit = 0.25; body.sleepTimeLimit = 0.15;
    const row = i % 4, col = Math.floor(i/4);
    body.position.set(side*(halfW - inset - k*1.2 - col*k*2.3), rand(2.5,4.5)+k, (row-1.5)*k*2.1 + rand(-0.8,0.8));
    body.velocity.set(-side*rand(Math.max(14, halfW*1.6), Math.max(20, halfW*2.3)), rand(-2,2), rand(-halfD*0.5, halfD*0.5));
    body.angularVelocity.set(rand(-22,22), rand(-22,22), rand(-22,22));
    const q = new CANNON.Quaternion(); q.setFromEuler(rand(0,6.28), rand(0,6.28), rand(0,6.28)); body.quaternion.copy(q);
    world.addBody(body); return body;
  });
  const frames = [];
  for(let step=0; step<480; step++){
    world.step(1/60);
    frames.push(bodies.map(b=>[b.position.x,b.position.y,b.position.z,b.quaternion.x,b.quaternion.y,b.quaternion.z,b.quaternion.w]));
    if(step>40 && bodies.every(b=>b.sleepState===CANNON.Body.SLEEPING)) break;
  }
  // Which face (or, for a d4, which corner) is on top? A die resting
  // against another at an angle doesn't count; we throw again.
  const ok = [], tops = bodies.map((b,i)=>{
    const S = specs[i].shape, q = b.quaternion;
    const upY = v=>q.vmult(new CANNON.Vec3(v[0],v[1],v[2])).y;
    let best=-1, bi=0;
    if(specs[i].type==='d4') S.verts.forEach((v,j)=>{ const y=upY(nrm(v)); if(y>best){best=y;bi=j;} });
    else S.normals.forEach((nv,j)=>{ const y=upY(nv); if(y>best){best=y;bi=j;} });
    ok.push(best > (specs[i].type==='d4' ? 0.9 : 0.95));
    return bi;
  });
  return { frames, tops, settled: bodies.every(b=>b.sleepState===CANNON.Body.SLEEPING) && ok.every(Boolean) };
}

/* ---------- Drawing the dice ---------- */
function faceTexture(size, uvPts, centre, corners, col){
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size*0.42,size*0.38,size*0.05,size*0.5,size*0.5,size*0.75);
  grd.addColorStop(0, col.hi); grd.addColorStop(1, col.body);
  g.fillStyle = grd; g.fillRect(0,0,size,size);
  g.beginPath(); uvPts.forEach((p,i)=>{ const x=p[0]*size, y=(1-p[1])*size; i?g.lineTo(x,y):g.moveTo(x,y); }); g.closePath();
  g.strokeStyle = col.edge; g.globalAlpha = 0.55; g.lineWidth = size*0.03; g.stroke(); g.globalAlpha = 1;
  const draw = (text, x, y, px, rot) => {
    g.save(); g.translate(x,y); g.rotate(rot||0);
    g.font = '700 '+px+'px Spectral, Georgia, serif'; g.textAlign='center'; g.textBaseline='middle';
    g.lineWidth = px*0.12; g.strokeStyle = col.edge; g.strokeText(text,0,px*0.04);
    g.fillStyle = col.num; g.fillText(text,0,px*0.04);
    if(text==='6'||text==='9') g.fillRect(-px*0.22, px*0.42, px*0.44, px*0.07);
    g.restore();
  };
  if(centre) draw(centre.text, size/2, size/2, centre.px*size);
  if(corners) corners.forEach(l=>draw(l.text, l.x*size, (1-l.y)*size, l.px*size, l.rot));
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4;
  return t;
}
function buildMesh(spec, labels, r){
  const S = spec.shape, k = r*SIZE[spec.type], V = S.verts.map(p=>scl(p,k));
  const pos=[], uv=[], nor=[], groups=[], mats=[];
  const col = colours(), texSize = window.innerWidth < 700 ? 128 : 192;
  S.faces.forEach((f,fi)=>{
    const P = f.map(i=>V[i]), c = scl(P.reduce(add,[0,0,0]),1/P.length), n = S.normals[fi];
    let upDir;
    if(spec.type==='d6') upDir = sub(scl(add(P[0],P[1]),0.5), c);
    else if(spec.type==='d10'||spec.type==='d100'){ let far=P[0]; P.forEach(p=>{ if(len(sub(p,c))>len(sub(far,c))) far=p; }); upDir = sub(far,c); }
    else upDir = sub(P[0], c);
    const e1 = nrm(upDir), e2 = cross(e1, n);
    const loc = P.map(p=>[dot(sub(p,c),e2), dot(sub(p,c),e1)]);
    const R = Math.max(...loc.map(q=>Math.hypot(q[0],q[1])));
    const uvPts = loc.map(q=>[0.5+q[0]/(2*R)*0.96, 0.5+q[1]/(2*R)*0.96]);
    let inr = Infinity;
    for(let i=0;i<loc.length;i++){ const a=loc[i], b=loc[(i+1)%loc.length], ex=b[0]-a[0], ey=b[1]-a[1]; inr=Math.min(inr, Math.abs(ex*(-a[1]) - ey*(-a[0]))/Math.hypot(ex,ey)); }
    const inrUv = inr/(2*R)*0.96;
    let tex;
    if(spec.type==='d4'){
      const corners = f.map((vi,j)=>{ const p=uvPts[j], dx=p[0]-0.5, dy=p[1]-0.5; return { text: labels[vi], x:0.5+dx*0.58, y:0.5+dy*0.58, px:0.2, rot: Math.atan2(dx, dy) }; });
      tex = faceTexture(texSize, uvPts, null, corners, col);
    } else {
      const text = labels[fi];
      tex = faceTexture(texSize, uvPts, { text, px: Math.min(0.42, inrUv*(text.length>1 ? 0.95 : 1.2)) }, null, col);
    }
    const start = pos.length/3;
    for(let i=1;i<P.length-1;i++) [0,i,i+1].forEach(j=>{ pos.push(...P[j]); nor.push(...n); uv.push(...uvPts[j]); });
    groups.push([start, pos.length/3-start, fi]);
    mats.push(new THREE.MeshStandardMaterial({ map:tex, roughness:0.42, metalness:0.08 }));
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor,3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv,2));
  groups.forEach(g=>geo.addGroup(g[0],g[1],g[2]));
  const mesh = new THREE.Mesh(geo, mats); mesh.castShadow = true;
  return mesh;
}
function clearMeshes(){
  three.meshes.forEach(m=>{ three.scene.remove(m); m.geometry.dispose(); m.material.forEach(mt=>{ mt.map.dispose(); mt.dispose(); }); });
  three.meshes = [];
}

/* ---------- Throwing ---------- */
// dice: [{ type:'d20', label:'17' }]. Resolves once they've settled.
function throwDice(dice){
  if(current) current.skip();
  ensureStage();
  stageEl.getAnimations().forEach(a=>a.cancel());
  stageEl.hidden = false;
  const stage = sizeStage();
  stage.r *= dice.length > 4 ? 0.78 : dice.length > 1 ? 0.92 : 1;
  const specs = dice.map(d=>({ type:d.type, shape:shape(d.type), want:String(d.label) }));
  let sim = null;
  for(let attempt=0; attempt<12; attempt++){ sim = simulate(specs, stage); if(sim.settled) break; }
  clearMeshes();
  specs.forEach((s,i)=>{
    const labels = baseLabels(s.type), k = labels.indexOf(s.want), t = sim.tops[i];
    [labels[k], labels[t]] = [labels[t], labels[k]];
    const mesh = buildMesh(s, labels, stage.r); three.scene.add(mesh); three.meshes.push(mesh);
  });
  window.__fpDiceLast = { want: specs.map(s=>s.want), settled: sim.settled, frames: sim.frames.length };
  const frames = sim.frames, last = frames.length-1;
  const apply = idx => { frames[idx].forEach((f,i)=>{ const m=three.meshes[i]; m.position.set(f[0],f[1],f[2]); m.quaternion.set(f[3],f[4],f[5],f[6]); }); three.renderer.render(three.scene, three.camera); };
  return new Promise(resolve=>{
    let start = performance.now(), raf = 0, settled = false, fadeTimer = 0;
    const me = {};
    const settle = () => {
      if(settled) return; settled = true; resolve();
      fadeTimer = setTimeout(()=>{
        const a = stageEl.animate([{opacity:1},{opacity:0}], { duration:450, fill:'forwards' });
        a.onfinish = () => { if(current !== me) return; stageEl.hidden = true; a.cancel(); clearMeshes(); current = null; };
      }, 1300);
    };
    const tick = now => {
      const idx = Math.max(0, Math.min(last, Math.floor((now-start)/1000*60*1.12)));
      apply(idx);
      if(idx>=last){ settle(); return; }
      raf = requestAnimationFrame(tick);
    };
    me.skip = () => {
      cancelAnimationFrame(raf);
      if(!settled){ apply(last); settle(); return; }
      // Already settled: a second tap clears the dice straight away.
      clearTimeout(fadeTimer); stageEl.hidden = true; clearMeshes(); current = null;
    };
    current = me;
    raf = requestAnimationFrame(tick);
  });
}

// Natural 20 / natural 1 flourish over the whole screen.
function flash(kind){
  if(!stageEl) return;
  const f = stageEl.querySelector('.dice3d-flash');
  const bg = kind === 'high'
    ? 'radial-gradient(circle at 50% 45%, rgba(233,194,122,.5), rgba(233,194,122,0) 60%)'
    : 'radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 40%, rgba(110,25,20,.45) 100%)';
  f.style.background = bg;
  f.animate([{opacity:0},{opacity:1, offset:0.2},{opacity:0}], { duration: kind === 'high' ? 1100 : 900 });
}

window.FPDice3D = { throwDice, flash };
})();

/* ---------- telas ---------- */
const NAV=[['inicio','Início'],['montagem','Montagem'],['sistemas','Sistemas Operacionais'],['manutencao','Manutenção'],['compatibilidade','Compatibilidade'],['simulador','Simulador'],['diagnostico','Diagnóstico'],['cabos','Cabos e Conexões'],['redes','Redes'],['autor','Sobre o Autor']],GR=['compatibilidade','simulador','diagnostico','cabos','redes'],NM=Object.fromEntries(NAV),nb=r=>`<li><button data-r="${r}"><span>${NM[r]}</span></button></li>`;
$('#nav').innerHTML=`<ul>${['inicio','montagem','sistemas','manutencao'].map(nb).join('')}<li class="dd"><button data-g="1" aria-haspopup="true" aria-expanded="false" aria-controls="lab-m"><span>Laboratórios</span><i class="chv" aria-hidden="true"></i></button><ul class="dm" id="lab-m">${GR.map(nb).join('')}</ul></li>${nb('autor')}</ul>`;
const gbtn=()=>document.querySelector('#nav .dd > button'),mitems=()=>[...document.querySelectorAll('#nav .dm button')];
const closeMenus=f=>{const g=gbtn();if(g){g.parentNode.classList.remove('open');g.setAttribute('aria-expanded','false');if(f===true)g.focus()}$('#nav').classList.remove('open');$('#mb').setAttribute('aria-expanded','false')};
$('#nav').onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.g){const d=b.parentNode;if(d.classList.contains('open'))closeMenus();else{d.classList.add('open');b.setAttribute('aria-expanded','true');if(e.detail===0)mitems()[0].focus()}return}closeMenus();location.hash=b.dataset.r};
$('#nav').onkeydown=e=>{const g=gbtn(),it=mitems(),i=it.indexOf(document.activeElement),op=g.parentNode.classList.contains('open');
 if(e.key=='Escape'&&op){e.preventDefault();closeMenus(true)}
 else if(e.target==g&&e.key=='ArrowDown'){e.preventDefault();g.parentNode.classList.add('open');g.setAttribute('aria-expanded','true');it[0].focus()}
 else if(i>-1&&['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();it[e.key=='Home'?0:e.key=='End'?it.length-1:(i+(/Down|Right/.test(e.key)?1:-1)+it.length)%it.length].focus()}};
$('#nav').addEventListener('focusout',e=>{const g=gbtn();if(g&&g.parentNode.classList.contains('open')&&e.relatedTarget&&!g.parentNode.contains(e.relatedTarget)&&!$('#nav').classList.contains('open'))closeMenus()});
$('#mb').onclick=()=>{const o=$('#nav').classList.toggle('open');$('#mb').setAttribute('aria-expanded',o)};
$('#brand').addEventListener('click',e=>{if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();closeMenus();const r=location.hash.slice(1)||'inicio';if(r!=='inicio'&&NAV.some(n=>n[0]==r))location.hash='inicio'});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenus()});document.addEventListener('keydown',e=>{if(e.key=='Escape')closeMenus()});
$('#list').innerHTML=PARTS.map((p,i)=>`<button class="it" data-i="${i}" aria-pressed="false"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="lb">${p.n}</span></button>`).join('');
$('#list').onclick=e=>{const b=e.target.closest('.it');if(b)showPart(+b.dataset.i)};
$('#tg').onclick=()=>{const s=$('#sb');s.classList.toggle('c');$('#tg .lb').textContent=s.classList.contains('c')?'':'Recolher lista'};
if(innerWidth<760)$('#sb').classList.add('c');
function showPart(i){document.querySelectorAll('.it[data-i]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.i==i));const p=PARTS[i];
 $('#panel').hidden=false;$('#panel').style.animation='none';void $('#panel').offsetWidth;$('#panel').style.animation='';
 $('#panel').innerHTML=`<button class="x" aria-label="Fechar">×</button><h2>${String(i+1).padStart(2,'0')}. ${p.n}</h2><h3>O que é?</h3><p>${p.o}</p><h3>Para que serve?</h3><p>${p.f}</p><h3>Como identificar</h3><p>${p.l}</p><h3>Por que é importante?</h3><p>${p.i}</p><div class="row"><button class="btn p" id="gm">Ver na montagem</button><button class="btn" id="gc">Compatibilidade</button></div>`;
 $('#panel .x').onclick=closeCard;$('#gm').onclick=()=>go('montagem',0);$('#gc').onclick=()=>location.hash='compatibilidade';pick(i,true)}
function closeCard(){$('#panel').hidden=true;document.querySelectorAll('.it[data-i]').forEach(b=>b.setAttribute('aria-pressed','false'));pick(-1)}
let step=0;try{step=Math.min(STEPS.length-1,Math.max(0,parseInt(localStorage.getItem('pclab-step'))||0))}catch(e){}
function go(r,s){if(s!=null&&s>=0)step=s;if(location.hash.slice(1)==r)route();else location.hash=r}
function showStep(){const s=STEPS[step];try{localStorage.setItem('pclab-step',step)}catch(e){}const pc=Math.round((step+1)/STEPS.length*100);
 $('#panel').hidden=false;$('#panel').style.animation='none';
 $('#panel').innerHTML=`<p style="color:var(--mute);margin:0">Etapa ${step+1} de ${STEPS.length}</p><h2>${s.t}</h2><div class="bar" role="progressbar" aria-valuenow="${pc}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pc}%"></i></div><h3>Como fazer</h3><p>${s.how}</p><h3>Ferramentas</h3><p>${s.tools}</p><div class="alert"><b>Cuidado:</b> ${s.care}</div><h3>Erro comum</h3><p>${s.err}</p><div class="row"><button class="btn" id="pv" ${step?'':'disabled'}>Voltar</button><button class="btn p" id="nx" ${step<STEPS.length-1?'':'disabled'}>Avançar</button></div><div class="row"><button class="btn" id="rs">Reiniciar montagem</button></div><details><summary>Etapas</summary><ul>${STEPS.map((x,i)=>`<li><button class="btn" data-s="${i}" style="margin:2px 0;${i==step?'border-color:var(--acc)':''}">${i+1}. ${x.t}</button></li>`).join('')}</ul></details>`;
 $('#pv').onclick=()=>{step--;showStep()};$('#rs').onclick=()=>{if(confirm('Reiniciar a montagem e voltar à primeira etapa?')){step=0;showStep()}};$('#nx').onclick=()=>{step++;showStep()};
 $('#panel').querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{step=+b.dataset.s;showStep()});
 if(s.p>=0)pick(s.p,true);else{pick(-1);tgtX=innerWidth<760?0:-1.5}}
const PG=h=>{const p=$('#pg');p.innerHTML=`<div class="in">${h}<footer>Referências gerais para aprofundamento: <a href="https://www.intel.com.br" target="_blank" rel="noopener">Intel</a>, <a href="https://www.amd.com" target="_blank" rel="noopener">AMD</a>, <a href="https://www.nvidia.com" target="_blank" rel="noopener">NVIDIA</a>, <a href="https://www.jedec.org" target="_blank" rel="noopener">JEDEC</a>, <a href="https://pcisig.com" target="_blank" rel="noopener">PCI-SIG</a>. Sempre confirme as especificações do modelo exato no site do fabricante.</footer></div>`;p.scrollTop=0;return p};
const bar=(v,max,lim,ok)=>`<div style="position:relative;height:22px;background:rgba(255,255,255,.1);border-radius:6px;margin:10px 0"><i style="display:block;height:100%;width:${Math.min(100,v/max*100)}%;background:${ok?'#9fd3b1':'#e39a9a'};border-radius:6px"></i><b style="position:absolute;top:-4px;bottom:-4px;left:${lim/max*100}%;border-left:2px solid #fff" title="Limite"></b></div>`;
const vd=(ok,t)=>`<div class="res ${ok?'o':'e'}"><b>${ok?'Compatível':'Incompatível'}:</b> ${t}</div>`;
const opt=(a,sel)=>a.map((o,i)=>`<option value="${i}" ${i==sel?'selected':''}>${o}</option>`).join('');
const rng=(k,l,mn,mx,v,st)=>`<label>${l}: <b data-o="${k}">${v}</b></label><input type="range" data-k="${k}" min="${mn}" max="${mx}" step="${st||1}" value="${v}">`;
const sel2=(k,l,a,v)=>`<label for="d_${k}">${l}</label><select id="d_${k}" data-k="${k}">${opt(a,v)}</select>`;
const FF=['ATX','mATX','Mini-ITX'],FS=[[305,244],[244,244],[170,170]];

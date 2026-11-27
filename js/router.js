function route(){clearInterval(SOT);SOT=0;LBclose();closeMenus();const r=(location.hash.slice(1)||'inicio'),ok=NAV.some(n=>n[0]==r)?r:'inicio';
 document.querySelectorAll('#nav button').forEach(b=>b.toggleAttribute('aria-current',b.dataset.r==ok)||0);document.querySelectorAll('#nav button').forEach(b=>b.dataset.r==ok?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));const gb=document.querySelector('#nav .dd > button');if(gb)GR.includes(ok)?gb.setAttribute('aria-current','page'):gb.removeAttribute('aria-current');ok=='inicio'?$('#brand').setAttribute('aria-current','page'):$('#brand').removeAttribute('aria-current');
 const d3=ok=='inicio'||ok=='montagem';$('#pg').hidden=d3;$('#stage').style.visibility=d3?'visible':'hidden';$('#sb').hidden=ok!='inicio';$('#panel').hidden=true;
 const was=on;on=d3&&!!R;if(on&&!was)requestAnimationFrame(loop);if(!ready&&d3)build(),on=d3&&!!R,on&&requestAnimationFrame(loop);
 if(ok=='inicio'){closeCard()}
 else if(ok=='montagem'){showStep()}
 else{pick(-1);({compatibilidade:pgCompat,simulador:pgSim,diagnostico:pgDiag,manutencao:pgMan,sistemas:pgSO,cabos:pgCabos,redes:pgRedes,autor:pgAutor})[ok]()}}
addEventListener('hashchange',route);route();

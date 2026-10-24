/* Persistent local audio controls. No account or API connection. */
(()=>{'use strict';
const el=document.querySelector('#musicPlayer');if(!el)return;
const audio=document.querySelector('#terminalAudio'),play=el.querySelector('[data-music="play"]'),title=el.querySelector('.music-title'),status=el.querySelector('.music-status'),volume=el.querySelector('#musicVolume'),value=el.querySelector('#musicVolumeValue');
const tracks=[{name:'绝区零 · 官网主题 BGM 01',src:'https://webstatic.hoyoverse.com/upload/static-resource/2022/04/19/aeefeb96a2a294cf1d7ab7324fd9a492_568718570249589416.mp3'},{name:'绝区零 · 官网主题 BGM 02',src:'https://fastcdn.hoyoverse.com/mi18n/nap_global/m20240603hy38zhr2tc/upload/0e5b56341f72ae72f5db600776e79cbc_4823529791387624270.mp3'}];
let index=0,request=0;audio.volume=.2;volume.value='20';value.textContent='20%';
function render(){const active=!audio.paused;play.setAttribute('aria-label',active?'暂停':'播放');play.title=active?'暂停':'播放';play.innerHTML=active?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z"/></svg>';el.classList.toggle('is-playing',active);}
function select(){audio.src=tracks[index].src;title.textContent=tracks[index].name;title.title=tracks[index].name;status.textContent='READY / '+String(index+1).padStart(2,'0')+' · '+String(tracks.length).padStart(2,'0');render();}
async function start(){const token=++request;status.textContent='LOADING / 正在缓冲';try{await audio.play();if(token===request)status.textContent='PLAYING / '+String(index+1).padStart(2,'0')+' · '+String(tracks.length).padStart(2,'0');}catch(error){if(token!==request)return;status.textContent=error.name==='NotAllowedError'?'请点击播放以开启音乐':'音乐暂不可用 · 可重试或添加本地歌曲';}render();}
function change(delta){request++;audio.pause();index=(index+delta+tracks.length)%tracks.length;select();start();}
play.addEventListener('click',()=>{if(audio.paused)start();else{request++;audio.pause();status.textContent='PAUSED / 已暂停';}});
el.querySelector('[data-music="prev"]').addEventListener('click',()=>change(-1));el.querySelector('[data-music="next"]').addEventListener('click',()=>change(1));
volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;value.textContent=volume.value+'%';volume.setAttribute('aria-valuetext',value.textContent);});
audio.addEventListener('play',render);audio.addEventListener('pause',render);audio.addEventListener('ended',()=>change(1));audio.addEventListener('error',()=>{status.textContent='音乐加载失败 · 可重试或添加本地歌曲';render();});
el.querySelector('[data-music="add"]').addEventListener('click',()=>el.querySelector('#musicFiles').click());
el.querySelector('#musicFiles').addEventListener('change',e=>{const files=[...e.target.files].filter(f=>f.type.startsWith('audio/')||/\.(mp3|ogg|wav|m4a|flac)$/i.test(f.name));if(!files.length)return;const first=tracks.length;files.forEach(f=>tracks.push({name:f.name.replace(/\.[^.]+$/,''),src:URL.createObjectURL(f)}));request++;audio.pause();index=first;select();start();e.target.value='';});
window.addEventListener('pagehide',()=>tracks.filter(t=>t.src.startsWith('blob:')).forEach(t=>URL.revokeObjectURL(t.src)));
select();
})();

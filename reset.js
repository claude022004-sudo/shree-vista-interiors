function resetQuotation(){
  if(typeof quotationRows==='function') quotationRows().forEach(r=>{r.l='';r.h='';r.qty=0;r.rate=0});else if(typeof detailRows!=='undefined') detailRows.forEach(r=>{r.l='';r.h='';r.qty=0;r.rate=0});
  if(typeof rooms!=='undefined'){rooms.forEach(r=>{r[1]=0;r[2]=0});renderRooms()}
  const area=document.getElementById('area');if(area)area.value=0;
  const electric=document.getElementById('electric');if(electric)electric.value=0;
  const client=document.getElementById('client');if(client)client.value='';
  const location=document.getElementById('location');if(location)location.value='';
  const salutation=document.getElementById('salutation');if(salutation)salutation.value='Mam';
  if(typeof renderRates==='function')renderRates();
  if(typeof update==='function')update();
  const preview=document.getElementById('preview');if(preview)preview.hidden=true;
  const paper=document.getElementById('paper');if(paper)paper.innerHTML='';
  const thumb=document.getElementById('thumb');if(thumb)thumb.innerHTML='<span>⌗</span><small>Plan preview</small>';
  const fileName=document.getElementById('fileName');if(fileName)fileName.textContent='No file selected';
}
document.getElementById('reset').addEventListener('click',resetQuotation);

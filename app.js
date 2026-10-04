const $=id=>document.getElementById(id);
const money=value=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(value)||0);
const now=new Date();$('today').textContent=now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});$('year').textContent=now.getFullYear();
let rooms=[['Living',11,20.5],['Dining',12,10],['Kitchen',12,9],['M. Bedroom',12,14],['C. Bedroom',11,14],['G. Bedroom',11,14]];
const detailRows=[{section:'FALSE CEILING',name:'Plain GYPSUM False Ceiling with Putty and Painting',l:'',h:'',qty:1500,rate:70,unit:'sft'},{section:'LIVING & DINING',name:'TV Unit with Paneling',l:11,h:9,rate:750,unit:'sft'},{section:'LIVING & DINING',name:'Crockery Unit Under Cabinets',l:5,h:3,rate:1200,unit:'sft'},{section:'LIVING & DINING',name:'Crockery Unit above Cabinets',l:5,h:2,rate:1200,unit:'sft'},{section:'LIVING & DINING',name:'Pooja Unit',l:4,h:7,rate:1200,unit:'sft'},{section:'LIVING & DINING',name:'Vanity Unit',l:3,h:7,rate:1200,unit:'sft'},{section:'LIVING & DINING',name:'LED Mirror',l:2,h:2,rate:850,unit:'sft'},{section:'M. BEDROOM',name:'Wardrobe',l:6,h:7,rate:1200,unit:'sft'},{section:'M. BEDROOM',name:'Loft',l:12,h:2,rate:950,unit:'sft'},{section:'M. BEDROOM',name:'LED Mirror',l:2,h:5,rate:850,unit:'sft'},{section:'M. BEDROOM',name:'Dressing Storage',l:4.6,h:9,rate:1200,unit:'sft'},{section:'C.BEDROOM',name:'Wardrobe',l:8,h:7,rate:1200,unit:'sft'},{section:'C.BEDROOM',name:'Loft',l:10,h:2,rate:950,unit:'sft'},{section:'G.BEDROOM',name:'Wardrobe',l:10.9,h:7,rate:1200,unit:'sft'},{section:'G.BEDROOM',name:'Loft',l:10.9,h:2,rate:950,unit:'sft'},{section:'KITCHEN',name:'Under Cabinets',l:17,h:3,rate:1200,unit:'sft'},{section:'KITCHEN',name:'Middle Cabinets',l:15,h:2.5,rate:1200,unit:'sft'},{section:'KITCHEN',name:'Loft',l:19.9,h:2,rate:950,unit:'sft'},{section:'KITCHEN',name:'Kitchen Tandem Baskets (3), Pullout (1), Wicker Baskets (2)',l:'',h:'',qty:1,rate:40000,unit:'lot'},{section:'OTHERS',name:'Profile Glass Doors for Kitchen, Crockery and Pooja Room Door',l:'',h:'',qty:1,rate:70000,unit:'lot'},{section:'OTHERS',name:'Granite for Crockery unit, Pooja unit, Vanity Unit',l:'',h:'',qty:1,rate:30000,unit:'lot'},{section:'OTHERS',name:'Electric Work for Full House including Ceiling',l:'',h:'',qty:1,rate:120000,unit:'lot'},{section:'OTHERS',name:'Shoe Rack',l:5,h:3,rate:1200,unit:'sft'}];
let finalDetailRows=null;
let documentMode='estimated';
const cloneRows=rows=>rows.map(row=>({...row}));
function quotationRows(){if(documentMode==='final'&&!finalDetailRows)finalDetailRows=cloneRows(detailRows);return documentMode==='final'?finalDetailRows:detailRows}
function quotationTitle(){return documentMode==='final'?'FINAL QUOTATION':'ESTIMATED QUOTATION'}
function quotationNoun(){return documentMode==='final'?'final quotation':'estimated quotation'}
const materialRows=[['18mm ply','Gurjan BWP ply wood'],['18mm Block Boards','All Doors 18mm Block Board (same brand as ply)'],['Laminates','Vigro, Lamitplus, Croma up to 1600 per sheet / Acrylic up to 3500 per sheet'],['Glass','Saint Gobain'],['Edge Binding','2mm'],['Hinges','Ebco/Nimmi Soft Closing'],['Sliding Track','Ebco/Nimmi Soft Closing'],['Telescopic Channels','Ebco/Nimmi Soft Closing'],['Chemical Used','Fevicol Marine'],['Draws','Each Wardrobes will have 2 Drawers'],['Handles','Brass/SS (150/- per piece)'],['Baskets - Tandem','Ebco/Nimmi Soft Closing']];
const noteItems=['Any additional works required by you other than the above annexure will be quoted and billed separately.','Client is responsible for subsequent delays due to any client uncertainties.','Quote value may vary subject to the client choice of material, design, site measurement changes during or after execution, and client modifications.','Electricity, water usage and accommodation space for workers shall be provided by the client at site.','Work once executed as per the initial agreed design cannot be modified. It can only be removed; rework shall be considered and billed as new extra work.','3D designing will be quoted separately - Rs. 15,000/-.','Deep cleaning and painting work is not included in this quotation.'];
const paymentItems=['10% of the contract value will be taken as token and we will start 3D design, if 3D design is needed.','30% of the contract value after finalization of design and final quote.','30% of the contract value upon completion of shelf work and laminate selection.','20% of the contract value after completion of laminate work.','5% of the contract value upon completion of 90% of work.','5% of the contract value upon handover.','GST extra as applicable in case of account or card payments.'];
function amountInWords(value){const ones=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'],tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];const underThousand=n=>{let words='';if(n>=100){words+=`${ones[Math.floor(n/100)]} Hundred`;n%=100;if(n)words+=' '}if(n>=20){words+=tens[Math.floor(n/10)];if(n%10)words+=` ${ones[n%10]}`}else if(n)words+=ones[n];return words};let n=Math.round(Number(value)||0);if(!n)return 'Rupees Zero Only';const groups=[['Crore',10000000],['Lakh',100000],['Thousand',1000]];let words='';groups.forEach(([name,size])=>{if(n>=size){words+=`${underThousand(Math.floor(n/size))} ${name} `;n%=size}});if(n)words+=underThousand(n);return `Rupees ${words.trim()} Only`}
function formalTermsHtml(){const word=documentMode==='final'?'final quotation':'estimated quotation';const terms=[`Any additional works required by you other than the above ${word} will be quoted and billed separately.`,...noteItems.slice(1)];return `<b>NOTE:</b><br>${terms.map(item=>`&bull; ${item}`).join('<br>')}<br><br><b>PAYMENT TERMS:</b><br>${paymentItems.map(item=>`&bull; ${item}`).join('<br>')}<br><br>If you have any questions or need changes, please feel free to contact us. We are committed to delivering quality service and look forward to working with you.<br><br>Thank you for considering our proposal. We await your response.`}
function qty(row){return row.l!==''&&row.h!==''?Number(row.l||0)*Number(row.h||0):Number(row.qty||0)}
function enableArrowNavigation(root,selector,keyName){
  if(root.dataset.arrowNavigation)return;
  root.dataset.arrowNavigation='true';
  root.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    const control=event.target.closest(selector);
    if(!control)return;
    const controls=[...root.querySelectorAll(selector)];
    const position=controls.indexOf(control);
    const isText=control.tagName==='INPUT'&&control.type==='text';
    if(isText&&event.key==='ArrowLeft'&&control.selectionStart>0)return;
    if(isText&&event.key==='ArrowRight'&&control.selectionStart<control.value.length)return;
    let target;
    if(event.key==='ArrowLeft')target=controls[position-1];
    if(event.key==='ArrowRight')target=controls[position+1];
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){
      const column=controls.filter(item=>item.dataset[keyName]===control.dataset[keyName]);
      target=column[column.indexOf(control)+(event.key==='ArrowUp'?-1:1)];
    }
    if(!target)return;
    event.preventDefault();
    target.focus();
    if(target.tagName==='INPUT'&&target.type==='text')target.select();
  });
}
function refreshModeUi(){const final=documentMode==='final';document.body.dataset.mode=documentMode;$('estimatedMode').classList.toggle('active',!final);$('estimatedMode').setAttribute('aria-pressed',String(!final));$('finalMode').classList.toggle('active',final);$('finalMode').setAttribute('aria-pressed',String(final));$('modeKicker').textContent=quotationTitle();$('liveMode').textContent=final?'LIVE FINAL QUOTATION':'LIVE ESTIMATE';$('modeDescription').textContent=final?'Final interior works':'Estimated interior works';$('termsHint').textContent=final?'These appear after the final quotation table.':'These appear after the estimate table.'}
function switchMode(mode){if(mode===documentMode)return;if(mode==='final')finalDetailRows=finalDetailRows||cloneRows(detailRows);documentMode=mode;refreshModeUi();renderRates();update();$('preview').hidden=true}
function renderRooms(){
  const root=$('rooms');
  root.innerHTML=rooms.map((room,index)=>`<div class="room"><label>Room / unit<input data-room="name" data-i="${index}" value="${room[0]}"></label><label>L<input type="number" step="0.1" data-room="l" data-i="${index}" value="${room[1]}"></label><label>H<input type="number" step="0.1" data-room="h" data-i="${index}" value="${room[2]}"></label><label>Qty<input data-room-qty="${index}" value="${(room[1]*room[2]).toFixed(1)}" readonly></label><button data-remove="${index}" title="Remove">×</button></div>`).join('');
  enableArrowNavigation(root,'[data-room]','room');
  root.querySelectorAll('[data-room]').forEach(input=>{
    input.addEventListener('input',()=>{
      const index=+input.dataset.i,key=input.dataset.room;
      rooms[index][key==='name'?0:key==='l'?1:2]=key==='name'?input.value:(input.value===''?'':Number(input.value));
      const quantity=root.querySelector(`[data-room-qty="${index}"]`);
      if(quantity)quantity.value=Number(rooms[index][1]||0)*Number(rooms[index][2]||0)?(Number(rooms[index][1]||0)*Number(rooms[index][2]||0)).toFixed(1):'0.0';
      update();
    });
    input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.blur()}});
  });
  root.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{rooms.splice(+button.dataset.remove,1);renderRooms();update()}));
}
function renderRates(){
  const root=$('rates'),active=quotationRows(),isFinal=documentMode==='final';
  let last='',html=`<div class="detail-table-wrap"><table class="detail-editor"><thead><tr><th>S.No</th><th>Description</th><th>L</th><th>H</th><th>Qty</th><th>Rate</th><th>Unit</th><th></th></tr></thead><tbody>`;
  active.forEach((row,index)=>{
    if(row.section!==last){html+=`<tr class="editor-section"><td colspan="8">${row.section}</td></tr>`;last=row.section}
    html+=`<tr><td>${index+1}</td><td><input data-d="name" data-i="${index}" value="${row.name}"></td><td><input data-d="l" data-i="${index}" type="number" step="0.1" value="${row.l}"></td><td><input data-d="h" data-i="${index}" type="number" step="0.1" value="${row.h}"></td><td><input data-d="qty" data-i="${index}" type="number" step="0.1" value="${qty(row).toFixed(1)}"></td><td><input data-d="rate" data-i="${index}" type="number" step="0.01" value="${row.rate}"></td><td><select data-d="unit" data-i="${index}"><option ${row.unit==='sft'?'selected':''}>sft</option><option ${row.unit==='lot'?'selected':''}>lot</option></select></td><td><button class="remove-line" data-delete="${index}" title="Remove item">×</button></td></tr>`;
  });
  const sections=[...new Set(active.map(row=>row.section))];
  const modeName=isFinal?'final quotation':'estimated quotation';
  const add=`<div class="final-builder"><div class="final-builder-head"><b>Add a complete ${modeName} item</b><small>Create a new section or add to an existing one. L × H is used when both measurements are entered; otherwise Qty is used.</small></div><div class="final-builder-grid"><label>Section<select id="builderSection"><option value="">Create new section</option>${sections.map(section=>`<option value="${section}">${section}</option>`).join('')}</select></label><label>New section name<input id="builderNewSection" placeholder="Example: STUDY ROOM"></label><label class="builder-wide">Item description<input id="builderName" placeholder="Example: Study table with storage"></label><label>L<input id="builderL" type="number" min="0" step="0.1" placeholder="0"></label><label>H<input id="builderH" type="number" min="0" step="0.1" placeholder="0"></label><label>Qty<input id="builderQty" type="number" min="0" step="0.1" value="1"></label><label>Rate<input id="builderRate" type="number" min="0" step="0.01" value="0"></label><label>Unit<select id="builderUnit"><option value="sft">sft</option><option value="lot">lot</option></select></label></div><button class="add" id="addDetail">+ Add ${isFinal?'final':'estimated'} item</button></div>`;
  root.innerHTML=html+'</tbody></table></div>'+add;
  enableArrowNavigation(root,'[data-d]','d');
  const saveField=input=>{
    const index=+input.dataset.i,key=input.dataset.d;
    active[index][key]=key==='name'||key==='unit'?input.value:(input.value===''?'':Number(input.value));
    if(key==='l'||key==='h'){
      const quantity=root.querySelector(`[data-d="qty"][data-i="${index}"]`);
      if(quantity)quantity.value=qty(active[index]).toFixed(1);
    }
    update();
  };
  root.querySelectorAll('[data-d]').forEach(input=>{
    input.addEventListener('input',()=>saveField(input));
    input.addEventListener('change',()=>saveField(input));
    input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();input.blur()}});
  });
  root.querySelectorAll('[data-delete]').forEach(button=>button.addEventListener('click',()=>{active.splice(+button.dataset.delete,1);renderRates();update()}));
  $('addDetail').addEventListener('click',()=>{
    const value=id=>$(id).value===''?'':Number($(id).value)||0;
    const section=($('builderSection').value||$('builderNewSection').value.trim().toUpperCase()||'OTHERS').trim();
    const row={section,name:$('builderName').value.trim()||'New item',l:value('builderL'),h:value('builderH'),qty:value('builderQty'),rate:value('builderRate'),unit:$('builderUnit').value};
    const index=active.map(item=>item.section).lastIndexOf(section);
    index<0?active.push(row):active.splice(index+1,0,row);
    renderRates();update();
  });
}
function items(){return quotationRows().map(row=>({...row,qty:qty(row),cost:qty(row)*Number(row.rate||0)}))}
function materialTableHtml(){return `<table class="material-table"><thead><tr><th>Sl.No</th><th>Particulars</th><th>Make</th></tr></thead><tbody>${materialRows.map((material,index)=>`<tr><td>${index+1}</td><td>${material[0]}</td><td>${material[1]}</td></tr>`).join('')}</tbody></table>`}
function update(){const quoteItems=items(),total=quoteItems.reduce((sum,item)=>sum+item.cost,0);$('total').textContent=money(total);$('count').textContent=quoteItems.length;$('sft').textContent=(Number($('area').value)||0).toLocaleString('en-IN')}
function load(file){if(!file)return;$('fileName').textContent=file.name;if(file.type.startsWith('image/')){const reader=new FileReader();reader.onload=event=>$('thumb').innerHTML=`<img src="${event.target.result}" alt="Uploaded floor plan" style="width:100%;height:100%;object-fit:cover">`;reader.readAsDataURL(file)}}
function build(){const client=$('client').value||'Client',location=$('location').value||'Project location',salutation=$('salutation')?.value||'Mam',title=quotationTitle(),noun=quotationNoun(),quoteItems=items();let section='',rows='';quoteItems.forEach((item,index)=>{if(item.section!==section){rows+=`<tr class="section"><td colspan="8">${item.section}</td></tr>`;section=item.section}const subtotal=quoteItems.filter(row=>row.section===item.section).reduce((sum,row)=>sum+row.cost,0);const last=!quoteItems[index+1]||quoteItems[index+1].section!==item.section;rows+=`<tr><td>${index+1}</td><td>${item.name}</td><td>${item.l===''?'-':item.l}</td><td>${item.h===''?'-':item.h}</td><td>${item.qty.toFixed(1)}</td><td>${Number(item.rate).toFixed(2)}</td><td>${item.unit}</td><td>${last?money(subtotal):money(item.cost)}</td></tr>`});const total=quoteItems.reduce((sum,item)=>sum+item.cost,0);$('paper').innerHTML=`<div class="qhead"><div><h3>SHREE VISTA INTERIORS</h3><small>Where Vision Meets Perfection | +91 9154027989 | shreevistainteriors@gmail.com</small></div><div class="qmeta"><b>${title}</b><br>Date: ${now.toLocaleDateString('en-IN')}<br>Ref: SVI-${now.getFullYear()}-${String(Date.now()).slice(-4)}</div></div><div class="intro"><b>To,</b><br>${client},<br>${location}<br><br><b>Subject:</b> Submission of ${noun} for the interior works of your ${$('bhk').value} flat.<br><br>Dear ${salutation},<br><br>Please find the ${noun} for the interior works of your ${$('bhk').value} flat. The quotation includes details on costs and materials.<br><br>The final quoted value is <b>${money(total)}/-</b>.</div><table class="qtable"><thead><tr><th>S.No</th><th>Description</th><th>L</th><th>H</th><th>Qty</th><th>Rate</th><th>Unit</th><th>Cost / Sub Total</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><th colspan="7">GRAND TOTAL</th><th>${money(total)}/-</th></tr><tr class="amount-words"><th colspan="8"><span>AMOUNT IN WORDS</span><b>${amountInWords(total)}</b></th></tr></tfoot></table><section class="material-block"><div class="qtitle">Material Description</div>${materialTableHtml()}</section><section class="terms-block"><div class="qtitle">Notes & Payment Terms</div><div class="qnotes">${formalTermsHtml()}</div></section><div class="sign"><span>Sumani Sai Reddy. D<br>Shree Vista Interiors</span><span>Client Signature</span></div>`;$('preview').hidden=false;$('preview').scrollIntoView({behavior:'smooth'});return {total}}
function filename(ext){const clean=value=>String(value||'').trim().replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'');const prefix=documentMode==='final'?'Final_Quotation':'Estimated_Quotation';return `${prefix}_${clean($('client').value||'Client')}_${clean($('location').value||'Project')}_${clean($('bhk').value)}.${ext}`}
function printCss(){return `<style>@page{size:A4;margin:10mm}*{box-sizing:border-box}body{font-family:Arial;padding:0;color:#171d18}.qhead{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;border-bottom:2px solid #1c382d;padding-bottom:14px}.qbrand{display:flex;align-items:center;gap:12px}.qbrand img{width:50px;height:50px}.qhead h3{font-size:22px;margin:0}.qhead small{color:#617166}.qmeta{text-align:right;font-size:12px}.qtable,.material-table{border-collapse:collapse;width:100%;font-size:10px;margin-top:16px}.qtable th,.material-table th{background:#1c382d;color:#fff;padding:7px;text-align:left}.qtable td,.material-table td{border:1px solid #cfd8d0;padding:6px;vertical-align:top}.material-table td:first-child{text-align:center;width:48px}.section td{background:#edf4ed;font-weight:bold;color:#1c382d;text-transform:uppercase}.qtable tfoot th{border:1px solid #cfd8d0;padding:8px;text-align:right}.qtable tfoot .amount-words th{background:#f1f5f1;color:#1c382d;display:flex;gap:16px;align-items:flex-start;text-align:left}.qtable tfoot .amount-words b{font-family:Georgia,serif;font-weight:400;font-style:italic;font-size:12px;line-height:1.35}.qtitle{font-weight:bold;color:#1c382d;margin:22px 0 7px}.qnotes{white-space:pre-line;font-size:11px;line-height:1.55}.sign{display:flex;justify-content:space-between;margin-top:45px;font-weight:bold}.sign span{border-top:1px solid #89978c;padding-top:7px;min-width:170px}tr,.qtitle,.sign,.material-block{break-inside:avoid;page-break-inside:avoid}.qtable .section{break-after:avoid;page-break-after:avoid}.qtable .section-total{break-before:avoid;page-break-before:avoid}</style>`}
function prepareDownload(){if($('preview').hidden)build();if(typeof addProfessionalDetails==='function')addProfessionalDetails();if(typeof separateSubtotals==='function')separateSubtotals()}
refreshModeUi();renderRooms();renderRates();update();
$('estimatedMode').addEventListener('click',()=>switchMode('estimated'));$('finalMode').addEventListener('click',()=>switchMode('final'));$('area').addEventListener('input',update);$('electric').addEventListener('input',()=>{const row=quotationRows().find(item=>/Electric Work/.test(item.name));if(row){row.rate=Number($('electric').value)||0;update()}});$('uploadBtn').addEventListener('click',()=>$('file').click());$('file').addEventListener('change',event=>load(event.target.files[0]));$('extractBtn').addEventListener('click',()=>{const found=[...$('extract').value.matchAll(/([^|]+?)\s*(\d+(?:\.\d+)?)\s*[xX×]\s*(\d+(?:\.\d+)?)/g)];if(found.length){rooms=found.map(match=>[match[1].trim(),Number(match[2]),Number(match[3])]);renderRooms()}else{$('extract').focus();$('extract').placeholder='No dimensions found. Try: Kitchen 12 x 9 | M.Bedroom 12 x 14'}});$('review').addEventListener('click',build);$('edit').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));$('word').addEventListener('click',()=>{prepareDownload();const blob=new Blob([`<html><head><meta charset="utf-8">${printCss()}</head><body>${$('paper').innerHTML}</body></html>`],{type:'application/msword'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=filename('doc');document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),1000)});$('pdf').addEventListener('click',()=>{prepareDownload();if(typeof downloadQuotationPdf==='function')downloadQuotationPdf();else alert('PDF export is still loading. Please try again.')});

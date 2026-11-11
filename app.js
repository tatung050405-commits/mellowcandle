
const $=s=>document.querySelector(s),app=$('#app'),g=n=>$('#'+n).value,err=t=>{$('#err').textContent=t};
const sb=SUPABASE_URL&&SUPABASE_ANON_KEY?supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):mockSb();
const S={user:null,pw:null};
const MK=["assets/group.jpg", "assets/morning-dew.jpg", "assets/warm-hug.jpg", "assets/quiet-night.jpg", "assets/sweet-escape.jpg", "assets/forest-walk.jpg", "assets/combo.jpg", "assets/mood-label.jpg"];
const PR=[[1, "Morning Dew", "Bình yên · Trà trắng &amp; cam chanh", "Tưởng tượng một buổi sáng cuối tuần, nắng nhẹ len qua rèm cửa, bên cạnh là tách trà thơm và chút gió mát từ khung cửa sổ. Hương trà trắng thanh dịu hòa cùng cam chanh tươi mát, nhẹ nhàng đánh thức mọi giác quan, như một buổi sáng trong lành vừa bắt đầu."], [2, "Warm Hug", "Ấm áp · Vanilla &amp; gỗ đàn hương", "Một buổi chiều trở về nhà sau ngày dài mệt mỏi, bạn thay bộ đồ thoải mái, cuộn mình trong chiếc chăn mềm và thưởng thức món bánh ngọt yêu thích. Hương vanilla ngọt ấm quyện cùng gỗ đàn hương dịu nhẹ, mang đến cảm giác thân thuộc như đang được ôm vào lòng."], [3, "Quiet Night", "Thư giãn · Lavender &amp; musk", "Đêm xuống, căn phòng chỉ còn ánh đèn vàng, một bản nhạc nhẹ và cuốn sách đang đọc dở. Hương lavender thoang thoảng hòa cùng musk mềm mại, tạo nên cảm giác thư thái, dễ chịu, như thể mọi ồn ào ngoài kia đã tạm dừng trước cửa phòng."], [4, "Sweet Escape", "Ngọt ngào · Đào &amp; hoa hồng", "Một buổi chiều đầy nắng, bạn tự thưởng cho mình một ngày không vội vã. Hương đào ngọt mọng hòa cùng chút mềm mại của hoa hồng, gợi nhớ đến khu vườn mùa hè đang nở rộ, ngọt ngào, tươi tắn và khiến tâm trạng cũng trở nên vui hơn."], [5, "Forest Walk", "Tươi mới · Gỗ tuyết tùng &amp; thông", "Hãy tưởng tượng một chuyến đi giữa rừng sau cơn mưa, không khí mát lành, lá cây còn đọng nước và mùi gỗ thoang thoảng trong gió. Hương thông tươi mát hòa cùng gỗ tuyết tùng trầm ấm, đem thiên nhiên vào căn phòng, nhẹ nhàng và bình yên."], [6, "Set Combo 5 Cảm Xúc", "5 cảm xúc · Morning Dew, Warm Hug, Quiet Night, Sweet Escape, Forest Walk", "Năm cảm xúc trong một hộp quà: buổi sáng trong lành của Morning Dew, cái ôm ấm áp của Warm Hug, đêm yên tĩnh của Quiet Night, chiều nắng ngọt ngào của Sweet Escape và chuyến đi giữa rừng sau mưa của Forest Walk. Chọn nến theo tâm trạng của bạn, thắp lên một khoảnh khắc."]];
const OK=['video/mp4','video/quicktime','video/webm','audio/mpeg','audio/wav','audio/x-wav','audio/mp4','audio/x-m4a','audio/ogg'],IMG=['image/jpeg','image/png','image/webp'];
const ic=(p,z=24)=>`<svg viewBox="0 0 24 24" width="${z}" height="${z}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const P={up:'<path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',ok:'<path class="dr" d="m5 12 5 5 9-10"/>'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const link=s=>location.origin+location.pathname+'#/m/'+s;
const bars=n=>Array.from({length:n},(_,i)=>`<i style="height:${20+(i*37)%80}%;animation-delay:${i*60}ms"></i>`).join('');
const copy=async(t,b)=>{try{await navigator.clipboard.writeText(t);b.textContent='Đã sao chép'}catch{b.textContent='Không sao chép được'}};
const bar=()=>`<header class="bar"><a href="#/" class="brand" aria-label="Mellow Candle"><img src="assets/logo.jpg" alt="Mellow Candle"></a><nav><a href="#/shop">Sản phẩm</a><a class="nm" href="#/mood">Mood Label</a><a href="#/dashboard">Thông điệp</a><a class="nm" href="#/music">Nhạc</a><a class="cartb" href="#/cart" aria-label="Giỏ hàng"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b id="cc"${cartN()?'':' hidden'}>${cartN()}</b></a>${S.user?'<button class="pillb" id="lo">Đăng xuất</button>':'<a class="dk" href="#/login">Đăng nhập</a>'}</nav></header>${sb.demo?'<div class="demo">Chế độ thử nghiệm · thông điệp và mã QR chỉ mở được trên đúng trình duyệt này. Điền Supabase để chia sẻ cho người khác.</div>':''}`;
const sel=(l,c)=>l.map(([k,t])=>`<option value="${k}"${k===c?' selected':''}>${t}</option>`).join('');
const fl=(t,h)=>`<label class="fl">${t}${h}</label>`;
const fields=v=>fl('Tiêu đề',`<input id="title" required placeholder="Ví dụ: Chúc mừng sinh nhật" value="${esc(v.title)}">`)+fl('Tên người gửi',`<input id="sender" required placeholder="Tên của bạn" value="${esc(v.sender_name)}">`)+fl('Tên người nhận (không bắt buộc)',`<input id="receiver" placeholder="Gửi cho ai?" value="${esc(v.receiver_name)}">`)+fl('Lời nhắn',`<textarea id="msg" rows="4" placeholder="Viết điều bạn muốn nói…">${esc(v.message_content)}</textarea>`);
const opts=(v,ed)=>{const c=v.template_id||'classic';return fl('Quyền riêng tư',`<select id="privacy">${sel([['public','Công khai (ai có link đều xem được)'],['private','Riêng tư (có thể đặt mật khẩu)']],v.privacy||'public')}</select>`)+`<input id="pw" type="password" placeholder="${ed&&v.password_hash?'Mật khẩu mới (để trống để giữ nguyên)':'Mật khẩu bảo vệ (tùy chọn)'}"${(v.privacy||'public')==='private'?'':' hidden'}>`+fl('Hết hạn',`<select id="exp">${sel([...(ed?[['','Giữ hạn hiện tại']]:[]),['0','Không hết hạn'],['7','Sau 7 ngày'],['30','Sau 30 ngày']],ed?'':'0')}</select>`)+`<div class="fl">Giao diện trang nhận<input type="hidden" id="tpl" value="${c}"><div class="sw">${[['classic','Classic','#F8F7F4'],['night','Night','#252525'],['sand','Sand','#e9dfd3']].map(([k,t,b])=>`<button type="button" data-t="${k}" class="${k===c?'sel':''}"><i style="background:${b}"></i>${t}</button>`).join('')}</div></div>`};
const wire=()=>{$('#privacy').onchange=e=>{$('#pw').hidden=e.target.value!=='private'};document.querySelectorAll('.sw button').forEach(b=>{b.onclick=()=>{$('#tpl').value=b.dataset.t;document.querySelectorAll('.sw button').forEach(x=>x.classList.toggle('sel',x===b))}})};
const fv=()=>({title:g('title'),sender:g('sender'),receiver:g('receiver'),msg:g('msg'),tpl:g('tpl'),privacy:g('privacy'),pw:g('pw'),exp:g('exp')});
const expiry=d=>d?new Date(Date.now()+d*864e5).toISOString():null;

function player(src){const w=document.createElement('div');w.className='pl';
 w.innerHTML=`<audio src="${src}"></audio><div class="wave big">${bars(32)}</div><div class="prow"><button class="pb" aria-label="Phát">▶</button><input type="range" aria-label="Tiến trình" min="0" max="1" step="0.1" value="0"><span>0:00 / 0:00</span></div>`;
 const a=w.querySelector('audio'),b=w.querySelector('button'),r=w.querySelector('input'),t=w.querySelector('span');
 const f=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00',u=()=>{t.textContent=f(a.currentTime)+' / '+f(a.duration)};
 b.onclick=()=>a.paused?a.play():a.pause();
 a.onplay=()=>{b.textContent='❚❚';w.classList.add('on')};a.onpause=a.onended=()=>{b.textContent='▶';w.classList.remove('on')};
 a.onloadedmetadata=()=>{r.max=a.duration||1;u()};a.ontimeupdate=()=>{r.value=a.currentTime;u()};r.oninput=()=>{a.currentTime=+r.value};return w}

function view(h,m){const T={classic:['#F8F7F4','#252525'],night:['#252525','#F8F7F4'],sand:['#e9dfd3','#252525']}[m.tpl]||['#F8F7F4','#252525'];
 h.style.cssText=(m.cover?`background:linear-gradient(#0006,#0009),url("${m.cover}") center/cover;color:#fff`:`background:${T[0]};color:${T[1]}`)+';min-height:100vh';
 h.innerHTML='<div class="rxin"><h1></h1><p class="g"></p><span class="orn"></span><div class="slot"></div><p class="mm"></p><p class="serif sn"></p><p class="dt"></p></div>';
 const q=s=>h.querySelector(s);q('h1').textContent=m.title;q('.g').textContent=m.receiver?`Gửi ${m.receiver},`:'';
 q('.mm').textContent=m.msg;q('.sn').textContent='— '+m.sender;q('.dt').textContent=m.date.toLocaleDateString('vi-VN');
 if(m.type==='video'){const v=document.createElement('video');v.src=m.src;v.controls=true;v.playsInline=true;q('.slot').replaceWith(v)}else q('.slot').replaceWith(player(m.src))}

function setup(){app.innerHTML=bar()+'<div class="wrap narrow"><h1 style="margin-top:40px">Cần cấu hình Supabase</h1><p class="mute">Mở file này, điền <b>SUPABASE_URL</b> và <b>SUPABASE_ANON_KEY</b> ở đầu thẻ script, chạy <b>schema.sql</b> trong SQL Editor của Supabase, rồi tải lại trang.</p><p><a class="btn o" href="#/">Về trang chủ</a></p></div>'}

function home(){const steps=[['Tải lên','Chọn video hoặc audio, thêm lời nhắn và ảnh bìa.'],['Tùy chỉnh','Đặt mật khẩu, ngày hết hạn và chọn giao diện.'],['Chia sẻ','Nhận link và mã QR để gửi cho người bạn thương.']];
 const feats=[['Video và audio','MP4, MOV, WebM, MP3, WAV, M4A, OGG, tối đa 50MB mỗi file.'],['Mật khẩu','Chỉ người biết mật khẩu mới mở được thông điệp.'],['Tự hết hạn','Không giới hạn, sau 7 ngày hoặc sau 30 ngày.'],['Mã QR riêng','Mỗi thông điệp có một link và mã QR, tải về dạng PNG.'],['Chia sẻ nhanh','Sao chép link hoặc chia sẻ thẳng từ điện thoại.']];
 const T=[['Classic','#F8F7F4','#252525'],['Night','#252525','#F8F7F4'],['Sand','#e9dfd3','#252525']];
 app.innerHTML=bar()+`<div class="hero"><div><p class="eyebrow rise">Chọn cảm xúc – Thắp khoảnh khắc</p><h1 class="rise">Every moment deserves to be remembered.</h1><p class="lead rise" style="--d:1">Gửi đi một khoảnh khắc, lưu giữ một cảm xúc.</p><div class="ac rise" style="--d:2"><a class="btn" href="#/create">Tạo thông điệp của bạn</a><a class="btn o" href="#/shop">Xem sản phẩm</a><button class="btn o" id="hw">Cách hoạt động</button></div></div>
<div class="mock rise" style="--d:3"><img class="hm" src="${MK[0]}" alt="5 hộp nến Mellow Candle"><div class="qc"><div id="hq"></div><small>Quét để mở</small></div></div></div>
<div class="band b-how"><section class="wrap wide" id="how"><p class="eyebrow">3 bước đơn giản</p><h2>Cách hoạt động</h2><div class="steps">${steps.map(([t,d],i)=>`<div><span>${i+1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section>
<section class="wrap wide"><p class="eyebrow">Tính năng nổi bật</p><h2>Tính năng</h2><div class="lst">${feats.map(([t,d])=>`<div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></section></div>
<div class="band b-prod"><section class="wrap wide"><p class="eyebrow">Bộ sưu tập</p><h2>5 cảm xúc, 5 mùi hương</h2><div class="pg">${cards()}</div></section></div>${moodSec()}${musicSec()}
<div class="wrap wide"><section class="cta"><h2>Bắt đầu với một khoảnh khắc</h2><p>Tạo thông điệp đầu tiên chỉ trong vài phút.</p><a class="btn" href="#/create">Tạo thông điệp</a></section></div><footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>`;
 window.QRCode&&new QRCode($('#hq'),{text:location.href.split('#')[0],width:88,height:88,colorDark:'#252525',colorLight:'#ffffff'});
 bindM();
 $('#hw').onclick=()=>$('#how').scrollIntoView({behavior:'smooth'})}

function login(){app.innerHTML=bar()+`<div class="wrap narrow"><div class="pn" style="margin-top:32px"><h1 id="lt" style="margin:0">Đăng nhập</h1><form id="lf"><input id="em" type="email" required placeholder="Email" autocomplete="email"><input id="lp" type="password" required minlength="6" placeholder="Mật khẩu"><div class="err" id="err" role="alert"></div><button class="btn">Đăng nhập</button></form><p style="margin:0;font-size:14px"><button class="u" id="tg">Chưa có tài khoản? Đăng ký</button></p></div></div>`;
 let up=false;$('#tg').onclick=()=>{up=!up;$('#lt').textContent=$('#lf button').textContent=up?'Đăng ký':'Đăng nhập';$('#tg').textContent=up?'Đã có tài khoản? Đăng nhập':'Chưa có tài khoản? Đăng ký'};
 $('#lf').onsubmit=async e=>{e.preventDefault();const c={email:g('em'),password:g('lp')};const{data,error}=up?await sb.auth.signUp(c):await sb.auth.signInWithPassword(c);
  if(error)return err(error.message);if(!data.session)return err('Kiểm tra email để xác nhận tài khoản, rồi đăng nhập.');location.hash='#/dashboard'}}

async function upload(file,w,o,pct){const p=`${S.user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g,'_')}`;
 if(sb.demo){await sb.storage.from('media').upload(p,file);pct(Math.round(o+w));return p}
 const{data,error}=await sb.storage.from('media').createSignedUploadUrl(p);if(error)throw error;
 try{await new Promise((ok,no)=>{const x=new XMLHttpRequest(),fd=new FormData();fd.append('cacheControl','3600');fd.append('',file);
  x.open('PUT',data.signedUrl);x.setRequestHeader('apikey',SUPABASE_ANON_KEY);
  x.upload.onprogress=e=>{if(e.lengthComputable)pct(Math.round(o+e.loaded/e.total*w))};
  x.onload=()=>x.status<300?ok():no(new Error('Tải lên thất bại ('+x.status+')'));x.onerror=()=>no(new Error('Mất kết nối'));x.send(fd)})}
 catch{const{error:e2}=await sb.storage.from('media').upload(p,file,{contentType:file.type});if(e2)throw e2}
 return p}

function create(){if(!S.user)return location.hash='#/login';let file=null,cover=null;
 app.innerHTML=bar()+`<div class="wrap"><h1>Tạo thông điệp</h1><form id="form"><section class="pn"><h3>Nội dung</h3>${fields({})}</section><section class="pn"><h3>Video hoặc âm thanh</h3><label id="drop">${ic(P.up)}<b>Kéo thả hoặc chọn file</b><small>MP4, MOV, WebM, MP3, WAV, M4A, OGG</small><small>Tối đa 50MB</small><input type="file" id="f" hidden accept="video/*,audio/*"></label><div id="mbox"></div>
<label class="fl">Ảnh bìa (tùy chọn) <span id="cn"></span><input type="file" id="cv" accept="image/jpeg,image/png,image/webp" style="margin-top:6px"></label></section><section class="pn"><h3>Cài đặt</h3>${opts({})}</section>
<div class="err" id="err" role="alert"></div><div class="bw" id="bw" hidden><div id="bp"></div></div><div class="ac"><button type="button" class="btn o" id="pv">Xem trước</button><button class="btn" id="go" style="flex:1">Tạo thông điệp</button></div></form></div>`;
 wire();
 const take=(f,img)=>{if(!f)return;const bad=f.size>52428800?'File vượt quá 50MB.':!(img?IMG:OK).includes(f.type)?'Định dạng không được hỗ trợ.':'';err(bad);if(bad)return;if(img){cover=f;$('#cn').textContent=f.name}else{file=f;paint()}};
 const paint=()=>{const b=$('#mbox');if(!file){b.innerHTML='';$('#drop').hidden=false;return}$('#drop').hidden=true;const u=URL.createObjectURL(file);
  b.innerHTML=(file.type.startsWith('video')?`<video src="${u}" controls playsinline></video>`:`<audio src="${u}" controls></audio>`)+'<div class="row2" style="font-size:12px;margin-top:8px"><span class="nm"></span><span><label class="u" style="cursor:pointer">Thay thế<input type="file" hidden id="re" accept="video/*,audio/*"></label> <button type="button" class="u" id="rm">Xóa</button></span></div>';
  b.querySelector('.nm').textContent=`${file.name} (${(file.size/1048576).toFixed(1)} MB)`;$('#re').onchange=e=>take(e.target.files[0]);$('#rm').onclick=()=>{file=null;paint()}};
 $('#f').onchange=e=>take(e.target.files[0]);$('#cv').onchange=e=>take(e.target.files[0],true);
 const dz=$('#drop');dz.ondragover=e=>{e.preventDefault();dz.classList.add('hv')};dz.ondragleave=()=>dz.classList.remove('hv');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('hv');take(e.dataTransfer.files[0])};
 const pct=n=>{$('#bp').style.width=n+'%';$('#go').textContent='Đang tải lên… '+n+'%'};
 $('#pv').onclick=()=>{if(!file)return err('Hãy chọn video hoặc audio để xem trước.');const v=fv(),o=document.createElement('div');o.id='ov';document.body.append(o);
  view(o,{title:v.title||'Tiêu đề',sender:v.sender,receiver:v.receiver,msg:v.msg,tpl:v.tpl,date:new Date(),type:file.type.startsWith('video')?'video':'audio',src:URL.createObjectURL(file),cover:cover&&URL.createObjectURL(cover)});
  const b=document.createElement('button');b.className='btn o';b.id='back';b.textContent='Quay lại chỉnh sửa';b.onclick=()=>o.remove();o.append(b)};
 $('#form').onsubmit=async e=>{e.preventDefault();if(!file)return err('Hãy chọn video hoặc audio.');const v=fv();$('#go').disabled=true;$('#bw').hidden=false;pct(0);let mp,cp=null;
  try{mp=await upload(file,cover?80:100,0,pct);if(cover)cp=await upload(cover,20,80,pct);const slug=crypto.randomUUID().replace(/-/g,'').slice(0,10);
   const{error}=await sb.from('messages').insert({slug,title:v.title,sender_name:v.sender,receiver_name:v.receiver||null,message_content:v.msg,media_type:file.type.startsWith('video')?'video':'audio',media_url:mp,cover_url:cp,privacy:v.privacy,password_hash:v.privacy==='private'&&v.pw?v.pw:null,expiration_date:expiry(+v.exp),template_id:v.tpl});
   if(error){await sb.storage.from('media').remove([mp,...(cp?[cp]:[])]);throw error}location.hash='#/success/'+slug}
  catch(x){err(x.message||'Tải lên thất bại, thử lại.');$('#go').disabled=false;$('#go').textContent='Tạo thông điệp'}}}

function success(slug){app.innerHTML=bar()+`<div class="ok"><div class="tick">${ic(P.ok,34)}</div><h1>Your moment is ready to share!</h1><p class="mute" style="margin:0 0 24px">Quét mã hoặc gửi đường link bên dưới cho người nhận.</p><div class="qwrap"><div id="qr"></div></div><p class="lk">${esc(link(slug))}</p>
<div class="ac"><button class="btn" id="cp">Sao chép link</button><button class="btn o" id="dl">Tải QR</button>${navigator.share?'<button class="btn o" id="sh">Chia sẻ</button>':''}<a class="btn o" href="#/m/${esc(slug)}">Xem thử</a></div></div>`;
 new QRCode($('#qr'),{text:link(slug),width:240,height:240,colorDark:'#252525',colorLight:'#ffffff'});
 $('#cp').onclick=e=>copy(link(slug),e.target);
 $('#dl').onclick=()=>{const a=document.createElement('a');a.href=$('#qr canvas').toDataURL('image/png');a.download=`mellow-candle-${slug}.png`;a.click()};
 if($('#sh'))$('#sh').onclick=()=>navigator.share({title:'Mellow Candle',url:link(slug)}).catch(()=>{})}

async function rcv(slug){const pw=S.pw;S.pw=null;const{data,error}=await sb.rpc('get_message',{p_slug:slug,p_password:pw});
 if(error){const c=error.message;
  if(c==='password_required'||c==='wrong_password'){app.innerHTML=`<form class="gate"><h2>Thông điệp được bảo vệ</h2><input id="gp" type="password" placeholder="Mật khẩu" required><div class="err">${c==='wrong_password'?'Sai mật khẩu.':''}</div><button class="btn">Mở</button></form>`;
   $('.gate').onsubmit=e=>{e.preventDefault();S.pw=g('gp');route()};return}
  app.innerHTML=`<p class="mid mute">${c==='expired'?'Thông điệp này đã hết hạn.':'Không tìm thấy thông điệp.'}</p>`;return}
 const sg=async p=>p?(await sb.storage.from('media').createSignedUrl(p,3600)).data?.signedUrl:null;
 view(app,{title:data.title,sender:data.sender_name,receiver:data.receiver_name,msg:data.message_content,tpl:data.template_id,date:new Date(data.created_at),type:data.media_type,src:await sg(data.media_url),cover:await sg(data.cover_url)})}

async function dashboard(){if(!S.user)return location.hash='#/login';
 app.innerHTML=bar()+'<div class="wrap wide"><div class="row2" style="margin-bottom:18px"><h1 style="margin:0">Thông điệp của bạn</h1><a class="btn" href="#/create">Tạo mới</a></div><input id="q" placeholder="Tìm theo tên hoặc tiêu đề" style="margin-bottom:14px"><div id="ls" class="dg"></div></div>';
 let rows=(await sb.from('messages').select('*').order('created_at',{ascending:false})).data||[];
 const draw=()=>{const q=g('q').toLowerCase();$('#ls').innerHTML=rows.filter(m=>(m.title+m.sender_name+(m.receiver_name||'')).toLowerCase().includes(q)).map(m=>{const dead=m.expiration_date&&new Date(m.expiration_date)<new Date();
  return`<div class="card"><div class="row2"><b>${esc(m.title)}</b><span class="pill${dead?' dead':''}">${dead?'Hết hạn':'Đang hoạt động'}</span></div><small class="mute">${esc(m.sender_name)} gửi ${esc(m.receiver_name||'—')}, ${new Date(m.created_at).toLocaleDateString('vi-VN')}</small>
  <div class="ac act"><a href="#/m/${esc(m.slug)}">Xem</a><a href="#/success/${esc(m.slug)}">QR</a><button class="u" data-c="${esc(m.slug)}">Sao chép link</button><a href="#/edit/${esc(m.id)}">Sửa</a><button class="u" data-d="${esc(m.id)}">Xóa</button></div></div>`}).join('')||'<div class="empty"><p class="mute" style="margin:0">Bạn chưa có thông điệp nào.</p><a class="btn" href="#/create">Tạo thông điệp đầu tiên</a></div>'};
 draw();$('#q').oninput=draw;
 $('#ls').onclick=async e=>{const c=e.target.dataset.c,d=e.target.dataset.d;if(c)copy(link(c),e.target);
  if(d&&confirm('Xóa thông điệp này và file đính kèm?')){const m=rows.find(x=>x.id===d);await sb.storage.from('media').remove([m.media_url,...(m.cover_url?[m.cover_url]:[])]);await sb.from('messages').delete().eq('id',d);rows=rows.filter(x=>x.id!==d);draw()}}}

async function edit(id){if(!S.user)return location.hash='#/login';const{data:v}=await sb.from('messages').select('*').eq('id',id).single();if(!v)return location.hash='#/dashboard';
 app.innerHTML=bar()+`<div class="wrap"><h1>Chỉnh sửa thông điệp</h1><form id="form"><section class="pn">${fields(v)}</section><section class="pn">${opts(v,true)}</section><div class="err" id="err" role="alert"></div><button class="btn">Lưu thay đổi</button></form></div>`;wire();
 $('#form').onsubmit=async e=>{e.preventDefault();const f=fv(),u={title:f.title,sender_name:f.sender,receiver_name:f.receiver||null,message_content:f.msg,privacy:f.privacy,template_id:f.tpl};
  if(f.exp!=='')u.expiration_date=expiry(+f.exp);if(f.privacy==='public')u.password_hash=null;else if(f.pw)u.password_hash=f.pw;
  const{error}=await sb.from('messages').update(u).eq('id',id);if(error)err(error.message);else location.hash='#/dashboard'}}


/* ====== Chế độ thử nghiệm: backend giả lập lưu trong trình duyệt ====== */
function mockSb(){
 let ls;try{ls=localStorage}catch{ls={getItem(){return null},setItem(){},removeItem(){}}}
 const K='mc_demo_v1';let db=null;try{db=JSON.parse(ls.getItem(K))}catch{}db=db||{u:[],m:[],s:null};
 const sv=()=>{try{ls.setItem(K,JSON.stringify(db))}catch{}},id=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8),usr=()=>db.u.find(u=>u.id===db.s)||null,files=new Map();
 const ses=()=>{const u=usr();return{data:{session:u?{user:{id:u.id,email:u.email}}:null}}};
 const auth={getSession:async()=>ses(),
  signUp:async c=>{if(db.u.some(u=>u.email===c.email))return{data:{},error:{message:'Email này đã được đăng ký.'}};const u={id:id(),email:c.email,password:c.password};db.u.push(u);db.s=u.id;sv();return ses()},
  signInWithPassword:async c=>{const u=db.u.find(x=>x.email===c.email&&x.password===c.password);if(!u)return{data:{},error:{message:'Sai email hoặc mật khẩu.'}};db.s=u.id;sv();return ses()},
  signOut:async()=>{db.s=null;sv()}};
 const storage={from:()=>({
  upload:async(p,f)=>{files.set(p,URL.createObjectURL(f));if(f.size<2.5e6){const r=new FileReader();r.onload=()=>{try{ls.setItem('mc_f_'+p,r.result)}catch{}};r.readAsDataURL(f)}return{error:null}},
  remove:async a=>{a.forEach(p=>{files.delete(p);try{ls.removeItem('mc_f_'+p)}catch{}});return{error:null}},
  createSignedUrl:async p=>{let u=files.get(p);if(!u){try{u=ls.getItem('mc_f_'+p)}catch{}}return{data:{signedUrl:u||null}}}})};
 const from=()=>{const q={op:'s',f:null,one:0,ord:0};
  const run=()=>{const h=r=>!q.f||r[q.f[0]]===q.f[1],u=db.s;
   if(q.op==='i'){db.m.push({id:id(),created_at:new Date().toISOString(),user_id:u,...q.r});sv();return{error:null}}
   if(q.op==='u'){db.m.filter(r=>h(r)&&r.user_id===u).forEach(r=>Object.assign(r,q.r));sv();return{error:null}}
   if(q.op==='d'){db.m=db.m.filter(r=>!(h(r)&&r.user_id===u));sv();return{error:null}}
   let d=db.m.filter(r=>h(r)&&r.user_id===u);if(q.ord)d=d.slice().sort((a,b)=>b.created_at.localeCompare(a.created_at));
   return{data:q.one?d[0]||null:d,error:null}};
  const o={select(){q.op='s';return o},insert(r){q.op='i';q.r=r;return o},update(r){q.op='u';q.r=r;return o},delete(){q.op='d';return o},eq(k,v){q.f=[k,v];return o},order(){q.ord=1;return o},single(){q.one=1;return o},then(a,b){return Promise.resolve(run()).then(a,b)}};return o};
 const rpc=async(n,a)=>{const m=db.m.find(r=>r.slug===a.p_slug);if(!m)return{error:{message:'not_found'}};
  if(m.expiration_date&&new Date(m.expiration_date)<new Date())return{error:{message:'expired'}};
  if(m.privacy==='private'&&m.password_hash){if(!a.p_password)return{error:{message:'password_required'}};if(a.p_password!==m.password_hash)return{error:{message:'wrong_password'}}}
  return{data:m,error:null}};
 return{demo:1,auth,storage,from,rpc}}

/* ====== Nhạc thư giãn ngẫu nhiên (tự tạo bằng Web Audio, không cần file) ====== */
const MU=(()=>{
 const P=[['Morning Dew',62,[0,2,4,7,9],'sine',[2.4,5],.07,0],['Warm Hug',53,[0,2,4,7,11],'triangle',[3,6],.09,0],['Quiet Night',57,[0,3,5,7,10],'sine',[3.5,7],.08,.02],['Sweet Escape',64,[0,2,4,7,9],'triangle',[2,4.2],.06,0],['Forest Walk',50,[0,2,3,7,9],'sine',[3,6],.08,.05]];
 let cx,lp,cur=-1,on=false,bus=null,ns=null,sid=0,tm=[];
 const F=m=>440*2**((m-69)/12),R=(a,b)=>a+Math.random()*(b-a),T=(f,ms)=>tm.push(setTimeout(f,ms));
 const ui=()=>{const b=document.getElementById('mpb'),t=document.getElementById('mpt'),n=document.getElementById('mpn');if(!b)return;b.textContent=on?'❚❚':'♪';b.setAttribute('aria-label',on?'Tạm dừng nhạc':'Phát nhạc thư giãn');t.textContent=on?'Đang phát: '+P[cur][0]:'Nhạc thư giãn';n.hidden=!on;const np=document.getElementById('np');if(np)np.textContent=on?'Đang phát: '+P[cur][0]:'Chưa phát';const ms=document.getElementById('ms');if(ms)ms.hidden=!on;document.querySelectorAll('.tk').forEach(e=>e.classList.toggle('on',on&&+e.dataset.m===cur))};
 const init=()=>{if(cx)return;cx=new(window.AudioContext||window.webkitAudioContext)();lp=cx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;
  const d=cx.createDelay(2),fb=cx.createGain(),wet=cx.createGain(),fl=cx.createBiquadFilter();d.delayTime.value=.55;fb.gain.value=.45;wet.gain.value=.5;fl.type='lowpass';fl.frequency.value=1600;
  lp.connect(cx.destination);lp.connect(d);d.connect(fl);fl.connect(fb);fb.connect(d);d.connect(wet);wet.connect(cx.destination)};
 const osc=(t,f,ty,v,at,dur,b)=>{const o=cx.createOscillator(),g=cx.createGain();o.type=ty;o.frequency.value=f;o.detune.value=R(-6,6);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(b);o.start(t);o.stop(t+dur+.1)};
 const stop=()=>{sid++;tm.forEach(clearTimeout);tm=[];if(bus){const b=bus,n=ns;b.gain.setTargetAtTime(0,cx.currentTime,.5);setTimeout(()=>{try{b.disconnect();n&&n.stop()}catch{}},3500)}bus=ns=null;on=false;ui()};
 const go=i=>{const[,r,s,w,gp,pv,nz]=P[i],b=cx.createGain(),id=++sid;b.gain.value=0;b.connect(lp);b.gain.setTargetAtTime(1,cx.currentTime,1.2);bus=b;
  const sc=[-12,0,12].flatMap(o=>s.map(x=>r+o+x));
  const pad=()=>{if(id!==sid)return;const k=R(0,6)|0,t=cx.currentTime+.05;[sc[k],sc[k+2],sc[k+4]].forEach(m=>{osc(t,F(m),w,pv,3.5,12,b);osc(t,F(m),'sine',pv*.7,4,12,b)});T(pad,R(7500,10500))};
  const mel=()=>{if(id!==sid)return;if(Math.random()>.22){const m=sc[5+(R(0,10)|0)],t=cx.currentTime+.05;osc(t,F(m),'sine',.09,.03,4.5,b);osc(t,F(m)*2.01,'sine',.025,.02,2.2,b)}T(mel,R(gp[0],gp[1])*1000)};
  pad();T(mel,2500);
  if(nz){const bf=cx.createBuffer(1,cx.sampleRate*3,cx.sampleRate),x=bf.getChannelData(0);let l=0;for(let j=0;j<x.length;j++){l=(l+.02*(Math.random()*2-1))/1.02;x[j]=l*3.5}ns=cx.createBufferSource();ns.buffer=bf;ns.loop=true;const g=cx.createGain();g.gain.value=nz*2.5;ns.connect(g);g.connect(b);ns.start()}
  cur=i;on=true;ui();T(()=>MU.next(),R(110,170)*1000)};
 const rnd=()=>{let i;do i=Math.random()*P.length|0;while(i===cur&&P.length>1);return i};
 const play=i=>{try{init();cx.resume();if(bus)stop();go(i==null?rnd():i)}catch(e){console.warn(e)}};
 return{ui,play,next:()=>play(),toggle:()=>on?stop():play(),stop,get on(){return on}}})();
document.body.insertAdjacentHTML('beforeend','<div id="mp" role="region" aria-label="Nhạc thư giãn"><button id="mpb" aria-label="Phát nhạc thư giãn">♪</button><span id="mpt">Nhạc thư giãn</span><button id="mpn" aria-label="Bài khác" title="Bài ngẫu nhiên khác" hidden>⏭</button></div>');
document.getElementById('mpb').onclick=()=>MU.toggle();document.getElementById('mpn').onclick=()=>MU.next();

/* ====== Cửa hàng: giá bán (₫) theo thứ tự Morning Dew, Warm Hug, Quiet Night, Sweet Escape, Forest Walk. SỬA GIÁ TẠI ĐÂY ====== */
const money=n=>n.toLocaleString('vi-VN')+'₫';
const DT=[['Buổi sáng','Hương trà trắng thanh dịu hòa cùng cam chanh tươi mát, nhẹ nhàng đánh thức mọi giác quan. Một lựa chọn gọn nhẹ để bắt đầu ngày mới trong lành, hợp với bàn làm việc hay góc cửa sổ đầy nắng.'],
['Buổi chiều','Vanilla ngọt ấm quyện cùng gỗ đàn hương dịu nhẹ, mang lại cảm giác thân thuộc như được ôm vào lòng. Hợp cho buổi chiều trở về nhà, khi bạn muốn cuộn mình trong chiếc chăn mềm.'],
['Buổi tối','Lavender thoang thoảng hòa cùng musk mềm mại, tạo cảm giác thư thái và dễ chịu. Dành cho những đêm yên tĩnh bên ánh đèn vàng, một bản nhạc nhẹ và cuốn sách đang đọc dở.'],
['Buổi chiều','Đào ngọt mọng cùng chút mềm mại của hoa hồng, gợi nhớ khu vườn mùa hè đang nở rộ. Hương thơm ngọt ngào, tươi tắn giúp tâm trạng thêm vui, hợp để tự thưởng cho mình một ngày không vội vã.'],
['Sau cơn mưa','Hương thông tươi mát hòa cùng gỗ tuyết tùng trầm ấm, đem thiên nhiên vào căn phòng. Nhẹ nhàng và bình yên như một chuyến đi giữa rừng sau cơn mưa.'],['Cả ngày','Bộ quà gồm 5 nến thơm 100 g, mỗi nến một cảm xúc: Morning Dew, Warm Hug, Quiet Night, Sweet Escape và Forest Walk. Hộp quà in họa tiết bản đồ địa hình, logo Mellow Candle ở mặt nắp, kèm thẻ Mood Label để chọn nến theo tâm trạng.']];
function shop(){app.innerHTML=bar()+`<div class="wrap wide"><h1 style="margin-top:12px">Sản phẩm</h1><p class="mute" style="margin:0 0 28px">5 cảm xúc, 5 mùi hương. Nến thơm 100 g, mỗi hộp kèm thiệp cảm ơn và câu chuyện riêng.</p><div class="pg">${cards()}</div></div><footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>`;bindM()}

/* ====== Giỏ hàng ====== */
const WT=i=>i===5?'5 × 100 g':'100 g';
let CART=[];try{CART=JSON.parse(localStorage.getItem('mc_cart')||'[]').filter(x=>PR[x.i])}catch{}
const cartN=()=>CART.reduce((a,x)=>a+x.q,0);
const saveCart=()=>{try{localStorage.setItem('mc_cart',JSON.stringify(CART))}catch{}const e=document.getElementById('cc');if(e){e.textContent=cartN();e.hidden=!cartN()}};
const addCart=(i,q=1)=>{const x=CART.find(c=>c.i===i);x?x.q=Math.min(20,x.q+q):CART.push({i,q:Math.min(20,q)});saveCart()};
function toast(m){let t=document.getElementById('tst');if(!t){t=document.createElement('div');t.id='tst';t.setAttribute('role','status');document.body.appendChild(t)}t.textContent=m;t.className='on';clearTimeout(toast.t);toast.t=setTimeout(()=>t.className='',2200)}
const cards=ex=>PR.map(([k,n,d,t],i)=>ex===i?'':`<figure class="pc" style="--tc:${COL[i]}"><a href="#/p/${i}"><img src="${MK[k]}" alt="${n}" loading="lazy"></a><figcaption><b class="serif">${n}</b><span>${d}</span><strong class="pr">${money(PRICES[i])} · ${WT(i)}</strong><small class="sl">Câu chuyện hương</small><p class="st">${t}</p><div class="ac" style="justify-content:center"><a class="btn" href="#/p/${i}">Xem chi tiết</a><button class="btn o" data-a="${i}">Thêm vào giỏ</button></div><button class="u mb" data-m="${i<5?i:''}">♪ Nghe nhạc</button></figcaption></figure>`).join('');
function bindM(){document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>b.dataset.m===''?MU.play():MU.play(+b.dataset.m));document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{addCart(+b.dataset.a);toast('Đã thêm vào giỏ hàng')});const r=document.getElementById('mr');if(r){r.onclick=()=>MU.play();document.getElementById('ms').onclick=()=>MU.stop()}MU.ui();bindMood()}
function musicSec(){return `<div class="band b-music"><section class="wrap wide" id="mus"><p class="eyebrow">Thư giãn</p><h2>Nghe nhạc thư giãn</h2><p class="mute" style="margin:-8px 0 20px;max-width:560px">Mỗi cảm xúc có một bản nhạc nền êm dịu riêng. Bấm phát để nghe một bản ngẫu nhiên, hoặc tự chọn bản bạn thích.</p><div class="ac"><button class="btn" id="mr">♪ Phát ngẫu nhiên</button><button class="btn o" id="ms" hidden>Dừng nhạc</button></div><p class="mute" id="np" style="margin:14px 0 18px" aria-live="polite">Chưa phát</p><div class="tl">${PR.slice(0,5).map(([k,n,d],i)=>`<button class="tk" data-m="${i}"><img src="${MK[k]}" alt=""><span><b class="serif">${n}</b><small>${d.split(' · ')[0]}</small></span><i>♪</i></button>`).join('')}</div></section></div>`}
function musicPage(){app.innerHTML=bar()+musicSec()+'<footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>';bindM()}
function prod(a){const i=+a,x=PR[i];if(!x)return location.hash='#/shop';const[k,n,d,t]=x,[tm,ds]=DT[i],[mood,notes]=d.split(' · '),pr=PRICES[i],cb=i===5;
 app.innerHTML=bar()+`<div class="wrap wide"><a class="mute bk" href="#/shop">← Tất cả sản phẩm</a><div class="pd"><div><img class="hm" src="${MK[k]}" alt="${n}"></div><div><small class="sl">${mood}</small><h1>${n}</h1><div class="pp"><b class="serif">${money(pr)}</b><span class="chip">${WT(i)}</span></div><p class="mute" style="margin:0 0 18px">${ds}</p>
<div class="pn"><div class="rw"><span>Số lượng</span><span class="qs"><button type="button" id="qm" aria-label="Giảm">−</button><b id="qn">1</b><button type="button" id="qp" aria-label="Tăng">+</button></span></div><div class="rw"><span class="mute">Tạm tính</span><b class="serif" id="tt">${money(pr)}</b></div><div class="ac"><button class="btn" id="ac">Thêm vào giỏ</button><button class="btn o" id="bn">Đặt hàng ngay</button></div><small class="mute">Chưa gồm phí vận chuyển.</small></div></div></div>
<div class="steps" style="margin-bottom:56px"><div><h3>Câu chuyện hương</h3><p>${t}</p></div><div><h3>Thông tin sản phẩm</h3><dl class="inf"><dt>Khối lượng</dt><dd>${cb?'5 nến × 100 g':'100 g'}</dd><dt>Mùi hương</dt><dd>${notes}</dd><dt>Cảm xúc</dt><dd>${mood}</dd><dt>Thời điểm gợi ý</dt><dd>${tm}</dd><dt>Đóng gói</dt><dd>${cb?'Hộp quà in họa tiết bản đồ địa hình màu vàng kem, logo Mellow Candle ở mặt nắp, kèm thẻ Mood Label.':'Hộp giấy in họa tiết riêng, kèm thiệp cảm ơn, câu chuyện sản phẩm, hướng dẫn sử dụng và mã QR dẫn tới trang web.'}</dd></dl></div><div><h3>Hướng dẫn sử dụng</h3><ul class="us"><li>Cắt bấc còn khoảng 0,5 cm trước mỗi lần thắp.</li><li>Đặt nến trên bề mặt phẳng, chịu nhiệt, tránh gió và xa vật dễ cháy.</li><li>Không để nến cháy khi không có người trông; để xa tầm tay trẻ em và thú cưng.</li><li>Dập nến bằng nắp hoặc dụng cụ dập nến, chờ nguội hẳn rồi mới di chuyển.</li></ul></div></div>
<h2>Sản phẩm khác</h2><div class="pg">${cards(i)}</div></div><footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>`;bindM();
 let q=1;const up=()=>{$('#qn').textContent=q;$('#tt').textContent=money(pr*q)};$('#qm').onclick=()=>{q=Math.max(1,q-1);up()};$('#qp').onclick=()=>{q=Math.min(20,q+1);up()};
 $('#ac').onclick=()=>{addCart(i,q);toast('Đã thêm vào giỏ hàng')};$('#bn').onclick=()=>{addCart(i,q);location.hash='#/cart'}}
function cartPage(){
 const lines=()=>CART.filter(x=>PR[x.i]),sub=()=>lines().reduce((a,x)=>a+PRICES[x.i]*x.q,0);
 const fees=()=>(($('#gw')&&$('#gw').checked)?FEES.wrap:0)+(($('#gq')&&$('#gq').checked)?FEES.qr:0),gt=()=>sub()+fees();
 const row=x=>{const[k,n]=PR[x.i];return `<div class="ci" data-i="${x.i}"><a href="#/p/${x.i}"><img src="${MK[k]}" alt=""></a><div><b class="serif">${n}</b><small class="mute">${WT(x.i)} · ${money(PRICES[x.i])}</small><span class="qs"><button type="button" data-q="-1" aria-label="Giảm số lượng">−</button><b class="qv">${x.q}</b><button type="button" data-q="1" aria-label="Tăng số lượng">+</button></span></div><div class="cr"><b class="lt">${money(PRICES[x.i]*x.q)}</b><button type="button" class="u" data-x>Xóa</button></div></div>`};
 const L=lines();
 app.innerHTML=bar()+`<div class="wrap wide"><h1 style="margin-top:12px">Giỏ hàng</h1>`+(L.length?`<div class="pd"><div class="pn" id="cl" style="gap:0">${L.map(row).join('')}</div><form id="of" class="pn"><h3 style="margin:0">Thông tin nhận hàng</h3>${fl('Họ và tên','<input id="on" required autocomplete="name">')}${fl('Số điện thoại','<input id="op" type="tel" required autocomplete="tel">')}${fl('Địa chỉ nhận hàng','<input id="oa" required autocomplete="street-address">')}${fl('Ghi chú (không bắt buộc)','<textarea id="ot" rows="2"></textarea>')}${giftBox()}<div class="sm"><div class="rw"><span class="mute" id="cnt"></span><b id="sub"></b></div><div class="rw" id="fgr" hidden><span class="mute">Phí quà tặng</span><b id="fg"></b></div><div class="rw tot"><span>Tổng cộng</span><b class="serif" id="ttc"></b></div></div><div class="err" id="err" role="alert"></div><button class="btn">Đặt hàng</button><small class="mute">Chưa gồm phí vận chuyển.</small></form></div>`:`<p class="mute">Giỏ hàng đang trống.</p><a class="btn" href="#/shop">Xem sản phẩm</a>`)+`</div><footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>`;
 if(!L.length)return;
 const upd=()=>{$('#cnt').textContent=`Tạm tính (${cartN()} sản phẩm)`;$('#sub').textContent=money(sub());const f=fees();$('#fgr').hidden=!f;$('#fg').textContent=money(f);$('#ttc').textContent=money(gt())};upd();
 $('#cl').onclick=e=>{const b=e.target.closest('button');if(!b)return;const r=b.closest('.ci'),i=+r.dataset.i,x=CART.find(c=>c.i===i);if(!x)return;
  if(b.dataset.q){x.q=Math.min(20,Math.max(1,x.q+Number(b.dataset.q)));r.querySelector('.qv').textContent=x.q;r.querySelector('.lt').textContent=money(PRICES[i]*x.q)}
  else if('x' in b.dataset){CART=CART.filter(c=>c.i!==i);saveCart();if(!CART.length)return cartPage();r.remove()}
  saveCart();upd()};
 $('#gw').onchange=()=>{$('#gwb').hidden=!$('#gw').checked;upd()};$('#gq').onchange=()=>{$('#gqb').hidden=!$('#gq').checked;upd()};
 $('#of').onsubmit=e=>{e.preventDefault();const ph=g('op').trim();if(!/^[0-9 +.\-]{8,15}$/.test(ph))return err('Số điện thoại chưa đúng.');
  const it=lines(),o={code:'MC-'+Date.now().toString(36).toUpperCase().slice(-6),at:new Date().toISOString(),items:it.map(x=>({n:PR[x.i][1],q:x.q,p:PRICES[x.i]})),total:gt(),gift:{wrap:$('#gw').checked,to:g('gt').trim(),qr:$('#gq').checked,link:g('gl').trim()},name:g('on').trim(),phone:ph,addr:g('oa').trim(),note:g('ot').trim()};
  try{const O=JSON.parse(localStorage.getItem('mc_orders')||'[]');O.push(o);localStorage.setItem('mc_orders',JSON.stringify(O))}catch{}
  const txt=`Đơn hàng Mellow Candle ${o.code}\n`+o.items.map(x=>`- ${x.n} x ${x.q}: ${money(x.p*x.q)}`).join('\n')+`\nTổng cộng: ${money(o.total)}\nNgười nhận: ${o.name}, ${o.phone}\nĐịa chỉ: ${o.addr}`+(o.note?`\nGhi chú: ${o.note}`:'')+(o.gift.wrap?`\nĐóng gói quà tặng`+(o.gift.to?` cho ${o.gift.to}`:''):'')+(o.gift.qr?`\nThiệp QR: `+(o.gift.link||'chưa có link'):'');
  CART=[];saveCart();
  app.innerHTML=bar()+`<div class="wrap narrow"><div class="pn ok2" style="margin-top:40px"><div class="tick">${ic(P.ok,34)}</div><h3>Đã tạo đơn hàng</h3><p class="mute" style="margin:0">Mã đơn <b>${o.code}</b>. Đơn chưa được gửi tới cửa hàng: hãy sao chép nội dung dưới đây và gửi cho cửa hàng để xác nhận.</p><pre class="od"></pre><button class="btn o" id="cpo">Sao chép đơn hàng</button><a class="btn" href="#/shop">Tiếp tục mua sắm</a></div></div>`;
  $('.od').textContent=txt;$('#cpo').onclick=ev=>copy(txt,ev.target)}}

/* ====== Mood Label: trắc nghiệm tâm trạng 7 câu + chọn nhanh theo cảm xúc ====== */
const COL=['#A7C6EC','#F4A85C','#B8A5DA','#F2B1C9','#A9CC8B','#D9B77A'];
const MD=[['Tươi mới','#A9CC8B',4],['Ấm áp','#F4A85C',1],['Thư giãn','#B8A5DA',2],['Ngọt ngào','#F2B1C9',3],['Bình yên','#A7C6EC',0]];
/* Mỗi đáp án: [nội dung, [điểm cho Morning Dew, Warm Hug, Quiet Night, Sweet Escape, Forest Walk], điểm combo (tùy chọn)] */
const QZ=[
['Lúc này bạn đang cảm thấy thế nào?',[['Hơi mệt, cần được xoa dịu',[0,2,1,0,0]],['Tràn đầy năng lượng, muốn bắt đầu điều mới',[2,0,0,1,1]],['Căng thẳng, đầu óc nhiều suy nghĩ',[0,0,2,0,1]],['Vui vẻ, muốn tự thưởng cho mình',[0,1,0,2,0]]]],
['Bạn hay thắp nến vào lúc nào?',[['Buổi sáng, trước khi bắt đầu ngày mới',[2,0,0,0,1]],['Buổi chiều, lúc vừa về đến nhà',[0,2,0,1,0]],['Buổi tối, khi muốn thư giãn một mình',[0,1,2,0,0]],['Cuối tuần, lúc rảnh rỗi',[0,0,0,2,1]]]],
['Bạn sẽ đặt nến ở đâu?',[['Bàn làm việc hoặc góc cửa sổ',[2,0,0,0,1]],['Phòng khách, cạnh ghế sofa',[0,2,0,1,0]],['Phòng ngủ, đầu giường',[0,0,2,0,0]],['Gần cây xanh hoặc ban công',[1,0,0,0,2]],['Bàn trang điểm, góc chụp ảnh đẹp',[0,0,0,2,0]]]],
['Bạn thích nhóm hương nào?',[['Tươi mát: trà, cam chanh',[2,0,0,0,0]],['Ngọt ấm: vanilla, gỗ đàn hương',[0,2,0,0,0]],['Dịu nhẹ: lavender, musk',[0,0,2,0,0]],['Ngọt hoa quả: đào, hoa hồng',[0,0,0,2,0]],['Cây cối: thông, tuyết tùng',[0,0,0,0,2]]]],
['Một ngày cuối tuần lý tưởng của bạn là?',[['Pha trà, đọc sách bên cửa sổ',[2,0,1,0,0]],['Ở nhà nấu ăn, làm bánh',[0,2,0,1,0]],['Đi dạo công viên, ra ngoại ô',[0,0,0,0,2]],['Dạo phố, cà phê cùng bạn bè',[0,0,0,2,1]]]],
['Bạn muốn mùi hương mang lại điều gì?',[['Sự tỉnh táo, một khởi đầu mới',[2,0,0,0,1]],['Cảm giác được ôm ấp, an toàn',[0,2,0,0,0]],['Giấc ngủ ngon, sự yên tĩnh',[0,0,2,0,0]],['Niềm vui và chút lãng mạn',[0,0,0,2,0]],['Cảm giác gần gũi thiên nhiên',[0,0,0,0,2]]]],
['Bạn chọn nến cho ai?',[['Cho riêng mình',[0,0,0,0,0],0],['Tặng một người thân thiết',[0,0,0,0,0],1],['Tặng nhiều người, hoặc muốn thử cả 5 mùi',[0,0,0,0,0],3]]]];
let QS={s:-1,a:[]};
const pc2=i=>{const[k,n,d,t]=PR[i],q=d.split(' · ');return{k,n,t,mood:q[0],notes:q[1]}};
function moodSec(){return `<div class="band b-mood"><section class="wrap wide" id="mood"><p class="eyebrow">Mood Label</p><h2>Chọn mùi hương theo cảm xúc</h2><p class="mute" style="margin:-4px 0 22px;max-width:620px">Trả lời 7 câu hỏi ngắn về tâm trạng của bạn, hoặc chọn nhanh một cảm xúc, để tìm mùi hương hợp nhất.</p><div class="mg"><div><img class="hm" src="${MK[7]}" alt="Thẻ Mood Label của Mellow Candle"></div><div><div class="tabs"><button class="tb on" data-tab="q">Trắc nghiệm 7 câu</button><button class="tb" data-tab="d">Chọn nhanh</button></div><div id="mq"></div><div id="md" hidden><div class="dots" role="group" aria-label="Chọn cảm xúc">${MD.map(([m,c],j)=>`<button class="dt" data-md="${j}" style="--c:${c}"><i></i><span>${m}</span></button>`).join('')}</div><div id="mres"></div></div></div></div></section></div>`}
function quizResult(){const sc=[0,0,0,0,0];let cb=0;QS.a.forEach((j,qi)=>{const o=QZ[qi][1][j];o[1].forEach((w,k)=>sc[k]+=w);cb+=o[2]||0});
 const ord=[0,1,2,3,4].sort((a,b)=>sc[b]-sc[a]||a-b),top=ord[0],sec=ord[1],mx=Math.max(...sc,1),main=cb>=3?5:top,ex=main===5?[top,sec]:[sec].concat(sc[top]-sc[sec]<=2?[5]:[]),m=pc2(main);
 return `<div class="zq" style="--tc:${COL[main]}"><p class="script">Tâm trạng của bạn: ${pc2(top).mood}</p><small class="sl">Gợi ý dành cho bạn</small><div class="mr2"><img src="${MK[m.k]}" alt="${m.n}"><div><h3 class="serif">${m.n}</h3><span class="mute">${m.notes}</span><p class="st" style="margin:8px 0">${m.t}</p><b class="pr">${money(PRICES[main])} · ${WT(main)}</b><div class="ac"><a class="btn" href="#/p/${main}">Xem chi tiết</a><button class="btn o" data-add="${main}">Thêm vào giỏ</button></div></div></div><div class="zbs">${[0,1,2,3,4].map(k=>`<div class="zb"><span>${PR[k][1]}</span><i style="--bc:${COL[k]};width:${Math.round(8+92*sc[k]/mx)}%"></i></div>`).join('')}</div><p class="mute" style="margin:14px 0 6px">Cũng có thể hợp với bạn:</p><div class="xs">${ex.map(i=>{const p=pc2(i);return `<a class="xr" href="#/p/${i}"><img src="${MK[p.k]}" alt=""><span><b class="serif">${p.n}</b><small class="mute">${money(PRICES[i])}</small></span></a>`}).join('')}</div><button class="u mute" data-z="again" style="margin-top:12px">Làm lại trắc nghiệm</button></div>`}
function quizRender(){const el=document.getElementById('mq');if(!el)return;const N=QZ.length;let h;
 if(QS.s<0)h=`<div class="zq"><p class="script">Bạn đang cảm thấy thế nào?</p><p class="mute" style="margin:0 0 16px">7 câu hỏi, khoảng 1 phút. Không có đáp án đúng hay sai, hãy chọn điều gần với bạn nhất.</p><button class="btn" data-z="start">Bắt đầu</button></div>`;
 else if(QS.s<N){const[q,o]=QZ[QS.s];h=`<div class="zq"><div class="zp"><i style="width:${QS.s/N*100}%"></i></div><small class="mute">Câu ${QS.s+1}/${N}</small><h3 class="serif">${q}</h3>${o.map(([t],j)=>`<button class="zo${QS.a[QS.s]===j?' on':''}" data-o="${j}">${t}</button>`).join('')}${QS.s?'<button class="u mute" data-z="back">← Câu trước</button>':''}</div>`}
 else h=quizResult();
 el.innerHTML=h;
 el.onclick=e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.o!==undefined){QS.a[QS.s]=+d.o;QS.s++;quizRender()}else if(d.z==='start'){QS={s:0,a:[]};quizRender()}else if(d.z==='back'){QS.s--;quizRender()}else if(d.z==='again'){QS={s:-1,a:[]};quizRender()}
  else if(d.add!==undefined){addCart(+d.add);toast('Đã thêm vào giỏ hàng')}}}
function moodShow(j){const[m,,i]=MD[j],p=pc2(i);document.querySelectorAll('.dt').forEach(b=>b.classList.toggle('on',+b.dataset.md===j));
 document.getElementById('mres').innerHTML=`<div class="mr2"><img src="${MK[p.k]}" alt="${p.n}"><div><small class="sl">${m}</small><h3 class="serif" style="margin:2px 0">${p.n}</h3><span class="mute">${p.notes}</span><p class="st" style="margin:8px 0">${p.t}</p><b class="pr">${money(PRICES[i])} · 100 g</b><div class="ac"><a class="btn" href="#/p/${i}">Xem chi tiết</a><button class="btn o" id="mad">Thêm vào giỏ</button></div></div></div>`;
 document.getElementById('mad').onclick=()=>{addCart(i);toast('Đã thêm vào giỏ hàng')}}
function bindMood(){if(!document.getElementById('mq'))return;
 document.querySelectorAll('.tb').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tb').forEach(x=>x.classList.toggle('on',x===t));document.getElementById('mq').hidden=t.dataset.tab!=='q';document.getElementById('md').hidden=t.dataset.tab!=='d'});
 document.querySelectorAll('.dt').forEach(x=>x.onclick=()=>moodShow(+x.dataset.md));moodShow(0);quizRender()}
function moodPage(){app.innerHTML=bar()+moodSec()+'<footer class="ft">Mellow Candle · Chọn cảm xúc – Thắp khoảnh khắc.</footer>';bindM()}
/* ====== Tùy chọn quà tặng (phí để 0 = không tính; sửa tại FEES) ====== */
const fee=n=>n?` (+${money(n)})`:'';
const giftBox=()=>`<fieldset class="gf"><legend>Tùy chọn quà tặng</legend><label class="ck"><input type="checkbox" id="gw"> Đóng gói quà tặng${fee(FEES.wrap)}</label><div id="gwb" hidden>${fl('Tên người nhận quà (không bắt buộc)','<input id="gt">')}</div><label class="ck"><input type="checkbox" id="gq"> Thêm thiệp QR lời nhắn${fee(FEES.qr)}</label><div id="gqb" class="gb" hidden><small class="mute">Tạo lời nhắn (chữ, video hoặc ghi âm) để có mã QR in trên thiệp, rồi dán đường link vào đây.</small>${fl('Link thông điệp QR','<input id="gl" placeholder="Dán link thông điệp">')}<a class="u" href="#/create">Tạo thông điệp QR</a></div></fieldset>`;

const R={'':home,login,create,dashboard,success,m:rcv,edit,shop,p:prod,cart:cartPage,music:musicPage,mood:moodPage};
async function route(){app.style.cssText='';scrollTo(0,0);const[p,a]=location.hash.slice(2).split('/');
 const mw=$('#mp');if(mw){mw.hidden=p==='m';if(p==='m')MU.stop()}
 S.user=sb?(await sb.auth.getSession()).data.session?.user||null:null;
 (R[p||'']||home)(a);const lo=$('#lo');if(lo)lo.onclick=async()=>{await sb.auth.signOut();location.hash='#/'}}
addEventListener('hashchange',route);route();

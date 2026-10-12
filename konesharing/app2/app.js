/* Конешеринг, вариант 2: Material 3 Expressive на Beer CSS */
const M='../media/',IMG='img/';
const G3D=Object.fromEntries(['halter','brush','blanket','plate','bridle','pad','boots','flymask','rope','saddle','apples','carrot','treats','hay','oats','vit','hoof','spa','teeth','gift','ball','salt'].map(k=>[k,IMG+k+'.webp']));
const G3=Object.keys(G3D).filter(k=>k!=='gift');const G3S=['apples','carrot','treats','hay','oats','vit','hoof','spa','teeth','ball','salt'];
const g3=(k,c='')=>`<img class="g3 ${c}" src="${G3D[k]}" alt="" loading="lazy">`;
const R3={tr_step:IMG+'tr_step.webp',tr_bow:IMG+'tr_bow.webp',tr_pole:IMG+'tr_pole.webp',tr_spanish:IMG+'tr_spanish.webp'};
/* иконки: имена из старого варианта → Material Symbols Rounded */
const IM={apple:'nutrition',heart:'favorite',smile:'sentiment_satisfied',bowl:'restaurant',bell:'notifications',call:'campaign',play:'play_arrow',lock:'lock',halter:'pets',brush:'brush',blanket:'checkroom',chat:'chat',doc:'description',chart:'bar_chart',cross:'medical_services',key:'key',arrow:'chevron_right',back:'arrow_back',down:'expand_more',star:'star',sun:'wb_sunny',eye:'visibility',mount:'landscape',cal:'calendar_month',shoe:'footprint',grid:'grid_view',club:'groups',user:'person',photo:'photo_library',camera:'photo_camera',video:'videocam',archive:'restart_alt',check:'check',clock:'schedule',pin:'pin_drop',card:'credit_card',gift:'redeem',pause:'pause',out:'logout',palette:'palette',send:'send',cart:'shopping_bag',drop:'water_drop',pill:'medication',sack:'grass',tooth:'dentistry',plate:'badge',trophy:'trophy',news:'newspaper',plus:'add',minus:'remove',tent:'camping',route:'route',temp:'thermometer',weight:'monitor_weight',pulse:'ecg_heart',list:'view_agenda',moon:'bedtime',wifioff:'wifi_off',share:'share',dl:'download',phone:'smartphone',close:'close',sbp:'qr_code_2',live:'sensors',more:'more_vert',fire:'local_fire_department',bolt:'bolt',hike:'hiking',eco:'eco',done:'task_alt',speed:'speed',fit:'fitness_center',height:'height',terrain:'filter_hdr',walk:'directions_walk',cele:'celebration',light:'light_mode',dark:'dark_mode',auto:'contrast',color:'colorize',history:'history',paid:'paid',event:'event',verified:'verified',mic:'mic',image:'image',movie:'movie',spa:'spa',forest:'forest',waves:'waves'};
const HORSE_SVG=`<svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M35.5 2.5c-1.6 2.6-2.4 5.7-2.3 8.7-3.2 1.6-5.7 4.3-7.6 7.4L14.2 35.2c-1.4 1.9-3.3 3.4-4.6 5.4-1.6 2.4-1.5 5.6.6 7.6 1.7 1.6 4.2 1.9 6.4 1.4l3.6-.9c2.5-.6 4.9-1.8 7.4-2 2.6-.2 4.6-2.2 5.4-4.6l.4-.1c1.8 3.3 2.6 7.1 2.4 10.9-.2 2.9-1 5.7-2.2 8.3H59c.6-5.4.2-10.9-1.4-16.1-1.9-6.1-5.3-11.6-7.9-17.4-1.2-2.8-2.3-5.7-4.2-8.1l.9-4.5c.4-2 .2-4.1-.7-6-.9 1.8-2.2 3.4-3.8 4.5-1.4-2.7-3.6-5-6.4-6.4z"/><circle cx="30" cy="22" r="2.2" fill="var(--hz-eye,var(--surface))"/></svg>`;
const ic=(n,c='')=>n==='horse'?`<i class="hz ${c}" aria-hidden="true">${HORSE_SVG}</i>`:`<i class="${c}" aria-hidden="true">${IM[n]||n}</i>`;
const rub=n=>n.toLocaleString('ru-RU').replace(/ /g,' ')+' ₽';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const LS={get(k,d){try{const v=localStorage.getItem('kn2-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('kn2-'+k,JSON.stringify(v))}catch(e){}}};
/* RM: меньше движения. Берём из системы (на Android включается и режимом энергосбережения), в демо можно включить все анимации */
const RMsys=matchMedia('(prefers-reduced-motion: reduce)').matches;let RM=RMsys&&!LS.get('anim',0);document.documentElement.classList.toggle('rm',RM);
function hap(p){if(RM)return;try{navigator.vibrate&&navigator.vibrate(p==='ok'?[14,60,22]:p==='snap'?[8,40,30]:p||8)}catch(e){}}
function altai(){const d=new Date(Date.now()+7*36e5);return [d.getUTCHours(),d.getUTCMinutes()]} // Горный Алтай, UTC+7
const hm=(h,m)=>String(h).padStart(2,'0')+':'+String(m).padStart(2,'0');
function nowT(){const [h,m]=altai();return hm(h,m)}
const curRoute=()=>(location.hash.replace(/^#\/?/,'')||'home').split('/')[0];
const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const plural=(n,a,b,c)=>{const m=n%10,h=n%100;return n+' '+(m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c)};


/* ---------- данные (из прототипа, цифры условные) ---------- */
const HORSES=[
 {id:'grom',name:'Гром',age:6,breed:'Алтайская',color:'гнедой',temper:'Спокойный',h:152,walk:'Прогулки и рысь',places:2,tags:['Спокойные','Для прогулок'],about:'Любит яблоки и долгие прогулки вдоль Катуни. Подходит к людям первым, на пастбище держится рядом с Бураном.'},
 {id:'buran',name:'Буран',age:8,breed:'Орловская',color:'серый',temper:'Уравновешенный',h:162,walk:'Выездка',places:2,tags:['Выездка'],about:'Опытный конь с хорошей выездкой. Терпелив с новичками, умеет кланяться по команде.'},
 {id:'laska',name:'Ласка',age:5,breed:'Алтайская',color:'рыжая',temper:'Игривая',h:148,walk:'Прогулки',places:3,tags:['Для прогулок'],about:'Молодая и любопытная кобыла. Быстро учится, сейчас осваивает рысь на корде.'},
 {id:'shaman',name:'Шаман',age:7,breed:'Новоалтайская',color:'вороной',temper:'Сильный характер',h:158,walk:'Горные маршруты',places:2,tags:['Горные маршруты'],about:'Выносливый конь для горных маршрутов. Ходил в тур «Кержаки» три сезона подряд.'},
 {id:'aina',name:'Айна',age:4,breed:'Алтайская',color:'буланая',temper:'Мягкая',h:146,walk:'Прогулки',places:4,tags:['Спокойные','Для прогулок'],about:'Самая молодая в табуне. Мягкая, доверчивая, хорошо идёт в поводу.'},
 {id:'kedr',name:'Кедр',age:9,breed:'Тракененская',color:'караковый',temper:'Спокойный',h:166,walk:'Выездка',places:1,tags:['Спокойные','Выездка'],about:'Крупный и очень спокойный конь. Любимец детей на конных прогулках.'}];
const PASS={
 grom:{sex:'Мерин',w:470,born:'2020, конюшня Marali',par:'Алмаз и Тайга',f:{speed:[72,90],jump:[55,85],load:[80,95],power:[70,95],stamina:[95,95],climb:[82,95]}},
 buran:{sex:'Мерин',w:540,born:'2018, Хреновской завод',par:'Бриз и Вьюга',f:{speed:[88,95],jump:[70,90],load:[65,85],power:[62,85],stamina:[66,85],climb:[60,80]}},
 laska:{sex:'Кобыла',w:430,born:'2021, конюшня Marali',par:'Алмаз и Зорька',f:{speed:[76,95],jump:[62,95],load:[48,80],power:[52,85],stamina:[70,100],climb:[70,95]}},
 shaman:{sex:'Мерин',w:520,born:'2019, Чемальский район',par:'Байкал и Ночка',f:{speed:[70,85],jump:[50,80],load:[96,105],power:[104,110],stamina:[98,110],climb:[102,110]}},
 aina:{sex:'Кобыла',w:410,born:'2022, конюшня Marali',par:'Кайрат и Ласточка',f:{speed:[60,95],jump:[45,90],load:[40,80],power:[45,85],stamina:[58,95],climb:[55,90]}},
 kedr:{sex:'Мерин',w:600,born:'2017, Кировский завод',par:'Кристалл и Купава',f:{speed:[74,85],jump:[92,95],load:[78,90],power:[75,85],stamina:[60,80],climb:[50,75]}}};
const NORM={'Алтайская':{speed:45,jump:90,load:110,power:350,stamina:60,climb:1200},'Орловская':{speed:55,jump:110,load:100,power:400,stamina:40,climb:600},'Новоалтайская':{speed:45,jump:90,load:130,power:500,stamina:60,climb:1100},'Тракененская':{speed:55,jump:140,load:110,power:420,stamina:40,climb:600}};
const ST=[['speed','Скорость','км/ч'],['jump','Прыжок','см'],['load','Грузоподъёмность','кг','Груз'],['power','Сила','кг'],['stamina','Выносливость','км'],['climb','Проходимость','м']];
const DECL={grom:['Грома','Грому','Грома'],buran:['Бурана','Бурану','Бурана'],laska:['Ласки','Ласке','Ласку'],shaman:['Шамана','Шаману','Шамана'],aina:['Айны','Айне','Айну'],kedr:['Кедра','Кедру','Кедра']};
const fem=id=>PASS[id]&&PASS[id].sex==='Кобыла';const fw=(id,m,f)=>fem(id)?f:m;
const nm=(id,c)=>DECL[id]?DECL[id][c]:H(id).name; // c: 0 родительный, 1 дательный, 2 винительный
const PLANS=[
 {id:'friend',name:'Друг коня',price:4900,pts:['Камеры денника, пастбища и плаца','Лента событий и уведомления','Отчёт раз в неделю','Скидка 5% на визиты']},
 {id:'co',name:'Совладелец',price:29000,pts:['Всё из тарифа «Друг коня»','Конь на 2–4 владельцев','Ежедневный отчёт и статистика','Запись на тренировки и трюки','Скидка 10% на визиты и тур']},
 {id:'own',name:'Личный конь',price:89000,pts:['Всё из тарифа «Совладелец»','Камера «глазами коня»','Курсы тренировок входят в тариф','2 визита «День с конём» в год','Скидка 15% на тур']}];
const TRICKS=[
 {id:'step',name:'Шаг по команде',state:'done',date:'2 октября'},
 {id:'bow',name:'Поклон',state:'learn',price:6000,lessons:4,done:2},
 {id:'pole',name:'Прыжок через жердь',state:'lock',price:9000,lessons:6,need:['jump',60,'прыжке 60 см']},
 {id:'spanish',name:'Испанский шаг',state:'lock',price:12000,lessons:7,need:['power',260,'силе 260 кг']}];
const MIMG=['m_star','m_cal','m_eye','m_horse','m_moon','m_mount','m_shoe','m_cup'];
const MED=[['Начало','star',1,'Оформить первую подписку','Скидка 5% на первый визит'],['Неделя','cal',1,'Заходить в приложение 7 дней подряд','+100 XP'],['Зритель','eye',1,'Посмотреть 10 часов эфира','+150 XP'],['Артист','play',0,'Выучить первый трюк','−10% на визит и +250 XP',[2,4]],['Месяц','sun',0,'Месяц с конём без перерыва','Табличка на денник в подарок',[24,30]],['Кержак','mount',0,'Пройти тур «Кержаки» на своём коне','Именная попона',[0,1]],['Путник','shoe',0,'Конь прошёл 500 км','+300 XP',[312,500]],['Чемпион','trophy',0,'Войти в тройку рейтинга клуба','Ужин в ресторане Marali',[4,3]]];
const SHOP=[
 {id:'apples',cat:'Лакомства',name:'Яблоки, 1 кг',price:350,art:'apple',info:'Алтайские яблоки из сада Marali. Конюх вручит сегодня и снимет видео.'},
 {id:'carrot',cat:'Лакомства',name:'Морковь, 2 кг',price:300,art:'apple',info:'Сладкая морковь, режем кружками, как любит конь.'},
 {id:'treats',cat:'Лакомства',name:'Травяные печенья',price:890,art:'star',info:'Лакомство из овса, льна и алтайских трав. Ветеринар одобрил.'},
 {id:'oats',cat:'Корм',name:'Овёс премиум, 20 кг',price:1900,art:'sack',info:'Плющеный овёс с алтайских полей, хватит примерно на 5 дней.'},
 {id:'hay',cat:'Корм',name:'Сено люцерновое, тюк',price:1200,art:'sack',info:'Мягкое сено с высоким белком, особенно полезно в период тренировок.'},
 {id:'vit',cat:'Здоровье',name:'Витамины на месяц',price:3400,art:'pill',info:'Витаминно-минеральный комплекс для сезона холодов.'},
 {id:'teeth',cat:'Здоровье',name:'Осмотр стоматолога',price:5500,art:'tooth',info:'Внеплановый осмотр и шлифовка зубов. Отчёт с фото придёт в медкарту.'},
 {id:'hoof',cat:'Здоровье',name:'Бальзам для копыт',price:1600,art:'drop',info:'Защищает копыта от трещин в сухую погоду.'},
 {id:'ball',cat:'Уход',name:'Мяч-кормушка',price:1900,art:'star',info:'Игрушка для денника: конь катает мяч, а из отверстий выпадают лакомства. Не скучает между тренировками.'},
 {id:'salt',cat:'Здоровье',name:'Соль-лизунец',price:900,art:'drop',info:'Гималайская соль на верёвке, восполняет минералы. Конюх повесит в деннике.'},
 {id:'spa',cat:'Уход',name:'СПА-день',price:4500,art:'drop',info:'Мойка с шампунем, расчёсывание гривы и массаж. Видео приходит вечером.'},
 {id:'brush',cat:'Уход',name:'Именной набор щёток',price:2400,art:'brush',info:'Щётки останутся в деннике, на ручках гравировка с именем.'},
 {id:'halter',cat:'Снаряжение',name:'Недоуздок с гравировкой',price:6900,art:'halter',info:'Кожаный недоуздок ручной работы, латунная пластина с именем.'},
 {id:'blanket',cat:'Снаряжение',name:'Зимняя попона',price:14500,art:'blanket',info:'Тёплая попона в цветах Marali, вышивка с именем коня.'},
 {id:'bridle',cat:'Снаряжение',name:'Уздечка из кожи',price:8900,art:'halter',info:'Классическая уздечка с мягким налобником, подгоняется по голове коня.'},
 {id:'pad',cat:'Снаряжение',name:'Вальтрап стёганый',price:5200,art:'blanket',info:'Персиковый вальтрап с фиолетовым кантом и лилией Marali.'},
 {id:'boots',cat:'Снаряжение',name:'Ногавки, 2 шт.',price:7400,art:'blanket',info:'Защищают ноги на тренировках и в горных поездках.'},
 {id:'flymask',cat:'Снаряжение',name:'Маска от мошки',price:3200,art:'halter',info:'Лёгкая сетка закрывает глаза и уши, летом на пастбище незаменима.'},
 {id:'rope',cat:'Снаряжение',name:'Чембур плетёный',price:2600,art:'halter',info:'Плетёный чомбур в цветах Marali с латунным карабином.'},
 {id:'saddle',cat:'Снаряжение',name:'Седло английское',price:68000,art:'halter',info:'Кожаное седло, подбирается мастером по спине коня. Останется за Громом.'},
 {id:'plate',cat:'Именное',name:'Табличка на денник',price:3900,art:'plate',info:'Латунная табличка с именем коня и владельца на двери денника.'}];
const TREATS=[['apples','Яблоко'],['carrot','Морковь'],['treats','Печенье'],['hay','Сено']];
const GEAR=[['halter','Недоуздок с гравировкой','Едет к вам, 7–10 дней'],['brush','Именной набор щёток','Уже у Грома'],['blanket','Зимняя попона','Уже у Грома'],['pad','Вальтрап стёганый','Уже у Грома'],['rope','Чембур плетёный','Уже у Грома']];
const EVU=[['7','окт','Тренировка на манеже','Сегодня в 16:00, ведёт Марина'],['10','окт','Осмотр ветеринара','Суббота в 11:00, плановый'],['12','июн','Тур «Кержаки»','4 дня, у вас 2 места']];
const EVP=[['6','окт','Купание в реке','Алексей прислал 5 фото и видео','pov'],['4','окт','Занятие по поклону','Второе из четырёх, видео с манежа','arena'],['1','окт','Новые подковы','Кузнец проверил копыта','stall']];
const STAFF={
 alexey:{name:'Алексей Тойбоев',role:'Конюх',img:'alexey',stats:[['8','лет в Marali'],['12','коней под присмотром'],['1 400+','видео для владельцев']],about:'Вырос в Чемальском районе и с детства при лошадях. Отвечает за кормление, чистку, выгул и купание, следит за самочувствием коня каждый день. Именно он снимает фото и видео для вашей ленты.',tags:['Уход и чистка','Расчистка копыт','Выгул в горах','Съёмка видео'],quote:'Конь сразу чувствует, в каком ты настроении. Поэтому к нему я прихожу только спокойным.',day:[['06:30','Утренний осмотр и кормление'],['09:00','Чистка и выгул на пастбище'],['13:00','Обед и купание в реке'],['19:00','Вечерний осмотр, видео для владельцев']]},
 marina:{name:'Марина Кыпчакова',role:'Тренер',img:'marina',stats:[['10','лет в конном спорте'],['30','коней на тренировках'],['40+','выученных трюков']],about:'Кандидат в мастера спорта по конкуру. Ведёт курсы тренировок и учит коней трюкам: от поклона до испанского шага. После каждого занятия присылает видео и замеры.',tags:['Конкур','Выездка','Трюки','Горные переходы'],quote:'Трюк — это разговор с конём. Сначала доверие, потом команда.',day:[['09:00','Курсы тренировок на плацу'],['10:00','Занятия по трюкам'],['15:00','Горные выезды с туристами'],['18:00','Видео и замеры для владельцев']]}};
const NEWS=[['stall','В табуне пополнение','Кобыла Майра принесла жеребёнка. Владельцы выбирают ему имя голосованием до 15 октября.','3 октября'],['pov','Ранняя бронь «Кержаков» 2027','Для владельцев коней скидка 15% до 1 декабря. Можно ехать на своём коне.','1 октября'],['arena','Ветеринарный день','Игорь Сабашкин осмотрел зубы всем 150 коням. Отчёты уже в медкартах.','28 сентября']];
const CLUBEV=[['Встреча владельцев в Marali','14 ноября, суббота','Ужин у камина, прогулка с конями, знакомство с тренерами',23],['Эфир с тренером Мариной','20 октября в 19:00, онлайн','Как тренировать коня зимой и каким трюкам учить',58],['Скачки на празднике Эл-Ойын','Июль 2027','Болеем за коней Marali, трансфер и места на трибуне',11]];
const RATING=[['shaman',640],['buran',560],['laska',430],['grom',380],['kedr',310],['aina',240]];
const DEPS=[['12–15 июня',8],['3–6 июля',5],['24–27 июля',0],['14–17 августа',11]];
const VALUE={grom:650000,buran:780000,laska:520000,shaman:700000,aina:480000,kedr:900000};
const CAMS=[['pasture','Пастбище'],['stall','Денник'],['arena','Плац'],['pov','Глазами коня']];
/* цены по коням (множитель к тарифу) и занятые места совладельцев, условно */
const PK={grom:1,buran:1.2,laska:.9,shaman:1.1,aina:.8,kedr:1.4};
const OWN={grom:1,buran:1,laska:1,shaman:0,aina:2,kedr:0};
const pp=(p,id)=>Math.round(p.price*(PK[id]||1)/100)*100;
function seatInfo(h){const taken=OWN[h.id]+(S.herd.includes(h.id)?1:0);return {free:Math.max(0,h.places-taken),taken:Math.min(h.places,taken),all:h.places}}
function seatsBadge(h,g){const s=seatInfo(h);if(g)return `<span class="seats" aria-label="Свободно ${s.free} из ${s.all}">${Array.from({length:s.all},(_,k)=>`<i class="${k>=s.taken?'f':''}"></i>`).join('')}<span>${s.free?`${s.free} из ${s.all}`:'нет мест'}</span></span>`;return `<span class="seats" aria-label="Свободно ${s.free} из ${s.all}">${Array.from({length:s.all},(_,k)=>`<i class="${k>=s.taken?'f':''}"></i>`).join('')}<span>${s.free?(s.free===1&&s.all>1?'Последнее место':`Свободно ${s.free} из ${s.all}`):'Мест нет'}</span></span>`}
const WHERE={'Пастбище':['pasture','на пастбище'],'Денник':['stall','в деннике'],'Плац':['arena','на плацу'],'Река':['pov','у реки']};
/* истории дня: [медиа, видео?, подпись(id коня)] */
const STO=[
 {id:'s1',who:'alexey',title:'Утро',t:'07:10',it:[['stall',0,id=>`Доброе утро! ${H(id).name} ${fw(id,'позавтракал','позавтракала')} овсом и всё ${fw(id,'съел','съела')}`],['stall',1,id=>'Чистка перед выгулом, грива как шёлк']]},
 {id:'s2',who:'alexey',title:'Пастбище',t:'10:20',it:[['pasture',1,id=>'Вышли на пастбище у ручья, трава ещё зелёная'],['pasture',0,id=>`${H(id).name} держится рядом с ${id==='buran'?'Громом':'Бураном'}`]]},
 {id:'s3',who:'alexey',title:'Купание',t:'13:30',it:[['pov',1,id=>'Вид с камеры на коне: идём к Катуни купаться'],['pov',0,id=>`Вода холодная, но ${fw(id,'ему','ей')} нравится`]]},
 {id:'s4',who:'marina',title:'Тренировка',t:'16:05',it:[['arena',1,id=>'Поклон: держит позу три секунды, ещё одно занятие и готово'],['arena',0,id=>`После занятия ${fw(id,'получил','получила')} морковку`]]}];
const VOTE={opts:['Алтын','Ветер','Уголёк','Сокол'],n:[41,28,17,23]};
const ALB=[['pov',1,'Купание в Катуни','6 октября'],['pasture',0,'На пастбище у ручья','6 октября'],['arena',1,'Занятие по поклону','4 октября'],['stall',0,'Новые подковы','1 октября'],['arena',0,'После тренировки','4 октября'],['pov',0,'Вид с коня на Катунь','29 сентября'],['pasture',1,'Утренний выгул','28 сентября'],['stall',1,'Вечерняя чистка','27 сентября']];
const QZ=[['Каким вы видите своего коня?',[['smile','Спокойным и надёжным','calm'],['star','Игривым и любопытным','play'],['mount','С характером, для гор','strong']]],
 ['Чем хотите заниматься вместе?',[['sun','Прогулками и пикниками','walk'],['trophy','Выездкой и трюками','dress'],['route','Горными маршрутами и турами','mount']]],
 ['Как часто будете приезжать?',[['cal','Раз в год или реже','rare'],['tent','Несколько раз в год','some'],['key','Часто, хочу личного коня','often']]]];
const QW={grom:{calm:3,play:1,strong:1,walk:3,dress:1,mount:2,rare:2,some:2,often:1},buran:{calm:2,play:1,strong:1,walk:1,dress:3,mount:1,rare:2,some:3,often:1},laska:{calm:1,play:3,strong:1,walk:3,dress:1,mount:1,rare:2,some:3,often:2},shaman:{calm:0,play:1,strong:3,walk:1,dress:0,mount:3,rare:1,some:2,often:3},aina:{calm:3,play:2,strong:0,walk:3,dress:0,mount:0,rare:3,some:3,often:1},kedr:{calm:3,play:0,strong:1,walk:2,dress:3,mount:1,rare:1,some:1,often:3}};
const QWHY={calm:'Спокойный и надёжный характер',play:'Игривый и любопытный характер',strong:'Сильный характер, вынослив в горах',walk:'Любит долгие прогулки',dress:'Обучен выездке, быстро учит трюки',mount:'Ходит горными маршрутами',rare:'Подойдёт тариф «Друг коня»',some:'Есть место для совладельца',often:'Можно взять личным конём'};
const CREWH=['grom','buran','laska'];
const CHK=[['06:30','Утренний осмотр и кормление'],['09:00','Чистка и выгул на пастбище'],['13:00','Купание в реке'],['19:00','Вечерний осмотр'],['19:40','Видео и отчёт владельцам']];


const S={tst:{},xp:2620,boost:{},training:null,scheme:'4',owner:true,horse:'grom',herd:['grom'],plan:'co',pick:null,pickPlan:'co',ev:0,club:0,shopCat:'Все',catF:'Все',cam:0,people:2,dep:0,stats:0,bookings:[['Тур «Кержаки»','12–15 июня 2027, 2 человека']],orders:[['Недоуздок с гравировкой','5 октября',6900,'В пути'],['Яблоки, 1 кг','4 октября',350,'Вручено'],['СПА-день','28 сентября',4500,'Выполнено']],pz:{},subs:{grom:'co'},months:{grom:6},buy:{home:0,pay:0},giftM:1,pays:[['Подписка «Совладелец», Гром','5 октября',29000],['Недоуздок с гравировкой','5 октября',6900],['Яблоки, 1 кг','4 октября',350],['СПА-день','28 сентября',4500],['Подписка «Совладелец», Гром','5 сентября',29000]],paused:false,chat:[['in','Здравствуйте! Я Ольга, ваш менеджер в Marali. Спрашивайте про визиты, тур и всё, что касается вашего коня.','10:02']]};
const H=id=>HORSES.find(h=>h.id===id);
Object.assign(S,{tq:LS.get('tq',[]),tqN:LS.get('tqn',0),album:LS.get('album',[]),vote:LS.get('vote',null),seen:LS.get('seen',[]),camMode:LS.get('cam','auto'),catV:LS.get('catv',0),albF:0,qz:[],crewUsed:false,crewRole:0,crewTab:0,lessons:{'grom:bow':2},tdate:{},st:{},chk:{0:1,1:1,2:1},unread:1,pending:[],staffStories:[],pub:null,pubH:'grom',pubCap:'',
 notifs:[['apple','Гром получил яблоки','Алексей прислал видео','18:20','report'],['star','Занятие по поклону','Второе из четырёх прошло отлично','16:45','home'],['doc','Отчёт за 6 октября готов','Купание, 12,4 км за день','вчера','report'],['cal','Осмотр ветеринара в субботу','10 октября в 11:00','вчера','health'],['club','Новость клуба','В табуне пополнение, голосуйте за имя','3 окт','club']]});
S.tq.slice().reverse().forEach(o=>{const p=SHOP.find(x=>x.id===o.p);if(p){S.orders.unshift([p.name,'7 октября',p.price,'Оформлен',o.n]);S.pays.unshift([p.name,'7 октября',p.price])}});
function hst(id){return S.st[id]||(S.st[id]={wb:'Отличное',mood:'Бодрое',where:'Пастбище',meal:null})}
function isNight(){const m=S.camMode;if(m==='night')return true;if(m==='day'||m==='off')return false;const h=altai()[0];return h>=22||h<6}
const camOff=()=>S.camMode==='off'||navigator.onLine===false;
function dayLine(){if(isNight())return 'Ночь в Marali, +1°, звёздно';const h=altai()[0],p=S.camMode==='day'&&(h>=22||h<6)?'День':h<11?'Утро':h<17?'День':'Вечер';return p+' в Marali, '+{'Утро':'+4°, туман','День':'+12°, солнечно','Вечер':'+8°, ясно'}[p]}
function mealTxt(id){const s=hst(id);if(s.meal){const h=+s.meal.slice(0,2);return [h>=5&&h<11?'Завтрак':h>=11&&h<16?'Обед':'Ужин','в '+s.meal]}const h=altai()[0];return h>=6&&h<13?['Завтрак','в 08:05']:h>=13&&h<19?['Обед','в 13:10']:['Ужин','в 18:40']}

function stats(id){const h=H(id),n=NORM[h.breed],f=PASS[id].f;return ST.map(([k,name,u,short])=>{const [p0,c]=f[k],p=p0+(S.boost[id+k]||0);return{k,name,short:short||name,u,v:Math.round(n[k]*p/100),norm:n[k],cap:Math.round(n[k]*c/100),p,c,max:p>=c,gold:p>100}})}


/* ---------- оформление: цвет из одного «семени» (Material You) и светлая/тёмная тема ---------- */
const SEEDS=[['katun','Катунь','#0E7C86'],['oblepiha','Облепиха','#D9711E'],['maral','Марал','#9A3B2E'],['kedr','Кедр','#3E6B48']];
let THEMES={"katun":{"light":{"primary":"#006972","onPrimary":"#ffffff","primaryContainer":"#8af2ff","onPrimaryContainer":"#001f23","secondary":"#4a6366","onSecondary":"#ffffff","secondaryContainer":"#cde7eb","onSecondaryContainer":"#051f22","tertiary":"#515e7d","onTertiary":"#ffffff","tertiaryContainer":"#d8e2ff","onTertiaryContainer":"#0c1b36","error":"#ba1a1a","onError":"#ffffff","errorContainer":"#ffdad6","onErrorContainer":"#410002","background":"#fafdfd","onBackground":"#191c1d","surface":"#f8fafa","onSurface":"#191c1d","surfaceVariant":"#dae4e5","onSurfaceVariant":"#3f484a","outline":"#6f797a","outlineVariant":"#bec8ca","shadow":"#000000","scrim":"#000000","inverseSurface":"#2d3131","inverseOnSurface":"#eff1f1","inversePrimary":"#4ed8e7","surfaceDim":"#d8dadb","surfaceBright":"#f8fafa","surfaceContainerLowest":"#ffffff","surfaceContainerLow":"#f2f4f4","surfaceContainer":"#eceeee","surfaceContainerHigh":"#e6e8e9","surfaceContainerHighest":"#e0e3e3"},"dark":{"primary":"#4ed8e7","onPrimary":"#00363b","primaryContainer":"#004f56","onPrimaryContainer":"#8af2ff","secondary":"#b1cbcf","onSecondary":"#1c3437","secondaryContainer":"#324b4e","onSecondaryContainer":"#cde7eb","tertiary":"#b8c6ea","onTertiary":"#22304c","tertiaryContainer":"#394764","onTertiaryContainer":"#d8e2ff","error":"#ffb4ab","onError":"#690005","errorContainer":"#93000a","onErrorContainer":"#ffb4ab","background":"#191c1d","onBackground":"#e0e3e3","surface":"#101414","onSurface":"#e0e3e3","surfaceVariant":"#3f484a","onSurfaceVariant":"#bec8ca","outline":"#899294","outlineVariant":"#3f484a","shadow":"#000000","scrim":"#000000","inverseSurface":"#e0e3e3","inverseOnSurface":"#2d3131","inversePrimary":"#006972","surfaceDim":"#101414","surfaceBright":"#363a3a","surfaceContainerLowest":"#0b0f0f","surfaceContainerLow":"#191c1d","surfaceContainer":"#1d2021","surfaceContainerHigh":"#272b2b","surfaceContainerHighest":"#323536"}},"oblepiha":{"light":{"primary":"#974800","onPrimary":"#ffffff","primaryContainer":"#ffdbc7","onPrimaryContainer":"#311300","secondary":"#755846","onSecondary":"#ffffff","secondaryContainer":"#ffdbc7","onSecondaryContainer":"#2b1709","tertiary":"#616134","onTertiary":"#ffffff","tertiaryContainer":"#e7e6ad","onTertiaryContainer":"#1d1d00","error":"#ba1a1a","onError":"#ffffff","errorContainer":"#ffdad6","onErrorContainer":"#410002","background":"#fffbff","onBackground":"#201a17","surface":"#fff8f5","onSurface":"#201a17","surfaceVariant":"#f4ded3","onSurfaceVariant":"#52443c","outline":"#84746a","outlineVariant":"#d7c3b8","shadow":"#000000","scrim":"#000000","inverseSurface":"#362f2b","inverseOnSurface":"#fbeee8","inversePrimary":"#ffb688","surfaceDim":"#e4d8d2","surfaceBright":"#fff8f5","surfaceContainerLowest":"#ffffff","surfaceContainerLow":"#fef1eb","surfaceContainer":"#f8ebe6","surfaceContainerHigh":"#f2e6e0","surfaceContainerHighest":"#ece0da"},"dark":{"primary":"#ffb688","onPrimary":"#512400","primaryContainer":"#733500","onPrimaryContainer":"#ffdbc7","secondary":"#e5bfa9","onSecondary":"#432b1c","secondaryContainer":"#5b4130","onSecondaryContainer":"#ffdbc7","tertiary":"#cac993","onTertiary":"#32320a","tertiaryContainer":"#49491e","onTertiaryContainer":"#e7e6ad","error":"#ffb4ab","onError":"#690005","errorContainer":"#93000a","onErrorContainer":"#ffb4ab","background":"#201a17","onBackground":"#ece0da","surface":"#18120f","onSurface":"#ece0da","surfaceVariant":"#52443c","onSurfaceVariant":"#d7c3b8","outline":"#9f8d83","outlineVariant":"#52443c","shadow":"#000000","scrim":"#000000","inverseSurface":"#ece0da","inverseOnSurface":"#362f2b","inversePrimary":"#974800","surfaceDim":"#18120f","surfaceBright":"#3f3834","surfaceContainerLowest":"#120d0a","surfaceContainerLow":"#201a17","surfaceContainer":"#241e1b","surfaceContainerHigh":"#2f2925","surfaceContainerHighest":"#3a3330"}},"maral":{"light":{"primary":"#a03f32","onPrimary":"#ffffff","primaryContainer":"#ffdad4","onPrimaryContainer":"#410000","secondary":"#775651","onSecondary":"#ffffff","secondaryContainer":"#ffdad4","onSecondaryContainer":"#2c1511","tertiary":"#705c2e","onTertiary":"#ffffff","tertiaryContainer":"#fbdfa6","onTertiaryContainer":"#251a00","error":"#ba1a1a","onError":"#ffffff","errorContainer":"#ffdad6","onErrorContainer":"#410002","background":"#fffbff","onBackground":"#201a19","surface":"#fff8f6","onSurface":"#201a19","surfaceVariant":"#f5ddda","onSurfaceVariant":"#534341","outline":"#857370","outlineVariant":"#d8c2be","shadow":"#000000","scrim":"#000000","inverseSurface":"#362f2e","inverseOnSurface":"#fbeeec","inversePrimary":"#ffb4a8","surfaceDim":"#e4d7d5","surfaceBright":"#fff8f6","surfaceContainerLowest":"#ffffff","surfaceContainerLow":"#fef1ee","surfaceContainer":"#f8ebe9","surfaceContainerHigh":"#f3e5e3","surfaceContainerHighest":"#ede0dd"},"dark":{"primary":"#ffb4a8","onPrimary":"#611109","primaryContainer":"#80281d","onPrimaryContainer":"#ffdad4","secondary":"#e7bdb6","onSecondary":"#442925","secondaryContainer":"#5d3f3a","onSecondaryContainer":"#ffdad4","tertiary":"#dec48c","onTertiary":"#3e2e04","tertiaryContainer":"#564419","onTertiaryContainer":"#fbdfa6","error":"#ffb4ab","onError":"#690005","errorContainer":"#93000a","onErrorContainer":"#ffb4ab","background":"#201a19","onBackground":"#ede0dd","surface":"#181211","onSurface":"#ede0dd","surfaceVariant":"#534341","onSurfaceVariant":"#d8c2be","outline":"#a08c89","outlineVariant":"#534341","shadow":"#000000","scrim":"#000000","inverseSurface":"#ede0dd","inverseOnSurface":"#362f2e","inversePrimary":"#a03f32","surfaceDim":"#181211","surfaceBright":"#3f3736","surfaceContainerLowest":"#120d0c","surfaceContainerLow":"#201a19","surfaceContainer":"#251e1d","surfaceContainerHigh":"#2f2827","surfaceContainerHighest":"#3b3332"}},"kedr":{"light":{"primary":"#0b6d36","onPrimary":"#ffffff","primaryContainer":"#9ef6b0","onPrimaryContainer":"#00210b","secondary":"#506352","onSecondary":"#ffffff","secondaryContainer":"#d3e8d2","onSecondaryContainer":"#0e1f12","tertiary":"#3a656e","onTertiary":"#ffffff","tertiaryContainer":"#bdeaf5","onTertiaryContainer":"#001f25","error":"#ba1a1a","onError":"#ffffff","errorContainer":"#ffdad6","onErrorContainer":"#410002","background":"#fcfdf7","onBackground":"#191c19","surface":"#f9faf4","onSurface":"#191c19","surfaceVariant":"#dde5da","onSurfaceVariant":"#414941","outline":"#717970","outlineVariant":"#c1c9be","shadow":"#000000","scrim":"#000000","inverseSurface":"#2e312e","inverseOnSurface":"#f0f1ec","inversePrimary":"#82d996","surfaceDim":"#d9dbd5","surfaceBright":"#f9faf4","surfaceContainerLowest":"#ffffff","surfaceContainerLow":"#f3f4ef","surfaceContainer":"#edeee9","surfaceContainerHigh":"#e7e9e3","surfaceContainerHighest":"#e2e3de"},"dark":{"primary":"#82d996","onPrimary":"#003918","primaryContainer":"#005226","onPrimaryContainer":"#9ef6b0","secondary":"#b7ccb7","onSecondary":"#233426","secondaryContainer":"#394b3b","onSecondaryContainer":"#d3e8d2","tertiary":"#a2ced8","onTertiary":"#01363e","tertiaryContainer":"#204d55","onTertiaryContainer":"#bdeaf5","error":"#ffb4ab","onError":"#690005","errorContainer":"#93000a","onErrorContainer":"#ffb4ab","background":"#191c19","onBackground":"#e2e3de","surface":"#111411","onSurface":"#e2e3de","surfaceVariant":"#414941","onSurfaceVariant":"#c1c9be","outline":"#8b938a","outlineVariant":"#414941","shadow":"#000000","scrim":"#000000","inverseSurface":"#e2e3de","inverseOnSurface":"#2e312e","inversePrimary":"#0b6d36","surfaceDim":"#111411","surfaceBright":"#373a36","surfaceContainerLowest":"#0c0f0c","surfaceContainerLow":"#191c19","surfaceContainer":"#1e201d","surfaceContainerHigh":"#282b27","surfaceContainerHighest":"#333532"}}}; /* подставляется сборкой: заранее посчитанные палитры для SEEDS */
const css=o=>Object.entries(o).map(([k,v])=>'--'+k.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase()+':'+v).join(';');
function sysDark(){return matchMedia('(prefers-color-scheme: dark)').matches}
function curMode(){const m=LS.get('mode','light');return m==='auto'?(sysDark()?'dark':'light'):m}
async function applyTheme(){const seed=LS.get('seed','katun'),mode=curMode(),b=document.body;b.classList.toggle('dark',mode==='dark');b.classList.toggle('light',mode!=='dark');
 let t=THEMES[seed];
 if(!t&&/^#/.test(seed)){t=LS.get('custom',null);if(!t||t.seed!==seed){try{await waitUi();t=await globalThis.materialDynamicColors(seed);t.seed=seed;LS.set('custom',t)}catch(e){t=THEMES.katun}}}
 t=t||THEMES.katun;b.setAttribute('style',css(t[mode]));
 const m=document.querySelector('meta[name=theme-color]');if(m)m.content=t[mode].surface}
function waitUi(){return new Promise(r=>{let n=0;(function f(){if(globalThis.materialDynamicColors||n++>60)r();else setTimeout(f,50)})()})}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(LS.get('mode','light')==='auto')applyTheme()});

/* ---------- кусочки ---------- */
const SHAPES=['sunny','sided-cookie9','flower','burst','gem','leaf-clover4','pentagon','puffy-diamond'];
const shape=(s,c='',inner='',st='')=>`<span class="shape ${s} ${c}"${st?` style="${st}"`:''}>${inner}</span>`;
const photoShape=(s,url,c='')=>`<span class="shape ${s} ph ${c}" style="background-image:url(${url})"></span>`;
let PG={title:'',back:false};
function hdr(title,sub,o={}){PG={title:o.short||title,back:!!o.back};return `<header class="hd${o.back?' hsub':''}"><div class="hd-row">${o.back?`<button class="ib wave" data-back aria-label="Назад">${ic('back')}</button>`:(o.left||'<span></span>')}<div class="hd-act">${o.right||''}</div></div>${o.kick?`<span class="kick">${o.kick}</span>`:''}<h1 class="disp">${title}</h1>${sub?`<p class="sub">${sub}</p>`:''}</header>`}
const skyTab=(t,s,r)=>hdr(t,s,{right:r});
const skySub=(t,s,r)=>hdr(t,s,{back:true,right:r});
const backBtn=`<button class="ib onimg wave" data-back aria-label="Назад">${ic('back')}</button>`;
const sh=(t,a='')=>`<div class="sh"><h2>${t}</h2>${a}</div>`;
const tbtn=(t,attr)=>`<button class="transparent small tb" ${attr}>${t}</button>`;
function seg(items,cur,attr,cls=''){return `<nav class="group connected seg ${cls}">${items.map((t,k)=>`<button class="${cur===k?'active':''}" ${attr}="${k}">${cur===k?ic('check','small'):''}${t}</button>`).join('')}</nav>`}
const radio=on=>`<span class="rd ${on?'on':''}"><span></span></span>`;
const row=(lead,title,sub,trail='',attr='',cls='')=>`<${attr?'button':'div'} class="${attr?'u wave ':''}li ${cls}" ${attr}>${lead?`<span class="lead">${lead}</span>`:''}<span class="tx"><b>${title}</b>${sub?`<small>${sub}</small>`:''}</span>${trail?`<span class="trail">${trail}</span>`:''}</${attr?'button':'div'}>`;
const icb=(n,c='')=>`<span class="icb ${c}">${ic(n)}</span>`;

/* кольцо физформы: дуга и трек с зазором, как в Material 3 Expressive; выше нормы дуга волнистая и золотая */
function ringSvg(p,gold){const cx=36,r=29,w=7,C=2*Math.PI*r,gap=(w+5)/C*100,a=Math.min(1,p)*100;
 let arc;if(gold){const n=180,amp=2.1,waves=11;let d='';for(let j=0;j<=n;j++){const t=j/n,th=-Math.PI/2+t*2*Math.PI,rr=r+amp*Math.sin(waves*t*2*Math.PI);d+=(j?'L':'M')+(cx+rr*Math.cos(th)).toFixed(2)+' '+(cx+rr*Math.sin(th)).toFixed(2)}
  arc=`<path class="arc gold" d="${d}" pathLength="100" style="--l:${a.toFixed(1)}"/>`}
 else arc=`<circle class="arc" cx="${cx}" cy="${cx}" r="${r}" pathLength="100" transform="rotate(-90 ${cx} ${cx})" style="--l:${a.toFixed(1)}"/>`;
 const tr=a>=100?'':`<circle class="trk" cx="${cx}" cy="${cx}" r="${r}" pathLength="100" transform="rotate(${-90+(a+gap)*3.6} ${cx} ${cx})" stroke-dasharray="${Math.max(0,100-a-2*gap).toFixed(1)} 100"/>`;
 return `<svg viewBox="0 0 72 72" aria-hidden="true">${tr}${arc}</svg>`}
function rings(id,tap){return `<div class="rings">${stats(id).map(s=>{const sub=S.training===s.k&&id===S.horse?'идёт курс':s.max?'✓ прокачано':s.gold?'выше нормы':`норма ${s.norm}`;
 return `<button class="u ring wave ${s.max?'max':''} ${s.gold?'gold':''} ${S.training===s.k&&id===S.horse?'run':''}" ${tap==='info'?`data-ring="${id}|${s.k}"`:tap?`data-train="${s.k}"`:''} aria-label="${s.name}: ${s.v} ${s.u}, ${sub}"><span class="rgv">${ringSvg(s.p/100,s.gold)}<span class="rval"><b>${s.v}</b><small>${s.u}</small></span></span><b class="rn">${s.short}</b><small class="rs">${sub}</small></button>`}).join('')}</div>`}
function evRow([d,m,t,s,p],past,k){return `<button class="u wave li ev" ${past?`data-go="report"`:`data-evd="${k}"`}><span class="lead">${past?`<span class="dt ph" style="background-image:url(${M}${p}.jpg)"></span>`:`<span class="dt"><b>${d}</b><small>${m}</small></span>`}</span><span class="tx"><b>${t}</b><small>${past?d+' '+m+'. ':''}${s}</small></span><span class="trail">${ic('arrow')}</span></button>`}
function events(){return seg(['Ближайшие','Прошедшие'],S.ev,'data-ev')+`<div class="lst">${(S.ev?EVP:EVU).map((e,k)=>evRow(e,S.ev,k)).join('')}</div>`}
function tState(t,id){const o=S.tst[id+':'+t.id];if(o)return o;if(t.state!=='lock')return id==='grom'?t.state:'avail';const v=stats(id).find(x=>x.k===t.need[0]).v;return v>=t.need[1]?'avail':'lock'}
function tDone(t,id){const k=id+':'+t.id;return k in S.lessons?S.lessons[k]:0}
function unlocked(id){return TRICKS.filter(t=>tState(t,id)==='avail').map(t=>t.id)}
function trickRow(t,id){const st=stats(id),ts=tState(t,id),th=c=>`<span class="lead"><span class="tth ${c||''}"><img src="${R3['tr_'+t.id]}" alt="">${c?ic('lock','lk'):''}</span></span>`;
 if(ts==='done')return `<div class="li tr">${th()}<span class="tx"><b>${t.name}</b><small>Освоен ${S.tdate[id+':'+t.id]||t.date||'7 октября'}</small></span><span class="trail"><button class="fill small" data-trick="${t.id}">${ic('play','small')}Смотреть</button></span></div>`;
 if(ts==='learn'){const dn=tDone(t,id),pc=Math.round(dn/t.lessons*100);return `<div class="li tr">${th()}<span class="tx"><b>${t.name}</b><small>${dn?`Занятие ${dn} из ${t.lessons}, следующее в четверг`:`Первое занятие завтра, всего ${t.lessons}`}</small></span><span class="trail"><span class="pc">${ringSvg(pc/100,false)}<b>${pc}%</b></span></span></div>`}
 if(ts==='avail')return `<div class="li tr">${th()}<span class="tx"><b>${t.name}</b><small>Открыт, ${t.lessons} занятий</small></span><span class="trail"><button class="small" data-learn="${t.id}">Изучить</button></span></div>`;
 const s=st.find(x=>x.k===t.need[0]);return `<div class="li tr">${th('lkd')}<span class="tx"><b>${t.name}</b><small>Откроется при ${t.need[2]}, сейчас ${s.v}&nbsp;${s.u}</small></span></div>`}

function camMedia(k){if(camOff())return `<div class="ph fill" style="background-image:url(${M}${k}.jpg);filter:blur(12px) brightness(.5);transform:scale(1.1)"></div><div class="off"><div>${shape('sided-cookie9','small onimg-s',ic('wifioff'))}<b>Нет соединения</b><p>Эфир продолжится, когда вернётся интернет</p><button class="small onimg" data-retry>${ic('archive','small')}Повторить</button></div></div>`;
 return `<video src="${M}${k}.mp4" poster="${M}${k}.jpg" autoplay muted loop playsinline></video><div class="ld"><div><progress class="circle wavy small"></progress><small>Подключаемся к камере</small></div></div>`}
function storyList(){const L=[...S.staffStories.filter(s=>!s.h||s.h===S.horse),...STO],seen=s=>S.seen.includes(s.id+':'+S.horse);return [...L.filter(s=>!seen(s)),...L.filter(seen)]}
function storyThumb(s){const m=s.it[0][0];return s.thumb||(/^(blob:|data:)/.test(m)?'':M+m+'.jpg')}
function storiesRow(){return `<div class="stories hs" aria-label="Истории дня">${storyList().map((s,k)=>{const seen=S.seen.includes(s.id+':'+S.horse),th=storyThumb(s);return `<button class="u story ${seen?'seen':''}" data-story="${k}"><span class="shape sided-cookie9 sring"><span class="shape sided-cookie9 sgap">${th?`<span class="shape sided-cookie9 ph sim" style="background-image:url(${th})"></span>`:`<span class="shape sided-cookie9 sim nth">${ic('play')}</span>`}</span></span>${s.fresh&&!seen?'<span class="nw">новое</span>':''}<span class="lbl">${s.title}</span></button>`}).join('')}</div>`}
function installBanner(){if(!BIP||isStandalone()||LS.get('instx',0))return '';return `<div class="card c-pri inst">${shape('sided-cookie9','small c-on',ic('phone'))}<span class="tx"><b>Установите приложение</b><small>Иконка на главном экране, без адресной строки</small></span><button class="small" data-install>Установить</button><button class="ib sm transparent" data-instx aria-label="Скрыть">${ic('close')}</button></div>`}
function tqName(o){return {apples:'Яблоки',carrot:'Морковь',treats:'Травяные печенья',hay:'Сено'}[o.p]||SHOP.find(x=>x.id===o.p).name}
function tqStage(o){return o.done?2:Date.now()-o.t>2500?1:0}
function tqStatus(n){const o=S.tq.find(x=>x.n==n);if(!o)return 'оформлен';const st=tqStage(o);return st===2?'вручено, есть видео':st===1?'Алексей угостит '+o.slot:'оплачено'}
function tqGot(o){return `${H(o.h).name} ${fw(o.h,'получил','получила')} ${tqName(o).toLowerCase()}`}
function tqCards(){return S.tq.filter(o=>o.h===S.horse&&!o.seen).slice(0,2).map(o=>{const st=tqStage(o);
 if(st===2)return `<button class="u wave card c-ter tqc" data-tqv="${o.n}"><span class="vc"><video src="${o.vid||M+'pasture.mp4'}" ${o.vid?'':`poster="${M}pasture.jpg"`} muted autoplay loop playsinline></video>${ic('play','pl')}</span><span class="tx"><b>${tqGot(o)}</b><small>Алексей прислал видео в ${o.doneAt}</small></span><span class="chip fill sel">Смотреть</span></button>`;
 return `<div class="card tqc"><span class="tqi"><img src="${G3D[o.p]}" alt=""></span><span class="tx"><b>${tqName(o)} для ${nm(o.h,0)}</b><small>${st?`Алексей угостит ${o.slot} и снимет видео`:'Оплачено, передаём конюху'}</small><span class="steps"><span class="on"></span><span class="${st?'on':'run'}"></span><span class="${st?'run':''}"></span></span></span></div>`}).join('')}
function albItems(){return [...S.album.filter(a=>!a.h||a.h===S.horse),...ALB.map(([k,v,c,d])=>({k:v?'vid':'img',src:M+k+(v?'.mp4':'.jpg'),poster:M+k+'.jpg',cap:c,d}))]}
function albCard(){const L=albItems(),th=L.slice(0,3).map(a=>a.k==='img'?a.src:a.poster||'');return `<button class="u wave card qk wide" data-go="album">${icb('photo','c-sec')}<span class="tx"><b>Альбом</b><small>${plural(L.length,'снимок','снимка','снимков')} и видео</small></span><span class="th3">${th.map((u,j)=>`<span class="shape ${['sided-cookie9','sunny','flower'][j]} ph" style="${u?`background-image:url(${u})`:''}"></span>`).join('')}</span></button>`}
function poll(){const v=S.vote,n=VOTE.n.map((x,k)=>x+(v===k?1:0)),tot=n.reduce((a,b)=>a+b);
 return `<div class="poll">${VOTE.opts.map((o,k)=>v==null?`<button class="u wave" data-vote="${k}"><span>${o}</span><em>Выбрать</em></button>`:`<button class="u ${v===k?'me':''}" disabled><span class="bar" style="width:${Math.round(n[k]/tot*100)}%"></span><span>${o}${v===k?ic('check','small'):''}</span><em>${Math.round(n[k]/tot*100)}%</em></button>`).join('')}</div><p class="cap">${v==null?'Голосование до 15 октября, у каждого владельца один голос':`Ваш голос учтён. Проголосовали ${plural(tot,'владелец','владельца','владельцев')}, итоги 15 октября`}</p>`}
function phoneCard(){const inst=!isStandalone(),nt='Notification' in window,ng=nt&&Notification.permission==='granted';if(!inst&&(!nt||ng))return '';
 return `<div class="card"><div class="inst">${shape('sided-cookie9','small c-pri',ic(inst?'phone':'bell'))}<span class="tx"><b>${inst?'Приложение на телефоне':'Уведомления'}</b><small>${inst?'Иконка на главном экране, полный экран и работа без интернета':'Видео от конюха и новости клуба сразу на экран телефона'}</small></span></div>
 ${inst?`<button class="responsive mt" data-install>${ic('phone')}Установить на главный экран</button>`:''}${nt?(ng?`<p class="cap center">${ic('check','small')} Уведомления включены</p>`:`<button class="border responsive mt8" data-notifon>${ic('bell')}Включить уведомления</button>`):''}</div>`}

/* ---------- экраны ---------- */
const V={};
V.welcome=()=>{PG={title:'',back:false};return `<section class="welcome"><video src="${M}pasture.mp4" poster="${M}pasture.jpg" autoplay muted loop playsinline></video><div class="wsc"></div>
 <div class="wc"><span class="chip onimg-chip">${ic('pin','small')}Marali, Горный Алтай</span>
 <h1 class="disp">Свой конь на&nbsp;Алтае, даже если вы в&nbsp;городе</h1>
 <ul>${[['eye','Смотрите на коня в прямом эфире','sided-cookie9'],['star','Учите его трюкам вместе с тренером','sunny'],['mount','Приезжайте в гости и в тур «Кержаки»','flower']].map(([i,t,s])=>`<li>${shape(s,'tiny wsh',ic(i,'small'))}${t}</li>`).join('')}</ul>
 <button class="extra responsive" data-go="catalog">Выбрать коня${ic('arrow')}</button>
 <button class="extra responsive fill mt8" data-go="login">У меня уже есть конь</button>
 <button class="transparent responsive wtx" data-go="crew">Вход для сотрудников Marali</button></div></section>`};
V.login=()=>skySub('Вход','Пришлём код в SMS')+`<div class="stack"><div class="card">
 <div class="field label border round"><input id="ph" inputmode="tel" value="+7 913 " autocomplete="tel" placeholder=" "><label for="ph">Номер телефона</label></div>
 <button class="responsive large mt" data-go="code">Получить код</button><p class="cap mt">Нажимая кнопку, вы соглашаетесь с условиями сервиса и обработкой данных.</p></div></div>`;
V.code=()=>skySub('Код из SMS','Отправили на +7 913 ••• 42 18')+`<div class="stack"><div class="card"><div class="code">${[1,2,3,4].map(k=>`<input inputmode="numeric" maxlength="1" aria-label="Цифра ${k}" value="${k<4?[4,1,7][k-1]:''}">`).join('')}</div><button class="responsive large mt" data-login>Войти</button><button class="transparent responsive mt8" data-toast="Новый код отправлен">Отправить код ещё раз</button></div></div>`;

V.home=()=>{const h=H(S.horse),st=hst(h.id),night=isNight(),wk=night?'stall':WHERE[st.where][0],ml=mealTxt(h.id);
 const left=`<button class="u wave hsel" data-herd>${photoShape('circle',M+h.id+'.jpg','av')}<span>${h.name}</span>${ic('down','small')}</button>`,
  right=`<button class="ib wave" data-go="notif" aria-label="Уведомления">${ic('bell')}${S.unread?'<span class="badge none"></span>':''}</button>`;
 return hdr(h.name,`${ic(night?'moon':'sun','small')} ${dayLine()}`,{left,right,short:h.name})+`
<div class="stack">
 ${installBanner()}
 ${storiesRow()}
 <div class="cam${night?' ir':''}" data-camgo="${CAMS.findIndex(c=>c[0]===wk)}" role="button" aria-label="Открыть камеры">${camMedia(wk)}<div class="ov t"><span class="live"><span class="dot"></span>В эфире</span>${night?`<span class="gp">${ic('moon','small')}ИК-камера</span>`:''}</div>
  <div class="ov b"><small>${night?`${h.name} спит в деннике<br>ночная камера`:`${st.where}, в кадре<br>2 мин назад`}</small><button class="small onimg" data-call>${ic('call','small')}Позвать к камере</button></div></div>
 <div class="tiles3">${[['heart','Самочувствие',st.wb,'health','c-pri','sided-cookie9'],[night?'moon':'smile','Настроение',night?'Спит':st.mood,'health','c-sec','sunny'],['bowl',ml[0],ml[1],'report','c-ter','flower']].map(([i,l,v,g,c,s])=>`<button class="u wave tile ${c}" data-go="${g}">${shape(s,'tiny tsh',ic(i,'small'))}<small>${l}</small><b>${v}</b></button>`).join('')}</div>
 <section class="card treat"><div class="sh"><h2>Угостить <span class="hl">${nm(h.id,2)}</span></h2>${tbtn('Все','data-treat')}</div><p class="cap">Конюх вручит сегодня и снимет видео</p>
  <div class="tq">${TREATS.map(([k,n],j)=>`<button class="u wave ti" data-prod="${k}"><span class="shape ${['circle','sided-cookie9','sunny','flower'][j]} tis"><img src="${G3D[k]}" alt=""></span><span>${n}</span></button>`).join('')}</div></section>
 <div id="tqbox" class="tqbox">${tqCards()}</div>
 <section class="card"><div class="sh"><h2>Снаряжение</h2>${tbtn(ic('plus','small')+'Добавить','data-shop="Снаряжение"')}</div>
  ${h.id==='grom'?`<div class="carousel hs">${GEAR.map(([i,n,s],j)=>`<button class="u wave gear ${j===0?'big':''}" data-go="purchases"><span class="im">${g3(i)}</span><b>${n}</b><small>${s}</small></button>`).join('')}</div>`:`<button class="u wave empty" data-shop="Снаряжение"><span class="shape sided-cookie9 medium c-sec">${g3('halter')}</span><span class="tx"><b>Пока пусто</b><small>Подберите ${nm(h.id,1)} первое снаряжение: недоуздок, щётки, попону</small></span></button>`}</section>
 <section class="card"><div class="sh"><h2>Развитие</h2><span class="cap">Нажмите на кольцо</span></div>
  <div class="lvl">${shape('sunny','medium lvs','<b>3</b>')}<div class="tx"><b>Уровень «Друг»</b><small>${S.xp.toLocaleString('ru')} из 3 500 XP, дальше скидка 15% в магазине</small><progress class="wavy" value="${S.xp}" max="3500"></progress></div></div>
  ${rings(S.horse,true)}</section>
 <section class="card"><div class="sh"><h2>Трюки</h2><span class="chip fill sel tiny-chip">${TRICKS.filter(t=>tState(t,h.id)==='done').length} из ${TRICKS.length}</span></div><div class="lst">${TRICKS.map(t=>trickRow(t,S.horse)).join('')}</div></section>
 <section class="card"><div class="sh"><h2>Ачивки</h2><span class="chip fill sel tiny-chip">${MED.filter(m=>m[2]).length} из ${MED.length}</span></div><div class="medals">${MED.map((m,k)=>`<button class="u wave medal ${m[2]?'on':''}" data-medal="${k}">${shape(SHAPES[k],'medium ms',ic(m[1]==='play'?'movie':m[1]==='sun'?'light':m[1]))}<span>${m[0]}</span></button>`).join('')}</div></section>
 <section class="card"><div class="sh"><h2>События</h2></div><div id="evbox">${events()}</div></section>
 <section class="quick">${[['chat','Конюху','Алексей на связи','chat','c-pri'],['doc','Отчёт','За 6 октября','report','c-sec'],['chart','Статистика','12,4 км за день','stats','c-sec'],['cross','Здоровье','Осмотр 10 октября','health','c-pri']].map(([i,t,s,g,c])=>`<button class="u wave card qk" data-go="${g}">${icb(i,c)}<span class="tx"><b>${t}</b><small>${s}</small></span></button>`).join('')}${albCard()}</section>
 <button class="u wave card c-inv buy" data-go="buyout">${shape('sunny','deco slow-rotate')}<span class="tx"><small>Выкуп</small><b>Выкупить ${nm(h.id,2)}</b><span>Половина уже оплаченной подписки идёт в счёт цены</span></span><span class="button inv-btn">${ic('key','small')}Узнать условия</span></button>
</div>`};

V.cams=()=>{const c=CAMS[S.cam],lock=c[0]==='pov'&&S.plan!=='own',night=isNight();return skySub('Камеры',night?`Ночь, ${H(S.horse).name} спит в деннике`:`${H(S.horse).name} сейчас ${WHERE[hst(S.horse).where][1]}`)+`<div class="stack">
 <div class="cam big${night&&!lock?' ir':''}">${lock?`<div class="ph fill" style="background-image:url(${M}pov.jpg);filter:blur(14px) brightness(.6)"></div><div class="off"><div>${shape('sided-cookie9','small onimg-s',ic('lock'))}<b>Камера на коне</b><p>Доступна в тарифе «Личный конь»</p><button class="small onimg" data-go="tariff/${S.horse}">Сменить тариф</button></div></div>`:`${camMedia(c[0])}<div class="ov t"><span class="live"><span class="dot"></span>В эфире</span><span class="gp">${night?ic('moon','small')+'ИК · ':''}${c[1]}</span></div>`}</div>
 <div class="camgrid">${CAMS.map(([k,n],i)=>`<button class="u wave cg ${i===S.cam?'on':''}" data-cam="${i}"><span class="ph" style="background-image:url(${M}${k}.jpg)">${k==='pov'&&S.plan!=='own'?`<span class="lkk">${ic('lock','small')}</span>`:''}</span><small>${n}</small></button>`).join('')}</div>
 <nav class="toolbar fill camtb">${[['camera','Снимок','data-snap'],['apple','Угостить','data-treat'],['call','Позвать','data-call'],['photo','Альбом','data-go="album"']].map(([i,t,a])=>`<a class="wave" ${a}>${ic(i)}<span>${t}</span></a>`).join('')}</nav>
 <p class="cap pad">Камеры работают круглосуточно. Ночью включается инфракрасный режим.</p></div>`};

V.report=()=>{const id=S.horse,h=H(id);return skySub('Отчёт','6 октября, вторник')+`<div class="stack">
 <div class="card"><div class="who">${photoShape('circle',M+'alexey.jpg','av48')}<span class="tx"><b>Алексей, конюх</b><small>Отчёт в 19:40</small></span></div><p class="txt mt">${h.name} весь день ${fw(id,'был бодрым','была бодрой')}. Утром ходили на пастбище у ручья, после обеда искупались в реке, ${fw(id,'ему','ей')} очень понравилось. ${fw(id,'Съел','Съела')} все яблоки, которые вы прислали. Копыта в порядке.</p></div>
 <div class="bento">${['pov','pasture','stall','arena'].map((p,j)=>`<button class="u wave ph b${j}" aria-label="Фото ${j+1} из 4" data-toast="Фото откроется на весь экран" style="background-image:url(${M}${p}.jpg)"></button>`).join('')}</div>
 <div class="kv4">${[['walk','Прошёл','12,4 км','c-pri'],['bowl','Корм','Овёс, сено, яблоки','c-sec'],['weight','Вес',PASS[id].w+' кг','c-sec'],['smile','Настроение','Бодрое','c-ter']].map(([i,a,b,c])=>`<div class="tile ${c}">${ic(i,'small')}<small>${a}</small><b>${b}</b></div>`).join('')}</div>
 <div class="card">${sh('День '+nm(id,0))}<div class="tl">${[['06:30','Осмотр и завтрак'],['09:00','Чистка и выгул на пастбище'],['13:00','Купание в реке'],['16:00','Отдых в деннике'],['19:00','Вечерний осмотр']].map(([t,s])=>`<div><b>${t}</b><small>${s}</small></div>`).join('')}</div></div></div>`};

V.stats=()=>{const per=S.stats,km=[[12.4,'км за день'],[71.8,'км за неделю'],[312,'км за месяц']][per],bars=[[6,9,8,12,10,7,12.4],[58,64,71,72],[240,280,312]][per],lab=[['Чт','Пт','Сб','Вс','Пн','Вт','Ср'],['1 нед','2 нед','3 нед','4 нед'],['Авг','Сен','Окт']][per],mx=Math.max(...bars);
 return skySub('Статистика',`Где ${fw(S.horse,'был','была')} и сколько ${fw(S.horse,'прошёл','прошла')} ${H(S.horse).name}`)+`<div class="stack">
 ${seg(['День','Неделя','Месяц'],per,'data-st','wide')}
 <div class="card c-pri"><div class="bighead"><div><div class="bignum">${String(km[0]).replace('.',',')}</div><span class="cap">${km[1]}</span></div><div class="r"><b>${[14,82,356][per]} 200</b><span class="cap">шагов</span></div></div>
 <div class="bars">${bars.map((b,k)=>`<div><span class="bw"><span class="${k===bars.length-1?'on':''}" style="height:${Math.round(b/mx*100)}%"></span></span><small>${lab[k]}</small></div>`).join('')}</div></div>
 <div class="card">${sh('Маршрут за день','<span class="chip fill sel tiny-chip">GPS</span>')}
  <svg class="map" viewBox="0 0 340 240" role="img" aria-label="Карта территории Marali с маршрутом"><rect width="340" height="240" fill="var(--surface-container-highest)"/><path d="M0 170 C60 150 90 200 150 185 S260 140 340 160 V240 H0Z" fill="var(--secondary-container)"/><path d="M-10 60 C60 90 120 40 190 70 S300 120 350 90" fill="none" stroke="var(--tertiary-container)" stroke-width="12" stroke-linecap="round"/><path d="M70 190 C90 140 130 150 150 120 S210 80 250 100 S300 160 270 190" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 9"/><circle cx="70" cy="190" r="8" fill="var(--on-surface)"/><circle cx="270" cy="190" r="11" fill="var(--primary)" stroke="var(--surface)" stroke-width="4"/><text x="84" y="214" font-size="12" fill="var(--on-surface-variant)" font-family="inherit">Денник</text><text x="196" y="222" font-size="12" fill="var(--on-surface-variant)" font-family="inherit">Пастбище, сейчас</text><text x="200" y="56" font-size="12" fill="var(--on-surface-variant)" font-family="inherit">река Катунь</text></svg>
  <p class="cap mt8">Карта территории условная, точные зоны согласуем с Marali.</p></div></div>`};

V.health=()=>skySub('Здоровье',`Медкарта ${nm(S.horse,0)}`)+`<div class="stack">
 <div class="card c-pri hl-card">${shape('sided-cookie9','large deco2')}<span class="chip fill sel">${ic('check','small')}Здоров</span><b class="t">Всё в порядке</b><p>Последний осмотр 28 сентября. Ветеринар Игорь Сабашкин.</p></div>
 <div class="kv4">${[['temp','Температура','37,6°','c-sec'],['pulse','Пульс','36 уд/мин','c-ter'],['weight','Вес',PASS[S.horse].w+' кг','c-sec'],['cal','Следующий осмотр','10 октября','c-pri']].map(([i,a,b,c])=>`<div class="tile ${c}">${ic(i,'small')}<small>${a}</small><b>${b}</b></div>`).join('')}</div>
 <div class="card">${sh('История')}<div class="lst">${[['tooth','Осмотр зубов','28 сентября, без замечаний'],['shoe','Расчистка и ковка','1 октября, кузнец Иван'],['cross','Прививка от гриппа','12 августа, следующая в феврале'],['pill','Витамины','С 1 октября, курс на месяц']].map(([i,t,s])=>row(icb(i),t,s)).join('')}</div></div>
 <button class="fill large responsive" data-shop="Здоровье">${ic('cross')}Заказать осмотр или витамины</button></div>`;

V.shop=()=>{const cats=['Все',...new Set(SHOP.map(p=>p.cat))],list=SHOP.filter(p=>S.shopCat==='Все'||p.cat===S.shopCat);
 return skySub('Магазин','Всё вручит конюх и пришлёт видео',`<button class="ib wave" data-go="purchases" aria-label="Мои покупки">${ic('cart')}</button>`)+`<div class="stack">
 <div class="chips hs">${cats.map(c=>`<button class="chip ${S.shopCat===c?'fill sel':''}" data-cat="${c}">${S.shopCat===c?ic('check'):''}${c}</button>`).join('')}</div>
 <div class="grid2">${list.map(p=>`<button class="u wave prod" data-prod="${p.id}"><span class="im">${G3.includes(p.id)?g3(p.id):ic(p.art,'extra')}</span><b>${p.name}</b><span class="pr">${rub(p.price)}</span></button>`).join('')}</div>
 <button class="border large responsive" data-go="purchases">Мои покупки</button></div>`};
V.purchases=()=>skySub('Мои покупки',`Снаряжение ${nm(S.horse,0)} и заказы`)+`<div class="stack">
 <div class="card">${sh('У '+nm(S.horse,0))}${S.horse!=='grom'?`<p class="cap">Снаряжения пока нет. Всё, что вы купите, конюх подпишет именем ${nm(S.horse,0)}.</p>`:''}<div class="lst">${(S.horse==='grom'?GEAR:[]).map(([i,n,s])=>row(`<span class="gth">${g3(i)}</span>`,n,s)).join('')}</div></div>
 <div class="card">${sh('Заказы')}<div class="lst">${S.orders.map(([n,d,p,st,q])=>row('',n,`${d}, ${q?tqStatus(q):st.toLowerCase()}`,`<b>${rub(p)}</b>`)).join('')}</div></div>
 <button class="large responsive" data-shop="Все">В магазин</button></div>`;

V.buyout=()=>{const id=S.horse,val=VALUE[id],mo=S.months[id]||1,paid=pp(PLANS.find(x=>x.id===(S.subs[id]||'co')),id)*mo,off=paid/2,sum=val-off,b=S.buy,mon=Math.ceil(sum/12/100)*100;return skySub(`Выкуп ${nm(id,0)}`,`${fw(id,'Конь станет только вашим','Лошадь станет только вашей')}`)+`<div class="stack">
 <div class="card c-inv sum">${photoShape('sided-cookie9',M+id+'.jpg','medium')}<div class="rows"><div><small>Стоимость ${fw(id,'коня','лошади')}</small><b>${rub(val)}</b></div><div><small>Минус половина подписки за ${mo} ${mo===1?'месяц':mo<5?'месяца':'месяцев'}</small><b>−${rub(off)}</b></div></div><div class="tot"><small>К оплате${b.pay?', 12 платежей без переплаты':''}</small><span class="price">${rub(b.pay?mon:sum)}${b.pay?'<small>&nbsp;/мес</small>':''}</span></div></div>
 <div class="card">${sh('Где будет жить')}<div class="lst">${[['Остаётся в Marali','Содержание 70 000 ₽ в месяц, камеры и отчёты сохраняются'],['Забираю домой','Перевозка по России от 40 000 ₽, документы оформим за две недели']].map(([t,d],k)=>row(radio(b.home===k),t,d,'',`data-buyhome="${k}"`)).join('')}</div></div>
 <div class="card">${sh('Оплата')}${seg(['Сразу','Рассрочка на 12 мес'],b.pay,'data-buypay','wide')}<p class="cap mt">Договор подписывается электронно. Совладельцы ${nm(id,0)} получат уведомление и смогут выбрать другого коня.</p></div>
 <button class="extra responsive cta" data-toast="Заявка отправлена, менеджер позвонит сегодня">Отправить заявку</button></div>`};

V.notif=()=>{S.unread=0;return skySub('Уведомления')+`<div class="stack"><div class="card"><div class="lst">${S.notifs.map(([i,t,s,d,g])=>row(icb(i,'c-pri'),esc(t),esc(s),`<small>${d}</small>`,`data-go="${g}"`)).join('')}</div></div>${'Notification' in window&&Notification.permission!=='granted'?phoneCard():''}</div>`};

V.catalog=()=>{const f=['Все','Спокойные','Для прогулок','Выездка','Горные маршруты'],list=HORSES.filter(h=>S.catF==='Все'||h.tags.includes(S.catF)),g=S.catV;
 const seats=h=>{const s=seatInfo(h);return `<span class="seats">${Array.from({length:s.all},(_,k)=>`<span class="${k>=s.taken?'f':''}"></span>`).join('')}<b>${s.free?(g?`${s.free} из ${s.all}`:s.free===1&&s.all>1?'Последнее место':`Свободно ${s.free} из ${s.all}`):'Мест нет'}</b></span>`};
 const card=h=>{const mine=S.owner&&S.herd.includes(h.id),age=`${h.age} ${h.age<5?'года':'лет'}`;return `<button class="u wave hcard" data-go="horse/${h.id}"><span class="ph" style="background-image:url(${M}${h.id}.jpg)">${mine?`<span class="chip fill sel mine">${ic('favorite','small fill')}Ваш конь</span>`:seats(h)}</span><span class="in"><span class="nmrow"><b class="nm">${h.name}</b><span class="pr">от ${rub(pp(PLANS[0],h.id))}${g?'':'/мес'}</span></span><small>${g?`${h.breed}, ${age}`:`${h.breed}, ${age}, ${h.color}. ${h.temper}`}</small>${g?'':`<span class="tags">${h.tags.map(t=>`<span class="chip tiny-chip">${t}</span>`).join('')}</span>`}</span></button>`};
 return skyTab('Каталог','150 коней Marali, 6 ищут владельцев',`<button class="ib wave" data-catv aria-label="${g?'Показать списком':'Показать плиткой'}">${ic(g?'list':'grid')}</button>`)+`<div class="stack">
 <button class="u wave card c-ter quiz" data-quiz>${shape('sunny','large qs slow-rotate',ic('horse'))}<span class="tx"><b>Подобрать коня</b><small>Три вопроса о вас, и мы предложим подходящего</small><span class="button small">Начать${ic('arrow','small')}</span></span></button>
 <div class="chips hs">${f.map(c=>`<button class="chip ${S.catF===c?'fill sel':''}" data-catf="${c}">${S.catF===c?ic('check'):''}${c}</button>`).join('')}</div>
 ${g?`<div class="cgrid">${list.map(card).join('')}</div>`:list.map(card).join('')}
 <button class="u wave card giftc" data-go="gift"><span class="shape sided-cookie9 medium c-pri gs"><img src="${G3D.gift}" alt=""></span><span class="tx"><b>Подарить коня</b><small>Сертификат на подписку для близкого</small></span>${ic('arrow')}</button></div>`};

function heroTop(img,right=''){PG={title:'',back:true};return `<section class="hero"><div class="ph" style="background-image:url(${img})"></div><div class="tp">${backBtn}${right||'<span></span>'}</div></section>`}
V.horse=id=>{const h=H(id),p=PASS[id],mine=S.owner&&S.herd.includes(id);const r=heroTop(M+id+'.jpg',`<button class="ib onimg wave" aria-label="В избранное" data-toast="Добавили в избранное">${ic('heart')}</button>`);PG={title:h.name,back:true};return r+`
<div class="stack">
 <div class="ttl"><h1 class="disp">${h.name}</h1><p class="sub">${h.breed}, ${h.age} ${h.age<5?'года':'лет'}. ${h.temper}</p><div class="tags">${h.tags.map(t=>`<span class="chip">${t}</span>`).join('')}<span class="chip">${ic('groups','small')}${h.places>1?`До ${h.places} совладельцев${mine?'':`, свободно ${seatInfo(h).free}`}`:'Только личный конь'}</span></div></div>
 <div class="card"><p class="txt">${h.about}</p></div>
 <div class="cam mid${isNight()?' ir':''}">${camMedia(isNight()?'stall':'pasture')}<div class="ov t"><span class="live"><span class="dot"></span>${isNight()?'Спит в деннике, ИК-камера':'Сейчас на пастбище'}</span></div></div>
 <section class="card">${sh('Паспорт')}<div class="kv">${[['Порода',h.breed],['Пол',p.sex],['Возраст',h.age+(h.age<5?' года':' лет')],['Масть',h.color],['Рост в холке',h.h+' см'],['Вес',p.w+' кг'],['Родился',p.born],['Родители',p.par]].map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div></section>
 <section class="card">${sh('Физическая форма')}<p class="cap">Полное кольцо означает норму породы, волна выше нормы</p>${rings(id,'info')}</section>
 <section class="card">${sh(`Кто за ${fw(id,'ним','ней')} ухаживает`)}<div class="lst">${Object.entries(STAFF).map(([k,s])=>row(photoShape('circle',M+s.img+'.jpg','av48'),s.name,s.role,ic('arrow'),`data-go="staff/${k}"`)).join('')}</div></section>
 ${mine?`<button class="extra responsive cta" data-myhorse="${id}">Перейти к ${nm(id,1)}</button>`:`<button class="extra responsive cta" data-go="tariff/${id}">Выбрать тариф</button>`}</div>`};

V.staff=id=>{const s=STAFF[id];const r=heroTop(M+s.img+'.jpg');PG={title:s.name.split(' ')[0],back:true};return r.replace('class="hero"','class="hero hs2"')+`
<div class="stack"><div class="ttl"><h1 class="disp">${s.name.split(' ')[0]}</h1><p class="sub">${s.role} в Marali</p></div>
 <div class="tiles3">${s.stats.map(([a,b],j)=>`<div class="tile ${['c-pri','c-sec','c-ter'][j]}"><b class="price">${a}</b><small>${b}</small></div>`).join('')}</div>
 <div class="card"><p class="txt">${s.about}</p><div class="tags mt">${s.tags.map(t=>`<span class="chip">${t}</span>`).join('')}</div></div>
 <div class="card c-ter quote"><span class="qm">“</span><p>${s.quote}</p></div>
 <div class="card">${sh('Обычный день')}<div class="tl">${s.day.map(([t,d])=>`<div><b>${t}</b><small>${d}</small></div>`).join('')}</div></div>
 <button class="fill extra responsive" data-go="chat">${ic('chat')}Написать</button></div>`};

V.tariff=id=>{const h=H(id);return skySub('Тариф',`для ${nm(h.id,0)}`)+`<div class="stack">${PLANS.map((p,j)=>`<button class="u wave card plan ${S.pickPlan===p.id?'on':''}" data-plan="${p.id}"><span class="ph2">${shape(['circle','sided-cookie9','sunny'][j],'small ps',ic(['heart','groups','key'][j],'small'))}<span class="tx"><b>${p.name}</b><span class="price">${rub(pp(p,id))} <small>в месяц</small></span>${p.id==='co'&&!S.herd.includes(id)?`<small>${(s=>s.free?`Свободно мест: ${s.free} из ${s.all}`:'Свободных мест нет')(seatInfo(h))}</small>`:''}</span>${radio(S.pickPlan===p.id)}</span><ul>${p.pts.map(t=>`<li>${ic('check','small')}${t}</li>`).join('')}</ul></button>`).join('')}
 <button class="extra responsive cta" data-go="pay/${id}">Продолжить за ${rub(pp(PLANS.find(p=>p.id===S.pickPlan),id))}</button></div>`};
V.pay=id=>{const h=H(id),p=PLANS.find(x=>x.id===S.pickPlan);return skySub('Оплата','Первый месяц подписки')+`<div class="stack">
 <div class="card c-sec"><div class="who">${photoShape('sided-cookie9',M+id+'.jpg','av56')}<span class="tx"><b>${h.name}</b><small>Тариф «${p.name}»</small></span><span class="price">${rub(pp(p,id))}</span></div></div>
 <div class="card">${sh('Способ оплаты')}<div class="lst">${[['card','Банковская карта','Мир, Visa, Mastercard'],['sbp','СБП','Через приложение банка'],['paid','SberPay','В один тап']].map(([i,t,s],k)=>row(icb(i),t,s,radio(!k))).join('')}</div></div>
 <p class="cap pad">Подписка продлевается раз в месяц. Отменить или поставить на паузу можно в профиле.</p>
 <button class="extra responsive cta" data-paid="${id}">Оплатить ${rub(pp(p,id))}</button></div>`};
V.paid=id=>{const h=H(id),p=PLANS.find(x=>x.id===S.plan);return skySub('Покупка оформлена','Оплата прошла').replace('data-back',`data-myhorse="${id}"`)+`<div class="stack"><div class="card center paidc"><span class="pw">${shape('sunny','pbg slow-rotate')}${photoShape('sided-cookie12',M+id+'.jpg','pimg')}</span><h2 class="h2b">${h.name} теперь ${PASS[id].sex==='Кобыла'?'ваша':'ваш'}</h2><p class="cap mt8">Вы оформили тариф «${p.name}» на ${nm(id,2)}. Конюх уже знает о вас и пришлёт первое видео сегодня вечером.</p><button class="extra responsive mt" data-myhorse="${id}">Перейти к ${nm(id,1)}</button></div></div>`};

V.gift=()=>{const G=[['1 мес','1 месяц',1,0],['3 мес','3 месяца',3,0],['6 мес','6 месяцев',6,5],['Год','год',12,10]],g=G[S.giftM],full=29000*g[2],sum=Math.round(full*(100-g[3])/100/100)*100;return skySub('Подарок','Сертификат на подписку')+`<div class="stack">
 <div class="card c-pri cert">${shape('flower','deco3 slow-rotate')}${shape('sided-cookie9','deco4')}<img class="gbox" src="${G3D.gift}" alt=""><small>Конешеринг, Marali</small><b class="t">Свой конь на Алтае</b><p>Тариф «Совладелец» на ${g[1]}</p></div>
 <div class="card">${sh('Срок')}${seg(G.map(x=>x[0]),S.giftM,'data-giftm','wide')}
 <div class="field label border round mt"><input id="giftto" value="Маме, Елене Викторовне" placeholder=" "><label for="giftto">Кому</label></div></div>
 <div class="card"><div class="lst">${g[3]?row('',`${g[2]} × ${rub(29000)}`,'',`<s>${rub(full)}</s>`)+row('','Скидка за срок','',`<b>−${g[3]}%</b>`):''}${row('','К оплате','Коня получатель выберет сам',`<span class="price">${rub(sum)}</span>`)}</div></div>
 <button class="extra responsive cta" data-giftpay="${sum}">Оплатить и отправить</button></div>`};
V.trips=()=>skyTab('Поездки',`Приезжайте к ${nm(S.horse,1)} в гости`)+`<div class="stack">
 <button class="u wave hcard tourc" data-go="tour"><span class="ph" style="background-image:url(${M}pov.jpg)"><span class="chip fill sel mine">${ic('hike','small')}4 дня в горах</span></span><span class="in"><span class="nmrow"><b class="nm">Тур «Кержаки»</b><span class="pr">${rub(150000)}</span></span><small>Горный переход на своём коне по старообрядческим местам Алтая</small></span></button>
 <div class="card c-sec">${sh('День с конём',`<span class="price">${rub(12000)}</span>`)}<p class="txt">Чистка, прогулка верхом с тренером и обед в ресторане Marali. Скидка 10% по вашему тарифу.</p><button class="large responsive mt" data-daywith>Записаться</button></div>
 <div class="card">${sh('Мои брони',tbtn('Все','data-go="bookings"'))}<div class="lst">${S.bookings.slice(0,2).map(([t,s])=>row(icb('cal','c-pri'),t,s)).join('')}</div></div></div>`;
V.tour=()=>{const r=heroTop(M+'pov.jpg');PG={title:'Кержаки',back:true};return r+`
<div class="stack"><div class="ttl"><span class="kick">Тур · 4 дня, 70 км</span><h1 class="disp">Кержаки</h1><p class="sub">${rub(150000)} за человека</p></div>
 <div class="card">${sh('Программа')}<div class="tl">${[['День 1','Встреча в Marali, знакомство с конём, ужин у костра'],['День 2','Переход к Тюнгурскому перевалу, ночёвка в юртах'],['День 3','Старообрядческая заимка, баня и мёд'],['День 4','Спуск к Катуни, обед в Marali, отъезд']].map(([a,b])=>`<div><b>${a}</b><small>${b}</small></div>`).join('')}</div></div>
 ${(()=>{const id=S.horse,c=stats(id).find(x=>x.k==='climb').v,ok=c>=900;return `<div class="card ${ok?'c-pri':'c-ter'} ready">${shape('sunny','small rs2',ic('mount','small'))}<span class="tx"><b>${H(id).name} ${ok?'может пойти в тур':'пока не готов'+fw(id,'','а')+' к туру'}</b><small>${fw(id,'Его','Её')} проходимость ${c} м, нужно от 900 м${ok?'':'. Курс «Проходимость» поможет'}</small></span></div>`})()}
 <div class="card">${sh('Входит в цену')}<div class="lst">${['Конь и снаряжение','Проводник и повар','Проживание и питание','Трансфер из Горно-Алтайска'].map(t=>row(icb('check','c-pri'),t,'')).join('')}</div></div>
 <button class="extra responsive cta" data-go="book">Выбрать даты</button></div>`};
V.book=()=>{const total=150000*S.people,disc=Math.round(total*.15);return skySub('Бронь тура','Ранняя бронь, скидка владельцам 15%')+`<div class="stack">
 <div class="card">${sh('Даты 2027')}<div class="lst">${DEPS.map(([d,n],k)=>n?row(radio(S.dep===k),d,`Осталось мест: ${n}`,'',`data-dep="${k}"`):`<div class="li dis">${'<span class="lead">'+radio(false)+'</span>'}<span class="tx"><b>${d}</b><small>Мест нет</small></span></div>`).join('')}</div></div>
 <div class="card"><div class="cnt"><b>Сколько человек</b><div class="counter"><button class="ib wave" data-ppl="-1" aria-label="Меньше">${ic('minus')}</button><b>${S.people}</b><button class="ib wave" data-ppl="1" aria-label="Больше">${ic('plus')}</button></div></div></div>
 <div class="card"><div class="lst">${row('',`${S.people} × ${rub(150000)}`,'',`<b>${rub(total)}</b>`)}${row('','Скидка владельца 15%','',`<b>−${rub(disc)}</b>`)}${row('','Итого','',`<span class="price">${rub(total-disc)}</span>`)}</div></div>
 <button class="extra responsive cta" data-book>Забронировать</button></div>`};
V.bookings=()=>skySub('Мои брони')+`<div class="stack"><div class="card"><div class="lst">${S.bookings.map(([t,s])=>row(icb('cal','c-pri'),t,s)).join('')}</div></div><button class="border large responsive" data-go="trips">Новая поездка</button></div>`;

V.club=()=>skyTab('Клуб','Владельцы коней Marali')+`<div class="stack">
 ${seg(['Новости','События','Рейтинг'],S.club,'data-club','wide')}
 ${S.club===0?NEWS.map(([p,t,s,d],k)=>`<article class="card news fade"><span class="ph" style="background-image:url(${M}${p}.jpg)"></span><div class="nwb"><small class="cap">${d}</small><h2>${t}</h2><p class="txt">${s}</p>${k===0?poll():''}</div></article>`).join(''):''}
 ${S.club===1?CLUBEV.map(([t,d,s,n],j)=>`<div class="card fade ${['c-pri','c-sec','c-ter'][j]}"><small class="cap">${d}</small><h2 class="h2b">${t}</h2><p class="txt">${s}</p><div class="evf"><span class="cap">${ic('groups','small')} Идут ${n} человек</span><button class="small" data-toast="Записали вас, напомним за день">Пойду</button></div></div>`).join(''):''}
 ${S.club===2?`<div class="card fade"><p class="cap">Очки за тренировки, трюки и километры за октябрь</p><div class="lst mt8">${RATING.map(([id,pt],k)=>row(`<span class="rk ${k<3?'top':''}">${k+1}</span>`+photoShape('circle',M+id+'.jpg','av44'),H(id).name+(id===S.horse?' (ваш)':''),H(id).breed,`<b class="pts">${pt}</b>`,'',id===S.horse?'me':'')).join('')}</div></div>`:''}</div>`;

V.profile=()=>{const seed=LS.get('seed','katun'),mode=LS.get('mode','light');return skyTab('Профиль','Анна Королёва, +7 913 ••• 42 18')+`<div class="stack">
 ${S.herd.map(id=>{const p=PLANS.find(x=>x.id===(S.subs[id]||'co')),pz=S.pz[id];return `<div class="card sub"><div class="who">${photoShape('sided-cookie9',M+id+'.jpg','av56')}<span class="tx"><b>${H(id).name}, «${p.name}»</b><small>${pz?'Подписка на паузе':id==='grom'?'Следующее списание 5 ноября':'Следующее списание 7 ноября'}</small></span><span class="price">${rub(pp(p,id))}</span></div>
  <div class="two mt"><button class="fill" data-go="tariff/${id}">Сменить тариф</button><button class="border" data-pause="${id}">${ic(pz?'play':'pause','small')}${pz?'Продолжить':'Пауза'}</button></div></div>`}).join('')}
 <div class="card"><div class="lst">${[['bell','Уведомления','notif'],['card','История платежей','payments'],['chat','Чат с менеджером','chat'],['cal','Мои брони','bookings'],['gift','Подарить сертификат','gift']].map(([i,t,g])=>row(icb(i),t,'',ic('arrow'),`data-go="${g}"`)).join('')}</div></div>
 <div class="card">${sh('Оформление')}<p class="cap">Вся палитра строится из одного цвета</p>
  <div class="seeds">${SEEDS.map(([k,n,c],j)=>`<button class="u wave seed ${seed===k?'on':''}" data-seed="${k}"><span class="shape ${['circle','sided-cookie9','sunny','flower'][j]} sw" style="background:${c}">${seed===k?ic('check'):''}</span><small>${n}</small></button>`).join('')}<label class="u wave seed ${/^#/.test(seed)?'on':''}"><span class="shape gem sw cust" style="${/^#/.test(seed)?`background:${seed}`:''}">${ic('color')}</span><small>Свой</small><input type="color" data-custom value="${/^#/.test(seed)?seed:'#6750A4'}"></label></div>
  <small class="cap blk mt">Тема</small>${seg(['Светлая','Тёмная','Как в системе'],['light','dark','auto'].indexOf(mode),'data-mode','wide')}</div>
 ${phoneCard()}
 <div class="card">${sh('Демонстрация')}<p class="cap">Для показа Marali</p>
  <div class="lst">${row(icb('key','c-ter'),'Панель сотрудника','Конюх и тренер: заказы, статусы коней, истории',ic('arrow'),'data-go="crew"')}
  ${row(icb('palette','c-sec'),'Первый вариант дизайна','«Аврора»: стекло и горы',ic('arrow'),'data-open="../app/"')}</div>
  <small class="cap blk mt">Камера</small>${seg(['Авто','День','Ночь','Нет сети'],['auto','day','night','off'].indexOf(S.camMode),'data-cmode','wide sm4')}<small class="cap blk mt8">В режиме «Авто» ночь наступает в 22:00 по времени Алтая</small>
  <small class="cap blk mt">Анимации</small>${seg(['Как в системе','Все'],LS.get('anim',0)?1:0,'data-anim','wide')}<small class="cap blk mt8">${RMsys?'В телефоне включено «Убрать анимации» или энергосбережение. В режиме «Как в системе» экраны только плавно проявляются':'Телефон анимации не ограничивает, показываем все'}</small>
  <div class="lst mt8">${row(icb('archive'),'Сбросить демо','Заказы, снимки, голос и просмотренные истории','','data-reset')}</div></div>
 <button class="border large responsive" data-logout>${ic('out')}Выйти</button></div>`};
V.payments=()=>skySub('Платежи')+`<div class="stack"><div class="card"><div class="lst">${S.pays.map(([t,d,p])=>row(icb('paid','c-sec'),t,d,`<b>${rub(p)}</b>`)).join('')}</div></div></div>`;
V.chat=()=>{const r=skySub('Ольга','Менеджер Marali, обычно отвечает за 5 минут',`${photoShape('circle',M+'marina.jpg','av40 olga')}`);return r+`<div class="stack chatst"><div class="msgs" id="msgs">${S.chat.map(([w,t,d])=>`<div class="msg ${w}">${esc(t)}<small>${d}</small></div>`).join('')}</div>
 <div class="cbar"><div class="qr hs">${['Хочу приехать в гости',`Как дела у ${nm(S.horse,0)}?`,'Вопрос по оплате'].map(t=>`<button class="chip" data-say="${t}">${t}</button>`).join('')}</div>
 <form class="composer" data-send><input id="msg" placeholder="Сообщение" autocomplete="off"><button class="circle" aria-label="Отправить">${ic('send')}</button></form></div></div>`};

V.album=()=>{const L=albItems(),f=S.albF,F=L.map((a,i)=>[a,i]).filter(([a])=>!f||(f===1?a.k==='img':a.k==='vid'));return skySub('Альбом',`Снимки и видео ${nm(S.horse,0)}`)+`<div class="stack">
 ${seg(['Все','Фото','Видео'],f,'data-albf','wide')}
 <div class="alb">${F.map(([a,i],j)=>`<button class="u wave ${j%5===0?'w2':''}" data-alb="${i}" aria-label="${esc(a.cap)}" style="${a.k==='img'?`background-image:url(${a.src})`:a.poster?`background-image:url(${a.poster})`:''}">${a.k==='vid'&&!a.poster?`<video src="${a.src}" muted playsinline preload="metadata"></video>`:''}${a.k==='vid'?`<span class="vi">${ic('play','small fill')}</span>`:''}${a.own?'<span class="chip fill sel nwc">новое</span>':''}</button>`).join('')}</div>
 <p class="cap pad">Снимки с камер и видео от конюха сохраняются сюда автоматически. Нажмите «Снимок» на экране камер, чтобы добавить свой.</p>
 <button class="fill large responsive" data-go="cams">${ic('camera')}Сделать снимок с камеры</button></div>`};
V.crew=()=>{S.crewUsed=true;const r=S.crewRole,tabs=r?['Занятия','Публикации']:['Задачи','Кони','Публикации'],tb=Math.min(S.crewTab,tabs.length-1),open=S.tq.filter(o=>!o.done);let body='';
 if(!r&&tb===0)body=`<section class="card">${sh('Заказы владельцев',open.length?`<span class="chip fill sel tiny-chip">${plural(open.length,'новый','новых','новых')}</span>`:'')}${S.tq.length?`<div class="lst">${S.tq.map(o=>`<div class="li top"><span class="lead"><span class="gth">${g3(o.p)}</span></span><span class="tx"><b>${tqName(o)} для ${nm(o.h,0)}</b><small>Анна К. · оплачено в ${o.at}${o.done?` · вручено в ${o.doneAt}`:''}</small>${o.done?`<span class="chip fill sel tiny-chip mt8">${ic('check')}Видео отправлено</span>`:`<span class="acts"><label class="button border small">${ic('video','small')}${o.vid?'Переснять':'Снять видео'}<input type="file" accept="video/*" capture="environment" data-tqfile="${o.n}" hidden></label><button class="small" data-tqok="${o.n}">${o.vid?'Отправить':'Вручено'}</button></span>${o.vid?`<small class="ok">Видео прикреплено</small>`:''}`}</span></div>`).join('')}</div>`:`<p class="cap">Новых заказов нет. Купите угощение в приложении владельца, и заказ появится здесь.</p>`}</section>
 <section class="card">${sh('Дела на смену')}<div class="lst">${CHK.map(([t,s],k)=>`<button class="u wave li chk ${S.chk[k]?'on':''}" data-chk="${k}"><span class="lead"><span class="cb">${ic('check','small')}</span></span><span class="tx"><b>${s}</b><small>${t}</small></span></button>`).join('')}</div><button class="large responsive mt" data-creport>${ic('doc')}Отправить отчёт владельцам</button></section>`;
 if(!r&&tb===1)body=CREWH.map(id=>{const h=H(id),s=hst(id);return `<section class="card"><div class="who">${photoShape('sided-cookie9',M+id+'.jpg','av48')}<span class="tx"><b>${h.name}</b><small>${S.herd.includes(id)?'Владелец: Анна К.':`Владельцев: ${OWN[id]}`}${s.meal?` · кормили в ${s.meal}`:''}</small></span><button class="fill small" data-fed="${id}">${ic('bowl','small')}Покормил</button></div>
  ${[['wb','Самочувствие',['Отличное','Хорошее',fw(id,'Устал','Устала')]],['mood','Настроение',['Бодрое','Спокойное','Игривое']],['where','Где сейчас',['Пастбище','Денник','Плац','Река']]].map(([k,t,o])=>`<small class="cap blk mt">${t}</small><div class="chips wrap">${o.map(x=>`<button class="chip ${s[k]===x?'fill sel':''}" data-hst="${id}|${k}|${x}">${s[k]===x?ic('check'):''}${x}</button>`).join('')}</div>`).join('')}</section>`}).join('');
 if(r&&tb===0){const L=[];S.herd.forEach(id=>TRICKS.forEach(t=>{if(tState(t,id)==='learn')L.push([id,t])}));
  body=`<section class="card">${sh('Трюки сегодня')}${L.length?`<div class="lst">${L.map(([id,t])=>`<div class="li tr"><span class="lead"><span class="tth"><img src="${R3['tr_'+t.id]}" alt=""></span></span><span class="tx"><b>${t.name} · ${H(id).name}</b><small>Занятие ${tDone(t,id)+1} из ${t.lessons}, в 16:00 на плацу</small></span><span class="trail"><button class="small" data-lesson="${id}:${t.id}">Провели</button></span></div>`).join('')}</div>`:'<p class="cap">Сегодня занятий по трюкам нет</p>'}</section>
  <section class="card">${sh('Расписание')}<div class="lst">${[['09:00','Курсы тренировок на плацу','Буран, Ласка, Кедр'],['10:00','Испанский шаг · Буран','Занятие 5 из 7, видео отправлено'],['15:00','Горный выезд с туристами','Шаман и Айна'],['18:00','Видео и замеры для владельцев','После всех занятий']].map(([t,a,b],k)=>`<button class="u wave li chk ${k<2?'on':''}" data-toast="Отмечено в расписании"><span class="lead"><span class="cb">${ic('check','small')}</span></span><span class="tx"><b>${a}</b><small>${t} · ${b}</small></span></button>`).join('')}</div></section>`}
 if(tb===tabs.length-1){const pb=S.pub;body=`<section class="card">${sh('История для владельцев')}<p class="cap">Фото или видео появится в кружках на главной у владельцев коня</p>
  <div class="chips wrap mt8">${CREWH.map(id=>`<button class="chip ${S.pubH===id?'fill sel':''}" data-pubh="${id}">${S.pubH===id?ic('check'):''}${H(id).name}</button>`).join('')}</div>
  <label class="upl u wave">${pb?(pb.vid?`<video src="${pb.url}" muted autoplay loop playsinline></video>`:`<img src="${pb.url}" alt="">`):`${shape('sided-cookie9','medium c-pri',ic('camera'))}<b>Снять фото или видео</b><small>или выбрать из галереи телефона</small>`}<input type="file" accept="image/*,video/*" data-pubfile hidden></label>
  <div class="field label border round mt"><input id="pubcap" value="${esc(S.pubCap)}" placeholder=" "><label for="pubcap">Подпись: ${H(S.pubH).name} после купания</label></div>
  <button class="large responsive mt" data-pub ${pb?'':'disabled'}>Опубликовать</button></section>`}
 const sx=r?[[S.herd.reduce((a,id)=>a+TRICKS.filter(t=>tState(t,id)==='learn').length,0)+2,'занятия сегодня'],[30,'коней на тренировках'],[S.staffStories.length,'историй сегодня']]:[[open.length,'новых заказов'],[S.tq.filter(o=>o.done).length+3,'видео за день'],[12,'коней под присмотром']];
 PG={title:'Смена',back:false};
 return `<header class="hd hsub"><div class="hd-row"><button class="ib wave" data-crewx aria-label="Выйти из панели">${ic('back')}</button><span class="chip fill sel">${ic('key')}Панель сотрудника</span></div><h1 class="disp">Смена</h1><p class="sub">${r?'Марина, тренер':'Алексей, конюх'} · среда, 7 октября</p></header>
 <div class="stack">${seg(['Алексей, конюх','Марина, тренер'],r,'data-crole','wide')}
 <div class="tiles3">${sx.map(([v,t],j)=>`<div class="tile ${['c-pri','c-sec','c-ter'][j]}"><b class="price">${v}</b><small>${t}</small></div>`).join('')}</div>
 <div class="tabs left-align ctabs">${tabs.map((t,k)=>`<a class="${tb===k?'active':''}" data-ctab="${k}">${t}${k===0&&!r&&open.length?` <span class="badge none-pos">${open.length}</span>`:''}</a>`).join('')}</div>
 ${body}
 <p class="cap pad">Это демо панели для сотрудников Marali. Всё, что вы отметите здесь, сразу появится в приложении владельца.</p></div>`};

/* ---------- роутер ---------- */
const TABS=[['catalog','Каталог','grid'],['trips','Поездки','mount'],['home','Мой конь','horse'],['club','Клуб','club'],['profile','Профиль','user']];
const TAB_OF={album:'home',crew:'profile',home:'home',cams:'home',report:'home',stats:'home',health:'home',shop:'home',purchases:'home',buyout:'home',notif:'home',catalog:'catalog',horse:'catalog',staff:'catalog',tariff:'catalog',gift:'catalog',trips:'trips',tour:'trips',bookings:'trips',club:'club',profile:'profile',payments:'profile'};
const NO_TABS=['crew','welcome','login','code','pay','paid','book','chat','tour','horse','staff','tariff','buyout','gift'];
const ROOTS=['home','catalog','trips','club','profile','welcome'];
function tabbar(t){return TABS.map(([k,l,i])=>`<button class="u nb ${k==='home'?'main':''} ${k===t?'on':''}" data-go="${k}" aria-label="${l}"><span class="ind">${ic(i,k===t?'fill':'')}</span><span class="lb">${l}</span></button>`).join('')}
let enT=0;function render(mode,y){let r=(location.hash.replace(/^#\/?/,'')||'home').split('/');let [n,arg]=r;if(!V[n])n='home';
 if(!S.owner&&['home','cams','report','stats','health','purchases','buyout','profile'].includes(n)){n='welcome'}
 const app=document.getElementById('app');app.className='app'+(ROOTS.includes(n)?' root':' subp')+(NO_TABS.includes(n)?' nobar':'')+' v-'+n;
 app.innerHTML=V[n](arg);
 const tb=document.getElementById('tabbar'),t=TAB_OF[n];tb.classList.toggle('gone',NO_TABS.includes(n));tb.innerHTML=tabbar(t);
 const top=document.getElementById('topbar');top.innerHTML=`${PG.back?`<button class="ib wave" data-back aria-label="Назад">${ic('back')}</button>`:'<span class="sp"></span>'}<b>${PG.title||''}</b>`;top.classList.toggle('hide',n==='welcome');
 if(y!=null)window.scrollTo(0,y);
 topScan();camHook();reveal(mode);
 if(mode){app.classList.add('enter');clearTimeout(enT);enT=setTimeout(()=>app.classList.remove('enter'),900);rvSetup()}
 if(n!=='crew'&&S.pending.length){const q=S.pending.splice(0);q.forEach((x,k)=>setTimeout(()=>banner(...x),700+k*5600))}
 if(n==='chat'){const m=document.getElementById('msgs');m&&m.lastElementChild&&m.lastElementChild.scrollIntoView({block:'end'})}
 try{globalThis.ui&&ui()}catch(e){}
}
/* верхняя панель: появляется, когда крупный заголовок уехал под край */
let tsT=0;function topScan(){const h=document.querySelector('#app .hd h1, #app .ttl h1'),top=document.getElementById('topbar');if(!top)return;const y=scrollY;
 top.classList.toggle('lift',y>4);top.classList.toggle('on',!!h&&h.getBoundingClientRect().bottom<64)}
addEventListener('scroll',()=>{if(!tsT)tsT=requestAnimationFrame(()=>{tsT=0;topScan()})},{passive:true});

function go(r){if(location.hash==='#/'+r){render('tab');return}location.hash='/'+r}
function rerender(){const y=scrollY;render();window.scrollTo(0,y);topScan()}
const DEPTH={cams:1,report:1,stats:1,health:1,shop:1,purchases:2,buyout:1,notif:1,album:1,horse:1,staff:2,tariff:2,pay:3,paid:4,gift:1,tour:1,book:2,bookings:1,payments:1,chat:1,login:1,code:2,crew:1};
const dep=n=>ROOTS.includes(n)?0:DEPTH[n]||1;
function navDir(a,b){const x=dep(a),y=dep(b);if(x!==y)return y>x?'fwd':'back';return a===b?'tab':'tab'}
let vtN=0;function transition(dir,fn){if(!document.startViewTransition||RM&&dir!=='tab'&&false){fn();const a=document.getElementById('app');a.classList.add('pg-'+dir);setTimeout(()=>a.classList.remove('pg-'+dir),600);return}const h=document.documentElement;h.dataset.dir=dir;h.classList.add('vt');vtN++;const end=()=>{if(--vtN<=0){vtN=0;h.classList.remove('vt')}};try{document.startViewTransition(fn).finished.finally(end)}catch(e){end();fn()}}
const SCR={},nk=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function hk(ia){const st=history.state;try{if(!st)history.replaceState({ia,k:nk()},'');else if(st.k==null)history.replaceState({...st,k:nk()},'')}catch(e){}return history.state&&history.state.k}
function keepY(y){const k=curK;let n=0;(function f(){if(curK!==k||!y)return;const m=document.documentElement.scrollHeight-innerHeight;if(scrollY<y-2&&m>scrollY+2)window.scrollTo(0,Math.min(y,m));if(m<y-2&&n++<40)requestAnimationFrame(f)})()}
try{history.scrollRestoration='manual'}catch(e){}
let lastR=curRoute(),curK=hk(0);
addEventListener('scroll',()=>{SCR[curK]=scrollY},{passive:true});
addEventListener('hashchange',()=>{const st=history.state,seen=!!(st&&st.k!=null),k=hk(1);closeSheet();if(SV)svClose(true);const to=curRoute(),dir=navDir(lastR,to);lastR=to;transition(dir,()=>{curK=k;const y=seen&&SCR[k]||0;render(dir,y);keepY(y)})});

/* ---------- шторки, снекбар ---------- */
let tt;function toast(m){const t=document.getElementById('toast');t.innerHTML=`<span class="max">${esc(m)}</span>`;t.classList.add('active');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('active'),2600)}
function sheet(html){const s=document.getElementById('sheet');s.innerHTML='<div class="grab" aria-hidden="true"></div>'+html;s.scrollTop=0;s.classList.add('active');document.getElementById('scrim').classList.add('active');try{globalThis.ui&&ui()}catch(e){}}
const sheetOpen=()=>document.getElementById('sheet').classList.contains('active');
function closeSheet(){document.getElementById('sheet').classList.remove('active');document.getElementById('scrim').classList.remove('active');const v=document.querySelector('#sheet video');v&&v.pause()}
document.getElementById('scrim').onclick=closeSheet;addEventListener('keydown',e=>{if(e.key==='Escape'){if(SV)svClose();else closeSheet()}if(SV&&e.key==='ArrowRight')svNext();if(SV&&e.key==='ArrowLeft')svPrev()});
/* шторку можно смахнуть вниз за ручку или шапку */
{const s=document.getElementById('sheet');let y0=0,dy=0,on=false;s.addEventListener('pointerdown',e=>{if(s.scrollTop>0||!e.target.closest('.grab,h2,.sht'))return;on=true;y0=e.clientY;dy=0;s.style.transition='none'});
 addEventListener('pointermove',e=>{if(!on)return;dy=Math.max(0,e.clientY-y0);s.style.transform=`translateY(${dy}px)`});
 const up=()=>{if(!on)return;on=false;s.style.transition='';s.style.transform='';if(dy>90)closeSheet()};addEventListener('pointerup',up);addEventListener('pointercancel',up)}
const kvs=L=>`<div class="kvs">${L.map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div>`;
function trainSheet(k){const s=stats(S.horse).find(x=>x.k===k),gp=Math.max(0,Math.min(6,s.c-s.p)),gain=Math.round(s.norm*gp/100),cur=S.training&&stats(S.horse).find(x=>x.k===S.training);
 const btn=s.max?`<button class="border extra responsive" disabled>Прокачано полностью</button>`:S.training===k?`<button class="border extra responsive" disabled>Идёт курс, неделя 1 из 3</button>`:cur?`<button class="border extra responsive" disabled>Сейчас идёт курс «${cur.name}»</button><p class="cap center mt8">Тренер ведёт один курс за раз</p>`:`<button class="extra responsive" data-course="${k}">Начать курс за ${rub(7500)}</button>`;
 sheet(`<div class="sht">${shape('sunny','medium c-pri',ic(({speed:'speed',jump:'height',load:'weight',power:'fit',stamina:'walk',climb:'mount'})[k]))}<div><h2>${s.name}</h2><p class="cap">Курс тренировок с Мариной, 3 недели</p></div></div>${kvs([['Сейчас',s.v+' '+s.u],['Норма породы',s.norm+' '+s.u],['Предел по ветеринару',s.cap+' '+s.u],['За курс',s.max?'—':`+${gain} ${s.u}`]])}${btn}`)}
function learnSheet(id){const t=TRICKS.find(x=>x.id===id),cur=TRICKS.find(x=>tState(x,S.horse)==='learn');
 sheet(`<div class="center"><span class="shape sided-cookie12 extra c-pri tbig"><img src="${R3['tr_'+id]}" alt=""></span><h2>${t.name}</h2><p class="cap">${t.lessons} занятий с Мариной, видео с каждого</p></div>${kvs([['Занятий',t.lessons],['Стоимость',rub(t.price)]])}${cur?`<button class="border extra responsive" disabled>Сейчас изучается «${cur.name}»</button><p class="cap center mt8">Новый трюк можно начать после него</p>`:`<button class="extra responsive" data-learn-go="${id}">Начать за ${rub(t.price)}</button>`}`)}
function confetti(){const c=document.createElement('canvas'),x=c.getContext('2d'),W=c.width=innerWidth*devicePixelRatio,H=c.height=innerHeight*devicePixelRatio;c.className='confetti';document.body.appendChild(c);const st=getComputedStyle(document.body);
 const cols=['--primary','--primary-container','--tertiary','--tertiary-container','--secondary-container','--gold'].map(v=>st.getPropertyValue(v).trim()||'#fc0'),P=Array.from({length:150},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.42,vx:(Math.random()-.5)*W*.022,vy:-(Math.random()*H*.022+H*.008),r:Math.random()*Math.PI,vr:(Math.random()-.5)*.3,s:(5+Math.random()*6)*devicePixelRatio,k:Math.random()*3|0,c:cols[Math.random()*cols.length|0]}));
 let t0=performance.now();(function f(t){const dt=Math.min(32,t-t0)/16;t0=t;x.clearRect(0,0,W,H);P.forEach(p=>{p.vy+=H*.0009*dt;p.vx*=.99;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.beginPath();if(p.k===0)x.arc(0,0,p.s/1.6,0,7);else if(p.k===1)x.roundRect?x.roundRect(-p.s,-p.s/2.5,p.s*2,p.s/1.25,p.s/2.5):x.rect(-p.s,-p.s/2.5,p.s*2,p.s/1.25);else{for(let j=0;j<10;j++){const a=j*Math.PI/5,rr=j%2?p.s*.45:p.s;x.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}}x.fill();x.restore()});if(P.some(p=>p.y<H+40))requestAnimationFrame(f);else c.remove()})(t0)}
function unlockPop(ids){const t=TRICKS.find(x=>x.id===ids[0]),cur=TRICKS.find(x=>tState(x,S.horse)==='learn');const el=document.createElement('div');el.className='pop-bg';
 el.innerHTML=`<div class="pop"><span class="pw">${shape('sunny','pbg slow-rotate')}<img src="${R3['tr_'+t.id]}" alt=""></span><span class="chip fill sel">${ic('lock','small')}Новый трюк открыт</span><h2>${t.name}</h2><p class="cap">${H(S.horse).name} достиг нужного уровня: ${t.need[2].replace('прыжке','прыжок').replace('силе','сила')}. ${cur?`Начать занятия можно после трюка «${cur.name}».`:'Можно начинать занятия.'}</p>${cur?`<button class="extra responsive" data-pop-close>Отлично</button>`:`<button class="extra responsive" data-learn="${t.id}" data-pop-close>Изучить за ${rub(t.price)}</button><button class="transparent responsive mt8" data-pop-close>Позже</button>`}</div>`;
 document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('on'));confetti();
 el.addEventListener('click',e=>{if(e.target===el||e.target.closest('[data-pop-close]'))popClose(el)})}
function popClose(el){el.classList.remove('on');setTimeout(()=>el.remove(),300)}
function startCourse(k){const h=S.horse,s0=stats(h).find(x=>x.k===k),gp=Math.max(0,Math.min(6,s0.c-s0.p));closeSheet();S.training=k;rerender();toast(`Курс «${s0.name}» начат. Марина пришлёт видео с занятий`);
 setTimeout(()=>{if(S.training!==k)return;const u0=unlocked(h);S.boost[h+k]=(S.boost[h+k]||0)+gp;S.training=null;S.xp+=300;rerender();const s1=stats(h).find(x=>x.k===k);
  document.querySelectorAll('.rings').forEach(x=>x.classList.add('in'));const a=document.querySelector(`.ring[data-train="${k}"]`);if(a){a.classList.add('grew');setTimeout(()=>a.classList.remove('grew'),1400)}
  toast(`Курс завершён: ${s1.name.toLowerCase()} теперь ${s1.v} ${s1.u}. +300 XP`);const nu=unlocked(h).filter(x=>!u0.includes(x));if(nu.length)setTimeout(()=>unlockPop(nu),900)},4500)}
function medalSheet(k){const m=MED[k];sheet(`<div class="center">${shape(SHAPES[k],'extra ms big '+(m[2]?'on':''),ic(m[1]==='play'?'movie':m[1]==='sun'?'light':m[1],'extra'))}<h2>${m[0]}</h2><p class="cap">${m[2]?'Получена':'Пока не получена'}</p></div>${kvs([['Условие',m[3]],['Награда',m[4]],...(m[5]?[['Прогресс',`${m[5][0]} из ${m[5][1]}`]]:[])])}${m[5]&&!m[2]?`<progress class="wavy mt8" value="${Math.min(m[5][0],m[5][1])}" max="${m[5][1]}"></progress>`:''}`)}
function trickSheet(id){const t=TRICKS.find(x=>x.id===id)||TRICKS[0],dt=S.tdate[S.horse+':'+t.id]||t.date||'7 октября';sheet(`<div class="sht"><div><h2>${t.name}</h2><p class="cap">Освоен ${dt}, занятия вела Марина</p></div></div><video class="video" src="${M}arena.mp4" poster="${M}arena.jpg" controls autoplay muted playsinline></video>`)}
function evSheet(k){const e=EVU[k],A=[[`<button class="extra responsive" data-camgo="2">${ic('play')}Смотреть трансляцию в 16:00</button>`,'Марина проведёт занятие на рыси и поработает над поклоном. Трансляция будет с камеры на плацу, запись сохранится в отчёте.'],[`<button class="extra responsive" data-close-go="health">Открыть медкарту</button>`,'Плановый осмотр: зубы, копыта, взвешивание. Ветеринар Игорь Сабашкин пришлёт заключение в медкарту в тот же день.'],[`<button class="extra responsive" data-close-go="bookings">Моя бронь</button>`,'Тур «Кержаки», 12–15 июня 2027. Вы едете вдвоём, программа и список вещей придут за месяц до поездки.']][k];
 sheet(`<div class="sht"><span class="dt big"><b>${e[0]}</b><small>${e[1]}</small></span><div><h2>${e[2]}</h2><p class="cap">${e[3]}</p></div></div><p class="txt mb">${A[1]}</p>${A[0]}<button class="border extra responsive mt8" data-close-toast="Напомним за час до начала">${ic('bell')}Напомнить</button>`)}
function ringSheet(id,k){const s=stats(id).find(x=>x.k===k),h=H(id);sheet(`<div class="center rinfo"><span class="rgv big">${ringSvg(s.p/100,s.gold)}<span class="rval"><b>${s.v}</b><small>${s.u}</small></span></span><h2>${s.name}</h2><p class="cap">${s.gold?'Выше нормы породы':s.max?'Прокачано до потолка':'Норма породы '+h.breed.toLowerCase()+' '+s.norm+' '+s.u}</p></div>${kvs([['Сейчас',s.v+' '+s.u],['Норма породы',s.norm+' '+s.u],['Потолок по ветеринару',s.cap+' '+s.u]])}<p class="cap">Владелец может записать ${nm(id,2)} на курс тренировок: 2–4 недели с тренером, после курса кольцо растёт.</p>`)}
function say(v){S.chat.push(['out',v,'сейчас']);rerender();const l=v.toLowerCase(),a=/передайте/.test(l)?'Обязательно передам! Ребятам очень приятно, когда владельцы пишут.':/гост|приех|день с кон/.test(l)?'Будем рады! Ближайшие свободные даты для «Дня с конём»: 17 и 24 октября. Какая вам удобнее?':/дела|как он|как она/.test(l)?`${H(S.horse).name} в порядке: сегодня гуляли на пастбище и купались в реке. Вечером Алексей пришлёт отчёт с видео.`:/оплат|спис|чек/.test(l)?'Подскажите, что именно: списание, смена тарифа или чек? Все чеки лежат в «Истории платежей».':'Спасибо! Уточню у Алексея и отвечу в течение пяти минут.';setTimeout(()=>{S.chat.push(['in',a,'сейчас']);if(location.hash.includes('chat'))rerender()},1200)}
const PARENT={cams:'home',report:'home',stats:'home',health:'home',shop:'home',purchases:'shop',buyout:'home',notif:'home',horse:'catalog',staff:'home',tariff:a=>'horse/'+a,pay:a=>'tariff/'+a,paid:'home',gift:'profile',tour:'trips',book:'tour',bookings:'trips',payments:'profile',chat:'profile',login:'welcome',code:'login',album:'home'};
function parentOf(){const [n,a]=(location.hash.replace(/^#\/?/,'')||'home').split('/'),p=PARENT[n];return typeof p==='function'?p(a):p||'home'}
function herdSheet(){sheet(`<div class="sht"><div><h2>Мои кони</h2><p class="cap">Выберите, чей день смотреть</p></div></div><div class="lst">${S.herd.map(id=>{const h=H(id);return row(photoShape('sided-cookie9',M+id+'.jpg','av56'),h.name,`${h.breed}, ${h.age} ${h.age<5?'года':'лет'}`,id===S.horse?`<span class="chk1">${ic('check')}</span>`:'',`data-myhorse="${id}"`,id===S.horse?'me':'')}).join('')}</div><button class="fill extra responsive mt" data-close-go="catalog">${ic('plus')}Взять ещё коня</button>`)}
function treatSheet(){sheet(`<div class="sht"><div><h2>Угостить ${nm(S.horse,2)}</h2><p class="cap">Конюх вручит сегодня и снимет видео</p></div></div><div class="lst">${TREATS.map(([k])=>SHOP.find(p=>p.id===k)).map(p=>row(`<span class="gth">${g3(p.id)}</span>`,p.name,p.info,`<b>${rub(p.price)}</b>`,`data-order="${p.id}"`)).join('')}</div><button class="border extra responsive mt" data-shop="Все">Весь магазин</button>`)}
function prodSheet(id){const p=SHOP.find(x=>x.id===id);sheet(`<div class="pim">${shape('sided-cookie12','pbg2 slow-rotate')}${G3.includes(p.id)?g3(p.id):ic(p.art,'extra')}</div><span class="chip">${p.cat}</span><h2 class="mt8">${p.name}</h2><p class="txt mb">${p.info}</p><button class="extra responsive" data-order="${p.id}">Купить за ${rub(p.price)}</button>`)}

const TQ_AUTO=40000;
function tqSave(){LS.set('tq',S.tq.map(o=>({...o,vid:null})))}
function slotTime(){const [h,m]=altai();let t=Math.ceil((h*60+m+45)/15)*15;if(t<7*60||t>21*60)return 'утром в 07:30';return 'сегодня в '+hm(Math.floor(t/60)%24,t%60)}
function newTq(pid){const o={n:++S.tqN,p:pid,h:S.horse,t:Date.now(),slot:slotTime(),at:nowT(),done:0,seen:0,vid:null};LS.set('tqn',S.tqN);S.tq.unshift(o);tqSave();return o}
function albSave(){LS.set('album',S.album.filter(a=>!a.blob).slice(0,24))}
function tqDone(o){if(o.done)return;o.done=Date.now();o.doneAt=nowT();tqSave();
 S.album.unshift({k:'vid',src:o.vid||M+'pasture.mp4',poster:o.vid?'':M+'pasture.jpg',cap:tqGot(o),d:'7 октября, '+o.doneAt,h:o.h,blob:!!o.vid,own:1});albSave();
 push(tqGot(o),o.vid?'Алексей снял видео, посмотрите':'Алексей прислал видео','home','apple')}
function tqSheet(n){const o=S.tq.find(x=>x.n==n);if(!o)return;o.seen=1;tqSave();
 sheet(`<div class="vc big"><video src="${o.vid||M+'pasture.mp4'}" ${o.vid?'controls':`muted poster="${M}pasture.jpg"`} autoplay loop playsinline></video></div><h2 class="mt">${tqGot(o)}</h2><p class="cap mb">Видео от Алексея в ${o.doneAt}. Сохранили в альбом</p><div class="two"><button class="border large" data-close-toast="Алексей получит ваше спасибо">${ic('heart')}Спасибо</button><button class="large" data-treat>Угостить ещё</button></div>`);
 const b=document.getElementById('tqbox');if(b)b.innerHTML=tqCards()}
setInterval(()=>{let ch=0;S.tq.forEach(o=>{if(o.done)return;const st=tqStage(o);if(st!==o.st){o.st=st;ch=1}if(!S.crewUsed&&Date.now()-o.t>TQ_AUTO){tqDone(o);ch=1}});
 if(!ch)return;const r=curRoute(),b=document.getElementById('tqbox');if(r==='home'&&b)b.innerHTML=tqCards();else if((r==='purchases'||r==='crew')&&!sheetOpen())rerender()},1000);

let pT=0;function push(title,body,go,icn){S.notifs.unshift([icn||'bell',title,body,nowT(),go||'home']);S.unread=1;
 if(document.hidden&&'Notification' in window&&Notification.permission==='granted'&&navigator.serviceWorker)navigator.serviceWorker.ready.then(r=>r.showNotification(title,{body,icon:'icons/icon-192.png',badge:'icons/icon-192.png',tag:'kn'+Date.now(),data:{hash:'#/'+(go||'home')}})).catch(()=>{});
 if(curRoute()==='crew'){S.pending.push([title,body,go]);return}banner(title,body,go)}
function banner(title,body,go){const p=document.getElementById('push');p.innerHTML=`<img src="icons/icon-192.png" alt=""><span class="tx"><small>Конешеринг · сейчас</small><b>${esc(title)}</b><span>${esc(body)}</span></span>`;p.dataset.to=go||'home';p.classList.add('on');hap('ok');clearTimeout(pT);pT=setTimeout(()=>p.classList.remove('on'),5200);
 const bell=document.querySelector('.ib[data-go=notif]');if(bell&&!bell.querySelector('.badge'))bell.insertAdjacentHTML('beforeend','<span class="badge none"></span>')}

/* истории */
let SV=null;
function openStory(k){const L=storyList();if(!L[k])return;const el=document.createElement('div');el.className='sv';{const b=document.querySelector(`[data-story="${k}"]`),w=Math.min(innerWidth,520),x0=(innerWidth-w)/2;if(b){const r=b.getBoundingClientRect();el.style.setProperty('--ox',(r.left+r.width/2-x0)+'px');el.style.setProperty('--oy',(r.top+r.height/2)+'px')}}el.setAttribute('role','dialog');document.body.appendChild(el);SV={L,k,i:0,el,elapsed:0,dur:5000,last:0,paused:false,held:false,raf:0,liked:{}};
 try{history.pushState({...(history.state||{}),sv:1},'')}catch(e){}
 let y0=0,dy=0,hold=0;el.addEventListener('pointerdown',e=>{y0=e.clientY;dy=0;hold=setTimeout(()=>{if(SV){SV.paused=SV.held=true;const v=el.querySelector('video');v&&v.pause()}},220)});
 el.addEventListener('pointermove',e=>{if(!y0)return;dy=Math.max(0,e.clientY-y0);if(dy>8){clearTimeout(hold);el.style.transform=`translateY(${dy}px) scale(${1-dy/2000})`;el.style.transition='none'}});
 const up=()=>{clearTimeout(hold);el.style.transition='';if(dy>110){svClose();return}el.style.transform='';y0=0;if(SV&&SV.held){setTimeout(()=>{if(!SV)return;SV.paused=false;const v=el.querySelector('video');v&&v.play().catch(()=>{})},0)}};
 el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
 svShow();requestAnimationFrame(()=>el.classList.add('on'));hap()}
function svSrc(m,vid){return /^(blob:|data:|https?:)/.test(m)?m:M+m+(vid?'.mp4':'.jpg')}
function svShow(){const s=SV.L[SV.k],it=s.it[SV.i],st=STAFF[s.who],id=S.horse,src=svSrc(it[0],it[1]),ext=/^(blob:|data:)/.test(it[0]),nm1=st.name.split(' ')[0];
 SV.el.innerHTML=`<div class="md">${it[1]?`<video src="${src}" ${ext?'':`poster="${M+it[0]}.jpg"`} autoplay ${ext?'':'muted'} playsinline></video>`:`<img src="${src}" alt="">`}</div>
 <div class="pb">${s.it.map((x,j)=>`<span><b style="width:${j<SV.i?100:0}%"></b></span>`).join('')}</div>
 <div class="who">${photoShape('sided-cookie9',M+st.img+'.jpg','av40')}<span class="tx"><b>${nm1}, ${st.role.toLowerCase()}</b><small>${s.title} · ${s.t}</small></span><button class="ib onimg" data-svx aria-label="Закрыть">${ic('close')}</button></div>
 <button class="u tap l" data-svp aria-label="Назад"></button><button class="u tap r" data-svn aria-label="Дальше"></button>
 <p class="cap2">${esc(it[2](id))}</p>
 <div class="act"><button class="ib onimg lv ${SV.liked[s.id]?'on':''}" data-svl aria-label="Нравится">${ic('heart',SV.liked[s.id]?'fill':'')}</button><button class="onimg large grow" data-svr>${ic('chat')}Ответить ${nm1==='Алексей'?'Алексею':'Марине'}</button></div>`;
 if(!S.seen.includes(s.id+':'+id)){S.seen.push(s.id+':'+id);LS.set('seen',S.seen)}
 SV.elapsed=0;SV.dur=5000;SV.paused=false;SV.held=false;const v=SV.el.querySelector('video');if(v){SV.dur=8000;v.addEventListener('loadedmetadata',()=>{if(SV)SV.dur=Math.min(12000,Math.max(3000,(v.duration||5)*1000))},{once:true})}
 cancelAnimationFrame(SV.raf);SV.last=performance.now();SV.raf=requestAnimationFrame(svTick)}
function svTick(t){if(!SV)return;const dt=Math.min(100,t-SV.last);SV.last=t;if(!SV.paused)SV.elapsed+=dt;const b=SV.el.querySelectorAll('.pb b')[SV.i];if(b)b.style.width=Math.min(100,SV.elapsed/SV.dur*100)+'%';if(SV.elapsed>=SV.dur){svNext();return}SV.raf=requestAnimationFrame(svTick)}
function svNext(){const s=SV.L[SV.k];if(SV.i<s.it.length-1)SV.i++;else if(SV.k<SV.L.length-1){SV.k++;SV.i=0}else{svClose();return}svShow()}
function svPrev(){if(SV.i>0)SV.i--;else if(SV.k>0){SV.k--;SV.i=0}else SV.elapsed=0;svShow()}
function svClose(fromPop){if(!SV)return;cancelAnimationFrame(SV.raf);const el=SV.el;SV=null;el.classList.remove('on');setTimeout(()=>el.remove(),280);
 if(!fromPop&&history.state&&history.state.sv)history.back();const r=document.querySelector('.stories');if(r)r.outerHTML=storiesRow()}
addEventListener('popstate',()=>{if(SV&&!(history.state&&history.state.sv))svClose(true)});
function thumbOf(url){return new Promise(res=>{const v=document.createElement('video');v.muted=true;v.playsInline=true;v.preload='auto';v.src=url;const t=setTimeout(()=>res(''),5000);
 v.addEventListener('loadeddata',()=>{try{v.currentTime=Math.min(.5,(v.duration||1)/2)}catch(e){}},{once:true});
 v.addEventListener('seeked',()=>{try{const c=document.createElement('canvas'),w=240;c.width=w;c.height=Math.round(w*v.videoHeight/v.videoWidth)||w;c.getContext('2d').drawImage(v,0,0,c.width,c.height);clearTimeout(t);res(c.toDataURL('image/jpeg',.7))}catch(e){res('')}},{once:true});v.addEventListener('error',()=>res(''),{once:true})})}

function camHook(){document.querySelectorAll('.cam video').forEach(v=>{const c=v.closest('.cam'),ok=()=>c.classList.add('ok');if(v.readyState>=3)ok();v.addEventListener('playing',ok,{once:true});v.addEventListener('canplay',()=>setTimeout(ok,300),{once:true});setTimeout(ok,4500);
 v.addEventListener('error',()=>{if(navigator.onLine===false)rerender()},{once:true})})}
function snap(){const c=document.querySelector('.cam'),v=c&&c.querySelector('video'),k=CAMS[S.cam][0];let src=M+k+'.jpg';
 if(v&&v.videoWidth){try{const cv=document.createElement('canvas'),w=640;cv.width=w;cv.height=Math.round(w*v.videoHeight/v.videoWidth);const x=cv.getContext('2d');if(isNight())x.filter='grayscale(1) contrast(1.3) brightness(.9)';x.drawImage(v,0,0,cv.width,cv.height);src=cv.toDataURL('image/jpeg',.8)}catch(e){}}
 if(c){const f=document.createElement('span');f.className='flash';c.appendChild(f);setTimeout(()=>f.remove(),600)}
 hap('snap');S.album.unshift({k:'img',src,cap:`Снимок с камеры «${CAMS[S.cam][1]}»`,d:'7 октября, '+nowT(),h:S.horse,own:1});albSave();toast('Снимок сохранён в альбом')}
function albSheet(i){const a=albItems()[i];if(!a)return;sheet(`${a.k==='vid'?`<video class="video" src="${a.src}" ${a.poster?`poster="${a.poster}"`:''} controls autoplay ${a.blob?'':'muted'} playsinline style="aspect-ratio:auto;max-height:60dvh"></video>`:`<img src="${a.src}" alt="" class="aimg">`}<h2 class="mt">${esc(a.cap)}</h2><p class="cap mb">${a.d}</p><div class="two"><a class="button border large" href="${a.src}" download="koneshering-${i}.${a.k==='vid'?'mp4':'jpg'}">${ic('dl')}Скачать</a>${navigator.share?`<button class="large" data-share="${i}">${ic('share')}Поделиться</button>`:''}</div>`)}
async function shareAlb(i){const a=albItems()[i];try{const b=await (await fetch(a.src)).blob(),f=new File([b],'koneshering.'+(a.k==='vid'?'mp4':'jpg'),{type:b.type});if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:a.cap,text:a.cap+' · Конешеринг, Marali'});else await navigator.share({title:'Конешеринг',text:a.cap,url:location.origin+location.pathname})}catch(e){}}

function quizSheet(){const k=S.qz.length;if(k<3){const [q,opts]=QZ[k];sheet(`<div class="qz"><progress class="wavy" value="${k+1}" max="3"></progress><small class="cap blk mt">Вопрос ${k+1} из 3</small><h2>${q}</h2><div class="opts">${opts.map(([i,t,v],j)=>`<button class="u wave opt" data-qa="${v}">${shape(['sided-cookie9','sunny','flower'][j],'small c-pri',ic(i,'small'))}<span>${t}</span>${ic('arrow')}</button>`).join('')}</div>${k?`<button class="transparent responsive mt8" data-qb>${ic('back','small')}Назад</button>`:''}</div>`);return}
 const sc=HORSES.map(h=>({h,s:S.qz.reduce((a,v)=>a+QW[h.id][v],0)+(seatInfo(h).free?.5:0)})).sort((a,b)=>b.s-a.s),pc=x=>Math.min(98,Math.round(58+x.s/9.5*40)),top=sc[0],h=top.h;
 const why=S.qz.filter(v=>QW[h.id][v]>=2).map(v=>QWHY[v]);
 sheet(`<div class="qz"><small class="cap blk">Вам подходит</small><button class="u wave hcard qh" data-close-go="horse/${h.id}"><span class="ph" style="background-image:url(${M}${h.id}.jpg)"><span class="chip fill sel mine">${ic('favorite','small fill')}Совпадение ${pc(top)}%</span></span><span class="in"><span class="nmrow"><b class="nm">${h.name}</b></span><small>${h.breed}, ${h.age} ${h.age<5?'года':'лет'}. ${h.temper}</small></span></button>
 <div class="lst">${why.map(w=>row(icb('check','c-pri'),w,'')).join('')}</div>
 <h3 class="mt">Ещё подходят</h3><div class="lst">${sc.slice(1,3).map(x=>row(photoShape('sided-cookie9',M+x.h.id+'.jpg','av48'),x.h.name,`${x.h.breed}, ${x.h.temper.toLowerCase()}`,`<span class="chip">${pc(x)}%</span>`,`data-close-go="horse/${x.h.id}"`)).join('')}</div>
 <button class="extra responsive mt" data-close-go="horse/${h.id}">Смотреть ${nm(h.id,2)}</button><button class="transparent responsive mt8" data-qr>Пройти заново</button></div>`)}

let BIP=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();BIP=e;if(['home','profile'].includes(curRoute()))rerender()});
addEventListener('appinstalled',()=>{BIP=null;toast('Готово! Конешеринг на главном экране');hap('ok')});
async function install(){if(BIP){const b=BIP;BIP=null;b.prompt();try{const r=await b.userChoice;if(r.outcome==='accepted')toast('Устанавливаем на главный экран')}catch(e){}rerender();return}
 const ios=document.documentElement.classList.contains('wk');sheet(`<div class="sht"><div><h2>Установить на телефон</h2><p class="cap">Конешеринг откроется как обычное приложение: со своей иконкой, на весь экран и без адресной строки</p></div></div><div class="lst">${(ios?[['share','Нажмите «Поделиться» внизу экрана'],['plus','Выберите «На экран Домой»'],['check','Нажмите «Добавить»']]:[['more','Откройте меню браузера: три точки или три полоски'],['plus','Выберите «Установить приложение», «Добавить ярлык» или «На главный экран»'],['check','Подтвердите, и иконка появится на рабочем столе']]).map(([i,t],k)=>row(icb(i,'c-pri'),t,`Шаг ${k+1}`)).join('')}</div><button class="extra responsive mt" data-close-toast="Ждём вас на главном экране">Понятно</button>`)}
async function notifOn(){if(!('Notification' in window)){toast('Этот браузер не умеет показывать уведомления');return}let r='denied';try{r=await Notification.requestPermission()}catch(e){}rerender();
 if(r==='granted'){toast('Уведомления включены');hap('ok');if(navigator.serviceWorker)navigator.serviceWorker.ready.then(g=>g.showNotification('Конешеринг',{body:`Готово! Сюда будут приходить видео и новости про ${nm(S.horse,2)}`,icon:'icons/icon-192.png',data:{hash:'#/home'}})).catch(()=>{})}else toast('Уведомления выключены в настройках браузера')}
let RV=null;function rvSetup(){RV&&RV.disconnect();if(!('IntersectionObserver' in window))return;const H0=innerHeight;RV=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');RV.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px'});
 document.querySelectorAll('#app .stack>*,#app .grid2>*,#app .cgrid>*').forEach(el=>{if(el.getBoundingClientRect().top>H0-20){el.classList.add('rv');RV.observe(el)}})}
let IO=null;function reveal(mode){const L=document.querySelectorAll('.rings');if(!mode||RM||!('IntersectionObserver' in window)){L.forEach(e=>e.classList.add('in'));return}
 IO&&IO.disconnect();IO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');countUp(e.target);IO.unobserve(e.target)}}),{threshold:.3});L.forEach(e=>IO.observe(e))}
function countUp(el){el.querySelectorAll('.rval b').forEach(t=>{const to=+t.textContent;if(!to)return;const t0=performance.now(),D=1150;t.textContent='0';(function f(n){const q=Math.min(1,(n-t0)/D);t.textContent=Math.round(to*(1-Math.pow(1-q,3)));if(q<1)requestAnimationFrame(f)})(t0)})}

/* ---------- клики ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('button,a,label.seed,[data-go],[role=button]');if(!t)return;const d=t.dataset;
 if(t.matches('button,.chip,.nb,.ti,.ring,.medal,.story,.opt,.chk,.hcard'))hap();
 if(t.id==='push'){t.classList.remove('on');go(t.dataset.to||'home');return}
 if(SV){if(d.svx!==undefined){svClose();return}if(d.svn!==undefined){if(SV.held){SV.held=false;return}svNext();return}if(d.svp!==undefined){if(SV.held){SV.held=false;return}svPrev();return}
  if(d.svl!==undefined){const s=SV.L[SV.k];SV.liked[s.id]=!SV.liked[s.id];t.classList.toggle('on',SV.liked[s.id]);t.querySelector('i').classList.toggle('fill',SV.liked[s.id]);if(SV.liked[s.id]){hap('ok');toast(`${STAFF[s.who].name.split(' ')[0]} увидит, что вам понравилось`)}return}
  if(d.svr!==undefined){const w=SV.L[SV.k].who;svClose();go('chat');say(`Передайте ${w==='marina'?'Марине':'Алексею'} спасибо за историю!`);return}}
 if(d.story){openStory(+d.story);return}
 if(d.call!==undefined){e.stopPropagation();toast(isNight()?`Ночью ${nm(S.horse,2)} не будим, Алексей позовёт утром`:`Алексей позовёт ${nm(S.horse,2)} к камере`);return}
 if(d.retry!==undefined){e.stopPropagation();if(navigator.onLine===false||S.camMode==='off'){toast(S.camMode==='off'?'Демо-режим «Нет сети», переключите камеру в профиле':'Интернета пока нет, попробуем ещё раз');return}rerender();return}
 if(d.snap!==undefined){snap();return}
 if(d.tqv){tqSheet(d.tqv);return}
 if(d.install!==undefined){install();return}
 if(d.instx!==undefined){LS.set('instx',1);rerender();return}
 if(d.notifon!==undefined){notifOn();return}
 if(d.catv!==undefined){S.catV=S.catV?0:1;LS.set('catv',S.catV);transition('tab',()=>rerender());return}
 if(d.quiz!==undefined){S.qz=[];quizSheet();return}
 if(d.qa){S.qz.push(d.qa);quizSheet();return}
 if(d.qb!==undefined){S.qz.pop();quizSheet();return}
 if(d.qr!==undefined){S.qz=[];quizSheet();return}
 if(d.vote){S.vote=+d.vote;LS.set('vote',S.vote);hap('ok');rerender();toast('Спасибо! Ваш голос учтён');return}
 if(d.albf){S.albF=+d.albf;rerender();return}
 if(d.alb){albSheet(+d.alb);return}
 if(d.share){shareAlb(+d.share);return}
 if(d.seed){LS.set('seed',d.seed);applyTheme().then(rerender);return}
 if(d.mode){LS.set('mode',['light','dark','auto'][+d.mode]);applyTheme().then(rerender);return}
 if(d.open){location.href=d.open;return}
 if(d.anim!==undefined){LS.set('anim',+d.anim);RM=RMsys&&!+d.anim;document.documentElement.classList.toggle('rm',RM);rerender();toast(+d.anim?'Показываем все анимации':'Анимации как в настройках телефона');return}
 if(d.cmode){S.camMode=['auto','day','night','off'][+d.cmode];LS.set('cam',S.camMode);rerender();toast({auto:'Камера: день и ночь по времени Алтая',day:'Камера: всегда день',night:'Камера: ночь, ИК-режим',off:'Камера: показываем «Нет соединения»'}[S.camMode]);return}
 if(d.reset!==undefined){try{Object.keys(localStorage).filter(k=>k.startsWith('kn2-')&&!/^kn2-(seed|mode|custom)$/.test(k)).forEach(k=>localStorage.removeItem(k))}catch(e){}location.reload();return}
 if(d.crewx!==undefined){go('profile');return}
 if(d.crole){S.crewRole=+d.crole;S.crewTab=0;rerender();return}
 if(d.ctab){S.crewTab=+d.ctab;rerender();return}
 if(d.tqok){const o=S.tq.find(x=>x.n==d.tqok);if(o){tqDone(o);hap('ok');rerender();toast(`Готово, владелец ${nm(o.h,0)} получит видео`)}return}
 if(d.chk){S.chk[d.chk]=!S.chk[d.chk];rerender();return}
 if(d.creport!==undefined){S.chk[4]=1;push('Отчёт за 7 октября готов',`${H(S.horse).name}: купание в реке, 12,4 км за день`,'report','doc');hap('ok');rerender();toast('Отчёт отправлен владельцам');return}
 if(d.fed){hst(d.fed).meal=nowT();hap('ok');rerender();toast(`Отмечено: ${H(d.fed).name} покормлен${fw(d.fed,'','а')} в ${nowT()}`);return}
 if(d.hst){const [id,k,v]=d.hst.split('|');hst(id)[k]=v;rerender();toast('Владелец увидит это на главной');return}
 if(d.lesson){const [id,tid]=d.lesson.split(':'),tr=TRICKS.find(x=>x.id===tid),k=d.lesson;S.lessons[k]=tDone(tr,id)+1;hap('ok');
  if(S.lessons[k]>=tr.lessons){S.tst[k]='done';S.tdate[k]='7 октября';MED[3][2]=1;push(`${H(id).name} ${fw(id,'выучил','выучила')} «${tr.name}»`,'Марина прислала видео, медаль «Артист» ваша','home','star')}
  else push(`Занятие по трюку «${tr.name}»`,`${H(id).name}: ${S.lessons[k]}-е из ${tr.lessons}, Марина прислала видео`,'home','star');rerender();toast('Владелец получит уведомление');return}
 if(d.pubh){S.pubH=d.pubh;rerender();return}
 if(d.pub!==undefined){const pb=S.pub;if(!pb)return;const cap=(document.getElementById('pubcap')||{}).value||S.pubCap||'',who=S.crewRole?'marina':'alexey',txt=cap.trim()||(pb.vid?'Новое видео за сегодня':'Новое фото за сегодня');
  S.staffStories.unshift({id:'u'+Date.now(),who,title:'Только что',t:nowT(),h:S.pubH,fresh:1,thumb:pb.vid?pb.thumb||'':pb.url,it:[[pb.url,pb.vid?1:0,()=>txt]]});S.pub=null;S.pubCap='';
  push(`${who==='marina'?'Марина':'Алексей'}: ${pb.vid?'новое видео':'новое фото'}`,`${H(S.pubH).name}: ${txt}`,'home','photo');hap('ok');rerender();toast('Опубликовано, владельцы увидят историю на главной');return}
 if(d.back!==undefined){if(history.state&&history.state.ia)history.back();else{const to=parentOf();history.replaceState({ia:0,k:nk()},'','#/'+to);const k=history.state.k;closeSheet();lastR=to.split('/')[0];transition('back',()=>{curK=k;render('back',0)})}return}
 if(d.go){go(d.go);return}
 if(d.train){trainSheet(d.train);return}
 if(d.course){startCourse(d.course);return}
 if(d.learn){if(t.closest('.pop-bg'))popClose(t.closest('.pop-bg'));learnSheet(d.learn);return}
 if(d.learnGo){S.tst[S.horse+':'+d.learnGo]='learn';S.lessons[S.horse+':'+d.learnGo]=0;hap('ok');closeSheet();rerender();toast(`Записали на «${TRICKS.find(x=>x.id===d.learnGo).name}». Первое занятие завтра`);return}
 if(d.medal){medalSheet(+d.medal);return}
 if(d.trick){trickSheet(d.trick);return}
 if(d.treat!==undefined){treatSheet();return}
 if(d.herd!==undefined){herdSheet();return}
 if(d.evd){evSheet(+d.evd);return}
 if(d.ring){const [id,k]=d.ring.split('|');ringSheet(id,k);return}
 if(d.camgo){closeSheet();S.cam=+d.camgo;go('cams');return}
 if(d.buyhome){S.buy.home=+d.buyhome;rerender();return}
 if(d.buypay){S.buy.pay=+d.buypay;rerender();return}
 if(d.giftm){S.giftM=+d.giftm;rerender();return}
 if(d.giftpay){S.pays.unshift(['Сертификат «Свой конь на Алтае»','7 октября',+d.giftpay]);toast('Сертификат оплачен и отправлен на почту получателю');return}
 if(d.daywith!==undefined){go('chat');say('Хочу записаться на «День с конём»');return}
 if(d.say){say(d.say);return}
 if(d.closeGo){closeSheet();go(d.closeGo);return}
 if(d.myhorse){closeSheet();S.horse=d.myhorse;go('home');return}
 if(d.shop){S.shopCat=d.shop;closeSheet();go('shop');return}
 if(d.cat){S.shopCat=d.cat;rerender();return}
 if(d.catf){S.catF=d.catf;rerender();return}
 if(d.prod){prodSheet(d.prod);return}
 if(d.order){const p=SHOP.find(x=>x.id===d.order),tr=TREATS.some(x=>x[0]===p.id),o=tr?newTq(p.id):null;S.orders.unshift([p.name,'7 октября',p.price,'Оформлен',o&&o.n]);S.pays.unshift([p.name,'7 октября',p.price]);closeSheet();hap('ok');
  if(tr){toast(`Оплачено. Алексей угостит ${nm(S.horse,2)} и снимет видео`);const b=document.getElementById('tqbox');if(b){b.innerHTML=tqCards();const c=b.firstElementChild;c&&setTimeout(()=>c.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'}),250)}}else toast('Заказ оформлен, конюх вручит и пришлёт видео');return}
 if(d.closeToast){closeSheet();toast(d.closeToast);return}
 if(d.toast){toast(d.toast);return}
 if(d.ev){S.ev=+d.ev;document.getElementById('evbox').innerHTML=events();return}
 if(d.cam){S.cam=+d.cam;rerender();return}
 if(d.st){S.stats=+d.st;rerender();return}
 if(d.club){S.club=+d.club;rerender();return}
 if(d.plan){S.pickPlan=d.plan;rerender();return}
 if(d.paid){hap('ok');S.owner=true;S.horse=d.paid;if(!S.herd.includes(d.paid))S.herd.push(d.paid);S.plan=S.pickPlan;S.subs[d.paid]=S.pickPlan;S.months[d.paid]=S.months[d.paid]||1;const pl=PLANS.find(x=>x.id===S.pickPlan);S.pays.unshift([`Подписка «${pl.name}», ${H(d.paid).name}`,'7 октября',pp(pl,d.paid)]);go('paid/'+d.paid);return}
 if(d.dep){S.dep=+d.dep;rerender();return}
 if(d.ppl){S.people=Math.max(1,Math.min(6,S.people+ +d.ppl));rerender();return}
 if(d.book!==undefined){hap('ok');S.bookings.unshift(['Тур «Кержаки»',`${DEPS[S.dep][0]} 2027, ${S.people} чел.`]);S.pays.unshift(['Бронь тура «Кержаки»','7 октября',Math.round(150000*S.people*.85)]);toast('Тур забронирован');go('bookings');return}
 if(d.pause!==undefined){const id=d.pause||'grom';S.pz[id]=!S.pz[id];rerender();toast(S.pz[id]?`Подписка на ${nm(id,2)} на паузе до 5 декабря`:'Подписка снова активна');return}
 if(d.logout!==undefined){S.owner=false;go('welcome');return}
 if(d.login!==undefined){S.owner=true;go('home');return}
});
document.addEventListener('change',e=>{const t=e.target;
 if(t.dataset.custom!==undefined){LS.set('seed',t.value);applyTheme().then(rerender);return}
 if(!t.files||!t.files[0])return;const f=t.files[0],url=URL.createObjectURL(f);
 if(t.dataset.tqfile){const o=S.tq.find(x=>x.n==t.dataset.tqfile);if(o){o.vid=url;rerender();toast('Видео прикреплено, нажмите «Отправить»')}return}
 if(t.dataset.pubfile!==undefined){const vid=f.type.startsWith('video');S.pub={url,vid,thumb:''};if(vid)thumbOf(url).then(th=>{if(S.pub&&S.pub.url===url)S.pub.thumb=th});rerender()}});
document.addEventListener('input',e=>{if(e.target.id==='pubcap')S.pubCap=e.target.value});
document.addEventListener('submit',e=>{if(!e.target.matches('[data-send]'))return;e.preventDefault();const i=document.getElementById('msg');const v=i.value.trim();if(!v)return;say(v)});
{const ua=navigator.userAgent;if(/iPhone|iPad|iPod/.test(ua)||(/AppleWebKit/.test(ua)&&!/Chrome|Chromium|Edg|OPR/.test(ua))||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))document.documentElement.classList.add('wk');if(/Android/.test(ua))document.documentElement.classList.add('an')}
{const q=location.search.match(/[?&]seed=(\w+)/);if(q&&THEMES[q[1]])LS.set('seed',q[1]);const m=location.search.match(/[?&]mode=(light|dark|auto)/);if(m)LS.set('mode',m[1])}
addEventListener('offline',()=>{toast('Нет соединения с интернетом');if(['home','cams','horse'].includes(curRoute()))rerender()});
addEventListener('online',()=>{toast('Соединение восстановлено');if(['home','cams','horse'].includes(curRoute()))rerender()});
if('serviceWorker' in navigator&&location.protocol==='https:'){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));navigator.serviceWorker.addEventListener('message',e=>{if(e.data&&e.data.go)location.hash=e.data.go})}
if(isStandalone()){const sp=document.createElement('div');sp.className='splash';sp.innerHTML=`${shape('sunny','extra c-pri slow-rotate',ic('horse','extra'))}<b>Конешеринг</b><small>парк-отель Marali</small>`;document.body.appendChild(sp);setTimeout(()=>sp.classList.add('out'),800);setTimeout(()=>sp.remove(),1400)}
applyTheme();render('load');

/* доступность: шторка ведёт себя как модальное окно (подпись по заголовку, фокус внутрь и обратно), скрытый пуш не читается и не ловит фокус */
(()=>{const s=document.getElementById('sheet'),p=document.getElementById('push');let back=null;s.tabIndex=-1;s.setAttribute('aria-label','Окно');
 const sync=()=>{const on=s.classList.contains('active');if(on){s.setAttribute('aria-hidden','false');const h=s.querySelector('h2');s.setAttribute('aria-label',h?h.textContent.trim():'Окно');if(!s.contains(document.activeElement)){if(!back)back=document.activeElement;requestAnimationFrame(()=>setTimeout(()=>{if(s.classList.contains('active')&&!s.contains(document.activeElement))s.focus({preventScroll:true})},30))}}else if(back){const b=back;back=null;if(b.isConnected&&b.focus)b.focus({preventScroll:true})}if(!on)s.setAttribute('aria-hidden','true')};
 sync();new MutationObserver(sync).observe(s,{attributes:true,attributeFilter:['class'],childList:true});
 const ph=()=>{const on=p.classList.contains('on');p.setAttribute('aria-hidden',on?'false':'true');p.tabIndex=on?0:-1};ph();new MutationObserver(ph).observe(p,{attributes:true,attributeFilter:['class']})})();

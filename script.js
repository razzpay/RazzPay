const WA_NUMBER="6287797809190"; // GANTI nomor WhatsApp kamu, format 62xxxxxxxxxx

const GAMES=[
 {n:"Free Fire",c:"game",g:"g1",i:"🔥",items:[["Membership Mingguan",29000],["Membership Bulanan",84000],["50 Diamond",7500],["75 Diamond",10000],["100 Diamond",14000],["120 Diamond",16500],["130 Diamond",18000],["145 Diamond",19500],["150 Diamond",21000],["170 Diamond",23000],["300 Diamond",39500],["355 Diamond",46000]]},
 {n:"Mobile Legends",c:"game",g:"g2",i:"⚔️",items:[["Weekly",32000],["Weekly x2",62000],["50 Diamond",17000],["80 Diamond",26000],["100 Diamond",32000],["116 Diamond",37500],["172 Diamond",54500]]},
 {n:"Magic Chess",c:"game",g:"g3",i:"♟️",items:[["Weekly Card",32500],["59 Diamond",17000],["170 Diamond",46500],["240 Diamond",64000],["408 Diamond",109000],["875 Diamond",229000],["2.010 Diamond",518000]]},
 {n:"PUBG Mobile",c:"game",g:"g4",i:"🎯",items:[["60 UC",17500],["120 UC",33000],["180 UC",49000],["325 UC",81500],["445 UC",113000],["720 UC",178000],["900 UC",226000]]},
 {n:"Call of Duty Mobile",c:"game",g:"g5",i:"🔫",items:[["31 CP",5000],["63 CP",9000],["128 CP",17500],["321 CP",42000],["645 CP",83000],["800 CP",98500],["2060 CP",253000]]},
 {n:"Honor of Kings",c:"game",g:"g6",i:"👑",items:[["80 Tokens",15000],["240 Tokens",40000],["400 Tokens",65000],["560 Tokens",90000]]},
 {n:"Higgs Domino",c:"game",g:"g7",i:"🃏",items:[["30M Koin",10000],["60M Koin",19000],["100M Koin",30000],["200M Koin",58000]]},
 {n:"Point Blank",c:"game",g:"g8",i:"🎯",items:[["1200 Cash",10000],["2400 Cash",19000],["6000 Cash",45000]]},
 {n:"Valorant",c:"game",g:"g9",i:"V",items:[["125 Points",15000],["420 Points",50000],["700 Points",80000],["1375 Points",150000],["2400 Points",250000]]},
 {n:"League of Legends",c:"game",g:"g10",i:"LOL",items:[["575 RP",65000],["1380 RP",145000],["2800 RP",285000]]},
 {n:"Genshin Impact",c:"game",g:"g9",i:"✦",items:[["60 Genesis Crystal",15000],["300 Genesis Crystal",65000],["980 Genesis Crystal",175000]]},
 {n:"Roblox",c:"game",g:"g6",i:"R",items:[["80 Robux",18000],["400 Robux",75000],["800 Robux",145000]]}
];

const CATS=["Semua","Game","MOBA","FPS","RPG","Lainnya"];
let active="Semua", selected=null;

function rupiah(n){return "Rp "+n.toLocaleString("id-ID")}
function toast(s){const t=document.getElementById("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}

function init(){
 document.getElementById("year").textContent=new Date().getFullYear();
 const chips=document.getElementById("chips");
 chips.innerHTML=CATS.map(x=>`<button class="${x==="Semua"?"active":""}" onclick="filterCat('${x}',this)">${x}</button>`).join("");
 renderGames();
}
function filterCat(cat,el){
 active=cat;
 document.querySelectorAll(".chips button").forEach(b=>b.classList.remove("active"));
 el.classList.add("active");
 renderGames();
}
function renderGames(){
 const q=(document.getElementById("search").value||"").toLowerCase();
 const grid=document.getElementById("gameGrid");
 let data=GAMES.filter(x=>{
   const text=(x.n+" "+x.items.map(a=>a[0]).join(" ")).toLowerCase();
   return text.includes(q) && (active==="Semua" || (active==="Game"&&x.c==="game"));
 });
 grid.innerHTML=data.map((x,idx)=>`
  <button class="game-card" onclick="openGame('${x.n.replace(/'/g,"\\'")}')">
   <div class="game-cover ${x.g}"><span>${x.i} ${x.n}</span></div>
   <div class="game-info"><b>${x.n}</b><small>${x.items.length} pilihan nominal</small></div>
  </button>`).join("") || `<div style="grid-column:1/-1;padding:30px;text-align:center;color:#8490a0">Produk tidak ditemukan.</div>`;
}
function setCategory(cat){
 if(cat==="game"){document.getElementById("products").scrollIntoView({behavior:"smooth"});return}
 toast("Kategori "+cat+" siap dihubungkan ke katalog.");
}
function openGame(name){
 selected=GAMES.find(x=>x.n===name);
 document.getElementById("mTitle").textContent=selected.n;
 document.getElementById("mIcon").textContent=selected.i;
 document.getElementById("denom").innerHTML=selected.items.map((p,i)=>`<option value="${i}">${p[0]} — ${rupiah(p[1])}</option>`).join("");
 document.getElementById("target").value="";
 document.getElementById("server").value="";
 updateTotal();
 document.getElementById("orderModal").classList.add("show");
}
function updateTotal(){
 if(!selected)return;
 const p=selected.items[document.getElementById("denom").value||0];
 document.getElementById("total").textContent=rupiah(p[1]);
}
function closeModal(){document.getElementById("orderModal").classList.remove("show")}
function sendWhatsApp(){
 const target=document.getElementById("target").value.trim();
 const server=document.getElementById("server").value.trim();
 if(!target){toast("Masukkan ID atau nomor tujuan.");return}
 const p=selected.items[document.getElementById("denom").value];
 const msg=`Halo RazzPay, saya ingin order.%0A%0AProduk: ${encodeURIComponent(selected.n)}%0ANominal: ${encodeURIComponent(p[0])}%0AID/Nomor: ${encodeURIComponent(target)}${server?`%0AServer/Zone: ${encodeURIComponent(server)}`:""}%0ATotal: ${encodeURIComponent(rupiah(p[1]))}%0A%0AMohon diproses.`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
}
function openGeneric(name){toast(name+" belum dihubungkan ke katalog provider. Struktur siap ditambahkan.")}
function openSearch(){document.getElementById("searchModal").classList.add("show");document.getElementById("globalSearch").focus()}
function globalFind(){
 const q=document.getElementById("globalSearch").value.toLowerCase();
 const el=document.getElementById("globalResults");
 if(!q){el.innerHTML="";return}
 const data=GAMES.filter(g=>(g.n+" "+g.items.map(x=>x[0]).join(" ")).toLowerCase().includes(q)).slice(0,8);
 el.innerHTML=data.map(g=>`<div class="result" onclick="document.getElementById('searchModal').classList.remove('show');openGame('${g.n.replace(/'/g,"\\'")}')"><b>${g.i} ${g.n}</b><small>Mulai dari ${rupiah(g.items[0][1])}</small></div>`).join("")||"<small>Tidak ditemukan.</small>";
}
init();

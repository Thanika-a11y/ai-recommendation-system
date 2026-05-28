const cardsContainer =
document.getElementById("cardsContainer");

const modal =
document.getElementById("detailModal");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

const filterButtons =
document.querySelectorAll(".filter-btn");

const sortSelect =
document.getElementById("sortSelect");

const searchInput =
document.getElementById("searchInput");

const toast =
document.getElementById("toast");

const data = [

{
  id:1,
  title:"Interstellar",
  category:"movies",
  rating:9.5,
  popularity:98,
  image:"https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  description:"A breathtaking sci-fi journey through space and time.",
  year:"2014",
  reviews:"Critically acclaimed masterpiece.",
  tags:["Sci-Fi","Space","Adventure"],
  aiScore:"98%"
},

{
  id:2,
  title:"Attack on Titan",
  category:"anime",
  rating:9.3,
  popularity:97,
  image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  description:"Humanity fights for survival against giant Titans.",
  year:"2013",
  reviews:"One of the greatest anime series ever.",
  tags:["Anime","Action","Fantasy"],
  aiScore:"96%"
},

{
  id:3,
  title:"Atomic Habits",
  category:"books",
  rating:9.1,
  popularity:95,
  image:"https://images.unsplash.com/photo-1512820790803-83ca734da794",
  description:"A powerful book about building better habits.",
  year:"2018",
  reviews:"Life-changing productivity book.",
  tags:["Books","Self Help","Productivity"],
  aiScore:"95%"
},

{
  id:4,
  title:"Cyberpunk 2077",
  category:"games",
  rating:8.9,
  popularity:90,
  image:"https://images.unsplash.com/photo-1542751371-adc38448a05e",
  description:"Futuristic open-world RPG with cyber enhancements.",
  year:"2020",
  reviews:"Visually stunning futuristic game.",
  tags:["Games","Cyberpunk","RPG"],
  aiScore:"92%"
},

{
  id:5,
  title:"Lo-Fi Focus Music",
  category:"music",
  rating:8.7,
  popularity:88,
  image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  description:"Relaxing beats for studying and coding.",
  year:"2023",
  reviews:"Perfect for focus and relaxation.",
  tags:["Music","Lo-Fi","Chill"],
  aiScore:"90%"
}

];

window.onload = ()=>{

  setTimeout(()=>{
    document.getElementById("loader")
    .style.display="none";
  },1500);

  renderCards(data);

};

function renderCards(items){

  cardsContainer.innerHTML="";

  items.forEach(item=>{

    const card =
    document.createElement("div");

    card.className="card";

    card.innerHTML=`

      <img src="${item.image}" />

      <div class="card-content">

        <h3>${item.title}</h3>

        <p>${item.description}</p>

        <div class="meta">

          <span class="rating">
            ⭐ ${item.rating}
          </span>

          <span>
            ${item.year}
          </span>

        </div>

        <button 
          class="favorite-btn"
          onclick="saveFavorite(${item.id})"
        >
          Save Favorite
        </button>

      </div>

    `;

    card.addEventListener("click",()=>{

      openModal(item);

    });

    cardsContainer.appendChild(card);

  });

}

function openModal(item){

  modal.style.display="flex";

  modalBody.innerHTML=`

    <img src="${item.image}" />

    <div class="modal-info">

      <h2>${item.title}</h2>

      <p>${item.description}</p>

      <p><strong>Category:</strong>
      ${item.category}</p>

      <p><strong>Rating:</strong>
      ⭐ ${item.rating}</p>

      <p><strong>Popularity:</strong>
      ${item.popularity}%</p>

      <p><strong>Reviews:</strong>
      ${item.reviews}</p>

      <p><strong>AI Recommendation Score:</strong>
      ${item.aiScore}</p>

      <div class="tags">

        ${item.tags.map(tag=>
          `<span class="tag">${tag}</span>`
        ).join("")}

      </div>

    </div>

  `;

}

closeModal.addEventListener("click",()=>{

  modal.style.display="none";

});

window.addEventListener("click",(e)=>{

  if(e.target===modal){
    modal.style.display="none";
  }

});

filterButtons.forEach(btn=>{

  btn.addEventListener("click",()=>{

    document.querySelector(".active")
    .classList.remove("active");

    btn.classList.add("active");

    const category =
    btn.dataset.category;

    if(category==="all"){
      renderCards(data);
    }else{

      const filtered =
      data.filter(item=>
        item.category===category
      );

      renderCards(filtered);
    }

  });

});

sortSelect.addEventListener("change",()=>{

  const value =
  sortSelect.value;

  const sorted = [...data];

  sorted.sort((a,b)=>
    b[value]-a[value]
  );

  renderCards(sorted);

});

searchInput.addEventListener("input",()=>{

  const value =
  searchInput.value.toLowerCase();

  const filtered =
  data.filter(item=>

    item.title.toLowerCase()
    .includes(value)

  );

  renderCards(filtered);

});

function saveFavorite(id){

  event.stopPropagation();

  let favorites =
  JSON.parse(
    localStorage.getItem("favorites")
  ) || [];

  if(!favorites.includes(id)){

    favorites.push(id);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

    showToast();

  }

}

function showToast(){

  toast.style.display="block";

  setTimeout(()=>{
    toast.style.display="none";
  },2000);

}

document.getElementById("themeToggle")
.addEventListener("click",()=>{

  document.body.classList.toggle("light");

});

const canvas =
document.getElementById("particles");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const particles=[];

for(let i=0;i<120;i++){

  particles.push({

    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    radius:Math.random()*2,
    dx:(Math.random()-0.5),
    dy:(Math.random()-0.5)

  });

}

function animateParticles(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach(p=>{

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI*2
    );

    ctx.fillStyle="#00d2ff";

    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(
      p.x<0 ||
      p.x>canvas.width
    ){
      p.dx *= -1;
    }

    if(
      p.y<0 ||
      p.y>canvas.height
    ){
      p.dy *= -1;
    }

  });

  requestAnimationFrame(
    animateParticles
  );

}

animateParticles();

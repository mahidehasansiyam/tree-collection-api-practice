

const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => showCaregories(data));
};

// category_name: 'Aquatic Plant';
// id: 10;
// small_description: 'Plants that grow in or near water bodies.';
const categoryContent = document.getElementById('categories');
categoryContent.innerHTML = '';
const showCaregories = data => {
  data.categories.forEach(categories => {
    // console.log(categories);
    const div = document.createElement('div');
    div.innerHTML = `
    <button id="btn-${categories.id}" onclick="clickedBtn('${categories.id}')" class="btn btn-soft btn-accent mb-2 w-full allBtn">${categories.category_name}</button>
    `;

    categoryContent.appendChild(div);
  });
};

const removeActive = id => {
  const allBtn = document.querySelectorAll('.allBtn ,#allTree');
  // console.log(allBtn);
  allBtn.forEach(btn => btn.classList.add('btn-soft'));

  const currentBtn = document.getElementById(`btn-${id}`);
  currentBtn.classList.remove('btn-soft');
};

document.getElementById('allTree').addEventListener('click', () => {
  const allBtn = document.querySelectorAll('.allBtn ,#allTree');
  // console.log(allBtn);
  allBtn.forEach(btn => btn.classList.add('btn-soft'));

  document.getElementById('allTree').classList.remove('btn-soft');
});

const clickedBtn = id => {
  manageSpinner(true);
  // console.log(id);
  removeActive(id);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => showPlants(data));
};

const loadPlants = () => {
  manageSpinner(true);
  fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => showPlants(data));
};

// category: 'Fruit Tree';
// description: 'A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.';
// id: 1;
// image: 'https://i.ibb.co.com/cSQdg7tf/mango-min.jpg';
// name: 'Mango Tree';
// price: 500;

const allTree = document.getElementById('trees');

const showPlants = data => {
  allTree.innerHTML = '';
  data.plants.forEach(plant => {
    // console.log(plant);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-100  shadow-sm p-2">
        <figure >
          <img src="${plant.image}" alt="Shoes" class="h-68 w-full"/>
        </figure>
        <div class="card-body">
          <h2 onclick="openTreeModal(${plant.id})" class="card-title cursor-pointer hover:text-[#4ade80]">
            ${plant.name}
          </h2>
          <p class="line-clamp-2">${plant.description}</p>
          <div class="type-price flex justify-between">
            <div class="type bg-[#DCFCE7] p-2 rounded-full font-semibold">
              ${plant.category}
            </div>
            <div class="price font-semibold">
              ${plant.price}
            </div>
          </div>
          <div class="addToCard">
            <button onclick="addToCard(${plant.id},'${plant.name}',${plant.price})"  class="btn  btn-accent w-auto ">Add To Card</button>
          </div>
        </div>
      </div>
    `;
    manageSpinner(false);
    allTree.appendChild(div);
  });
};




const cardContainer = document.getElementById('cardContainer');
let card = [];
const addToCard = ((id,name,price) => {
  // console.log(id, price, name);
  const existingItem = card.find((item) => item.id === id)
  if (existingItem) {
    existingItem.quantity += 1;
  }
  else {
    card.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }
    
  updateCard(card)
})

const initialMessage = document.getElementById('initialMessage');


let totalPrice = document.getElementById('total')
const updateCard = (card) => {
  cardContainer.innerHTML = '';
  if (card.length === 0) {
    initialMessage.classList.remove('hidden')
    totalPrice.innerHTML = `$01`; // Reset total display
    return
  } 
    initialMessage.classList.add('hidden');
  
  let total = 0;
  
  console.log(card);
  card.forEach((item) => {
    total += item.price * item.quantity; 
    const cardItem = document.createElement('div')
    cardItem.innerHTML = `
    <div class="flex justify-between p-3 rounded-xl mb-2 bg-white shadow-sm border border-gray-100">
        <div>
          <h2 class="font-bold">${item.name}</h2>
          <p class="text-sm text-gray-500">$${item.price} x ${item.quantity}</p>
          <p class="font-semibold text-green-600">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button onclick="removeFromCard(${item.id})" class="text-red-400 hover:text-red-600 font-bold px-2"   >X
        </button>
      </div>
    `;
    cardContainer.appendChild(cardItem)
  })
  totalPrice.innerHTML = `$${total}`;
}

const removeFromCard = (id) => {
  
  // console.log(id);
  card = card.filter((item) => item.id != id)
  updateCard(card);
}



const spinner = document.getElementById('spinner');
const trees = document.getElementById('trees');

const manageSpinner = status => {
  if (status === true) {
    spinner.classList.remove('hidden');
    trees.classList.add('hidden');
  } else {
    spinner.classList.add('hidden');
    trees.classList.remove('hidden');
  }
};

// category: 'Aquatic Plant';
// description: 'A floating aquatic plant with large leaves and stunning blooms. Adds beauty to ponds while supporting aquatic life.';
// id: 28;
// image: 'https://i.ibb.co.com/VWNQPDMR/water-lily-min.jpg';
// name: 'Water Lily';
// price: 300;

const detail = document.getElementById('detail');

const openTreeModal = id => {
  detail.innerHTML = '';
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const arr = data.plants;
      // console.log(arr);
      const div = document.createElement('div')
      div.innerHTML = `
      <div class="max-w-md mx-auto bg-white rounded-2xl  border border-gray-100 relative">
  
    <h1 class="text-3xl font-bold text-green-800 mb-4">${arr.name}</h1>
  
    <div class="rounded-xl overflow-hidden mb-6">
      <img src="${arr.image}"
        alt="Mango Tree" class="w-full h-64 object-cover" />
    </div>
  
    <div class="flex items-center gap-2 mb-4">
      <span class="text-gray-600 font-bold">Category:</span>
      <span class="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm font-medium">
        ${arr.category}
      </span>
    </div>
  
    <p class="text-gray-500 leading-relaxed mb-6">
      ${arr.description}
    </p>
  
    <h2 class="text-4xl font-extrabold text-green-600 ">$${arr.price}</h2>
  </div>
      `;
      
      detail.appendChild(div);
    });
  
  
  document.getElementById('my_modal').showModal();
};

 


loadPlants();



loadCategories();

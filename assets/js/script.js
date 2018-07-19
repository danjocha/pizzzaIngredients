let menuOpened = false;

window.addEventListener('load', function (event) {
  // getting elements
  const menuItem = document.getElementById('menuToppings');
  const addToppingBtn = document.getElementById('addTopping');
  const startOverBtn = document.getElementById('startOver');

  // Setting events
  addToppingBtn.addEventListener('click', onClickAddTopping);
  startOverBtn.addEventListener('click', onClickStartOver);
  document.addEventListener('click', onClickBody);

  // Creating the menu options
  toppings.forEach(function (topping, index) { // var toppings comes from the file 'toppings.json'
    const element = document.createElement('li');
    const linkElem = document.createElement('a');
    linkElem.href = '#';
    linkElem.addEventListener('click', onClickMenuItem); //add click event listener
    linkElem.dataset.image = topping.image; // add image to dataset to be read when the click event is fired
    linkElem.appendChild(
      document.createTextNode(`+ ${topping.name}`)
    );
    element.appendChild(linkElem);
    menuItem.appendChild(element);
  });
});

// Events functions
const onClickAddTopping = function () {
  toggleMenu();
}

const onClickStartOver = function () {
  const toppingsContainer = document.getElementById('toppingsContainer');
  // Remove all children
  while (toppingsContainer.firstChild) {
    toppingsContainer.removeChild(toppingsContainer.firstChild);
  }
}

const onClickMenuItem = function (event) {
  event.preventDefault();
  const toppingsContainer = document.getElementById('toppingsContainer');
  const imgSrc = event.target.dataset.image;
  const amount = Math.floor((Math.random() * 5) + 6); // get the random number between 6 and 10 to add topping

  // adding topping
  for (var i = 0; i < amount; i += 1) {
    const image = document.createElement('img');
    // Find a position inside the pizza background on vertical
    const posTop = Math.floor((Math.random() * 550) + 130);

    // Finding a position inside the pizza background on the horizontal
    const posLeftMax = posTop / 2.5;
    const posLeftMin = toppingsContainer.offsetWidth - (posTop / 2);
    const posLeft = Math.floor((Math.random() * (posLeftMax - posLeftMin + 1)) + posLeftMin);

    image.src = imgSrc;
    image.className = 'topping';
    image.style.top = posTop;
    image.style.left = posLeft;
    toppingsContainer.appendChild(image);
  }
}

// Close the menu when clicked outside
const onClickBody = function (event) {
  if (menuOpened) {
    const menu = document.getElementById('menuToppings');
    const addToppingBtn = document.getElementById('addTopping');

    if (event.target !== addToppingBtn && event.target !== menu && !menu.contains(event.target)) {
      toggleMenu();
    }
  }
}

// helpers
const toggleMenu = function () {
  const menu = document.getElementById('menuToppings');
  //changing class to show the menu
  if (menuOpened) {
    menu.className = '';
    menuOpened = false;
  } else {
    menu.className = 'opened';
    menuOpened = true;
  }
}

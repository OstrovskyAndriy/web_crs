// Отримати елементи форми сортування і фільтрації
const priceSortSelect = document.getElementById('priceSort');
const brandFilterSelect = document.getElementById('brandFilter');
const socketFilterSelect = document.getElementById('socketFilter');

// Обробник події для сортування за ціною
priceSortSelect.addEventListener('change', function () {
  var selectedOption = priceSortSelect.value;

  if (selectedOption === 'lowToHigh') {
    // Сортування від дешевих до дорогих
    productInfo.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (selectedOption === 'highToLow') {
    // Сортування від дорогих до дешевих
    productInfo.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  // Перемалювати карточки товарів з відсортованими даними
  var sortedProducts = productInfo.map(function (product) {
    return product.card;
  });
  productList.innerHTML = '';
  sortedProducts.forEach(function (card) {
    productList.appendChild(card);
  });

  pagination();
});

// Обробник події для фільтрації за маркою
brandFilterSelect.addEventListener('change', function () {
  var selectedBrand = brandFilterSelect.value;

  var filteredProducts = productInfo.filter(function (product) {
    var processorBrand = getProductBrand(product.card);
    return processorBrand.toLowerCase() === selectedBrand.toLowerCase();
  });

  // Перемалювати карточки товарів з відфільтрованими даними
  var filteredCards = filteredProducts.map(function (product) {
    return product.card;
  });
  productList.innerHTML = '';
  filteredCards.forEach(function (card) {
    productList.appendChild(card);
  });

  pagination();
});

// Обробник події для фільтрації за сокетом процесора
socketFilterSelect.addEventListener('change', function () {
  var selectedSocket =  socketFilterSelect.value;

  var filteredProducts = productInfo.filter(function (product) {
    var processorSocket = getProductSocket(product.card);
    return processorSocket.toLowerCase() === selectedSocket.toLowerCase();
  });

  // Перемалювати карточки товарів з відфільтрованими даними
  var filteredCards = filteredProducts.map(function (product) {
    return product.card;
  });
  productList.innerHTML = '';
  filteredCards.forEach(function (card) {
    productList.appendChild(card);
  });

  pagination();
});

// Функція для отримання марки процесора з карточки
function getProductBrand(card) {
  var titleElement = card.querySelector('.card-title');
  return titleElement.textContent.split(' ')[0];
}

// Функція для отримання сокета процесора з карточки
function getProductSocket(card) {
  var descriptionElement = card.querySelector('.card-text');
  var socketText = descriptionElement.innerHTML.match(/<strong>Сокет процесора:<\/strong>\s*([^<]+)<br>/);
  return socketText ? socketText[1] : '';
}

// Обробник події для фільтрації за назвою процесора
nameFilter.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    applyFilters();

  }
});

// Функція для застосування фільтрів
function applyFilters() {
  var selectedName = nameFilter.value.toLowerCase();

  var filteredProducts = productInfo.filter(function (product) {
    var processorName = product.card.querySelector('.card-title').textContent.toLowerCase();
    return processorName.includes(selectedName);
  });

  // Перемалювати карточки товарів з відфільтрованими даними
  var filteredCards = filteredProducts.map(function (product) {
    return product.card;
  });
  productList.innerHTML = '';
  filteredCards.forEach(function (card) {
    productList.appendChild(card);
  });

  pagination();
}


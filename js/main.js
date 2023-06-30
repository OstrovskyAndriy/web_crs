document.getElementById('addButton').addEventListener('click', function () {
  $('#addModal').modal('show');
});
// Обробник події зміни вибраної марки
$(document).ready(function () {
  $("#brandFilter").change(function () {
    var selectedBrand = $(this).val();
    var socketOptions = $("#socketFilter option");
    // Сховати всі опції сокета
    socketOptions.hide();
    // Показати опції сокета, що відповідають вибраній марці
    if (selectedBrand === "amd") {
      socketOptions.filter("[value='AM3'], [value='AM3+'], [value='AM4']").show();
    }else if (selectedBrand === "intel") {
      socketOptions.filter("[value='1155'], [value='1156'], [value='1150'], [value='1151'], [value='2011'], [value='1200'], [value='1700']").show();
    }
  });
  // Виклик події зміни марки, щоб відобразити відповідні опції сокета при завантаженні сторінки
  $("#brandFilter").change();
});

document.getElementById('processorBrand').addEventListener('change', function () {
  var brandSelect = document.getElementById('processorBrand');
  var socketSelect = document.getElementById('processorSocket');
  var selectedBrand = brandSelect.value;
  // Список сокетів для кожного бренду процесора
  var socketOptions = {
    amd: ['AM3', 'AM3+', 'AM4'],
    intel: ['1155', '1156', '1150', '1151', '1200', '1700', '2011']
  };
  // Очищення списку сокетів
  while (socketSelect.options.length > 0) {
    socketSelect.remove(0);
  }
  // Додавання нових опцій до списку сокетів залежно від вибраного бренду процесора
  var sockets = socketOptions[selectedBrand];
  for (var i = 0; i < sockets.length; i++) {
    var option = document.createElement('option');
    option.text = sockets[i];
    option.value = sockets[i];
    socketSelect.add(option);
  }
});

document.getElementById('exitButton').addEventListener('click', function () {
  localStorage.setItem('isAdmin', 'false');
  location.reload();
});

//відображення товарів з бд на сторінці
document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:5500/api/getprocessors', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var processors = JSON.parse(xhr.responseText);
      createProductCards(processors);
    }
  };
  xhr.send();
});

// Зберігати відомості про товари
var productInfo = [];
function createProductCards(processors) {
  var productList = document.getElementById('productList');
  processors.forEach(function (processor) {
    // Створити елементи карточки товару
    var card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';

    var image = document.createElement('img');
    image.className = 'card-img-top';
    image.alt = 'Card image cap';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = processor.brand + ' ' + processor.name;

    var description = document.createElement('p');
    description.className = 'card-text';
    description.innerHTML =
      '<strong>Частота процесора:</strong> ' + processor.frequency + ' GHz<br>' +
      '<strong>Сокет процесора:</strong> ' + processor.socket + '<br>' +
      '<strong>Кількість ядер:</strong> ' + processor.cores + ' ядра ' + '<br>' +
      '<strong>TDP:</strong> ' + processor.tdp + ' ват<br>' +
      '<strong>Ціна:</strong> $' + processor.price;

    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-primary deleteButton-in-card';
    deleteButton.textContent = 'Видалити';
    var addToCartButton = document.createElement('a');
    addToCartButton.className = 'btn btn-primary add-to-cart';
    addToCartButton.href = '#';
    addToCartButton.textContent = 'В кошик';
    addToCartButton.style.display = 'none';
    // Додати елементи до карточки товару
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(deleteButton);
    card.appendChild(addToCartButton);
    image.src = processor.photo_path;

    deleteButton.addEventListener('click', function () {
      deleteProduct(processor.id);
      card.remove();
      pagination();
    });
    addToCartButton.addEventListener('click', function () {
      addToCart(processor.id);
    });
    // Додати карточку товару до списку
    productList.appendChild(card);
    var product = {
      id: processor.id,
      brand: processor.brand,
      name: processor.name,
      card: card,
      price: processor.price
    };
    productInfo.push(product);
  });
  pagination();
}

// Функція для видалення карточки товару з сайту та бази даних
function deleteProduct(productId) {
  // Виконати AJAX-запит до сервера для видалення товару за ідентифікатором productId
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:5500/api/deleteProduct/' + productId, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Товар успішно видалено');
    }
  };
  xhr.send();
}

// Зберігати відомості про товари в корзині
var cartItems = [];
// Функція додавання товару в корзину
function addToCart(productId) {
  // Отримати товар за його ідентифікатором
  var product = productInfo.find(function (item) {
    return item.id === productId;
  });
  cartItems.push(product);
  updateCart();
}

// Функція оновлення вмісту корзини
function updateCart() {
  var cartModalBody = document.querySelector('#cartModal .modal-body');
  cartModalBody.innerHTML = '';

  // Додати кожен товар в корзину до вмісту
  cartItems.forEach(function (item) {
    var itemElement = document.createElement('p');
    itemElement.textContent = item.brand + ' ' + item.name;
    cartModalBody.appendChild(itemElement);
  });
}

// Функція для надсилання даних корзини на бекенд
function sendOrderData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:5500/api/order', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var order = {
    orderData: cartItems, // Виправлено
    userID: userID,
    note: 'Потрібно оформлення'
  };
  var orderData = JSON.stringify(order);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Замовлення успішно відправлено');
      cartItems = [];
      updateCart();
    } else {
      console.error('Помилка при відправленні замовлення');
    }
  };

  xhr.send(orderData);
}
// Додати обробник події для кнопки "Оформити замовлення"
var orderButton = document.querySelector('#cartModal .modal-footer .btn-primary');
orderButton.addEventListener('click', function () {
  sendOrderData();
});

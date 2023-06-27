// Отримати елементи модального вікна
var customerNameElement = document.getElementById('customerName');
var processorElement = document.getElementById('processor');
var orderStatusElement = document.getElementById('orderStatus');

// Функція для відображення отриманих даних
function displayOrderData(orderData) {
  customerNameElement.textContent = orderData.name;
  processorElement.textContent = orderData.processor;
  orderStatusElement.textContent = orderData.order_status;
}

// AJAX-запит на сервер
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5500/api/getOrders', true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    displayOrderData(response);
  }
};

xhr.send();

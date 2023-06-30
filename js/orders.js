var orderButton = document.getElementById('order');
orderButton.addEventListener('click', function () {
    // AJAX-запит на сервер
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001/api/getOrders', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            displayOrderData(response);
        }
    };
    xhr.send();
});

// Функція для відображення отриманих даних
function displayOrderData(orderData) {
    var modalBody = document.querySelector('#orderModal .modal-body');
    // Очистити вміст модального вікна перед додаванням нових блоків
    modalBody.innerHTML = '';
    if (Array.isArray(orderData)) {
        // Якщо orderData є масивом, створити блок для кожного замовлення
        orderData.forEach(function (order) {
            var orderBlock = createOrderBlock(order);
            modalBody.appendChild(orderBlock);
        });
    }
    else if (typeof orderData === 'object') {
        // Якщо orderData є об'єктом замовлення, створити блок для одного замовлення
        var orderBlock = createOrderBlock(orderData);
        modalBody.appendChild(orderBlock);
    }
}

function createOrderBlock(order) {
    var orderBlock = document.createElement('div');
    orderBlock.classList.add('order-block');
    orderBlock.style.border = '2px solid #ccc';
    orderBlock.style.padding = '10px';

    var orderStatusElement = document.createElement('p');
    orderStatusElement.textContent = 'Статус замовлення:';

    var orderStatusSelect = document.createElement('select');
    orderStatusSelect.dataset.orderId = order.id; // Зміна на order.id

    var orderStatusOptions = ['оформлено', 'відправлено', 'у відділенні'];
    orderStatusOptions.unshift(order.order_status);

    orderStatusOptions.forEach(function (status) {
        var option = document.createElement('option');
        option.textContent = status;
        orderStatusSelect.appendChild(option);
    });
    orderBlock.appendChild(orderStatusElement);
    orderBlock.appendChild(orderStatusSelect);

    var customerNameElement = document.createElement('p');
    customerNameElement.textContent = 'Ім\'я замовника: ' + order.mail;
    orderBlock.appendChild(customerNameElement);

    var processorElement = document.createElement('p');
    processorElement.textContent = 'Процесор: ' + order.processor;
    orderBlock.appendChild(processorElement);
    return orderBlock;
}

var saveOrderButton = document.getElementById('saveOrderButton');
saveOrderButton.addEventListener('click', function () {
    var updatedOrders = [];
    var modalBody = document.querySelector('#orderModal .modal-body');
    var orderBlocks = modalBody.querySelectorAll('.order-block');
    // Пройтись по кожному блоку замовлення і отримати його ідентифікатор та обраний статус
    orderBlocks.forEach(function (orderBlock) {
        var orderId = orderBlock.querySelector('select').dataset.orderId;
        var orderStatus = orderBlock.querySelector('select').value;
        // Створити об'єкт замовлення з ідентифікатором та статусом
        var updatedOrder = {
            id: orderId,
            status: orderStatus
        };
        // Додати оновлене замовлення до масиву
        updatedOrders.push(updatedOrder);
    });
    saveOrders(updatedOrders);
});

function saveOrders(updatedOrders) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3001/api/updateOrders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('Замовлення успішно збережено');
            } else {
                console.error('Помилка при збереженні замовлення');
            }
        }
    };
    xhr.send(JSON.stringify(updatedOrders));
}

//робота з модальним вікном замовлень користувача
var userOrderButton = document.getElementById('userOrder');
userOrderButton.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3001/api/getUserOrders/' + userID, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            displayUserOrderData(response);
        }
    };
    xhr.send();
});

// Функція для відображення отриманих даних
function displayUserOrderData(orderData) {
    var modalBody = document.querySelector('#userOrderModal .modal-body');
    // Очистити вміст модального вікна перед додаванням нових блоків
    modalBody.innerHTML = '';
    if (Array.isArray(orderData)) {
        // Якщо orderData є масивом, створити блок для кожного замовлення
        orderData.forEach(function (order) {
            var orderBlock = createUserOrderBlock(order);
            modalBody.appendChild(orderBlock);
        });
    } else if (typeof orderData === 'object') {
        // Якщо orderData є об'єктом замовлення, створити блок для одного замовлення
        var orderBlock = createUserOrderBlock(orderData);
        modalBody.appendChild(orderBlock);
    }
}
function createUserOrderBlock(order) {
    var orderBlock = document.createElement('div');
    orderBlock.classList.add('order-block');
    orderBlock.style.border = '2px solid #ccc';
    orderBlock.style.padding = '10px';
    var orderStatusElement = document.createElement('p');
    orderStatusElement.textContent = 'Статус замовлення: ' + order.order_status;
    orderBlock.appendChild(orderStatusElement);
    var processorElement = document.createElement('p');
    processorElement.textContent = 'Процесор: ' + order.processor;
    orderBlock.appendChild(processorElement);
    return orderBlock;
}
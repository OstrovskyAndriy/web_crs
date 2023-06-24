document.getElementById('saveButton').addEventListener('click', function () {
    var errorMessages = [];
  
    // Перевірка полів для заповнення на порожні значення
    var fields = ["processorBrand", "processorSocket", "processorModel", "processorFrequency", "processorCores", "processorThreads", "processorPrice"];
    for (var i = 0; i < fields.length; i++) {
      var field = $("#" + fields[i]);
      if (field.val() === "") {
        errorMessages.push("Поле \"" + field.attr("placeholder") + "\" є обов'язковим.");
      }
    }
  
    // Показ помилок, якщо такі є
    if (errorMessages.length > 0) {
      var errorMessage = "При додаванні виникли наступні помилки:\n" + errorMessages.join("\n");
      alert(errorMessage);
    } else {
      // Отримати значення введених даних
      const brand = document.getElementById('processorBrand').value;
      const socket = document.getElementById('processorSocket').value;
      const model = document.getElementById('processorModel').value;
      const frequency = parseFloat(document.getElementById('processorFrequency').value);
      const cores = parseInt(document.getElementById('processorCores').value);
      const threads = parseInt(document.getElementById('processorThreads').value);
      const price = parseFloat(document.getElementById('processorPrice').value);
  
      const filePath = "./img/" + document.getElementById('processorPhoto').files[0].name;
  
      // Створити об'єкт з даними для відправки на бекенд
      var data = {
        model: model,
        frequency: frequency,
        brand: brand,
        socket: socket,
        cores: cores,
        threads: threads,
        price: price,
        filePath: filePath
      };
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5500/api/adding', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Успішно відправлено дані на бекенд
            alert("Дані успішно збережено!");
  
            // Створити нову карточку товару
            const card = document.createElement('div');
            card.className = 'card';
            card.style = 'width: 18rem;';
  
            // Створити елемент зображення
            const image = document.createElement('img');
            image.className = 'card-img-top';
            image.alt = 'Card image cap';
  
            // Перевірити, чи вибрано файл для завантаження
            if (document.getElementById('processorPhoto').files && document.getElementById('processorPhoto').files[0]) {
              const reader = new FileReader();
              reader.onload = function (e) {
                // Встановити джерело зображення після завантаження
                image.src = filePath;
  
                // Додати інші елементи карточки товару
                card.innerHTML = `
                  <div class="card-body">
                    <h5 class="card-title">${brand} ${model}</h5>
                    <p class="card-text">
                      <strong>Частота процесора:</strong> ${frequency} GHz<br>
                      <strong>Сокет процесора:</strong> ${socket}<br>
                      <strong>Кількість ядер і потоків:</strong> ${cores} ядра, ${threads} потоки<br>
                      <strong>Ціна:</strong> $${price}
                    </p>
                    <a href="#" class="btn btn-primary add-to-cart d-none">В кошик</a>
                    <button class="btn btn-primary deleteButton-in-card">Видалити</button>
                  </div>
                `;
  
                // Додати елемент зображення до карточки товару
                card.insertBefore(image, card.firstChild);
  
                // Додати нову карточку товару до списку
                const productList = document.getElementById('productList');
                productList.appendChild(card);
  
                // Отримати кнопку видалення з карточки товару
                const deleteButton = card.querySelector('.deleteButton-in-card');
                deleteButton.style.display = 'inline'; // Встановити відображення кнопки
  
                alert("Дані успішно збережено!");
  
                // Закрити модальне вікно
                //$('#addModal').modal('hide');
              };
              reader.readAsDataURL(document.getElementById('processorPhoto').files[0]); // Прочитати вміст файлу як URL-адресу даних
              // Закрити модальне вікно
              $('#addModal').modal('hide');
            } else {
              // Помилка при відправленні запиту на бекенд
              alert('Виникла помилка під час збереження даних.');
            }
          }
        }
      };
      xhr.send(JSON.stringify(data));
    }

    location.reload();
 });
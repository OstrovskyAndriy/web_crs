// обробник події кліку по вікні якщо якийсь випадаючий список відкритий
$(document).ready(function () {
  // Обробник події кліку на всьому документі
  $(document).click(function (event) {
    var target = $(event.target);

    // Перевірка, чи елемент, на якому відбувся клік, належить до .dropdown-toggle або .dropdown-menu
    if (!target.hasClass("dropdown-toggle") && !target.hasClass("dropdown-menu")) {
      // Закриття всіх відкритих .dropdown-menu
      $(".dropdown-menu").hide();
    }
  });

  // Обробник події кліку на .dropdown-toggle кнопці
  $(".dropdown-toggle").click(function () {
    // Закриття всіх інших .dropdown-menu перед відкриттям поточного .dropdown-menu
    $(".dropdown-menu").hide();
    $(this).next('.dropdown-menu').toggle();
  });
});


document.getElementById('addButton').addEventListener('click', function () {
  $('#addModal').modal('show');
});

// перневірка введених даних при додаванні нового процесора
$(document).ready(function () {
  // Обробник події кліку на кнопку "Зберегти"
  $("#saveButton").click(function () {
    var errorMessages = [];

    // Перевірка полів для заповнення на порожні значення
    var fields = ["processorPhoto", "processorBrand", "processorSocket", "processorModel", "processorFrequency", "processorCores", "processorThreads", "processorPrice"];
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
      // Продовжити збереження, якщо немає помилок
      // Ваш код для збереження даних тут
      $("#addModal").modal("hide");

      alert("Дані успішно збережено!");
    }
  });

});

// Обробник події натискання кнопки "Зареєструватись"
$(document).ready(function () {
  
  $("#registrationModal button.btn-primary").click(function () {
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    var email = $("#email").val();

    // Перевірка, чи хоча б одне поле порожнє
    if (password === "" || confirmPassword === "" || email === "") {
      alert("Будь ласка, заповніть всі поля!");
      return; // Зупинка виконання коду
    }
    // Перевірка, чи паролі збігаються
     if (password !== confirmPassword) {
      // Виведення помилки
      alert("Паролі не збігаються!");
     
      return; // Зупинка виконання коду
    }

    // Продовження виконання коду, якщо паролі збігаються

    // Ваш код для обробки та відправки форми реєстрації

    // Закриття модального вікна.

    $("#registrationModal").modal("hide");
  });
});




// вхід на сайт
document.getElementById('loginButton').addEventListener('click', function () {
  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;
  var addButton = document.getElementById('addButton');
  var cardDeleteButtons = document.getElementsByClassName('deleteButton-in-card');
  var loginModal = document.getElementById('loginModal');
  var cartButton = document.getElementById('cartButton');
  var addToCartButtons = document.querySelectorAll('.add-to-cart');

  var loginButtonInHeader = document.getElementById('loginButtonInHeader');
  var exitButton = document.getElementById('exitButton');

  // адмін
  if (email === '1' && password === '1') {
    addButton.style.display = 'inline-block';
    for (var i = 0; i < cardDeleteButtons.length; i++) {
      cardDeleteButtons[i].style.display = 'inline';
    }
    cartButton.style.display = 'none';
    addToCartButtons.forEach(function (button) {
      button.classList.add('d-none');
    });

    loginButtonInHeader.style.display = 'none';
    exitButton.style.display = 'inline-block';
    $('#loginModal').modal('hide'); // Закриття модального вікна
  }

  // звичайний користувач
  else if (email === '2' && password === '2') {
    cartButton.style.display = 'inline-block';

    addToCartButtons.forEach(function (button) {
      button.classList.remove('d-none');
    });
    addButton.style.display = 'none';

    for (var i = 0; i < cardDeleteButtons.length; i++) {
      cardDeleteButtons[i].style.display = 'none';
    }

    loginButtonInHeader.style.display = 'none';
    exitButton.style.display = 'inline-block';
    $('#loginModal').modal('hide'); // Закриття модального вікна
  }
});

// слайдер частоти процесора
$(document).ready(function () {
  // Ініціалізація слайдера
  $("#clockSpeedSlider").slider({
    range: true,
    min: 2,
    max: 5,
    step: 0.1,
    values: [2, 5],
    slide: function (event, ui) {
      // Оновлення значень "від" і "до" при зміні положення слайдера
      $("#clockSpeedMin").text(ui.values[0]);
      $("#clockSpeedMax").text(ui.values[1]);
    }
  });

  // Відображення початкових значень "від" і "до"
  $("#clockSpeedMin").text($("#clockSpeedSlider").slider("values", 0));
  $("#clockSpeedMax").text($("#clockSpeedSlider").slider("values", 1));
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
    } else if (selectedBrand === "intel") {
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

// слайдер ядер процесора
$(document).ready(function () {
  // Масив допустимих варіантів кількості ядер
  var allowedCoreNumbers = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32];

  // Ініціалізація слайдера для ядер
  $("#coreNumberSlider").slider({
    range: true,
    min: 2,
    max: 32,
    step: 2,
    values: [2, 32],
    slide: function (event, ui) {
      // Отримання найближчого допустимого значення кількості ядер
      var minCoreNumber = getNearestAllowedValue(ui.values[0]);
      var maxCoreNumber = getNearestAllowedValue(ui.values[1]);

      $("#coreNumberMin").text(minCoreNumber);
      $("#coreNumberMax").text(maxCoreNumber);
    }
  });

  // Функція для отримання найближчого допустимого значення кількості ядер
  function getNearestAllowedValue(value) {
    var nearestValue = null;
    var minDistance = Infinity;

    // Перебір усіх допустимих значень
    for (var i = 0; i < allowedCoreNumbers.length; i++) {
      var currentDistance = Math.abs(value - allowedCoreNumbers[i]);

      // Збереження найменшої відстані
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        nearestValue = allowedCoreNumbers[i];
      }
    }

    return nearestValue;
  }

  // Відображення початкових значень "від" і "до"
  $("#coreNumberMin").text($("#coreNumberSlider").slider("values", 0));
  $("#coreNumberMax").text($("#coreNumberSlider").slider("values", 1));
});



// пагінація сторінки
$(document).ready(function () {
  var productsPerPage = 8;
  var productList = $("#productList .card");
  var totalPages = Math.ceil(productList.length / productsPerPage);

  function showCurrentPage(pageNumber) {
    productList.hide();

    var startIndex = (pageNumber - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    productList.slice(startIndex, endIndex).show();
  }

  function createPaginationControls() {
    var paginationControls = $("#paginationControls");
    paginationControls.empty();

    if (totalPages <= 1) {
      return; // Якщо всього одна сторінка, не потрібно створювати контроли пагінації
    }

    for (var i = 1; i <= totalPages; i++) {
      var button = $("<button>").text(i).addClass("paginationButton");
      paginationControls.append(button);
    }

    $(".paginationButton").on("click", function () {
      var pageNumber = parseInt($(this).text());
      showCurrentPage(pageNumber);
    });
  }

  showCurrentPage(1);
  createPaginationControls();
});

document.getElementById('exitButton').addEventListener('click', function() {
  location.reload();
});
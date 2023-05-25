$(document).ready(function () {
  $(".dropdown-toggle").click(function () {
    $(this).next('.dropdown-menu').toggle();
  });
});

$(document).ready(function () {
  // Обробник події натискання кнопки "Зареєструватись"
  $("#registrationModal button.btn-primary").click(function () {
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    // Перевірка, чи паролі збігаються
    if (password !== confirmPassword) {
      // Виведення помилки
      alert("Паролі не збігаються!");
      console.log(password);
      console.log(confirmPassword);
      return; // Зупинка виконання коду
    }

    // Продовження виконання коду, якщо паролі збігаються

    // Ваш код для обробки та відправки форми реєстрації

    // Закриття модального вікна.

    $("#registrationModal").modal("hide");
  });
});

document.getElementById('loginButton').addEventListener('click', function () {
  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;
  var addButton = document.getElementById('addButton');
  let cardDeleteButton = document.getElementById('deleteButton-in-card');
  let loginModal = document.getElementById('loginModal');

  if (email === 'admin' && password === '123') {
    addButton.style.display = 'inline-block';
    cardDeleteButton.style.display = 'inline';
    $('#loginModal').modal('hide'); // Закриття модального вікна
  } else {
    addButton.style.display = 'none';
    deleteButton.style.display = 'none';
  }
});


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


$(document).ready(function () {
  // Обробник події зміни вибраної марки
  $("#brandFilter").change(function () {
    var selectedBrand = $(this).val();
    var socketOptions = $("#socketFilter option");

    // Сховати всі опції сокета
    socketOptions.hide();

    // Показати опції сокета, що відповідають вибраній марці
    if (selectedBrand === "amd") {

      socketOptions.filter("[value='am3'], [value='am3+'], [value='am4']").show();
    } else if (selectedBrand === "intel") {
      socketOptions.filter("[value='1155'], [value='1156'], [value='1150'], [value='1151'], [value='2011'], [value='1200'], [value='1700']").show();
    }
  });
  // Виклик події зміни марки, щоб відобразити відповідні опції сокета при завантаженні сторінки
  $("#brandFilter").change();
});



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
  // Параметри пагінації
  var productsPerPage = 8; // Кількість товарів на одній сторінці
  var productList = $("#productList .card"); // Список всіх товарів
  var totalPages = Math.ceil(productList.length / productsPerPage); // Загальна кількість сторінок

  // Функція для відображення товарів на поточній сторінці
  function showCurrentPage(pageNumber) {
    var startIndex = (pageNumber - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    productList.hide().slice(startIndex, endIndex).show();
  }

  // Функція для відображення контролів пагінації
  function showPaginationControls() {
    var paginationControls = $("#paginationControls");
    paginationControls.empty();

    // Додавання кнопок сторінок
    for (var i = 1; i <= totalPages; i++) {
      var button = $("<button>").text(i).addClass("paginationButton");
      paginationControls.append(button);
    }

    // Обробка кліку на кнопку сторінки
    $(".paginationButton").on("click", function () {
      var pageNumber = parseInt($(this).text());
      showCurrentPage(pageNumber);
    });
  }

  // Показати першу сторінку по завантаженні
  showCurrentPage(1);

  // Показати контроли пагінації
  showPaginationControls();
});

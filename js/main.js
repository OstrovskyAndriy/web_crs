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
    }
    else if (selectedBrand === "intel") {
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



document.getElementById('exitButton').addEventListener('click', function () {
  location.reload();
});
// // пагінація сторінки
function pagination () {
    var productsPerPage = 8;
    var productList = $(".card");
    var totalPages = Math.ceil(productList.length / productsPerPage);
  
    function showCurrentPage(pageNumber) {
      var startIndex = (pageNumber - 1) * productsPerPage;
      var endIndex = startIndex + productsPerPage;
  
      productList.hide().slice(startIndex, endIndex).show();
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
  
    createPaginationControls();
    showCurrentPage(1);
  
    // Викликати функцію оновлення пагінації після завантаження товарів з бази даних
    document.addEventListener('DOMContentLoaded', function () {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:5500/api/getprocessors', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var processors = JSON.parse(xhr.responseText);
          createProductCards(processors);
          //updatePagination(); // Оновлення пагінації після завантаження товарів
        }
      };
      xhr.send();
    });
  
    if (localStorage.getItem('isAdmin') === 'true'&&localStorage.getItem('adminExpiration')>Date.now()) {
        // Встановлення статусу адміністратора
        isAdmin = true;
        administrator();
      } 

      else if (localStorage.getItem('isUser') === 'true'&&localStorage.getItem('userExpiration')>Date.now()) {
        // Встановлення статусу адміністратора
        isUser = true;
        user();
      } 
      else{
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('adminExpiration');
        localStorage.removeItem('isUser');
        localStorage.removeItem('userExpiration');
      }

  };
  
// вхід на сайт
document.getElementById('loginButton').addEventListener('click', function () {
    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;
    var addButton = document.getElementById('addButton');
    var cardDeleteButtons = document.getElementsByClassName('deleteButton-in-card');
    //var loginModal = document.getElementById('loginModal');
    var cartButton = document.getElementById('cartButton');
    var addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    var loginButtonInHeader = document.getElementById('loginButtonInHeader');
    var exitButton = document.getElementById('exitButton');
  
    if (email === '1' && password === '1') {
      console.log("admin");
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
  
    else {
      var data = {
        email: email,
        password: password
      };
  
      // Виконання AJAX запиту на бекенд
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5500/api/login', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            console.log('Користувач присутній у системі');
            // Виконати необхідні дії, якщо користувач присутній
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
  
          else {
            console.log('Користувача з такою поштою і паролем немає');
            // Виконати необхідні дії, якщо користувача немає
          }
        }
      };
      xhr.send(JSON.stringify(data));
      console.log("send data");
    }
  });
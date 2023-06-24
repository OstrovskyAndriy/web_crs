// // вхід на сайт
function administrator() {
  var addButton = document.getElementById('addButton');
  var cardDeleteButtons = document.getElementsByClassName('deleteButton-in-card');
  var cartButton = document.getElementById('cartButton');
  var loginButtonInHeader = document.getElementById('loginButtonInHeader');
  var exitButton = document.getElementById('exitButton');

  addButton.style.display = 'inline-block';
  for (var i = 0; i < cardDeleteButtons.length; i++) {
    cardDeleteButtons[i].style.display = 'inline';
  }
  cartButton.style.display = 'none';

  loginButtonInHeader.style.display = 'none';
  exitButton.style.display = 'inline-block';

  localStorage.setItem('isAdmin', 'true');
  localStorage.setItem('adminExpiration', Date.now() + 0.1 * 60 * 1000); // Зберегти час збереження на 5 хвилин (5 хвилин * 60 секунд * 1000 мілісекунд)
}

function user(){
  var addButton = document.getElementById('addButton');
  var cardDeleteButtons = document.getElementsByClassName('deleteButton-in-card');
  var cartButton = document.getElementById('cartButton');
  var addToCartButtons = document.querySelectorAll('.add-to-cart');

  var loginButtonInHeader = document.getElementById('loginButtonInHeader');
  var exitButton = document.getElementById('exitButton');

  cartButton.style.display = 'inline-block';

          addToCartButtons.forEach(function (button) {
            button.style.display = 'inline-block';
          });

          addButton.style.display = 'none';

          for (var i = 0; i < cardDeleteButtons.length; i++) {
            cardDeleteButtons[i].style.display = 'none';
          }

          loginButtonInHeader.style.display = 'none';
          exitButton.style.display = 'inline-block';
          
          localStorage.setItem('isUser', 'true');
          localStorage.setItem('userExpiration', Date.now() + 0.1 * 60 * 1000); // Зберегти час збереження на 5 хвилин (5 хвилин * 60 секунд * 1000 мілісекунд)

};

document.getElementById('loginButton').addEventListener('click', function () {
  var email = document.getElementById('emailInput').value;
  var password = document.getElementById('passwordInput').value;
  
  if (email === '1' && password === '1') {
    console.log("admin");
    administrator();
    $('#loginModal').modal('hide'); // Закриття модального вікна
  }

  else {
    localStorage.setItem('isAdmin', 'false');
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
          user();
          $('#loginModal').modal('hide'); // Закриття модального вікна
        }

        else{
          alert("користувача з такими даними не здайдено\nперевірте дані або зареєструйтесь")
        }
      }
      
    };
    xhr.send(JSON.stringify(data));
    console.log("send data");
  }
});


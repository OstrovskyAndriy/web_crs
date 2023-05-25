$(document).ready(function() {
  $(".dropdown-toggle").click(function() {
    $(this).next('.dropdown-menu').toggle();
  });
});

$(document).ready(function() {
  // Обробник події натискання кнопки "Зареєструватись"
  $("#registrationModal button.btn-primary").click(function() {
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
    var deleteButton = document.getElementById('deleteButton');
    let loginModal = document.getElementById('loginModal');

    if (email === 'admin' && password === '123') {
        addButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
        $('#loginModal').modal('hide'); // Закриття модального вікна
    } else {
        addButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }
});
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
      var data = {
        email: email,
        password: password,
      };
      // Виконання AJAX запиту на бекенд
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5500/api/registration", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              console.log("Користувач успішно зареєстрований");
              // Виконати необхідні дії, якщо користувач успішно зареєстрований
            }else {
              console.log("Помилка реєстрації користувача");
              // Виконати необхідні дії, якщо сталася помилка реєстрації користувача
            }
          }else {
            console.log("Помилка запиту до сервера");
            // Виконати необхідні дії, якщо сталася помилка запиту до сервера
            alert("Користувач вже присутній");
          }
        }
      };
      xhr.send(JSON.stringify(data));
      $("#registrationModal").modal("hide");
    });
  });
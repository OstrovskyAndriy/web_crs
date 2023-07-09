const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "user",           //замініть user і password на свої
  database: "website_db",
  password: "password"
});

connection.connect(err => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Connected to the database.");

    const bodyParser = require('body-parser');
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5500;

    app.use(cors());
    app.use(bodyParser.json());

    //АРІ реєстрації
    app.post('/api/registration', (req, res) => {
      const { email, password } = req.body;

      // Перевірка, чи такий користувач вже існує у базі даних
      const checkQuery = `SELECT * FROM users WHERE mail = ?`;
      connection.query(checkQuery, [email], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, message: 'Помилка сервера' });
        }
        else {
          if (result.length > 0) {
            // Користувач вже існує
            res.status(409).json({ success: false, message: 'Користувач уже існує' });
          } else {
            // Додавання нового користувача до бази даних
            const insertQuery = `INSERT INTO users (mail, password) VALUES (?, ?)`;
            connection.query(insertQuery, [email, password], (err, result) => {

              if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: 'Помилка сервера' });
              } else {
                res.status(200).json({ success: true, message: 'Користувач успішно зареєстрований' });
              }
            });
          }
        }
      });
    });

    //API логіну
    app.post('/api/login', (req, res) => {
      const { email, password } = req.body;

      const query = `SELECT id FROM users WHERE mail = ? AND password = ?`; // Отримати лише ідентифікатор користувача (id)
      const values = [email, password];

      connection.query(query, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, error: "Internal Server Error" });
          return;
        }

        if (results.length > 0) {
          const userID = results[0].id;
          res.status(200).json({ success: true, userID: userID });
        }

        else {
          // Користувача не знайдено
          res.status(404).json({ success: false });
        }
      });
    });

    // API додавання процесора
    app.post('/api/adding', (req, res) => {
      const { brand, socket, model, frequency, cores, tdp, price, filePath } = req.body;

      // console.log("model = ",typeof(model),model);
      // console.log("frequency = ",typeof(frequency),frequency);
      // console.log("brand = ",typeof(brand),brand);
      // console.log("socket = ",typeof(socket),socket);
      // console.log("cores = ",typeof(cores),cores);
      // console.log("threads = ",typeof(threads),threads);
      // console.log("price = ",typeof(price),price);
      // console.log("filePath = ",typeof(filePath),filePath);

      // SQL-запит для вставки даних в таблицю processors
      const sql = `INSERT INTO processors (name, frequency, brand, socket, cores, tdp, price, photo_path) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      // Виконання SQL-запиту з використанням параметрів
      connection.query(sql, [model, frequency, brand, socket, cores, tdp, price, filePath], (err, result) => {
        if (err) {
          console.error('Помилка при виконанні SQL-запиту: ', err);
          res.status(500).json({ error: 'Виникла помилка під час збереження даних' });
        }
        else {
          console.log('Дані успішно збережено');
          res.sendStatus(200);
        }
      });
    });

    //АРІ виводу товарів
    app.get('/api/getprocessors', (req, res) => {
      const query = 'SELECT * FROM processors';

      connection.query(query, (err, results) => {
        if (err) {
          console.error('Помилка запиту до бази даних: ', err);
          res.status(500).send('Помилка сервера');
          return;
        }

        // Відправлення результату як відповідь на запит
        res.send(results);
      });
    });

    //API видалення товару
    app.delete('/api/deleteProduct/:productId', (req, res) => {
      const productId = req.params.productId;
      console.log(productId);
      // Запит на видалення товару з бази даних
      const deleteQuery = `DELETE FROM processors WHERE id = ?`;

      connection.query(deleteQuery, [productId], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, message: 'Помилка сервера' });
        } else {
          if (results.affectedRows > 0) {
            res.json({ success: true, message: 'Товар успішно видалено' });
          } else {
            res.json({ success: false, message: 'Товар не знайдено' });
          }
        }
      });
    });

    //API оформлення обраних процесорів
    app.post('/api/order', (req, res) => {
      const { orderData, userID, note } = req.body;

      const orderItems = orderData; // Отримати об'єкт orderData без розпакування

      const extractedItems = orderItems.map(item => `${item.brand} ${item.name}`); // Витягнути потрібні значення

      const query = `INSERT INTO orders (user_id, processor, order_status) VALUES (?, ?, ?)`;
      const values = [userID, extractedItems.join(', '), note]; // Об'єднати значення в рядок

      connection.query(query, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, error: "Internal Server Error" });
          return;
        }

        res.status(200).json({ success: true });
      });
    });

    //API виводу замовлень для адміна
    app.get('/api/getOrders', (req, res) => {
      // const query = 'SELECT mail, processor, order_status FROM users INNER JOIN orders ON(users.id=orders.user_id)';
      const query = 'SELECT orders.id, users.mail, orders.processor, orders.order_status FROM orders INNER JOIN users ON(users.id=orders.user_id)';

      connection.query(query, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
          return;
        }

        res.status(200).json(results);
      });
    });

    //API оновлення статусу
    app.put('/api/updateOrders', (req, res) => {
      var updatedOrders = req.body; // Отримати оновлені замовлення з тіла запиту
      console.log(123);


      // Оновлення статусу замовлення в базі даних для кожного замовлення
      updatedOrders.forEach(function (updatedOrder) {
        var orderId = updatedOrder.id;
        var orderStatus = updatedOrder.status;

        var sql = 'UPDATE orders SET order_status = ? WHERE id = ?';
        connection.query(sql, [orderStatus, orderId], function (err, result) {
          if (err) {
            console.error('Помилка при оновленні статусу замовлення:', err);
          } else {
            console.log('Статус замовлення оновлено');
          }
        });
      });

      // Відповісти успішним статусом
      res.sendStatus(200);
    });

    //API виводу замовлень для користувача
    app.get('/api/getUserOrders/:userId', (req, res) => {
      const id = req.params.userId;
      const query = 'SELECT processor,order_status FROM users INNER JOIN orders ON(users.id=orders.user_id) WHERE user_id=?';

      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
          return;
        }
        res.status(200).json(results);
      });
    });

    app.listen(port, () => {
      console.log(`Сервер запущено на порті ${port}`);
    });
  }
});


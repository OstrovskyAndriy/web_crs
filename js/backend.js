const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "andriy",
  database: "website_db",
  password: "pakamakafo"
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

      const query = `SELECT * FROM users WHERE mail = ? AND password = ?`;
      const values = [email, password];
      console.log(email);
      console.log(password);


      connection.query(query, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, error: "Internal Server Error" });
          return;
        }

        if (results.length > 0) {
          // Користувач знайдений

          res.status(200).json({ success: true });
        } else {
          // Користувача не знайдено
          res.status(404).json({ success: false });
        }
      });
    });

    // API додавання процесора
    app.post('/api/adding', (req, res) => {
      const { brand, socket, model, frequency, cores, threads, price, filePath } = req.body;
      
      // console.log("model = ",typeof(model),model);
      // console.log("frequency = ",typeof(frequency),frequency);
      // console.log("brand = ",typeof(brand),brand);
      // console.log("socket = ",typeof(socket),socket);
      // console.log("cores = ",typeof(cores),cores);
      // console.log("threads = ",typeof(threads),threads);
      // console.log("price = ",typeof(price),price);
      // console.log("filePath = ",typeof(filePath),filePath);

      // SQL-запит для вставки даних в таблицю processors
      const sql = `INSERT INTO processors (name, frequency, brand, socket, cores, threads, price, photo_path) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      // Виконання SQL-запиту з використанням параметрів
      connection.query(sql, [model, frequency, brand, socket, cores, threads, price, filePath], (err, result) => {
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

    app.listen(port, () => {
      console.log(`Сервер запущено на порті ${port}`);
    });
  }
});


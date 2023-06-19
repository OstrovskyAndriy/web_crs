const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "website_db",
    password: "pakamakafo123"
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

        app.listen(port, () => {
            console.log(`Сервер запущено на порті ${port}`);
        });
    }
});


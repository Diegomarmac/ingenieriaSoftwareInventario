const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Inventario home' });
});

/* GET /register  */
router.get('/register', (req, res, next) => {
  res.send("Register route ! ")
});

/* POST /register aqui hay que modificar, nos faltan los modelos de usuarios para dejar esto hecho */
// router.post('/register', postRegister);

/* GET /login  */
router.get('/login', (req, res, next) => {
  res.send("login Get route ! ")
});

/* POST /login  */
router.post('/login', (req, res, next) => {
  res.send("login post route ! ")
});

/* GET /profile  */
router.get('/profile', (req, res, next) => {
  res.send("profile route ! ")
});

/* PUT /profile/:user_id  */
router.put('/profile/:user_id', (req, res, next) => {
  res.send("profile PUT route ! ")
});

/* GET /forgot  */
router.get('/forgot', (req, res, next) => {
  res.send("forgot pswd route ! ")
});

/* PUT /forgot  */
router.put('/forgot', (req, res, next) => {
  res.send("forgot PUT route ! ")
});

/* GET /reset/:token  */
router.get('/reset/:token', (req, res, next) => {
  res.send("reset/:token route ! ")
});

/* PUT /reset/:token  */
router.put('/reset/:token', (req, res, next) => {
  res.send("reset/:token PUT route ! ")
});

module.exports = router;

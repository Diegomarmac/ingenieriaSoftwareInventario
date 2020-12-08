const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
    res.send("It's Working!!!");
  });

/* POST reviews create /posts/:id/reviews */
router.post('/', (req, res, next) => {
  res.send("CREATE It's Working!!!");
});

/* GET reviews edit /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send("EDIT It's Working!!!");
});

/* PUT reviews update /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
  res.send("PUT It's Working!!!");
});

/* DELETE reviews destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
  res.send("DELETE It's Working!!!");
});
  
  module.exports = router;
  
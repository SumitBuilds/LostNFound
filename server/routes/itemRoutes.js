const express = require('express');
const router = express.Router();
const { validateItem } = require('../middleware/validationMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

router.route('/')
  .get(getItems)
  .post(apiLimiter, validateItem, createItem);

router.route('/:id')
  .get(getItemById)
  .put(validateItem, updateItem)
  .delete(deleteItem);

module.exports = router;

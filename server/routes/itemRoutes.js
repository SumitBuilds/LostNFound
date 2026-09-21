const express = require('express');
const router = express.Router();
const { validateItem } = require('../middleware/validationMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/authMiddleware');

const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

router.route('/')
  .get(getItems)
  .post(protect, apiLimiter, validateItem, createItem);

router.route('/:id')
  .get(getItemById)
  .put(protect, validateItem, updateItem)
  .delete(protect, deleteItem);

module.exports = router;

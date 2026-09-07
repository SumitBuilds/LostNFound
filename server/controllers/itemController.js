const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public (for now)
exports.getItems = async (req, res) => {
  try {
    const { type, category, status } = req.query;
    
    // Build filter object based on query params
    let filter = {};
    if (type && type !== 'all') filter.type = type;
    if (category && category !== 'all') filter.category = category;
    if (status && status !== 'all') filter.status = status;

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching items', error: error.message });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching item', error: error.message });
  }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Public (for now, usually Private)
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Public (for now)
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public (for now)
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

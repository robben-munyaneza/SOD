const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
     const category = await Category.create(req.body);
     res.status(201).json(category);
    }

    catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err.message });
    }
    
};

// get all categories
exports.getallCategories = async (req, res) => {
    try{
const categories = await Category.findAll();
res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
};

// get single categorory
exports.getCategortyById = async (req, res) => {
    try{
  const CategoryId = await Category.findByPk(req.params.id);
  if (!CategoryId)  return res.status(404).json({ message: 'Category not found' });
  res.json(CategoryId);

    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching category', error: err.message });
    }

};

// update category
exports.updateCategory = async (req, res) => {
    try{
   const category = await Category.findByPk(req.params.id);
   if (!category) return res.status(404).json({ message: 'Category not found' });
   await category.update(req.body);
  res.json(category);
    }catch (err) {
     res.status(500).json({ message: 'Error updating category', error: err.message });
    }
};

// delete category
exports.deleteCategory = async (req, res) => {
    try{
   const category = await Category.findByPk(req.params.id);
   if (!category) return res.status(404).json({ message: 'Category not found' });
   await category.destroy();
  res.json({ message: 'Category deleted successfully' });
    }

    catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err.message });
    }

};
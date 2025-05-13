import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    categoryId: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/products/${editingId}`
        : 'http://localhost:5000/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Failed to ${editingId ? 'update' : 'create'} product`);

      setFormData({ name: '', sku: '', description: '', categoryId: '' });
      setEditingId(null);
      setIsModalOpen(false);
      setError('');
      fetchProducts();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message);
    }
  };

  const handleEdit = product => {
    setFormData({
      name: product.name,
      sku: product.sku,
      description: product.description,
      categoryId: product.categoryId,
    });
    setEditingId(product.id);
    setIsModalOpen(true);
    setError('');
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete product');
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        setError('Failed to delete product');
      }
    }
  };

  const openModal = () => {
    setFormData({ name: '', sku: '', description: '', categoryId: '' });
    setEditingId(null);
    setIsModalOpen(true);
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', sku: '', description: '', categoryId: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="ml-64 p-5 font-sans relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-900">Manage Products</h2>
        <button
          onClick={openModal}
          className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
        >
          Add Product
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <h3 className="text-xl font-semibold text-amber-900 mb-4">Product List</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-amber-900 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 px-4 py-4">
                  No products found
                </td>
              </tr>
            ) : (
              products.map(prod => (
                <tr key={prod.id} className="border-b hover:bg-amber-50">
                  <td className="px-4 py-2 font-medium text-amber-900">{prod.name}</td>
                  <td className="px-4 py-2">{prod.sku}</td>
                  <td className="px-4 py-2">{prod.description}</td>
                  <td className="px-4 py-2">{prod.Category?.name || 'Uncategorized'}</td>
                  <td className="px-4 py-2">{prod.Category?.name || 'Uncategorized'}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="bg-amber-700 text-white px-3 py-1 rounded font-semibold hover:bg-amber-900 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-700 text-white px-3 py-1 rounded font-semibold hover:bg-red-800 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative z-50">
            <h3 className="text-xl font-bold text-amber-900 mb-4">
              {editingId ? 'Edit Product' : 'Create Product'}
            </h3>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              />
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-base focus:outline-none focus:ring-2 focus:ring-amber-700"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                >
                  {editingId ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

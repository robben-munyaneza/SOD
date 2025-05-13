import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stockmovement() {
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    type: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/stockmovement');
      setMovements(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching stock movements:', err);
      setError('Failed to load stock movements. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/stockmovement', form);
      setForm({ productId: '', quantity: '', type: '', notes: '' });
      fetchMovements();
    } catch (err) {
      console.error('Error creating stock movement:', err);
      setError('Failed to create stock movement. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/stockmovement/${id}`);
      fetchMovements();
    } catch (err) {
      console.error('Error deleting stock movement:', err);
      setError('Failed to delete stock movement. Please try again later.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Stock Movements</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit">Add Movement</button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Movements Table */}
      {!loading && movements.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement, index) => (
              <tr key={movement.id}>
                <td>{index + 1}</td>
                <td>{movement.Product?.name || 'N/A'}</td>
                <td>{movement.Product?.sku || 'N/A'}</td>
                <td>{movement.quantity}</td>
                <td>{movement.type}</td>
                <td>{movement.notes}</td>
                <td>
                  <button onClick={() => handleDelete(movement.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No movements available message */}
      {!loading && movements.length === 0 && !error && (
        <p>No stock movements available.</p>
      )}
    </div>
  );
}

export default Stockmovement;

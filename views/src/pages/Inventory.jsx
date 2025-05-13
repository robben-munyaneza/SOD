import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [source, setSource] = useState('table'); // 'table' or 'calculate'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For tracking API or rendering errors

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const endpoint = source === 'table' ? '/inventory/table' : '/inventory/calculate';
        const res = await axios.get(endpoint);
        setInventory(res.data || []);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError('Failed to load inventory data.');
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [source]);

  const getSafe = (obj, path, fallback = 'N/A') => {
    try {
      return path.split('.').reduce((val, key) => val?.[key], obj) ?? fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Inventory</h2>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setSource('table')}>
          From Inventory Table
        </button>
        <button style={styles.button} onClick={() => setSource('calculate')}>
          From Stock Movements
        </button>
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading inventory...</p>
      ) : error ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>#</th>
              <th style={styles.tableHeader}>Product Name</th>
              <th style={styles.tableHeader}>SKU</th>
              <th style={styles.tableHeader}>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(inventory) && inventory.map((item, index) => {
              const product = item?.Product || item?.product || {};
              const quantity = source === 'table'
                ? item?.quantity ?? 0
                : item?.currentStock ?? item?.dataValues?.currentStock ?? 0;

              return (
                <tr key={index}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{getSafe(product, 'name')}</td>
                  <td style={styles.tableCell}>{getSafe(product, 'sku')}</td>
                  <td style={styles.tableCell}>{quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: 'auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};

export default Inventory;

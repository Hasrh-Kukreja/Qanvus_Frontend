import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortField, setSortField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const apiUrl = 'http://localhost:8000/api'; 

  useEffect(() => {
    // Fetch products from the API
    axios.get(`${apiUrl}/products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAdd = () => {
    if (formData.name && formData.price && formData.image) {
      const newProduct = {
        name: formData.name,
        price: formData.price,
        image: formData.image,
      };

      axios.post("http://localhost:8000/api/products", newProduct)
        .then((response) => {
          setProducts([...products, response.data]);
          setFormData({ name: '', price: '', image: '' });
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
    }
  };

  const handleEdit = (index) => {
    const editedProduct = products[index];

    // Create a new product object with updated data
    const updatedProduct = {
      name: formData.name,
      price: formData.price,
      image: formData.image,
    };

    // Send a PUT request to your API to update the product
    axios.put(`${apiUrl}/updateproducts/${editedProduct._id}`, updatedProduct)
      .then((response) => {
        const updatedProducts = [...products];
        updatedProducts[index] = response.data;
        setProducts(updatedProducts);
        setFormData({ name: '', price: '', image: '' });
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleDelete = (index) => {
    const deletedProduct = products[index];

    axios.delete(`${apiUrl}/products/${deletedProduct._id}`)
      .then(() => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  useEffect(() => {
    // Sort products based on sortOrder and sortField
    const sortedProducts = [...products].sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setProducts(sortedProducts);
  }, [sortOrder, sortField]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(formData.name.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [formData.name, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleHeaderClick = (field) => {
    if (sortField === field) {
      toggleSortOrder();
    } else {
      // If clicking on a new field, set the field and default to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h2>Product Manager</h2>
      <div className="mb-3">
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price">Product Price:</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="btn btn-primary mb-3" onClick={handleAdd}>
        Add Product
      </button>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('name')}>
              Product Name
              {sortField === 'name' && (
                <span className="float-end">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th onClick={() => handleHeaderClick('price')}>
              Product Price
              {sortField === 'price' && (
                <span className="float-end">
                  {sortOrder === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} style={{ width: '50px', height: 'auto' }} />
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array(Math.ceil(filteredProducts.length / itemsPerPage))
            .fill()
            .map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default ProductManager;

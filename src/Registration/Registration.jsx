import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../Registration/Registration.css"

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', // Add phone field
    email: '',
    dateOfBirth: '', // Add dateOfBirth field
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.phone) {
      validationErrors.phone = 'Phone is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of Birth is required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password,
        });
        console.log("Saved successfully",response)
        window.location.href = '/login';
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center r-container">
      <div className="w-50">
        <Form onSubmit={handleSubmit} style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <h2 className="text-center mt-3 mb-4">Register</h2>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              className="rounded-pill"
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              className="rounded-pill"
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              className="rounded-pill"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              isInvalid={!!errors.dateOfBirth}
              className="rounded-pill"
            />
            <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className="rounded-pill"
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block rounded-pill mt-3">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegistrationForm;

import React, { useState } from 'react';
import axios from 'axios'; // Don't forget this import
import './index.css'; // External CSS for better styling control

function Details() {
  const [formData, setFormData] = useState({
    age: '',
    education  : '',
    technicalProficiency: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/userdetails'; // Replace with your actual API

    axios.get(apiUrl, { params:{
      age: formData.age,
      qualification:formData.education,
      level:formData.technicalProficiency,
      id: sessionStorage.getItem("userid")
    } })
      .then(response => {
        console.log('Success:', response.data);
        alert('Form submitted successfully!');
        window.location.href = '/'
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form.');
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-heading">
        Some info about you.
      </h1>
      <p className="form-subheading">
        The information requested is used to make the test appropriate for you. It is only general information, which does not affect your privacy. The test is absolutely anonymous.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
            max="99"
          />
        </div>

        <div className="form-group">
          <label>Education:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
            <option value="None">None</option>
            
          </select>
        </div>

        <div className="form-group">
          <label>Technical Proficiency:</label>
          <select
            name="technicalProficiency"
            value={formData.technicalProficiency}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn"><strong>Submit</strong></button>
      </form>
    </div>
  );
}

export default Details;

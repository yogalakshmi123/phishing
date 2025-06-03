import React, { useState } from 'react';

function Details(){

    const [formData, setFormData] = useState({
    age: '',
    education: '',
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

    const apiUrl = 'https://your-api-url.com/submit'; // Replace with your actual endpoint

    // Send GET request with query parameters
    axios.get(apiUrl, { params: formData })
      .then(response => {
        console.log('Success:', response.data);
        alert('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form.');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
            />
          </label>
        </div>

        <div>
          <label>Education:
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
            </select>
          </label>
        </div>

        <div>
          <label>Technical Proficiency:
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
          </label>
        </div>

        <div>
          <label>Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );

}


  

export default Details

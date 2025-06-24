import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, GraduationCap, Code, Building2, Check } from 'lucide-react';
import axios from 'axios';

function Details() {
  const [formData, setFormData] = useState({
    age: '',
    education: '',
    technicalProficiency: '',
    department: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/userdetails'; // Replace with your actual API

    axios.get(apiUrl, {
      params: {
        age: formData.age,
        qualification: formData.education,
        level: formData.technicalProficiency,
        id: sessionStorage.getItem("userid")
      }
    })
      .then(response => {
        console.log('Success:', response.data);
        alert('Form submitted successfully!');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form.');
      });
  };

  // Handle the next and previous buttons
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 1) * 25);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress((currentStep - 1) * 25);
    }
  };

  const steps = [
    { id: 1, title: 'Age', icon: User },
    { id: 2, title: 'Education', icon: GraduationCap },
    { id: 3, title: 'Skills', icon: Code },
    { id: 4, title: 'Department', icon: Building2 },
  ];

  const getStepIcon = (step, index) => {
    const Icon = step.icon;
    const isCompleted = currentStep > step.id;
    const isCurrent = currentStep === step.id;
    
    return (
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
        isCompleted 
          ? 'bg-emerald-500 border-emerald-500 text-white' 
          : isCurrent 
            ? 'bg-blue-500 border-blue-500 text-white' 
            : 'bg-white border-gray-300 text-gray-400'
      }`}>
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : (
          <Icon className="w-5 h-5" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  {getStepIcon(step, index)}
                  <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}
                        style={{ width: currentStep > step.id ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Personal Information
            </h1>
            <p className="text-gray-600">
              Please provide some basic information. Your privacy is important to us.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Step 1: Age */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">What's your age?</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="0"
                    max="99"
                    placeholder="Enter your age"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">What's your educational background?</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Level
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  >
                    <option value="">Select your education level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's Degree</option>
                    <option value="Master's">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="None">No formal education</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Technical Proficiency */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <Code className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">How would you rate your technical skills?</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Proficiency
                  </label>
                  <select
                    name="technicalProficiency"
                    value={formData.technicalProficiency}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  >
                    <option value="">Select your skill level</option>
                    <option value="Beginner">Beginner - Just getting started</option>
                    <option value="Intermediate">Intermediate - Comfortable with basics</option>
                    <option value="Advanced">Advanced - Highly experienced</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Department */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <Building2 className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Which department do you work in?</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Engineering, Marketing, Sales"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <Check className="w-5 h-5" />
                  <span>Submit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
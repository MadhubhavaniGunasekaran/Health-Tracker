import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    bloodPressure: ''
  });

  const [dietAdvice, setDietAdvice] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, age, weight, height, bloodPressure } = formData;
    let errors = {};

    if (!name.trim()) errors.name = "Name is required.";
    if (!age || age <= 0) errors.age = "Please enter a valid age.";
    if (!weight || weight <= 0) errors.weight = "Please enter a valid weight.";
    if (!height || height <= 0) errors.height = "Please enter a valid height.";
    if (!bloodPressure.trim()) errors.bloodPressure = "Blood pressure is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const suggestDiet = () => {
    const { age, weight, height, bloodPressure } = formData;
    let advice = '';

    // BMI-based advice
    const bmi = weight / ((height / 100) ** 2);
    if (bmi >= 25) {
      advice += 'You are in the overweight category. Consider a balanced diet with more vegetables and lean proteins.\n';
    } else if (bmi < 18.5) {
      advice += 'You are in the underweight category. Consider more calorie-dense foods like nuts and healthy fats.\n';
    } else {
      advice += 'You have a normal BMI. Maintain a balanced diet with all food groups.\n';
    }

    // Blood pressure advice
    if (bloodPressure.split('/')[0] > 130) {
      advice += 'Your blood pressure is high. Consider reducing salt intake and increasing physical activity.\n';
    }

    // Age-based advice
    if (age >= 50) {
      advice += 'At your age, focus on nutrient-rich foods to maintain bone density and cardiovascular health.\n';
    } else if (age < 18) {
      advice += 'You are still growing! Make sure to get enough calcium, proteins, and healthy fats.\n';
    }

    setDietAdvice(advice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/health", formData);  // Updated URL
      console.log("Health data submitted:", res.data);
      suggestDiet();
    } catch (error) {
      console.error("Error submitting health data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Weight (kg)"
        required
      />
      {errors.weight && <p style={{ color: 'red' }}>{errors.weight}</p>}

      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="Height (cm)"
        required
      />
      {errors.height && <p style={{ color: 'red' }}>{errors.height}</p>}

      <input
        type="text"
        name="bloodPressure"
        value={formData.bloodPressure}
        onChange={handleChange}
        placeholder="Blood Pressure"
        required
      />
      {errors.bloodPressure && <p style={{ color: 'red' }}>{errors.bloodPressure}</p>}

      <button type="submit">Submit</button>

      {dietAdvice && (
        <div className="diet-advice">
          <h3>Diet Advice</h3>
          <p>{dietAdvice}</p>
        </div>
      )}
    </form>
  );
};

export default Form;

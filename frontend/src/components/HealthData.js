// frontend/src/components/HealthData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HealthData = () => {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/api/health");
      setHealthData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2>Health Data</h2>
      {healthData.map((data) => (
        <div key={data._id} className="health-card">
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <p>Weight: {data.weight} kg</p>
          <p>Height: {data.height} cm</p>
          <p>Blood Pressure: {data.bloodPressure}</p>
        </div>
      ))}
    </div>
  );
};

export default HealthData;

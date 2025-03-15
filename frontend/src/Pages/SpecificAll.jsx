import React from 'react';
import { useParams } from 'react-router-dom';

const SpecificAll = () => {
    const patientId=useParams();
  return (
    <div>
      `Specific all ${patientId}`
    </div>
  )
}

export default SpecificAll

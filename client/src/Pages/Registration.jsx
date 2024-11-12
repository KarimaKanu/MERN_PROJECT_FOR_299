import React, { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    educationMedium: '',
    upbringingPlace: '',
    extracurriculars: '',
    currentConcerns: '',
    effectsOnLife: {
      selfCare: false,
      relationship: false,
      socialActivity: false,
      professionalPerformance: false,
      groupActivities: false,
      absenteeism: false,
      wellBeing: false,
      mood: false,
      selfHarm: false,
      selfEsteem: false,
    },
    receivedMentalHealthServices: false,
    takingPsychiatricMedication: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      effectsOnLife: {
        ...prev.effectsOnLife,
        [id]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform further actions like form submission to a backend here
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="w-9/12 bg-teal-100 p-10 rounded m-auto mt-10">
        <div>
          <h3 className="text-xl font-bold">
            Please Give Us the Following Information to Register
          </h3>
          <h5 className="mb-3">
            Information you provide here will be kept confidential
          </h5>
          <label>Medium of Education:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Bangla/English/Other Languages"
            type="text"
            name="educationMedium"
            value={formData.educationMedium}
            onChange={handleChange}
          />

          <label>The Place You Were Brought up:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Urban/Sub-urban/Rural/Abroad"
            type="text"
            name="upbringingPlace"
            value={formData.upbringingPlace}
            onChange={handleChange}
          />

          <label>Extracurricular Activities:</label>
          <input
            className="block mb-3 p-2 rounded w-9/12"
            placeholder="Enter Your Answer"
            type="text"
            name="extracurriculars"
            value={formData.extracurriculars}
            onChange={handleChange}
          />

          <label>Present Concerns / Major Issues You Are Facing:</label><br />
          <textarea
            className="rounded-md mb-3 p-2 w-9/12"
            name="currentConcerns"
            rows="4"
            placeholder="Describe Your Concerns"
            value={formData.currentConcerns}
            onChange={handleChange}
          ></textarea>

          

          <input
            type="checkbox"
            name="receivedMentalHealthServices"
            checked={formData.receivedMentalHealthServices}
            onChange={handleChange}
          />
          <label htmlFor="receivedMentalHealthServices">
            Have you ever received any type of Mental Health Services?
          </label><br />
          <input
            type="checkbox"
            name="takingPsychiatricMedication"
            checked={formData.takingPsychiatricMedication}
            onChange={handleChange}
          />
          <label htmlFor="takingPsychiatricMedication">
            Are you currently taking any psychiatric medication?
          </label><br />

          <button
            id="btn-submit"
            className="rounded bg-white px-8 py-2 hover:bg-teal-500 hover:text-white mt-5"
          >
            Submit
          </button>
        </div>
      </section>
    </form>
  );
}
import React from "react";

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4">
      <select name="type" onChange={handleChange} className="border p-2">
        <option value="">Select Type</option>
        <option value="FB">Food & Beverage</option>
        <option value="PH">Pharmaceuticals</option>
        {/* Add more options as needed */}
      </select>
      {/* Add more filter inputs as needed */}
    </div>
  );
};

export default Filter;

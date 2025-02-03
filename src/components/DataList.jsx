import React from "react";

const DataList = ({ data, filter }) => {
  const filteredData = data.filter((item) => {
    return (
      (filter.type ? item.category_code === filter.type : true) &&
      (filter.status ? item.status === filter.status : true)
      // Add more filter conditions as needed
    );
  });

  return (
    <ul className="list-disc pl-5">
      {filteredData.map((item) => (
        <li key={item.id} className="mb-2">
          {item.title} - {item.status}
        </li>
      ))}
    </ul>
  );
};

export default DataList;

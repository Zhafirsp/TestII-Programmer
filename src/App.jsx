import React, { useState, useEffect } from "react";
import axios from "axios";

const categoryMap = {
  1: "F",
  2: "P",
  3: "G",
  4: "T",
  13: "B",
  14: "M",
  15: "K",
  16: "A",
  17: "E",
  18: "L",
  19: "R",
  20: "D",
};

const categoryTitles = {
  F: "Food & Beverage",
  P: "Pharmaceuticals",
  G: "Government",
  T: "Traditional Medicine & Supplement",
  B: "Beauty, Cosmetics & Personal Care",
  M: "Media RTU",
  K: "K3L Products",
  A: "ALKES & PKRT",
  E: "Feed, Pesticides & PSAT",
  L: "Others",
  R: "Research / Academic Purpose",
  D: "Dioxine Udara",
};

const ProgramTable = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bsby.siglab.co.id/api/test-programmer?email=zhafirsp@gmail.com"
        );
        setPrograms(response.data.results);
        setFilteredPrograms(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortData = (field, order) => {
    const sortedData = [...programs].sort((a, b) => {
      if (order === "asc") return a[field] - b[field];
      return b[field] - a[field];
    });
    setPrograms(sortedData);
    setFilteredPrograms(sortedData);
  };

  const getPopupMessage = (program) => {
    if (program.discount > 0 && program.discount < 1000000) {
      return "Discount applied!";
    } else if (program.discount >= 1000000) {
      return "Discount applied! Approval needed.";
    }
    return "";
  };

  const filterData = (filter) => {
    let filtered = [...programs];

    if (filter.type) {
      filtered = filtered.filter(
        (program) => categoryMap[program.type] === filter.type
      );
    }
    if (filter.status !== null) {
      filtered = filtered.filter((program) => program.status === filter.status);
    }
    if (filter.attachment !== null) {
      filtered = filtered.filter(
        (program) => program.attachment === filter.attachment
      );
    }
    if (filter.discount !== null) {
      filtered = filtered.filter(
        (program) => program.discount > 0 === filter.discount
      );
    }

    setFilteredPrograms(filtered);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => sortData("price", "asc")}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 cursor-pointer"
        >
          Sort Price Ascending
        </button>
        <button
          onClick={() => sortData("price", "desc")}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Sort Price Descending
        </button>
      </div>

      <div className="mb-4">
        <h2>Filters</h2>
        <div className="space-x-2">
          <select
            onChange={(e) => filterData({ type: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Type</option>
            {Object.keys(categoryTitles).map((key) => (
              <option key={key} value={key}>
                {categoryTitles[key]}
              </option>
            ))}
          </select>
          <select
            onChange={(e) =>
              filterData({ status: e.target.value === "Approved" ? 1 : 0 })
            }
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
          </select>
          <select
            onChange={(e) =>
              filterData({ attachment: e.target.value === "Ada" ? 1 : 0 })
            }
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Attachment</option>
            <option value="Ada">Ada</option>
            <option value="Tidak">Tidak</option>
          </select>
          <select
            onChange={(e) =>
              filterData({ discount: e.target.value === "Ada" ? true : false })
            }
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Discount</option>
            <option value="Ada">Ada</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Discount</th>
            <th className="border px-4 py-2">Attachment</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrograms.map((program) => (
            <tr key={program.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{program.id}</td>
              <td className="border px-4 py-2">
                {categoryTitles[categoryMap[program.type]]}
              </td>
              <td className="border px-4 py-2 text-center">
                {categoryMap[program.type]}
              </td>
              <td className="border px-4 py-2 text-center">{program.price}</td>
              <td className="border px-4 py-2 text-center">
                {program.discount}
              </td>
              <td className="border px-4 py-2 text-center">
                {program.attachment === 0 ? "No Attachment" : "Has Attachment"}
              </td>
              <td className="border px-4 py-2 text-center">
                {program.status === 0 ? "Unapproved" : "Approved"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup message */}
      {filteredPrograms.map((program) => {
        const popupMessage = getPopupMessage(program);
        return (
          popupMessage && (
            <div
              key={program.id}
              className="mt-2 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded"
            >
              {popupMessage}
            </div>
          )
        );
      })}

      {filteredPrograms.map((program) => (
        <div key={program.id} className="mt-2">
          {program.attachment === 0 ? (
            <p>No attachment</p>
          ) : (
            <p>Attachment available</p>
          )}
          {program.status === 0 ? (
            <p>Status: Unapproved</p>
          ) : (
            <p>Status: Approved</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgramTable;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBatteryCells } from "../api/api";
import AddBatteryCellForm from "./AddBatteryCellForm";
const Home = () => {
  const [batteryCells, setBatteryCells] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleForm = () => {
    if (showAddForm === true) {
      fetchData();
    }
    setShowAddForm(!showAddForm);
  };

  const fetchData = async () => {
    try {
      const data = await fetchBatteryCells(); // Fetch battery cells
      setBatteryCells(data);
    } catch (error) {
      // Handle error
      console.error("Error fetching battery cells:", error);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="my-4 text-right">
        <button
          className="px-4 py-2 font-semibold text-white rounded bg-sky-500 hover:bg-sky-600"
          onClick={handleToggleForm}
        >
          {showAddForm ? "Back" : "Add New"}
        </button>
      </div>
      {showAddForm ? (
        <AddBatteryCellForm />
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Battery Cells
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {batteryCells.map((cell) => (
              <Link key={cell.cell_id} to={`/batterycell/${cell.cell_id}`}>
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between mb-4 border-b border-gray-600">
                    <h3 className="mb-2 text-lg font-bold capitalize">
                      {cell.manufacturer}
                    </h3>
                    <span>{cell.model}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Battery Type:</p>
                    <span>{cell.battery_type}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Condition:</p>
                    <span className="capitalize">{cell.condition}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Nominal Voltage:</p>
                    <span>{cell.nominal_voltage} V</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Nominal Charge Capacity:</p>
                    <span>{cell.nominal_charge_capacity} Ah</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">Mass:</p>
                    <span>{cell.mass} g</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

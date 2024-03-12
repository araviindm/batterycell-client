import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBatteryCellById } from "../api/api";

const BatteryCellDetails = () => {
  const { cellId } = useParams();
  const [batteryCell, setBatteryCell] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBatteryCellById(cellId);
        setBatteryCell(data);
      } catch (error) {
        console.error("Error fetching battery cell details:", error);
      }
    };
    fetchData();
  }, [cellId]);

  if (!batteryCell) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-2 md:my-10">
      <div className="flex justify-around px-2 py-4 mx-auto md:m-4 md:px-4 md:py-8">
        <div className="w-11/12 p-4 border rounded-md md:w-3/6">
          <div className="flex justify-between my-6 border-b border-gray-600">
            <h3 className="mb-3 text-lg font-bold capitalize">
              {batteryCell.manufacturer}
            </h3>
            <span>{batteryCell.model}</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Battery Type:</p>
            <span>{batteryCell.battery_type}</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Condition:</p>
            <span className="capitalize">{batteryCell.condition}</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Form Factor:</p>
            <span className="capitalize">{batteryCell.form_factor}</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Mass:</p>
            <span>{batteryCell.mass} (g)</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Height:</p>
            <span>{batteryCell.height} (mm)</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Diameter:</p>
            <span>{batteryCell.diameter} (mm)</span>
          </div>
          <div className="flex justify-between mb-3">
            <p className="font-semibold">Volume:</p>
            <span>
              {batteryCell.volume} (cm<sup>3</sup>)
            </span>
          </div>
        </div>
        <div>
          <img
            src={batteryCell.image_url}
            className="w-[250px] h-[250px] mb-3"
            alt="Battery Cell Image"
          />
          <img
            src={batteryCell.barcode_image_url}
            className="w-[250px] h-[80px]  mb-3"
            alt="Barcode Image"
          />
        </div>
      </div>
      <div className="w-11/12 mx-auto md:w-3/5 lg:w-3/6">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-semibold">Electric Parameters</h1>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Nominal Voltage:</p>
          <span>{batteryCell.nominal_voltage} (V)</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Nominal Energy:</p>
          <span>{batteryCell.nominal_charge_capacity} (Wh)</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Nominal Charge Capacity:</p>
          <span>{batteryCell.nominal_charge_capacity} (Ah)</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Voltage Range:</p>
          <span>{batteryCell.voltage_range} (V)</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Current (continuous):</p>
          <span>{batteryCell.current_continuous} A</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Current (peak):</p>
          <span>{batteryCell.current_peak} A</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Power (continuous):</p>
          <span>{batteryCell.power_continuous} W</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Power (peak):</p>
          <span>{batteryCell.power_peak} W</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Energy Density (Gravimetric):</p>
          <span>{batteryCell.energy_density_gravimetric} Wh/kg</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Energy Density (Volumetric):</p>
          <span>{batteryCell.energy_density_volumetric} Wh/l</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Power Density (Gravimetric):</p>
          <span>{batteryCell.power_density_gravimetric} W/kg</span>
        </div>
        <div className="flex justify-between p-1 mb-3 border-b border-gray-700">
          <p className="font-semibold">Power Density (Volumetric):</p>
          <span>{batteryCell.power_density_volumetric} kW/l</span>
        </div>
      </div>
    </div>
  );
};

export default BatteryCellDetails;

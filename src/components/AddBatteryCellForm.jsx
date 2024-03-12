import { useState } from "react";
import { postBatteryCell } from "../api/api";

const AddBatteryCellForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    condition: "recycled",
    manufacturer: "Molicel",
    model: "INR21700-p45B",
    batteryType: "Li-on",
    formFactor: "Cylindrical 21700",
    mass: 70,
    height: 70.15,
    diameter: 21.55,
    volume: 25.59,

    nominalVoltage: 3.6,
    nominalEnergy: 16.2,
    nominalChargeCapacity: 4.5,
    voltageRange: "2.5-4.2",
    currentContinuous: 8.61,
    currentPeak: 17.5,
    powerContinuous: 25.6,
    powerPeak: 50.0,
    energyDensityGravimetric: 154,
    energyDensityVolumetric: 375,
    powerDensityGravimetric: 837,
    powerDensityVolumetric: 2.074,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const allFieldsPresent = Object.values(formData).every((value) => !!value);
    if (allFieldsPresent) {
      setError(null);
      let res = await createBatteryCell(formData);
      if (res) {
        setSuccess(true);
      }
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      setError("Please fill in all fields.");
    }
  };
  const createBatteryCell = async (formData) => {
    try {
      let formDataToSend = new FormData();

      // Mapping of form field names to backend's expected names
      const fieldMappings = {
        condition: "condition",
        manufacturer: "manufacturer",
        model: "model",
        batteryType: "battery_type",
        formFactor: "form_factor",
        mass: "mass",
        height: "height",
        diameter: "diameter",
        volume: "volume",
        nominalVoltage: "nominal_voltage",
        nominalEnergy: "nominal_energy",
        nominalChargeCapacity: "nominal_charge_capacity",
        voltageRange: "voltage_range",
        currentContinuous: "current_continuous",
        currentPeak: "current_peak",
        powerContinuous: "power_continuous",
        powerPeak: "power_peak",
        energyDensityGravimetric: "energy_density_gravimetric",
        energyDensityVolumetric: "energy_density_volumetric",
        powerDensityGravimetric: "power_density_gravimetric",
        powerDensityVolumetric: "power_density_volumetric",
      };

      for (let key in formData) {
        if (key === "image") {
          formDataToSend.append("image", formData[key]);
        } else {
          formDataToSend.append(fieldMappings[key], formData[key]);
        }
      }
      const resp = await postBatteryCell(formDataToSend);
      console.log(resp);
      return true;
    } catch (error) {
      console.error("Error fetching battery cell details:", error);
      return false;
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-center">
        New Battery Form
      </h2>
      <form onSubmit={handleOnSubmit}>
        <div className="flex justify-center">
          {success && (
            <div className="p-4 m-4 text-green-500 border border-green-300 rounded-sm">
              Battery cell added to db.
            </div>
          )}
          {error && (
            <div className="p-4 m-4 text-red-500 border border-red-300 rounded-sm">
              {error}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-center">
          <div>
            <label htmlFor="image" className="block mb-1 font-semibold">
              Image:
            </label>
            <input
              type="file"
              onChange={handleChange}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="image"
              accept="image/*"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="condition">
              Condition:
            </label>
            <select
              id="condition"
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="condition"
              onChange={handleChange}
              value={formData.condition}
            >
              <option value="new">New</option>
              <option value="recycled">Recycled</option>
            </select>
          </div>

          <div>
            <label htmlFor="manufacturer" className="block mb-1 font-semibold">
              Manufacturer:
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.manufacturer}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="manufacturer"
            />
          </div>
          <div>
            <label htmlFor="model" className="block mb-1 font-semibold">
              Model:
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.model}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="model"
            />
          </div>
          <div>
            <label htmlFor="batteryType" className="block mb-1 font-semibold">
              Battery Type:
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.batteryType}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="batteryType"
            />
          </div>
          <div>
            <label htmlFor="formFactor" className="block mb-1 font-semibold">
              Form Factor:
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.formFactor}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="formFactor"
            />
          </div>
          <div>
            <label htmlFor="mass" className="block mb-1 font-semibold">
              Mass (g):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.mass}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="mass"
            />
          </div>
          <div>
            <label htmlFor="height" className="block mb-1 font-semibold">
              Height (mm):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.height}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="height"
            />
          </div>
          <div>
            <label htmlFor="diameter" className="block mb-1 font-semibold">
              Diameter (mm):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.diameter}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="diameter"
            />
          </div>
          <div>
            <label htmlFor="volume" className="block mb-1 font-semibold">
              Volume (cm<sup>3</sup>):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.volume}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="volume"
            />
          </div>
          <div>
            <label
              htmlFor="nominalVoltage"
              className="block mb-1 font-semibold"
            >
              Nominal Voltage (V):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.nominalVoltage}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="nominalVoltage"
            />
          </div>
          <div>
            <label htmlFor="nominalEnergy" className="block mb-1 font-semibold">
              Nominal Energy (Wh):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.nominalEnergy}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="nominalEnergy"
            />
          </div>
          <div>
            <label
              htmlFor="nominalChargeCapacity"
              className="block mb-1 font-semibold"
            >
              Nominal Charge Capacity (Ah):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.nominalChargeCapacity}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="nominalChargeCapacity"
            />
          </div>
          <div>
            <label htmlFor="voltageRange" className="block mb-1 font-semibold">
              Voltage Range (V):
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.voltageRange}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="voltageRange"
            />
          </div>
          <div>
            <label
              htmlFor="currentContinuous"
              className="block mb-1 font-semibold"
            >
              Current (continuous) (A):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.currentContinuous}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="currentContinuous"
            />
          </div>
          <div>
            <label htmlFor="currentPeak" className="block mb-1 font-semibold">
              Current (peak) (A):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.currentPeak}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="currentPeak"
            />
          </div>
          <div>
            <label
              htmlFor="powerContinuous"
              className="block mb-1 font-semibold"
            >
              Power (continuous) (W):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.powerContinuous}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="powerContinuous"
            />
          </div>
          <div>
            <label htmlFor="powerPeak" className="block mb-1 font-semibold">
              Power (peak) (W):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.powerPeak}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="powerPeak"
            />
          </div>
          <div>
            <label
              htmlFor="energyDensityGravimetric"
              className="block mb-1 font-semibold"
            >
              Energy Density (Gravimetric):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.energyDensityGravimetric}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="energyDensityGravimetric"
            />
          </div>
          <div>
            <label
              htmlFor="energyDensityVolumetric"
              className="block mb-1 font-semibold"
            >
              Energy Density (Volumetric):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.energyDensityVolumetric}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="energyDensityVolumetric"
            />
          </div>
          <div>
            <label
              htmlFor="powerDensityGravimetric"
              className="block mb-1 font-semibold"
            >
              Power Density (Gravimetric):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.powerDensityGravimetric}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="powerDensityGravimetric"
            />
          </div>
          <div>
            <label
              htmlFor="powerDensityVolumetric"
              className="block mb-1 font-semibold"
            >
              Power Density (Volumetric):
            </label>
            <input
              type="number"
              onChange={handleChange}
              value={formData.powerDensityVolumetric}
              onWheel={(e) => e.target.blur()}
              className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
              name="powerDensityVolumetric"
            />
          </div>
        </div>
        <div className="m-2">
          <button
            onSubmit={handleOnSubmit}
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white rounded bg-sky-500 hover:bg-sky-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBatteryCellForm;

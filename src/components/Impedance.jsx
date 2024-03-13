import { generatePlot, getBatteryHealth } from "../api/api";
import { useState } from "react";
import Plot from "react-plotly.js";
import BatteryIcon from "./BatteryIcon";

const Impedance = () => {
  const [file, setFile] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const [batteryHealth, setbatteryHealth] = useState(null);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let formDataToSend = new FormData();
    formDataToSend.append("file", file);
    try {
      const [plotResp, batteryHealthResp] = await Promise.all([
        generatePlot(formDataToSend),
        getBatteryHealth(formDataToSend),
      ]);
      setPlotData(JSON.parse(plotResp));
      setbatteryHealth(batteryHealthResp);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 mx-4 my-4 md:mx-8 md:my-8">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Upload CSV File</label>
          <input
            type="file"
            accept=".csv"
            className="px-1 py-2 my-2 bg-gray-900 border rounded-sm border-slate-400 w-60"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white rounded bg-sky-500 hover:bg-sky-600"
          >
            Submit
          </button>
        </div>
      </form>
      {plotData.length > 0 && (
        <div className="flex justify-center mx-4 my-4 md:mx-8 md:my-8">
          <Plot
            data={plotData}
            layout={{
              width: 800,
              height: 400,
              title: "Bode Plot",
              xaxis: { title: "Frequency [Hz]" },
              yaxis: [
                { title: "|Z(ω)| [Ohms]" },
                { title: "-φ_Z(ω) [°]", overlaying: "y", side: "right" },
              ],
            }}
          />
        </div>
      )}
      {batteryHealth && (
        <div className="mx-4 my-4 md:mx-8 md:my-8">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Battery State of health (SoH)
          </h2>
          <div className="flex justify-center gap-5">
            <BatteryIcon health={batteryHealth} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Impedance;

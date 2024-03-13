import { compute } from "../api/api";
import { useState } from "react";
import Plot from "react-plotly.js";
import BatteryIcon from "./BatteryIcon";
import CircuitDiagram from "./CircuitDiagram";
import Table from "./Table";

const Impedance = () => {
  const [file, setFile] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const [batteryHealth, setbatteryHealth] = useState(null);
  const [circuitParams, setCircuitParams] = useState({});
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let formDataToSend = new FormData();
    formDataToSend.append("file", file);
    try {
      const resp = await compute(formDataToSend);
      if (resp.length > 0) {
        setPlotData(JSON.parse(resp[0]));
        setbatteryHealth(resp[1]);
        setCircuitParams(resp[2]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 m-4 md:m-8">
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
        <div className="flex justify-center m-4 md:m-8">
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
        <div className="m-4 md:m-8">
          <h2 className="mb-4 text-2xl font-semibold text-center">
            Battery State of health (SoH)
          </h2>
          <div className="flex justify-center gap-5">
            <BatteryIcon health={batteryHealth} />
          </div>
        </div>
      )}

      {circuitParams["Rb"] && (
        <div className="m-4 md:m-8">
          <div className="m-2 md:m-4">
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Circuit Diagram
            </h2>
            <div className="flex justify-center gap-5">
              <CircuitDiagram {...circuitParams} />
            </div>
          </div>
          <div className="m-2 md:m-4">
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Circuit Table
            </h2>
            <div className="flex justify-center gap-5">
              <Table {...circuitParams} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Impedance;

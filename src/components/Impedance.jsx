import { generatePlot } from "../api/api";
import { useState } from "react";
import Plot from "react-plotly.js";

const Impedance = () => {
  const [file, setFile] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let formDataToSend = new FormData();
    formDataToSend.append("file", file);
    try {
      const resp = await generatePlot(formDataToSend);
      setPlotData(JSON.parse(resp.plot));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container px-4 py-8 mx-auto">
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
        <div className="my-4">
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
    </div>
  );
};

export default Impedance;

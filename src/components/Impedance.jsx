import { generatePlot } from "../api/api";
import { useState } from "react";

const Impedance = () => {
  const [file, setFile] = useState(null);
  const [plotImage, setPlotImage] = useState(null);
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
      console.log(resp);
      const decodedImage = atob(resp.plot);
      const arrayBuffer = new Uint8Array(decodedImage.length);

      for (let i = 0; i < decodedImage.length; i++) {
        arrayBuffer[i] = decodedImage.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: "image/png" });

      const imageUrl = URL.createObjectURL(blob);

      setPlotImage(imageUrl);
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
      {plotImage && (
        <div className="mt-4">
          <h2 className="mb-4 text-2xl font-semibold text-center">Bode Plot</h2>
          <img src={plotImage} alt="Plot" />
        </div>
      )}
    </div>
  );
};

export default Impedance;

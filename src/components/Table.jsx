const Table = ({ Rb, R_SEI, CPE_SEI, R_CT, CPE_DL, W_Warburg }) => {
  return (
    <div className="overflow-x-auto text-gray-800">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Parameter</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Explanation</th>
            <th className="px-4 py-2">Indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 border">Rb</td>
            <td className="px-4 py-2 border">{parseFloat(Rb).toFixed(3)}</td>
            <td className="px-4 py-2 border">Electrolyte resistance</td>
            <td className="px-4 py-2 border"></td>
          </tr>
          <tr className="bg-white">
            <td className="px-4 py-2 border">R_SEI</td>
            <td className="px-4 py-2 border">{parseFloat(R_SEI).toFixed(3)}</td>
            <td className="px-4 py-2 border">Resistance due to SEI layer</td>
            <td className="px-4 py-2 border"></td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border">
              {parseFloat(CPE_SEI).toFixed(3)}
            </td>
            <td className="px-4 py-2 border">Capacitance due to SEI layer</td>
            <td className="px-4 py-2 border"></td>
          </tr>
          <tr className="bg-white">
            <td className="px-4 py-2 border">R_CT</td>
            <td className="px-4 py-2 border">{parseFloat(R_CT).toFixed(3)}</td>
            <td className="px-4 py-2 border">
              charge-transfer resistance that models the voltage drop over the
              electrode–electrol yte interface due to a load
            </td>
            <td className="px-4 py-2 border"></td>
          </tr>
          <tr className="bg-gray-100">
            <td className="px-4 py-2 border">CPE_DL</td>
            <td className="px-4 py-2 border">
              {parseFloat(CPE_DL).toFixed(3)}
            </td>
            <td className="px-4 py-2 border">
              Double-layer capacitance that models the effect of charges
              building up in the electrolyte at the electrode surface
            </td>
            <td className="px-4 py-2 border"></td>
          </tr>
          <tr className="bg-white">
            <td className="px-4 py-2 border">W_Warburg</td>
            <td className="px-4 py-2 border">{parseInt(W_Warburg)}</td>
            <td className="px-4 py-2 border">
              Frequency-depend ent Warburg impedance models diffusion of lithium
              ions in the electrodes
            </td>
            <td className="px-4 py-2 border"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;

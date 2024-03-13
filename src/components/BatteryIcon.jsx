const BatteryIcon = ({ health }) => {
  const healthStatus = health >= 50 ? "Healthy" : "Degraded";
  return (
    <>
      <div className="relative flex flex-col w-24 h-48 overflow-hidden border border-black rounded">
        <div
          className="absolute bottom-0 left-0"
          style={{
            height: `${100 - health}%`,
            width: "100%",
            backgroundColor: "#D2B48C",
          }}
        ></div>
        <div
          className="absolute top-0 left-0 bg-green-500"
          style={{ height: `${health}%`, width: "100%" }}
        ></div>
      </div>
      <div>
        <div className="font-semibold">Status: {healthStatus}</div>
        <div className="font-semibold">SoH: {parseInt(health)}%</div>
      </div>
    </>
  );
};

export default BatteryIcon;

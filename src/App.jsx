import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/batterycell`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Complete");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 m-5 text-center">
      <h1 className="text-2xl">Battery cell client</h1>
    </div>
  );
};
export default App;

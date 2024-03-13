const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export async function fetchBatteryCells() {
  try {
    const response = await fetch(`${BASE_URL}/batterycell`);
    if (!response.ok) {
      throw new Error("Failed to fetchBatteryCells");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchBatteryCells:", error);
    throw error;
  }
}

export async function getBatteryCellById(id) {
  try {
    const response = await fetch(`${BASE_URL}/batterycell/${id}`);
    if (!response.ok) {
      throw new Error("Failed to getBatteryCellById");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in getBatteryCellById ${id}:`, error);
    throw error;
  }
}

export async function postBatteryCell(data) {
  try {
    const response = await fetch(`${BASE_URL}/batterycell`, {
      method: "POST",
      body: data,
    });
    if (!response.ok) {
      throw new Error("Failed to postBatteryCell");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in postBatteryCell:", error);
    throw error;
  }
}

export async function compute(data) {
  try {
    const response = await fetch(`${BASE_URL}/impedance`, {
      method: "POST",
      body: data,
    });
    if (!response.ok) {
      throw new Error("Failed to compute");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in compute:", error);
    throw error;
  }
}

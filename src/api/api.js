const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export async function fetchBatteryCells() {
  try {
    const response = await fetch(`${BASE_URL}/batterycell`);
    if (!response.ok) {
      throw new Error("Failed to fetch battery cells");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching battery cells:", error);
    throw error;
  }
}

export async function getBatteryCellById(id) {
  try {
    const response = await fetch(`${BASE_URL}/batterycell/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch battery cell");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching battery cell with ID ${id}:`, error);
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
      throw new Error("Failed to post battery cell");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting battery cell:", error);
    throw error;
  }
}

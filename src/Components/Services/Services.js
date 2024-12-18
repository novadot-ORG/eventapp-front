
export const loginUser = async (username, password) => {
    const base64Credentials = btoa(unescape(encodeURIComponent(username + ':' + password)));
    const authToken = `Basic ${base64Credentials}`;
  
    try {
      const response = await fetch("https://appevent-2d8g.onrender.com/login", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          "Authorization": authToken,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Error Response:", errorText);
        throw new Error("Login failed. Please try again.");
      }
  
      const token = await response.text(); 
      return token;
  
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const registerUser = async (username, password) => {
    try {
      const response = await fetch("https://appevent-2d8g.onrender.com/register", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register. Please try again.");
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      throw new Error(error.message); 
    }
  };


export const fetchParticipants = async (sessionValue, checkinStatusValue, token) => {
    const queryParams = new URLSearchParams();
    if (sessionValue !== "All") {
      queryParams.append("session", sessionValue);
    }
    if (checkinStatusValue !== "All") {
      queryParams.append(
        "checkedInFlag",
        checkinStatusValue === "Checked In" ? "true" : "false"
      );
    }
  
    try {
      const response = await fetch(
        `https://appevent-2d8g.onrender.com/participants/filter?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }
      
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  export const searchParticipants = async (searchTerm, token) => {
    const queryParams = new URLSearchParams({
      keyword: searchTerm,
    });
  
    try {
      const response = await fetch(
        `https://appevent-2d8g.onrender.com/participants/search?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }
  
      const data = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  };
  
  export const checkInParticipant = async (id, token) => {
    const url = `https://appevent-2d8g.onrender.com/participants/checkin/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData === true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred");
      }
    } catch (error) {
      throw error;
    }
  };
export const fetchPmParticipants = async () => {
    const token = localStorage.getItem("authToken");
    const url = `https://appevent-2d8g.onrender.com/participants/session/PM/checkedIn`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch PM participants data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching PM participants:", error);
      throw error;
    }
  };
  
  export const fetchAmParticipants = async () => {
    const token = localStorage.getItem("authToken");
    const url = `https://appevent-2d8g.onrender.com/participants/session/AM/checkedIn`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch AM participants data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching AM participants:", error);
      throw error;
    }
  };
  
  export const fetchThirdSessionAmParticipants = async () => {
    const token = localStorage.getItem("authToken");
    const url = `https://appevent-2d8g.onrender.com/participants/session/AM`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch third AM session participants data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching third AM session participants:", error);
      throw error;
    }
  };
  
  export const fetchThirdSessionPmParticipants = async () => {
    const token = localStorage.getItem("authToken");
    const url = `https://appevent-2d8g.onrender.com/participants/session/PM`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch third PM session participants data");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching third PM session participants:", error);
      throw error;
    }
  };
  
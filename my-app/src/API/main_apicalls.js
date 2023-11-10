import React from 'react';

export const getData = async () => {
    try {
      const response = await fetch(`https://api.quicksell.co/v1/internal/frontend-assignment`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error; 
    }
  };
  
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.table(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // ✅ call it
  }, []); // ✅ dependency array

  return <div></div>;
}

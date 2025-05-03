import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos de ejemplo para "Total Restaurants"
const data = [
  { name: "Restaurante A", value: 4000 },
  { name: "Restaurante B", value: 3000 },
  { name: "Restaurante C", value: 2000 },
  { name: "Restaurante D", value: 2780 },
  { name: "Restaurante E", value: 1890 },
];

export function TotalRestaurantsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

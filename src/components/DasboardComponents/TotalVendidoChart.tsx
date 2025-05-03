import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Datos de ejemplo para "Total Vendido (bs)"
const data = [
  { name: "Enero", value: 4000 },
  { name: "Febrero", value: 3000 },
  { name: "Marzo", value: 2000 },
  { name: "Abril", value: 2780 },
  { name: "Mayo", value: 1890 },
];

export function TotalVendidoChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

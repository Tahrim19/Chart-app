import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProductChart() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare data for chart
  const chartData = products.map(item => ({
    name: item.id,
    price: item.price,
  }));

  return (
    <>
      <div className='product'>
        <h3 className='product-heading'>PRODUCT PRICE BAR CHART</h3>
        <ResponsiveContainer width='95%' height={450}>
          <BarChart 
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Product ID", position: "bottom", offset: -5 }}  />
            <YAxis label={{ value: "Price", angle: -90, position: "insideLeft", offset: -10 }} />
            <Tooltip />
            <Bar dataKey="price" fill="#eca1ac" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

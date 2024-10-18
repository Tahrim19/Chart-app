import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

export default function CategoryChart() {
    const [chartData, setChartData] = useState([]); // Renamed to chartData
    
    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            categoryCount(response.data); 
        } catch (err) {
            console.log(err);
        }
    };

    // Count products in each category
    const categoryCount = (products) => {
        const count = {};
        products.forEach((product) => {
            if (count[product.category]) {
                count[product.category]++;
            } else {
                count[product.category] = 1; 
            }
        });

        // Prepare data for Pie Chart
        const chartData = Object.keys(count).map((category) => ({
            name: category,
            value: count[category],
        }));

        setChartData(chartData); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Define colors for the pie chart
    const COLORS = ['#f9cdd4', '#eca1ac', '#e27589', '#b25b6e', '#7c3042'];

    return (
        <>
            <div>
                <h3 className='product-heading'>PRODUCT CATEGORIES PIE CHART</h3>
                <ResponsiveContainer width='95%' height={450}>
                    <PieChart>
                        <Pie
                            data={chartData} 
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={200}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}


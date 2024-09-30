import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart( {budgetData} ) {

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if(chartInstance.current){
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(myChartRef, {
            type: 'pie',
            data: budgetData
        })
    });
    return (
        <>
            <canvas ref={chartRef} style={{width:"400px", height:"400px"}}/>
        </>
    );
}
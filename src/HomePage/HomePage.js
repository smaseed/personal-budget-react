import axios from 'axios';
import React, {useState, useRef} from 'react';
import PieChart from '../Charts/PieChart';
import * as d3 from "d3";

function HomePage() {
    const [data, setData] = useState([]);
    const svgRef = useRef(null); // Ref for the SVG element
    const width = 450; // Set your desired width
    const height = 450; // Set your desired height
    const margin = {top: 10, right: 30, bottom: 30, left: 40};
    const radius = Math.min(width, height) / 2 - margin.left;
    const chartRef = useRef(null);
    var d3Colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];


    const loadData =()=>{
        var budgetD = {
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#dd6c45',
                        '#cc4156',
                        '#564156'
                    ]
                }
            ],
            labels: []
        }
        if(budgetD.datasets[0].data.length === 0){
            axios.get('http://127.0.0.1:3030/budget')
            .then(res => {
                for (var i=0; i < res.data.myBudget.length; i++){
                    budgetD.datasets[0].data[i] = res.data.myBudget[i].budget;
                    budgetD.labels[i] = res.data.myBudget[i].title;
                }
                setData(budgetD);
                var budgetData = budgetD.labels.map((label, index) => ({
                    name: label,
                    value: budgetD.datasets[0].data[index].toString(), // Convert value to string
                    color: d3Colors[index]
                }));
                drawD3jsChart(budgetData);
            });
        }

    }
    React.useEffect(() => loadData(), []);

    function drawD3jsChart(data) {
        const svg = d3.select(svgRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(radius * 0.5) // Size of the donut hole
            .outerRadius(radius * 0.8);

        const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        const data_ready = pie(data);

        // Build the pie chart
        svg.selectAll("allSlices")
            .data(data_ready)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => d.data.color || d3Colors[d.index % d3Colors.length])
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);

        // Add the polylines between chart and labels
        svg.selectAll("allPolylines")
            .data(data_ready)
            .enter()
            .append("polyline")
            .attr("stroke", "black")
            .style("fill", "none")
            .attr("stroke-width", 1)
            .attr("points", d => {
                const posA = arc.centroid(d);
                const posB = outerArc.centroid(d);
                const posC = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC];
            });

        // Add the labels
        svg.selectAll("allLabels")
            .data(data_ready)
            .enter()
            .append("text")
            .text(d => d.data.name)
            .attr("transform", d => {
                const pos = outerArc.centroid(d);
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return `translate(${pos})`;
            })
            .style("text-anchor", d => {
                const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return midangle < Math.PI ? "start" : "end";
            });
    }

    // console.log(data);
    // console.log(d3Data);

    return (
        <main className="center" id="main">
        <section className="page-area">

            <article className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </article>

            <article className="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </article>

            <article className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </article>

            <article className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </article>

            <article className="text-box">
                <h1>D3JS Chart</h1>
                <svg ref={svgRef} width="100" height="100"></svg>
            </article>

            <article className="text-box">
                <h1>Chart</h1>
                <p>
                    <PieChart budgetData={data}/>
                </p>
            </article>

        </section>

        </main>
    );
}

export default HomePage;

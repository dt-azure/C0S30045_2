const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 1000 1200")
              .style("border", "1px solid black");

// svg.append("rect")
//    .attr("x", 10)
//    .attr("y", 10)
//    .attr("width", 414)
//    .attr("height", 16)
//    .attr("fill", "blue");


// d3.csv("./data/data.csv", d => {
//     return {
//         brand: d.brand,
//         screensize_category: d.screensize_category,
//         screen_technology: d.screen_technology,
//         "energy_consumption_kWh/year": +d["energy_consumption_kWh/year"],
//         star_rating: +d.star_rating
//     };
// }).then(data => {
//     console.log(data.sort((a, b) => a["energy_consumption_kWh/year"] - b[""]));
//     console.log(data.length);
//     console.log(d3.max(data, d => d["energy_consumption_kWh/year"]));
//     console.log(d3.min(data, d => d["energy_consumption_kWh/year"]));
//     console.log(d3.extent(data, d => d.star_rating));

//     createBarChart(data);
// });

d3.csv("./data/data2.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    data.sort((a, b) => b.count - a.count);
    createBarChart(data);
});

// const barHeight = 20;
// const spacing = 5;

const createBarChart = data => {
    const xScale = d3.scaleLinear()
                     .domain([0, 644])
                     .range([0, 850]);
    
    const yScale = d3.scaleBand()
                     .domain(data.map(d => d.brand))
                     .range([0, 1200])
                     .padding(0.2);

    // svg.selectAll("rect")
    //    .data(data)
    //    .join("rect")
    //    .attr("class", d => {
    //     return `bar bar-${d.count}`;
    //    })
    //    .attr("x", 100)
    //    .attr("y", (d, i) => yScale(d.brand))
    //    .attr("height", yScale.bandwidth())
    //    .attr("width", d => xScale(d.count))

    const barAndLabel = svg.selectAll("g")
                       .data(data)
                       .join("g")
                       .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel.append("rect")
               .attr("width", d => xScale(d.count))
               .attr("height", yScale.bandwidth())
               .attr("x", 100)
               .attr("y", 0)
               .attr("fill", "#73C8D2");

    barAndLabel.append("text")
               .text(d => d.brand)
               .attr("x", 96)
               .attr("y", yScale.bandwidth() / 2)
               .style("dominant-baseline", "middle")
               .attr("text-anchor", "end")
               .style("font-family", "sans-serif")
               .style("font-size", "8px")
               .attr("fill", "#836841");

    barAndLabel.append("text")
               .text(d => d.count)
               .attr("x", d => 100 + xScale(d.count) + 4)
               .attr("y", yScale.bandwidth() / 2)
               .style("dominant-baseline", "middle")
               .style("font-family", "sans-serif")
               .style("font-size", "8px")
               .attr("fill", "#836841");
};
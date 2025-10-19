const createScatterPlot = (data) => {
    const svg = d3.select("#scatter-plot")
                  .append("svg")
                  .attr("viewBox", `0 0 ${width} ${height}`);
    
    innerChartScatterPlot = svg.append("g")
                               .attr("transform", `translate(${margin.left}, ${margin.top})`);

    xScaleScatterPlot.domain([0, d3.max(data, d => d.star)])
                     .range([0, innerWidth]);

    yScaleScatterPlot.domain([0, d3.max(data, d => d.energyConsumption)])
                     .range([innerHeight, 0]);

    colorScale.domain(data.map(d => d.screenTech))
              .range(d3.schemeSet2);
    
    innerChartScatterPlot.selectAll("circle")
                         .data(data)
                         .join("circle")
                         .attr("cx", d => xScaleScatterPlot(d.star))
                         .attr("cy", d => yScaleScatterPlot(d.energyConsumption))
                         .attr("r", 6)
                         .attr("fill", d => colorScale(d.screenTech))
                         .attr("fill-opacity", 0.7);

    innerChartScatterPlot.append("g")
                         .attr("transform", `translate(0, ${innerHeight})`)
                         .call(d3.axisBottom(xScaleScatterPlot).ticks(15));

    innerChartScatterPlot.append("g")
                         .call(d3.axisLeft(yScaleScatterPlot));
                         
                         
    const screen_techs = [...new Set(data.map(d => d.screenTech))];
    
    const legend = svg.append("g")
                      .attr("transform", `translate(${width - margin.right - 120}, ${margin.top})`);

    legend.selectAll("rect")
           .data(screen_techs)
           .join("rect")
           .attr("x", 0)
           .attr("y", (d, i) => i * 19)
           .attr("width", 12)
           .attr("height", 12)
           .attr("fill", d => colorScale(d))
           .attr("stroke", "#333")
           .attr("stroke-width", 0.5);

    legend.selectAll("text")
        .data(screen_techs)
        .join("text")
        .attr("x", 22)
        .attr("y", (d, i) => i * 20 + 10)
        .text(d => d)
        .style("font-size", "14px")
        .style("font-family", "sans-serif")
        .attr("alignment-baseline", "middle");

    const tooltip = innerChartScatterPlot.append("g")
                                         .attr("class", "tooltip")
                                         .style("opacity", 0);

    tooltip.append("rect")
           .attr("width", tooltipWidth)
           .attr("height", tooltipHeight)
           .attr("rx", 3)
           .attr("ry", 3)
           .attr("fill", barColor)
           .attr("fill-opacity", 0.9);

    tooltip.append("text")
           .attr("class", "brand")
           .text("NA")
           .attr("x", 10)
           .attr("y", 20)
           .attr("text-anchor", "start")
           .attr("alignment-baseline", "start")
           .attr("fill", "white")
           .style("font-weight", 900)
           .style("font-size", "14px");

    tooltip.append("text")
           .attr("class", "model")
           .text("NA")
           .attr("x", 10)
           .attr("y", 45)
           .attr("text-anchor", "start")
           .attr("alignment-baseline", "start")
           .attr("fill", "white")
           .style("font-weight", 900)
           .style("font-size", "14px");

    tooltip.append("text")
           .attr("class", "screensize")
           .text("NA")
           .attr("x", 10)
           .attr("y", 70)
           .attr("text-anchor", "start")
           .attr("alignment-baseline", "start")
           .attr("fill", "white")
           .style("font-weight", 900)
           .style("font-size", "14px");
}
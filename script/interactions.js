const populateFilters = (data) => {
    d3.select("#filters_screen")
      .selectAll(".filter")
      .data(filters_screen)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (!d.isActive)
        {
            filters_screen.forEach(filter => {
                filter.isActive = d.id === filter.id ? true : false;
            });

            d3.selectAll("#filters_screen .filter")
              .classed("active", filter => filter.id === d.id ? true : false);
            
              updateHistogram(d.id, "screenTech", data);
        }
      });

      d3.select("#filters_screen_size")
      .selectAll(".filter")
      .data(filters_screen_size)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (!d.isActive)
        {
            filters_screen_size.forEach(filter => {
                filter.isActive = d.id === filter.id ? true : false;
            });

            d3.selectAll("#filters_screen_size .filter")
              .classed("active", filter => filter.id === d.id ? true : false);
            
              updateHistogram(d.id, "screenSize", data);
        }
      });

      const updateHistogram = (filterId, filterCategory, data) => {
        const updatedData = filterId === "all" ? data : data.filter(tv => tv[filterCategory] === filterId);

        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
          .data(updatedBins)
          .transition()
          .duration(500)
          .ease(d3.easeCubicInOut)
          .attr("y", d => yScale(d.length))
          .attr("height", d => innerHeight - yScale(d.length));
      }
}
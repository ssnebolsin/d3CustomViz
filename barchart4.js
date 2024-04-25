let dataArr = []

// let width = 700
// let height = 500
// const margin = {top: 20, right: 20, bottom: 100, left: 100}
// const graphWidth = width - margin.left - margin.right;
// const graphHeight = height - margin.top - margin.bottom;

let margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let svg = d3.select(".barchart3")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


d3.csv('MOCK_DATA2.csv', function(data) {

    const maxAmount = d3.max(data, d => d.Amount);
    const countries = data.map(d => d.Country);
    console.log(data)
    console.log(maxAmount)

    // let svg =  d3.select(".barchart3")
    // .append('svg')
    // .attr('width', width )
    // .attr('height', height )
    // // .attr('transform','translate(100,50)' )



    let x = d3.scaleLinear()
        .domain([0,maxAmount])
        .range([0,width]);

    const xAxis = svg.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    let y = d3.scaleBand()
        .domain(countries)
        .range([0, height])
        // .paddingInner(0.2)
        // .paddingOuter(0.2)

    const yAxis = svg.append("g")
        .call(d3.axisLeft(y));

    
    // const xAxisGroup = graph.append('g')
    //                         .attr('transform', `translate(0, ${graphHeight})`);
    // const yAxisGroup = graph.append('g');

    // const labels = svg.append('g')
    //     .attr('transform', `translate(${margin.left - 10}, ${margin.top})` )
    
    const graph = svg.append('g')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', `translate(${margin.left}, ${margin.top})` )

    graph.selectAll('rect')
             .data(data)              
             .enter()
             .append('rect')
             .attr('width',(d)=> x(d.Amount) ) 
             .attr('height', y.bandwidth)
             .attr('fill', 'steelblue')
             .attr('y', d=> y(d.Country))
             .on('mouseover', function(){
                d3.select(this).attr('fill', 'firebrick')
             })
             .on('mouseout', function(){
                d3.select(this).attr('fill', 'steelblue')
             })


    // yAxisGroup.selectAll('text')
    //     .attr('fill', 'steelblue' )
    //     .attr("font-family", "Tahoma")
    //     .attr("font-size", "16px")
    //     .attr('transform', 'translate(-10, 0)' )

    // labels.selectAll('text')
    //         .data(data)
    //         .enter()
    //         .append('text')
    //         .text(d => d.Amount)
    //         .attr('x',(d)=> xScale(d.Amount))
    //         .attr('y', d=> yScale(d.Country) + yScale.bandwidth()/2 )
    //         .attr('dy', '.35em')
    //         .attr('text-anchor', 'end')
    //         .attr('fill', 'white')
    //         .attr("font-family", "Tahoma")
    //         .attr("font-size", "15px");

    let zoom = d3.zoom()
            .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(zoom);

        

        function zoomed() {
                var t = d3.event.transform;
                var newX = d3.event.transform.rescaleX(x);
                xAxis.call(d3.axisBottom(newX))

                graph.attr("transform", t);
                
                yAxis.attr("transform", d3.zoomIdentity.translate(0, t.y).scale(t.k));
                yAxis.selectAll("text")
                  .attr("transform",d3.zoomIdentity.scale(1/t.k));
                yAxis.selectAll("line")
                  .attr("transform",d3.zoomIdentity.scale(1/t.k));
                
                graph
                  .selectAll("rect")
                  .attr('cx', function(d) {return newX(d.Amount)})

              }

    // function zoomed() {
    //             var t = d3.event.transform;
    //             // redefine the x0 domain range with the event transform scale (k)
    //             x0.range([0, width * t.k]);
              
    //             // transform .barGroup using redefined domain range and event transform params
    //             g.selectAll(".barGroup")
    //               .attr("transform", function(d) { return "translate(" + (x0(d.State) + t.x) + ",0)scale(" + t.k + ",1)"; });
              
    //             // apply transform to .axis--x and call xAxis
    //             g.select(".axis--x")
    //               .attr("transform", "translate(" + t.x + "," + (height) + ")")
    //               .call(xAxis);
    //           }

    // Create zoom behavior
    // const zoom = d3.zoom()
    //         .scaleExtent([0, 10]) // Set zoom scale range
    //         .on("zoom", zoomed);

    // Apply zoom behavior to SVG
    // graph.call(zoom);

    // function zoomed() {
    //     // Update x and y scales with zoom transformation
    //     const newXScale = d3.event.transform.rescaleX(xScale);
    //     // const newYScale = d3.event.transform.rescaleY(yScale);

    //     // Update bars with new scales
    //     graph.attr("transform", d3.event.transform)
    //         .attr("x", d => newXScale())
    //         // .attr("y", d => newYScale(d.Country))
    //         // .attr("width", newXScale.bandwidth())
    //         // .attr("height", d => 300 - newYScale(d.Amount));
    // }

    // function zoomed() {
    //     xScale.range([margin.left, width - margin.right].map(d => d3.event.transform.applyX(d)));
    //     svg.selectAll("rect")
    //         .attr("x", d => xScale(d.Amount))
    //         // .attr("y", yScale.bandwidth());
    //     // svg.selectAll(".x-axis").call(xAxis);
    //   }

  })


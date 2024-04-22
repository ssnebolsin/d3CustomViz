let dataArr = []

let width = 700
let height = 500
const margin = {top: 20, right: 20, bottom: 100, left: 100}
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;




d3.csv('MOCK_DATA2.csv')
  .then(function(data) {

    const maxAmount = d3.max(data, d => d.Amount);
    const countries = data.map(d => d.Country);
    console.log(data)
    console.log(maxAmount)

    let svg =  d3.select(".barchart3")
    .append('svg')
    .attr('width', width )
    .attr('height', height )
    // .attr('transform','translate(100,50)' )

    const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})` )

    let xScale = d3.scaleLinear()
        .domain([0,maxAmount])
        .range([0,graphWidth])

    let yScale = d3.scaleBand()
        .domain(countries)
        .range([0, graphHeight])
        .paddingInner(0.2)
        .paddingOuter(0.2)

    
    const xAxisGroup = graph.append('g')
                            .attr('transform', `translate(0, ${graphHeight})`);
    const yAxisGroup = graph.append('g');

    const labels = svg.append('g')
        .attr('transform', `translate(${margin.left - 10}, ${margin.top})` )


    graph.selectAll('rect')
             .data(data)              
             .enter()
             .append('rect')
             .attr('width',(d)=> xScale(d.Amount) ) 
             .attr('height', yScale.bandwidth)
             .attr('fill', 'steelblue')
             .attr('y', d=> yScale(d.Country))
             .on('mouseover', function(){
                d3.select(this).attr('fill', 'firebrick')
             })
             .on('mouseout', function(){
                d3.select(this).attr('fill', 'steelblue')
             })

    const xAxis = d3.axisBottom(xScale)
             .ticks(20)
     
    const yAxis = d3.axisLeft(yScale)
                .tickSize(0)

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    yAxisGroup.selectAll('text')
        .attr('fill', 'steelblue' )
        .attr("font-family", "Tahoma")
        .attr("font-size", "16px")
        .attr('transform', 'translate(-10, 0)' )

    labels.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text(d => d.Amount)
            .attr('x',(d)=> xScale(d.Amount))
            .attr('y', d=> yScale(d.Country) + yScale.bandwidth()/2 )
            .attr('dy', '.35em')
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .attr("font-family", "Tahoma")
            .attr("font-size", "15px");

  })
  .catch(function(error){
     console.log(error) 
  })



const bc = d3.select(".barchart")



const margin = {top: 70, right: 40, bottom: 60, left: 75}
const width = 700 - margin.left - margin.right
const height = 700 - margin.top - margin.bottom

const svg = bc.append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

const rect = svg.selectAll('rect')
let dataArr = []

d3.csv("MOCK_DATA2.csv", function(data) {
    console.log(data)
    dataArr.push(data)

      // Set the x and y scales
    const x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(dataArr, function (d) { return d.Amount; })]);

    const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(dataArr.map(function (d) { return d.Country; }));

      // Create the x and y axes
    const xAxis = d3.axisBottom(x)
    .ticks(5)
    .tickSize(0); // remove ticks

    const yAxis = d3.axisLeft(y)
    .tickSize(0)
    .tickPadding(10);
    
    rect.data(dataArr)
        .enter()
        .append('rect')
        .attr('width', function(d){return d.Amount * 3})
        .attr('fill', function(d){return d.Fill})
        .attr('height', function(d){return 20})
        .attr('x', 0)
        .attr('y', function(d){return 350 - (d.Amount*3)})

    // Add the x and y axes to the chart
    svg.append("g")
        .attr("class", "x axis")
        .style("font-size", "10px")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        // .call(g => g.select(".domain").remove());

    svg.append("g")
        .attr("class", "y axis")
        .style("font-size", "8px")
        .call(yAxis)
        .selectAll('path')
        .style('stroke-width', '1.75px');

    svg.selectAll(".y.axis .tick text")
        .text(function (d) {
            return d.toUpperCase();
        });
});
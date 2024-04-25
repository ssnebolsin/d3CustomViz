

let data = [
  {'value':0.08167, 'name': 'A'},
  {'value':0.01492, 'name': 'B'},
  {'value':0.02782, 'name': 'C'}
]

const svgId = 'zoomable-bar-chart'
const width = 800
const height = 500
const marginTop = 20
const marginRight = 0
const marginBottom = 30
const marginLeft = 40

const maxAmount = d3.max(data, d => d.value);
const countries = data.map(d => d.name);



// let width = 700
// let height = 500
// const margin = {top: 20, right: 20, bottom: 100, left: 100}
// const graphWidth = width - margin.left - margin.right;
// const graphHeight = height - margin.top - margin.bottom;

// let svg =  d3.select(".barchart3")
//     .append('svg')
//     .attr('width', width )
//     .attr('height', height )

// const graph = svg.append('g')
//     .attr('width', graphWidth)
//     .attr('height', graphHeight)
//     .attr('transform', `translate(${margin.left}, ${margin.top})` )

// let xScale = d3.scaleLinear()
//         .domain([0,maxAmount])
//         .range([0,graphWidth])

// let yScale = d3.scaleBand()
//         .domain(countries)
//         .range([0, graphHeight])
//         .paddingInner(0.2)
//         .paddingOuter(0.2)

// graph.selectAll('rect')
// .data(data)              
// .enter()
// .append('rect')
// .attr('width',(d)=> xScale(d.Amount) ) 
// .attr('height', yScale.bandwidth)
// .attr('fill', 'steelblue')
// .attr('y', d=> yScale(d.Country))
// .on('mouseover', function(){
//    d3.select(this).attr('fill', 'firebrick')
// })
// .on('mouseout', function(){
//    d3.select(this).attr('fill', 'steelblue')
// })

const x = d3.scaleBand()
.domain(data.map(d => d.name))
.range([marginLeft, width - marginRight])
.padding(0.1);

const y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.value)]).nice()
.range([height - marginBottom, marginTop]);

// const xAxis = g => g
// .attr('transform', `translate(0,${height - marginBottom})`)
// .call(d3.axisBottom(x).tickSizeOuter(0));

// const xAxis = d3.axisBottom()
// .ticks(20)
// .attr('transform', `translate(0,${height - marginBottom})`)

const xAxis = d3.axisBottom(x)
             .ticks(20)

const yAxis = d3.axisLeft(y)

// const yAxis = g => g
// .attr('transform', `translate(${marginLeft},0)`)
// .call(d3.axisLeft(y))
// .call(g => g.select('.domain').remove());

// const svg = d3.create('svg')
const svg =  d3.select(".barchart3")
.append('svg')
// .attr('id', svgId)
.attr('width', width)
.attr('height', height)
// .attr('viewBox', [0, 0, width, height]);

// svg.append('g')

svg.selectAll('rect')
.data(data)
.enter()
.append('rect')
// .join('rect')
.attr('class', 'bars')
.attr('fill', 'steelblue')
.attr('x', d => x(d.name))
.attr('y', d => y(d.value))
.attr('height', d => y(0) - y(d.value))
.attr('width', x.bandwidth());

// svg.append('g')
// .attr('class', 'x-axis')
// .call(xAxis);
const xAxisGroup = svg.append('g')
.attr('transform', `translate(0,${height - marginBottom})`)

const yAxisGroup = svg.append('g')
.attr('transform', `translate(${marginLeft},0)`)

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

// const zoomBehavior = zoom().on('zoom', (event)=>{
//   console.log(d3.event.transform);
// })

// svg.append('g')
// .attr('class', 'y-axis')
// .call(yAxis);

const zoom = d3.zoom()
.scaleExtent([
  [marginLeft, marginTop],
  [width - marginRight, height - marginTop]
]) // Set zoom scale range
.on("zoom", zoomed);

svg.call(zoom);  

// const zoom = svg => {
//   const extent = [
//     [marginLeft, marginTop],
//     [width - marginRight, height - marginTop]
//   ];

// function zoomed() {
//   x.range([marginLeft, width - marginRight].map(d => d3.event.transform.applyX(d)));
//   svg.selectAll('rect')
//   .attr('x', d => x(d.value))
//   .attr('width',  x.bandwidth() );
//   svg.selectAll('.x-axis').call(xAxis);
// }


// function zoomed() {
//   // Update x and y scales with zoom transformation
//   const newXScale = d3.event.transform.rescaleX(x);
//   const newYScale = d3.event.transform.rescaleY(y);

//   // Update bars with new scales
//   svg.selectAll(".bar")
//       .attr("x", d => newXScale(d.name))
//       .attr("y", d => newYScale(d.value))
//       .attr("width", newXScale.bandwidth())
//       .attr("height", d => 300 - newYScale(d.value));
// }

function zoomed() {
  // Get current transform
  const transform = d3.event.transform;

  // Apply transform to bars
  svg.attr("transform", transform);
}

  // const zoomed = event => {
  //   x.range([marginLeft, width - marginRight].map(d => event.transform.applyX(d)));
  //   svg.selectAll('.bars rect').attr('x', d => x(d.name)).attr('width', x.bandwidth());
  //   svg.selectAll('.x-axis').call(xAxis);
  // }

//   svg.call(d3.zoom()
//     .scaleExtent([1, 8])
//     .translateExtent(extent)
//     .extent(extent)
//     .on('zoom', zoomed));
// }
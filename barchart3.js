let dataArr = [20, 12, 24, 68, 98, 34]
let names = ['Liverpool', 'Mancity', 'Juve', 'Real', 'Bayern', 'Porto']

let width = 500
let height = 500

let xScale = d3.scaleLinear()
                .domain([0,d3.max(dataArr)])
                .range([0,width])

let yScale = d3.scaleBand()
                .domain(names)
                // .domain(names.map(function(d) { return d.x; }))
                .range([0,310])
             

let xAxis = d3.axisBottom(xScale)
                .ticks(5)


let yAxis = d3.axisLeft(yScale)

let svg =  d3.select(".barchart3")
             .append('svg')
             .attr('width', width )
             .attr('height', height )
             .attr('transform','translate(100,50)' )

let bars = svg.selectAll('rect')
                .data(dataArr)              
                .enter()
                .append('rect')
                .attr('width',(d)=> xScale(d) ) 
                .attr('height', 50)
                .attr('fill', 'steelblue')
                .attr('y', (d,i)=> i*52 )
                .attr('transform','translate(70,0)' )

svg.append('g')
.attr('transform', `translate(70, 330)`)
.call(xAxis);

// svg.append('g')
// .attr('transform',`translate(40,0)` )
// .call(yAxis)

names.forEach((item, i) =>{
    svg.append('text')
        .attr('fill', 'black' )
        .attr('y', i*52+28 )
        .text(item)
        .attr('transform', `translate(0, 0)`)
}
)

dataArr.forEach((d, i) =>{
    svg.append('text')
        .attr('x',xScale(d))
        .attr('fill', 'white' )
        .attr('y', i*52+28 )
        .attr('text-anchor', 'end')
        .text(d)
        .attr('transform', `translate(0, 0)`)
}
)

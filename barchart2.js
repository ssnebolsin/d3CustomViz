const data = [233,455,256, 221, 192, 123, 733, 832]
const dataNames = ["233","455","256", "221", "192", "123", "733", "832"]

const svgWidth = 800
const barHeight = 20
const barMargin = 1;
const svgHeight = (barHeight + barMargin) * data.length;

const svg = d3.select(".barchart").append("svg")
                .attr('width', svgWidth)
                .attr('height', svgHeight + 30)

const xScale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([50, svgWidth - 10])

const yScale = d3.scaleOrdinal()
                .domain(dataNames)
                .range([0,60,180,240,300,360,420,480]);
                // .paddingInner(0.05);

data.forEach((d,i)=>{
    const group = svg.append('g')
                    .attr('transform',`translate(50, ${i * (barHeight + barMargin)})`)
    group.append('rect')
        .attr('width',0)
        .attr('height', barHeight - barMargin)
        .attr('fill', 'steelblue')
        .transition()
        .duration(100)
        .attr('width', xScale(d)-50);

    group.append('text')
            .attr('x',xScale(d) - 50)
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .attr("font-family", "Tahoma")
            .attr("font-size", "12px")
            .text(d);

    group.on('mouseover', function(){
        d3.select(this).select('rect').attr('fill', 'firebrick')
    })
    .on('mouseout', function(){
        d3.select(this).select('rect').attr('fill', 'steelblue')
    })
})  

const xAxis = d3.axisBottom(xScale).ticks(5);
const yAxis = d3.axisLeft(yScale);

svg.append('g')
    .attr('transform', `translate(0, ${svgHeight})`)
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .attr('tranform', 'translate(100,0)')
    .call(yAxis);



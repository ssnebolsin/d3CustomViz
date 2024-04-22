

// let df = ()=>{
//     let dfArr = []
//     d3.csv("MOCK_DATA.csv", data => dfArr.push(data))
//     console.log('test')
//     console.log(dfArr)
//     return dfArr
// }

// d3.csv("MOCK_DATA.csv").get(function(error, data){
//     console.log(data)
// })



const canvas = d3.select(".canvas")
// const svg = canvas.select('svg')


// let dataArray = [
//     {'height': 12, 'width': 10, 'fill': 'blue'},
//     {'height': 13, 'width': 10, 'fill': 'grey'},
//     {'height': 14, 'width': 10, 'fill': 'purple'},
//     {'height': 2, 'width': 10, 'fill': 'orange'},
//     {'height': 22, 'width': 10, 'fill': 'green'},
//     {'height': 17, 'width': 10, 'fill': 'pink'}
// ]

const svg = canvas.append('svg')
            .attr('width', 1100)
            .attr('height', 900);

const rect = svg.selectAll('rect')

let dataArr = []

d3.csv("MOCK_DATA.csv", function(data) {
    console.log(data)
    dataArr.push(data)
    
    rect.data(dataArr)
        .enter()
        .append('rect')
        .attr('width', 20 )
        .attr('fill', function(d){
            return d.Fill;
        })
        .attr('height', function(d){
            return d.Amount*2;
        } )
        .attr('x', function(d,i){
            return i*20;
        } )
        .attr('y', function(d){
            return 250 - (d.Amount*2);
        } )
});




//       // create a tooltip
//   var Tooltip = canvas
//   .append("div")
//   .style("opacity", 0)
//   .attr("class", "tooltip")
//   .style("background-color", "white")   
//   .style("border", "solid")
//   .style("border-width", "2px")
//   .style("border-radius", "5px")
//   .style("padding", "5px")

//    // Three function that change the tooltip when user hover / move / leave a cell
//    var mouseover = function(d) {
//     Tooltip
//       .style("opacity", 1)
//     d3.select(this)
//       .style("stroke", "black")
//       .style("opacity", 1)
//   }
//   var mousemove = function(d) {
//     Tooltip
//       .html("The exact value of<br>this cell is: " + d.value)
//       .style("left", (d3.mouse(this)[0]+70) + "px")
//       .style("top", (d3.mouse(this)[1]) + "px")
//   }
//   var mouseleave = function(d) {
//     Tooltip
//       .style("opacity", 0)
//     d3.select(this)
//       .style("stroke", "none")
//       .style("opacity", 0.8)
//   }

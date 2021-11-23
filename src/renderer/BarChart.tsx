export default function BarChart(){
    return (
      <div>
        Hello prga Component Called
      </div>
    )
  }
  
// import * as d3 from 'd3';
// import { useRef } from 'react';

// function BarChart(){

//     const data = [60, 30, 40, 20, 30]
//     //const width = 500;
//     const height = 500;
//     const ref = useRef();

     
//     const svg = d3.select(ref.current);
//     var selection = svg.selectAll("rect").data(data);
//     var yScale = d3.scaleLinear()
//                         .domain([0, d3.max(data)])
//                         .range([0, height-100]);
    
//     selection
//         .transition().duration(300)
//             .attr("height", (d) => yScale(d))
//             .attr("y", (d) => height - yScale(d))

//     selection
//         .enter()
//         .append("rect")
//         .attr("x", (d, i) => i * 45)
//         .attr("y", (d) => height)
//         .attr("width", 40)
//         .attr("height", 0)
//         .attr("fill", "orange")
//         .transition().duration(300)
//             .attr("height", (d) => yScale(d))
//             .attr("y", (d) => height - yScale(d))
    
//     selection
//         .exit()
//         .transition().duration(300)
//             .attr("y", (d) => height)
//             .attr("height", 0)
//         .remove()

//     // useEffect(() => {
//     //     const svg = d3.select(ref.current)
//     //         .attr("width", width)
//     //         .attr("height", height)
//     //         .style("border", "1px solid black")
//     // }, []);

//     // useEffect(() => {
//     //     draw();
//     // }, [data]);

//     // const draw = () => {
       
//     // }


//     return (
//         <div className="chart">
//             <svg ref={ref}>
//             </svg>
//         </div>
        
//     )

// }

// export default BarChart;
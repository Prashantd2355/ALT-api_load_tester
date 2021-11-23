import { useEffect } from 'react';
import * as d3 from 'd3';

// const dataset = [60, 30, 40, 20, 30]

// var i = 0;

export default function graph(){

//  const [data, setData] = useState([]);

//  const height = 500;
//  const width = 500;

    useEffect(() => {
      
      d3.select("#chart")
      .append("svg")
      .attr("width", 400)
      .attr("height", 600)
      .style("border", "1px solid black")

      // const svg = d3.select("#chart svg");

    }, []);

    

    return (
        <div className="App">
            <h2>Graphs with React</h2>
            <div id="chart">
            </div>
        </div>
    );

}

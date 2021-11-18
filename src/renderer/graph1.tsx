import { useRef } from 'react';
// import * as d3 from 'd3';
import data from './data';


export default function graph(){
  const dataLocal:any = data();
  const d3LineChart = useRef(null)
  let string = '';
  dataLocal.forEach((d:any)=>{
    string = string+ Object.values(d).join(',')+',';
  })
  console.log(string);
  // const svg = d3.select('.basicLineChart').append('svg').attr('width', '300px').attr('height', '200px').append('g')
  // d3.dsv(',', data.map)
    return (
      <>
      <div ref={d3LineChart}>
        hello
      </div>
      </>
    )
}
  
  
import { Bar, Line, Pie } from 'react-chartjs-2';
import React from 'react';
import { AppContext } from 'renderer/context';
//import moment from 'moment';

export default function graph() {

  const { state } = React.useContext(AppContext);

  let arrayResult = state.responseData;

  console.log(arrayResult);
  let noOfRequests = 0;
  let noOfSuccessRequests = 0;
  let noOfErrors = 0;
  let apiNumers = 0;

  let lbl: any[] = [];
  let dtst: any[] = [];
  let lblRes: any[] = [];
  let dtstRes: any[] = [];
  let dtstLat: any[] = [];

  let colorArr: any[] = [];
  let testDuration = 0;
  let TestDurArr: any[] = [];
  colorArr = ['#07c99c', '#F93c6b','yellow'];
  let stn: { [k: string]: any } = {};

  Object.keys(arrayResult).forEach((key) => {

    noOfRequests += arrayResult[key].length;
    lbl.push(['API '+apiNumers]);
    let staTable: { [k:  string]: any } = {};
    let timeAPIWise: any[] = [];
    let latencyAPIWise: any[] = [];
    let count = 0;
    
    Object.keys(arrayResult[key]).forEach((childKey) => {

      let startAtSec = arrayResult[key][childKey]['startAt'];
      let endAtSec = arrayResult[key][childKey]['endAt'];
      let statusCode = arrayResult[key][childKey]['statusCode'];
      let diff = (endAtSec[1] - startAtSec[1]);
      diff  = Math.abs(diff / 1000000);

      console.log(endAtSec[1]+"--"+startAtSec[1]+"     "+(endAtSec[1] - startAtSec[1]));
      TestDurArr.push(diff);
      timeAPIWise.push(diff);

      let ttfbAtSec = arrayResult[key][childKey]['firstByteAt'];
      let lateDiff = (ttfbAtSec[1] - startAtSec[1]);
      lateDiff  = Math.abs(lateDiff / 1000000);

      latencyAPIWise.push(lateDiff);

      // let startAtMiliSec = startAtSec[0] * 1000 + startAtSec[1] / 1000000 ;
      // let endAtMiliSec = endAtSec[0] * 1000 + endAtSec[1] / 1000000 ;
      // console.log(startAtMiliSec - endAtMiliSec);
      // Time in millisecond...
      // console.log("Time in millisecond is: ", startAtSec[0] * 1000 + startAtSec[1] / 1000000)
      // console.log("=========================="+moment(endAtMiliSec));
      // console.log("=========================="+moment(startAtMiliSec));
      // console.log("=========================="+moment(endAtMiliSec).diff(startAtMiliSec));
      //Page Load Time (seconds)
      //console.log(moment(startAtSec[1]/1000000).format('HH:mm:ss.SSSSSSSSS') );
      //https://constellix.com/news/guide-to-site-performance-domain-latency
      //https://jmeter.apache.org/usermanual/glossary.html
      
      if(statusCode != 200){
        noOfErrors++;
      }else{
        noOfSuccessRequests++;
      }

      if(staTable[statusCode]){
        staTable[statusCode]++;
      }else{
        staTable[statusCode] = 1;
      }
      lblRes.push(count);
      count++;
    });

    Object.keys(staTable).forEach((arkey) => {
      if(typeof(stn[arkey]) != "undefined" ){
        stn[arkey].push(staTable[arkey]) ;
      }else{
        stn[arkey] = [staTable[arkey]];
      }
    });

    let j = apiNumers;
    if(j >3){
      j = 0;
    }
    
    let e = {label: 'API '+apiNumers,data: timeAPIWise,borderColor: colorArr[j],fill: false,borderWidth: 1};
    dtstRes.push(e);
    let f = {label: 'API '+apiNumers,data: latencyAPIWise,borderColor: colorArr[j],fill: false,borderWidth: 1};
    dtstLat.push(f);
    apiNumers++;

  });
  
  var unique = TestDurArr.filter((v, i, a) => a.indexOf(v) === i);
  testDuration = Math.round(Math.max(...unique));

  let i = 0;
  Object.keys(stn).forEach((arkey) => {
    if(i >3){
      i = 0;
    }
    let d = {label: 'status '+arkey, data: stn[arkey], fill: false, tension: 0.1, backgroundColor: colorArr[i], barThickness :20, spanGaps : 2};
    dtst.push(d);
    i++;
  });
    
  let responseCodesData =  {
		labels: lbl,
		datasets: dtst
	};

  console.log(lblRes);
  lblRes = lblRes.filter((v, i, a) => a.indexOf(v) === i);
  console.log(lblRes);
  let resTimeData = {labels: lblRes, datasets: dtstRes};
  let lateData = {labels: lblRes, datasets: dtstLat};

	const reqSum = {
		labels: [ 'Success Requests', 'Failed Requests' ],
		datasets: [
			{
				label: 'Requests Summary',
				backgroundColor: [ '#07c99c', '#F93c6b' ],
				hoverBackgroundColor: [ '#07c99c', '#F93c6b' ],
				data: [ noOfSuccessRequests, noOfErrors ]
			}
		],
    options: {
      title: {
        display: true,
        text: 'Requests Summary'
      }
    }
	};

  return (
    <div>
      <div className="row mb-4" style={{ padding: 'inherit' }}>
        <div className="col-md-4">
          <div className="card">
            <div
              className="card-header text-center"
              style={{
                background: 'transparent',
                fontSize: '25px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              Number Of Requests
            </div>
            <div className="card-body text-center">
              <span
                className="text-purple"
                style={{ fontSize: '50px', fontWeight: 400 }}
              >
                {noOfRequests}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div
              className="card-header text-center"
              style={{
                background: 'transparent',
                fontSize: '25px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              Number Of Errors
            </div>
            <div className="card-body text-center">
              <span
                className="text-danger"
                style={{ fontSize: '50px', fontWeight: 400 }}
              >
                {noOfErrors}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div
              className="card-header text-center"
              style={{
                background: 'transparent',
                fontSize: '25px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              Test Duration
            </div>
            <div className="card-body text-center">
              <span
                className="text-local-primary"
                style={{ fontSize: '50px', fontWeight: 400 }}
              >
                {testDuration} ms
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4" style={{ padding: 'inherit' }}>
        <div className="col-md-4">
          <div className="card">
            <div
              className="card-header text-center"
              style={{
                background: 'transparent',
                fontSize: '25px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              Requests Summary
            </div>
            <div className="card-body">
              <Pie data={reqSum} />
            </div>
          </div>
        </div>
        <div className="col-md-8" style={{ height: 'auto' }}>
          <div className="card">
            <div
              className="card-header text-center"
              style={{
                background: 'transparent',
                fontSize: '25px',
                fontWeight: 500,
                border: 'none',
              }}
            >
              Latency Comparison
            </div>
            <div className="card-body">
              <Line data={lateData} 
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Latency Comparison',
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
              }}/>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ padding: 'inherit' }}>
        <div className="col-md-6 card m-2" style={{ height: 'auto' }}>
          <div
            className="card-header text-center"
            style={{
              background: 'transparent',
              fontSize: '25px',
              fontWeight: 500,
              border: 'none',
            }}
          >
            Response time Comparison
          </div>
          <div className="card-body">
            <Line data={resTimeData} 
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Response time Comparison',
                },
                legend: {
                  display: true,
                  position: 'bottom',
                },
              },
            }}
            />
          </div>
        </div>
        <div className="col-md-6 card m-2" style={{ height: 'auto' }}>
          <div
            className="card-header text-center"
            style={{
              background: 'transparent',
              fontSize: '25px',
              fontWeight: 500,
              border: 'none',
            }}
          >
            Response codes per requests
          </div>
          <div className="card-body">
            <Bar
              data={responseCodesData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Response codes per requests',
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
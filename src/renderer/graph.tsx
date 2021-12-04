import { Bar, Line, Pie } from 'react-chartjs-2';
import React from 'react';
import { AppContext } from 'renderer/context';

export default function graph() {

  function msToTime(s :any) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }

  const { state } = React.useContext(AppContext);

  let arrayResult = state.responseData;
  console.log(arrayResult);
  let noOfRequests = 0;
  let noOfSuccessRequests = 0;
  let noOfErrors = 0;
  let apiNumers = 0;

  let lbl: any[] = [];
  let dtst: any[] = [];
  let statusAPIWise: any[] = [];

  let colorArr: any[] = [];
  let testDuration = 0;
  let TestDurArr: any[] = [];
  colorArr = ['#07c99c', '#F93c6b','yellow'];

  let stn: { [k: string]: any } = {};

  Object.keys(arrayResult).forEach((key) => {

    noOfRequests += arrayResult[key].length;
    lbl.push(['API '+apiNumers]);
    let staTable: { [k:  string]: any } = {};
    
    Object.keys(arrayResult[key]).forEach((childKey) => {

      let startAtSec = arrayResult[key][childKey]['startAt'];
      let endAtSec = arrayResult[key][childKey]['endAt'];
      //let hrmmss = new Date(startAtSec[0] * 1000).toISOString().substr(11, 8);
      let diff = endAtSec[1] - startAtSec[1];
      let startHrmmss = msToTime(startAtSec[1]);
      let endHrmmss = msToTime(endAtSec[1]);
      let diffms = msToTime(diff);
      console.log(startHrmmss+":"+endHrmmss+": "+diffms);

      TestDurArr.push(diff /1000000);

      
      //testDuration = testDuration + (diff % 1000);

      // let start = new Date();
      // let hrstart = startAt[0];

      // //let end = new Date() - start;
      // let hrend = process.hrtime(hrstart)

      // //console.log('Execution time: %dms', end)
      // console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000, start)

      let statusCode = arrayResult[key][childKey]['statusCode'];
      //let name = apiNumers+"-"+statusCode;
      //console.log();

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

    });

    Object.keys(staTable).forEach((arkey) => {
      if(typeof(stn[arkey]) != "undefined" ){
        stn[arkey].push(staTable[arkey]) ;
      }else{
        stn[arkey] = [staTable[arkey]];
      }
    });

    apiNumers++;

  });
  
  var unique = TestDurArr.filter((v, i, a) => a.indexOf(v) === i);
  testDuration = Math.max(...unique);

  let i = 0;
    Object.keys(stn).forEach((arkey) => {
      console.log(arkey);
      console.log(stn[arkey]);
      statusAPIWise.push(stn[arkey]);
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
  console.log(responseCodesData);

	const reqSum = {
		labels: [ 'Success Requests', 'Failed Requests' ],
		datasets: [
			{
				label: 'Requests Summary',
				backgroundColor: [ '#07c99c', '#F93c6b' ],
				hoverBackgroundColor: [ '#07c99c', '#F93c6b' ],
				data: [ noOfSuccessRequests, noOfErrors ]
			}
		]
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
              <Line
                data={{
                  labels: ['2:00:00', '2:00:30', '2:01:00', '2:01:30'],
                  datasets: [
                    {
                      label: 'API A',
                      data: [5, 6, 7],
                      borderColor: 'rgb(75, 192, 192)',
                      fill: false,
                      borderWidth: 1,
                    },
                    {
                      label: 'API B',
                      data: [3, 2, 1],
                      borderColor: '#dc3545',
                      fill: false,
                      borderWidth: 1,
                    },
                  ],
                }}
              />
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
            <Line
              data={{
                labels: ['2:00:00', '2:00:30', '2:01:00', '2:01:30'],
                datasets: [
                  {
                    label: '',
                    data: [5, 6, 7],
                  },
                  {
                    label: '',
                    data: [3, 2, 1],
                  },
                ],
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
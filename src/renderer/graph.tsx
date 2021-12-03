import { Bar, Line, Pie } from 'react-chartjs-2';

export default function graph() {
	
	const data = {
		labels: [[ 'API A' ],[ 'API B' ], [ 'API C' ]],
		datasets: [
			{
				label: 'status 200',
				data:  [ 9000, 7000, 7500 ],
				fill: false,
				tension: 0.1,
				backgroundColor: '#F93c6b',
				barThickness :20,
				spanGaps : 2
			},
      		{
				label: 'status 504',
				data: [ 400, 1000, 100 ],
				fill: false,
				backgroundColor: '#07c99c',
				barThickness :20,
				tension: 0.1,
				spanGaps : 2
			},
			{
				label: 'status 503',
				data: [ 400, 1900, 2300 ],
				fill: false,
				backgroundColor: 'yellow',
				barThickness :20,
				tension: 0.1,
				spanGaps : 2
			}
		]
	};

	const reqSum = {
		labels: [ 'Success Requests', 'Failed Requests' ],
		datasets: [
			{
				label: 'Requests Summary',
				backgroundColor: [ '#07c99c', '#F93c6b' ],
				hoverBackgroundColor: [ '#07c99c', '#F93c6b' ],
				data: [ 850, 150 ]
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
                850
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
                150
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
                221 ms
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
              data={data}
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
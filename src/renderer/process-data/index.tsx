import Table from './Table';
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import { useState } from 'react';
export default function Process({ isBulk = false}: any) {
  const data: any[] = []; //[{url:"https://www.6164482fb55edc00175c1e7c.mockapi.io/user",method:"GET",headers:"{}",body:"{}"}]
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('');
  const [body,setBody] = useState('');
  const [header, setHeader] = useState('');
  const [request, setRequest] = useState();
  const columns = [
    {
      Header: 'URL',
      accessor: 'url',
    },
    {
      Header: 'Method',
      accessor: 'method',
    },
    {
      Header: 'Headers',
      accessor: 'headers',
    },
    {
      Header: 'Body',
      accessor: 'body',
    },
  ];
  return (
    // <button onClick={()=>{
    //   window.electronAPI.processData();
    // }}> click me</button>]
    <>
      {isBulk ? (
        // if its not bulk then show input boxes
        <div>
          <h1>Its Bulk </h1>
        </div>
      ) : (

        <div className="row">
          <div className="col-md-2">
            <InputGroup>
              <FormControl
                value={url}
                onChange={(e:any)=>{setUrl(e.target.value)}}
                placeholder="Enter URL"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </div>
          <div className="col-md-2">
            <Form.Select value={method} onChange={(e:any)=>{setMethod(e.target.value)}}>
              <option>Select Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Control
              value={header}
              onChange={(e:any)=>{setHeader(e.target.value)}}
              as="textarea"
              placeholder="Headers"
              style={{ height: '20px' }}
            />
          </div>
          <div className="col-md-3">
            <Form.Control
              value={body}
              onChange={(e:any)=>{setBody(e.target.value)}}
              as="textarea"
              placeholder="Body"
              style={{ height: '20px' }}
              />
          </div>
          <div className="col-md-1">
            <InputGroup>
              <FormControl
                value={request}
                onChange={(e:any)=>{setRequest(e.target.value)}}
                placeholder="Request"
                type="number"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                window.electronAPI.send('process-data', {isBulk:false, url, method, body, header, request});
              }}
            >
              Test
            </button>
          </div>
        </div>
      )}
      <Table columns={columns} data={data} />
    </>
  );
}

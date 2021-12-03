// eslint-disable @typescript-eslint/no-explicit-any
import { InputGroup, FormControl, Form } from 'react-bootstrap';
import React, { useState, useMemo } from 'react';
import { AppContext } from 'renderer/context';
import Table from './Table';

export default function Process({ isBulk = true }: any) {
  const { state, dispatch } = React.useContext(AppContext);
  const [responseData, setResponseData] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('');
  const [body, setBody] = useState('{}');
  const [header, setHeader] = useState('{}');
  const [requests, setRequest] = useState(0);
  const [columns, setColumns] = useState<any[]>([]);

  const processUrl = async () => {
    let results;
    if (isBulk) {
      results = await window.electronAPI.processData(isBulk, state.data);
    } else {
      results = await window.electronAPI.processData(isBulk, [
        {
          url,
          method,
          body,
          header,
          requests,
        },
      ]);
      const newColumns: any[] = [];
      Object.keys(results[0][0]).forEach((key) => {
        newColumns.push({
          Header: key.toUpperCase(),
          accessor: key,
        });
      });
      setColumns(newColumns);
    }
    const newResult = results.map((r: any) => {
      r.body = 'body';
      return r;
    });
    setResponseData(newResult);
    dispatch({
      type: 'appendResponse',
      payload: results,
    });
    console.log('State:', state);
  };
  useMemo(() => {
    if (state.data.length) {
      const newColumn = Object.keys(state.data[0]).map((key) => {
        return {
          Header: key.toUpperCase(),
          accessor: key,
        };
      });
      setResponseData(state.data);
      setColumns(newColumn);
    }
  }, [state.data]);

  return (
    <div
      className="d-flex"
      style={
        isBulk
          ? { flexDirection: 'column-reverse' }
          : { flexDirection: 'column' }
      }
    >
      {isBulk ? (
        // if its not bulk then show input boxes
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={processUrl}
            style={{ float: 'right', position: 'relative' }}
          >
            Test
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-2">
            <InputGroup>
              <FormControl
                value={url}
                onChange={(e: any) => {
                  setUrl(e.target.value);
                }}
                placeholder="Enter URL"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </div>
          <div className="col-md-2">
            <Form.Select
              value={method}
              onChange={(e: any) => {
                setMethod(e.target.value);
              }}
            >
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
              onChange={(e: any) => {
                setHeader(e.target.value);
              }}
              as="textarea"
              placeholder="Headers"
              style={{ height: '20px' }}
            />
          </div>
          <div className="col-md-3">
            <Form.Control
              value={body}
              onChange={(e: any) => {
                setBody(e.target.value);
              }}
              as="textarea"
              placeholder="Body"
              style={{ height: '20px' }}
            />
          </div>
          <div className="col-md-1">
            <InputGroup>
              <FormControl
                value={requests}
                onChange={(e: any) => {
                  setRequest(e.target.value);
                }}
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
              onClick={processUrl}
            >
              Test
            </button>
          </div>
        </div>
      )}
      {responseData.length === 0 && state.data.length === 0 ? (
        ''
      ) : (
        <Table columns={columns} data={responseData} />
      )}
    </div>
  );
}

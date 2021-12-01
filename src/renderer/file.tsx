/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function File() {
  // method to validate URLs
  function isValidURL(url: string) {
    const res = url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  // method to validate if the input header/body are valid json
  function isValidJSON(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length); // convert s to arrayBuffer
    const view = new Uint8Array(buf); // create uint8array as viewer
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; // convert to octet
    return buf;
  }

  function generateExcelFile() {
    const wb = XLSX.utils.book_new();
    wb.Props = {
      Title: 'ALT Excel File',
      Subject: 'Sample Excel File for ALT',
      Author: 'ALT-Group-UEL',
    };
    wb.SheetNames.push('Sheet');

    const wsData = [['URL', 'METHOD', 'HEADERS', 'BODY']]; // a row with 4 columns

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    wb.Sheets.Sheet = ws;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'ALT.xlsx'
    );
  }

  // generates and downloads JSON files
  function generateJSONFile() {
    const apiJSONFormat = [
      {
        URL: 'https://www.example.com/getUsers/',
        METHOD: 'GET',
        HEADERS: '{}',
        BODY: '{}',
      },
      {
        URL: 'https://www.example.com/createUsers/',
        METHOD: 'POST',
        HEADERS: '{}',
        BODY: '{}',
      },
    ];
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(apiJSONFormat)
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'ALT.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function handleChange(files: any) {
    const methodList = ['GET', 'POST', 'PUT', 'DELETE'];
    console.log('files :', files);
    if (files[0].type === 'application/json') {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const data: string | undefined = reader.result?.toString();
        /// let arr: object[];
        let mainArr: unknown[] = [];

        if (data !== undefined) {
          mainArr = JSON.parse(data);
        }

        // /// /

        // // eslint-disable-next-line no-restricted-syntax
        // for (const [index, val] of arr.entries()) {
        //   debugger;

        //   console.log('item:', { index, val });

        //   try {
        //     const url = val.URL;
        //     const method = val.METHOD;
        //     const header = val.HEADERS;
        //     const body = val.BODY;

        //     const idx = arr.indexOf(val);

        //     if (idx !== -1) arr.splice(idx, 1);
        //     // validate URL
        //     if (!isValidURL(url)) {
        //       // eslint-disable-next-line no-alert
        //       alert(`URL not valid: ${url}`);
        //     }

        //     // validate method name
        //     if (!methodList.includes(method)) {
        //       // eslint-disable-next-line no-alert
        //       alert(`Method name not valid: ${method}`);
        //     }

        //     // validate header
        //     if (!isValidJSON(header)) {
        //       // eslint-disable-next-line no-alert
        //       alert(`Header not valid: ${header}`);
        //     }

        //     // validate body
        //     if (!isValidJSON(body)) {
        //       // eslint-disable-next-line no-alert
        //       alert(`Body name not valid: ${body}`);
        //     }
        //   } catch (e) {
        //     console.log((e as Error).message);
        //   }

        //   if (index === 1) {
        //     console.log('break!');
        //     break;
        //   }
        // }

        /// /

        // console.log('Arr', arr);
        // loop each record
        mainArr.forEach((eachElement: any) => {
          debugger;
          const url = eachElement.URL;
          const method = eachElement.METHOD;
          const header = eachElement.HEADERS;
          const body = eachElement.BODY;

          const arr: unknown[] = mainArr;

          // validate URL
          if (!isValidURL(url)) {
            const idx = arr.indexOf(eachElement);

            if (idx !== -1) arr.splice(idx, 1);
            alert(`URL not valid: ${url}`);
          }

          // validate method name
          if (!methodList.includes(method)) {
            const idx = arr.indexOf(eachElement);

            if (idx !== -1) arr.splice(idx, 1);
            alert(`Method name not valid: ${method}`);
          }

          // validate header
          if (!isValidJSON(header)) {
            const idx = arr.indexOf(eachElement);

            if (idx !== -1) arr.splice(idx, 1);
            alert(`Header not valid: ${header}`);
          }

          // validate body
          if (!isValidJSON(body)) {
            const idx = arr.indexOf(eachElement);

            if (idx !== -1) arr.splice(idx, 1);
            alert(`Body name not valid: ${body}`);
          }
        });
      });
      reader.readAsText(files[0]);
    }
  }
  return (
    <div>
      <div className="row" style={{ padding: 'inherit' }}>
        <div className="col-md-4">
          <div className="">
            <button
              type="button"
              onClick={generateExcelFile}
              className="btn btn-default btn-lg m-5"
              style={{
                background: 'transparent',
                fontSize: '25px',
                border: '1px solid gray',
                borderColor: 'gray',
              }}
            >
              <span className="glyphicon glyphicon-star" aria-hidden="true" />{' '}
              Download Excel File
            </button>

            <button
              type="button"
              onClick={generateJSONFile}
              className="btn btn-default btn-lg m-5"
              style={{
                background: 'transparent',
                fontSize: '25px',
                border: '1px solid gray',
                borderColor: 'gray',
              }}
            >
              <span className="glyphicon glyphicon-star" aria-hidden="true" />{' '}
              Download JSON File
            </button>

            <h5>Upload File</h5>

            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChange(e.target.files)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

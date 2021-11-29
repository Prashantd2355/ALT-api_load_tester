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

    if (files[0].type === 'application/json') {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const data: string | undefined = reader.result?.toString();
        let arr;
        if (data !== undefined) {
          arr = JSON.parse(data);
        }

        // loop each record
        arr.forEach((eachElement: any) => {
          const url = eachElement.URL;
          const method = eachElement.METHOD;
          const header = eachElement.HEADERS;
          const body = eachElement.BODY;

          // validate URL
          if (!isValidURL(url)) {
            // eslint-disable-next-line no-alert
            alert(`URL not valid: ${url}`);
          }

          // validate method name
          if (!methodList.includes(method)) {
            // eslint-disable-next-line no-alert
            alert(`Method name not valid: ${method}`);
          }

          // validate header
          if (!isValidJSON(header)) {
            // eslint-disable-next-line no-alert
            alert(`Header not valid: ${header}`);
          }

          // validate body
          if (!isValidJSON(body)) {
            // eslint-disable-next-line no-alert
            alert(`Body name not valid: ${body}`);
          }
        });
      });
      reader.readAsText(files[0]);
    }
  }
  return (
    <div>
      <button type="button" onClick={generateExcelFile}>
        Generate Excel File
      </button>

      <button type="button" onClick={generateJSONFile}>
        Generate JSON File
      </button>

      <input type="file" onChange={(e) => handleChange(e.target.files)} />
    </div>
  );
}

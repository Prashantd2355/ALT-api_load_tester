(function() {
    document.getElementById('upload').addEventListener('change', handeSelectedFile, false);

    function handeSelectedFile(evt) {
        var files = evt.target.files;
        var excelToJson = new ExcelToJSON();
        excelToJson.parseExcel(files[0]);
    }

    var ExcelToJSON = function() {

        this.parseExcel = function(file) {
            var methodList = ['GET', 'POST', 'PUT', 'DELETE'];
            if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    //looping each row from excel sheet
                    workbook.SheetNames.forEach(function(sheetName) {
                        debugger;
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        var arr = JSON.parse(json_object);

                        //loop each record
                        arr.forEach(eachElement => {
                            var url = eachElement.URL;
                            var method = eachElement.METHOD;
                            var header = eachElement.HEADERS;
                            var body = eachElement.BODY;

                            if (!isValidURL(url)) {
                                alert('URL not valid: ' + url);
                            }
                            if (!methodList.includes(method)) {
                                alert('Method name not valid: ' + method);
                            }
                        });
                    })
                };

                reader.onerror = function(ex) {
                    console.log(ex);
                };

                reader.readAsBinaryString(file);
            } else if (file.type === 'application/json') {
                var reader = new FileReader();
                reader.addEventListener('load', function() {
                    var arr = JSON.parse(reader.result);

                    //loop each record
                    arr.forEach(eachElement => {

                    });
                });
                reader.readAsText(upload.files[0]);
            } else {
                alert('Unsupported file type!')
            }
        };
    };
})();

//generates and downloads EXCEL files
function generateExcelFile() {
    debugger;
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "ALT Excel File",
        Subject: "Sample Excel File for ALT",
        Author: "ALT-Group-UEL"
    };
    wb.SheetNames.push("Sheet");

    var ws_data = [
        ['URL', 'METHOD', 'HEADERS', 'BODY']
    ]; //a row with 4 columns

    var ws = XLSX.utils.aoa_to_sheet(ws_data);

    wb.Sheets["Sheet"] = ws;
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'ALT.xlsx');
}

//generates and downloads JSON files
function generateJSONFile() {
    var apiJSONFormat = [{
            'URL': 'https://www.example.com/getUsers/',
            'METHOD': 'GET',
            'HEADERS': '{}',
            'BODY': '{}'
        },
        {
            'URL': 'https://www.example.com/createUsers/',
            'METHOD': 'POST',
            'HEADERS': '{}',
            'BODY': '{}'
        }
    ];
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(apiJSONFormat));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ALT.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}



/** HELPER METHODS STARTS HERE */

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}


//method to validate URLs
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};



function validateMethods(methodName) {

}

/** HELPER METHODS ENDS HERE */
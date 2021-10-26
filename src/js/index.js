(function() {
    document.getElementById('upload').addEventListener('change', handeSelectedFile, false);

    function handeSelectedFile(evt) {
        var files = evt.target.files;
        var excelToJson = new ExcelToJSON();
        excelToJson.parseExcel(files[0]);
    }

    var ExcelToJSON = function() {

        this.parseExcel = function(file) {
            debugger;
            if (file.type === 'application/vnd.ms-excel') {
                var reader = new FileReader();

                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function(sheetName) {
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        console.log(JSON.parse(json_object));
                    })
                };

                reader.onerror = function(ex) {
                    console.log(ex);
                };

                reader.readAsBinaryString(file);
            } else {
                var reader = new FileReader();
                reader.addEventListener('load', function() {
                    var result = JSON.parse(reader.result);
                });
                reader.readAsText(upload.files[0]);
            }
        };
    };
})();
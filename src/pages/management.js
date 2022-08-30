

import '../App.css';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
// import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import axios from 'axios';
var URLconfig = require('../config');

function App() {
    
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
// const [storedHazards, setStoredHazards] = useState();
const [returnedHazards, setReturnedHazards] = useState();
const [reportVisable, setReportVisable] = useState(false);
const [downloadFile, setDownloadFile] = useState();
// const [isDateVisable, setIsDateVisable] = useState(true)
const isDateVisable = true;

// let _pdfExport;

const exportExcel = () => {
    console.log(_export)
  _export.save();
};

let _export;

// const exportPDF = () => {
//   _pdfExport.save();
// };


const clearForm = () => { 
    window.location.reload(true);
    // var tempDates = document.getElementsByClassName("datePicker")
    // for(var i = 0; i < tempDates.length; i++){
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].value)
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].title)
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].defaultValue)
    //     // tempDates[i] = DatePicker;
    // //     tempDates[i].childNodes[0].childNodes[0].title = "month/day/year";
    // //     tempDates[i].childNodes[0].childNodes[0].defaultValue = new Date();
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].value)
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].title)
    // //     console.log(tempDates[i].childNodes[0].childNodes[0].defaultValue)
    // }
    // // setStoredHazards();
    // // setReturnedHazards();
    // setReportVisable(false);
    // setIsDateVisable(false);
    // setIsDateVisable(true);
    

  }

const onGetHazardsClick = () => {
    var date = `${startDate.value.getFullYear()}/${startDate.value.getMonth()+1}/${startDate.value.getDate()}`;
    var enddate = `${endDate.value.getFullYear()}/${endDate.value.getMonth()+1}/${endDate.value.getDate()}`;
    var hazardDate = URLconfig.hazard+`?date='${date}' '${enddate}'`
    var fileData = [];
    var file;
    var fileName = `${hazardDate} Hazard Report.doc`;

    axios.get(hazardDate).then(res => { 
        setReturnedHazards(res.data); 
        for(var i = 0; i < res.data.length; i++){
            fileData.push(`Name: ${res.data[i].firstName} ${res.data[i].lastName}\n`)
            fileData.push(`Hazard found on: ${res.data[i].hazardDate}\n`)
            fileData.push(`Identified Hazard: ${res.data[i].identifiedHazard}\n`)
            fileData.push(`Action Taken: ${res.data[i].actionTaken}\n`)
            fileData.push(`Location: ${res.data[i].hazardLocation}\n`)            
            // if(res.data[i].data){
            //     const b64file = Buffer.from(res.data[i].data.data, 'base64');

            //     fileData.push(b64file)    
            //     console.log(b64file)        
            // }           
            fileData.push(`\n\n`)

            setReportVisable(true)
        }       
        // setStoredHazards(fileData)
        var properties = {type: 'text/plain'}; // Specify the file's mime-type.
        try {
        // Specify the filename using the File constructor, but ...
        // file = new File(fileData, "file.txt", properties);
        file = new File(fileData, fileName, properties);
        } catch (e) {
        // ... fall back to the Blob constructor if that isn't supported.
        console.log(`file creation failed`)
        console.log(e)
        file = new Blob(fileData, properties);
        }
        // var url = URL.createObjectURL(file);
        setDownloadFile(file);
        // var element = document.getElementById('link');
        // if(element){
        //     element.href = url;
        // }
        // document.getElementById('link1').href = url;     
  
    })
    // clearForm();
}

const onDownloadClick = () =>{
    var url = URL.createObjectURL(downloadFile);
    document.getElementById('link').href = url;
}

    return(
        <div>
            <ExcelExport
            data={returnedHazards}
            ref={(exporter) => {
              _export = exporter;
            }}
          >
            <ExcelExportColumn field="firstName" title='Fist Name'  />
            <ExcelExportColumn field="lastName" title='Last Name'/>
            <ExcelExportColumn field="hazardDate" title="Hazard found on"/>
            <ExcelExportColumn field="identifiedHazard" title="Identified Hazard"/>
            <ExcelExportColumn field="actionTaken" title="Action Taken"/>
            <ExcelExportColumn field="hazardLocation" title="Location"/>
          </ExcelExport>

          {isDateVisable && (
        <label className='dateLabel'>Start Date:</label>
        )}  {isDateVisable && (      
          <DatePicker className='datePicker'  selected={startDate} onChange={(date) => setStartDate(date)}  width={200}  />
          )} {isDateVisable && (
        <label className='dateLabel'>End Date:</label>
        )}{isDateVisable && (
          <DatePicker  className='datePicker' selected={endDate} onChange={(date) => setEndDate(date)}   width={200} />
          )}
        <div className='download'>
            <button className='downloadButton' onClick={onGetHazardsClick}>Get hazard report</button>
        </div>

        <div>
            
        <div className='download'>
            {
                reportVisable && (
            
                <button className="downloadButton">
                <a href='a' id="link" target="_blank" download="Hazard Report.doc" onClick={onDownloadClick} className="downloadLink">Download</a>
                </button>
            )}
            {
              reportVisable && (
                 <button
                  title="Export to Excel"
                  className="downloadButton"
                  onClick={exportExcel}
                >
                  Export to Excel
                </button >
            )}

                &nbsp;
                {/* <button
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                  onClick={exportPDF}
                >
                  Export to PDF
                </button> */}
        </div>
        {/* <div className='hazardsContainer'>
            {storedHazards?.map((results, key) =>(
                <div key={key} className='hazardList'> 
                   {results}
                </div> 
            ) ) }
        </div> */}
        {
              reportVisable && (
            <Grid  
                style={{height: '500px', Color: 'green'} }
                // sortable={true}
                // filterable={true}
                groupable={true}
                reorderable={true}
                data={returnedHazards}
                >
                <GridColumn field="firstName" title='Fist Name'  sortable={true} filterable={true} groupable={true} reorderable={true} filter="text" />
                <GridColumn field="lastName" title='Last Name'/>
                <GridColumn field="hazardDate" title="Hazard found on"/>
                <GridColumn field="identifiedHazard" title="Identified Hazard"/>
                <GridColumn field="actionTaken" title="Action Taken"/>
                <GridColumn field="hazardLocation" title="Location"/>
            </Grid>
        )}
    </div>
    { reportVisable && (
        <button className='downloadButton' onClick={clearForm}>
            Clear Data
        </button>
    )}
      </div>
      
    )
}

export default App;
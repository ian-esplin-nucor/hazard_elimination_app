
import '../App.css';
import {DatePicker } from "@progress/kendo-react-dateinputs";
import "react-datepicker/dist/react-datepicker.css";
import {useState } from 'react';
import axios from 'axios';
var URLconfig = require('../config');

function App() {

let user = {firstName:"", lastName:""}
const [currentDate, setCurrentDate] = useState(new Date());
const [currentFile, setCurrentFile] = useState(null);
// const [uploadProgress, setUploadProgress] = useState();
const [hazardIdentifed, setHazardIdentified] = useState("");
const [actionTaken, setActionTaken] = useState("");
const [Teammate, setTeammate] = useState(user);
const [location, setLocation] = useState("");
const [message, setMessage] = useState();
const [submitted, setSubmitted]  = useState(false)
var insertId = "";
 

var hazard = {
  hazard: "",
  action: "",
  location: "",
  date:"",
  teammate: user
}

const onFileUpload = () => {
  const onUploadProgress = (event) => {
    const percentage = Math.round((100 * event.loaded) / event.total);
    // setUploadProgress(percentage);
    console.log(percentage);
  };

  console.log(currentFile);
    let formData = new FormData();

    formData.append("upload", currentFile);
    formData.append("upload-type", currentFile.type);
    formData.append("upload.name", currentFile.name);
    formData.append("upload-size", currentFile.size);
    var url = new URL(URLconfig.addFile +`?insertId=${insertId}`)

    console.log(formData);

    axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    }).then(res =>{ 
        console.log(res)});  
}

const submit = () => {
 setSubmitted(true);
  hazard.hazard = hazardIdentifed
  hazard.action = actionTaken;
  hazard.location  = location;
  hazard.teammate = Teammate;
  var datenow = new Date().getFullYear();
  console.log(datenow)
  if(currentDate.value){
  hazard.date = `${currentDate.value.getMonth()+1}/${currentDate.value.getDate()}/${currentDate.value.getFullYear()}`;
  }else{
    hazard.date = `${new Date().getMonth()+1}/${ new Date().getDate()}/${new Date().getFullYear()}`;
  }
  var valid = InputValidation()
  console.log(`valid: ${valid}`)
  if(valid !== true){
    return;
  }

  axios.post(URLconfig.hazard, hazard).then(res => {
    console.log(res.data.insertId)
    insertId = res.data.insertId;
    if(currentFile){
      onFileUpload();
    }
    clearForm();    
  })

}

const InputValidation = () => {
  var valid = true;
  if( hazardIdentifed === "" || actionTaken === "" || location ==="" || currentDate ==="" || Teammate.firstName === "" || Teammate.lastName === ""){
    valid = false;
    setMessage("All fields are required")
  }else{
    setMessage("")
    valid = true;
  }
  
  if(actionTaken === ""){
    document.getElementById("hazardFix").style.backgroundColor ='red'
  }else{
    document.getElementById("hazardFix").style.backgroundColor ='white'
  }
  if( hazardIdentifed === ""){
    document.getElementById("hazardText").style.backgroundColor ='red'
  }else{
    document.getElementById("hazardText").style.backgroundColor ='white'
  }
  if(location ===""){
    document.getElementById("area").style.backgroundColor ='red'
  }else{
    console.log(`in the area else ${location}`)
    document.getElementById("area").style.backgroundColor ='white'
  }  
  if(Teammate.firstName ===""){
    document.getElementById("firstName").style.backgroundColor ='red'
  }else{
    document.getElementById("firstName").style.backgroundColor ='white'
  }
  if(Teammate.lastName ===""){
    document.getElementById("lastName").style.backgroundColor ='red'
  }else{
    document.getElementById("lastName").style.backgroundColor ='white'
  }  
 
  return valid;
}

const blurred = () => {
  if(submitted){
    InputValidation();
  }
}

const clearForm = () => {
  var form = document.getElementsByClassName("smallTextField")
  var form2 = document.getElementsByClassName("bigTextField")
  // var tempdate = document.getElementsByClassName("datePicker")
  var i = 0;
  for(i = 0; i < form.length; i++){
    form[i].value = "";
  }
  for(i = 0; i < form2.length; i++){
    form2[i].value = "";
  }
  // for(i = 0; i < tempdate.length; i++){
  //   tempdate[i].childNodes[0].childNodes[0].value = Date.prototype.getDate();
  // }
  window.location.reload(true);
}

const onHazardIdentifiedChange = (e) => { 
  setHazardIdentified(e.target.value)
 }

 const onActionTakenChange = (e) => {
  setActionTaken(e.target.value);  
 }
 const onFirstNameChange = (e) => {
  var tempuser = Teammate
  user.firstName = e.target.value;
  user.lastName = tempuser.lastName;
  setTeammate(user);
 }

 const onLastNameChange = (e) => {
  var tempuser = Teammate;
  user.firstName = tempuser.firstName;
  user.lastName = e.target.value;
  setTeammate(user);
 }

 const onLocationChange = (e) => {
  setLocation(e.target.value)
 }

 return (
    <div className="App">
      <div>
        <div>
          <label className='bodyText'>Hazard Identified:</label>
          <div onChange={onHazardIdentifiedChange} onBlur={blurred}>
            <textarea id="hazardText" className="bigTextField"  type='text' required={true}/>
          </div>
        </div>

        <div>
          <label className='bodyText'>Action Taken:</label>
          <div onChange={onActionTakenChange} onBlur={blurred}>
            <textarea id="hazardFix" className="bigTextField" type='text' required={true}/>
          </div>
        </div>

        <div>
          <label className='bodyText'>Teammate name:</label>
          <div>
            <label>First Name</label>
            <input id="firstName" className="smallTextField" type='text'  onChange={onFirstNameChange} onBlur={blurred}/>
            <label>  Last Name</label>
            <input id="lastName" className="smallTextField" type='text' onChange={onLastNameChange} onBlur={blurred}/>
          </div>
        </div>

        <div>
          <label className='bodyText'>Area/Location where hazard was found:</label>
          <div>
            <input id="area" className="smallTextField" type='text' onChange={onLocationChange} onBlur={blurred}/>
          </div>
        </div>
        <div>
          <label id="datePicker" className='bodyText'>Date:</label>
          <div className='datePicker'>
            <DatePicker   selected={currentDate} onChange={(date) => setCurrentDate(date)}  width={200}  onBlur={blurred}/>
          </div>        
        </div>
        {message}

        {/* File upload */}
        {/* <input type="file" name="hazard" onChange={e => onFileChange(e)}/> */}
        {/* <div>
            <button onClick={onFileUpload}>Upload File</button>
        </div> */}
        {/* <div> Uploading ... {uploadProgress}</div> */}
      </div>
      <button className="downloadButton" onClick={submit}>Submit Hazard Found</button>
    </div>
  );
}

export default App;

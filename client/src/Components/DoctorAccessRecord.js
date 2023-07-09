import React from 'react'
import '../CSS/DoctorAccessRecord.css'
export default function AccessRecord() {
  return (
    <>
      <div className="head1">
        <div>
          <div className="patid">
            <div className="askdetails">
              <label className="lab">Enter ID&nbsp;&nbsp;:</label>&nbsp;&nbsp;
              <input
                type="text"
                className="patidinp"
                placeholder="Patient ID"
              />
            </div>
          </div>
          <div className="submitpatid">
            <button className="patidsubbtn">Submit</button>
          </div>
        </div>
        <div className="Recordcard">
          <div className="title">
            <h2>Patient Record</h2>
          </div>
          <div className="showRecords">
            <div className="leftdetails">
              <label>Patient ID:</label>
              <label>Weight:</label>
              <label>Blood Pressure:</label>
              <label>Body Temperature:</label>
            </div>
            <div className="rightdetails">
              <label>Age:</label>
              <label>Height:</label>
              <label>Heart Rate:</label>
              <label>Date:</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

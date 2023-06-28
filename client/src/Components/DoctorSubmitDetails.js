import React from "react";
import "../CSS/DoctorSubmitDetails.css";
export default function DoctorSubmitDetails() {
  return (
    <>
      <div className="container topdiv">
        <h2>Enter the health parameters</h2>
        <form className="formheight">
          <div className="form-group">
            <label for="name">Patient User Name:</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" className="form-control" id="age" required />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (in kg):</label>
            <input type="number" className="form-control" id="weight" />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (in cm):</label>
            <input type="number" className="form-control" id="height" />
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure:</label>
            <input type="text" className="form-control" id="bloodPressure" />
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate:</label>
            <input type="number" className="form-control" id="heartRate" />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Body Temperature:</label>
            <input type="number" className="form-control" id="temperature" />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" className="form-control" id="date" />
          </div>
          <div class="form-group">
            <label htmlFor="prescription">Prescription</label>
            <textarea class="form-control" id="prescription" rows="4" required></textarea>
          </div>
           <div class="form-group">
            <label htmlFor="reports">Upload Reports</label>
             <input type="file" className="form-control" id="report" />
          </div>
          <button type="submit" className="subbtn btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

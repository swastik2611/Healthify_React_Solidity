import React from "react";
import "../CSS/DoctorSubmitDetails.css";

import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthify from "../contracts/healthify.json";

export default function DoctorSubmitDetails() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [pid, setPid] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [date, setDate] = useState("");
  const [prescription, setPrescription] = useState("");
  async function Submitted() {
    const { contract } = state;
    try {
      const exist=await contract.methods.is_patient_registered(pid).call({from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec"});
      if(!exist){
        alert("Patient ID not registered");
        return;
      }
      else{
        alert("Patient ID registered");
        await contract.methods.doctorSubmitDetails(pid, age, weight, height, bloodPressure, heartRate, temperature, date, prescription).send({
          from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec",
          gas: 3000000,
        });
      }
    }
    catch (e) {
      console.error(e);
    }
    console.log("Submitted");
    console.log(`Name: ${pid}, Age: ${age}, Weight: ${weight}, Height: ${height}, Blood Pressure: ${bloodPressure}, Heart Rate: ${heartRate}, Temperature: ${temperature}, Date: ${date}, Prescription: ${prescription}`);
  }
  // async function Display() {
  //   const { contract } = state;
  //   try {
  //     const data = await contract.methods.doctorViewDetails("24").call({ from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec"});
  //     console.log(data);
  //   }
  //   catch (e) {
  //     console.error(e);
  //     alert("Data can't be found");
  //   }
  // } //to fetch records

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = healthify.networks[networkId];
      // console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        healthify.abi,
        deployedNetwork.address
      );
      // console.log(contract);//instance of contract
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);
  return (
    <>
      <div className="container topdiv">
        <h2>Enter the health parameters</h2>
        <div className="formheight">
          <div className="form-group">
            <label for="name">Patient ID:</label>
            <input type="text" className="form-control" id="name" placeholder="Registered Patient ID" onChange={(e)=>setPid(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" className="form-control" id="age" onChange={(e)=>setAge(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (in kg):</label>
            <input type="number" className="form-control" id="weight" onChange={(e)=>setWeight(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (in cm):</label>
            <input type="number" className="form-control" id="height" onChange={(e)=>setHeight(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure:</label>
            <input type="text" className="form-control" id="bloodPressure" onChange={(e)=>setBloodPressure(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate:</label>
            <input type="text" className="form-control" id="heartRate" onChange={(e)=>setHeartRate(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Body Temperature:</label>
            <input type="number" className="form-control" id="temperature" onChange={(e)=>setTemperature(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" className="form-control" id="date" onChange={(e)=>setDate(e.target.value)}/>
          </div>
          <div class="form-group">
            <label htmlFor="prescription">Prescription</label>
            <textarea class="form-control" id="prescription" rows="4" onChange={(e)=>setPrescription(e.target.value)} required></textarea>
          </div>
           <div class="form-group">
            <label htmlFor="reports">Upload Reports</label>
             <input type="file" className="form-control" id="report" />
          </div>
          <button onClick={Submitted} className="subbtn btn btn-primary">
            Submit
          </button>
        </div>
      </div>
      {/* <button onClick={Display}>Read</button> */}
    </>
  );
}

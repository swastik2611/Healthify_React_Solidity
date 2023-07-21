import React from "react";
import "../CSS/DoctorSubmitDetails.css";
import healthif from "../Images/healthif.png";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthify from "../contracts/healthify.json";
import { Web3Storage, getFilesFromPath } from "web3.storage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function DoctorSubmitDetails() {
  const [state, setState] = useState({ web3: null, contract: null });
  const token=process.env.REACT_APP_WEB3_TOKEN;
  const storage = new Web3Storage({ token });
  const navigate = useNavigate();
  const [pid, setPid] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [date, setDate] = useState("");
  const [prescription, setPrescription] = useState("");
  const [file, setFile] = useState(null);
  const [cidhash, setCidhash] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const connect = async () => {
    try {
      const { web3 } = state;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Connected metamask", accounts[0]);
      // toast.success("Connected to Metamask");
    } catch (e) {
      console.log(e);
      // toast.error("Error connecting to Metamask");
    }
  };
  async function Submitted() {
    const { contract } = state;
    try {
      const exist = await contract.methods
        .is_patient_registered(pid)
        .call({ from: currentAccount });
      if (!exist) {
        alert("Patient ID not registered");
        return;
      } else {
        const cid = await storage.put([file]);
        setCidhash(cid);
        console.log(typeof(cid));
        // alert("Patient ID registered");
        console.log(cidhash);
        // await contract.methods
        //   .doctorSubmitDetails(
        //     pid,
        //     age,
        //     weight,
        //     height,
        //     bloodPressure,
        //     heartRate,
        //     temperature,
        //     date,
        //     prescription,
        //     cidhash
        //   )
        //   .send({
        //     from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec",
        //     gas: 3000000,
        //   });
        const transaction = contract.methods.doctorSubmitDetails(
          pid,
          age,
          weight,
          height,
          bloodPressure,
          heartRate,
          temperature,
          date,
          prescription,
          cidhash
        );
         const gasEstimate = await transaction.estimateGas({
           from: currentAccount,
         });
         const confirmed = await window.ethereum.send("eth_sendTransaction", [
           {
             to: contract.options.address, // The contract address
             data: transaction.encodeABI(), // Encoded transaction data
             gas: gasEstimate.toString(), // Gas limit as a string
             from: currentAccount, // The user's account
           },
         ]);
         if (confirmed) {
           // Transaction confirmed by user, call the method
           toast.success("Submission Successful");
           const data = await transaction.call({ from: currentAccount });
           console.log(data);
           document.getElementById("name").value = "";
           document.getElementById("age").value = "";
           document.getElementById("weight").value = "";
           document.getElementById("height").value = "";
           document.getElementById("bloodPressure").value = "";
           document.getElementById("heartRate").value = "";
           document.getElementById("temperature").value = "";
           document.getElementById("date").value = "";
           document.getElementById("prescription").value = "";
           document.getElementById("file").reset();
         } else {
           console.log("User canceled the transaction.");
         }
      }
    } catch (e) {
      console.error(e);
    }
    console.log("Submitted");
    console.log(
      `Name: ${pid}, Age: ${age}, Weight: ${weight}, Height: ${height}, Blood Pressure: ${bloodPressure}, Heart Rate: ${heartRate}, Temperature: ${temperature}, Date: ${date}, Prescription: ${prescription}`
    );
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
    // console.log("web3Token = ",token);
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
    connect();
  }, []);
  return (
    <>
      <div className="container topdiv">
        <h2>Enter the health parameters</h2>
        <div className="formheight">
          <div className="imgg">
            <img className="im" src={healthif} alt="logo" />
          </div>
          <div className="form-group">
            <label for="name">Patient ID:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Registered Patient ID"
              onChange={(e) => setPid(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              className="form-control"
              id="age"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (in kg):</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (in cm):</label>
            <input
              type="number"
              className="form-control"
              id="height"
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure:</label>
            <input
              type="text"
              className="form-control"
              id="bloodPressure"
              onChange={(e) => setBloodPressure(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate:</label>
            <input
              type="text"
              className="form-control"
              id="heartRate"
              onChange={(e) => setHeartRate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Body Temperature:</label>
            <input
              type="number"
              className="form-control"
              id="temperature"
              onChange={(e) => setTemperature(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label htmlFor="prescription">Prescription</label>
            <textarea
              class="form-control"
              id="prescription"
              rows="4"
              onChange={(e) => setPrescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="reports">Upload Reports</label>
            <input
              type="file"
              className="form-control"
              id="report"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button onClick={Submitted} className="subbtn btn btn-primary">
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

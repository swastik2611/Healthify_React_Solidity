import React from "react";
import "../CSS/DoctorAccessRecord.css";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthify from "../contracts/healthify.json";
export default function AccessRecord() {
  let ageArray = [];
  let weightArray = [];
  let heightArray = [];
  let bloodPressureArray = [];
  let heartRateArray = [];
  let temperatureArray = [];
  let dateArray = [];
  let prescriptionArray = [];
  let cidhashArray = [];
  const [state, setState] = useState({ web3: null, contract: null });
  const [patid, setPatid] = useState("");
  const [nrecords, setNrecords] = useState(0);

  const [ind, setInd] = useState(4);
  const [pid, setPid] = useState([]);
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState([]);
  const [bloodPressure, setBloodPressure] = useState([]);
  const [heartRate, setHeartRate] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [date, setDate] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [cidhash, setCidhash] = useState([]);

  async function fetchRecords() {
    const { contract } = state;
    try {
      const record = await contract.methods
        .doctorViewDetails(patid)
        .call({ from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec" });
      console.log("record", record);
      setNrecords(record.length);
      // console.log("nrec", nrecords);

      for (let i = 0; i < record.length; i++) {
        ageArray.push(record[i].age);
        weightArray.push(record[i].weight);
        heightArray.push(record[i].height);
        bloodPressureArray.push(record[i].bp);
        heartRateArray.push(record[i].heartrate);
        temperatureArray.push(record[i].temp);
        dateArray.push(record[i].date);
        prescriptionArray.push(record[i].prescription);
        cidhashArray.push(record[i].report);
      }
      setPid(patid);
      setBloodPressure(bloodPressureArray);
      setHeartRate(heartRateArray);
      setTemperature(temperatureArray);
      setDate(dateArray);
      setPrescription(prescriptionArray);
      setCidhash(cidhashArray);

      const intWeightArray = weightArray.map((bigint) => Number(bigint));
      setWeight(intWeightArray);
      // console.log("wt arr",intWeightArray);

      const intAgeArray = ageArray.map((bigint) => Number(bigint));
      setAge(intAgeArray);
      // console.log("age arr",intAgeArray);

      const intHeightArray = heightArray.map((bigint) => Number(bigint));
      setHeight(intHeightArray);
      // console.log("height arr",intHeightArray);

      // console.log("age",age);
      // console.log("weight",weight);
      // console.log("height",height);
      // console.log("bloodPressure",bloodPressure);
      // console.log("heartRate",heartRate);
      // console.log("temperature",temperature);
      // console.log("date",date);
      // console.log("prescription",prescription);
      // console.log("cidhash",cidhash);
    } catch (e) {
      console.error(e);
      alert("Inavlid Patient ID");
    }
  }
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
      <div className="head1">
        <div>
          <div className="patid">
            <div className="askdetails">
              <label className="lab">Enter ID&nbsp;&nbsp;:</label>&nbsp;&nbsp;
              <input
                type="text"
                className="patidinp"
                placeholder="Patient ID"
                onChange={(e) => setPatid(e.target.value)}
              />
            </div>
          </div>
          <div className="submitpatid">
            <button className="patidsubbtn" onClick={fetchRecords}>
              Submit
            </button>
          </div>
        </div>
        <div className="Recordcard">
          <div className="title">
            <h2>Patient Record</h2>
          </div>
          <div className="showRecords">
            <div className="leftdetails">
              <div>
                <label className="clabel hllabel">Patient ID:</label>
                <span className="healthpara">{pid}</span>
              </div>
              <div>
                <label className="clabel hllabel">Weight:</label>
                <span className="healthpara">{weight[ind]}</span>
              </div>
              <div>
                <label className="clabel hllabel">Blood Pressure:</label>
                <span className="healthpara">{bloodPressure[ind]}</span>
              </div>
              <div>
                <label className="clabel hllabel">Body Temperature:</label>
                <span className="healthpara">{temperature[ind]}</span>
              </div>
              <div>
                <label className="clabel hllabel">Prescription:</label>
                <span className="healthpara">{prescription[ind]}</span>
              </div>
            </div>
            <div className="rightdetails">
              <div>
                <label className="clabel hrlabel">Age:</label>
                <span className="healthpara">{age[ind]}</span>
              </div>
              <div>
                <label className="clabel hrlabel">Height:</label>
                <span className="healthpara">{height[ind]}</span>
              </div>
              <div>
                <label className="clabel hrlabel">Heart Rate:</label>
                <span className="healthpara">{heartRate[ind]}</span>
              </div>
              <div>
                <label className="clabel hrlabel">Date:</label>
                <span className="healthpara">{date[ind]}</span>
              </div>
              <div>
                <label className="clabel hllabel">Report:</label>
                <span className="healthpara">{cidhash[ind]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
  let linkArray = [];
  const [state, setState] = useState({ web3: null, contract: null });
  const [patid, setPatid] = useState("");
  const [nrecords, setNrecords] = useState(0);

  const [llink, setLlink] = useState("https://");
  const [rlink, setRlink] = useState(".ipfs.w3s.link");
  const [link, setLink] = useState([]);
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
        linkArray.push(llink + cidhashArray[i] + rlink);
      }
      setPid(patid);
      setBloodPressure(bloodPressureArray);
      setHeartRate(heartRateArray);
      setTemperature(temperatureArray);
      setDate(dateArray);
      setPrescription(prescriptionArray);
      setCidhash(cidhashArray);
      setLink(linkArray);
      const intWeightArray = weightArray.map((bigint) => Number(bigint));
      setWeight(intWeightArray);
      // console.log("wt arr",intWeightArray);

      const intAgeArray = ageArray.map((bigint) => Number(bigint));
      setAge(intAgeArray);
      // console.log("age arr",intAgeArray);

      const intHeightArray = heightArray.map((bigint) => Number(bigint));
      setHeight(intHeightArray);
      // console.log("height arr",intHeightArray);

      const intTempArray = temperatureArray.map((bigint) => Number(bigint));
      setTemperature(intTempArray);
      // console.log("temp arr",intTempArray);

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
            <div className="clabel leftdetails">
              <div>
                <label className="hllabel">
                  Patient
                  ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{pid}</span>
              </div>
              <div>
                <label className="hllabel">
                  Weight&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{weight[ind]}</span>
              </div>
              <div>
                <label className="hllabel">
                  Blood
                  Pressure&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{bloodPressure[ind]}</span>
              </div>
              <div>
                <label className="hllabel">
                  Body Temperature&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{temperature[ind]}</span>
              </div>
              {/* <div>
                <label className="hllabel">
                  Prescription&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{prescription[ind]}</span>
              </div> */}
            </div>
            <div className="clabel rightdetails">
              <div>
                <label className="hrlabel">
                  Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{age[ind]}</span>
              </div>
              <div>
                <label className="hrlabel">
                  Height&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{height[ind]}</span>
              </div>
              <div>
                <label className="hrlabel">Heart Rate&nbsp;&nbsp;:</label>
                <span className="healthpara">{heartRate[ind]}</span>
              </div>
              <div>
                <label className="hrlabel">
                  Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{date[ind]}</span>
              </div>
              {/* <div>
                <label className="hrlabel">
                  Report&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">
                  <a className="hyplink" href={link[ind]}>
                    Find here
                  </a>
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bottomdiv">
          <div className="bottomRecord">
            <label className="blabel">Prescription&nbsp;&nbsp;:</label>
            <span className="bspan">{prescription[ind]}</span>
          </div>
          <div className="bottomRecord">
            <label className="blabel">
              Report&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            </label>
            <span className="bspan">
              <a className="hyplink" href={link[ind]}>
                Find here
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

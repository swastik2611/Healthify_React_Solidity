import React from 'react'
import "../CSS/DoctorMenu.css";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Web3 from "web3";
import healthify from "../contracts/healthify.json";

export default function DoctorMenu() {
    const location = useLocation();
    const [state, setState] = useState({ web3: null, contract: null });
    const [name, setName] = useState("abcd");
    const [contact, setContact] = useState(42);
    const [docid, setDocid] = useState(location.state.docid);
    // console.log("hmm",location.state.docid);
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
   async function FetchDetails() {
    //fetching doctor details from blockchain
    const { contract } = state;
    try {
      const data = await contract.methods.viewDoctors(docid).call({from:"0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec"});
      console.log(data);
      setName(data[0]);
      setContact(data[1]);
      alert("Details Fetched");
    }
    catch (e) {
        console.error(e);
        console.log("Inavlid Credentials");
        alert("Invalid Credentials");
    }
    }
  return (
    <>
      <div className="topctr">
        <div className="dochead">
          <h1 className="heading">Currently Logged in</h1>
          <div className="details">
            <label id="h4">
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            </label>
            &nbsp;&nbsp;&nbsp;
            <span className="sp"> {name}</span>
          </div>

          <div className="details">
            <label id="h4">Contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
            &nbsp;&nbsp;&nbsp;
            <span className="sp"> {contact}</span>
          </div>
          <div className="details">
            <label id="h4">Doctor ID&nbsp;&nbsp;:</label>&nbsp;&nbsp;&nbsp;
            <span className="sp"> {docid}</span>
          </div>
        </div>
        <div className="middlec">
          <h1 className="heading">Choose the option</h1>
          <div className="cbtn">
            <Link to="/doctoraccessrecord" className="disabled-link cbtop btrmargin">
              <button className="btn bt btn-primary btn-lg btn-block">
                View Record
              </button>
            </Link>
            <Link to="/doctorsubmitdetails" className="disabled-link cbtop">
              <button className="btn bt btn-primary btn-lg btn-block">
                Add Record
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

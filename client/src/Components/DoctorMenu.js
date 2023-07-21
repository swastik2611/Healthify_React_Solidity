import React from 'react'
import "../CSS/DoctorMenu.css";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Web3 from "web3";
import healthify from "../contracts/healthify.json";

export default function DoctorMenu() {
    const location = useLocation();
    const [ctr, setCtr] = useState(0);
    const [state, setState] = useState({ web3: null, contract: null });
    const [name, setName] = useState("");
    const [contact, setContact] = useState(null);
    const [docid, setDocid] = useState(location.state.docid);
    const [currentAccount, setCurrentAccount] = useState("");
    const connect = async () => {
      try {
        const { web3 } = state;
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        console.log("Connected metamask", accounts[0]);
        setCtr(ctr + 1);
        // toast.success("Connected to Metamask");
      } catch (e) {
        console.log(e);
        // toast.error("Error connecting to Metamask");
      }
    };
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
            connect();
        }
        provider && template();
    }, []);
    useEffect(() => {
        FetchDetails();
    }, [ctr]);
   async function FetchDetails() {
    // const { contract_ } = state;
    // try {
    //   const data = await contract_.methods
    //     .viewDoctors(docid)
    //     .call({ from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec" });
    //   console.log("ddd",data);
    //   setName(data[0]);
    //   setContact(data[1].toString());
    //   alert("Details Fetched");
    // } catch (e) {
    //   console.error(e);
    //   console.log("Inavlid Credentials");
    //   // alert("Fetch Details Failed");
    // }
    //fetching doctor details from blockchain
    const { contract } = state;
    try {
      const data = await contract.methods
        .viewDoctors(docid)
        .call({ from: currentAccount });
      console.log("data",data);
      setName(data[0]);
      setContact(data[1].toString());
      // alert("Details Fetched");
    }
    catch (e) {
        console.error(e);
        console.log("Inavlid Credentials");
        // alert("Fetch Details Failed");
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

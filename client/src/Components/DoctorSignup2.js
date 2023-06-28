import React from "react";
import "../CSS/DoctorSignup.css";
import healthif from "../Images/healthif.png";
import { Link } from "react-router-dom";

import Web3, { net } from "web3";
import {useState,useEffect} from "react";
import healthify from '../contracts/healthify.json';

export default function DoctorSignup() {
  const [state,setState]=useState({web3:null,contract:null});
  const [val,setVal]=useState(0);//test

  const [name,setName]=useState("");
  const [contact,setContact]=useState(0);
  const [docid,setDocid]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCpassword]=useState("");
  
  async function Submitted(){//doctorSignUp to blockchain
    if(password!==cpassword){
      alert("Passwords do not match");
      return;
    }
    console.log(`Name: ${name}, Contact: ${contact}, Docid: ${docid}, Password: ${password}, Cpassword: ${cpassword}`);
    const {contract}=state;
    try{
      await contract.methods.doctorSignUp(name, contact, docid, password).send({
      from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec",
      gas: 3000000,
    });
    console.log("Submitted to blockchain");
    }
    catch(e){
      console.error(e);
      console.log("ID already exists");
      alert("ID already exists");
    }
  }
  async function Submitted2(){//view Doctor from blockchain
    const {contract}=state;
    try{
      const data=await contract.methods.viewDoctors("123").call();
      console.log(data);
    }
    catch(e){
      console.error(e);
      console.log("ID does not exist");
      alert("ID does not exist");
    }
  }
  useEffect(()=>{
    const provider= new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template(){
      const web3=new Web3(provider);
      // console.log(web3);
      const networkId=await web3.eth.net.getId();
      const deployedNetwork=healthify.networks[networkId];
      // console.log(deployedNetwork.address);
      const contract=new web3.eth.Contract(healthify.abi,deployedNetwork.address);
      // console.log(contract);//instance of contract
      setState({web3:web3,contract:contract});
    }
    provider && template();
  },[]);
  // console.log(state);
  // useEffect(()=>{
  //   const {contract}=state;
  //   async function readData(){
  //   const data=await contract.methods.test().call();
  //   console.log(data);
  //   }
  //   contract && readData();
  // },[val]);
  // async function writeData(){
  //   const {contract}=state;
  //   setVal(val+100);
  //   await contract.methods.setTest(val).send({ from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec" });
  //   // window.location.reload();
  // }
  return (
    <>
      <section className="h-100 gradient-form sec">
        <div className="container py-5 h-100 sec">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row formheight g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img className="im" src={healthif} alt="logo" />
                      </div>
                      <form>
                        <p>Please setup your Doctor2 account</p>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="text"
                            id="form2Example11-1"
                            className="form-control"
                            onChange={(e)=>setName(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11-2"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="form2Example22-1"
                            className="form-control"
                            onChange={(e)=>setContact(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22-2"
                          >
                            Contact Number
                          </label>
                        </div>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="email"
                            id="form2Example11-3"
                            className="form-control"
                            onChange={(e)=>setDocid(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Doctor ID
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22-3"
                            className="form-control"
                            onChange={(e)=>setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22-4"
                            className="form-control"
                            onChange={(e)=>setCpassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            onClick={Submitted}
                            className="btn  bt btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                          >
                            Sign up
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already Registered?</p>
                          <Link to="/DoctorSignin">
                            <button
                              type="button"
                              className="btn but btn-outline-danger"
                            >
                              Sign in
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Fun fact</h4>
                      <ul className="small txt mb-0">
                        <li>The average doctor has 40,000 hours of training</li>
                        <li>
                          There are about 1,062,205 doctors in the United States
                        </li>
                        <li>65% of those doctors are male</li>
                        <li>
                          However, there are more female pediatricians than male
                          pediatricians
                        </li>
                        <li>
                          Experts predict that by 2030 the United States will
                          have 122,000 unfilled jobs for doctors
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <button onClick={Submitted2}>Read</button>
    </>
  );
}

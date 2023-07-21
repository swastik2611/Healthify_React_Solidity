import React from 'react'
import '../CSS/DoctorSignin.css'
import healthif from "../Images/healthif.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthify from "../contracts/healthify.json";

export default function DoctorSignin() {
  const navigate = useNavigate();
  const [state, setState] = useState({ web3: null, contract: null });
  const [docid, setDocid] = useState("");
  const [password, setPassword] = useState("");
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
    //doctorSignin to blockchain
    console.log(`Docid: ${docid}, Password: ${password}`);
    const { contract } = state;
    // try {
    //   const data = await contract.methods.doctorSignIn(docid, password).call({from:"0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec"});
    //   console.log(data);
    //   // alert("Login Successful");
    //   navigate("/doctormenu",{state:{docid:docid}});
    // }
    // catch (e) {
    //   console.error(e);
    //   console.log("Inavlid Credentials");
    //   alert("Invalid Credentials");
    //   document.getElementById("username").value = "";
    //   document.getElementById("password").value = "";
    // }
    try {
      const transaction = contract.methods.doctorSignIn(docid, password);
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
        const data = await transaction.call({ from: currentAccount });
        console.log(data);
        // alert("Login Successful");
        navigate("/doctormenu", { state: { docid: docid } });
      } else {
        console.log("User canceled the transaction.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      console.log("Invalid Credentials");
      alert("Invalid Credentials");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
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
    connect();
  }, []);
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
                        <p>Please login to your Doctor account</p>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="email"
                            id="username"
                            className="form-control"
                            onChange={(e) => setDocid(e.target.value)}
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
                            id="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn  bt btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={Submitted}
                          >
                            Sign in
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/DoctorSignup">
                            <button
                              type="button"
                              className="btn but btn-outline-danger"
                            >
                              Create new
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Some Facts</h4>
                      <ul className="small txt mb-0">
                        <li>
                          Doctors in India practice a diverse range of medical
                          systems, from allopathy to traditional Ayurveda and
                          homeopathy.
                        </li>
                        <li>
                          India has a low doctor-patient ratio, with
                          approximately one doctor for every 1,457 people.
                        </li>
                        <li>
                          India is a popular destination for medical tourism,
                          offering high-quality and cost-effective treatments.
                        </li>
                        <li>
                          Providing healthcare in rural areas poses challenges
                          due to a concentration of doctors in urban regions.
                        </li>
                        <li>
                          Medical education in India is highly competitive, with
                          renowned medical colleges attracting aspiring doctors.
                          worldwide
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
    </>
  );
}

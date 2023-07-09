import React from 'react'
import '../CSS/Homepage.css'
import {Link} from 'react-router-dom'

export default function Homepage() {
  return (
    <>
      <div className='main'>
        <div className="container top">
          <h1 className="heading">About Healthify</h1>
          <p className="psize">
            A healthcare data portal storing website that utilizes blockchain
            technology is a platform designed to securely store and manage
            sensitive healthcare data. Blockchain, known for its decentralized
            and immutable nature, offers an ideal solution for protecting
            patient information, ensuring data integrity, and enabling
            transparent and auditable access to healthcare data.
            <br /> This healthcare data portal leverages blockchain's
            distributed ledger technology to create a tamper-proof and
            transparent record of all data transactions. Each data entry, such
            as patient records, medical history, diagnostic reports, and
            treatment plans, is encrypted, timestamped, and added to the
            blockchain network. This ensures that the data remains unaltered and
            can be traced back to its original source.
          </p>
        </div>
        <div className=" middle container">
          <h2 className="heading role">Select your role</h2>
          <div className="cbtn">
            <Link to="/DoctorSignin" className="disabled-link cbtop btrmargin">
              <button className="btn bt btn-primary btn-lg btn-block">
                Doctor
              </button>
            </Link>
            <Link to="/PatientSignin" className="disabled-link cbtop">
              <button className="btn bt btn-primary btn-lg btn-block">
                Patient
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

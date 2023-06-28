import React from 'react'
import healthif from '../Images/healthif.png'
import '../CSS/PatientSignin.css'
import { Link } from 'react-router-dom'
export default function PatientSignin() {
  return (
    <>
      <section className="h-100 gradient-form sec">
        <div className="container py-5 h-100 sec">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row  formheight g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img className="im" src={healthif} alt="logo" />
                      </div>

                      <form>
                        <p>Please login to your Patient account</p>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Patient ID
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
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
                          >
                            Log in
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/PatientSignup">
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
                          India has a diverse patient population with varying
                          cultural, linguistic, and socioeconomic backgrounds.
                        </li>
                        <li>
                          Access to healthcare remains a challenge for many
                          patients in rural and underserved areas of India.
                        </li>
                        <li>
                          Traditional healing practices, such as Ayurveda and
                          yoga, are still popular among a significant portion of
                          the patient population in India.
                        </li>
                        <li>
                          Medical tourism in India attracts patients from around
                          the world seeking affordable and high-quality
                          treatments.
                        </li>
                        <li>
                          Digital healthcare solutions and telemedicine
                          platforms are increasingly being utilized to improve
                          access to healthcare for patients in India.
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

import React from 'react'
import '../CSS/DoctorSignin.css'
import healthif from "../Images/healthif.png";
import { Link } from 'react-router-dom';
export default function DoctorSignin() {
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
                            id="form2Example11"
                            className="form-control"
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

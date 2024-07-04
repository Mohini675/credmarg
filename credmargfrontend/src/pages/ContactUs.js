import React from "react";
import ImgItem from "../components/ImgItem";
import ContactImg from "../assests/img/sunset.jpg";
import Footer from "../components/Footer";
const Contact = () => {

  return (
    <>
      <div>
        <ImgItem
          backImg={ContactImg}
          backTitle="Contact"
          cname="display-4 text-uppercase fw-bold"
        />
      </div>
      <div className="container text-center">
        <h1 className="fw-bold mt-4">Get in Touch</h1>
        <h4 className="text-muted">
          Simply say hi : <code>contact@abc.net</code>
        </h4>
        <form className="mt-4">
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                aria-label="name"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                aria-label="Email"
              />
            </div>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exammessagepleFormControlTextarea1"
              placeholder="Message"
              name="message"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <button type="button" className="btn btn-dark">
              Send a message
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const [contact,setcontact] = useState({cname:"",email:"",message:""});
  const nav = useNavigate();
  const change = (e) => {
    setcontact({ ...contact, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) =>{
    e.preventDefault();
    let response = await fetch("https://foodizbackend.onrender.com/api/contactUsData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        feedback_data: [{name :contact.cname,message : contact.message}],
        email: contact.email,
        feedback_date: new Date().toDateString()
      })
    });
    nav("/");
  }

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="contact-header text-center">
            <h1>Contact Us</h1>
            <p>If you have any questions, suggestions, or feedback, please don't hesitate to get in touch with us. We're here to help!</p>
          </div>
          <div>
          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" className="form-control" id="name" name="cname" value={contact.cname} onChange={change} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={change} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea className="form-control" id="message" name="message" rows="4" value={contact.message} onChange={change} required></textarea>
            </div>
            <div className='text-center'>
            <button type="submit" className="mt-3 btn-default btn btn-primary btn-block">Submit</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

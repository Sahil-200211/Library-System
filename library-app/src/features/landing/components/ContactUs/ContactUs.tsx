import React from "react";

import './Contactus.css';

export const ContactUs:React.FC = () => {
    return (
        <div className="contact-us">
            <h3 className="title">Contact Us</h3>
            <h4>Address</h4>
            <p>404 Book Not Found, Near Lost Chapters Lane,</p>
            <p>Fictionville, Biblioland - 123456</p>
            <div className="contact-us-divider"></div>
            <h4>Phone Number</h4>
            <p>+91-98765-READ</p>
            <div className="contact-us-divider"></div>
            <h4>Email</h4>
            <p>help@toomanybooks.com</p>
        </div>
    )
}
import React from 'react';
import '../css/Footer.css'; // You can define your styles in a separate CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo w-100 text-center">
          <img src="icons8-f-96.png" alt="Foodiz Logo" />
          <p>Discover delicious recipes with Foodiz</p>
        </div>
        <div className="footer__links text-center">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer__social text-center">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com/nandan.joshi.167527"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="https://twitter.com/foodiz"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://instagram.com/nandan_1807"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        <p>&copy; 2024 Foodiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

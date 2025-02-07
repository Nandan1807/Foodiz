import React from 'react';
import '../css/AboutUs.css'; // Import your CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Foodiz</h1>
        <p>Welcome to Foodiz, your ultimate destination for ordering delicious meals from your favorite local restaurants.</p>
        <p>At Foodiz, we believe that good food brings people together. That's why we're dedicated to providing you with a seamless and enjoyable dining experience, right from the comfort of your own home.</p>
        <p>Our platform features a curated selection of restaurants, offering a diverse range of cuisines to satisfy every palate. Whether you're in the mood for Italian, Asian, or classic American fare, you'll find it all on Foodiz.</p>
        <p>With user-friendly search and filtering options, you can easily discover new restaurants, browse menus, and place orders with just a few clicks. Plus, our real-time order tracking ensures that you're always informed about the status of your delivery.</p>
        <p>But Foodiz is more than just a food delivery service – we're a community. We're proud to support local businesses and foster connections between food lovers and their favorite eateries.</p>
        <p>Thank you for choosing Foodiz as your go-to destination for delicious food, exceptional service, and unforgettable dining experiences. Bon appétit!</p>
      </div>
      {/* <div className="about-us-image">
        <img src="about_us_image.jpg" alt="About Us Image" />
      </div> */}
    </div>
  );
};

export default AboutUs;

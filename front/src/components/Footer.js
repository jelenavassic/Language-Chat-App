import React from "react";
import SocialMediaIcons from "./SocialMediaIcons";
const Footer = () => {
  return (
    <footer>
      <div className="container" id="footer">
        <div className="social-media">
          <SocialMediaIcons></SocialMediaIcons>
        </div>
        <div>
          <p>&copy; Language Chat {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

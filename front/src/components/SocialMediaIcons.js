import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function SocialMediaIcons() {
  return (
    <div className="social-media">
        <p>Folow us: </p>
      <a href="https://twitter.com/">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="https://www.facebook.com/">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://www.instagram.com/">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
   
    </div>
  );
}

export default SocialMediaIcons
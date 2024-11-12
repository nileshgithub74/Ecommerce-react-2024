import './Footer.css';
import footer_logo from '../../Assets/Frontend_Assets/logo_big.png'
import instagram_icon from '../../Assets/Frontend_Assets/instagram_icon.png'
import whatsaap_icon from '../../Assets/Frontend_Assets/whatsapp_icon.png'
import pintester_icon from '../../Assets/Frontend_Assets/pintester_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Home Mart</p>
      </div>
      <ul className="footerlinks">
        <li>Company</li>
        <li>Product</li>
        <li>Offices</li>
        <li>ABout</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icon-container">
           <img src={instagram_icon} alt="" />
           <img src={whatsaap_icon} alt="" />
           <img src={pintester_icon} alt="" />
           
        </div>
      </div>




      <div className="footer-copyright">
      <hr />
      <p>Copyright@2024- All right Reserved</p>


      </div>

    </div>
  )
}

export default Footer
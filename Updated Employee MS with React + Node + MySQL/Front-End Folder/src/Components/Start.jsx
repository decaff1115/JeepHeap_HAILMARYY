import axios from "axios";
import logo from "../assets/logo.png";
import firstright from "../assets/firstright.png";
import secondleft from "../assets/secondleft.png";
import fblogo from "../assets/fblogo.png";
import linkedlogo from "../assets/linkedlogo.png";
import iglogo from "../assets/iglogo.png";



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect

const Start = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard')
          } else {
            navigate('/employee_detail/' + result.data.id)
          }
        }
      }).catch(err => console.log(err))
  }, [])

  return (

    <div className="App">
      <div className='header'>
        <img src={logo} className='logo' alt="Your Logo" />
        <div className="login-container">
          <div className='logInAs'>
            LOG IN AS:
          </div>
          <div className="wrappedButtons">
            <div>
              <button type="button" className="employeeButton" onClick={() => { navigate('/employee_login') }}>
                Employee
              </button>
            </div>

            <div>
              <button type="button" className="adminButton" onClick={() => { navigate('/adminlogin') }}>
                Admin
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className='first-p'>
        <div className='first-left'>
          <h1>Your journey, <b>Simplified!</b></h1>
          <p>JeepHeap transforms fare remittance for jeepney cooperatives through a digitalized, efficient solution. Our automated database ensures seamless record-keeping, empowering workers for enhanced productivity. Experience a smoother commute with JeepHeap's user-friendly interface, optimizing operations for everyone involved.</p>
        </div>
        <div className='first-right'>
          <img src={firstright} />
        </div>
        {/* <div className="custom-shape-divider-bottom-1698067825">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
          </svg>
        </div> */}
      </div>

      <div className='second-p'>
        <div className='second-left'>
          <img src={secondleft} />
        </div>
        <div className='second-right'>
          <h1><b>Efficiency</b> at your fingertips.</h1>
          <p>We revolutionize the management of fare remittances for jeepney cooperatives. Our innovative solution offers seamless automation and streamlined record-keeping, empowering workers with a user-friendly interface. Enhance productivity effortlessly, ensuring a smoother and more responsive cooperative experience. Discover the future of efficient fare management with JeepHeap.</p>
        </div>
        
      </div>

      <div className='third-p'>
        <div className='third-left'>
          <h1>Spend less time on <br></br>paperwork,and more time <br></br>on the road.</h1>
        </div>
      </div>

      <div className='footer'>

        <footer >
          <div class="footer-container">
            <div class="footer-column">
              <h3>Email Address</h3>
              <p>TeamSentinels@gmail.com</p>
            </div>
            <div class="footer-column">
              <h1>JeepHeap</h1>
              <hr></hr>
              <p>CONNECT WITH THE DEVELOPMENT TEAM</p>
              <div class="social-icons">

                <a href="https://www.facebook.com/SentinelsGG">
                  <img src={fblogo} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/sentinels/?hl=en">
                  <img src={iglogo} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/company/sentinels">
                  <img src={linkedlogo} alt="LinkedIn" />
                </a>
              </div>
            </div>
            <div class="footer-column">
              <h3>Address</h3>
              <p>Nasipit, Talamban, Cebu City</p>
              <h3>Contact Number</h3>
              <p>09123546789</p>
            </div>
          </div>
          <div class="footer-bottom">
            <center>
            © 2023
            </center>
          </div>
        </footer>
      </div>




    </div>

  );
};

export default Start;

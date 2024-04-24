// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated} from '../../redux/auth';
import PropTypes from 'prop-types';
import axios from 'axios';
import TextInput from '../../components/TextInput';
import ButtonLarge from '../../components/ButtonLarge';
import Logo from '../../assets/symbols/logo.svg'
import UNicon from './../../assets/icons/vector2_x2.svg';
import PWicon from './../../assets/icons/vector_x2.svg';
import BicycleSym from './../../assets/symbols/bicycle.svg';
import WaitingSymbol from '../../assets/symbols/tube-spinner.svg'

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [icon, setIcon] = useState(true);
  const dispatch = useDispatch();
  // const loading = useSelector((state) => state.authentication.loading);
  // const error = useSelector((state) => state.authentication.error);

  const handleUsernameChange = () => {
    const username = document.getElementById("input-username").value;
    setUsername(username);
    if (username.length >= 5) {
      setErrorMessage('');
    } else {
      setErrorMessage("Username must be at least 5 characters long.");
    }
  };
  
  const handlePasswordChange = () => {
    const inputPassword = document.getElementById("input-password").value;
    setPassword(inputPassword);
    if (inputPassword.length >= 5) {
      setErrorMessage1('');
    } else {
      setErrorMessage1("Password must be at least 5 characters long.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username == '' && password == '') {
      setErrorMessage('Please complete all fields');
    }else if(username.length < 6) {
      setErrorMessage('Invalid username');
    }else if(password.length < 6){
      setErrorMessage('Invalid password');
    }else{
        setIcon(false);
        axios.post("http://localhost:9999/api/v1/auth/authenticate", {
        username: username,
        password: password
      })
      .then(response => {
        if (response.status === 200) {
          //console.log(response.data);
          setPassword('');
          const state = {
            loginState: true,
            token: response.data.token
          }
          dispatch(setAuthenticated(state));
          //const token = response.data;
          //localStorage.setItem('JWT', token);
          onLogin()
        } else if (response.status === 403){
          // alert("Login failed, wrong user credentials");
          setErrorMessage("Wrong Username or Password");
          setIcon(true);
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("Error contacting server.");
        setIcon(true);
      });
    }  
  };

  const ErrorMessage = ({ message }) => {
    return (
      <div className="text-red-500">
        {message}
      </div>
    );
  };
  ErrorMessage.propTypes = {
    message: PropTypes.string
  };
  
  

  return (
    <div className=" bg-[#4285F4]
    lg:flex 
    w-full
    min-h-screen
    overflow-hidden
    ">
        <div className="
                    bg-[#FFFFFF]
                    relative
                    flex
                    flex-col
                    items-center
                    p-[20px_46px_95px_46px]
                    w-full
                    md:w-1/2
                    h-screen
                    ">
            <img src={Logo} className='
      self-start
      w-[140px]
      h-1/10' alt="" />
            <div className='
              flex-column
              p-[1px_40px_95px_40px]
              items-center
              text-center
              '>
              <span className="
              font-alata
              font-extrabold
              text-[76px]
              capitalize
              text-[#2F88FF]" style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                  BabySmile
              </span>
              <div className=' flex
              flex-col
              items-center
              w-[fit-content]
              box-sizing-border
              font-poppins'>
                  <div className="m-[0_42.8px_6px_0] 
                  inline-block 
                  break-words 
                  font-extrabold 
                  text-[22px] 
                  uppercase 
                  text-[#525252]">
                      internal portal
                  </div>
                  <div className="m-[0_0_21px_0] inline-block break-words font-normal text-[16px] text-[#525252]">
                      &#34;Welcome Back! Your Gateway to a World of Opportunities.&#34;
                  </div>
                  <div className=' flex
                                                            flex-col
                                                            items-center
                                                            w-[fit-content]
                                                            box-sizing-border'>
                      <>
                      {/* status here */}
                      </>
                      <ErrorMessage message={errorMessage} />
                      <TextInput
                          id={"input-username"}
                          type={"text"}
                          required={true}
                          icon={UNicon}
                          label="Username:"
                          onChange={handleUsernameChange}
                      />
                      <ErrorMessage message={errorMessage1} />
                      <TextInput
                      id={"input-password"}
                      icon={PWicon}
                      label="Password:"
                      type="password"
                      onChange={handlePasswordChange}
                      required={true}
                      />
                      <ButtonLarge onClick={handleSubmit}>
                          Login Now  
                      </ButtonLarge> 
                      <img className='w-[30px] absolute' src={WaitingSymbol} hidden={icon} />
                      <a href='#' className="m-[0_38px_0_0] 
                                            break-words 
                                            font-normal 
                                            text-[15px] 
                                            text-[#525252]
                                            hover:underline decoration-1
                                            ">
                          Terms of use. Privacy policy
                      </a>
                  </div>
              </div>
            </div>
        </div>
        <div className="
            bg-[#4285F4] 
            relative 
            justify-center 
            p-[305.3px_3.6px_226.7px_0]
            w-1/2
            h-full 
            ">
            <div className=" rounded-[46px] 
            bg-[rgba(255,255,255,0.21)] 
            absolute left-[50%] top-[20%] 
            translate-x-[-50%] 
            w-[352px] h-[321px] 
            items-center">
                <span className="
                absolute 
                left-[15%]
                top-[10%]
                font-poppins 
                font-semibold 
                text-[32px] 
                text-[#F4F2ED] 
                text-left
                ">
                &#34;Companion in <br /> every cycling <br /> trip, explore the <br /> world of <br /> children.&#34;
                </span>
            </div>
            <div className='absolute
                right-[-20px]
                w-[502px]
                h-[307px]'>
              <img className='' src={BicycleSym} alt="" />
            </div>
        </div>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func
};

export default LoginPage;

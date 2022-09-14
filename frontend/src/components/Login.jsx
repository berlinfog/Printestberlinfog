import React from "react"
// import GoogleLogin from "react-google-login"
import {useNavigate} from "react-router-dom"
import {FcGoogle} from "react-icons/fc"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import WatchVideo from '../assets/watchme.mp4';
import logo from '../assets/watchme_white.png';
import jwt_decode from "jwt-decode";
import { ImageUrlBuilder } from "@sanity/image-url";
import {client} from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    //user info 5MB per app
    var userObject = jwt_decode(response.credential);

    // localStorage.setItem('user',JSON.stringify(userObject));
    localStorage.setItem("user",JSON.stringify(userObject));
    const {name,picture,sub} = userObject;
    console.log(picture);
    //save into sanity
    const doc={
      _id:sub,
      _type:'user',  
      userName:name,
      image : picture,
    };
    client.createIfNotExists(doc).then(()=>{
      navigate("/",{replace:true})
    });

  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        {/*login video*/}
        <video src={WatchVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover" >
        </video>
        {/* overlay effect for the video*/}
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          {/* Login content */}
          {/* Logo */}
          <div className="p-5">
            <img src={logo} alt="logo" width="180px"></img>
          </div>
          {/* Login button */}
          <div className="shadow-2x1">

          <GoogleOAuthProvider clientId="461276584889-iadroap8h6em7t7mut1isf0220v3njva.apps.googleusercontent.com">
          <GoogleLogin clientId="" render={(renderProps)=>(
              <button type="button" className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}>
                <FcGoogle className="mr-4"/>
              </button>
            )}

            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
            // onSuccess={Response => {
            //   console.log(credentialResponse);
            // }}
            // onError={() => {
            //   console.log('Login Failed');
            // }}
            />
            
            
            </GoogleOAuthProvider>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
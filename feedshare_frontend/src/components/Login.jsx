import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logoWhite.png";
import jwt_decode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  //define navigate as a funcion
  const navigate = useNavigate();

  //handles google response
  const responseGoogle = (response) => {
    //function below decodes google reponse. jwt is needed in new google oauth
    createOrGetUser(response).then((decode) => {
      const { name, picture, sub } = decode;
      localStorage.setItem("user", JSON.stringify(decode));
      const doc = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };

      //saves doc into sanity db and redirects
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    });
  };

  //decodes google response
  const createOrGetUser = async (response) => {
    const decode = jwt_decode(response.credential);
    return decode;
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      {/* loads .mp4 fullscreen */}
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        {/* This parent container handles google login and logo */}
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          {/* Shows logo */}
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          {/* Handles logging in */}
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with google
                  </button>
                )}
                onSuccess={responseGoogle}
                onError={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

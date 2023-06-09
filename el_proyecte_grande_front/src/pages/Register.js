import React, { useEffect, useState } from "react";
import "../style/Register.css";
import cocktail from "../images/ash-edmonds-fsI-_MRsic0-unsplash.jpg";
import AlertWithProgressBar from "./AlertWithProgressBar.js";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");
  const [showGoodAlert, setShowGoodAlert] = useState(false);
  const [showBadAlert, setShowBadAlert] = useState(false);

  function getData(event) {
    event.preventDefault();
    console.log(event.target.username.value);
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    addUserToDatabase(event);
  }

  const addUserToDatabase = async (event) => {
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${event.target.email.value}`,
        username: `${event.target.username.value}`,
        password: `${event.target.password.value}`,
      }),
    };

    const response = await fetch(
      `https://localhost:7090/add-user`,
      requestOption
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!responseData.isSuccess) {

      let messageErrors = "";
      if (!responseData?.errors) {
        messageErrors = responseData?.message 
      }
      else {
        
        responseData?.errors?.forEach((error) => {
            messageErrors += "\r" + error.description;
          
        });
      }
      setAlertMessage(messageErrors);

      setShowBadAlert(true);
    } else {
      setAlertMessage("You sucessfully Registered!");
      setShowGoodAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  useEffect(() => {
    const container = document.querySelector("#registerContainer");
    container.classList.add("show");
  }, []);

  return (
    <div
      id="cocktailImage"
      style={{
        backgroundImage: `url(${cocktail})`,
        width: "100%",
        padding: "0px",
        height: "100%",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        fontSize: 30,
      }}
    >
      {showGoodAlert && (
        <AlertWithProgressBar
          title="Succes"
          severity="success"
          children={alertMessage}
          time="1000"
          onClose={setShowGoodAlert}
        />
      )}
      {showBadAlert && (
        <AlertWithProgressBar
          title="Error"
          severity="error"
          children={alertMessage}
          time="1000"
          onClose={setShowBadAlert}
        />
      )}
      <div id="registerContainer">
        <div className="brown-div"></div>
        <div className="form" style={{ color: "white" }}>
          <form onSubmit={getData}>
            <div className="inline"></div>
            <label htmlFor="Username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="user"
              required
            ></input>
            <div />

            <div className="inline"></div>
            <label htmlFor="Email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
            ></input>
            <div />

            <div className="inline"></div>
            <label htmlFor="Password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="pass"
              required
            ></input>
            <div />

            <div className="btn">
              <button type="submit" id="registerButton">
                {" "}
                Register{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;


// import React, { useState, useEffect } from "react";
// import "./login.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [lockoutTime, setLockoutTime] = useState(0);  // Track the remaining time
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

//   useEffect(() => {
//     // If lockout time is set, start the countdown
//     let timer;
//     if (lockoutTime > 0) {
//       timer = setInterval(() => {
//         setLockoutTime(prevTime => prevTime - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);  // Clean up the timer on unmount
//   }, [lockoutTime]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:3001/login", { email, password })
//       .then((result) => {
//         if (result.data.Status === "Success") {
//           if (result.data.role !== "user") {
//             navigate("/admin");
//           } else {
//             navigate("/home");
//           }
//         } else {
//           // If the response contains lockout time, set the countdown
//           if (result.data.includes("Try again in")) {
//             const match = result.data.match(/\d+/);
//             if (match) {
//               setLockoutTime(parseInt(match[0]));
//             }
//           }

//           setEmail("");
//           setPassword("");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // Format remaining lockout time in minutes and seconds
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}m ${seconds}s`;
//   };

//   return (
//     <div className="addUser">
//       <h3>Sign In</h3>
//       <form onSubmit={handleSubmit} className="addUserForm">
//         <div className="inputGroup">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             autoComplete="off"
//             placeholder="Enter your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             autoComplete="off"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </div>
//       </form>

//       {lockoutTime > 0 && (
//         <div className="alert" style={{ color: "red", marginTop: "10px" }}>
//           Please wait before trying again. Time left: {formatTime(lockoutTime)}.
//         </div>
//       )}

//       <div className="login">
//         <p>Don't have an account?</p>
//         <Link to="/register" type="button" className="btn btn-success">
//           Sign up
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("login"); // 'login' | 'otp'
  const [error, setError] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [lockoutEnd, setLockoutEnd] = useState(
    localStorage.getItem("lockoutEnd") || 0
  );
  const [remainingTime, setRemainingTime] = useState(0);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // ⏱️ Timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const end = parseInt(lockoutEnd);
      const remaining = end > now ? Math.ceil((end - now) / 1000) : 0;

      setRemainingTime(remaining);

      if (remaining === 0) {
        localStorage.removeItem("lockoutEnd");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutEnd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "login") {
      try {
        const res = await axios.post("http://localhost:3001/login", {
          email,
          password,
        });

        console.log("Backend Response:", res.data);

        if (res.data.Status === "Success") {
          if (res.data.step === "otp") {
            setStep("otp");
            setTempToken(res.data.tempToken);
            setError("");
          } else {
            navigate(res.data.role !== "user" ? "/admin" : "/home");
          }
        } else {
          setError(res.data.message || "Login failed");

          if (res.data.lockoutTime) {
            const end = Date.now() + res.data.lockoutTime * 1000;
            setLockoutEnd(end);
            localStorage.setItem("lockoutEnd", end);
          }
        }
      } catch (err) {
        console.log("Login error response:", err.response);
        setError(err?.response?.data?.message || "Login failed.");
      }
    } else if (step === "otp") {
      try {
        const res = await axios.post("http://localhost:3001/verify-otp", {
          email,
          otp,
          tempToken,
        });

        if (res.data.Status === "Success") {
          navigate(res.data.role !== "user" ? "/admin" : "/home");
        } else {
          setError(res.data.message || "Incorrect OTP.");
          setOtp("");
        }
      } catch (err) {
        console.log("OTP verification error:", err.response);
        setError(err?.response?.data?.message || "OTP verification failed.");
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  return (
    <div className="addUser">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step === "otp"}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={step === "otp"}
          />

          {step === "otp" && (
            <>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                autoComplete="off"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={remainingTime > 0}
          >
            {step === "login" ? "Login" : "Verify OTP"}
          </button>
        </div>
      </form>

      {remainingTime > 0 && (
        <div className="alert" style={{ color: "red", marginTop: "10px" }}>
          Please wait before trying again. Time left: {formatTime(remainingTime)}
        </div>
      )}

      {error && (
        <div className="alert" style={{ color: "red", marginTop: "10px" }}>
          {error}
        </div>
      )}

      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/register" className="btn btn-success">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;




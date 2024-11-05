import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";
import "./Login.css";
import login from "../../assets/login.png";
import logo from "../../assets/logo-web.png";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email là bắt buộc.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Mật khẩu là bắt buộc.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      console.log("Form Values:", { email, password });
      try {
        const response = await axios.post(loginRoute, { email, password });
        console.log(response.data); // Log response để kiểm tra
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        } else if (response.data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(response.data.user)
          );
          setValues({ email: "", password: "" }); // Reset state
          navigate("/");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.", toastOptions);
      }
    }
  };

  const handleFocus = (name) => {
    setIsFocused({ ...isFocused, [name]: true });
  };

  const handleBlur = (name) => {
    setIsFocused({ ...isFocused, [name]: false });
  };

  return (
    <div className="login">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div style={{ padding: 0, margin: 0 }} className="col-md-6">
              <img className="login-img" src={login} alt="login" />
            </div>
            
            <div
              style={{ padding: 0, margin: 0 }}
              className="col-md-6 login-right"
            >
              <img src={logo} alt="logo" />
              <div className="d-flex flex-column text-center" style={{ marginTop: 200, marginRight: 70 }}>
                <h1 style={gradientTextStyle}>ChatWave</h1>
                <span style={{color:"#626262", marginBottom:40}}>Đăng nhập bằng tài khoản Chatwave</span>
                <div className="input-item" style={{ position: "relative" }}>
                  <input
                    type="email"
                    name="email"  
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
                  <div
                    className={`b ${values.email !== "" || isFocused.email ? "active1" : ""}`}
                  >
                    Email
                  </div>
                </div>
                <div className="input-item" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />
                  <div
                    className={`b ${values.password !== "" || isFocused.password ? "active1" : ""}`}
                  >
                    Mật khẩu
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: "none",
                      border: "none",
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer"
                    }}
                  >
                    <i className={`fas fassignIn ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
                <button className="button-login" type="submit">Đăng nhập</button>
                <div style={{ fontSize: 20, marginTop: 50 }}>
                  Bạn chưa có tài khoản?
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <span style={signIn}>Đăng ký</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const gradientTextStyle = {
  background: 'linear-gradient(90deg, #F5C46A, #FA8DAE)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  marginTop: '-100px',
};
const signIn = {
  background: 'linear-gradient(90deg, #F5C46A, #FA8DAE)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  marginLeft: '5px'
};

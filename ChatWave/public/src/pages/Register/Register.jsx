import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../../utils/APIRoutes";
import login from "../../assets/login.png";
import logo from "../../assets/logo-web.jpg";
import "./Register.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email, phone } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Mật khẩu và nhập lại mật khẩu phải giống nhau.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Tên đăng nhập phải lớn hơn 3 ký tự.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự.",
        toastOptions
      );
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email không hợp lệ.", toastOptions);
      return false;
    } else if (phone === "") {
      toast.error("Số điện thoại là bắt buộc.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password, phone } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          phone,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/login");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.", toastOptions);
      }
    }
  };

  const handleFocus = (name) => {
    setIsFocused((prevIsFocused) => ({
      ...prevIsFocused,
      [name]: true,
    }));
  };

  const handleBlur = (name) => {
    setIsFocused((prevIsFocused) => ({
      ...prevIsFocused,
      [name]: false,
    }));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <ToastContainer />
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
              <div
                className="d-flex flex-column text-center"
                style={{ marginTop: 150, marginRight: 70 }}
              >
                <h1 style={gradientTextStyle}>ChatWave</h1>
                <span style={{ color: "#626262", marginBottom: 10 }}>
                  Đăng ký tài khoản Chatwave của bạn
                </span>
                <div className="input-item1">
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onFocus={() => handleFocus("username")}
                    onBlur={() => handleBlur("username")}
                  />
                  <div
                    className={`a ${
                      values.username !== "" || isFocused.username
                        ? "active"
                        : ""
                    }`}
                  >
                    Tên đăng nhập
                  </div>
                </div>
                <div className="input-item1">
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
                  <div
                    className={`a ${
                      values.email !== "" || isFocused.email ? "active" : ""
                    }`}
                  >
                    Email
                  </div>
                </div>
                <div className="input-item1">
                  <input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                  />
                  <div
                    className={`a ${
                      values.phone !== "" || isFocused.phone ? "active" : ""
                    }`}
                  >
                    Số điện thoại
                  </div>
                </div>
                <div className="input-item1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />
                  <div
                    className={`a ${
                      values.password !== "" || isFocused.password
                        ? "active"
                        : ""
                    }`}
                  >
                    Mật khẩu
                  </div>
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`fas eyesignIn ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </div>
                <div style={{ position: "relative" }} className="input-item1">
                  <input
                    type={showconfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                  />
                  <div
                    className={`a ${
                      values.confirmPassword !== "" || isFocused.confirmPassword
                        ? "active"
                        : ""
                    }`}
                  >
                    Nhập lại mật khẩu
                  </div>
                  <i
                    onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                    className={`fas eyesignIn ${
                      showconfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </div>

                <button className="button button-signIn" type="submit">
                  Đăng kí
                </button>
                <div style={{ fontSize: 20, marginTop: 20 }}>
                  Bạn đã có tài khoản?
                  <Link style={{ textDecoration: "none" }} to="/login">
                    <span style={signUp}>Đăng nhập</span>
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
  background: "linear-gradient(90deg, #F5C46A, #FA8DAE)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  marginTop: "-70px",
};
const signUp = {
  background: "linear-gradient(90deg, #F5C46A, #FA8DAE)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  marginLeft: "5px",
  marginTop: "10px",
};

// src/__tests__/Register.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register/Register";// Đảm bảo đường dẫn chính xác
import axios from "axios";

// Mock axios để không gọi thật API
jest.mock("axios");

test("should display error when email already used", async () => {
  // Giả lập phản hồi từ API khi email đã tồn tại
  axios.post.mockResolvedValue({
    data: { status: false, msg: "Email already used" },
  });

  render(<Register />);

  // Tìm các input và button trong form
  const usernameInput = screen.getByPlaceholderText(/Tên người dùng/i);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Mật khẩu/i);
  const confirmPasswordInput = screen.getByPlaceholderText(/Nhập lại mật khẩu/i);
  const phoneInput = screen.getByPlaceholderText(/Số điện thoại/i);
  const submitButton = screen.getByText(/Đăng ký/i);

  // Điền dữ liệu vào form
  fireEvent.change(usernameInput, { target: { value: "newUser" } });
  fireEvent.change(emailInput, { target: { value: "existing@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  fireEvent.change(phoneInput, { target: { value: "1234567890" } });

  // Gửi form
  fireEvent.click(submitButton);

  // Kiểm tra thông báo lỗi từ API
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/register",  // Đảm bảo URL chính xác
      {
        username: "newUser",
        email: "existing@example.com",
        password: "password123",
        phone: "1234567890",
      }
    );
    expect(screen.getByText("Email already used")).toBeInTheDocument();  // Kiểm tra thông báo lỗi
  });
});

test("should navigate to login page on successful registration", async () => {
  // Giả lập phản hồi thành công từ API
  axios.post.mockResolvedValue({
    data: { status: true, user: { username: "newUser" } },
  });

  render(<Register />);

  // Tìm các input và button trong form
  const usernameInput = screen.getByPlaceholderText(/Tên người dùng/i);
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Mật khẩu/i);
  const confirmPasswordInput = screen.getByPlaceholderText(/Nhập lại mật khẩu/i);
  const phoneInput = screen.getByPlaceholderText(/Số điện thoại/i);
  const submitButton = screen.getByText(/Đăng ký/i);

  // Điền dữ liệu vào form
  fireEvent.change(usernameInput, { target: { value: "newUser" } });
  fireEvent.change(emailInput, { target: { value: "newuser@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  fireEvent.change(phoneInput, { target: { value: "1234567890" } });

  // Gửi form
  fireEvent.click(submitButton);

  // Kiểm tra phản hồi và điều hướng
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/register",  // Đảm bảo URL chính xác
      {
        username: "newUser",
        email: "newuser@example.com",
        password: "password123",
        phone: "1234567890",
      }
    );
    expect(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).toBeTruthy();  // Kiểm tra thông tin user có lưu vào localStorage
  });
});

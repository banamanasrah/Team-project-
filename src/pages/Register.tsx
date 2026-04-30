import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import React from "react";

// --- THEME (same as login) ---
const theme = {
  bg: "#F5F5F5",
  cardBg: "#FFFFFF",
  primary: "#000000",
  textMuted: "#7A7A7A",
  accent: "#C29B8C",
  inputBg: "#F9FAFB",
  borderRadius: "40px",
  inputRadius: "15px",
};

// --- STYLES ---
const containerStyle: React.CSSProperties = {
  backgroundColor: theme.bg,
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "serif",
  boxSizing: "border-box",
};


const cardStyle: React.CSSProperties = {
  backgroundColor: theme.cardBg,
  padding: "50px",
  borderRadius: theme.borderRadius,
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
  width: "100%",
  maxWidth: "450px",
};


const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#000000",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "6px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: theme.inputRadius,
  border: "1px solid #E5E7EB",
  backgroundColor: theme.inputBg,
  fontSize: "15px",
  color: "#333",
  outline: "none",
  marginBottom: "18px",
  boxSizing: "border-box",
};

const titleStyle: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#000000",
};

const subtitleStyle: React.CSSProperties = {
  color: theme.textMuted,
  marginBottom: "25px",
};

// --- COMPONENT ---
const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkRegisterFormData(data)) return;

    const users = await customFetch.get("/users");

    const userExists = users.data.some(
      (user: { email: string }) => user.email === data.email
    );

    if (userExists) {
      toast.error("User with this email already exists");
      return;
    }

    const response = await customFetch.post("/users", data);

    if (response.status === 201) {
      toast.success("User registered successfully");
      navigate("/login");
    } else {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>

        {/* TITLE */}
        <h1 style={titleStyle}>Register</h1>
        <p style={subtitleStyle}>Create your account to get started.</p>

        {/* FORM */}
        <form onSubmit={handleRegister}>

          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            style={inputStyle}
          />

          <label style={labelStyle}>Lastname</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your lastname"
            style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={inputStyle}
          />

          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            style={inputStyle}
          />

          {/* BUTTON with your light gray style */}
          <div
            style={{
              backgroundColor: "#e5e7eb",
              borderRadius: "50px",
              overflow: "hidden",
              marginTop: "10px",
            }}
          >
            <Button type="submit" text="Register" mode="brown" />
          </div>

        </form>

        {/* LINK */}
        <p style={{ marginTop: "25px", color: theme.textMuted }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: theme.accent, fontWeight: 700, textDecoration: "none" }}
          >
            Login now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
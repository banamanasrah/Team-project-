import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import React from "react";

const theme = {
  bg: "#F5F5F5",
  cardBg: "#FFFFFF",
  textMuted: "#7A7A7A",
  accent: "#C29B8C",
  inputBg: "#F9FAFB",
  borderRadius: "40px",
  inputRadius: "15px",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: theme.bg,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "serif",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: theme.cardBg,
  padding: "40px",
  borderRadius: theme.borderRadius,
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
  width: "100%",
  maxWidth: "440px",
};
const titleStyle: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#000",
};

const subtitleStyle: React.CSSProperties = {
  color: theme.textMuted,
  marginBottom: "25px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#000",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "6px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: theme.inputRadius,
  border: "1px solid #E5E7EB",
  backgroundColor: theme.inputBg,
  fontSize: "15px",
  outline: "none",
  marginBottom: "16px",
};
const Register = () => {
  const navigate = useNavigate();

  // ✅ FIXED REGISTER HANDLER
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkRegisterFormData(data)) return;

    try {
      const users = await customFetch.get("/users");

      const exists = users.data.find(
        (u: any) => u.email === data.email
      );

      if (exists) {
        toast.error("Email already exists");
        return;
      }

      const response = await customFetch.post("/users", data);

      if (response.status === 201) {
        toast.success("Account created successfully");

        // ✅ IMPORTANT FIX: go to login page
        navigate("/login");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Register</h1>
        <p style={subtitleStyle}>Create your account</p>

        {/* ✅ MUST HAVE onSubmit */}
        <form onSubmit={handleRegister}>
          <label style={labelStyle}>Name</label>
          <input type="text" name="name" placeholder="Enter name" style={inputStyle} />

          <label style={labelStyle}>Lastname</label>
          <input type="text" name="lastname" placeholder="Enter lastname" style={inputStyle} />

          <label style={labelStyle}>Email</label>
          <input type="email" name="email" placeholder="Enter email" style={inputStyle} />

          <label style={labelStyle}>Password</label>
          <input type="password" name="password" placeholder="Enter password" style={inputStyle} />

          <label style={labelStyle}>Confirm Password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm password" style={inputStyle} />

          <div style={{ marginTop: "10px" }}>
            <Button type="submit" text="Register" mode="brown" />
          </div>
        </form>
        <p style={{ marginTop: "20px", color: theme.textMuted }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: theme.accent, fontWeight: 700 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
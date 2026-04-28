
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import React from "react";

// --- THEME ---
const theme = {
  bg: "#F5F5F5", // very light gray
  cardBg: "#FFFFFF",
  primary: "#5E4D44",
  textMuted: "#7A7A7A",
  accent: "#C29B8C",
  inputBg: "#F9FAFB",
  borderRadius: "40px",
  inputRadius: "15px",
};

// --- STYLES (FIXED with React.CSSProperties) ---
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
  color: "#000000", // ← make labels black
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
  color: "#000000", // black
};

const subtitleStyle: React.CSSProperties = {
  color: theme.textMuted,
  marginBottom: "25px",
};

// --- LOGIN COMPONENT ---
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkLoginFormData(data)) return;

    const users = await customFetch.get("/users");

    let userId: number = 0;

    const userExists = users.data.some(
      (user: { id: number; email: string; password: string }) => {
        if (user.email === data.email) {
          userId = user.id;
        }
        return user.email === data.email && user.password === data.password;
      }
    );

    if (userExists) {
      toast.success("You logged in successfully");
      localStorage.setItem("user", JSON.stringify({ ...data, id: userId }));
      store.dispatch(setLoginStatus(true));
      navigate("/user-profile");
    } else {
      toast.error("Please enter correct email and password");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      toast.success("You are already logged in");
      navigate("/user-profile");
    }
  }, [navigate]);

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>

        {/* TITLE */}
        <h1 style={titleStyle}>Login</h1>
        <p style={subtitleStyle}>Welcome back, please login to continue.</p>

        {/* FORM */}
        <form onSubmit={handleLogin}>

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

          <div style={{ marginTop: "10px" }}>
  <Button
    type="submit"
    text="Login"
    mode="brown"
    style={{
    
      color: "#000",
      border: "none",
    }}
  />
</div>

        </form>

        {/* LINK */}
        <p style={{ marginTop: "25px", color: theme.textMuted }}>
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{ color: theme.accent, fontWeight: 700, textDecoration: "none" }}
          >
            Register now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
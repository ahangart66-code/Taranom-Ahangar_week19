import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api.js";
import logo from "../assets/logo.png";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => loginUser(username, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      navigate("/products");
    },
    onError: (err) => {
      if (err.status === 400 || err.status === 401) {
        setError("نام کاربری یا رمز عبور اشتباه است. اول ثبت نام کنید.");
        return;
      }
      setError("ورود انجام نشد. مطمئن شو API روی پورت ۳۰۰۰ روشن است.");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    loginMutation.mutate();
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.brand}>بوت کمپ بوتواستارت</h1>

      <div className={styles.card}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h2>فرم ورود</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.btn} disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <Link to="/register" className={styles.footer}>
          !ایجاد حساب کاربری
        </Link>
      </div>
    </div>
  );
}

export default Login;

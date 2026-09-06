import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api.js";
import logo from "../../assets/logo.png";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(username, password);

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        navigate("/products");
        return;
      }

      if (res.status === 400 || res.status === 401) {
        setError("نام کاربری یا رمز عبور اشتباه است. اول ثبت نام کنید.");
        return;
      }

      setError("ورود انجام نشد. مطمئن شو API روی پورت ۳۰۰۰ روشن است.");
    } catch {
      setError("ارتباط با سرور برقرار نشد. API را روی localhost:3000 اجرا کن.");
    } finally {
      setLoading(false);
    }
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

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
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

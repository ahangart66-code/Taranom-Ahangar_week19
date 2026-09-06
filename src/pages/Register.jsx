import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api.js";
import logo from "../../assets/logo.png";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    if (password !== passwordRepeat) {
      setError("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser(username, password);

      if (res.ok) {
        navigate("/login");
        return;
      }

      if (res.status === 400 || res.status === 409) {
        setError("این نام کاربری قبلاً ثبت شده است.");
        return;
      }

      setError("ثبت نام انجام نشد. مطمئن شو API روی پورت ۳۰۰۰ روشن است.");
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
        <h2>فرم ثبت نام</h2>

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
          <input
            className={styles.input}
            type="password"
            placeholder="تکرار رمز عبور"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "در حال ثبت نام..." : "ثبت نام"}
          </button>
        </form>

        <Link to="/login" className={styles.footer}>
          حساب کاربری دارید؟
        </Link>
      </div>
    </div>
  );
}

export default Register;

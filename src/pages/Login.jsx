import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/products");
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.brand}>بوت کمپ بوتواستارت</h1>

      <div className={styles.card}>
        <img src={logo} alt="لوگو بوتواستارت" className={styles.logo} />
        <h2>فرم ورود</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" placeholder="نام کاربری" />
          <input className={styles.input} type="password" placeholder="رمز عبور" />

          <button type="submit" className={styles.btn}>
            ورود
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

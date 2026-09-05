import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.brand}>بوت کمپ بوتواستارت</h1>

      <div className={styles.card}>
        <img src={logo} alt="لوگو بوتواستارت" className={styles.logo} />
        <h2>فرم ثبت نام</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type="text" placeholder="نام کاربری" />
          <input className={styles.input} type="password" placeholder="رمز عبور" />
          <input className={styles.input} type="password" placeholder="تکرار رمز عبور" />

          <button type="submit" className={styles.btn}>
            ثبت نام
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

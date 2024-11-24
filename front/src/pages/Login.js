import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      valid = false;
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "/login",
        { email, password },
        {
          withCredentials: true, // 세션 쿠키 사용 설정
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // 로그인 성공 시 메인 페이지로 이동
        navigate("/favorite");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "로그인에 실패했습니다.";
      setPasswordError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h2 className={styles.heading}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className={styles.input}
              placeholder="이메일 입력"
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className={styles.input}
              placeholder="비밀번호 입력"
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
          <div className={styles.links}>
            <a href="/find-id" className={styles.link}>
              아이디 찾기
            </a>{" "}
            |
            <a href="/find-password" className={styles.link}>
              비밀번호 찾기
            </a>{" "}
            |
            <a href="/signup" className={styles.link}>
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

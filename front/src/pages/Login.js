import React, { useEffect, useState } from "react";
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

  // Ver. 로컬 사용자 검증
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // JSON 파일에서 사용자 정보를 가져옴
    const fetchUsers = async () => {
      try {
        const response = await fetch("/json/member.json");
        const data = await response.json();
        setUsers(data.member); // 사용자 정보를 상태에 저장
      } catch (error) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchUsers();
  }, []);

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

    // Ver. Back-end 협업
    try {
      const response = await axios.post(
        "/api/login",
        { email, password },
        {
          // withCredentials: true, // 세션 쿠키 사용 설정
          headers: { "Content-Type": "application/json" },
        }
      );

      // 로그인 성공 시 사용자 고유 ID를 받아옴
      if (response.status === 200) {
        const member = response.data; // 서버에서 받은 사용자 정보
        localStorage.setItem("member", JSON.stringify(member)); // 로컬 스토리지에 저장

        // 로그인 성공 시 메인 페이지로 이동
        navigate(`/`);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "로그인에 실패했습니다.";
      setPasswordError(errorMessage);
    } finally {
      setLoading(false);
    }

    // Ver. 로컬 사용자 검증
    const member = users.find(
      (member) => member.email === email && member.password === password
    );
    
    if (member) {
      // 로그인 성공 시 사용자 정보를 localStorage에 저장
      localStorage.setItem("member", JSON.stringify(member));
    
      // 로그인 성공 시 메인 페이지로 이동
      navigate("/");
    } else {
      setPasswordError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
    
    setLoading(false);
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

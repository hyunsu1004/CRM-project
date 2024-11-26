import React, { useState } from "react";
import "../styles/SignupForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    emailName: "",
    emailDomain: "",
    password: "",
    passcheck: false,
    passwordcheck: "",
    phonenum: "",
    id: "",

    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passcheck: false,
    passwordcheck: "",
    phonenum: "",
    id: "",
    birthdate: "",

    domain: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 상태

  // 로컬에서 사용할 임시 이메일 목록
  const existingEmails = [
    "test@gmail.com",
    "admin@naver.com",
    "user@yahoo.com",
  ];
  const handleCheckEmail = async () => {
    const email = `${formData.emailName}@${formData.emailDomain}`;

    // 이메일 입력 여부 확인
    if (!formData.emailName || !formData.emailDomain) {
      setErrors((prev) => ({
        ...prev,
        email: "이메일 입력 및 도메인을 선택해주세요.",
      }));
      setIsEmailChecked(false);
      return;
    }

    try {
      // 백엔드로 이메일 전송
      const response = await axios.post(
          "http://localhost:8080/api/check-email",
          { emailName: formData.emailName,
            emailDomain: formData.emailDomain },
          { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // 이메일이 이미 존재하는 경우
        setErrors((prev) => ({ ...prev, email: "" }));
        alert("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
      }
    } catch (err) {
      console.error("중복 확인 실패:", err.response || err.message);
      alert("중복된 이메일입니다.");
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { name: "", email: "", password: "" };
    // if (!formData.email) {
    //   formIsValid = false;
    //   newErrors.email = "이메일을 입력해주세요.";
    // }

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "이름을 입력해 주세요.";
    }

    // if (!formData.email) {
    //   formIsValid = false;
    //   newErrors.email = "이메일을 입력해 주세요.";
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   formIsValid = false;
    //   newErrors.email = "유효한 이메일 주소를 입력해 주세요.";
    // }

    if (!formData.password) {
      formIsValid = false;
      newErrors.password = "비밀번호를 입력해 주세요.";
    } else if (formData.password.length < 8) {
      formIsValid = false;
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }
    if (formData.password !== formData.passwordcheck) {
      formIsValid = false;
      newErrors.passwordcheck = "비밀번호가 일치하지 않습니다.";
    }
    if (!formData.emailName) {
      formIsValid = false;
      newErrors.emailName = "이메일을 입력해 주세요.";
    }

    if (!formData.emailDomain) {
      formIsValid = false;
      newErrors.emailDomain = "                도메인을 선택해 주세요.";
    }
    if (!formData.emailName && !formData.emailDomain) {
      formIsValid = false;
      newErrors.emailName = "";
      newErrors.emailDomain = "이메일 입력 및 도메인을 선택해주세요.";
    }
    if (!formData.phonenum) {
      formIsValid = false;
      newErrors.phonenum = "전화번호를 입력해 주세요.";
    }
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      formIsValid = false;
      newErrors.birthYear = "생년월일을 완성해 주세요.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailChecked) {
      alert("이메일 중복 확인을 진행해주세요.");
      return;
    }
    if (formData.password !== formData.passwordcheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
          "http://localhost:8080/api/signup",
          {
            name: formData.name,
            emailName: formData.emailName,
            emailDomain: formData.emailDomain,
            password: formData.password,
            phonenum: formData.phonenum,
          },
          {
            // withCredentials: true, // 세션 쿠키 사용 설정
            headers: { "Content-Type": "application/json" },
          }
      );

      if (response.status === 200) {
        alert("회원가입 성공!");
        console.log("회원가입 정보:", formData);
        setFormData({
          name: "",
          emailName: "",
          emailDomain: "",
          password: "",
          phonenum: "",
        });
        setIsEmailChecked(false);
        navigate("/");
      }
    } catch (err) {
      alert("회원가입 실패: " + err.response?.data || "서버 오류");
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDomainChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      emailDomain: value !== "custom" ? value : "",
    }));
  };

  return (
      <div className="signup-form">
        <h2>회원가입</h2>

        <form onSubmit={handleSubmit}>
          <label>이메일</label>
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

          <div className="id-container">
            {errors.emailName && (
                <span style={{ color: "red" }}>{errors.emailName}</span>
            )}
            {errors.emailDomain && (
                <span style={{ color: "red" }}>{errors.emailDomain}</span>
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                  type="text"
                  name="emailName"
                  placeholder="이메일 입력"
                  value={formData.emailName}
                  onChange={handleChange}
              />
              <span>@</span>
              <select
                  type="text"
                  className="dropdown"
                  name="domainSelect"
                  value={formData.emailDomain}
                  onChange={handleDomainChange}
              >
                <option value="custom">직접 입력</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="yahoo.com">yahoo.com</option>
              </select>
            </div>
            <button
                type="button"
                className="check-button"
                onClick={handleCheckEmail}
            >
              중복확인
            </button>
          </div>
          <label>비밀번호</label>

          <div>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
            />
          </div>
          <label>비밀번호확인</label>
          {errors.password && (
              <span style={{ color: "red" }}>{errors.passwordcheck}</span>
          )}
          <div>
            <input
                type="password"
                name="passwordcheck"
                value={formData.passwordcheck}
                onChange={handleChange}
                placeholder="비밀번호 재입력"
            />
          </div>
          <label>이름</label>
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          <div>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름 입력"
            />
          </div>
          <label>전화번호</label>
          {errors.phonenum && (
              <span style={{ color: "red" }}>{errors.phonenum}</span>
          )}
          <div>
            <input
                type="text"
                name="phonenum"
                value={formData.phonenum}
                onChange={handleChange}
                placeholder="전화번호 입력"
            />
          </div>

          <div className="button-group">
            <button type="button" className="cancel-button">
              취소
            </button>
            <button type="submit" className="submit-button">
              가입
            </button>
          </div>
        </form>
      </div>
  );
}

export default SignupPage;

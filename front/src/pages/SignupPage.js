import React, { useState } from "react";
import "../styles/SignupForm.css";
function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { name: "", email: "", password: "" };
    if (!formData.id) {
      formIsValid = false;
      newErrors.id = "아이디를 입력해주세요.";
    }

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "이름을 입력해 주세요.";
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = "이메일을 입력해 주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = "유효한 이메일 주소를 입력해 주세요.";
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("회원가입 성공!");
      console.log("회원가입 정보:", formData);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const handleDomainChange = (e) => {
    const { value } = e.target;
    if (value !== "custom") {
      setFormData({
        ...formData,
        emailDomain: value,
      });
    }
  };

  return (
    <div className="signup-form">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit}>
        <label>아이디</label>
        {errors.id && <span style={{ color: "red" }}>{errors.id}</span>}

        <div className="id-container">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디입력(8~20자)"
            className="id-input"
          />
          <button type="button" className="check-button">
            중복확인
          </button>
        </div>
        <label>비밀번호</label>

        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
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

        <label>이메일</label>
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
            onChange={handleDomainChange}
          >
            <option value="custom">직접 입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="yahoo.com">yahoo.com</option>
          </select>
        </div>
        <label htmlFor="birthdate">생년월일</label>
        {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
          <span style={{ color: "red" }}>{errors.birthYear}</span>
        )}

        <div className="form-group">
          <div className="birthdate-group">
            <select
              name="birthYear"
              className="dropdown"
              value={formData.birthYear}
              onChange={handleChange}
            >
              <option value="" disabled>
                년
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="dropdown"
              name="birthMonth"
              onChange={handleChange}
              value={formData.birthMonth}
            >
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="birthDay"
              className="dropdown"
              value={formData.birthDay}
              onChange={handleChange}
            >
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
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

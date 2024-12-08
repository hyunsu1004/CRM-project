import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../img/double_arrow_left.svg";
import { ReactComponent as RightArrow } from "../img/double_arrow_right.svg";
import { ReactComponent as LoginImg } from "../img/login.svg";
import { ReactComponent as LogoMainImg1 } from "../img/CLODGE_main_horizon_v1.svg";
import { ReactComponent as LogoMainImg2 } from "../img/CLODGE_main_horizon_v2.svg";
import { ReactComponent as LogoMiniImg } from "../img/CLODGE_mini.svg";
import { ReactComponent as LightModeImg } from "../img/light_mode.svg";
import { ReactComponent as DarkModeImg } from "../img/dark_mode.svg";
import { ReactComponent as CloseIcon } from "../img/close.svg";
import { ReactComponent as SettingIcon } from "../img/setting.svg";
import { ReactComponent as LogoutIcon } from "../img/logout.svg";
import Menubar from "./Menubar";
import styles from "../styles/layout.module.css"; // 여기에 CSS 스타일 추가
import profile from "../styles/profile.module.css"; // 여기에 CSS 스타일 추가
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import "../styles/popper.css";
import { height } from "@fortawesome/free-solid-svg-icons/faArrowDown";

// 사용자 이름에 따른 프로필 사진 자동지정
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    // 이름이 1.두단어 형태 : 각단어의 맨앞 2.한단어 형태 : 맨앞
    children: name.includes(" ")
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : `${name[0]}`,
  };
}

const Layout = ({ children, member }) => {
  // 로그아웃
  const navigate = useNavigate(); // useNavigate 초기화
  const handleLogout = () => {
    localStorage.removeItem("member"); // localStorage에서 member data  삭제
    navigate("/login"); // Redirect to login page
  };

  // 사이드바가 열려 있는지 여부를 관리하는 상태
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 관리

  // `ref`를 통해 DOM 요소 직접 접근
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setOpen(false);
  };

  // 다크 모드 함수
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // 상태를 반전시켜서 다크 모드 토글
  };

  // 사이드바 가시성에 따라 메인 콘텐츠의 여백을 조정
  useEffect(() => {
    if (mainRef.current && sidebarRef.current) {
      mainRef.current.style.width = isSidebarVisible
        ? "calc(100% - 240px)"
        : "calc(100% - 80px)";
      sidebarRef.current.style.width = isSidebarVisible ? "240px" : "80px";

      const anchors = sidebarRef.current.querySelectorAll("a");
      if (anchors) {
        anchors.forEach((a) => {
          a.style.width = isSidebarVisible ? "178px" : "100%";
        });
      }
      // 사이드바 안의 h2, h4 요소 가시성 제어
      const headings = sidebarRef.current.querySelectorAll("h2, h3, h4, p");
      headings.forEach((heading) => {
        heading.style.display = isSidebarVisible ? "block" : "none";
      });
      // profile_cont 변화
      const profile_cont = sidebarRef.current.querySelectorAll("#profileCont");
      if (profile_cont) {
        profile_cont.forEach((pc) => {
          pc.style.width = isSidebarVisible ? "100%" : "50px";
        });
      }
    }
  }, [isSidebarVisible]);

  // 리사이즈 이벤트 리스너를 추가하여 창 크기 변경에 대응
  useEffect(() => {
    const handleResize = () => {
      if (mainRef.current) {
        mainRef.current.style.width = isSidebarVisible
          ? "calc(100% - 240px)"
          : "calc(100% - 80px)";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible]);

  const [open, setOpen] = useState(false);
  // const profile = useRef();
  const handleToggle = () => {
    setIsSidebarVisible(true)
    setOpen(!open)
  };

  return (
    <div className={isDarkMode ? styles.darkMode : ""}>
      <div className={styles.body}>
        {/* 사이드바 */}
        <aside
          ref={sidebarRef}
          className={styles.aside}
          style={{ width: isSidebarVisible ? "240px" : "1vh" }}
        >
          <header className={styles.header}>
            <Link to="/">
              <div className={styles.title}>
                {isSidebarVisible ? (
                  <LogoMainImg2 className={styles.mainLogo} />
                ) : (
                  <LogoMiniImg className={styles.miniLogo} />
                )}
              </div>
            </Link>
          </header>
          <div className={styles.btn_cont}>
            <button onClick={toggleSidebar}>
              {isSidebarVisible ? (
                <LeftArrow className={styles.leftArr} />
              ) : (
                <RightArrow className={styles.rightArr} />
              )}
            </button>
          </div>
          {member ? (
            // 사용자 프로필
            <div>
              <button
                // aria-describedby={id}
                onClick={handleToggle}
                style={{ width: "fit-content", height: "fit-content" }}
              >
                <div
                  className={styles.profile_cont}
                  id="profileCont"
                  style={
                    isSidebarVisible
                      ? { paddingLeft: "13px" }
                      : { paddingLeft: "13px" }
                  }
                >
                  {/* 사용자 프로필 사진 : 이름 이니셜 */}
                  <Avatar
                    {...stringAvatar(`${member.name}`)}
                    src="/broken-image.jpg"
                    className={styles.userImg}
                  />
                  <h2>{member.name}</h2> {/* 사용자 이름 표시 */}
                </div>
              </button>
              {/* 프로필 상세 박스 */}
              {open && isSidebarVisible && (
                <div className={profile.container}>
                  <div className={profile.flexRow}>
                    <div style={{ width: "40px" }}></div>
                    <Typography
                      style={{
                        flex: 1,
                        textAlign: "center",
                        color: "var(--mid-color)",
                        fontWeight: "600",
                      }}
                    >
                      {member.email}
                    </Typography>
                    <IconButton onClick={handleToggle}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div className={profile.flexCol}>
                    <Avatar
                      {...stringAvatar(member.name)}
                      src="/broken-image.jpg"
                      style={{
                        width: "60px",
                        height: "60px",
                        marginBottom: "1rem",
                      }}
                    />
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {member.name} 님
                    </Typography>
                  </div>
                  <div className={profile.btnContainer}>
                    <Button
                      className={profile.profileBtn}
                      startIcon={<SettingIcon />}
                      onClick={() => navigate("/setting")}
                      style={{ color: "var(--top-color)", fontSize: "11px", fontWeight: 700 }}
                    >
                      설정
                    </Button>
                    <Button
                      className={profile.profileBtn}
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      style={{ color: "var(--top-color)", fontSize: "11px", fontWeight: 700 }}
                    >
                      로그아웃
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 로그인
            <div className={styles.login_cont}>
              <Link to="/Login">
                <div className={styles.profile_cont} id="profileCont">
                  {/* <LogoMiniImg className={styles.loginImg} /> */}
                  <LoginImg className={styles.loginImg} />
                  <h2>로그인</h2>
                </div>
              </Link>
              <Link to="/signup" className={styles.signup}>
                <p>회원가입</p>
              </Link>
            </div>
          )}
          <Menubar
            userId={member ? member.id : null}
            isSidebarVisible={isSidebarVisible}
          />
          <div className={styles.btn_cont} style={{ justifyContent: "center" }}>
            <button onClick={toggleDarkMode}>
              {isDarkMode ? (
                <LightModeImg className={styles.chgMode} />
              ) : (
                <DarkModeImg className={styles.chgMode} />
              )}
            </button>
          </div>
        </aside>

        {/* 메인 콘텐츠 영역 */}
        <div ref={mainRef} className={styles.rside}>
          {/* children으로 전달된 페이지 내용 */}
          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            <div className={styles.container}>
              <div className={styles.info}>
                <h4 style={{ fontSize: "20px" }}>
                  <LogoMainImg1 style={{ width: "140px", height: "auto" }} />
                </h4>
                <p>
                  대구광역시 북구 대학로 80 / IT대학 융복합관(건물번호: 415)
                </p>
                <p>고객센터: 1234-5678 | 이메일: sehi0119@naver.com</p>
              </div>
              <div className={styles.links}>
                <a href="/terms" className={styles.link}>
                  이용 약관
                </a>
                <a href="/privacy" className={styles.link}>
                  개인정보처리방침
                </a>
                <a href="/help" className={styles.link}>
                  고객지원
                </a>
              </div>
              <div className={styles.copyright}>
                <p>© {new Date().getFullYear()} CLODGE. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

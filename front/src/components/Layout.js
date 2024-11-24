// src/components/Layout.js
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ChgId } from "../img/sync_alt.svg";
import { ReactComponent as LeftArrow } from "../img/double_arrow_left.svg";
import { ReactComponent as RightArrow } from "../img/double_arrow_right.svg";
import { ReactComponent as UserImg } from "../img/person.svg";
import { ReactComponent as LoginImg } from "../img/login.svg";
import { ReactComponent as LogoutImg } from "../img/logout.svg";
import { ReactComponent as LogoMainImg1 } from "../img/CLODGE_main_horizon_v1.svg";
import { ReactComponent as LogoMainImg2 } from "../img/CLODGE_main_horizon_v2.svg";
import { ReactComponent as LogoMiniImg } from "../img/CLODGE_mini.svg";
import { ReactComponent as LightModeImg } from "../img/light_mode.svg";
import { ReactComponent as DarkModeImg } from "../img/dark_mode.svg";
import Menubar from "./Menubar";
import styles from "../styles/layout.module.css"; // 여기에 CSS 스타일 추가
import { width } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const Layout = ({ children, user }) => {
  // 사이드바가 열려 있는지 여부를 관리하는 상태
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태 관리

  // `ref`를 통해 DOM 요소 직접 접근
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
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
          {user ? (
            <div
              className={styles.profile_cont}
              id="profileCont"
              style={isSidebarVisible ? { paddingLeft: "13px" } : { paddingLeft: "13px" }}
            >
              <UserImg className={styles.userImg} />
              <h2>{user.name}</h2> {/* 사용자 이름 표시 */}
            </div>
          ) : (
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
            userId={user ? user.id : null}
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

          <footer className={styles.footer}></footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/layout.module.css";
import "../styles/grid.css";
import { ReactComponent as UserImg } from "../img/person.svg";
import { ReactComponent as ChgId } from "../img/sync_alt.svg";
import { ReactComponent as LeftArrow } from "../img/double_arrow_left.svg";
import { ReactComponent as RightArrow } from "../img/double_arrow_right.svg";
import { ReactComponent as LiIcon } from "../img/featured_play_list.svg";
import { ReactComponent as HomeIcon } from "../img/home.svg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { useNavigate } from "react-router-dom";
import NoteModal from "./NoteModal";
import Layout from "../components/Layout";
const PropertiesSidebar = ({ properties, isVisible, toggleVisibility }) => {
  return (
    <aside
      className={`${styles.propertiesSidebar} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <button
        onClick={toggleVisibility}
        className={`${styles.toggleButton} ${
          isVisible ? styles.closeButton : styles.openButton
        }`}
      ></button>
    </aside>
  );
};
const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/main">
          <li>
            <HomeIcon />
            <h3>관심기업</h3>
          </li>
        </Link>
      </ul>
      <ul>
        <Link to="/menu1">
          <li>
            <LiIcon />
            <h3>기업</h3>
          </li>
        </Link>
        <Link to="/menu2">
          <li>
            <LiIcon />
            <h3>딜</h3>
          </li>
        </Link>
        <Link to="/menu3">
          <li>
            <LiIcon />
            <h3>노트</h3>
          </li>
        </Link>
        <Link to="/menu4">
          <li>
            <LiIcon />
            <h3>일정</h3>
          </li>
        </Link>
        <Link to="/menu5">
          <li>
            <LiIcon />
            <h3>회의</h3>
          </li>
          <Link to="/menu5">
            <li>
              <LiIcon />
              <h3>기업</h3>
            </li>
          </Link>
        </Link>
      </ul>
    </nav>
  );
};

const NotePage = () => {
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [properties, setProperties] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 기본 열 속성
  const defaultColDef = useMemo(() => ({ editable: false }), []);
  const handleGridReady = (params) => {
    setGridApi(params.api);
  };
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const sidebarRef = useRef(null);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && sidebarRef.current) {
      mainRef.current.style.width = isSidebarVisible
        ? "calc(100% - 260px)"
        : "calc(100% - 80px)";
      sidebarRef.current.style.width = isSidebarVisible ? "260px" : "80px";
      const anchors = sidebarRef.current.querySelectorAll("a");
      if (anchors) {
        anchors.forEach((a) => {
          a.style.width = isSidebarVisible ? "218px" : "100%";
        });
      }
      const headings = sidebarRef.current.querySelectorAll("h2, h3");
      headings.forEach((heading) => {
        heading.style.display = isSidebarVisible ? "block" : "none";
      });
      const figure = sidebarRef.current.querySelector("figure");
      if (figure) {
        figure.style.flexDirection = isSidebarVisible ? "row" : "column";
        figure.querySelectorAll("button").forEach((button, idx) => {
          button.style.order = isSidebarVisible ? `${idx + 1}` : `${2 - idx}`;
        });
      }
    }
  }, [isSidebarVisible]);
  return (
    <Layout>
      <div className={styles.buttonContainer2}>
        <select>
          {[
            "엔파티클",
            "리피드",
            "텔레픽스",
            "밸런스히어로",
            "메이사",
            "에이아이스페라",
            "너바나나",
            "아몬드컴퍼니",
            "제로원",
            "케밍컴퍼니",
          ].map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.aaa}>
        <div>
          <button>노트 추가</button>
          <button></button>
        </div>
      </div>

      <div
        style={{ width: "100%", height: "350px" }}
        className="ag-theme-quartz"
      >
        <AgGridReact />
      </div>
      <PropertiesSidebar />
      <PropertiesSidebar
        properties={properties}
        isVisible={isRightSidebarVisible}
        toggleVisibility={() =>
          setIsRightSidebarVisible(!isRightSidebarVisible)
        }
      />
    </Layout>
  );
};

export default NotePage;

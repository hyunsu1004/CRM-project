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

const NotePage = () => {
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
    </Layout>
  );
};

export default NotePage;

import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/layout.module.css";
import { useParams } from "react-router-dom";
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
import {
  faPlus,
  faShareSquare,
  faChevronRight,
  faChevronLeft,
  faArrowAltCircleLeft,
  faTrashAlt,
  faCircle,
  faUser,
  faDollarSign,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
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

const GridExample = ({ company }) => {
  const [rowData, setRowData] = useState([]);

  const defaultColDef = useMemo(() => ({ editable: true }), []);
  const columnDefs = useMemo(
    () => [
      {
        headerName: "제목",
        field: "title",
        valueGetter: (p) => p.data.title,
        flex: 1,
        checkboxSelection: true,
      },

      { headerName: "내용", field: "content", flex: 1.5 },

      { headerName: "수정일자", field: "date", flex: 1 },
    ],
    []
  );

  return (
    <div style={{ width: "100%", height: "350px" }} className="ag-theme-quartz">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
      {/* 선택된 행 데이터 표시 */}
    </div>
  );
};
// 메인 화면 사이드바 메뉴
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
  const { companyName } = useParams();
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [properties, setProperties] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("쿼타랩");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]); // 노트 목록 상태 추가
  const mainRef = useRef(null);
  const sidebarRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 데이터
  const [rowData, setRowData] = useState({
    엔파티클: [],
    리피드: [],
    텔레픽스: [],
    밸런스히어로: [],
    메이사: [],
    에이아이스페라: [],
    너바나나: [],
    아몬드컴퍼니: [],
    제로원: [],
  });
  const [gridApi, setGridApi] = useState(null); // AgGrid API 저장

  // 열 정의

  const columnDefs = useMemo(
    () => [
      { headerName: "제목", field: "title", flex: 1 },
      { headerName: "내용", field: "content", flex: 1.5 },

      { headerName: "수정 일자", field: "date", flex: 1 },
      //백엔드 연결할 field
    ],
    []
  );

  useEffect(() => {
    axios
      .get("/api/user", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("사용자 정보 가져오기 실패", error);
      });
  }, []);

  // 기본 열 속성
  const defaultColDef = useMemo(() => ({ editable: false }), []);
  const handleGridReady = (params) => {
    setGridApi(params.api);
  };
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // 모달 열기
  const handleOpenModal = () => {
    setSelectedNote(null); // 새 노트 추가를 위한 상태 초기화
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleRowDoubleClicked = (event) => {
    setSelectedNote(event.data); // 선택된 행 데이터 저장
    setIsModalOpen(true); // 모달 열기
  };
  const handleCloseModal = () => setIsModalOpen(false);

  // 노트 저장
  const handleSaveNote = (note) => {
    //백엔드로 노트 저장
    if (selectedNote) {
      // 기존 노트 수정
      setRowData((prevRowData) => ({
        ...prevRowData,
        [selectedCompany]: prevRowData[selectedCompany].map((row) =>
          row === selectedNote ? { ...row, ...note } : row
        ),
      }));
      //노트 저장(백엔드)
      // axios
      // .put(`/api/notes/${selectedCompany}/${selectedNote.id}`, note, {
      //   withCredentials: true,
      // })
      // .then(() => {
      //   setRowData((prevRowData) => ({
      //     ...prevRowData,
      //     [selectedCompany]: prevRowData[selectedCompany].map((row) =>
      //       row === selectedNote ? { ...row, ...note } : row
      //     ),
      //   }));
      //   setSelectedNote(null);
      //   setIsModalOpen(false);
      // })
      // .catch((error) => {
      //   console.error("노트 수정 실패", error);
      // });
    } else {
      // 새 노트 추가
      setRowData((prevRowData) => ({
        ...prevRowData,
        [selectedCompany]: [...(prevRowData[selectedCompany] || []), note],
      }));
    }
    setSelectedNote(null);
    setIsModalOpen(false);
  };

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
  useEffect(() => {
    const handleResize = () => {
      if (mainRef.current) {
        mainRef.current.style.width = isSidebarVisible
          ? "calc(100% - 260px)"
          : "calc(100% - 80px)";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible]);
  const handleDeleteSelected = () => {
    //
    const selectedNodes = gridApi.getSelectedNodes(); // 선택된 행 가져오기
    const selectedData = selectedNodes.map((node) => node.data);

    setRowData((prevRowData) => ({
      ...prevRowData,
      [selectedCompany]: prevRowData[selectedCompany].filter(
        (row) => !selectedData.includes(row)
      ),
    }));
  };

  return (
    <Layout user={user} isDarkMode={isDarkMode}>
      <div className={styles.pageHeader}>
        <button
          onClick={() => navigate("/deals")} // DealPage로 이동
          style={{
            marginRight: "20px",
            padding: "10px 20px",
            fontSize: "44px",

            backgroundColor: "white",
            color: "black",

            borderRadius: "5px",
            cursor: "pointer",
            width: "80px",
          }}
        >
          ←
        </button>
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>
          {companyName}
        </span>
      </div>
      <div className={styles.buttonContainer2}></div>
      <div className={styles.aaa}>
        <div
          className={styles.buttoncontainer}
          style={{
            display: "flex",
            justifyContent: "right", // 버튼을 생성자 위 중앙에 위치
            // 버튼 간격 설정
            marginBottom: "10px", // 생성자 위로 공간 추가
          }}
        >
          <button
            onClick={handleOpenModal}
            className={styles.addnotebtn}
            style={{
              width: "150px", // 버튼 가로 크기
              height: "50px", // 버튼 세로 크기
              fontSize: "16px", // 버튼 텍스트 크기
              borderRadius: "8px", // 모서리 둥글게
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> 노트 추가
          </button>
          <button
            onClick={handleDeleteSelected} // 삭제 버튼 동작
            className={styles.deletebtn}
            style={{
              width: "150px", // 버튼 가로 크기
              height: "50px", // 버튼 세로 크기
              fontSize: "16px", // 버튼 텍스트 크기
              borderRadius: "8px", // 모서리 둥글게
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> 삭제
          </button>
        </div>
      </div>

      <div
        style={{ width: "100%", height: "350px" }}
        className="ag-theme-quartz"
      >
        {rowData[selectedCompany]?.length > 0 ? ( // 데이터 확인
          <AgGridReact
            rowData={rowData[selectedCompany]}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            overlayNoRowsTemplate="<span>데이터가 없습니다.</span>"
            rowSelection="multiple"
            onGridReady={handleGridReady}
            onRowDoubleClicked={handleRowDoubleClicked}
          />
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            데이터가 없습니다.
          </div>
        )}
      </div>
      <PropertiesSidebar
        properties={properties}
        isVisible={isRightSidebarVisible}
        toggleVisibility={() =>
          setIsRightSidebarVisible(!isRightSidebarVisible)
        }
      />
      {isModalOpen && (
        <NoteModal
          note={selectedNote}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
        />
      )}
    </Layout>
  );
};

export default NotePage;

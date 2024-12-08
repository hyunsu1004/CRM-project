import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "../../styles/layout.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import NoteModal from "./NoteModal";

const NotePage = () => {
    const { companyName } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 데이터
    const [rowData, setRowData] = useState([]); // 노트 데이터 상태
    const [gridApi, setGridApi] = useState(null); // AgGrid API 저장
    const navigate = useNavigate();

    // 열 정의
    const columnDefs = useMemo(
        () => [
            { headerName: "제목", field: "title", flex: 1 },
            { headerName: "내용", field: "content", flex: 1.5 },
        ],
        []
    );

    // 기본 열 속성
    const defaultColDef = useMemo(() => ({ editable: false }), []);

    // 데이터 로드
    useEffect(() => {
        axios
            .get("/api/member/notes", { withCredentials: true })
            .then((response) => {
                const notes = response.data;
                if (Array.isArray(notes)) {
                    setRowData(notes); // 노트 데이터를 rowData로 설정
                }
            })
            .catch((error) => {
                console.error("노트 로드 실패", error);
            });
    }, []); // 컴포넌트가 마운트될 때 실행

    // 노트 저장
    const handleSaveNote = (note) => {
        if (selectedNote) {
            // 기존 노트 수정
            axios
                .put(`/api/member/notes/${selectedNote.id}`, note, { withCredentials: true })
                .then(() => {
                    setRowData((prevRowData) =>
                        prevRowData.map((row) =>
                            row.id === selectedNote.id ? { ...row, ...note } : row
                        )
                    );
                    setSelectedNote(null);
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    console.error("노트 수정 실패", error);
                });
        } else {
            // 새 노트 추가
            axios
                .post("/api/member/notes", note, { withCredentials: true })
                .then((response) => {
                    setRowData((prevRowData) => [...prevRowData, response.data]);
                    setIsModalOpen(false);
                    alert("노트가 성공적으로 추가됐습니다.");
                })
                .catch((error) => {
                    console.error("노트 추가 실패", error);
                });
        }
    };

    // 노트 추가 모달 열기
    const handleOpenModal = () => {
        setSelectedNote(null); // 새 노트 추가를 위한 상태 초기화
        setIsModalOpen(true);
    };

    // 노트 수정 모달 열기
    const handleRowDoubleClicked = (event) => {
        setSelectedNote(event.data); // 선택된 행 데이터 저장
        setIsModalOpen(true); // 모달 열기
    };

    // 노트 삭제
    const handleDeleteSelected = () => {
        const selectedNodes = gridApi.getSelectedNodes(); // 선택된 행 가져오기
        const selectedData = selectedNodes.map((node) => node.data);

        const deletePromises = selectedData.map((note) =>
            axios.delete(`/api/member/notes/${note.id}`, { withCredentials: true })
        );

        Promise.all(deletePromises)
            .then(() => {
                setRowData((prevRowData) =>
                    prevRowData.filter((row) => !selectedData.includes(row))
                );
            })
            .catch((error) => {
                console.error("노트 삭제 실패", error);
            });
    };

    // AgGrid 설정
    const handleGridReady = (params) => {
        setGridApi(params.api);
    };

    return (
        <div>
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
                        justifyContent: "right",
                        marginBottom: "10px",
                    }}
                >
                    <button
                        onClick={handleOpenModal}
                        className={styles.addnotebtn}
                        style={{
                            width: "150px",
                            height: "50px",
                            fontSize: "16px",
                            borderRadius: "8px",
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} /> 노트 추가
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        className={styles.deletebtn}
                        style={{
                            width: "150px",
                            height: "50px",
                            fontSize: "16px",
                            borderRadius: "8px",
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} /> 삭제
                    </button>
                </div>
            </div>

            <div style={{ width: "100%", height: "350px" }} className="ag-theme-quartz">
                {rowData.length > 0 ? (
                    <AgGridReact
                        rowData={rowData} // 전체 노트 데이터를 rowData로 설정
                        columnDefs={columnDefs}
                        defaultColDef={{ editable: false }} // 기본 설정
                        overlayNoRowsTemplate="<span>데이터가 없습니다.</span>"
                        rowSelection="multiple" // 다중 선택
                        onGridReady={handleGridReady}
                        onRowDoubleClicked={handleRowDoubleClicked}
                    />
                ) : (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        데이터가 없습니다.
                    </div>
                )}
            </div>

            {isModalOpen && (
                <NoteModal
                    note={selectedNote}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveNote}
                />
            )}
        </div>
    );
};

export default NotePage;

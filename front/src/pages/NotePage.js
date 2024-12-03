import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import NoteModal from "./NoteModal";
import Layout from "../components/Layout";
import axios from "axios";
import styles from "../styles/layout.module.css";
import { width } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const NotePage = () => {
    const { dealId } = useParams();
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gridApiRef = useRef(null);
    const [member, setMember] = useState(null);
    const [noteId,setNoteId] = useState(null);



    useEffect(() => {
        // 사용자 정보 로드
        const loggedInUser = localStorage.getItem("member");
        if (loggedInUser) {
            setMember(JSON.parse(loggedInUser));
        }
    }, []);


    const columnDefs = useMemo(
        () => [
            { headerName: "제목", field: "title", flex: 1, checkboxSelection: true },
            { headerName: "내용", field: "content", flex: 2 },
        ],
        []
    );

    const defaultColDef = useMemo(() => ({ editable: false }), []);

    const handleGridReady = (params) => {
        gridApiRef.current = params.api;
    };

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`/api/notes/${dealId}`);
            setRowData(response.data);
        } catch (error) {
            console.error("노트 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const handleOpenModal = (note = null) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const handleSaveNote = async (note) => {
        try {
            if (selectedNote) {
                // 업데이트
                await axios.put(`/api/deals/${dealId}/notes/${selectedNote.id}`, note);
            } else {
                // 새 노트 추가
                await axios.post(`/api/member/deals/${dealId}/notes`, note);
            }
            fetchNotes();
            handleCloseModal();
        } catch (error) {
            console.error("노트를 저장하는 중 오류 발생:", error);
        }
    };


    //const handleOpenModal = (note)


    const handleDeleteSelected = async () => {
        const selectedNodes = gridApiRef.current.getSelectedNodes();
        const noteId = selectedNodes.map((node) => node.data.id);

        //selectedIds 가 비어 있는지 확인
        if(noteId.length === 0){
            console.log("선택된 노트가 없습니다.");
            return; //선택 노트가없으면 작업중지

        }
        console.log(noteId);
        try {
            await axios.delete(`/api/member/deals/${noteId}`, {
                data: noteId, //여러개의 노트ID전달
            });
            fetchNotes();
        } catch (error) {
            console.error("노트를 삭제하는 중 오류 발생:", error);
            console.error("상세 메시지 : " ,error.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <Layout member = {member}>
            <div className={styles.pageHeader}>
                <button
                    onClick={() => navigate("/deals")}
                    className={styles.backButton}
                    style={{
                        width: "120px", // 버튼 가로 크기
                        height: "50px", // 버튼 세로 크기
                        fontSize: "40px", // 텍스트 크기
                        backgroundColor: "white", // 버튼 색상
                        color: "black", // 텍스트 색상
                        borderRadius: "8px", // 둥근 모서리
                        border: "none", // 테두리 제거
                        cursor: "pointer",
                    }}
                >
                    ←
                </button>
                <h1 style={{ display: "inline-block", marginLeft: "20px" }}>
                    딜 {dealId}에 관한 노트
                </h1>
                <div
                    className={styles.buttonContainer}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end", // 우측 정렬
                        gap: "10px", // 버튼 간 간격
                        marginTop: "-40px", // 제목과 버튼을 겹치지 않게 조정
                    }}
                >
                    <button
                        onClick={() => handleOpenModal()}
                        className={styles.addNoteBtn}
                        style={{
                            width: "120px", // 버튼 가로 크기
                            height: "40px", // 버튼 세로 크기
                            fontSize: "16px", // 텍스트 크기
                            backgroundColor: "white", // 버튼 색상
                            color: "black", // 텍스트 색상
                            borderRadius: "5px", // 둥근 모서리
                            border: "none", // 테두리 제거
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} /> 노트 추가
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        className={styles.deleteNoteBtn}
                        style={{
                            width: "120px", // 버튼 가로 크기
                            height: "40px", // 버튼 세로 크기
                            fontSize: "16px", // 텍스트 크기
                            backgroundColor: "white", // 버튼 색상
                            color: "black", // 텍스트 색상
                            borderRadius: "5px", // 둥근 모서리
                            border: "none", // 테두리 제거
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} /> 삭제
                    </button>
                </div>
            </div>
            <div
                style={{ width: "100%", height: "400px" }}
                className="ag-theme-quartz"
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    onGridReady={handleGridReady}
                    onRowDoubleClicked={(event) => handleOpenModal(event.data)}
                />
            </div>
            {isModalOpen && (
                <NoteModal
                    note={selectedNote}
                    onClose={handleCloseModal}
                    onSave={handleSaveNote}
                />
            )}
        </Layout>
    );
};

export default NotePage;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // useParams 훅 사용
import axios from "axios";
import { CircularProgress, Box, Typography, Container, Grid, Paper } from "@mui/material";  // MUI 컴포넌트 사용

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
    const { dealId } = useParams(); // URL에서 dealId를 가져옴
    console.log(dealId);

    useEffect(() => {
        // dealId에 해당하는 모든 노트를 불러오는 API 호출
        setLoading(true); // 데이터 로딩 시작
        setError(null); // 에러 초기화
        console.log(dealId); //dealId가 올바르게 출력되는지 확인.
        axios.get(`/notes/${dealId}`)
            .then((response) => {
                setNotes(response.data); // 노트 데이터를 상태에 저장
                setLoading(false); // 로딩 종료
            })
            .catch((error) => {
                setError("노트를 불러오는 데 실패했습니다."); // 에러 메시지 설정
                setLoading(false); // 로딩 종료
                console.error("Error fetching notes", error);
            });
    }, [dealId]);  // dealId가 변경될 때마다 useEffect가 실행되도록 설정

    // 로딩 중일 때
    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress /> {/* 로딩 스피너 */}
            </Box>
        );
    }

    // 에러가 있을 때
    if (error) {
        return (
            <Box sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Container sx={{ paddingTop: 2 }}>
            <Typography variant="h4" gutterBottom>
                노트
            </Typography>
            <Grid container spacing={2}>
                {notes.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Paper sx={{ padding: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                            <Typography variant="h6">{note.title}</Typography>
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {note.content}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default NotesPage;

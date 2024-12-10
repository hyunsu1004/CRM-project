import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    Button,
} from "@mui/material";
import Layout from "../components/Layout";
const SettingPage = () => {
    const [member, setMember] = useState(null);
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("ko");
    useEffect(() => {
        const loggedInUser = localStorage.getItem("member");
        if (loggedInUser) {
            setMember(JSON.parse(loggedInUser)); // localStorage에서 사용자 정보 읽기
        }
    }, []);
    // 로딩 중 처리
    if (!member) {
        return (
            <Layout>
                <Container maxWidth="md" style={{ marginTop: "20px", textAlign: "center" }}>
                    <Typography variant="h5">로딩 중...</Typography>
                </Container>
            </Layout>
        );
    }
    return (
        <Layout member={member}>
            <Container maxWidth="md" style={{ marginTop: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    설정
                </Typography>
                <Grid container spacing={3}>
                    {/* 프로필 섹션 */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            프로필 설정
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="아이디" variant="outlined" defaultValue={member ? member.name : ""} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="이메일 주소" variant="outlined" defaultValue={member ? member.email : ""} disabled />
                    </Grid>
                    {/* 환경 설정 섹션 */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            환경 설정
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="theme-label">테마</InputLabel>
                            <Select labelId="theme-label" label="테마" value={theme}>
                                <MenuItem value={"light"}>라이트</MenuItem>
                                <MenuItem value={"dark"}>다크</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="language-label">언어</InputLabel>
                            <Select labelId="language-label" label="언어" value={language}>
                                <MenuItem value={"ko"}>한국어</MenuItem>
                                <MenuItem value={"en"}>영어</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* 알림 섹션 */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            알림
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>이메일 알림 활성화</Typography>
                        <Switch defaultChecked />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>푸시 알림 활성화</Typography>
                        <Switch />
                    </Grid>
                    {/* 액션 */}
                    <Grid item xs={12} sx={{display: "flex", justifyContent: "end"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "10px" }}
                        >
                            변경 사항 저장
                        </Button>
                        <Button variant="outlined" color="secondary">
                            취소
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};
export default SettingPage;
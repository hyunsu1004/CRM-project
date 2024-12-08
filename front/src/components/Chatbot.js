import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 메시지를 가져옴
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatbotMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // messages 상태가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    // if (input.trim() !== "") {
    //   setMessages([...messages, { text: input, sender: "user" }]);
    //   // 여기에서 챗봇 로직을 추가하십시오
    //   const botResponse = processInput(input);
    //   setMessages([
    //     ...messages,
    //     { text: input, sender: "user" },
    //     { text: botResponse, sender: "bot" },
    //   ]);
    //   setInput("");
    // }
    if (input.trim() !== "") {
        const newMessages = [
          ...messages,
          { text: input, sender: "member" },
          { text: processInput(input), sender: "bot" },
        ];
        setMessages(newMessages);
        setInput("");
      }
  };

  const processInput = (input) => {
    // 입력에 따라 다른 응답을 반환합니다
    return "챗봇 : 챗봇이 입력에 대한 응답을 처리합니다.(임시)";
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "90px",
        right: "30px",
        width: "400px",
        height: "600px",
        border: "2px solid var(--mid-color)",
        borderRadius: "10px",
        padding: 2,
        backgroundColor: "#FFFFFF",
        zIndex: 2000,
      }}
    >
      <List sx={{ minHeight: "500px", maxHeight: "500px", overflow: "auto" }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <Typography
              color={message.sender === "member" ? "primary" : "secondary"}
            >
              {message.text}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", gap: 1, flexDirection: "end" }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" color="secondary" onClick={sendMessage} sx={{fontWeight: "700"}}>입력</Button>
      </Box>
    </Box>
  );
};

export default Chatbot;

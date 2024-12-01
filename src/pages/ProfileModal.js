import {
  Avatar,
  Box,
  Button,
  colors,
  Drawer,
  Fade,
  IconButton,
  Modal,
  Popover,
  Popper,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as CloseIcon } from "../img/close.svg";
import { ReactComponent as SettingIcon } from "../img/setting.svg";
import { ReactComponent as LogoutIcon } from "../img/logout.svg";
import { width } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../components/Layout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "rgb(247, 247, 247)",
  border: "2px solid #acb9cc5e",
  borderRadius: "20px",
  boxShadow: 24,
  p: 1,
  pb: 3,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
};

const flex_row = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const flex_col = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const btn_container = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  bgcolor: "transparent",
  borderRadius: "18px",
  overflow: "hidden",
  mt: 2,
};

const profile_btn = {
  flex: 1,
  fontSize: "16px",
  fontWeight: "900",
  color: "#305673",
  "&:hover": {
    bgcolor: "#ACB9CC",
  },
};

export default function ProfileModal({
  open,
  setOpen,
  user,
  anchorEl,
  setAnchorEl,
  placement,
  setPlacement,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <Popper
        sx={{ zIndex: 1200 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="right-end"
        transition
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: false,
              altBoundary: true,
              tether: true,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            // options: {
            //   element: arrowRef,
            // },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={style}>
              <Box sx={flex_row}>
                <Box sx={{ width: "40px" }}></Box>
                <Typography
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    color: "var(--mid-color)",
                    fontWeight: "600",
                  }}
                >
                  {user.email}
                </Typography>
                <IconButton onClick={handleClick}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={flex_col}>
                {/* 사용자 프로필 사진 : 빈(기본) */}
                <Avatar
                  {...stringAvatar(`${user.name}`)}
                  src="/broken-image.jpg"
                  sx={{ width: "60px", height: "60px", mb: 1 }}
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {user.name} 님
                </Typography>
              </Box>
              <Box sx={btn_container}>
                <Button
                  sx={profile_btn}
                  startIcon={<SettingIcon />}
                  onClick={() => navigate("/setting")}
                >
                  개인 설정
                </Button>
                <Button
                  sx={profile_btn}
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

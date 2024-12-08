import { Link } from "react-router-dom";
import { ReactComponent as LiIcon } from "../img/featured_play_list.svg";
import { ReactComponent as StarIcon } from "../img/star.svg";
import { ReactComponent as NoteIcon } from "../img/note.svg";
import { ReactComponent as DocIcon } from "../img/contract.svg";
import { ReactComponent as TaskIcon } from "../img/checkList.svg";
import { ReactComponent as CompanyIcon } from "../img/company.svg";
import { ReactComponent as ArrowUpIcon } from "../img/arrow_up.svg";
import { ReactComponent as ArrowDownIcon } from "../img/arrow_down.svg";
import { ReactComponent as DatabaseIcon } from "../img/database.svg";
import { ReactComponent as StartupIcon } from "../img/startup.svg";
import { ReactComponent as InvestorIcon } from "../img/investor.svg";
// import { ReactComponent as DealIcon } from "../img/deal.svg";
import { ReactComponent as SettingIcon } from "../img/setting.svg";
import { ReactComponent as InfoIcon } from "../img/info.svg";
import { ReactComponent as AddIcon } from "../img/list_add.svg";
import { ReactComponent as AllIcon } from "../img/inventory.svg";
import { ReactComponent as DealIcon } from "../img/supervisor_account.svg";
import styles from "../styles/layout.module.css";
import { useState } from "react";
import { width } from "@fortawesome/free-solid-svg-icons/faArrowDown";

const MenuTitle = ({
  icon: Icon,
  label,
  items,
  onClick,
  isOpen,
  isSidebarVisible,
}) => {
  return (
    <div onClick={onClick}>
      <li className={styles.menuTitle}>
        <div className={styles.icon_label_wrap}>
          <Icon />
          <h4>{label}</h4>
        </div>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </li>
      {isOpen && items && (
        <ul
          style={
            isSidebarVisible ? { paddingLeft: "20px" } : { paddingLeft: "0px" }
          }
        >
          {items.map((item) => (
            <MenuItem
              key={item.label}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const MenuItem = ({ to, icon: Icon, label, className }) => {
  return (
    <Link to={to}>
      <li className={`${styles.menuItem} ${className}`}>
        <Icon />
        <h4>{label}</h4>
      </li>
    </Link>
  );
};

// 메인 화면 사이드바 메뉴
const Menubar = ({ userId, isSidebarVisible, userDeals = [] }) => {
  const [openMenus, setOpenMenus] = useState({ 데이터베이스: true });

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <nav>
      <ul>
        <MenuTitle
          icon={DatabaseIcon}
          label="데이터베이스"
          onClick={() => toggleMenu("데이터베이스")}
          isOpen={openMenus["데이터베이스"]}
          items={[
            { to: "/startups", icon: StartupIcon, label: "스타트업" },
            { to: "/investors", icon: InvestorIcon, label: "투자자" },
          ]}
          isSidebarVisible={isSidebarVisible}
        />
        {userId ? (
          <MenuTitle
            icon={DealIcon}
            label="My 딜"
            onClick={() => toggleMenu("My 딜")}
            isOpen={openMenus["My 딜"]}
            items={[
              userDeals.length > 0
                ? [
                    // 딜 메인 관리 창
                    { to: "/deals", icon: AllIcon, label: "딜 전체" },
                    // 딜 목록 창
                    userDeals.map((deal) => ({
                      to: `/deals/${deal.id}`, // 유저의 고유한 deal ID
                      icon: NoteIcon,
                      label: deal.name, // 유저가 지정한 딜 이름
                    }))
                  ]
                : // 딜 메인 관리 창
                  { to: "/deals", icon: AllIcon, label: "딜 전체" }
            ]}
            isSidebarVisible={isSidebarVisible}
          />
        ) : null}
      </ul>
      <ul style={{ borderTop: "2px solid #ACB9CC" }}>
        <MenuItem
          to="/setting"
          icon={SettingIcon}
          label="설정"
          style={{ width: "100%" }}
        />
        <MenuItem
          to="/help"
          icon={InfoIcon}
          label="도움말"
          style={{ width: "100%" }}
        />
      </ul>
    </nav>
  );
};

export default Menubar;

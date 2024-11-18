import { Link } from "react-router-dom";
import { ReactComponent as LiIcon } from "../img/featured_play_list.svg";
import { ReactComponent as StarIcon } from "../img/star.svg";
import { ReactComponent as NoteIcon } from "../img/notes.svg";
import { ReactComponent as DealIcon } from "../img/contract.svg";
import { ReactComponent as TaskIcon } from "../img/task.svg";
import { ReactComponent as CompanyIcon } from "../img/company.svg";
import styles from "../styles/layout.module.css";

const MenuItem = ({ to, icon: Icon, label }) => {
  return (
    <Link to={to}>
      <li>
        <Icon />
        <h3>{label}</h3>
      </li>
    </Link>
  );
};

// 메인 화면 사이드바 메뉴
const Menubar = () => {
  return (
    <nav>
      <h3 className={styles.menuTitle}>MAIN</h3>
      <ul>
        <MenuItem to="/main" icon={StarIcon} label="Favorite" />
      </ul>
      <h3 className={styles.menuTitle}>MENU</h3>
      <ul>
        <MenuItem to="/menu1" icon={CompanyIcon} label="Company" />
        <MenuItem to="/menu2" icon={DealIcon} label="Deals" />
        <MenuItem to="/menu3" icon={NoteIcon} label="Notes" />
        <MenuItem to="/menu4" icon={TaskIcon} label="Tasks" />
      </ul>
      <h3 className={styles.menuTitle}>MY</h3>
      <ul>
        <MenuItem to="/custom" icon={LiIcon} label="Custom" />
      </ul>
    </nav>
  );
};

export default Menubar;

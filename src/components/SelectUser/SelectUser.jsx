import { useContext } from "react";
import styles from "./SelectUser.module.css";
import { UserContext } from "../../context/user.context";
import { User } from "lucide-react";

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <div className={styles["select-wrapper"]}>
      <User size={16} />

      <select
        className={styles["select"]}
        name="user"
        id="user"
        value={userId ?? ""}
        onChange={changeUser}
      >
        <option value="" disabled hidden>
          Select author
        </option>
        <option value="1">Анна</option>
        <option value="2">Иван</option>
        <option value="3">Мария</option>
        <option value="4">Алексей</option>
      </select>
    </div>
  );
}

export default SelectUser;

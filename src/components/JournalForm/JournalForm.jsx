import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";
import SelectUser from "../SelectUser/SelectUser";
import { Calendar, Tag } from "lucide-react";

function JournalForm({ onSubmit, data, onDelete, onCancel }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const isSubmitDisabled = !values.post.trim() || !values.date || !userId;

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <>
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
        <div className={styles["form-separated"]}>
          <SelectUser />

          <div className={styles["form-data"]}>
            <label htmlFor="date" className={styles["form-label"]}>
              <Calendar size={16} />
            </label>
            <Input
              appearence="date"
              type="date"
              ref={dateRef}
              onChange={onChange}
              name="date"
              value={
                values.date
                  ? new Date(values.date).toISOString().slice(0, 10)
                  : ""
              }
              id="date"
              isValid={!isValid.date}
            />
          </div>
        </div>
        <div className={styles["form-row"]}>
          <label htmlFor="tag" className={styles["form-label"]}>
            <Tag size={16} />
          </label>
          <Input
            type="text"
            onChange={onChange}
            id="tag"
            value={values.tag}
            name="tag"
            placeholder="Tags (comma separated)"
          />
        </div>
        <textarea
          ref={postRef}
          name="post"
          id=""
          onChange={onChange}
          value={values.post}
          cols="30"
          rows="10"
          className={styles["input-textarea"]}
          placeholder="Write your note here..."
        ></textarea>
        <div className={styles["form-buttons"]}>
          <Button onClick={onCancel} appearance="secondary">
            Cancel
          </Button>
          <Button disabled={isSubmitDisabled}>Save</Button>
        </div>
      </form>
    </>
  );
}

export default JournalForm;

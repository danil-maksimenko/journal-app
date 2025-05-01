import { Plus } from "lucide-react";
import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton({ clearForm }) {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <Plus size={16} />
      New note
    </CardButton>
  );
}

export default JournalAddButton;

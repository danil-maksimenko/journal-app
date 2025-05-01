import styles from "./App.module.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Wrapper from "./layouts/Wrapper/Wrapper";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";
import { useState, useEffect } from "react";
import Logo from "./components/Logo/Logo";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));
}

function App() {
  const [items, setItems] = useLocalStorage("data", []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setIsCreating(true);
    }
  }, [selectedItem]);

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className={styles["app"]}>
        <Header>
          <Logo image="/logo.svg" />
          {!isCreating && (
            <JournalAddButton
              clearForm={() => {
                setSelectedItem(null);
                setIsCreating(true);
              }}
            />
          )}
        </Header>
        {isCreating && (
          <Wrapper>
            <h2 className={styles["headline"]}>Create New Note</h2>
            <JournalForm
              onSubmit={(item) => {
                addItem(item);
                setIsCreating(false);
                setSelectedItem(null);
              }}
              onDelete={(id) => {
                deleteItem(id);
                setIsCreating(false);
                setSelectedItem(null);
              }}
              onCancel={() => {
                setIsCreating(false);
                setSelectedItem(null);
              }}
              data={selectedItem}
            />
          </Wrapper>
        )}

        {!isCreating && items.length === 0 && (
          <>
            <p>No notes yet, create your first one.</p>
          </>
        )}

        <JournalList items={mapItems(items)} setItem={setSelectedItem} />
      </div>
    </UserContextProvider>
  );
}

export default App;

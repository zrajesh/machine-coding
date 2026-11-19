import { useState, useEffect } from "react";

const STORAGE_KEY = "offline-notes";

const INITIAL_NOTES = [
  {
    id: 1,
    title: "First Note",
    content: "This is the content of the first note.",
  },
  {
    id: 2,
    title: "Second Note",
    content: "This is the content of the second note.",
  },
];

// Offline: load notes from localStorage, fall back to INITIAL_NOTES on first run.
const loadNotes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  } catch {
    return INITIAL_NOTES;
  }
};

// Offline: track browser connectivity.
const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
};

const App = () => {
  const [notes, setNotes] = useState(loadNotes);
  const [newTitle, setNewTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const online = useOnlineStatus();

  // Offline: persist every change locally.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // storage full / unavailable
    }
  }, [notes]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: editTitle } : note,
      ),
    );
  };

  const handleAdd = () => {
    setNotes([...notes, { id: Date.now(), title: newTitle }]);
  };

  return (
    <div>
      <h1>Offline notes App</h1>
      <p>{online ? "🟢 Online" : "🔴 Offline – changes saved locally"}</p>
      <input type="text" placeholder="Search notes" />
      <input
        type="text"
        placeholder="Add a new note"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Note</button>
      <div>
        {notes.map((note) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <div>
              <input
                type="text"
                placeholder="Edit title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => handleDelete(note.id)}>Delete</button>
              <button onClick={() => handleEdit(note.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

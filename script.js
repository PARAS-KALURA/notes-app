let notes = [];
let editId = null; // for editing notes

// ✅ Load notes on start
window.onload = function () {
    const savedNotes = localStorage.getItem("quickNotes");
    notes = savedNotes ? JSON.parse(savedNotes) : [];
    renderNotes();
};

// ✅ Save Note (Add + Edit)
function saveNote(event) {
    event.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    // ✅ EDIT MODE
    if (editId) {
        notes = notes.map(note =>
            note.id === editId
                ? { ...note, title, content }
                : note
        );

        editId = null;
        document.getElementById("dialogTitle").textContent = "Add New Note";
    } 
    // ✅ ADD MODE
    else {
        notes.unshift({
            id: Date.now().toString(),
            title,
            content
        });
    }

    // Save to localStorage
    localStorage.setItem("quickNotes", JSON.stringify(notes));

    // Clear + close
    document.getElementById("noteForm").reset();
    closeNoteDialog();
    renderNotes();
}

// ✅ Render Notes
function renderNotes() {
    const notesContainer = document.getElementById("classContainer");

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div class="empty-state">
                <h2>No notes yet</h2>
                <p>Create your first note to get started!</p>
                <button class="add-note-btn" onclick="openNoteDialog()">+ Add your first note</button>
            </div>
        `;
        return;
    }

    notesContainer.innerHTML = notes
        .map(note => {
            return `
                <div class="note-card">
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>

                    <div class="note-actions">
                        <button onclick="editNote('${note.id}')" class="edit-btn">Edit</button>
                        <button onclick="deleteNote('${note.id}')" class="delete-btn">Delete</button>
                    </div>
                </div>
            `;
        })
        .join("");
}

// ✅ Edit Note
function editNote(id) {
    editId = id;

    const note = notes.find(n => n.id === id);

    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteContent").value = note.content;

    document.getElementById("dialogTitle").textContent = "Edit Note";

    openNoteDialog();
}

// ✅ Delete Note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("quickNotes", JSON.stringify(notes));
    renderNotes();
}


// ✅ Toggle Dark Mode
document.getElementById("themeToggleBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // save theme
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// ✅ Load theme on page start
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});


// ✅ Open Dialog
function openNoteDialog() {
    document.getElementById("noteForm").reset();
    document.getElementById("noteDialog").showModal();
}

// ✅ Close Dialog
function closeNoteDialog() {
    document.getElementById("noteDialog").close();
}

// ✅ Close by clicking outside
document.getElementById("noteDialog").addEventListener("click", function (e) {
    if (e.target === this) closeNoteDialog();
});

// ✅ Form Submit
document.getElementById("noteForm").addEventListener("submit", saveNote);

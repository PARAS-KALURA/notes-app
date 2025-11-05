let notes = [];

function saveNote(event) {
    event.preventDefault();  // ✅ correct

    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    // ✅ Add new note
    notes.unshift({
        id: Date.now().toString(),
        title: title,
        content: content
    });

    // ✅ Save to localStorage
    localStorage.setItem("quickNotes", JSON.stringify(notes));

    // ✅ Clear form
    document.getElementById("noteForm").reset();

    // ✅ Close popup
    closeNoteDialog();
}


// ✅ Open note dialog
function openNoteDialog() {
    const dialog = document.getElementById("noteDialog");
    const titleInput = document.getElementById("noteTitle");

    dialog.showModal();
    titleInput.focus();
}


// ✅ Close note dialog
function closeNoteDialog() {
    document.getElementById("noteDialog").close();
}


// ✅ Close by clicking outside
document.getElementById("noteDialog").addEventListener("click", function (e) {
    if (e.target === this) {
        closeNoteDialog();
    }
});


// ✅ Submit form correctly
document.getElementById("noteForm").addEventListener("submit", saveNote);

// Read existing notes from localStorage
const getNotes = function(){
    const notesJSON = localStorage.getItem("notes")

    if(notesJSON !== null){
        return JSON.parse(notesJSON)
    }else{
        return []
    }
}

// Save notes to local storage
const saveNotes = function(notes){
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Render applicaton notes
const renderNotes = function(notes, filters){
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector("#notes").innerHTML = ""

    filteredNotes.forEach(function(note){
        const noteElement = generateNoteDOM(note)
        document.querySelector("#notes").appendChild(noteElement)
    })
} 

// Generate the DOM structure for a note
const generateNoteDOM = function(note){
    const noteElement = document.createElement("p")

    if(note.title.length > 0){
        noteElement.textContent = note.title
    }else{
        noteElement.textContent = "Unnamed note"
    }

    return noteElement
}

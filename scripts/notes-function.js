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

// Remove a note from the list
const removeNote = function(id){
    const noteIndex = notes.findIndex(function(note){
        return note.id === id 
    })

    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = function(note){
    const noteElement = document.createElement("div")
    const textElement = document.createElement("span")
    const button = document.createElement("button")

    // Set up remove note button
    button.textContent = "X"
    button.addEventListener("click", function(e){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    noteElement.appendChild(button)

    // Set up note title text
    if(note.title.length > 0){
        textElement.textContent = note.title
    }else{
        textElement.textContent = "Unnamed note"
    }
    noteElement.appendChild(textElement)

    return noteElement
}

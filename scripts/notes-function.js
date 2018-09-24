'use strict'

// Read existing notes from localStorage
const getNotes = () => {
    const notesJSON = localStorage.getItem("notes")

    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e){
        return []
    }

}

// Save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// Sort notes by one of three ways (Last edited, recently created, alphabetically)
const sortNotes = (notes, sortBy) => {
    if(sortBy === "byEdited"){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === "byCreated"){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.createdAt < b.createdAt){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === "alphabetical"){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        })
    }else{
        return notes
    }
}

// Render applicaton notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector("#notes").innerHTML = ""

    filteredNotes.forEach((note) => {
        const noteElement = generateNoteDOM(note)
        document.querySelector("#notes").appendChild(noteElement)
    })
} 

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteElement = document.createElement("div")
    const textElement = document.createElement("a")
    const button = document.createElement("button")

    // Set up remove note button
    button.textContent = "X"
    button.addEventListener("click", (e) =>{
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
    textElement.setAttribute("href", `/edit.html#${note.id}`)
    noteElement.appendChild(textElement)

    return noteElement
}

// Generate the last edited message
const generateLastEdit = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

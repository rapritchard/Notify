const noteTitle = document.querySelector("#note-title")
const noteBody = document.querySelector("#note-body")
const removeBtn = document.querySelector("#remove-note")
const dateElement = document.querySelector("#note-date")

const noteID = location.hash.substring(1)
let notes = getNotes()
let note = notes.find((note) => note.id === noteID)

if(note === undefined){
    location.assign("/index.html")
}

noteTitle.value = note.title
noteBody.value = note.body
dateElement.textContent = generateLastEdit(note.updatedAt)

noteTitle.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdit(note.updatedAt)
    saveNotes(notes)
})

noteBody.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdit(note.updatedAt)
    saveNotes(notes)
})

removeBtn.addEventListener("click", (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", (e) => {
    if(e.key === "notes"){
        notes = JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteID)
        
        if(note === undefined){
            location.assign("/index.html")
        }
        
        noteTitle.value = note.title
        noteBody.value = note.body
        dateElement.textContent = generateLastEdit(note.updatedAt)
    }
})


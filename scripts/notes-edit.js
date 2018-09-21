const noteTitle = document.querySelector("#note-title")
const noteBody = document.querySelector("#note-body")
const removeBtn = document.querySelector("#remove-note")

const noteID = location.hash.substring(1)
let notes = getNotes()
let note = notes.find(function(note){
    return note.id === noteID
})

if(note === undefined){
    location.assign("/index.html")
}

noteTitle.value = note.title
noteBody.value = note.body

noteTitle.addEventListener("input", function(e){
    note.title = e.target.value
    saveNotes(notes)
})

noteBody.addEventListener("input", function(e){
    note.body = e.target.value
    saveNotes(notes)
})

removeBtn.addEventListener("click", function(e){
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", function(e){
    if(e.key === "notes"){
        notes = JSON.parse(e.newValue)
        let note = notes.find(function(note){
            return note.id === noteID
        })
        
        if(note === undefined){
            location.assign("/index.html")
        }
        
        noteTitle.value = note.title
        noteBody.value = note.body
    }
})
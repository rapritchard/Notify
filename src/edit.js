import { initEditPage, generateLastEdit } from './views';
import { removeNote, updateNote } from './notes';

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeBtn = document.querySelector('#remove-note');
const dateElement = document.querySelector('#note-date');

const noteID = location.hash.substring(1);

initEditPage(noteID);

noteTitle.addEventListener('input', (e) => {
  const note = updateNote(noteID, {
    title: e.target.value,
  });

  dateElement.textContent = generateLastEdit(note.updatedAt);
});

noteBody.addEventListener('input', (e) => {
  const note = updateNote(noteID, {
    body: e.target.value,
  });
  dateElement.textContent = generateLastEdit(note.updatedAt);
});

removeBtn.addEventListener('click', () => {
  removeNote(noteID);
  location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initEditPage(noteID);
  }
});

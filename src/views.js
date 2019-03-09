import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes, getNotes } from './notes';

// Generate the last edited message
const generateLastEdit = timestamp => `Last edited ${moment(timestamp).fromNow()}`;

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteElement = document.createElement('a');
  const textElement = document.createElement('p');
  const statusElement = document.createElement('p');

  // Set up note title text
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = 'Unnamed note';
  }
  textElement.classList.add('list-item__title');
  noteElement.appendChild(textElement);
  // Setup the link
  noteElement.setAttribute('href', `/edit.html#${note.id}`);
  noteElement.classList.add('list-item');

  // Setup status message
  statusElement.textContent = generateLastEdit(note.updatedAt);
  statusElement.classList.add('list-item__subtitle');
  noteElement.appendChild(statusElement);

  return noteElement;
};

// Render applicaton notes
const renderNotes = () => {
  const notesEl = document.querySelector('#notes');

  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  notesEl.innerHTML = '';

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteElement = generateNoteDOM(note);
      notesEl.appendChild(noteElement);
    });
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'There are no notes to show.';
    emptyMessage.classList.add('empty-message');
    notesEl.appendChild(emptyMessage);
  }
};

const initEditPage = (noteID) => {

  const noteTitle = document.querySelector('#note-title');
  const noteBody = document.querySelector('#note-body');
  const dateElement = document.querySelector('#note-date');

  const notes = getNotes();
  const note = notes.find(note => note.id === noteID);

  if (!note) {
    location.assign('/index.html');
  }

  noteTitle.value = note.title;
  noteBody.value = note.body;
  dateElement.textContent = generateLastEdit(note.updatedAt);
};

export {
 renderNotes, generateNoteDOM, generateLastEdit, initEditPage,
};

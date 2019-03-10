import uuidv4 from 'uuid/v4';
import moment from 'moment';

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem('notes');

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save notes to local storage
const saveNotes = () => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id,
    title: '',
    body: '',
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes();

  return id;
};

// Sort notes by one of three ways (Last edited, recently created, alphabetically)
const sortNotes = (sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } if (a.updatedAt < b.updatedAt) {
        return 1;
      }
      return 0;
    });
  } if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    });
  } if (sortBy === 'alphabetical') {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  return notes;
};

const updateNote = (id, updates) => {
  const note = notes.find(note => note.id === id);

  if (!note) {
    return;
  }

  if (typeof updates.title === 'string') {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === 'string') {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }

  saveNotes();
};

notes = loadNotes();

export {
  getNotes, createNote, removeNote, sortNotes, updateNote, loadNotes,
};

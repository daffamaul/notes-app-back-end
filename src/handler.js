const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, createdAt, updatedAt, tags, body,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length == 1;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Catatan gagal untuk ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => (
    {
        status: 'success',
        data: {
            notes,
        },
    }
);

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((nt) => nt.id == id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  }).code(404);
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id == id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    return h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
  }).code(404);
};

const deleteNoteByIdHandler = (req, h) => {
    const {id} = req.params;

    const index = notes.findIndex(note => note.id === id);
    if(index !== -1) {
        notes.splice(index, 1);
        return h.response({
            status: "success",
            message: "Catatan berhasil dihapus",
        }).code(200);
    }

    return h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id catatan tidak ditemukan",
    }).code(400);
}

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
};

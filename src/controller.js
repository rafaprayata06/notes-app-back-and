import { nanoid } from 'nanoid';
import notes from '../src/notes.js';

export const createNote = (req, res) => {

    const { title = 'untiteled', tags, body } = req.body;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        createdAt,
        updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.some((note) => note.id === id);

    if (isSuccess) {
        return res.status(201).json({
            status: 'success',
            message: 'note success created!',
            data: {
                noteId: id
            }
        });
    }

    return res.status(500).json({
        status: 'fail',
        message: 'note failed create'
    });
};


export const getNotes = (req, res) => {
    return res.json({
        status: 'success',
        data: {
            notes
        }
    });
};


export const getNoteById = (req, res) => {

    const { id } = req.params;

    const note = notes.find((n) => n.id === id);

    if (note) {
        return res.json({
            status: 'success',
            data: {
                note
            }
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'catatan tidak di temukan'
    });
};


export const editNoteById = (req, res) => {

    const { id } = req.params;
    const { title, tags, body } = req.body;

    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);

    if (index !== -1) {

        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        return res.json({
            status: 'success',
            message: 'catatan berhasil di perbarui'
        });
    }

    return res.status(404).json({
        status: 'gagal',
        message: 'gagal memperbarui catatan'
    });
};


export const deleteNoteById = (req, res) => {

    const { id } = req.params;

    const note = notes.findIndex((n) => n.id === id);

    if (note !== -1) {

        notes.splice(note, 1);

        return res.json({
            status: 'berhasil',
            message: 'berhasil mengahpus data'
        });
    }

    return res.status(404).json({
        status: 'gagal',
        message: 'gagal menghapus data'
    });
};
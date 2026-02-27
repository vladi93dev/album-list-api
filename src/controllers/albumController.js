import { prisma } from '../config/db.js';
import { generateToken } from '../config/generateToken.js';

const createEntry = async (req, res) => {
    const { title, artist, genres, rating, note } = req.body;

    try {
        const newEntry = await prisma.entry.create({ data: {
            title,
            artist,
            genres,
            rating,
            note
        }});


        
        res.status(200).json({ message: `${newEntry.artist} added` });
    } catch(error) {
        res.status(400).json({ message: `error: ${error}`});
    }
}

export { createEntry };
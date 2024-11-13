import { connectToDatabase } from './dbConnection';

export default async function handler(req, res) {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM ranking ORDER BY services DESC');
        db.end();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
}
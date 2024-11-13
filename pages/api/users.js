import { connectToDatabase } from './dbConnection';

export default async function handler(req, res) {
    try {
        const db = await connectToDatabase();
        
        const [users] = await db.execute('SELECT * FROM ranking');
        
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        res.status(500).json({ error: "Erro ao consultar o banco de dados" });
    }
}

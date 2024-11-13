import { connectToDatabase } from './dbConnection';

export default async function handler(req, res) {
    try {
        const db = await connectToDatabase();

        const [services] = await db.execute('SELECT * FROM services');

        res.json(services);

    } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        res.status(500).json({ error: "Erro ao consultar o banco de dados" });
    }
}

import { connectToDatabase } from './dbConnection';

export default async function handler(req, res) {
    const { username } = req.query;

    try {
        const db = await connectToDatabase();
        const usernameModified = username.charAt(0).toUpperCase() + username.slice(1);

        const [services] = await db.execute(
            'SELECT * FROM services WHERE name = ?',
            [usernameModified]
        );

        res.status(200).json(services);
    } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        res.status(500).json({ error: "Erro ao consultar o banco de dados" });
    }
}

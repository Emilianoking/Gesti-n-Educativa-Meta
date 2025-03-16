import { Pool } from 'pg';

export default async function handler(req, res) {
    const pool = new Pool({
        user: 'junca12',
        host: 'svelte-vulture-7271.g8z.gcp-us-east1.cockroachlabs.cloud',
        database: 'gestion_educativa_meta',
        password: 'KMQ0MTgEeVxqXAGHovLlUA',
        port: 26257,
        ssl: { rejectUnauthorized: true },
        connectionString: `postgresql://junca12:KMQ0MTgEeVxqXAGHovLlUA@svelte-vulture-7271.g8z.gcp-us-east1.cockroachlabs.cloud:26257/gestion_educativa_meta?sslmode=verify-full&options=--cluster%3Dsvelte-vulture-7271`,
    });

    try {
        const client = await pool.connect();
        let query = 'SELECT id_municipio, nombre FROM municipios';
        const values = [];
        if (req.query.buscar) {
            const buscar = `%${req.query.buscar}%`;
            query += ' WHERE id_municipio LIKE $1 OR nombre ILIKE $1';
            values.push(buscar);
        }
        const result = await client.query(query, values);
        const municipios = result.rows;
        client.release();
        res.status(200).json(municipios);
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await pool.end();
    }
}
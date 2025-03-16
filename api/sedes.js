import { Pool } from 'pg';

export default async function handler(req, res) {
    const pool = new Pool({
        user: 'junca12',
        host: 'svelte-vulture-7271.g8z.gcp-us-east1.cockroachlabs.cloud',
        database: 'gestion_educativa_meta',
        password: 'KMQ0MTgEeVxqXAGHovLlUA',
        port: 26257,
        ssl: {
            rejectUnauthorized: true,
        },
        connectionString: `postgresql://junca12:KMQ0MTgEeVxqXAGHovLlUA@svelte-vulture-7271.g8z.gcp-us-east1.cockroachlabs.cloud:26257/gestion_educativa_meta?sslmode=verify-full&options=--cluster%3Dsvelte-vulture-7271`,
    });

    try {
        const client = await pool.connect();

        let query = `
            SELECT s.id_sede, s.nombre, c.nombre AS colegio
            FROM sedes s
            JOIN colegios c ON s.id_colegio = c.id_colegio
        `;
        const values = [];
        if (req.query.buscar) {
            const buscar = `%${req.query.buscar}%`;
            query += ' WHERE s.id_sede LIKE $1 OR s.nombre ILIKE $1';
            values.push(buscar);
        }

        const result = await client.query(query, values);
        const sedes = result.rows;

        client.release();
        res.status(200).json(sedes);
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).json({ error: error.message });
    } finally {
        await pool.end();
    }
}
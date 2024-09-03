import crypto from 'crypto';
class Usuario {
    constructor(database) {
        this.database = database;
    }

    async getUsuario() {
        const query = 'SELECT * FROM Usuario';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getUsuario:', err);
            throw err;
        }
    }

    async getUsuarioById(id) {
        const query = 'SELECT * FROM Usuario WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getUsuarioById:', err);
            throw err;
        }
    }

    async deleteUsuario(id) {
        const query = 'DELETE FROM Usuario WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteUsuario:', err);
            throw err;
        }
    }

    async updateUsuario(id, Nombre, Usuario, Pass) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Pass, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE Usuario SET Nombre = ?, Usuario = ?, Pass = ? WHERE id = ?';
            const [result] = await this.database.query(query, [Nombre, Usuario, `${salt}:${hash}`, id]);
            return result;
        } catch (err) {
            console.error('Error en updateUsuario:', err);
            throw err;
        }
    }

    async addUsuario(Nombre, Usuario, Pass) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Pass, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO Usuario (Nombre, Usuario, Pass) VALUES (?, ?, ?)';
            const [result] = await this.database.query(query, [Nombre, Usuario, `${salt}:${hash}`]);
            return result;
        } catch (err) {
            console.error('Error en addUsuario:', err);
            throw err;
        }
    }
}

export default Usuario;

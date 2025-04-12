const db = require('../config/db');

module.exports = {
  async create({ subject_name, subject_code, description }) {
    const { rows } = await db.query(
      'INSERT INTO subjects (subject_name, subject_code, description) VALUES ($1, $2, $3) RETURNING *',
      [subject_name, subject_code, description]
    );
    return rows[0];
  },

  async findAll() {
    const { rows } = await db.query('SELECT * FROM subjects ORDER BY subject_name');
    return rows;
  },

  async findById(subject_id) {
    const { rows } = await db.query(
      'SELECT * FROM subjects WHERE subject_id = $1',
      [subject_id]
    );
    return rows[0];
  },

  async update(subject_id, { subject_name, subject_code, description }) {
    const { rows } = await db.query(
      'UPDATE subjects SET subject_name = $1, subject_code = $2, description = $3 WHERE subject_id = $4 RETURNING *',
      [subject_name, subject_code, description, subject_id]
    );
    return rows[0];
  },

  async delete(subject_id) {
    await db.query('DELETE FROM subjects WHERE subject_id = $1', [subject_id]);
  }
};
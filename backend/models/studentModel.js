const db = require('../config/db');

module.exports = {
  async create({ first_name, last_name, email, date_of_birth }) {
    const { rows } = await db.query(
      'INSERT INTO students (first_name, last_name, email, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, date_of_birth]
    );
    return rows[0];
  },

  async findAll({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows } = await db.query(
      'SELECT * FROM students ORDER BY student_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return rows;
  },

  async findById(student_id) {
    const { rows } = await db.query(
      'SELECT * FROM students WHERE student_id = $1',
      [student_id]
    );
    return rows[0];
  },

  async update(student_id, { first_name, last_name, email, date_of_birth }) {
    const { rows } = await db.query(
      'UPDATE students SET first_name = $1, last_name = $2, email = $3, date_of_birth = $4 WHERE student_id = $5 RETURNING *',
      [first_name, last_name, email, date_of_birth, student_id]
    );
    return rows[0];
  },

  async delete(student_id) {
    await db.query('DELETE FROM students WHERE student_id = $1', [student_id]);
  },

  async count() {
    const { rows } = await db.query('SELECT COUNT(*) FROM students');
    return parseInt(rows[0].count);
  },

  async getStudentWithMarks(student_id) {
    const { rows } = await db.query(
      `SELECT s.*, 
              json_agg(
                json_build_object(
                  'mark_id', m.mark_id,
                  'subject_id', m.subject_id,
                  'subject_name', sub.subject_name,
                  'marks_obtained', m.marks_obtained,
                  'max_marks', m.max_marks,
                  'exam_date', m.exam_date
                )
              ) AS marks
       FROM students s
       LEFT JOIN marks m ON s.student_id = m.student_id
       LEFT JOIN subjects sub ON m.subject_id = sub.subject_id
       WHERE s.student_id = $1
       GROUP BY s.student_id`,
      [student_id]
    );
    return rows[0];
  }
};
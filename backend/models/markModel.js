const db = require('../config/db');

module.exports = {
  async create({ student_id, subject_id, marks_obtained, max_marks, exam_date }) {
    const { rows } = await db.query(
      'INSERT INTO marks (student_id, subject_id, marks_obtained, max_marks, exam_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [student_id, subject_id, marks_obtained, max_marks, exam_date]
    );
    return rows[0];
  },

  async findByStudent(student_id) {
    const { rows } = await db.query(
      `SELECT m.*, s.subject_name 
       FROM marks m
       JOIN subjects s ON m.subject_id = s.subject_id
       WHERE m.student_id = $1
       ORDER BY m.exam_date DESC`,
      [student_id]
    );
    return rows;
  },

  async findById(id) {
    const { rows } = await db.query(
      'SELECT * FROM marks WHERE mark_id = $1',
      [id]
    );
    return rows[0];
  },

  async findByStudentAndSubject(student_id, subject_id) {
    const { rows } = await db.query(
      'SELECT * FROM marks WHERE student_id = $1 AND subject_id = $2',
      [student_id, subject_id]
    );
    return rows;
  },

  async update(mark_id, { marks_obtained, max_marks, exam_date }) {
    const { rows } = await db.query(
      'UPDATE marks SET marks_obtained = $1, max_marks = $2, exam_date = $3 WHERE mark_id = $4 RETURNING *',
      [marks_obtained, max_marks, exam_date, mark_id]
    );
    return rows[0];
  },

  async delete(mark_id) {
    await db.query('DELETE FROM marks WHERE mark_id = $1', [mark_id]);
  }
};
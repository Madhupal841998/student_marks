import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../../api/studentApi';
import Pagination from '../common/Pagination';
import Alert from '../common/Alert';
import Loading from '../common/Loading';
import Swal from 'sweetalert2';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents(currentPage, limit);
      setStudents(data.data);
      setTotalPages(data.meta.totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const handleDelete = async (studentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the student record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteStudent(studentId);
        setStudents((prev) => prev.filter(student => student.student_id !== studentId));
        Swal.fire('Deleted!', 'The student has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete the student.', 'error');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Loading />;
  if (error) return <Alert message={error} variant="danger" />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students</h2>
        <Button as={Link} to="/students/new" variant="primary">
          Add New Student
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name} {student.last_name}</td>
              <td>{student.email}</td>
              <td>
                {new Date(student.date_of_birth).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </td>
              <td>
                <Button
                  as={Link}
                  to={`/marks/student/${student.student_id}`}
                  variant="info"
                  size="sm"
                  className="me-2"
                >
                  View Marks
                </Button>
                <Button
                  as={Link}
                  to={`/students/${student.student_id}/edit`}
                  variant="warning"
                  size="sm"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(student.student_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StudentList;

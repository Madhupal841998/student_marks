import { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { getMarksByStudent, deleteMark } from '../../api/markApi';
import Alert from '../common/Alert';
import Loading from '../common/Loading';
import Swal from 'sweetalert2';

const MarkList = () => {
    const { id } = useParams();
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMarks = async () => {
        try {
            const data = await getMarksByStudent(id);
            setMarks(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarks();
    }, [id]);

    const handleDelete = async (markId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this mark?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await deleteMark(markId);
                setMarks(marks.filter((mark) => mark.mark_id !== markId));
                Swal.fire('Deleted!', 'The mark has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'Failed to delete the mark.', 'error');
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <Alert message={error} variant="danger" />;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Student Marks</h2>
                <Button as={Link} to={`/marks/new?student_id=${id}`} variant="primary">
                    Add New Mark
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks Obtained</th>
                        <th>Max Marks</th>
                        <th>Percentage</th>
                        <th>Exam Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map((mark) => (
                        <tr key={mark.mark_id}>
                            <td>{mark.subject_name}</td>
                            <td>{mark.marks_obtained}</td>
                            <td>{mark.max_marks}</td>
                            <td>
                                <Badge bg="info">
                                    {((mark.marks_obtained / mark.max_marks) * 100).toFixed(2)}%
                                </Badge>
                            </td>
                            <td>
                                {new Date(mark.exam_date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </td>
                            <td>
                                <Button
                                    as={Link}
                                    to={`/marks/${mark.mark_id}/edit`}
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(mark.mark_id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MarkList;

import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getSubjects, deleteSubject } from '../../api/subjectApi';
import Alert from '../common/Alert';
import Loading from '../common/Loading';
import Swal from 'sweetalert2';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteSubject(id);
                    setSubjects(subjects.filter(subject => subject.subject_id !== id));
                    Swal.fire('Deleted!', 'Subject has been deleted.', 'success');
                }
            });
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    if (loading) return <Loading />;
    if (error) return <Alert message={error} variant="danger" />;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Subjects</h2>
                <Button as={Link} to="/subjects/new" variant="primary">
                    Add New Subject
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.subject_id}>
                            <td>{subject.subject_id}</td>
                            <td>{subject.subject_name}</td>
                            <td>{subject.subject_code}</td>
                            <td>
                                <Button
                                    as={Link}
                                    to={`/subjects/${subject.subject_id}/edit`}
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(subject.subject_id)}
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

export default SubjectList;
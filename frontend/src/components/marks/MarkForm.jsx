import { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { getMark, createMark, updateMark } from '../../api/markApi';
import { getSubjects } from '../../api/subjectApi';

const markSchema = Yup.object().shape({
    student_id: Yup.number().required('Student ID is required'),
    subject_id: Yup.number().required('Subject is required'),
    marks_obtained: Yup.number()
        .min(0, 'Marks cannot be negative')
        .required('Marks are required'),
    max_marks: Yup.number()
        .min(0, 'Max marks cannot be negative')
        .default(100),
    exam_date: Yup.date().required('Exam date is required')
});

const MarkForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
  const studentIdFromQuery = queryParams.get('student_id');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        student_id: studentIdFromQuery || '',
        subject_id: '',
        marks_obtained: '',
        max_marks: 100,
        exam_date: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [subjectsData] = await Promise.all([
                    getSubjects()
                ]);

                setSubjects(subjectsData);

                if (id) {
                    const mark = await getMark(id);
                    const formatLocalDate = (isoDate) => {
                        const date = new Date(isoDate);
                        const year = date.getFullYear();
                        const month = (`0${date.getMonth() + 1}`).slice(-2);
                        const day = (`0${date.getDate()}`).slice(-2);
                        return `${year}-${month}-${day}`;
                      };
                      
                      setInitialValues({ 
                        student_id: mark.student_id,
                        subject_id: mark.subject_id,
                        marks_obtained: mark.marks_obtained,
                        max_marks: mark.max_marks,
                        exam_date: formatLocalDate(mark.exam_date)
                      });
                      
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
                navigate('/marks');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            if (id) {
                await updateMark(id, values);
                Swal.fire('Success', 'Mark updated successfully', 'success');
            } else {
                await createMark(values);
                Swal.fire('Success', 'Mark created successfully', 'success');
            }
            navigate(`/marks/student/${values.student_id}`);
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Spinner animation="border" />;

    return (
        <Card className="form-card">
            <Card.Header>
                <h3>{id ? 'Edit Mark' : 'Add New Mark'}</h3>
            </Card.Header>
            <Card.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={markSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    validateOnBlur={true}
                    validateOnChange={true}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Subject</Form.Label>
                                <Form.Select
                                    name="subject_id"
                                    value={values.subject_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.subject_id && !!errors.subject_id}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(subject => (
                                        <option
                                            key={subject.subject_id}
                                            value={subject.subject_id}
                                        >
                                            {subject.subject_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.subject_id}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Marks Obtained</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="marks_obtained"
                                    value={values.marks_obtained}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.marks_obtained && !!errors.marks_obtained}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.marks_obtained}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Max Marks</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="max_marks"
                                    value={values.max_marks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.max_marks && !!errors.max_marks}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.max_marks}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Exam Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="exam_date"
                                    value={values.exam_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.exam_date && !!errors.exam_date}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.exam_date}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" hidden>
                                <Form.Control
                                    type="hidden"
                                    name="student_id"
                                    value={values.student_id}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="ms-2">Saving...</span>
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    );
};

export default MarkForm;

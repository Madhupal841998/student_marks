import { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { 
  getStudent, 
  createStudent, 
  updateStudent 
} from '../../api/studentApi';

const studentSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date_of_birth: Yup.date().nullable()
});

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: ''
  });

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          setLoading(true);
          const student = await getStudent(id);
          const formatLocalDate = (isoDate) => {
            const date = new Date(isoDate);
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2);
            const day = (`0${date.getDate()}`).slice(-2);
            return `${year}-${month}-${day}`;
          };
          setInitialValues({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            date_of_birth: formatLocalDate(student.date_of_birth)
          });
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
          navigate('/students');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (id) {
        await updateStudent(id, values);
        Swal.fire('Success', 'Student updated successfully', 'success');
      } else {
        await createStudent(values);
        Swal.fire('Success', 'Student created successfully', 'success');
      }
      navigate('/students');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Card>
      <Card.Header>
        <h3>{id ? 'Edit Student' : 'Add New Student'}</h3>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={studentSchema}
          onSubmit={handleSubmit}
          enableReinitialize
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
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.first_name && !!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.last_name && !!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_birth"
                  value={values.date_of_birth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.date_of_birth && !!errors.date_of_birth}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date_of_birth}
                </Form.Control.Feedback>
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

export default StudentForm;
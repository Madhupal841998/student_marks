import { useState, useEffect } from 'react';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { getSubject, createSubject, updateSubject } from '../../api/subjectApi';

const subjectSchema = Yup.object().shape({
  subject_name: Yup.string().required('Subject name is required'),
  subject_code: Yup.string().required('Subject code is required'),
  description: Yup.string()
});

const SubjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    subject_name: '',
    subject_code: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const fetchSubject = async () => {
        try {
          setLoading(true);
          const subject = await getSubject(id);
          setInitialValues({
            subject_name: subject.subject_name,
            subject_code: subject.subject_code,
            description: subject.description
          });
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
          navigate('/subjects');
        } finally {
          setLoading(false);
        }
      };
      fetchSubject();
    }
  }, [id, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (id) {
        await updateSubject(id, values);
        Swal.fire('Success', 'Subject updated successfully', 'success');
      } else {
        await createSubject(values);
        Swal.fire('Success', 'Subject created successfully', 'success');
      }
      navigate('/subjects');
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
        <h3>{id ? 'Edit Subject' : 'Add New Subject'}</h3>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={subjectSchema}
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
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_name"
                  value={values.subject_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.subject_name && !!errors.subject_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject Code</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_code"
                  value={values.subject_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.subject_code && !!errors.subject_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject_code}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
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

export default SubjectForm;
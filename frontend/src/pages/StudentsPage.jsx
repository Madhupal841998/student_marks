import { Routes, Route, useNavigate } from 'react-router-dom';
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';

const StudentsPage = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route index element={<StudentList />} />
      <Route path="new" element={<StudentForm />} />
      <Route path=":id" element={<StudentForm />} />
      <Route path=":id/edit" element={<StudentForm />} />
    </Routes>
  );
};

export default StudentsPage;
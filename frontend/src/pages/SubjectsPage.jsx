import { Routes, Route } from 'react-router-dom';
import SubjectList from '../components/subjects/SubjectList';
import SubjectForm from '../components/subjects/SubjectForm';

const SubjectsPage = () => {
  return (
    <Routes>
      <Route index element={<SubjectList />} />
      <Route path="new" element={<SubjectForm />} />
      <Route path=":id" element={<SubjectForm />} />
      <Route path=":id/edit" element={<SubjectForm />} />
    </Routes>
  );
};

export default SubjectsPage;
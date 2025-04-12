import { Routes, Route, useNavigate } from 'react-router-dom';
import MarkList from '../components/marks/MarkList';
import MarkForm from '../components/marks/MarkForm';

const MarksPage = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="student/:id" element={<MarkList />} />
      <Route path="new" element={<MarkForm />} />
      <Route path=":id" element={<MarkForm />} />
      <Route path=":id/edit" element={<MarkForm />} />
    </Routes>
  );
};

export default MarksPage;
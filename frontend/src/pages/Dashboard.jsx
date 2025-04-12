import { Card, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getStudents } from '../api/studentApi';
import { getSubjects } from '../api/subjectApi';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    subjects: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, subjectsRes] = await Promise.all([
          getStudents(1, 1),
          getSubjects()
        ]);
        
        setStats({
          students: studentsRes.meta.total,
          subjects: subjectsRes.length,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({...prev, loading: false}));
      }
    };
    fetchStats();
  }, []);

  if (stats.loading) return <Loading />;

  return (
    <div className="dashboard">
      <h2 className="mb-4">Dashboard Overview</h2>
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text className="display-4">
                {stats.students}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Total Subjects</Card.Title>
              <Card.Text className="display-4">
                {stats.subjects}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
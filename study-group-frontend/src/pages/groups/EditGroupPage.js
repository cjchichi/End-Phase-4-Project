// pages/groups/EditGroupPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import GroupForm from '../../components/groups/GroupForm';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const EditGroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);  // Get token from context
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await fetchGroupDetails(id, token);  // Pass token here
        setGroup(groupData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, token]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    
    try {
      await updateGroup(id, formData, token);  // Pass token here
      navigate(`/groups/${id}`, { state: { success: 'Group updated successfully!' } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p>Loading group details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Edit Group</h1>
      <GroupForm 
        initialData={group} 
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
    </Container>
  );
};

export default EditGroupPage;



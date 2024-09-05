import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ onUserUpdated }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user);
      console.log('User updated:', response.data);
      if (onUserUpdated) {
        onUserUpdated(response.data); // Notify parent to update state
      }
      setLoading(false);
      navigate('/users'); // Redirect after successful update
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      address: { ...prevUser.address, [name]: value }
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={user.name || ''} onChange={handleChange} name="name" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={user.email || ''} onChange={handleChange} name="email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={user.phone || ''} onChange={handleChange} name="phone" />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="street" value={user.address?.street || ''} onChange={handleAddressChange} />
          <input type="text" name="suite" value={user.address?.suite || ''} onChange={handleAddressChange} />
          <input type="text" name="city" value={user.address?.city || ''} onChange={handleAddressChange} />
          <input type="text" name="zipcode" value={user.address?.zipcode || ''} onChange={handleAddressChange} />
        </label>
        <br />
        <button type="submit" className="update-user-button">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;

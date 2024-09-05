import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({ street: '', suite: '', city: '', zipcode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use navigate to redirect

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name,
        email,
        phone,
        address,
      });
      console.log(`User created: ${response.data}`);
      if (onUserCreated) {
        onUserCreated(response.data); // Notify parent to update state
      }
      setLoading(false);
      navigate('/'); // Redirect to users page after successful creation
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address.street} onChange={(event) => setAddress({ ...address, street: event.target.value })} />
          <input type="text" value={address.suite} onChange={(event) => setAddress({ ...address, suite: event.target.value })} />
          <input type="text" value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} />
          <input type="text" value={address.zipcode} onChange={(event) => setAddress({ ...address, zipcode: event.target.value })} />
        </label>
        <br />
        <button type="submit" className="create-user-button">Create User</button>
      </form>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>Error: {error}</div> : null}
    </div>
  );
};

export default CreateUser;

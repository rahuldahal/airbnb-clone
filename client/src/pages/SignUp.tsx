import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, UserContext } from '../Contexts/UserContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function signUpHandler(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/user', {
        name,
        email,
        password,
      });

      const user: User = {
        _id: data.message._id,
        email: data.message.email,
        name: data.message.name,
      };
      setUser(user);
      alert('Registration successful. Now you can log in');
      setRedirect(true);
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Sign Up</h1>
        <form className="max-w-md mx-auto" onSubmit={signUpHandler}>
          <input
            type="text"
            placeholder="Ravi Lamichhane"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Sign Up</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{' '}
            <Link className="underline text-black" to={'/signin'}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

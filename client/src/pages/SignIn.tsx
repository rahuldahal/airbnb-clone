import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, UserContext } from '../Contexts/UserContext';

export default function SignInPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/user/signIn', {
        email,
        password,
      });

      const user: User = {
        _id: data.message._id,
        email: data.message.email,
        name: data.message.name,
      };
      setUser(user);
      alert('Login successful.');
      setRedirect(true);
    } catch (e) {
      alert('Login failed.');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Sign In</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="underline text-black" to={'/signup'}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

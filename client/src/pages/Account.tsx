import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

export default function AccountPage() {
  const [redirect, setRedirect] = useState('');

  const { ready, user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.get('/user/logout');
    setRedirect('/');
    setUser(null);
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      <div className="text-center max-w-lg mx-auto">
        Logged in as {user?.name} ({user?.email})<br />
        <button onClick={logout} className="primary max-w-sm mt-2">
          Logout
        </button>
      </div>
    </div>
  );
}

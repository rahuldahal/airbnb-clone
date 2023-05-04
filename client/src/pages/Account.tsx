import axios from 'axios';
import PlacesPage from './PlacesPage';
import { useContext, useState } from 'react';
import AccountNav from '../components/AccountNav';
import { UserContext } from '../Contexts/UserContext';
import { Navigate, useParams } from 'react-router-dom';

export default function AccountPage() {
  const [redirect, setRedirect] = useState('');

  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

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

      {subpage === 'profile' ? (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      ) : (
        <PlacesPage />
      )}
    </div>
  );
}

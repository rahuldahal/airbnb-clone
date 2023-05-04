import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { UserContext } from '../Contexts/UserContext';

export default function AccountPage() {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return 'Loading...'; // TODO: add a loader UIs
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav />

      <div className="text-center max-w-lg mx-auto">
        Logged in as {user?.name} ({user?.email})<br />
        <button
          onClick={() => console.log('handle logout')}
          className="primary max-w-sm mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

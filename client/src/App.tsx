import './App.css';
import axios from 'axios';
import IndexPage from './pages/Index';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Layout from './components/Layout';
import AccountPage from './pages/Account';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './Contexts/UserContext';

axios.defaults.baseURL = 'http://localhost:8888';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

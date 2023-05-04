import './App.css';
import IndexPage from './pages/Index';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;

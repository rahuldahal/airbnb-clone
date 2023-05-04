import './App.css';
import Layout from './components/Layout';
import IndexPage from './pages/Index';
import SignInPage from './pages/SignIn';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import './App.css';
import { Login } from './component/user/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Account } from './component/user/Account';
import { Navbar } from './component/layout/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/account" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

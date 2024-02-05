import './App.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Header />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    {/*<Route />*/}
                </Routes>
            </Router>
        </AuthProvider>
    </div>
  );
}

export default App;

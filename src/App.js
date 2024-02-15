import './App.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home'
import SportPage from "./pages/SportPage";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Header />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/sports/:id" element={<SportPage />} />
                    {/*<Route />*/}
                </Routes>
            </Router>
        </AuthProvider>
    </div>
  );
}

export default App;

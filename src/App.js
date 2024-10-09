import './App.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home'
import SportPage from "./pages/SportPage";
import PadelGamePage from "./pages/PadelGamePage";
import HistoryPage from "./pages/HistoryPage";
import TenisGamePage from "./pages/TenisGamePage";
import SquashGamePage from "./pages/SquashGamePage";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Header />
            <Router>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<PrivateRoute />} >
                        <Route path="/home" element={<Home />} />
                        <Route path="/sports/:id" element={<SportPage />} />
                        <Route path="/sports/1/game/:gameid" element={<PadelGamePage />} />
                        <Route path="/sports/2/game/:gameid" element={<TenisGamePage />} />
                        <Route path="/sports/3/game/:gameid" element={<SquashGamePage />} />
                        <Route path="/sports/:sportid/history" element={<HistoryPage />} />
                    </ Route>
                </Routes>
            </Router>
        </AuthProvider>
    </div>
  );
}

export default App;

import './App.css';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Common/Login';
import Header from './components/Header';
import Home from './pages/UserPages/Home'
import SportPage from "./pages/SportPage";
import PadelGamePage from "./pages/GamePages/PadelGamePage";
import HistoryPage from "./pages/UserPages/HistoryPage";
import TenisGamePage from "./pages/GamePages/TenisGamePage";
import SquashGamePage from "./pages/GamePages/SquashGamePage";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import Register from "./pages/Common/Register";
import NotFound from "./pages/Common/NotFound";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Header />
            <Router>
                <Routes>
                    <Route path="/404" element={<NotFound />} />

                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
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

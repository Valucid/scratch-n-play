import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import ScratchGame from './Pages/ScratchGame';
import Layout from './components/Layout';
import Login from './Pages/Login';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token ? <>{children}</> : <Navigate to="/" replace />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/scratch-game"
                        element={
                            <PrivateRoute>
                                <ScratchGame />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;

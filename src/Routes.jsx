import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home'

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
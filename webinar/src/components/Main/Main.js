// src/components/Main/Main.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';

import Register from '../routes/Register/Register';

export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Register />} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    
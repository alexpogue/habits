import React, {useState, useMemo} from 'react'

import {BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../layouts/Header";
import Home from "../layouts/Home";
import New from "../layouts/New";
import Track from "../layouts/Track";
import Goal from "../components/Goal";
import {GoalContext} from "../context/GoalContext"

export default function AppRouter() {
    const [goals, setGoals] = useState(null);
    const providerValue = useMemo(() => ({goals, setGoals}), [goals, setGoals]);
    return (
        <BrowserRouter>
            <Header />
            <GoalContext.Provider value={providerValue}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/habits/new" element={<New />} />
                        <Route path="/habits/track" element={<Track />} />
                        <Route path="/goal/:id" element={<Goal />} />
                </Routes>
            </GoalContext.Provider>
        </BrowserRouter>
    )
}

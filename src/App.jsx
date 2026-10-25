import { useState, useEffect} from "react";
import { Routes, Route} from "react-router";
import EnTete from "./components/EnTete.jsx";
import Accueil from "./pages/Accueil.jsx";
import Partie from "./pages/Partie.jsx";




export default function App() {

     

    return (
        <>
            <EnTete />
            <main>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/partie" element={<Partie />} />
                </Routes>
            </main>
        </>
    );
}
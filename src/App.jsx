import { useState, useEffect} from "react";
import { Routes, Route} from "react-router";
import EnTete from "./components/EnTete.jsx";
import Accueil from "./pages/Accueil.jsx";
import Partie from "./pages/Partie.jsx";

/*
function lireReponse(response) {
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json();
}
*/

export default function App() {

    /*
    useEffect(() => {
        fetch("https://fr.wiktionary.org/w/api.php")
            .then(lireReponse)
            .then((data) => setJoueur(data))
            .catch((e) => console.error(e));
    }, []);
    */

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
import { useNavigate } from "react-router";
import Presentation from "../components/Presentation.jsx";
import Formulaire from "../components/Formulaire.jsx";
import mots from "../data/mots_solutions.json";

export default function Accueil() {
    const naviguer = useNavigate();

    function valider({ pseudo }) {
        const motsParPseudo = JSON.parse(localStorage.getItem("motsParPseudo") ?? "{}");
        
        if (!motsParPseudo[pseudo]) {
            motsParPseudo[pseudo] = mots[Math.floor(Math.random() * mots.length)].toUpperCase(); // à changer plus tard
            localStorage.setItem("motsParPseudo", JSON.stringify(motsParPseudo));
        }

        naviguer("/partie");
    }

    return (
        <>
            <h1>Le Mot Mystère</h1>
            <Presentation />
            <Formulaire onValider={valider}/>
        </>
    );
}
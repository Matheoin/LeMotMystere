import { useNavigate } from "react-router";
import Presentation from "../components/Presentation.jsx";
import Formulaire from "../components/Formulaire.jsx";
import mots from "../data/mots_solutions.json";

export default function Accueil() {
    const naviguer = useNavigate();

    function valider() {
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
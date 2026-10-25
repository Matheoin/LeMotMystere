import Presentation from "../components/Presentation.jsx";
import Formulaire from "../components/Formulaire.jsx";
// *** Ajout après soutenance
import { useNavigate, Link } from "react-router";

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
            <nav className="menu">
                <Link to="/scores">Tableau des scores</Link>
                <Link to="/statistiques">Statistiques</Link>
                <Link to="/regles">Règles</Link>
            </nav>
        </>
    );
}
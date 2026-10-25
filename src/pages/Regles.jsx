// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

import { Link } from "react-router";
import Presentation from "../components/Presentation.jsx";

export default function Regles() {

    return (
        <>
            <h1>Règles du jeu</h1>
            <Presentation />

            <h2>Exemple</h2>
            <div className="grille">
                <div className="ligne">
                    <div className="case vert">C</div>
                    <div className="case jaune">A</div>
                    <div className="case gris">R</div>
                    <div className="case gris">T</div>
                    <div className="case gris">E</div>
                </div>
            </div>
            <ul>
                <li><strong>C</strong> est en vert : il est dans le mot, à la bonne place.</li>
                <li><strong>A</strong> est en jaune : il est dans le mot, mais ailleurs.</li>
                <li><strong>R, T, E</strong> sont en gris : ils ne sont pas dans le mot.</li>
            </ul>
            <Link to="/">Retour à l'accueil</Link>
        </>
    );
}

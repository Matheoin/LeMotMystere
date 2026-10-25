import { useState } from "react";
import { Navigate } from "react-router";
import Grille from "../components/Grille";
import mots from "../data/mots_solutions.json";
// *** ajout après la soutenance
import { motDuJour, numeroDuJour } from "../logique/motDuJour";
// ***

export default function Partie() {
    const pseudo = localStorage.getItem("pseudo");
    const [motMystere, setMotMystere] = useState(() => motDuJour);
    
    function recommencer() {
        const nouveauMot = mots[Math.floor(Math.random() * mots.length)].toUpperCase(); // à Changer plus tard
        const motsParPseudo = JSON.parse(localStorage.getItem("motsParPseudo") ?? "{}");

        motsParPseudo[pseudo] = nouveauMot;
        localStorage.setItem("motsParPseudo", JSON.stringify(motsParPseudo));

        const essaisParPseudo = JSON.parse(localStorage.getItem("essaisParPseudo") ?? "{}");
        delete essaisParPseudo[`${pseudo}-${numeroDuJour()}`];
        localStorage.setItem("essaisParPseudo", JSON.stringify(essaisParPseudo));

        setMotMystere(nouveauMot);
    }

    if (!motMystere) return <Navigate to="/" />;

    return (
        <>
            <h1>Le Mot Mystère</h1>
            <p>Joueur : {pseudo}</p>
            <p>{motMystere}</p>
            <Grille pseudo={pseudo} motMystere={motMystere} onRecommencer={recommencer} />
        </>
    );
}
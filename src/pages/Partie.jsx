import { Navigate } from "react-router";
import Grille from "../components/Grille";

export default function Partie() {
    const pseudo = localStorage.getItem("pseudo");
    const motsParPseudo = JSON.parse(localStorage.getItem("motsParPseudo") ?? "{}");
    const motMystere = motsParPseudo[pseudo];

    if (!motMystere) return <Navigate to="/" />;

    return (
        <>
            <h1>Le Mot Mystère</h1>
            <p>Joueur : {pseudo}</p>
            <Grille pseudo={pseudo} motMystere={motMystere} />
        </>
    );
}
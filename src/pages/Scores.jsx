// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

import { Link } from "react-router";
import { meilleursScores } from "../logique/historique.jsx";

export default function Scores() {
    const scores = meilleursScores();

    return (
        <>
            <h1>Tableau des scores</h1>
            {scores.length === 0
                ? <p>Aucune partie gagnée pour l'instant.</p>
                : <table className="scores">
                    <thead>
                        <tr><th>#</th><th>Pseudo</th><th>Mot</th><th>Essais</th><th>Points</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                        {scores.map((s, i) => (
                            <tr key={s.id}>
                                <td>{i + 1}</td>
                                <td>{s.pseudo}</td>
                                <td>{s.mot}</td>
                                <td>{s.essais}</td>
                                <td>{s.points}</td>
                                <td>{new Date(s.date).toLocaleDateString("fr-FR")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            <Link to="/">Retour à l'accueil</Link>
        </>
    );
}

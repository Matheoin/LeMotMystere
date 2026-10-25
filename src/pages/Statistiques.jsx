// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

import { Link } from "react-router";
import { statistiques } from "../logique/historique.jsx";

export default function Statistiques() {
    const pseudo = localStorage.getItem("pseudo");
    const stats = statistiques(pseudo);
    const max = Math.max(1, ...stats.repartition);

    return (
        <>
            <h1>Statistiques de {pseudo}</h1>
            <ul>
                <li>Parties jouées : {stats.jouees}</li>
                <li>Victoires : {stats.pourcentage} %</li>
                <li>Série en cours : {stats.serieEnCours}</li>
                <li>Meilleure série : {stats.meilleureSerie}</li>
                <li>Total des points : {stats.totalPoints}</li>
            </ul>

            <h2>Répartition des victoires</h2>
            {stats.repartition.map((nombre, i) => (
                <div className="barre-ligne" key={i}>
                    <span>{i + 1}</span>
                    <div className="barre" style={{ width: `${(nombre / max) * 100}%` }}>{nombre}</div>
                </div>
            ))}
            <Link to="/">Retour à l'accueil</Link>
        </>
    );
}

// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

const CLE = "historique";

export function lireHistorique() {
    return JSON.parse(localStorage.getItem(CLE) ?? "[]");
}

export function enregistrerPartie(partie) {
    const historique = lireHistorique();
    if (historique.some((p) => p.id === partie.id)) return; // évite les doublons (rechargement, StrictMode)
    historique.push(partie);
    localStorage.setItem(CLE, JSON.stringify(historique));
}

export function meilleursScores() {
    return lireHistorique()
        .filter((p) => p.gagne)
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);
}

export function statistiques(pseudo) {
    const parties = lireHistorique().filter((p) => p.pseudo === pseudo);
    const victoires = parties.filter((p) => p.gagne);

    let serieEnCours = 0;
    let meilleureSerie = 0;
    for (const p of parties) {
        serieEnCours = p.gagne ? serieEnCours + 1 : 0;
        meilleureSerie = Math.max(meilleureSerie, serieEnCours);
    }

    const repartition = Array(6).fill(0);
    victoires.forEach((p) => repartition[p.essais - 1]++);

    return {
        jouees: parties.length,
        pourcentage: parties.length ? Math.round((victoires.length / parties.length) * 100) : 0,
        serieEnCours,
        meilleureSerie,
        totalPoints: parties.reduce((total, p) => total + p.points, 0),
        repartition,
    };
}

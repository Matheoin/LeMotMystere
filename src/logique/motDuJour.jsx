// *** ajout après la soutenance
import mots from "../data/mots_solutions.json";

export function numeroDuJour(date = new Date()) {
    return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export function motDuJour(date = new Date()) {
    return mots[(numeroDuJour(date) * 7919) % mots.length].toUpperCase();
}
// ***
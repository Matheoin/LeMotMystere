import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { POINTS } from "../data/pointsObtenus.js";

// *** Ajout après la soutenance
import { numeroDuJour } from "../logique/motDuJour.jsx";
import { verifierMot, afficherMot, colorer, etatsLettres } from "../logique/jeu.jsx";
import { enregistrerPartie } from "../logique/historique.jsx";
import Clavier from "./Clavier.jsx";
// ***

export default function Grille({ pseudo, motMystere, onRecommencer }) {
    const naviguer = useNavigate();

    // *** ajout après la soutenance
    const cle = `${pseudo}-${numeroDuJour()}`;
    // ***
    const [essais, setEssais] = useState(() => JSON.parse(localStorage.getItem("essaisParPseudo") ?? "{}")[cle] ?? []);
    const [saisie, setSaisie] = useState("");

    const [verification, setVerification] = useState(false);
    const [message, setMessage] = useState("");
    const [invalide, setInvalide] = useState(false);
    const [motAffiche, setMotAffiche] = useState("");

    const gagne = essais.includes(motMystere);
    const perdu = !gagne && essais.length === 6;
    // *** Ajout après la soutenance
    const points = gagne ? POINTS[essais.length - 1] : 0;
    // *** 

    function recommencer() {
        setEssais([]);
        setSaisie("");
        setMotAffiche("");
        onRecommencer();
    }

    useEffect(() => {
        if (!(gagne || perdu)) return;
        afficherMot(motMystere)
            .then(setMotAffiche)
            .catch(() => setMotAffiche(motMystere.toLowerCase()));
    }, [gagne, perdu, motMystere]);

    useEffect(() => {
        if (!(gagne || perdu)) return;
        enregistrerPartie({
            id: `${cle}-${motMystere}`,
            pseudo,
            mot: motMystere,
            gagne,
            essais: essais.length,
            points,
            date: new Date().toISOString(),
        });
    }, [gagne, perdu]);


    function toucher(touche) {
        if (gagne || perdu) return;

        if (touche === "EFFACER" && !verification) {
            setSaisie(saisie.slice(0, -1));
            setInvalide(false);
        }
        else if (touche === "ENTREE") {
            if (saisie.length !== 5 || verification) return;
            setVerification(true);
            setMessage("");
            setInvalide(false);

            verifierMot(saisie)
                .then((existe) => {
                    if (!existe) {
                        setMessage("Ce mot n'existe pas ou n'est pas français !");
                        setInvalide(true);
                        return;
                    }
                    const nouveauxEssais = [...essais, saisie];
                    setEssais(nouveauxEssais);
                    setSaisie("");

                    const essaisParPseudo = JSON.parse(localStorage.getItem("essaisParPseudo") ?? "{}");
                    essaisParPseudo[cle] = nouveauxEssais;
                    localStorage.setItem("essaisParPseudo", JSON.stringify(essaisParPseudo));
                })
                .catch(() => {
                    setMessage("L'API ne répond pas");
                })
                .finally(() => setVerification(false));
        }
        else if (/^[A-Z]$/.test(touche) && saisie.length < 5) {
            setSaisie(saisie + touche);
            setInvalide(false);
        }
    }

    useEffect(() => {
        function appuyer(e) {
            if (e.key === "Backspace") toucher("EFFACER");
            else if (e.key === "Enter") toucher("ENTREE");
            else if (/^[a-z]$/i.test(e.key)) toucher(e.key.toUpperCase()); // /^[a-z]$/i.test(e.key) : Vérifie que la touche préssé est une seule lettre
        }
        window.addEventListener("keydown", appuyer);
        return () => window.removeEventListener("keydown", appuyer);
    });

    return (
        <div className="grille">
            {Array.from({ length: 6 }, (_, i) => {
                const mot = i < essais.length ? essais[i] : i === essais.length ? saisie : "";
                const couleurs = i < essais.length ? colorer(essais[i], motMystere) : [];
                const retourne = i === essais.length - 1;
                return(
                    <div className={`ligne ${i === essais.length && invalide ? "rouge" : ""}`} key={i}>
                        {Array.from({ length: 5 }, (_, j) => (
                            <div
                                className={`case ${couleurs[j] ?? ""} ${retourne ? "retourne" : ""}`}
                                style={retourne ? { animationDelay: `${j * 300}ms` } : undefined}
                                key={j}
                            >
                                {mot[j] ?? ""}
                            </div>
                        ))}
                    </div>
                );
            })}
            {message && <p>{message}</p>}
            {!(gagne || perdu) && <Clavier etats={etatsLettres(essais, motMystere)} onTouche={toucher} />}
            {(gagne || perdu) && 
                <>
                    <div>
                        {gagne && <h3 className="message">Victoire !</h3>}
                        {perdu && <h3 className="message">Perdu !</h3>}
                        <p className="message"><i>Vous obtenez <strong>{points} points</strong></i></p>

                        <p className="message">Le mot était :</p>
                        <h2 className="message">
                            {motAffiche
                                ? <a href={`https://fr.wiktionary.org/wiki/${encodeURIComponent(motAffiche)}`} target="_blank" rel="noreferrer">{motAffiche.toUpperCase()}</a>
                                : "..."
                            }
                        </h2> 
                    </div>
                    
                    <button onClick={() => naviguer("/")}>Accueil</button>
                    <button onClick={recommencer}>Recommencer</button>
                </>
            }   
        </div>
    );
}
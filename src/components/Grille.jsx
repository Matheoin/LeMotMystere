import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { POINTS } from "../data/pointsObtenus.js";

function colorer(proposition, mot) {
    const couleurs = Array(5).fill("gris");
    const restantes = {};

    // 1er passage : les lettres bien placées
    for (let i = 0 ; i < 5 ; i++) {
        if (proposition[i] === mot[i]) {
            couleurs[i] = "vert";
        }
        else {
            restantes[mot[i]] = (restantes[mot[i]] ?? 0) + 1;
        }
    }

    // 2ème passage : les lettres mal placées
    for (let i = 0 ; i < 5 ; i++) {
        if (couleurs[i] === "vert") continue;
        const lettre = proposition[i];
        if (restantes[lettre] > 0) {
            couleurs[i] = "jaune";
            restantes[lettre]--;
        }
    }
    return couleurs;
}

export default function Grille({ pseudo, motMystere, onRecommencer }) {
    const naviguer = useNavigate();

    const [essais, setEssais] = useState(() => JSON.parse(localStorage.getItem("essaisParPseudo") ?? "{}")[pseudo] ?? []);
    const [saisie, setSaisie] = useState("");

    const gagne = essais.includes(motMystere);
    const perdu = !gagne && essais.length === 6;

    function recommencer() {
        setEssais([]);
        setSaisie("");
        onRecommencer();
    }

    useEffect(() => {
        function appuyer(e) {
            if (gagne || perdu) return;

            if (e.key === "Backspace") {
                setSaisie(saisie.slice(0, -1));
            }
            else if (e.key === "Enter") {
                if (saisie.length !== 5) return;
                const nouveauxEssais = [...essais, saisie];
                setEssais(nouveauxEssais);
                setSaisie("");

                const essaisParPseudo = JSON.parse(localStorage.getItem("essaisParPseudo") ?? "{}");
                essaisParPseudo[pseudo] = nouveauxEssais;
                localStorage.setItem("essaisParPseudo", JSON.stringify(essaisParPseudo));
            }
            else if (/^[a-z]$/i.test(e.key) && saisie.length < 5) { // /^[a-z]$/i.test(e.key) : Vérifie que la touche préssé est une seule lettre
                setSaisie(saisie + e.key.toUpperCase());
            }
        }
        window.addEventListener("keydown", appuyer);
        return () => window.removeEventListener("keydown", appuyer);
    }, [saisie, essais, gagne, perdu]);

    return (
        <div className="grille">
            {Array.from({ length: 6 }, (_, i) => {
                const mot = i < essais.length ? essais[i] : i === essais.length ? saisie : "";
                const couleurs = i < essais.length ? colorer(essais[i], motMystere) : [];
                return(
                    <div className="ligne" key={i}>
                        {Array.from({ length: 5}, (_, j) => (
                            <div className={`case ${couleurs[j] ?? ""}`} key={j}>{mot[j] ?? ""}</div>
                        ))}
                    </div>
                );
            })}
            {gagne && 
                <div>
                    <p className="message">Victoire ! Mot trouvé en {essais.length} essai(s).</p>
                    <p className="message">Vous gagnez <strong>{POINTS[essais.length - 1]} points</strong> !</p>
                </div>
            }
            {perdu && 
            <p className="message">Perdu ! Le mot était <strong>{motMystere}</strong>.</p>} 
            {(gagne || perdu) && 
                <>
                    <button onClick={() => naviguer("/")}>Accueil</button>
                    <button onClick={recommencer}>Recommencer</button>
                </>
            }   
        </div>
    );
}
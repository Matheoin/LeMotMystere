import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { POINTS } from "../data/pointsObtenus.js";
import { numeroDuJour } from "../logique/motDuJour.jsx";

function lireReponse(response) {
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json();
}

function verifierMot(mot) {
    const page = encodeURIComponent(mot.toLowerCase()); 

    return (
        fetch(`https://fr.wiktionary.org/w/api.php?action=parse&page=${page}&prop=tocdata&format=json&formatversion=2&origin=*`, {
            method: "GET", 
            headers: { "Api-User-Agent": "LeMotMystere/json" }
        })
            .then(lireReponse)
            .then((data) => {
                if (data.error) return false; // data.error : c'est ainsi qu'on detecte qu'un mot n'existe pas // La page n'existe pas
                return data.parse.tocdata.sections.some((section) => section.anchor === "Français");
            })
    );
}

// *** ajouter après la soutenance
function afficherMot(mot) {
    const page = mot.toLowerCase();

    return (
        fetch(`https://fr.wiktionary.org/w/api.php?action=query&list=search&srsearch=intitle:${page}&format=json&formatversion=2&origin=*`, {
            method: "GET",
            headers: { "Api-User-Agent": "LeMotMystere/json" }
        })
            .then(lireReponse)
            .then(async (data) => {
                if (data.query.search.some((titre) => titre.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === page)) {
                    const responses = data.query.search
                        .map((r) => r.title)
                        .filter((t) => t === t.toLowerCase() && t.normalize("NFD".replace(/[\u0300-\u036f]/g, "").normalize("NFC") === page))
                        .sort((a, b) => (a === page ? -1 : b === page ? 1 : 0));
                    for (const titre of responses) {
                        if (await verifierMot(titre)) return titre;
                    }
                }
                return page;
            })
    );
}
// ***

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
        function appuyer(e) {
            if (gagne || perdu) return;

            if (e.key === "Backspace" && !verification) {
                setSaisie(saisie.slice(0, -1));
                setInvalide(false);
            }
            else if (e.key === "Enter") {
                if (saisie.length !== 5 || verification) return;
                setVerification(true);
                setMessage("");

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
            else if (/^[a-z]$/i.test(e.key) && saisie.length < 5) { // /^[a-z]$/i.test(e.key) : Vérifie que la touche préssé est une seule lettre
                setSaisie(saisie + e.key.toUpperCase());
                setInvalide(false);
            }
        }
        window.addEventListener("keydown", appuyer);
        return () => window.removeEventListener("keydown", appuyer);
    }, [saisie, essais, gagne, perdu, verification, pseudo, invalide]);

    return (
        <div className="grille">
            {Array.from({ length: 6 }, (_, i) => {
                const mot = i < essais.length ? essais[i] : i === essais.length ? saisie : "";
                const couleurs = i < essais.length ? colorer(essais[i], motMystere) : [];
                return(
                    <div className={`ligne ${i === essais.length && invalide ? "rouge" : ""}`} key={i}>
                        {Array.from({ length: 5 }, (_, j) => (
                            <div className={`case ${couleurs[j] ?? ""}`} key={j}>{mot[j] ?? ""}</div>
                        ))}
                    </div>
                );
            })}
            {message && <p>{message}</p>}
            {(gagne || perdu) && 
                <>
                    <div>
                        {gagne && <h3 className="message">Victoire !</h3>}
                        {perdu && <h3 className="message">Perdu !</h3>}
                        <p className="message"><i>Vous obtenez <strong>{POINTS[essais.length - 1]} points</strong></i></p>

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
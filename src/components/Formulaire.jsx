import { useState } from "react";

export default function Formulaire({ onValider }) {
    const [pseudo, setPseudo] = useState(() => localStorage.getItem("pseudo") ?? "");
    const [erreurs, setErreurs] = useState({});

    function valider() {
        const e = {};
        if (pseudo.trim().length < 1) e.pseudo = "Le pseudo ne peut pas être vide.";
        return e;
    }

    function envoyer(evenement) {
        evenement.preventDefault();
        const e = valider();
        setErreurs(e);
        if (Object.keys(e).length === 0) {
            localStorage.setItem("pseudo", pseudo.trim());
            onValider({ pseudo: pseudo.trim() });
        }
    }

    return (
        <form onSubmit={envoyer} noValidate>
            <p>
                <label htmlFor="pseudo">Pseudo</label>
                <input id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} aria-invalid={Boolean(erreurs.pseudo)} aria-describedby="erreur-pseudo" />
                {erreurs.pseudo && <span id="erreur-pseudo" className="erreur">{erreurs.pseudo}</span>}
            </p>
            <button type="submit">JOUER</button>
        </form>
    );
}
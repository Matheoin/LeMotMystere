// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

const RANGEES = ["AZERTYUIOP", "QSDFGHJKLM", "WXCVBN"];

export default function Clavier({ etats, onTouche }) {

    function cliquer(e, touche) {
        e.currentTarget.blur(); 
        onTouche(touche);
    }

    return (
        <div className="clavier">
            {RANGEES.map((rangee, i) => (
                <div className="rangee" key={i}>
                    {i === 2 && <button className="touche large" onClick={(e) => cliquer(e, "ENTREE")}>Entrée</button>}
                    {[...rangee].map((lettre) => (
                        <button className={`touche ${etats[lettre] ?? ""}`} key={lettre} onClick={(e) => cliquer(e, lettre)}>{lettre}</button>
                    ))}
                    {i === 2 && <button className="touche large" onClick={(e) => cliquer(e, "EFFACER")} aria-label="Effacer">⌫</button>}
                </div>
            ))}
        </div>
    );
}

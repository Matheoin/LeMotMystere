// *** Fichier crée après la soutenance
// *** Fonction déplacer après la soutenance

function lireReponse(response) {
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    return response.json();
}

export function verifierMot(mot) {
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
export function afficherMot(mot) {
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
                        .filter((t) => t === t.toLowerCase() && t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === page)
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

export function colorer(proposition, mot) {
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

const PRIORITE = { gris: 1, jaune: 2, vert: 3 };

export function etatsLettres(essais, mot) {
    const etats = {};
    for (const essai of essais) {
        const couleurs = colorer(essai, mot);
        for (let i = 0 ; i < 5 ; i++) {
            const lettre = essai[i];
            if (PRIORITE[couleurs[i]] > (PRIORITE[etats[lettre]] ?? 0)) etats[lettre] = couleurs[i];
        }
    }
    return etats;
}


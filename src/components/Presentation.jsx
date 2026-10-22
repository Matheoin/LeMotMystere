

export default function Presentation() {

    return (
        <>
            <p>
                Trouver le mot de cinq lettres en six essais au maximum.
                Après chaque proposition, chaque lettre change de couleur :
            </p>
            <ul>
                <li>
                    vert : la lettre est dans le mot, à la bonne place
                </li>
                <li>
                    jaune : la lettre est dans le mot, mais à une autre place
                </li>
                <li>
                    gris : la lettre n'est pas dans le mot, ou pas autant de fois que proposé
                </li>
            </ul>
            <p>
                Les propositions doivent être de vrais mots français.
            </p>
        </>
    );
}
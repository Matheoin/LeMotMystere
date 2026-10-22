# LeMotMystere

## Groupe
Mathéo

## Installation et lancement
### Lancer l'API du Wiktionnaire
```bash
npm install
npm start
```
### Lancer l'application
```bash
npm install
npm run dev
```

## Choix techniques importants et Bibliothèques ajoutées
### Choix techniques
### Bibliothèques ajoutées

## Les paliers
### Palier 1 : le jeu
Une page d'accueil et une partie complète, jouable au clavier de l'ordinateur.
Attendus :
- [x] une page d'accueil présente le jeu : son nom, une phrase d'explication, un champ pour saisir le pseudo du joueur et un bouton pour lancer une partie ; le pseudo est mémorisé pour les visites suivantes ;
- [x] la partie a sa propre adresse, distincte de l'accueil ;
- [x] une grille de 6 lignes de 5 cases ;
- [x] le mot mystère est tiré au hasard dans la liste fournie ;
- [x] les lettres se tapent au clavier, la touche Retour arrière efface, la touche Entrée valide une ligne complète ;
- [x] après validation, chaque lettre prend la bonne couleur, y compris quand une lettre apparaît plusieurs fois dans la proposition ou dans le mot ;
- [x] la victoire et la défaite sont détectées ; en cas de défaite, le mot est révélé ;
- [x] à la fin de la partie, le joueur voit les points obtenus, et peut lancer une nouvelle partie ou revenir à l'accueil ;
- [ ] la logique du jeu (comparaison d'une proposition avec le mot, état de la partie) est écrite dans des fonctions séparées des composants d'affichage.
### Palier 2 : le dictionnaire
Seuls les vrais mots sont acceptés.
Attendus :
- [ ] avant d'être colorée, chaque proposition est vérifiée auprès du Wiktionnaire : seuls les mots français sont acceptés ;
- [ ] un mot refusé ne compte pas comme un essai ; le joueur en est averti et la ligne le montre visuellement ;
- [ ] pendant la vérification, le joueur voit que l'application travaille, et ne peut pas valider une seconde fois ;
- [ ] si l'API ne répond pas, le joueur en est informé et la partie n'est pas bloquée : décidez d'un comportement raisonnable et justifiez-le dans le README ;
- [ ] à la fin de la partie, le mot mystère est affiché avec ses accents et un lien vers sa page du Wiktionnaire.
### Palier 3 : le confort de jeu
Le jeu devient agréable.
Attendus :
- [ ] un clavier à l'écran, utilisable à la souris ou au doigt, dont les touches prennent la couleur de ce qu'on sait déjà de chaque lettre ;
- [ ] les lettres se retournent une à une à la validation, et la ligne tremble quand un mot est refusé ;
- [ ] un tableau des scores : les dix meilleures parties, classées par points, avec pour chacune le pseudo, le mot trouvé, le nombre d'essais, les points et la date ; plusieurs joueurs peuvent se succéder sur le même ordinateur et apparaître dans le même tableau ; le tableau est conservé entre deux visites ;
- [ ] un écran de statistiques du joueur : parties jouées, pourcentage de victoires, série en cours, meilleure série, total des points, répartition des victoires selon le nombre d'essais ;
- [ ] la page d'accueil donne accès à une nouvelle partie, au tableau des scores, aux statistiques et aux règles ;
- [ ] un écran de règles, avec un exemple illustré des trois couleurs ;
- [ ] chaque écran a sa propre adresse.
### Palier 4 : le mot du jour
Comme dans le jeu original, tout le monde cherche le même mot chaque jour, et le jeu est accessible en
ligne.
Attendus :
- [ ] l'application est déployée sur Vercel, à partir du dépôt Git : chaque envoi sur la branche principale met automatiquement le site à jour ;
- [ ] toutes les adresses de l'application fonctionnent en ligne, y compris quand on rafraîchit une page ou qu'on ouvre directement un lien vers une partie ou vers le tableau des scores ;
- [ ] un mode « mot du jour » : le même mot pour tous les joueurs, sur tous les ordinateurs, qui change à minuit ; le mode « partie libre » reste disponible ;
- [ ] une partie du jour commencée reprend où elle en était si la page est rechargée ; une fois terminée, elle ne peut pas être rejouée ;
- [ ] un compte à rebours indique le temps restant avant le prochain mot ;
- [ ] le tableau des scores distingue le classement du mot du jour (tous les joueurs de l'ordinateur sur le mot du jour, par points puis par temps de résolution) du classement général ;
- [ ] le résultat se partage par un texte copié dans le presse-papiers, qui montre les couleurs sans révéler les lettres :
```bash
Le Mot Mystère 21/10 · 4/6
⬛🟨⬛⬛⬛
⬛🟩🟨⬛⬛
🟩🟩⬛🟩⬛
🟩🟩🟩🟩🟩
```
- [ ] au moins cinq tests automatisés, dont au moins deux sur la coloration des lettres en double.
### Palier 5 : les variantes
Le joueur choisit sa difficulté.
Attendus :
- [ ] des mots de 6 et 7 lettres en partie libre, la grille et le nombre d'essais s'adaptant à la longueur. Pour ces longueurs, constituez vous-mêmes une liste de mots solutions, et expliquez dans le README comment vous l'avez obtenue ;
- [ ] un mode difficile : toute lettre révélée en vert doit rester à sa place et toute lettre jaune doit être réutilisée dans les propositions suivantes ; une proposition qui ne respecte pas ces règles est refusée avec un message précis ;
- [ ] les points tiennent compte de la difficulté : × 1,5 pour 6 lettres, × 2 pour 7 lettres, × 1,5 en mode difficile ; le tableau des scores indique la longueur et le mode de chaque partie, et peut être filtré selon ces critères ;
- [ ] les réglages (longueur, mode difficile) sont conservés entre deux visites, et la longueur fait partie de l'adresse de la partie.
### Palier 6 : les quatre grilles
Un mode expert : quatre mots mystères à trouver en même temps.
Attendus :
- [ ] quatre grilles affichées ensemble, et neuf essais au total ;
- [ ] chaque proposition est jouée dans les quatre grilles à la fois ; une grille résolue se fige ;
- [ ] le clavier à l'écran montre l'état de chaque lettre pour chacune des quatre grilles ;
- [ ] un écran de fin indique les grilles résolues, en combien d'essais, et révèle les mots manqués ;
- [ ] les parties à quatre grilles ont leur propre règle de points, que vous définissez et expliquez dans les règles du jeu, et leur propre classement.
## Difficultés rencontrées et résolutions

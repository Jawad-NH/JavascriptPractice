// Recuperation des elements HTML (div:'gameboard' + p:'info')
const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

// Creation du tableau vide qui servira a afficher le jeu
const startCells = ["", "", "", "", "", "", "", "", ""];

// On défini par qui la fonction go va commencer, en l'occurence, par le circle
let go = "circle"

// Ajout de text dans la balise HTML #info via la propriété .textContent
// Dans cette exemple, nous avons rajouter 'Circle goes first' dans la balise infoDisplay via la propriété .textContent
infoDisplay.textContent = "Circle goes first"

// Creation du Gameboard
function createBoard() {
  // Pour chaque cell de startCells + leur index => on appelle le Document afin de creer un element, l'element sera un div. l'underscore _cell veut dire que nous n'allons pas vraiment utiliser ce parametre 
  startCells.forEach((_cell, index) => {
    // les elements div que nous allons creer pour chaque cell, nous allons les mettre dans une nouvelle variable
    const cellElement = document.createElement("div")
    // Nous devons styliser les elements 'div' que nous avons crée, pour y avoir acces, nous allons leur rajouter une class
    cellElement.classList.add("square")
    // Creation d'index pour chaque div afin de nous faciliter la configuration
    cellElement.id = index
    // Creation d'un evenement, a chaque fois que nous allons cliquer dans une cellule, nous appelons la fonction addGo
    cellElement.addEventListener("click", addGo)

    // Une fois que nous avons creer la variable CellElement, nous allons l'ajouter(append) dans le gameBoard
    gameBoard.append(cellElement)

    /* On va rajouter un index afin de bien situé toutes les divs sur notre gameboard
    cellElement.innerHTML = index */
    /* Creation des circles dans les div
    const circleElement = document.createElement("div") */
    /* Liaison entre les circle et la class circle qu'on a crer en CSS
    circleElement.classList.add("cross") */
    /* Affichage des circle dans les div
    cellElement.append(circleElement) */

  })

}
// Une fois la fonction createBoard parametrer, on rappelle la fonction afin de l'executer.
createBoard()


// Creation de la fonction addGo, le (e) nous donne des informations complementaire
function addGo(e) {
  // Console log pour tester que les click fonctionne dans les cellules, le 'e.target' nous affiche les infos concernant l'endroit ou nous clickons
  console.log("clicked", e.target)
  // On crée une nouvelle div afin d'afficher un circle ou une croix
  const goDisplay = document.createElement("div")
  // On cible le goDisplay pour ensuite y ajouter un cirle ou une croix en se referant a la fonction (go)
  goDisplay.classList.add(go)
  // via le parametre .append, on va ajouter au goDisplay la fonction (go) afin de faire apparaitre un circle
  e.target.append(goDisplay)
  // On ré-affect la fonction go afin qu'après le circle on laisse apparaitre la croix. le : "circle" sert a revenir au circle après la croix
  go = go === "circle" ? "cross" : "circle"
  /* Le console.log(go) nous confirme qu'a chaque click dans une case on a d'abord un circle, ensuite une croix, ensuite circle, ...
  console.log(go) */

  // On change le paragraph infoDisplay afin qu'il soit intéractif et qu'il nous dise qui doit jouer en fonction du go (soit circle, soit croix)
  infoDisplay.textContent = "It is now the " + go + " to play"

  // On donne l'instruction via le removeEventListener qu'a chaque click dans le e.target, le addGo apparait une fois ensuite il n'est plus possible de faire apparaitre quelque chose dans le meme e.target car nous supprimons la fonction. ceci afin d'empecher qu'une croix ET un circle apparaisse dans la meme target.
  e.target.removeEventListener("click", addGo)
  checkScore()

}

function checkScore() {
  // via le querySelectorAll on a la possibilité de selectionner plusieurs elements, si on mets pas le 'All' il prendra en compte 1 element. ici on a ciblé toute les divs avec la clas square (donc toutes les box de notre gamepad)
  const allSquares = document.querySelectorAll(".square")
  /* le console.log nous affiche une node.liste en reprenant toute nos divs avec la class .square dans une array (un tableau)
  console.log(allSquares) */
  // On note les combos gagnant
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  // Pour chaque item dans le tableau ci-dessus, on va prendre le array et checker chaque cell, on va cibler le 'firstchild' cad le l'element individuelle dans l'array, ensuite on va cibler la class, si il y'a marqué circle a chaque fois, alors on a gagner.
  winningCombos.forEach(array => {
    const circleWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains("circle"))
    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!"
      // Cette ligne de code nous permet d'arreter le jeux une fois que le circle a gagné
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    }
  })
  // on refait parreil pour les croix
  winningCombos.forEach(array => {
    const crossWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains("cross"))
    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!"
      // Cette ligne de code nous permet d'arreter le jeux une fois que le cross a gagné
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    }
  })
}


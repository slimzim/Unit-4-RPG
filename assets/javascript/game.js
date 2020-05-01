// VARIABLES ======================================================

var battleActive = false;

var enemiesRemaining = ""

// The players array holds 4 objects.
// Each object holds data about a player.

var players = [
    {
        name: "JZ",
        imgSrc: "assets/images/JZ.jpg",
        life: 150,
        attack: 7,
        defense: 8,
        weapon: "clarinet",
    },
    {
        name: "Adam",
        imgSrc: "assets/images/Adam.jpg",
        life: 100,
        attack: 6,
        defense: 20, 
        weapon: "rolls",
    }, 
    {
        name: "Micah",
        imgSrc: "assets/images/Micah.jpg",
        life: 140,
        attack: 5,
        defense: 10,
        weapon: "microphone",
    },
    {
        name: "Phil", 
        imgSrc: "assets/images/Phil.jpg",
        life: 200, 
        attack: 6,
        defense: 15,
        weapon: "butter",
    }
    ];

// Containers are dynamically created for each player.

playersLineup();

function playersLineup() {

    for (var i=0; i < players.length; i++){
        var characterLineup = $("<div>");
        characterLineup.addClass("lineup-container");

// Each player is granted a value so that the upcoming on.click function can 
// differentiate between the players.

        characterLineup.attr("value", i)
        characterLineup.html("" +
            "<p>" + players[i].name + "</p>" +
            "<img src=" + players[i].imgSrc + " value=" + i + ">" + 
            "<p>" + players[i].life + "</p>"
            )   
        $("#character-lineup").append(characterLineup)
    }   
}
// This on.click function listens for the user's choice of character.

$(document).on("click", ".lineup-container", function(){
    chosenCharacter = $(this).attr("value");

// Then a for loop moves the chosen character to the "user-character" div...

    for (var i=0; i < players.length; i++){
        if (parseInt(chosenCharacter) === i) {
            userCharacter = $("<div>")
            // $(userCharacter).attr("id", "user-life")  // <-------- MAKES ENTIRE DIV GET OVERWRITTEN
            userCharacter.addClass("user-character")
            userCharacter.html("" +
            "<p>" + players[i].name + "</p>" +
            "<img src=" + players[i].imgSrc + ">" +
            "<p><span id=\"#user-life\">" + players[i].life + "</span></p>"  // <------- DOES NOT WORK, CANNOT FIGURE OUT WHY
            )
            $("#user-character").append(userCharacter)
            $("#character-lineup").empty()

// This if statement concludes by calling a global function to create a new object for battle:
            makeUserCharacter(i)
       

        }

// The else statement makes containers for all the other characters
// and moves them to the "enemies" div.

    else {
            enemiesRemaining++;
            enemyCharacter = $("<div>")
            enemyCharacter.addClass("enemy")
            enemyCharacter.attr("value", i)
            enemyCharacter.html("" +
            "<p>" + players[i].name + "</p>" +
            "<img src=" + players[i].imgSrc + ">" + 
            "<p>" + players[i].life + "</p>"
            )   
            $("#enemies").append(enemyCharacter)
            $("#character-lineup").empty()
         }
    }   

})
    
// This on.click function listens for the user's choice of 
// which enemy to fight.  

$(document).on("click", ".enemy", function(){
    if (battleActive){
        console.log(battleActive)
        console.log("Duplicate Enemy!!!")
        $("#game-over").text("You can't fight two enemies at once!")  // <---- WHY WON'T THIS WORK RIGHT?!
    }

    chosenEnemy = $(this).attr("value");

// This for loop will move the chosen enemy to the defender div...

    for (var i=0; i < players.length; i++){
        if (parseInt(chosenEnemy) === i){
            chosenEnemy = $("<div>")
            chosenEnemy.addClass("defender")
            chosenEnemy.html("" +
            "<p>" + players[i].name + "</p>" +
            "<img src=" + players[i].imgSrc + ">" +
            "<p>" + players[i].life + "</p>"
            )
            $("#defender").append(chosenEnemy)

// ... and remove the chosen enemy from the enemies div.

            $(this).addClass("toRemove")
            $("div").remove(".toRemove")

//  Finally, we call this function to make a new object for battle. 
            
            makeDefender(i)        
        }            
    }
})

// FUNCTIONS FOR MAKING BATTLE PARTICIPANTS ==================================

function makeUserCharacter(x) {
    userCharacter = {
        name: players[x].name,
        life: players[x].life,
        attack: players[x].attack,
        weapon: players[x].weapon,
    }
    console.log("userCharacter: ")
    console.log(userCharacter)
}

function makeDefender(x) {
    chosenEnemy = {
        name: players[x].name,
        life: players[x].life,
        attack: players[x].attack,
        weapon: players[x].weapon,
        defense: players[x].defense,
    }
    console.log("Defender: ")
    console.log(chosenEnemy)
        $("#enemy-attack").empty()
        $("#user-attack").empty()
        $("#fight-text").empty()
    battleActive = true;

}

// =======================================================================

// BATTLE SECTION ========================================================

var attackFactor = 1

$(document).on("click", "#attack", function(){ 
    if (battleActive) {
        userAttack();
    }

// This else statement exists to prevent the attack button from doing anything if there
// is no defender in the devender div.

    else {
        $("#fight-text").text("There's no defender right now, chill out!")
    }
})

// BATTLE FUNCTIONS ======================================================    

// The user attacks...

    function userAttack() {

        chosenEnemy.life = chosenEnemy.life -= (userCharacter.attack * attackFactor)
        console.log("Enemy Life:")
        console.log(chosenEnemy.life)
        $("#user-attack").text(userCharacter.name + " attacked " + chosenEnemy.name + " with " + userCharacter.weapon + " and caused " + (userCharacter.attack * attackFactor) + " damage!")
            attackFactor++;
        
// If the defender has any hit points left, the defender fights back...

        if (chosenEnemy.life > 0) {
            defenderAttack();
        }

// If the defender's hit points go below zero, the defender is cleared out of the div.

        else if (chosenEnemy.life <= 0) {
            $("#fight-text").text(chosenEnemy.name + " has been defeated!")
            $("#enemy-attack").empty()
            $("#defender").empty()
            battleActive = false;
            enemiesRemaining--;

// If there are no enemies left to fight, the game is over and the reset button appears via 
// the makeResetButton function.

            if (enemiesRemaining === 0){
                $("#game-over").text("You win the game!")
                makeResetButton()
                }
            }
    }   

// This function represents the defender's attack...

    function defenderAttack() {
    
        userCharacter.life = userCharacter.life -= chosenEnemy.defense
        console.log("User Life:")
        console.log(userCharacter.life)

// If the user's character has any life left, hit points are subtracted and results displayed.

    if (userCharacter.life > 0) {
        $("#enemy-attack").text(chosenEnemy.name + " fought back with " + chosenEnemy.weapon + " and caused " + chosenEnemy.defense + " damage!")
        $("#user-life").text(userCharacter.life) // <------- CURRENTLY NO DESTINATION
        }

// If the user's character goes below zero hit points, the game is over, and the 
// reset button appears via the makeResetButton.

    else if (userCharacter.life <= 0) {
        $("#fight-text").text(userCharacter.name + " was defeated.")
        $("#game-over").text("Game over!")
        makeResetButton();
        battleActive = false;
        }
    }

// This function makes the reset button...

    function makeResetButton(){
        resetButton = $("<button>")
        resetButton.attr("id", "reset")
        resetButton.html("Reset")
        $("#reset-button").append(resetButton)
    }

// This function resets the game, emptying out all divs and lining up the characters
// for a new round.

    $(document).on("click", "#reset", function(){
        playersLineup();
        $("#user-character").empty();
        $("#reset-button").empty();
        $("#enemy-attack").empty();
        $("#user-attack").empty();
        $("#fight-text").empty();
        $("#game-over").empty();
        $("#defender").empty();
        $("#enemies").empty();
        battleActive = false;
        attackFactor = 1;
    })
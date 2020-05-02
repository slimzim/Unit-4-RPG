// VARIABLES ======================================================

var battleActive = false;
var userCharacterChosen = false;
var gameOver = false;

var enemiesRemaining = ""

// The players array holds 4 objects.
// Each object holds data about a player.

var players = [
    {
        name: "JZ",
        imgSrc: "assets/images/JZ.jpg",
        life: 160,
        attack: 5,
        defense: 10,
        weapon: "his clarinet",
    },
    {
        name: "Adam",
        imgSrc: "assets/images/Adam.jpg",
        life: 120,
        attack: 6,
        defense: 20, 
        weapon: "rolls that his mom made",
    }, 
    {
        name: "Micah",
        imgSrc: "assets/images/Micah.jpg",
        life: 140,
        attack: 5,
        defense: 14,
        weapon: "his trusty Twins baseball cap",
    },
    {
        name: "Phil", 
        imgSrc: "assets/images/Phil.jpg",
        life: 170, 
        attack: 4,
        defense: 12,
        weapon: "his butter blaster",
    }
    ];

// Containers are dynamically created for each player.

playersLineup();

function playersLineup() {
    $("#instructions").text("Choose your character!")
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
            userCharacter.addClass("user-character")
            userCharacter.append("<span></span>")
            userCharacter.html("" +
            "<p>" + players[i].name + "</p>" +
            "<img src=" + players[i].imgSrc + ">" +
            "<p><span id=\"user-life\">" + players[i].life + "</span></p>"  // <------- DOES NOT WORK, CANNOT FIGURE OUT WHY
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
            $("#instructions").text("Now choose an enemy to fight.")
         }
    }   

})
    
// This on.click function listens for the user's choice of 
// which enemy to fight.  

$(document).on("click", ".enemy", function(){
    if (battleActive){
        console.log("Duplicate Enemy!!!")
        $("#enemy-attack").empty();
        $("#user-attack").empty();
        $("#user-attack").text("You can't fight two enemies at once! Focus on fighting " + chosenEnemy.name + " right now!")  // <---- WHY WON'T THIS WORK RIGHT?!  THE TEXT DISPLAYS WHEN THAT ENEMY IS DEFEATED.  WHY?
        return
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
            "<p><span id=\"enemy-life\">" + players[i].life + "</span></p>"
            )
            $("#defender").append(chosenEnemy)

// ... and remove the chosen enemy from the enemies div.

            $(this).addClass("toRemove")
            $("div").remove(".toRemove")

//  Finally, we call this function to make a new object for battle. 
            
            makeDefender(i)  
            $("#instructions").text("Attack " + players[i].name + " by pushing the attack button!")      
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
    userCharacterChosen = true;
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


// On.click for user-character instructions.

$(document).on("click", ".user-character", function(){
    if (userCharacterChosen && gameOver === false){
        $("#user-attack").text("Stop clicking on yourself and focus on fighting " + chosenEnemy.name + "!")
        $("#enemy-attack").empty()
    }
})

$(document).on("click", ".defender", function(){
    if (userCharacterChosen && gameOver === false){
        $("#user-attack").text("Clicking on " + chosenEnemy.name + " isn't going to do any damage! Press the attack button!")
        $("#enemy-attack").empty()
    }
})




$(document).on("click", "#attack", function(){ 
    if (battleActive) {
        userAttack();
    }

    else if (gameOver) {
        return
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
        $("#enemy-life").text(chosenEnemy.life)
        $("#user-attack").text(userCharacter.name + " attacked " + chosenEnemy.name + " with " + userCharacter.weapon + " and caused " + (userCharacter.attack * attackFactor) + " damage!")
            attackFactor++;
        
// If the defender has any hit points left, the defender fights back...

        if (chosenEnemy.life > 0) {
            defenderAttack();
        }

// If the defender's hit points go below zero, the defender is cleared out of the div.

        else if (chosenEnemy.life <= 0) {
            $("#fight-text").text(chosenEnemy.name + " has been defeated!")
            $("#instructions").text("Choose your next enemy!") 
            $("#enemy-attack").empty()
            $("#defender").empty()
            battleActive = false;
            enemiesRemaining--;

// If there are no enemies left to fight, the game is over and the reset button appears via 
// the makeResetButton function.

            if (enemiesRemaining === 0){
                $("#game-over").text("You win the game!")
                $("#instructions").text("Press the reset button to play again!") 
                gameOver = true;
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
        $("#user-life").text(userCharacter.life)
        }

// If the user's character goes below zero hit points, the game is over, and the 
// reset button appears via the makeResetButton.

    else if (userCharacter.life <= 0) {
        $("#enemy-attack").text(chosenEnemy.name + " fought back with " + chosenEnemy.weapon + " and caused " + chosenEnemy.defense + " damage!")
        $("#user-life").text(userCharacter.life)
        $("#fight-text").text(userCharacter.name + " was defeated.")
        $("#game-over").text("Game over!")
        makeResetButton();
        $("#instructions").text("Press the reset button to play again!") 
        battleActive = false;
        gameOver = true;
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
        gameOver = false;
    })
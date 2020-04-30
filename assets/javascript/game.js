// The players array holds 4 objects.
// Each object holds data about a player.

var players = [
    {
        name: "JZ",
        imgSrc: "assets/images/JZ.jpg",
        life: 120,
        weapon: "clarinet",
    },
    {
        name: "Adam",
        imgSrc: "assets/images/Adam.jpg",
        life: 100,
        weapon: "rolls",
    }, 
    {
        name: "Micah",
        imgSrc: "assets/images/Micah.jpg",
        life: 180,
        weapon: "microphone",
    },
    {
        name: "Phil", 
        imgSrc: "assets/images/Phil.jpg",
        life: 250, 
        weapon: "butter",
    }
    ];

// Containers are dynamically created for each player.

for (var i=0; i < players.length; i++){
    var characterLineup = $("<div>");
    characterLineup.addClass("lineup-container");
    characterLineup.attr("value", i)
    characterLineup.html("" +
        "<p>" + players[i].name + "</p>" +
        "<img src=" + players[i].imgSrc + " value=" + i + ">" + 
        "<p>" + players[i].life + "</p>"
        )   
    $("#character-lineup").append(characterLineup)
    }   

// This function listens for the user's choice of character.

$(".lineup-container").on("click", function(){
    chosenCharacter = $(this).attr("value");
    console.log (players[chosenCharacter]);
    console.log ("value = " + chosenCharacter)

// Then a for loop moves the chosen character to the "user-character" div,
// and the other characters are moved to the "enemies" div.

for (var i=0; i < players.length; i++){
        if (parseInt(chosenCharacter) === i) {
        userCharacter = $("<div>")
        userCharacter.addClass("user-character")
        userCharacter.html("" +
        "<p>" + players[i].name + "</p>" +
        "<img src=" + players[i].imgSrc + ">" + 
        "<p>" + players[i].life + "</p>"
        )
        $("#user-character").append(userCharacter)
        $("#character-lineup").empty()
    }
    else {
        enemyCharacter = $("<div>")
        enemyCharacter.addClass("enemies")
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
    
// console.log("chosenCharacter" + chosenCharacter)
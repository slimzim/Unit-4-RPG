    var players = [
    {
        name: "JZ",
        imgSrc: "assets/images/JZ.jpg",
        life: 120,
    },
    {
        name: "Adam",
        imgSrc: "assets/images/Adam.jpg",
        life: 100,
    }, 
    {
        name: "Micah",
        imgSrc: "assets/images/Micah.jpg",
        life: 180,
    }, 
    {
        name: "Phil", 
        imgSrc: "assets/images/Phil.jpg",
        life: 250, 
    }
    ];




for (var i=0; i<3; i++){
    var enemiesToAttack = $("<div>")
    enemiesToAttack.addClass("enemies-to-attack")
    enemiesToAttack.html("" +
        "<p>" + players[i].name + "</p>" +
        "<img src=" + players[i].imgSrc + ">" + 
        "<p>" + players[i].life + "</p>"
        )   
    $("#enemies-to-attack").append(enemiesToAttack)
    }   
    
    
function createLogo(userChoice) {
    var output = document.getElementById("display_here");
    output.innerHTML = "";
    
    var links = [
        "http://www.dreamomania.info/dreamdictionary/wp-content/uploads/2013/02/V.jpg",
        "http://i452.photobucket.com/albums/qq248/lostvegasvip/Burning-letter-P-psd26647.png",
        "http://www.arro-signs.co.uk/red-letter-s.jpg",
    ];
    
    var choices = ["Taxi", "Uber", "Cabify"];
   
    var img = '<img src="' + links[userChoice] + '">';
    
    output.innerHTML =  img;
}
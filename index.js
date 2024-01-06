// Greeter
function called() {
    var time = new Date()
    let timestamp = time.getHours()
    console.log(timestamp)

    var greting_user;
    if (timestamp >= 0 && timestamp < 12){
        greting_user = "Good Morning🤩";
    }
    else if (timestamp >=12 && timestamp < 19){
        greting_user = "Good AfterNoon🥰"
    }
    else if (timestamp >=19 && timestamp < 24){
        greting_user = "Good Evening😎"
    }
    else if (timestamp >=24){
        greting_user = "Good Night😴"
    }

    document.getElementById("greetings").innerText = "Hello, "+greting_user
}

// text color changer
function changColor(){
    let list = ["red", "green", "yellow", "purple", "skyblue", "pink"]
    let m = Math.random() * 5
    console.log(parseInt(m))
    document.getElementById("greetings").style.color = list[parseInt(m)]
    document.getElementById("table").style.borderColor = list[parseInt(m)]
    document.getElementById("greetme").style.color = list[parseInt(m)]
    document.getElementById("changColor").style.color = list[parseInt(m)]
    document.getElementById("changbackColor").style.color = list[parseInt(m)]
    document.getElementById("about").style.color = list[parseInt(m)]
}

// background Color changer
function changBackgroundColor(){
    let list = ["red", "green", "yellow", "purple", "skyblue", "pink"]
    let m = Math.random() * 5
    console.log(parseInt(m))
    // document.getElementById("bck").style.backgroundColor = list[parseInt(m)]
    document.getElementById("bck").style.background = background(linear-gradient("-45deg, #ee9952, #e74c7e, #29a6d5, #66d5ab"))

}
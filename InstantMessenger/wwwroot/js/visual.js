const version = "0.0.5.1";
// Global variables
let CANVAS, CTX, MESSAGES, renderInterval;
let MOUSE = {
    x: null,
    y: null,
    radius: null
}
// create the Arrays
// they get multidimensional later
let LIGHTS = [];
let PARTICLE = [];

class Visual{
    constructor(mouseRadius, canvasName, z_index, backgroundColor, message){
        MESSAGES = message;
        // if message is not given set it to true
        if(message == undefined){
            MESSAGES=true
        }
        // get the canvas
        CANVAS = document.querySelector(canvasName);
        CTX = CANVAS.getContext("2d");
        // finish the global MOUSE-Array
        MOUSE = {
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            radius: mouseRadius
        }
        // set the height and all of the Canvas
        // height and width not with style to
        // create a canvas that has a solotion as the screen
        CANVAS.height = window.innerHeight;
        CANVAS.width = window.innerWidth;
        CANVAS.style.position = "fixed";
        CANVAS.style.zIndex = z_index;
        CANVAS.style.background = backgroundColor;
        CANVAS.style.left = "0px";
        CANVAS.style.top = "0px";
        // Print all if messages is on
        if(MESSAGES){
            console.log("Version: "+version+
            "\nCanvas Name: "+canvasName+
            "\nRadius set to the Mouse: "+mouseRadius+
            "\nBackground: "+backgroundColor+
            "\nz-index: "+z_index+"\n\n");
        }
    }
}
class Particle{
    // the Particle constructor
    // Color can also be a number, with a letter (r,g,b), to get Multiply Colors => 
    // 
    constructor({
        amount: amount = 1,
        color: color = "black",
        radius: radius = 10,
        pos: {
            x: x = 100,
            y: y = 100
        } = {
            x: 100,
            y: 100
        },
        collision: {
            collisionMouse: collisionMouse = false, 
            collisionOther: collisionOther = false,
            collisionBorder: collisionBorder = false
        } = {
            collisionMouse: false, 
            collisionOther: false,
            collisionBorder: false
        },
        negativeX: negativeX = false, 
        negativeY: negativeY = false,
        name: name = false, 
        type: type = "hard",
        connect: {
            connectMouse: connectMouse = false, 
            connectColor: connectColor = false, 
            connectNear: connectNear = "rgba(0,0,0,0.25)",
            connectRadius: connectRadius = 0
        } = {
            connectMouse: false, 
            connectColor: false, 
            connectNear: "rgba(0,0,0,0.25)",
            connectRadius: 0
        }
    } = console.error("Failed to create new particle!")){
        // Set all
        const colors = ["red","green","yellow","pink","purple","black","orange","orangered","blue","gold","violet"];
        let verify = 0;
        for(let i=0; i < amount; i++){
            if(MESSAGES && amount > 2000 && verify == 0){
                if(confirm("Unexcepted high number of Particle detected\n Are you sure to do this, your browser maybe stop working Correcly!")){
                    verify = 1;
                }
            }
            if(color == "random"){
                this.color = colors[Math.round(Math.random()*10)]
            } else {
                this.color = color;
            }
            this.radius = radius;
            if(i != amount){
                this.x = Math.round(Math.random()*(x));
                this.y = Math.round(Math.random()*(y));
            } else {
                this.x = x;
                this.y = y;
            }
            this.collisionMouse = collisionMouse;
            this.collisionOther = collisionOther;
            this.collisionBorder = collisionBorder;
            if(amount != 1){
                if(Math.round(Math.random()) == 0){
                    this.negativeX = false 
                } else {
                    this.negativeX = true
                }
                if(Math.round(Math.random()) == 0){
                    this.negativeY = false 
                } else {
                    this.negativeY = true
                }
            } else {
                this.negativeX = negativeX;
                this.negativeY = negativeY;
            }
            this.type = type;
            if(this.type === undefined){
                this.type = "hard";
            }
            this.connectMouse = connectMouse;
            this.connectColor = connectColor;
            this.connectNear = connectNear;
            this.connectRadius = connectRadius;
            // if name not given return with an error
            if(name === undefined){
                console.error("Some variables werent given!");
                return null;
            }
            this.name = name;
            // Insert into array
            PARTICLE.push({
                name: this.name,
                type: this.type,
                color: this.color,
                radius: this.radius,
                PosX: this.x,
                PosY: this.y,
                collisionMouse: this.collisionMouse,
                collisionOther: this.collisionOther,
                collisionBorder: this.collisionBorder,
                negativeX: this.negativeX,
                negativeY: this.negativeY,
                connectMouse: this.connectMouse,
                connectColor: this.connectColor,
                connectNear: this.connectNear,
                connectRadius: this.connectRadius,
                counter: 0,
                avoidCounter: 0
            })
        }
    }

    show() {
        var speed=0;
        // Retry for ervery particle
        for(let i = 0; i < PARTICLE.length; i++){
            // set Variables
            let start = PARTICLE[i].PosX;
            let collisionOther = PARTICLE[i].collisionOther;
            let collisionBorder = PARTICLE[i].collisionBorder;
            let collisionMouse = PARTICLE[i].collisionMouse;
            let radius = PARTICLE[i].radius;
            let negativeX = PARTICLE[i].negativeX;
            let negativeY = PARTICLE[i].negativeY;
            let PosY = PARTICLE[i].PosY;
            let counter = PARTICLE[i].counter;
            let end, middle;
            if(collisionBorder){
                // if Left or Right border
                if((start+radius) > window.innerWidth  && counter == 0){
                    PARTICLE[i].negativeX = true;
                } else if((start-radius) < 0  && counter == 0) {
                    PARTICLE[i].negativeX = false;
                } else if((start+radius) > window.innerWidth){
                    PARTICLE[i].negativeY = true;
                    PARTICLE[i].counter = counter-1;
                } else if((start-radius) < 0) {
                    PARTICLE[i].negativeY = false;
                    PARTICLE[i].counter = counter-1;
                }
                // for borderhitted
                if(negativeX && counter == 0){
                    // Set the new cords depending on the Speed
                    end = start-speed;
                } else if(!negativeX && counter == 0){
                    end = speed+start;
                } else if(negativeX){
                    end = speed+start;
                } else if(!negativeX){
                    end = start-speed;
                } 
                // If Top or Bottom border
                if((PosY+radius) > window.innerHeight && counter == 0){
                    PARTICLE[i].negativeY = false;
                } else if((PosY-radius) < 0 && counter == 0) {
                    PARTICLE[i].negativeY = true;
                } else if((PosY+radius) > window.innerHeight){
                    PARTICLE[i].negativeY = true;
                    PARTICLE[i].counter = counter-1;
                } else if((PosY-radius) < 0) {
                    PARTICLE[i].negativeY = false;
                    PARTICLE[i].counter = counter-1;
                }
                // for borderhitted
                if(negativeY && counter == 0){
                    // Set the new cords depending on the Speed
                    middle = (speed+Math.round(Math.random())*0.5)+PosY;
                } else if(!negativeY && counter == 0){
                    middle = PosY-(speed+Math.round(Math.random())*0.5);
                } else if(negativeY){
                    middle = PosY-(speed+Math.round(Math.random())*0.5);
                } else if(!negativeY){
                    middle = (speed+Math.round(Math.random())*0.5)+PosY;
                } 
            } else if(!collisionBorder) {
				end = start+speed;
				middle = PosY+speed
                // reset if border hitted
                if((start+radius) > window.innerWidth){
                    end=Math.round( Math.random()*window.innerWidth*1.5)-window.innerWidth;
                }
                if((middle+radius) > window.innerHeight){
					middle = Math.round(Math.random()*window.innerHeight)-window.innerHeight;
                }
            }
            // Check for Collison with the Mouse
            if(collisionMouse){
                let mouseX = MOUSE.x
                let mouseY = MOUSE.y
                let mouseRadius = MOUSE.radius
                let distance = Math.sqrt((end-mouseX)*(end-mouseX)+(middle-mouseY)*(middle-mouseY))
                // Calculate a circle and the distance between the the Mouse and the Particle
                if(distance < mouseRadius+radius){
                    // Check where the collision is to make it bouncy correct
                    //right
                    PARTICLE[i].avoidCounter = PARTICLE[i].avoidCounter + 1 ;
                    if(distance < mouseRadius*0.25){
                        if(counter === 0){
                            PARTICLE[i].counter = 1;
                        } else {
                            PARTICLE[i].counter = 0;
                        }
                    }
                    if(end > mouseX){
                        end = end+(mouseRadius/distance)*speed;
                    } else 
                    //left
                    if(end < mouseX){
                        end = end-(mouseRadius/distance)*speed;
                    }
                    // top
                    if(middle < mouseY){
                        middle = middle-(mouseRadius/distance)*speed;
                    } else 
                    // bottom
                    if(middle > mouseY){
                        middle = middle+(mouseRadius/distance)*speed;
                    }
                    if(PARTICLE[i].avoidCounter >= 5 && !collisionOther){
                        if(Math.round(Math.random()) == 1){
                            PARTICLE[i].negativeX = true;
                        } else{
                            PARTICLE[i].negativeX = false;
                        }
                        if(Math.round(Math.random()) == 1){
                            PARTICLE[i].negativeY = true;
                        } else {
                            PARTICLE[i].negativeY = false;
                        }
                        let prevmiddle = middle;
                        let prevend = end;
                        let cord = Math.round(Math.random()*window.innerHeight);
                        
                        if((Math.sqrt((cord-mouseX)*(cord-mouseX)+(cord-mouseY)*(cord-mouseY) < mouseRadius+(radius/100*110)))) {
                            middle = cord;
                        } else {
                            middle = cord-(mouseRadius+(mouseX*2));
                        }
                        cord = Math.round(Math.random()*window.innerWidth);
                        if((Math.sqrt((cord-mouseX)*(cord-mouseX)+(cord-mouseY)*(cord-mouseY) < mouseRadius+(radius/100*110)))) {
                            end = cord-(mouseRadius+(mouseY*2));
                        }
                        PARTICLE[i].avoidCounter = 0;
                    }
                }
            }
            
            // Detect the Collision with an other Particle
            if(collisionOther){
                for(let x=0; x < PARTICLE.length; x++){
                    if(x != i){
                        if(PARTICLE[x].collisionOther){
                            let distance = Math.sqrt((end-PARTICLE[x].PosX)*(end-PARTICLE[x].PosX)+(middle-PARTICLE[x].PosY)*(middle-PARTICLE[x].PosY))
                            // Calculate a circle and the distance between the the Mouse and the Particle
                            if(distance < PARTICLE[x].radius+radius){
                                // Check where the collision is to make it bouncy correct
                                // right
                                if(end > PARTICLE[x].PosX){
                                    PARTICLE[i].negativeX = false;
                                } else 
                                //left
                                if(end < PARTICLE[x].PosX){
                                    PARTICLE[i].negativeX = true;
                                }
                                // top
                                if(middle < PARTICLE[x].PosY){
                                    PARTICLE[i].negativeY = false;
                                } else 
                                // bottom
                                if(middle > PARTICLE[x].PosY){
                                    PARTICLE[i].negativeY = true;
                                }
                            }
                        }
                    }
                }
            }
            // and make the new obj
            if(PARTICLE[i].connectNear){
                // Connect to particle in the Radius
                for(let x=0; x<PARTICLE.length; x++){
                    let connectRadius = PARTICLE[i].connectRadius;
                    let distance = Math.sqrt((start-PARTICLE[x].PosX)*(start-PARTICLE[x].PosX)+(PosY-PARTICLE[x].PosY)*(PosY-PARTICLE[x].PosY))
                    if(connectRadius+radius+radius > distance){
                        CTX.beginPath();
                        CTX.moveTo(start, PosY);
                        CTX.lineTo(PARTICLE[x].PosX, PARTICLE[x].PosY);
                        CTX.strokeStyle = PARTICLE[i].connectColor;
                        CTX.stroke();
                    }
                }
            }
            // connect to the mouse
            if(PARTICLE[i].connectMouse){
                let connectRadius = PARTICLE[i].connectRadius;
                if(connectRadius != undefined){
                    let distance = Math.sqrt((start-MOUSE.x)*(start-MOUSE.x)+(PosY-MOUSE.y)*(PosY-MOUSE.y))
                    if(connectRadius+radius+radius > distance){
                        CTX.beginPath();
                        CTX.moveTo(start, PosY);
                        CTX.lineTo(MOUSE.x, MOUSE.y);
                        CTX.strokeStyle = PARTICLE[i].connectColor;
                        CTX.stroke();
                    }
                } else {
                    CTX.beginPath();
                    CTX.moveTo(start, PosY);
                    CTX.lineTo(MOUSE.x, MOUSE.y)
                    CTX.strokeStyle = PARTICLE[i].connectColor;
                    CTX.stroke()
                }
            }
            CTX.beginPath()
            // hard Particle
            if(PARTICLE[i].type == "hard"){
                CTX.fillStyle = PARTICLE[i].color;
            } else {
                // Soft Particle
                var grd = CTX.createRadialGradient(start, PosY, 0, start, PosY, radius);
                grd.addColorStop(0, PARTICLE[i].color);
                grd.addColorStop(0.2, PARTICLE[i].color);
                grd.addColorStop(1, "transparent");
                CTX.fillStyle = grd;
            }
            CTX.arc(start,PosY,radius,0,2*Math.PI);
            CTX.fill();
            // Feed the array
            PARTICLE[i].PosX = end;
            PARTICLE[i].PosY = middle;
        }
    }
}
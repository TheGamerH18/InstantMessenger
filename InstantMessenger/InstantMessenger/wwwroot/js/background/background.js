import Particle from "./moduleJS/visual.min.js";
let particle = new Particle(
    {
        amount: window.innerWidth / 2 * (document.querySelector("html").scrollHeight / window.innerHeight + 1)
        , color: "rgba(255,255,255,0)",
        radius: 1,
        pos: {
            x: document.querySelector("html").scrollWidth,
            y: document.querySelector("html").scrollHeight
        },
        collision: {
            collisionMouse: !1,
            collisionBorder: !1,
            collisionOther: !1
        },
        connect: {
            connectColor: "rgba(144,96,216,.02)",
            connectNear: !0,
            connectMouse: !1,
            connectRadius: 100
        },
        negativeX: !1,
        negativeY: !1
    });
particle.show();
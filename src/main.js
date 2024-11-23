import { addButton } from "./button"
import { blank, level1 } from "./levels";
import { basicTransform } from "./transformations/basic";
import { scale } from "./transformations/scale";
import { rotate } from "./transformations/rotation";

class Game {
    
    canvasHandle(globalImageName) {
        return (p) => {
            window[globalImageName+"_p5"] = p
            p.setup = function () {
                p.pixelDensity(10);
                p.createCanvas(700, 300);
                p.background(0);
                window[globalImageName] = globalImageName == "reference" ? level1(p) : blank(p)
              };
              p.draw = function () {
                p.background(255);
                let image = window[globalImageName]
                if (image) {
                    p.image(image, 0, 0)
                }
              };            
        }
    }

    constructor() {
        this.canvas_container = document.getElementById("canvases")
        this.buttonsContainer = document.getElementById("buttons")

        // This is how to add a new button
        addButton(this.buttonsContainer, "red", () => {
          window.user = basicTransform(window.user, window.user_p5)
        })
        addButton(this.buttonsContainer, "blue", () => {
          window.user = scale(2)
        })        
        addButton(this.buttonsContainer, "yellow", () => {
          window.user = rotate(0.785)
        })
        
        console.log(this.reference_canvas)
        new p5(this.canvasHandle("reference"), this.canvas_container);
        new p5(this.canvasHandle("user"), this.canvas_container);

    }
}

window.Game = Game
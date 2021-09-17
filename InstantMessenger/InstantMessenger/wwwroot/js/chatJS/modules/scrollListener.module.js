export default class scrollListener {
    constructor ( DOMObj, time ) {
        if(!DOMObj) throw new Error("No DOM Element");

        this.obj = DOMObj;

        this.transitionTime = time ?? "0s linear";
        this.obj.style.transition = this.transitionTime;

        this.obj.style.position = "fixed";
        
        this.mouse = document.addEventListener("mousemove", (ev) => {
            this.mouse = {
                x: ev.clientX,
                y: ev.clientY
            }
        });

        this.scrollEvent = document.addEventListener("wheel", (ev) => {
            if(this.inside()) {
                this.scrollY(ev.deltaY);
            }
        })

        this.createScrollbar();
    }

    // Create the Custom Scrollbar
    createScrollbar() {
        console.log("kjsad");
        this.scrollbar = document.createElement("div");
        this.scrollbar.setAttribute("id","scrollbar");
        this.scrollbar.style.transition = this.transitionTime;
        this.obj.appendChild(this.scrollbar);
        this.scrollbar.style.transform = "scale(0)";
    }

    // Check if the Cursor is inside of the Element
    inside() {
        return (
            this.obj.offsetTop <= this.mouse.y && 
            this.obj.offsetLeft <= this.mouse.x && 
            this.obj.offsetTop+this.obj.scrollHeight >= this.mouse.y &&
            this.obj.offsetLeft+this.obj.scrollWidth >= this.mouse.x
        )
    }

    render() {
        this.createScrollbar();
    }

    // Scroll the Element
    scrollY( Y ) {
        if(!this.validatePosTop( Y ) || !this.validatePosBottom( Y ))
            return;

        this.obj.style.top = ( parseInt( this.obj.style.top ) + ( Y * -1 ) ) + "px";
        this.updateScrollbar( Y );
    }


    // Validate if the Scrollpos will be Valid or not
    validatePosTop( Y ) {
        if ( parseInt( this.obj.style.top ) + ( Y * -1 ) <= 0 )
            return true;
        else
            this.obj.style.top = "-0px";

        // Reset the Scrollbar
        this.updateScrollbar(0);
        return false;
    }

    // Validate if the Scrollpos will be Valid or not
    validatePosBottom( Y ) {
        if ( this.obj.scrollHeight + (parseInt( this.obj.style.top ) + ( Y * -1 )) >= window.innerHeight )
            return true;
        else
            this.obj.style.top = "-" + ( this.obj.scrollHeight - window.innerHeight ) + "px";

        // Set the Scrollbar in the Correct Positon 
        this.updateScrollbar(this.obj.scrollHeight - window.innerHeight);
        return false;
    }

    updateScrollbar( Y ) {
        // Get the Percentage of the Scroll
        let percentage = (this.obj.offsetTop-10) / (this.obj.scrollHeight-window.innerHeight + this.scrollbar.scrollHeight);

        this.scrollbar.style.top = -percentage*(this.obj.scrollHeight) + "px";

        window.clearTimeout(this.timeout);
        window.clearTimeout(this.timeout2);

        this.showScrollbar();
    }

    // show the scrollbar for a short time
    showScrollbar() {
        this.scrollbar.style.transition = ".0s";
        this.scrollbar.style.transform = "scale(1)";
        this.timeout = setTimeout( () => {
            this.scrollbar.style.transition = ".05s ease-in";
            this.scrollbar.style.transform = "translateX(100%)";
        }, 1*1000)
        this.timeout2 = setTimeout( () => {
            this.scrollbar.style.transition = "10s linear";
            this.scrollbar.style.transform = "scale(0) translateX(100%)";
        }, 10*1000)
    }

    scrollToEndY() {
        this.scrollToTopY();
        this.scrollY(this.obj.scrollHeight-window.innerHeight);
    }

    scrollToTopY() {
        this.obj.style.top = "0px";
        this.scrollbar.style.top = "0px";
    }
}
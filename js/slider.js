class Accordion {
    constructor(el) {
      // Store the <details> element
      this.el = el;
      this.summary = el.querySelector("summary");
      this.content = el.querySelector(".content");
  
      // Store the animation object (so we can cancel it if needed)
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener("click", (e) => this.onClick(e));
    }
  
    onClick(e) {
      // Stop default behaviour from the browser
      e.preventDefault();
      
      this.el.style.overflow = "hidden";
      
      if (this.isClosing || !this.el.open) {
        this.open();
        
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }
  
    shrink() {
      // Set the element as "being closed"
      this.isClosing = true;
  
      // Store the current height of the element
      const startHeight = `${this.el.offsetHeight}px`;
      
      const endHeight = `${this.summary.offsetHeight}px`;
  
      if (this.animation) {
        
        this.animation.cancel();
      }
  
      // Start a WAAPI animation
      this.animation = this.el.animate(
        {
          
          height: [startHeight, endHeight],
        },
        {
          duration: 400,
          easing: "ease-out",
        }
      );
  
      // When the animation is complete, call onAnimationFinish()
      this.animation.onfinish = () => this.onAnimationFinish(false);
      // If the animation is cancelled, isClosing variable is set to false
      this.animation.oncancel = () => (this.isClosing = false);
    }
  
    open() {
      // Apply a fixed height on the element
      this.el.style.height = `${this.el.offsetHeight}px`;
      
      this.el.open = true;
      
      window.requestAnimationFrame(() => this.expand());
    }
  
    expand() {
      // Set the element as "being expanding"
      this.isExpanding = true;
      
      const startHeight = `${this.el.offsetHeight}px`;
      
      const endHeight = `${
        this.summary.offsetHeight + this.content.offsetHeight
      }px`;
  
      // If there is already an animation running
      if (this.animation) {
        
        this.animation.cancel();
      }
  
      // Start a WAAPI animation
      this.animation = this.el.animate(
        {
          
          height: [startHeight, endHeight],
        },
        {
          duration: 400,
          easing: "ease-out",
        }
      );
      
      this.animation.onfinish = () => this.onAnimationFinish(true);
      
      this.animation.oncancel = () => (this.isExpanding = false);
    }
  
    onAnimationFinish(open) {
      // Set the open attribute based on the parameter
      this.el.open = open;
      
      this.animation = null;
      
      this.isClosing = false;
      this.isExpanding = false;
      
      this.el.style.height = this.el.style.overflow = "";
    }
  }
  
  document.querySelectorAll("details").forEach((el) => {
    new Accordion(el);
  });  
// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = "white";
    div.style.font = "bold 30px Impact";
    div.style.zIndex = 2000;
    let font = document.getElementById("font");
    root.appendChild(font);
    root.appendChild(div);

    this.domElement = div;
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
    this.domElement.style.fontFamily = "Space Mono, monospace";
    this.domElement.style.color = "aqua";
  }

  gameOver(txt) {
    this.domElement.innerText = txt;
    this.domElement.style.fontFamily = "Space Mono, monospace";
    this.domElement.style.color = "red";
    this.domElement.style.padding = "20px 40px";
    this.domElement.style.borderRadius = "8px";
    this.domElement.style.border = "solid 4px red";
    this.domElement.style.backgroundColor = "black";
  }

  youWon(txt) {
    this.domElement.innerText = txt;
    this.domElement.style.fontFamily = "Space Mono, monospace";
    this.domElement.style.color = "aqua";
    this.domElement.style.padding = "20px 40px";
    this.domElement.style.borderRadius = "8px";
    this.domElement.style.border = "solid 4px aqua";
    this.domElement.style.backgroundColor = "black";
  }
}





export default class Registration {
    constructor(x, y){
        this.pos_x = x;
        this.pos_y = y;

        this.formR = document.createElement('div');
        
        main = document.getElementById("game-container");

        formR.className = "regnew";
        formR.innerHTML = `
        <form>
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="submit">
        </form>
        `;
        main.appendChild(formR);

    }


    showForm(){
        this.formR.style = `d`
    }

    hideForm(){

    }

    deleteForm(){
        this.formR.remove();
    }


}
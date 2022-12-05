const form = document.getElementById('calc_form');
const output = document.getElementById('output');
const operand_btns = document.querySelectorAll('button[data-type=operand]'); // num btns 1, 2, 3, 4, 5, 6, etc
const operator_btns = document.querySelectorAll('button[data-type=operator]'); // calc btns + - / x = % 
const clear = document.querySelector('button[data-type=clear]'); //clear / reset AC/C button 

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

let is_operator = false; //we toggle the value of the operator buttons whenever they are clicked

// .forEach loop for the operand number buttons' output value:
operand_btns.forEach( (btn) => {

    btn.addEventListener('click', (e) => { // add event listener on click, pass the event as parameter, so we can target the value of each btn on click:
        // console.log(e)

        clear.innerText = 'C'; // 

        if (output.value == '0'){
            // make the output value whatever it currently is plus the value of the btn clicked:
            output.value = e.target.value;
        } else if (output.value.includes('.')) {
            // check if there's already a decimal in the output value, if so, stop adding decimal points by replacing it with an empty string:
            output.value = output.value + '' + e.target.value.replace('.', '');
        } else if (is_operator){
            // if an operator button has been clicked (ie if it's true) we set it to false and restart the value in the output from the NEW value based on the clicked btn:
            is_operator = false;
            output.value = e.target.value;
        } else {
            output.value = output.value + '' + e.target.value;
        }
        // console.log(output.value);
    })
})

//function to remove the active class from the btn - runs immediately when the btn is clicked on:
const remove_active = () => {
    operator_btns.forEach( (btn) => {
        btn.classList.remove('active');
    })
}

clear.addEventListener('click', () => {
    remove_active() // On click, clear the form and remove any active class from our operator buttons
    clear.innerText = 'AC'; //change text back to AC 
});


let equation = []; //we push() the last value from the output, and calculate the return based on the operator used, this array is cleared at the end of each = calculation

// .forEach loop for the operator number buttons' output value:
operator_btns.forEach( (btn) => {

    btn.addEventListener( 'click', (e) => { 
        remove_active() //remove active class right before adding the active class to the clicked btn 

        e.target.classList.add('active') //on click to add the active class to the target btn

        // for each of the operator btns, on click, assign the output value its current self (output value) % 100 for the % symbol, and so on:
        switch (e.target.value) { // for each element value, if it matches the case below, run the following calculation:
            case '%':
                output.value = parseFloat(output.value) / 100; //turn the value into a percentage point!
                break //if case is true, end switch conditional statement execution
            case 'invert':
                output.value = parseFloat(output.value) * -1;
                break //if case is true, end switch conditional statement execution
            case '=':
                equation.push(output.value); //take current output value and push it to equation array
                output.value = eval(equation.join('')); //use eval() to quickly evaluate every equation there, and then clear the equation array.
                equation = []; //empty out the equation array again at end
                clear.innerText = 'AC'; // 
                break //if case is true, end switch conditional statement execution
            default: 
            let last_item = equation[equation.length - 1] //last item in equation array
            if (['/', '*', '+', '-'].includes(last_item) && is_operator) {
                equation.pop(); //take off the operator symbol if it's last pressed item in the equation array
                equation.push(e.target.value); //then push the clicked value to the equation array
            } else {
                equation.push(output.value); // if last item in equ array isn't an operator symbol, add output value to equ array
                equation.push(e.target.value); //if last item in equ array isn't an operator symbol, add the value of the current clicked btn to equ array
            }
            is_operator = true; //if operator btn has been pressed, set / assign its value to TRUE 
            break //if case is true, end switch conditional statement execution
        }
    })
})


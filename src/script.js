const inputs = document.querySelectorAll('input[type="number"]');
const submit = document.querySelector('input[type="submit"');

inputs.forEach((input, index) => {
    input.addEventListener('keyup', (e)=>{
        const currentInput = input,
        nextinput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

        if(currentInput.value.length>1){
            currentInput.value = input.value.slice(-1);
            if(index<inputs.length-1){
                nextinput.focus();
            }else{
                inputs[0].focus()
            }            
            return;
        }

        if(nextinput && nextinput.hasAttribute("disabled") && currentInput.value !== ""){
            nextinput.removeAttribute("disabled");
            nextinput.focus();
        }

        if(e.key === "Backspace"){
            inputs.forEach((input, index2) => {
                if(index <= index2 && prevInput){
                    input.setAttribute('disabled', true);
                    currentInput.value = "";
                    prevInput.focus();
                }
            });
        }
    });
});

window.addEventListener('load', ()=>inputs[0].focus())
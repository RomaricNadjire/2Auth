const inputs = document.querySelectorAll('input[type="number"]');
const submitBtn = document.querySelector('input[type="submit"]');

inputs.forEach((input, index) => {
    input.addEventListener("paste", handleOnPasteOtp);
    input.addEventListener('keyup', (e) => {
        const currentInput = input,
            nextinput = input.nextElementSibling,
            prevInput = input.previousElementSibling;

        if (currentInput.value.length > 1) {
            currentInput.value = input.value.slice(-1);
            if (index < inputs.length - 1) {
                nextinput.focus();
            }
            // else {
            //     inputs[0].focus()
            // }
            return;
        }

        if (nextinput && nextinput.hasAttribute("disabled") && currentInput.value !== "") {
            nextinput.removeAttribute("disabled");
            nextinput.focus();
        }

        if (e.key === "Backspace") {
            inputs.forEach((input, index2) => {
                if (index <= index2 && prevInput) {
                    input.setAttribute('disabled', true);
                    currentInput.value = "";
                    prevInput.focus();
                }
            });
        }
        checkStat();
    });
});

window.addEventListener('load', () => inputs[0].focus())

function checkStat() {
    let tousNonNuls = true;

    inputs.forEach(input => {
        if (input.value === '') {
            tousNonNuls = false;
            return;
        }
    });

    tousNonNuls ? submitBtn.classList.add('active') : submitBtn.classList.remove('active');
}

function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");
    const value = data.split("");
    if (value.length === inputs.length) {
        inputs.forEach((input, index) => (
            input.value = value[index]
        ));
        submit();
    }  
    for(let i=0; i<value.length; i++){
        inputs[i].removeAttribute("disabled"),
        inputs[i].focus()
    }
    checkStat();
}

function submit() {
    console.log("submitBtnting...");
    // 👇 Entered OTP
    let otp = "";
    inputs.forEach((input) => {
        otp += input.value;
        input.disabled = true;
        input.classList.add("disabled");
    });
    console.log(otp);
    // 👉 Call API below
}
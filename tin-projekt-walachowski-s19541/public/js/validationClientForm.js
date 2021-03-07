function validateForm() {
    const imieInput = document.getElementById('imie');
    const nazwiskoInput = document.getElementById('nazwisko');
    const loginInput = document.getElementById('login');
    const hasloInput = document.getElementById('haslo');
    
    const errorImie = document.getElementById('errorImie');
    const errorNazwisko = document.getElementById('errorNazwisko');
    const errorLogin = document.getElementById('errorLogin');
    const errorHaslo = document.getElementById('errorHaslo');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([imieInput, nazwiskoInput, loginInput, hasloInput], [errorImie, errorNazwisko, errorLogin, errorHaslo], errorsSummary);
    let valid = true;

    if (!checkRequired(imieInput.value)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(imieInput.value, 2, 60)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = document.getElementById('errorMessage-contains').innerText + " 2 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    }

    if (!checkRequired(nazwiskoInput.value)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(nazwiskoInput.value, 2, 60)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = document.getElementById('errorMessage-contains').innerText + " 2 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    }
    if (!checkRequired(loginInput.value)) {
        //valid = false;
        //loginInput.classList.add("error-input");
        //errorLogin.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(loginInput.value, 5, 60)) {
        valid = false;
        loginInput.classList.add("error-input");
        errorLogin.innerText = document.getElementById('errorMessage-contains').innerText + " 5 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    }
    if (!checkRequired(hasloInput.value)) {
        //valid = false;
        //hasloInput.classList.add("error-input");
        //errorHaslo.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(hasloInput.value, 5, 60)) {
        valid = false;
        hasloInput.classList.add("error-input");
        errorHaslo.innerText = document.getElementById('errorMessage-contains').innerText + " 5 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
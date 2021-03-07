function validateForm() {
    const markaInput = document.getElementById('marka');
    const modelInput = document.getElementById('model');
    const cenaZaGodzineInput = document.getElementById('cenaZaGodzine');
    const cenaZaKilometrInput = document.getElementById('cenaZaKilometr');
    const kaucjaInput = document.getElementById('kaucja');

    const errorMarka = document.getElementById('errorMarka');
    const errorModel = document.getElementById('errorModel');
    const errorCenaZaGodzine = document.getElementById('errorCenaZaGodzine');
    const errorCenaZaKilometr = document.getElementById('errorCenaZaKilometr');
    const errorKaucja = document.getElementById('errorKaucja');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([markaInput, modelInput, cenaZaGodzineInput, cenaZaKilometrInput, kaucjaInput], [errorMarka, errorModel, errorCenaZaGodzine, errorCenaZaKilometr, errorKaucja], errorsSummary);
    let valid = true;

    if (!checkRequired(markaInput.value)) {
        valid = false;
        markaInput.classList.add("error-input");
        errorMarka.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(markaInput.value, 2, 60)) {
        valid = false;
        markaInput.classList.add("error-input");
        errorMarka.innerText = document.getElementById('errorMessage-contains').innerText + " 2 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = document.getElementById('errorMessage-contains').innerText + " 2 " + document.getElementById('errorMessage-to').innerText + " 60 " +document.getElementById('errorMessage-characters').innerText;
    } 

    if (!checkRequired(cenaZaGodzineInput.value)) {
        valid = false;
        cenaZaGodzineInput.classList.add("error-input");
        errorCenaZaGodzine.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (cenaZaGodzineInput.value<10||cenaZaGodzineInput.value>500) {
        valid = false;
        cenaZaGodzineInput.classList.add("error-input");
        errorCenaZaGodzine.innerText = document.getElementById('errorMessage-minMax').innerText + " 10-500 pln";
    }
    if (!checkRequired(cenaZaKilometrInput.value)) {
        valid = false;
        cenaZaKilometrInput.classList.add("error-input");
        errorCenaZaKilometr.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (cenaZaKilometrInput.value<10||cenaZaKilometrInput.value>200) {
        valid = false;
        cenaZaKilometrInput.classList.add("error-input");
        errorCenaZaKilometr.innerText = document.getElementById('errorMessage-minMax').innerText + " 10-200 pln";
    }
    if (!checkRequired(kaucja.value)) {
        valid = false;
        kaucjaInput.classList.add("error-input");
        errorKaucja.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (kaucja.value<0) {
        valid = false;
        kaucjaInput.classList.add("error-input");
        errorKaucja.innerText = document.getElementById('errorMessage-nonNegative').innerText;
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
function validateForm() {
    const klientInput = document.getElementById('klient');
    const pojazdInput = document.getElementById('pojazd');
    const dataWynajmuInput = document.getElementById('dataWynajmu');
    const dataZwrotuInput = document.getElementById('dataZwrotu');
    const przejechanyDystansInput = document.getElementById('przejechanyDystans');

    const errorKlient = document.getElementById('errorKlient');
    const errorPojazd = document.getElementById('errorPojazd');
    const errorDataWynajmu = document.getElementById('errorDataWynajmu');
    const errorDataZwrotu = document.getElementById('errorDataZwrotu');
    const errorPrzejechanyDystans = document.getElementById('errorPrzejechanyDystans');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([klientInput, pojazdInput, dataWynajmuInput, dataZwrotuInput, przejechanyDystansInput], [errorKlient, errorPojazd, errorDataWynajmu, errorDataZwrotu, errorPrzejechanyDystans], errorsSummary);
    let valid = true;

    if (!checkRequired(klientInput.value)) {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlient.innerText = document.getElementById('errorMessage-required').innerText;
    }

    if (!checkRequired(pojazdInput.value)) {
        valid = false;
        pojazdInput.classList.add("error-input");
        errorPojazd.innerText = document.getElementById('errorMessage-required').innerText;
    }

    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataWynajmuInput.value)) {
        valid = false;
        dataWynajmuInput.classList.add("error-input");
        errorDataWynajmu.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (checkDateIfAfter(dataWynajmuInput.value, nowString)) {
        valid = false;
        dataWynajmuInput.classList.add("error-input");
        errorDataWynajmu.innerText = document.getElementById('errorMessage-futureDate').innerText;
    } else if (checkRequired(dataZwrotuInput.value) && !checkDateIfAfter(dataZwrotuInput.value, dataWynajmuInput.value)) {
        valid = false;
        dataZwrotuInput.classList.add("error-input");
        errorDataZwrotu.innerText = document.getElementById('errorMessage-dates').innerText;
    }

    if (!checkRequired(przejechanyDystansInput.value)) {
        valid = false;
        przejechanyDystansInput.classList.add("error-input");
        errorPrzejechanyDystans.innerText = document.getElementById('errorMessage-required').innerText;
    } else if (przejechanyDystansInput.value<0) {
        valid = false;
        przejechanyDystansInput.classList.add("error-input");
        errorPrzejechanyDystans.innerText = "Pole nie może być ujemne";
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}
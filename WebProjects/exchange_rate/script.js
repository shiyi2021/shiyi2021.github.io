const currencyEl_one = document.getElementById('currency_one');
const currencyEl_two = document.getElementById('currency_two');
const amountEl_one = document.getElementById('amount_one');
const amountEl_two = document.getElementById('amount_two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch("https://open.exchangerate-api.com/v6/latest")
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two] / data.rates[currency_one];
            rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(3)} ${currency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
}

currencyEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('input',calculate);
swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate();
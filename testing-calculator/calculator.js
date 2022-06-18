window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = {amount: 1000, years:10, rate:10};
  document.getElementById("loan-amount").value = values.amount;
  document.getElementById("loan-years").value = values.years;
  document.getElementById("loan-rate").value = values.rate;
  update();
  }

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIvalues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIvalues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let rate = values.rate/1200;
  let n = values.years * 12;
  let denominator = 1 - ((1+ rate)**(-n));
  return (values.amount * rate / denominator).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = monthly;
}

/**
 * ====================================================================================================================
 *
 * Treehouse FSJS Techdegree:
 * Project 3 - Interactive Form + Validation
 * Student: Jamie Gobeille
 * Date: November 28 2019
 *
 * ====================================================================================================================
 */

//*============================================================================================

//Global vars

//*============================================================================================
//focus feature global var
const $name = $("#name");

//Job title global vars
const $jobTitleOptions = $("#title");
const $otherTitle = $("#other-title");

//T-shirt section global vars
const $designSelectElement = $("#design");
const $designOptions = $("#design option");
const $colorSelectElement = $("#color");
const $colorOptions = $("#color option");
const $colorSelection = $("#colors-js-puns");
const colorOptions = [...document.querySelectorAll("#color option")];
//select the first three options
const option1st2ndAnd3rd = colorOptions.slice(0, 3);

//activities global vars
const $activitiesSection = $(".activities");
const activitiesCheckboxes = [
  ...document.querySelectorAll(".activities input")
];
const activitiesTextContent = [
  ...document.querySelectorAll(".activities label")
];
let totalCost = 0;
let clickedItems = 0;

//Payment section global vars
const paymentOptions = [...document.querySelectorAll("#payment option")];
const $paymentSection = $("#payment");
const selectPaymentMethod = document.querySelector(
  "#payment > option:nth-child(1)"
);
const creditCard = $("#credit-card");
const payPal = $("#paypal");
const bitcoin = $("#bitcoin");
const paymentArray = [creditCard, payPal, bitcoin];

//form Validation global vars

//select all the inputs that need to be validated
const usernameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const CCInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const CVVInput = document.querySelector("#cvv");
const $selected = $("#payment option").eq(1);
const $nameLabel = $('label[for="name"]');
const $emailLabel = $('label[for="mail"]');
const $activitiesLegend = $(".activities legend");
const $CCLabel = $('label[for="cc-num"]');
const $zipCodeLabel = $('label[for="zip"]');
const $CVVLabel = $('label[for="cvv"]');
const $paymentLabel = $(".payments ul");

//make error messages and hide them
const $nameLabelError = $(
  '<span class="error"> Name cannot be empty</span>'
).hide();
const $emailLabelError = $(
  '<span class="error"> Email Must be properly formatted</span>'
).hide();
const $activitiesLegendError = $(
  '<span class="error"> At least one activity must be checked</span>'
).hide();

const $CCLabelZeroError = $(
  '<li class="payment-error">A credit card number must be entered</li>'
).hide();
const $CCLabelTooShortError = $(
  '<li class="payment-error">Your number is too short. Must be 13-16 digits long</li>'
).hide();
const $CCLabelTooLongError = $(
  '<li class="payment-error">Your number is too long. Must be 13-16 digits long</li>'
).hide();
const $zipCodeLabelError = $(
  '<li class="payment-error">Must be 5 digits long</li>'
).hide();
const $CVVLabelError = $(
  '<li class="payment-error">Must be 3 digits long</li>'
).hide();
const $notNumbersError = $(
  '<li class="payment-error">Only Numbers can be used here</li>'
).hide();

//*============================================================================================

//Focus Feature

//*============================================================================================

//add focus on page load
$(document).ready(() => {
  $name.focus();
});

//*============================================================================================

//"Job Role" Feature - Add text field to page when other is selected in "Job Role" section

//*============================================================================================

//select job role input & Hide it
$otherTitle.hide();

//Loop over the title options and add a click listener
$jobTitleOptions.on("change", function() {
  //Answer to find how to select option found here: https://stackoverflow.com/questions/11179406/jquery-get-value-of-select-onchange
  this.value === "other" ? $otherTitle.show() : $otherTitle.hide();
});

//*============================================================================================

//T-Shirt Info Section

//*============================================================================================

//append select T-shirt text to the top of the list and make it selected
$colorSelectElement.prepend(
  '<option value="select" selected="selected"> Please select a T-shirt theme</option>'
);

//hide color selection box on pageload
$colorSelection.hide();
//set all the color options to hidden
$colorOptions.attr("hidden", true);
//hide the design bolierplate text
$designOptions.eq(0).attr("hidden", true);
//when the selection changes in design selection box, perform functions
$designSelectElement.on("change", function(e) {
  //hide the color bolierplate text on change
  $("#color > option:nth-child(1)").attr("hidden", true);
  colorOptions.map(element => {
    const index = colorOptions.indexOf(element);
    //show color selection when page is shown
    $colorSelection.fadeIn();
    //if target value is equal to js puns, then make the second option 'selected', show the first three options, and hide the rest
    //https://css-tricks.com/useful-nth-child-recipies/
    if ($(e.target).val() === "metal lovers") {
      $(colorOptions[0])
        .prop("selected", true)
        .show();
      $(option1st2ndAnd3rd).show();
      $(colorOptions[3])
        .prop("selected", false)
        .hide();
      $(colorOptions[index]).hide();
      //Else hide the first three options and make the last three visible
    } else {
      $(colorOptions[0])
        .prop("selected", false)
        .hide();
      $(option1st2ndAnd3rd).hide();
      $(colorOptions[3])
        .prop("selected", true)
        .show();
      $(colorOptions[index]).show();
    }
  });
});

//*============================================================================================

// Register for Activities Section

//*============================================================================================

/*
 Main Tasks:
 1a. If tasks are selected, disable the selection of the other events that happen at the same time
 1b. Visually display that those options are unavailable

 2. If user un-checks event, re-enable all options

 3. Add running total to bottom of section for each event chosen

*/

//How to get data-type of element: https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute

$(".activities").on("change", function(e) {
  const clicked = e.target;
  const clickedDayAndTime = clicked.getAttribute("data-day-and-time");
  const clickedCost = clicked.getAttribute("data-cost");
  const clickedName = clicked.getAttribute("name");
  const parsedNum = parseInt(clickedCost, 10);

  //On change, remove old total
  $(".total").remove();

  if (clicked.checked) {
    totalCost += parsedNum;
    //append total to page
    $activitiesSection.append(`<div class="total">Total: $ ${totalCost}</div>`);
  } else if (!clicked.checked) {
    totalCost -= parsedNum;
    //append total to page
    $activitiesSection.append(`<div class="total">Total: $ ${totalCost}</div>`);
  }

  //loop over all the checkboxes
  activitiesCheckboxes.map(element => {
    const index = activitiesCheckboxes.indexOf(element);
    activitiesTextContent.map(() => {
      //get important data-types
      const eventDayAndTime = activitiesCheckboxes[index].getAttribute(
        "data-day-and-time"
      );

      const name = activitiesCheckboxes[index].getAttribute("name");
      const textColor = activitiesTextContent[index];
      if (clicked.checked) {
        $activitiesLegendError.hide();
        //check if same date and time and if clickedName is not equal to name
        if (clickedDayAndTime === eventDayAndTime && clickedName !== name) {
          //disable matches
          $("fieldset.activities > label:nth-child(2)").css("color", "#60685C");
          activitiesCheckboxes[0].setAttribute("disabled", "true");
          activitiesCheckboxes[index].setAttribute("disabled", "true");

          textColor.style.color = "#60685C";
          clickedItems += 1;
        }
        if (clickedDayAndTime === "Weekend") {
          activitiesCheckboxes[index].setAttribute("disabled", "true");
          $("fieldset.activities > label:nth-child(2)").css("color", "#000");
          activitiesCheckboxes[0].removeAttribute("disabled");
          textColor.style.color = "#60685C";
        }
      }
      //if clicked is unchecked, re-enable buttons
      if (!clicked.checked) {
        if (clickedDayAndTime === eventDayAndTime && clickedName !== name) {
          $("fieldset.activities > label:nth-child(2)").css("color", "#000");
          activitiesCheckboxes[index].removeAttribute("disabled");
          activitiesCheckboxes[0].removeAttribute("disabled");
          textColor.style.color = "#000";
          clickedItems -= 1;
        }
        if (clickedDayAndTime === "Weekend") {
          activitiesCheckboxes[0].removeAttribute("disabled");
          $("fieldset.activities > label:nth-child(2)").css("color", "#000");
          activitiesCheckboxes[index].removeAttribute("disabled");
          textColor.style.color = "#000";
        }
      }
      if (clickedItems >= 1) {
        activitiesCheckboxes[0].setAttribute("disabled", true);
        $("fieldset.activities > label:nth-child(2)").css("color", "#60685C");
        console.log(clickedItems);
      }
    });
  });
});

//*============================================================================================

// Payment Section

//*============================================================================================

/*
Main tasks:
1. Display payment sections based on the payment option chosen in the select menu.
2. Credit card payment should be default option
3.If payPal, show PayPal message
4.If bitcoin, show bitcoin message

*/

//hide payment option from list, but display it as first option
selectPaymentMethod.setAttribute("hidden", true);
//select qnd hide all the options
$selected.attr("selected", true);
payPal.hide();
bitcoin.hide();
//add change listener on payment options
$paymentSection.on("change", e => {
  //hide all error messages and reset input borders in payment option on change
  $CCLabelTooShortError.hide();
  $CCLabelTooLongError.hide();
  $notNumbersError.hide();
  $CCLabelZeroError.hide();
  $zipCodeLabelError.hide();
  $CVVLabelError.hide();
  CCInput.style.border = "2px solid #5A0001";
  zipCodeInput.style.border = "2px solid #5A0001";
  CVVInput.style.border = "2px solid #5A0001";

  paymentOptions.map(element => {
    //gives index position of all payment options in array
    const index = paymentOptions.indexOf(element);
    paymentArray.map(payments => {
      //gives index position of all payment elements in array
      const index2 = paymentArray.indexOf(payments);
      if (e.target.value === "credit card") {
        $(paymentOptions[1]).attr("selected", true);
        $(paymentOptions[index]).removeAttr("selected");
        paymentArray[0].show();
        //hides the rest
        paymentArray[index2].hide();
      } else if (e.target.value === "paypal") {
        $(paymentOptions[2]).attr("selected", true);
        $(paymentOptions[index]).removeAttr("selected");
        paymentArray[1].show();
        paymentArray[index2].hide();
      } else {
        $(paymentOptions[index]).removeAttr("selected");
        $(paymentOptions[3]).attr("selected", true);
        paymentArray[index2].hide();
        paymentArray[2].show();
      }
    });
  });
});

//*============================================================================================

// Form Validation

//*============================================================================================

/* 
Main Tasks:
1. If any of these validation errors exist, do not allow user to submit form
  a. Name field can't be blank.
  b. Email field must be a validly formatted e-mail address "(you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example)".
  c. User must select at least one checkbox under the "Register for Activities" section of the form.
  d. If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
    * Credit Card field should only accept a number between 13 and 16 digits.
    * The Zip Code field should accept a 5-digit number.
    * The CVV should only accept a number that is exactly 3 digits long.
*/

//append error messages
$nameLabel.append($nameLabelError);
$emailLabel.append($emailLabelError);
$activitiesLegend.append($activitiesLegendError);
$paymentLabel
  .append($CCLabelZeroError)
  .append($CCLabelTooShortError)
  .append($CCLabelTooLongError)
  .append($zipCodeLabelError)
  .append($CVVLabelError)
  .append($notNumbersError);

//name validation
isValidUsername = () => {
  if (usernameInput.value === "") {
    $nameLabelError.show();
    usernameInput.style.border = " 2px solid #F00";
    return false;
  } else {
    $nameLabelError.hide();
    usernameInput.style.border = "2px solid #5A0001";
    return true;
  }
};

//email Validation
isValidEmail = () => {
  const text = emailInput.value;
  const regex = /^[^@]+@[^@.]+\.[a-z]+$/gi.test(text);
  if (regex) {
    $emailLabelError.hide();
    emailInput.style.border = "2px solid #5A0001";
    return true;
  } else {
    $emailLabelError.show();
    emailInput.style.border = " 2px solid #F00";
    return false;
  }
};

//activities Validation
isActivitiesChecked = () => {
  /* information on array.prototype.slice() && array.prototype.slice.call() found here:
        1. https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
        2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        3. https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
        4. http://www.javascriptkit.com/javatutors/arrayprototypeslice.shtml
    */
  //checks if at least one checkbox is checked
  const checkedOne = Array.prototype.slice
    .call(activitiesCheckboxes)
    .some(x => x.checked);
  if (checkedOne) {
    $activitiesLegendError.hide();
    return true;
  } else {
    $activitiesLegendError.show();
    return false;
  }
};

//Payment Info Validation
isValidCC = () => {
  const text = CCInput.value;
  const correct = /^\d{13,16}$/gi.test(text);
  const tooShort = /^\d{1,12}$/gi.test(text);
  const tooLong = /^\d{17,}$/gi.test(text);
  const notNumbers = /^[\D\w]+/gi.test(text);
  if (correct) {
    $CCLabelTooShortError.hide();
    $CCLabelTooLongError.hide();
    $notNumbersError.hide();
    CCInput.style.border = "2px solid #5A0001";
    return true;
  } else if (tooShort) {
    CCInput.style.border = " 2px solid #F00";
    $CCLabelTooShortError.show();
    $CCLabelZeroError.hide();
    return false;
  } else if (tooLong) {
    CCInput.style.border = " 2px solid #F00";
    $CCLabelTooLongError.show();
    $CCLabelTooShortError.hide();
    return false;
  } else if (notNumbers) {
    $CCLabelTooShortError.hide();
    $CCLabelTooLongError.hide();
    $notNumbersError.show();
    $CCLabelZeroError.hide();
  } else {
    $CCLabelTooShortError.hide();
    $CCLabelTooLongError.hide();
    $notNumbersError.hide();
    $CCLabelZeroError.show();
    CCInput.style.border = "2px solid #F00";
  }
};

//zipcode validation
isValidZipCode = () => {
  const text = zipCodeInput.value;
  const regex = /^\d{5}$/gi.test(text);
  if (regex) {
    $zipCodeLabelError.hide();
    zipCodeInput.style.border = "2px solid #5A0001";
    return true;
  } else {
    $zipCodeLabelError.show();
    zipCodeInput.style.border = " 2px solid #F00";
    return false;
  }
};

//CVV Validation
isValidCVV = () => {
  const text = CVVInput.value;
  const regex = /^\d{3}$/gi.test(text);
  if (regex) {
    $CVVLabelError.hide();
    CVVInput.style.border = "2px solid #5A0001";
    return true;
  } else {
    $CVVLabelError.show();
    CVVInput.style.border = " 2px solid #F00";
    return false;
  }
};

//form submission

$("form").on("submit", e => {
  const isPropSelected = $selected.prop("selected");

  if (!isValidUsername() || !isValidEmail() || !isActivitiesChecked()) {
    //runs each function to show where all the errors are
    isValidUsername();
    isValidEmail();
    isActivitiesChecked();
  }
  //if checks if credit card is the selected option, then runs the rest of the payment validations
  if (isPropSelected) {
    if (!isValidCC() || !isValidZipCode() || !isValidCVV()) {
      isValidCC();
      isValidZipCode();
      isValidCVV();

      e.preventDefault();
      return false;
    } else {
      return true;
    }
  }
});

//event listeners
usernameInput.addEventListener("input", isValidUsername);
emailInput.addEventListener("input", isValidEmail);
CCInput.addEventListener("input", isValidCC);
zipCodeInput.addEventListener("input", isValidZipCode);
CVVInput.addEventListener("input", isValidCVV);

/*
Additional things to do:
1.) Re-write validation to not be so wet. Hard coding the validation messages into the HTML
and then run a function that hides and shows the text when necessary.
2.) adding additional validation checks to rest of form
*/

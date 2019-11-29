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
const colorOptions = [...document.querySelectorAll("#color option")];
//select the first three options
const option1st2ndAnd3rd = colorOptions.slice(0, 3);

//activities global vars
const $activitiesSection = $(".activities");
const activitiesCheckboxes = document.querySelectorAll(".activities input");
const activitiesTextContent = document.querySelectorAll(".activities label");
let totalCost = 0;

//Payment section global vars
const $paymentOptions = [...document.querySelectorAll("#payment option")];
const $paymentSection = $("#payment");
const selectPaymentMethod = document.querySelector(
  "#payment > option:nth-child(1)"
);
let creditCard = $("#credit-card");
const payPal = $("#paypal");
const bitcoin = $("#bitcoin");
const paymentArray = [creditCard, payPal, bitcoin];

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

//Refactor this. This is seriously hot garbage

//append select T-shirt text to the top of the list and make it selected
$colorSelectElement.prepend(
  '<option value="select" selected="selected"> Please select a T-shirt theme</option>'
);

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

    //if target value is equal to js puns, then make the second option 'selected', show the first three options, and hide the rest
    //https://css-tricks.com/useful-nth-child-recipies/
    if ($(e.target).val() === "js puns") {
      $(colorOptions[0])
        .attr("selected", true)
        .show();
      $(option1st2ndAnd3rd).show();
      $(colorOptions[3])
        .attr("selected", false)
        .hide();
      $(colorOptions[index]).hide();
      //Else hide the first three options and make the last three visible
    } else {
      $(colorOptions[0])
        .attr("selected", false)
        .hide();
      $(option1st2ndAnd3rd).hide();
      $(colorOptions[3])
        .attr("selected", true)
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
    $activitiesSection.append(`<div class="total">Total: ${totalCost}</div>`);
  } else {
    totalCost -= parsedNum;
    //append total to page
    $activitiesSection.append(`<div class="total">Total: ${totalCost}</div>`);
  }

  //loop over all the checkboxes
  for (var i = 0; i < activitiesCheckboxes.length; i++) {
    for (var j = 0; j < activitiesTextContent.length; j++) {
      //get important data-types
      const eventDayAndTime = activitiesCheckboxes[i].getAttribute(
        "data-day-and-time"
      );
      const name = activitiesCheckboxes[i].getAttribute("name");
      const textColor = activitiesTextContent[i];

      if (clicked.checked) {
        //check if same date and time and if clickedName is not equal to name
        if (clickedDayAndTime === eventDayAndTime && clickedName !== name) {
          //disable matches
          activitiesCheckboxes[i].setAttribute("disabled", "true");

          // const textColor = activitiesTextContent[j].textContent;

          textColor.style.color = "#60685C";
        }
      } else {
        //remove the disabled attribute
        activitiesCheckboxes[i].removeAttribute("disabled");
        textColor.style.color = "#000";
      }
    }
  }
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
payPal.hide();
bitcoin.hide();
//add change listener on payment options
$paymentSection.on("change", function(e) {
  $paymentOptions.map(element => {
    const index = $paymentOptions.indexOf(element);
    paymentArray.map(payments => {
      const index2 = paymentArray.indexOf(payments);
      if (e.target.value === "credit card") {
        $($paymentOptions[1]).attr("selected", true);
        $($paymentOptions[index]).removeAttr("selected");
        paymentArray[0].show();
        paymentArray[index2].hide();
      } else if (e.target.value === "paypal") {
        $($paymentOptions[2]).attr("selected", true);
        $($paymentOptions[index]).removeAttr("selected");
        paymentArray[1].show();
        paymentArray[index2].hide();
      } else {
        $($paymentOptions[index]).removeAttr("selected");
        $($paymentOptions[3]).attr("selected", true);
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

//select all the inputs that need to be validated
const usernameInput = document.querySelector("#name");
const emailInput = document.querySelector("#mail");
const CCInput = document.querySelector("#cc-num");
const zipCodeInput = document.querySelector("#zip");
const CVVInput = document.querySelector("#cvv");
const selected = $("#payment option").eq(1);

//name validation
isValidUsername = () => {
  if (usernameInput.value === "") {
    usernameInput.placeholder = "Cannot be empty!";
    usernameInput.style.border = " 2px solid red";
    console.log("false");
    return false;
  } else {
    usernameInput.style.border = "2px solid rgb(111, 157, 220)";
    console.log("true");
    return true;
  }
};

//email Validation
isValidEmail = () => {
  const text = emailInput.value;
  const regex = /^[^@]+@[^@.]+\.[a-z]+$/gi.test(text);

  if (regex) {
    console.log("true");
    emailInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  } else {
    emailInput.style.border = " 2px solid red";
    console.log("Needs to be properly formatted!!");
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
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

//Payment Info Validation
isValidCC = () => {
  const text = CCInput.value;
  const regex = /^\d{13,16}$/gi.test(text);
  if (regex) {
    console.log("true");
    CCInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  } else {
    CCInput.style.border = " 2px solid red";
    console.log("Needs to be properly formatted!!");
    return false;
  }
};

isValidZipCode = () => {
  const text = zipCodeInput.value;
  const regex = /^\d{5}$/gi.test(text);
  if (regex) {
    console.log("true");
    zipCodeInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  } else {
    zipCodeInput.style.border = " 2px solid red";
    console.log("Needs to be properly formatted!!");
    return false;
  }
};

isValidCVV = () => {
  const text = CVVInput.value;
  const regex = /^\d{3}$/gi.test(text);
  if (regex) {
    console.log("true");
    CVVInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  } else {
    CVVInput.style.border = " 2px solid red";
    console.log("Needs to be properly formatted!!");
    return false;
  }
};

//form submission

$("form").on("submit", e => {
  const isPropSelected = selected.prop("selected");
  // if (isPropSelected) {
  //   if (!isValidCC() || !isValidZipCode() || !isValidCVV()) {
  //     e.preventDefault();
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  if (!isValidUsername() || !isValidEmail() || !isActivitiesChecked()) {
    console.log("false");
    e.preventDefault();
    return false;
  } else if (isPropSelected) {
    if (!isValidCC() || !isValidZipCode() || !isValidCVV()) {
      e.preventDefault();
      return false;
    } else {
      console.log("true");
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

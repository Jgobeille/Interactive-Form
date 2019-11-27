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
$("#design > option:nth-child(1)").attr("hidden", true);
//when the selection changes in design selection box, perform functions
$designSelectElement.on("change", function(e) {
  //hide the color bolierplate text on change
  $("#color > option:nth-child(1)").attr("hidden", true);
  //if target value is equal to js puns, then make the second option 'selected', show the first three options, and hide the rest
  if ($(e.target).val() === "js puns") {
    $("#color > option:nth-child(2)")
      .attr("selected", true)
      .show();
    $("#color > option:nth-child(3)").show();
    $("#color > option:nth-child(4)").show();

    $("#color > option:nth-child(5)")
      .attr("selected", false)
      .hide();
    $("#color > option:nth-child(6)").hide();
    $("#color > option:nth-child(7)").hide();
    //Else hide the first three options and make the last three visible
  } else {
    $("#color > option:nth-child(2)")
      .attr("selected", false)
      .hide();
    $("#color > option:nth-child(3)").hide();
    $("#color > option:nth-child(4)").hide();

    $("#color > option:nth-child(5)")
      .attr("selected", true)
      .show();
    $("#color > option:nth-child(6)").show();
    $("#color > option:nth-child(7)").show();
  }
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
$("#paypal").hide();
$("#bitcoin").hide();

//add change listener on payment options
$paymentSection.on("change", function(e) {
  //change to for loop and make set attribute to $
  for (var i = 0; i < $paymentOptions.length; i++) {
    if (e.target.value === "credit card") {
      $paymentOptions[1].setAttribute("selected", true);
      $paymentOptions[i].removeAttribute("selected");
      $("#credit-card").show();
      $("#paypal").hide();
      $("#bitcoin").hide();
    } else if (e.target.value === "paypal") {
      $paymentOptions[2].setAttribute("selected", true);
      $paymentOptions[i].removeAttribute("selected");
      $("#credit-card").hide();
      $("#paypal").show();
      $("#bitcoin").hide();
    } else {
      $paymentOptions[3].setAttribute("selected", true);
      $paymentOptions[i].removeAttribute("selected");
      $("#credit-card").hide();
      $("#paypal").hide();
      $("#bitcoin").show();
    }
  }
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
const emailInput = document.getElementById("mail");

//name validation
isValidUsername = e => {
  if (e.target.value === "") {
    usernameInput.placeholder = "Cannot be empty!";
    usernameInput.style.border = " 2px solid red";
    return false;
  } else {
    usernameInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  }
};

//email Validation
isValidEmail = email => {
  const text = email.target.value;
  const regex = /^[^@]+@[^@.]+\.[a-z]+$/gi.test(text);

  if (regex) {
    console.log("good");
    emailInput.style.border = "2px solid rgb(111, 157, 220)";
    return true;
  } else {
    emailInput.style.border = " 2px solid red";
    console.log("Needs to be properly formatted!!");
    return false;
  }
};

//activities Validation
activitiesIsChecked = () => {
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
    console.log("good");
    return true;
  } else {
    console.log("bad");
    return false;
  }
};

//Payment Info Validation

//button stop submit
const $button = $("button");

$button.click(e => {
  e.preventDefault();
  activitiesIsChecked();
});

//event listeners
usernameInput.addEventListener("input", isValidUsername);
emailInput.addEventListener("input", isValidEmail);

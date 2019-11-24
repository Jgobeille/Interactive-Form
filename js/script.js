//*============================================================================================

//Global vars

//*============================================================================================

const $name = $("#name");
const $jobTitleOptions = $("#title");
const $otherTitle = $("#other-title");
const $designSelectElement = $("#design");
const $designOptions = $("#design option");
const $colorSelectElement = $("#color");
const $colorOptions = $("#color option");

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

//Select all the checkboxes
const activitiesCheckboxes = document.querySelectorAll(".activities input");

//select activities section
const $activitiesSection = $(".activities");
let totalCost = 0;

//create div with text "total:" and concatenate total into it

//append to bottom of activities section and hide it

//add event listener to all the checkboxes
$(".activities").on("change", function(e) {
  const clicked = e.target;
  const clickedDayAndTime = clicked.getAttribute("data-day-and-time");
  const clickedCost = clicked.getAttribute("data-cost");
  const parsedNum = parseInt(clickedCost, 10);
  console.log(parsedNum);
  const clickedName = clicked.getAttribute("name");

  //On change, remove old total
  $(".total").remove();

  if (clicked.checked) {
    totalCost += parsedNum;
    $activitiesSection.append(`<div class="total">Total: ${totalCost}</div>`);
  } else {
    totalCost -= parsedNum;
    $activitiesSection.append(`<div class="total">Total: ${totalCost}</div>`);
  }

  //loop over all the checkboxes
  for (var i = 0; i < activitiesCheckboxes.length; i++) {
    //get all the datatypes
    const eventDayAndTime = activitiesCheckboxes[i].getAttribute(
      "data-day-and-time"
    );
    const name = activitiesCheckboxes[i].getAttribute("name");
    if (clicked.checked) {
      //check if same date and time
      if (clickedDayAndTime === eventDayAndTime && clickedName !== name) {
        activitiesCheckboxes[i].setAttribute("disabled", "true");
      }
    } else {
      activitiesCheckboxes[i].removeAttribute("disabled");
    }
  }
});

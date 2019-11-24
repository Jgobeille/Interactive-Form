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

//when the selection changes in design selection box, perform functions
$designSelectElement.on("change", function(e) {
  //hide the bolierplate text on change
  $("#design > option:nth-child(1)").attr("hidden", true);
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

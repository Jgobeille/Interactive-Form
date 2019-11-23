//*============================================================================================

//Global vars

//*============================================================================================

const $name = $("#name");
const $jobTitleOptions = $("#title");
const $otherTitle = $("#other-title");
const $tShirtOptions = $("#design");
console.log($tShirtOptions);
const colorOptions = $("#color option");
console.log(colorOptions);

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

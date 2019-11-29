# Project 3 Readme

## Interactive Form

---

This is the third project in the Team Treehouse Full-Stack JavaScript Tech Degree. In this project, we were tasked with making an Interactive form using HTML, CSS, and a mix of vanilla JS and the popular jQuery library.

We are making the form more user-friendly by:

- adding customized and conditional behavior and interactivity
- validating user input and providing helpful error messages when the user enters invalid information into the form fields.

Understanding jQuery is important for any Full-Stack Developer because jQuery, although beginning to show its age is still prevalent and used in many production websites and applications on the web today.

## Motivation

---

The motivation of this project is to present the versatility of my knowledge by using a JS library to accomplish a working project using jQuery. This project highlights the power of jQuery because it simplifies your code and makes it more readable as well.

The benefits of using jQuery are:

- Shorter and simplified syntax
- Help with cross-browser compatibility since jQuery deals with a lot of that stuff under the hood
- A strong familiarity with jQuery will only make you a better developer since it enjoys a strong market share on the web

This project is a fully-functioning example of a form a company or organization might use in their actual production website.

## Technology Used

---

This project uses the following technologies:

- HTML
- CSS

Non-obtrusive:

- Vanilla JS
- jQuery

## Features

---

This project has several interesting features to aid with error handling

1. Real-time error handling
   - Every input has error handling that checks on input of data to give real time feedback to user
2. Regex Validation
   - regex is used to ensure proper characters/formatting is used in each input
3. Non-obtrusive JS & jQuery
   - The form uses "non-obtrusive" JS & jQuery so that even if the user has JS turned off, the form will still operate as intended

## Code Example

---

    $paymentSection.on("change", e => {
      $paymentOptions.map(element => {
        const index = $paymentOptions.indexOf(element);
        paymentArray.map(payments => {
          const index2 = paymentArray.indexOf(payments);
          if (e.target.value === "credit card") {
            CCisSelected();
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

This is an example using a mix of Vanilla JS written with modern ES6 syntax aided by jQuery to more easily accomplish function objectives

## Screenshots

---

project_3_screenshot_2.png
project_3_screenshot_3.png
project_3_screenshot_4.png
real_time_error_handling.png

## License

---

MIT © Jamie Gobeille

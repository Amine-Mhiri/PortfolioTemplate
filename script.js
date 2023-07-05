// 1- sticky Navigation bar : Intersection Observer API :
const main = document.querySelector(".main");
const header = document.querySelector(".header");
const navHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(main);
//************************************************************************************************************/
/* End of the 1st Script  --------------------------------------------------------------------------------------------*/

/* 2- About section : Tabbed Component 
Adding interactivity & showing content when clicking on skills / Education or Experience  
************************************************************************************************************/

const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");
const linksContainer = document.querySelector(".tab-titles");

// Event Delegation
linksContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tab-links");

  // Guard Clause
  if (!clicked) return;

  // remove Active classes
  tabLinks.forEach((t) => t.classList.remove("active-link"));
  tabContents.forEach((c) => c.classList.remove("active-tab"));

  // Activate link clicked
  clicked.classList.add("active-link");
  // Activate associated content
  document
    .querySelector(`#${clicked.textContent.toLowerCase()}`)
    .classList.add("active-tab");
});

/* End of the 2nd Script  --------------------------------------------------------------------------------------------*/

/* 3- Mobile Menu : Script to open and close menu--------------------------------------------------------------------- */
/* Using OnClick in html with these two functions */
let sidemenu = document.getElementById("sidemenu");
function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

/* End of the 3rd Script  -------------------------------------------------------------------------------------------*/

/* 4-1 Reveal sections on scrolling *---------------------------------------------------------------------------------*/

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});
/*--------------------------------------------------------------------------------------------------------------*/

/* 4-2 Lazy Loading Images / Good for performance*-----------------------------------------------------------------*/
const imgsTargeted = document.querySelectorAll("img[data-src]");

const replaceImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    console.log(entry.target);

    //Replacing low quality images with good quality ones
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

imgObserver = new IntersectionObserver(replaceImg, {
  root: null,
  threshold: 0,
});

imgsTargeted.forEach((img) => imgObserver.observe(img));
/*--------------------------------------------------------------------------------------------------------------*/

/* 5- Contact me Form : Script to link your form to a google sheet account *------------------------------------------/
/* For a step by step tutorial of this part check https://github.com/jamiewilson/form-to-google-sheets */

/*the URL of a Google Apps Script. This script is set up to handle form submissions and write data to a Google Sheet.*/
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwoeP_D35zldxTb6Xwn5zWgXCcghcWOX9l_qoBWPEOk0pfnmQ8baamdFgTLsyaItQ4n/exec";
/*It allows to access and manipulate the form's properties and data.*/
const form = document.forms["submit-to-google-sheet"];
/*used to display a success message or error message after submitting the form.*/
const msg = document.getElementById("msg");

/*When the form is submitted, the provided callback function will be executed.*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

/* Explaining the 5th Script --------------------------------------------------------------------------

- e.preventDefault(): This line prevents the default form submission behavior, which would cause the page to refresh.

- fetch(scriptURL, { method: 'POST', body: new FormData(form) }): This line uses the Fetch API 
to send a POST request to the scriptURL. The FormData object is used to capture all 
the form data, and it is passed as the request body. 
The scriptURL is the destination where the form data will be sent for processing.

- .then(response => { ... }): This code block is executed when the fetch request is successful 
and a response is received. It handles the response returned by the Google Apps Script.

- msg.innerHTML = "Message sent successfully": This line sets the content of the HTML element
 with the id 'msg' to display a success message.

- setTimeout(function(){ msg.innerHTML ="" }, 5000): This line sets a timeout function 
to clear the success message after 5 seconds (5000 milliseconds).

- form.reset(): This line resets the form, clearing all the input fields.

.catch(error => console.error('Error!', error.message)): This code block is executed if an error occurs 
during the fetch request. It logs the error message to the console.

Overall, this code sets up an event listener on the form submission, prevents the default form submission 
behavior, sends a POST request to the specified script URL, handles the response (success or error), 
displays a success message, clears the form, and logs any errors that occur. It provides a way to submit
 the form data to a Google Sheet using a Google Apps Script as the intermediary.*/

'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-testimonials-time]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "??????") {
      filterItems[i].dataset.categoryMain ? filterItems[i].classList.add("active") : filterItems[i].classList.remove("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// send mail
const sendMail = function () {
  event.preventDefault();
  let name = document.getElementById('name').value,
    email = document.getElementById('email').value,
    message = document.getElementById('message').value;

  message = `I'm ${name}, from ${email}.%0d%0a?????? ${name}, ?????? ${email}.%0d%0a%0d%0a${message}`;

  location.href = `mailto:i@imyrs.com?cc=i@imy.rs&subject=Contact via IMY.RS&body=${message}`;
}


// Tour
const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    scrollTo: true
  }
});

const tourOff = function () {
  localStorage.tourOff = true;
  tour.cancel();
}

const toAbout = function () {
  document.getElementById('navAbout').click();
}
const toResume = function () {
  document.getElementById('navResume').click();
  tour.next();
}
const toPortfolio = function () {
  document.getElementById('navPortfolio').click();
  tour.next();
}
const toContact = function () {
  document.getElementById('navContact').click();
  tour.next();
}
const getFliter = function () {

}

tour.addSteps([
  {
    title: '????????????',
    text: '??????, ???????????????. ??????????????????.<br/><br/>????????????????????????????????????????????????.',
    buttons: [
      { text: '??????, ???????????????', action: tourOff, secondary: true },
      { text: '????????????, ??????', action: tour.next }
    ]
  }, {
    text: '??????, ??????????????????. ???????????????????????????????????????????????????.<br/><br/>??????, ??????????????????????????????, ????????????????????????????????????????????????, ???????????????????????????.<br/><br/>??????, ???????????????????????? ESC ?????????.',
    buttons: [{ text: '??????', action: tour.next }]
  }, {
    text: '??????, ??????????????????, ???????????????????????????????????????.<br/><br/>?????????????????????, ??????????????????????????????.',
    attachTo: { element: document.getElementById('navbar'), on: 'auto' },
    buttons: [{
      text: '?????????', action: () => {
        toAbout();
        tour.next();
      }
    }]
  }, {
    text: '????????????????????????, ????????????????????????????????????, ??????????????????????????????????????????.',
    attachTo: { element: document.getElementById('sidebar'), on: 'auto' },
    buttons: [{ text: '??????', action: tour.next }]
  }, {
    text: '????????????????????????????????????.<br/><br/>???, ????????????????????? ??????, ??????????????????.',
    attachTo: { element: document.getElementById('service'), on: 'auto' },
    buttons: [{ text: '?????????', action: tour.next }]
  }, {
    text: '???????????????????????????????????????????????????<br/><br/>???????????????????????????????????????: ?????????????????????????????????????????????????????????.',
    attachTo: { element: document.getElementById('testimonials'), on: 'auto' },
    buttons: [{ text: '??????', action: toResume }]
  }, {
    text: '???????????????, ?????????????????????, ??????????????????????????????????????????.??????????????????, ???????????????????????????????????????????????????, ??????????????????????????????????????????.',
    attachTo: { element: document.getElementById('resume'), on: 'auto' },
    buttons: [{ text: '?????????', action: toPortfolio }]
  }, {
    text: '??????! ???????????????????????????.<br/><br/>???????????????????????????????????????????????????. ????????????, ?????????????????????????????????????????????.<br/><br/>?????????????????????????????????????????????????????????.',
    attachTo: { element: document.getElementById('portfolio'), on: 'auto' },
    buttons: [{ text: '???????????????!', action: tour.next }]
  }, {
    text: '?????????????????????????????????????????????????????????????',
    buttons: [
      { text: '?????????', action: () => {
        toContact();
        tour.show(12);
      }, secondary: true },
      { text: '????????????', action: tour.next }
    ]
  }, {
    text: '???????????????????????????<br/><br/>Privacy is a joke ????????????????????????????????????????????????.<br/><br/>?????????????????????????????????????????????, ???????????? 14 ??????????????????.<br/><br/>??????????????????, ????????????, ?????????????????????????????????. ????????????, ??????, ????????????, ???????????????????????????, ???????????????????????????????????? 200 ??????, ??????????????????????????? 10 ??????.',
    attachTo: { element: document.getElementById('project1'), on: 'auto' },
    buttons: [{ text: '??????', action: tour.next }]
  }, {
    text: '???????????? Web ??????????????????????????????, ?????????????????????????????????.<br/><br/>?????????????????????????????????????????? (???????????????), ??????????????????????????????????????????, ???????????? Appium ?????????????????????.<br/><br/>???????????????, ?????????????????? App ??????????????????????????????, ??????, ???????????????.',
    attachTo: { element: document.getElementById('project2'), on: 'auto' },
    buttons: [{ text: '??????', action: tour.next }]
  }, {
    text: '?????????????????????!<br/><br/>?????????????????????????????????, ?????????, ???????????????????????????????????????????????????????????????????????????.<br/><br/>?????? ?????? + NLP + ?????? ??????????????????, ??????????????????, ????????????, ??????????????????????????????????????????.',
    attachTo: { element: document.getElementById('project3'), on: 'auto' },
    buttons: [{ text: '???????????????', action: toContact }]
  }, {
    text: '????????????????????????, ??????????????????????????????, ??????????????????????????????.<br/><br/>??????????????????????????????????????????????????????????????????.',
    attachTo: { element: document.getElementById('contact'), on: 'auto' },
    buttons: [{ text: 'OK', action: tour.next }]
  }, {
    text: '?????????????????????~<br/><br/>??????, ???????????????????????????????????????. ??????????????????????????????, ??????????????????.<br/><br/>??????.',
    attachTo: { element: document.getElementById('contact'), on: 'auto' },
    buttons: [
      {
        text: '????????????', action: () => {
          toAbout();
          tour.show(2);
        }, secondary: true
      },
      { text: '??????!', action: tourOff }
    ]
  }
]);

// if (!localStorage.tourOff) tour.start();
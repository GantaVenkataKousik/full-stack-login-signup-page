const wrapper = document.querySelector('.wrapper');
const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input"),
nField = form.querySelector(".name"), // Add the name field
nInput = nField.querySelector("input"), // Add the name input
cpField = form.querySelector(".confirm-password"), // Add the confirm password field
cpInput = cpField.querySelector("input"); // Add the confirm password input

form.onsubmit = (e) => {
// Validation for email field
(eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();

// Validation for password field
(pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

// Validation for name field
(nInput.value == "") ? nField.classList.add("shake", "error") : checkName();

// Validation for confirm password field
(cpInput.value == "" || cpInput.value !== pInput.value) ? cpField.classList.add("shake", "error") : checkConfirmPass();

setTimeout(() => {
  eField.classList.remove("shake");
  pField.classList.remove("shake");
  nField.classList.remove("shake");
  cpField.classList.remove("shake");
}, 500);

eInput.onkeyup = () => { checkEmail(); }
pInput.onkeyup = () => { checkPass(); }
nInput.onkeyup = () => { checkName(); }
cpInput.onkeyup = () => { checkConfirmPass(); }


  function checkEmail() { //checkEmail function
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
    if (!eInput.value.match(pattern)) { //if pattern not matched then add error and remove valid class
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      //if email value is not empty then show please enter valid email else show Email can't be blank
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    } else { //if pattern matched then remove error and add valid class
        wrapper.style.paddingTop = "50px";
        eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass() { //checkPass function
    if (pInput.value == "") { //if pass is empty then add error and remove valid class
      pField.classList.add("error");
      pField.classList.remove("valid");
    } else { //if pass is empty then remove error and add valid class
        
        wrapper.style.paddingTop = "40px";
      pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  function checkName() {
    if (nInput.value == "") {
      nField.classList.add("error");
      nField.classList.remove("valid");
      let errorTxt = nField.querySelector(".error-txt");
      errorTxt.innerText = "Name can't be blank";
    } else {
        
        wrapper.style.paddingTop = "40px";
      nField.classList.remove("error");
      nField.classList.add("valid");
    }
  }

  function checkConfirmPass() {
    if (cpInput.value == "" || cpInput.value !== pInput.value) {
      cpField.classList.add("error");
      cpField.classList.remove("valid");
      let errorTxt = cpField.querySelector(".error-txt");
      errorTxt.innerText = "Confirm password must match the password";
    } else {
        
        wrapper.style.paddingTop = "40px";
      cpField.classList.remove("error");
      cpField.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
    window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}
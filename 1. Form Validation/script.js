const form = document.querySelector("#form"),
  username = form.username,
  email = form.email,
  password = form.password,
  passwordTwo = form.password2;

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const smallElement = formControl.querySelector("small");
  smallElement.textContent = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkEmail = (input) => {
  const emailRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (emailRegEx.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid!");
  }
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
};

const checkPasswordsMatch = (inputOne, inputTwo) => {
  if (inputOne.value !== inputTwo.value) {
    showError(inputTwo, "Passwords do not match.");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([email, passwordTwo]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, passwordTwo);
});

const hideShowPassword = (target) => {
  if (target.matches(".fa-eye")) {
    target.parentElement.children[1].setAttribute("type", "text");
    target.style.display = "none";
    target.nextElementSibling.style.display = "inline";
  } else if (target.matches(".fa-eye-slash")) {
    target.parentElement.children[1].setAttribute("type", "password");
    target.style.display = "none";
    target.previousElementSibling.style.display = "inline";
  }
};

form.addEventListener("click", (e) => {
  const target = e.target;
  hideShowPassword(target);
});

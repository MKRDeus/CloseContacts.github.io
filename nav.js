//links
const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");
//containers
const loginContainer = document.querySelector("#login-container");
const registerContainer = document.querySelector("#register-container");

loginLink.addEventListener("click", function () {
  loginContainer.classList.add("show-login");
  loginContainer.classList.remove("hide");
  //ocultar registro
  registerContainer.classList.add("hide");
  registerContainer.classList.remove("show");
});

registerLink.addEventListener("click", function () {
  registerContainer.classList.add("show");
  registerContainer.classList.remove("hide");
  //ocultar login
  loginContainer.classList.add("hide");
  loginContainer.classList.remove("show-login");
});


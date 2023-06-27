//links menu
const addLink = document.querySelector("#add-link");
const contactLink = document.querySelector("#contact-link");
const logOutLink = document.querySelector("#logout-link");
//containers
const formContainer = document.querySelector("#form");
listContainer = document.querySelector("#list-container");
addLink.addEventListener("click", function () {
  //mostrar agregar contacto
  formContainer.classList.add("show");
  formContainer.classList.remove("hide");
  //ocultar lista de contacto
  listContainer.classList.add("hide");
  listContainer.classList.remove("show");
});
contactLink.addEventListener("click", function () {
  //mostrar lista de contacto
  listContainer.classList.add("show");
  listContainer.classList.remove("hide");
  //ocultar agragar contacto
  formContainer.classList.add("hide");
  formContainer.classList.remove("show");
});
logOutLink.addEventListener("click", function () {
  alert("Salir");
});

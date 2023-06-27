// formulary
const form = document.querySelector("#form");
// Inputs del Registre
const nameInput = document.querySelector("#name-input");
const numberInput = document.querySelector("#numberphone-input");
//Contacts list
const list = document.querySelector("#list");
//localStorage
const user = JSON.parse(localStorage.getItem("user"));
//Validations REGEX
const NAME_REGEX =
  /^[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú]+(\s*[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú\s]*)$/;
const NUMBER_REGEX = /^(0424|0414|0416|0426|0412|0212)(\d{7})$/;

(() => {
  if (!user) {
    window.location.hrerf = "../home/index.html";
  }
})();

const validation = (validation, input) => {
  if (validation) {
    input.classList.remove("wrong");
    input.classList.add("right");
    input.parentElement.children[2].classList.remove("display-text");
  } else {
    input.classList.add("wrong");
    input.classList.remove("right");
    input.parentElement.children[2].classList.add("display-text");
  }
};
nameInput.addEventListener("input", (e) => {
  if (nameInput.value === "") {
    nameInput.classList.remove("right");
    nameInput.classList.remove("wrong");
    nameInput.parentElement.children[2].classList.remove("display-text");
  } else {
    const nameValidation = NAME_REGEX.test(e.target.value);
    validation(nameValidation, nameInput);
  }
});
numberInput.addEventListener("input", (e) => {
  if (numberInput.value === "") {
    numberInput.classList.remove("right");
    numberInput.classList.remove("wrong");
    numberInput.parentElement.children[2].classList.remove("display-text");
  } else {
    const numberphoneValidation = NUMBER_REGEX.test(e.target.value);
    validation(numberphoneValidation, numberInput);
  }
});

//form event
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const responseJSON = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      user: user.username,
      number: numberInput.value,
    }),
  });

  const response = await responseJSON.json();
  //Create Items Contact
  const listItem = document.createElement("li");
  listItem.id = response.id;
  listItem.innerHTML = `
  <li class="contacts">
  <input value="${response.name}" id="name-list" type="text" class="edit-text" readonly />
  <input value="${response.number}" id="number-list" type="text" class="edit-text" readonly />
  <div class="button-list-container">
    <button id="delete-button" class="button-list show">
      <ion-icon class="icons" name="trash-bin-outline"></ion-icon>
    </button>
    <button id="edit-button" class="button-list show-btn">
      <ion-icon class="icons" name="create-outline"></ion-icon>
    </button>
    <button id="done-button" class="button-list hide">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>  
    </button>
  </div>
</li>
  `;

  //Add listItem to list
  list.appendChild(listItem);
  nameInput.value = "";
  numberInput.value = "";
});

list.addEventListener("click", async (e) => {
  if (e.target.closest("#delete-button")) {
    const listItem =
      e.target.closest("#delete-button").parentElement.parentElement
        .parentElement;
    const id =
      e.target.closest("#delete-button").parentElement.parentElement
        .parentElement.id;
    await fetch(`http://localhost:3000/contacts/${id}`, { method: "DELETE" });
    list.removeChild(listItem);
  }
  if (e.target.closest("#edit-button")) {
    const edit = e.target.closest("#edit-button");
    const done = e.target.closest("#edit-button").parentElement.children[2];
    const name =
      e.target.closest("#edit-button").parentElement.parentElement.children[0];
    const number =
      e.target.closest("#edit-button").parentElement.parentElement.children[1];
    //ocultar edit-button
    edit.classList.add("hide");
    edit.classList.remove("show-btn");
    //mostrar done-button
    done.classList.add("show-btn");
    done.classList.remove("hide");
    //remove readonly
    name.removeAttribute("readonly");
    number.removeAttribute("readonly");
    //add background
    name.classList.add("edit-on");
    number.classList.add("edit-on");
  }
  if (e.target.closest("#done-button")) {
    const edit = e.target.closest("#done-button").parentElement.children[1];
    const done = e.target.closest("#done-button");
    const name =
      e.target.closest("#done-button").parentElement.parentElement.children[0];
    const number =
      e.target.closest("#done-button").parentElement.parentElement.children[1];
    //ocultar done-button
    done.classList.add("hide");
    done.classList.remove("show-btn");
    //mostrar edit-button
    edit.classList.add("show-btn");
    edit.classList.remove("hide");
    //set readonly
    name.setAttribute("readonly", "on");
    number.setAttribute("readonly", "on");
    //remove background
    name.classList.remove("edit-on");
    number.classList.remove("edit-on");
    //quitar background
    name.classList.remove("edit-right");
    number.classList.remove("edit-right");    
    name.classList.remove("edit-wrong");
    number.classList.remove("edit-wrong");
    //actualizar
    const id =
      e.target.closest("#done-button").parentElement.parentElement.parentElement
        .id;
    const responseJSON = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.value, number: number.value }),
    });
  }
});

list.addEventListener("input", (e) => {
  const contactValidation = (contactValidation, input) => {
    if (contactValidation) {
      input.classList.add("edit-right");
      input.classList.remove("edit-wrong");
    } else {
      input.classList.add("edit-wrong");
      input.classList.remove("edit-right");
    }
    if (input.value === "") {
      input.classList.remove("edit-right");
      input.classList.remove("edit-wrong");
    }
  };

  if (e.target.closest("#name-list")) {
    nameContact = e.target.closest("#name-list");
    const nameValidation = NAME_REGEX.test(nameContact.value);
    contactValidation(nameValidation, nameContact);
  }
  if (e.target.closest("#number-list")) {
    const numberContact = e.target.closest("#number-list");
    const numberphoneValidation = NUMBER_REGEX.test(numberContact.value);
    contactValidation(numberphoneValidation, numberContact);
  }
});

const logoutLink = document.querySelector("#logout-link");

logoutLink.addEventListener("click", async (e) => {
  localStorage.removeItem("user");
  window.location.href = "../home/index.html";
});

const getContacts = async () => {
  const response = await fetch("http://localhost:3000/contacts", {
    method: "GET",
  });
  const contacts = await response.json();
  const userContacts = contacts.filter(
    (contact) => contact.user === user.username
  );
  userContacts.forEach((contact) => {
    const listItem = document.createElement("li");
    listItem.id = contact.id;
    listItem.innerHTML = `
      <li class="contacts">
  <input value="${contact.name}" id="name-list" type="text" class="edit-text" readonly />
  <input value="${contact.number}" id="number-list" type="text" class="edit-text" readonly />
  <div class="button-list-container">
    <button id="delete-button" class="button-list">
      <ion-icon class="icons" name="trash-bin-outline"></ion-icon>
    </button>
    <button id="edit-button" class="button-list">
      <ion-icon class="icons" name="create-outline"></ion-icon>
    </button>
    <button id="done-button" class="button-list hide">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>  
    </button>
  </div>
</li>
  `;
    list.appendChild(listItem);
  });
};

getContacts();

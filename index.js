const registerForm = document.querySelector("#form-register");
const nameInput = document.querySelector("#input-name");
const notification = document.querySelector(".notification");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#name-login");

const NAME_REGEX = /^[A-Za-z]*$/;

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
  const nameValidation = NAME_REGEX.test(e.target.value);
  validation(nameValidation, nameInput);
});
loginInput.addEventListener("input", (e) => {
  const loginValidation = NAME_REGEX.test(e.target.value);
  validation(loginValidation, loginInput);
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users = await response.json();
  const user = users.find((user) => user.username === nameInput.value);

  if (nameInput.value === "") {
    notification.innerHTML = "El usuario no puede estar vacio";
    notification.classList.add("show-notification");
    setTimeout(() => {
      notification.classList.remove("show-notification");
    }, 3000);
  } else if (user) {
    notification.innerHTML = "El usuario ya existe";
    notification.classList.add("show-notification");
    setTimeout(() => {
      notification.classList.remove("show-notification");
    }, 3000);
  } else {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: nameInput.value }),
    });
    notification.innerHTML = `El Usuario ${nameInput.value} ha sido creado`;
    notification.classList.add("show-notification");
    setInterval(() => {
      notification.classList.remove("show-notification");
    }, 5000);
    createInput.value = "";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const users = await response.json();
  const user = users.find((user) => user.username === loginInput.value);

  if (!user) {
    notification.innerHTML = "El usuario no existe";
    notification.classList.add("show-notification");
    setTimeout(() => {
      notification.classList.remove("show-notification");
    }, 3000);
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "../contact-page/contact.html";
  }
});

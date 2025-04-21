import customAxios from "../configs/axios.config.js";
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
const formEL = document.querySelector("form");

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});


formEL.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(formEL);
  const data = Object.fromEntries(formData.entries());

  customAxios
    .post("/user/register", data)
    .then((response) => {
      console.log(response.data);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
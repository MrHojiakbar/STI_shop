import "bootstrap";
import customAxios from "./configs/axios.config.js";

const categoryBox = document.querySelector(".category-box");
const userProf=document.querySelector(".userInfo")
const newProductBtn=document.querySelector(".create")

if (module.hot) {
  module.hot.accept();
} // Bu cookie'larni ko'rsatadi

window.onload = function() {
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  const token = getCookie('refreshToken');
    // Bu cookie'ni ko'rsatadi
  
  userProf.innerHTML = "";
  if (token) {
    const user = getCookie('user');
    const userData = JSON.parse(user);
    const profile=document.createElement("div");
    const userName = document.createElement("h5");
    userName.innerText = userData.name;
    const profileImg = document.createElement("img");
    
    profileImg.src = "http://localhost:3000"+userData.imageUrl;
    console.log(profileImg.src);
    profileImg.classList.add("rounded-circle", "me-2");
    profileImg.style.width = "80px";
    profileImg.style.height = "80px";
    profile.classList.add("d-flex", "align-items-center");
    userName.classList.add("text-black");
    profile.classList.add("d-flex", "align-items-center");
    profile.style.cursor = "pointer";
    const logoutLink = document.createElement("a");
    logoutLink.href = "./pages/login.html";
    logoutLink.classList.add("btn", "btn-primary", "ms-3");
    logoutLink.innerText = "Chiqish";
    profile.appendChild(profileImg);
    profile.appendChild(userName);
    profile.appendChild(logoutLink);
    userProf.appendChild(profile);
  } else {
    newProductBtn.style.display = "none";
    const loginLink = document.createElement("a");
    loginLink.href = "./pages/login.html";
    loginLink.classList.add("btn", "btn-light", "ms-3");
    loginLink.innerText = "Kirish";
    const registerLink = document.createElement("a");
    registerLink.href = "./pages/register.html";
    registerLink.classList.add("btn", "btn-outline-light", "ms-2");
    registerLink.innerText = "Ro'yxatdan o'tish";
    userProf.appendChild(loginLink);
    userProf.appendChild(registerLink);
  }
};
customAxios.get('/category/')
  .then(response => {
    categoryBox.innerHTML = "";
    const devEL = document.createElement("div");
    devEL.classList.add("row");
    

    response.data.data.forEach(category => {
      const col = document.createElement("div");
      col.classList.add("col-md-3");

      const card = document.createElement("div");
      card.classList.add("card", "p-3");

      const h6 = document.createElement("h6");
      h6.innerText = category.name;

      card.appendChild(h6);
      col.appendChild(card);
      devEL.appendChild(col);
    });

    categoryBox.appendChild(devEL);
  })
  .catch(error => {
    console.error('Xato:', error);
  });

customAxios.get('/product/')
  .then(response => {
    const productBox = document.querySelector(".product-box");
    productBox.innerHTML = "";
    const devEL = document.createElement("div");
    devEL.classList.add("row");
    

    response.data.data.forEach(product => {;
      const col = document.createElement("div");
      col.classList.add("col-md-3");

      const card = document.createElement("div");
      card.classList.add("card", "p-3");

      const img = document.createElement("img");
      img.style.width = "200px";
      img.style.height = "200px";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center";
      img.style.borderRadius = "10px";
      img.style.margin = "0 auto";
      img.src = "http://localhost:3000"+product.imageUrl;
      img.classList.add("card-img-top");

      const h5 = document.createElement("h5");
      h5.classList.add("card-title");
      h5.innerText = product.name;

      const p = document.createElement("p");
      p.classList.add("card-text");
      p.innerText = `${product.price} so'm`;

      const a = document.createElement("a");
      a.href = "#";
      a.classList.add("btn", "btn-primary");
      a.innerText = "Batafsil";

      card.appendChild(img);
      card.appendChild(h5);
      card.appendChild(p);
      card.appendChild(a);
      
      col.appendChild(card);
      devEL.appendChild(col);
    });

    productBox.appendChild(devEL);
  })
  .catch(error => {
    console.error('Xato:', error);
  });


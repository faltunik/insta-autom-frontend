import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// read cred from secrets.env

var insta_email = 'insta_scrape_user_email';
var insta_access_token = 'insta_scrape_user_access_token';
var insta_uid = 'insta_scrape_user_uid';


const firebaseConfig = {
  apiKey: "AIzaSyAB7Q3b5SkVXQVqnaAAJ_k4wEZls2d-GVA",
  authDomain: "instascrape-503d0.firebaseapp.com",
  projectId: "instascrape-503d0",
  storageBucket: "instascrape-503d0.appspot.com",
  messagingSenderId: "365955232591",
  appId: "1:365955232591:web:e0fa02a1569f0b828dcb3a",
  measurementId: "G-GK0VPH1LP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);

document.getElementById("register-button").addEventListener("click", function(e) {
    e.preventDefault();
    var email =  document.getElementById("reg_email").value;
    var password = document.getElementById("reg_password").value;
    var confirm_password = document.getElementById("reg_confirm_password").value;
    if (password != confirm_password){
        alert("Password and Confirm Password are not same");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Registration successfully!!");
    localStorage.setItem(insta_email, user.email);
    localStorage.setItem(insta_access_token, user.accessToken);
    localStorage.setItem(insta_uid, user.uid);
    window.location.href = "main.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(error);
    });		  		  
});

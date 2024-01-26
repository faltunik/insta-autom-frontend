import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js'
import { getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'



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


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);
const auth = getAuth(app);


document.getElementById("login-button").addEventListener("click", function(e) {
    
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert(user.email+" Login successfully!!!");
      //document.getElementById('logout').style.display = 'block';
      // store in local storage as insta_scrape_user_email
      try{
        localStorage.setItem(insta_email, user.email);
        localStorage.setItem(insta_access_token, user.accessToken);
        localStorage.setItem(insta_uid, user.uid);
        console.log(localStorage.getItem(insta_email));
        console.log(localStorage.getItem(insta_access_token));
        console.log(localStorage.getItem(insta_uid));
      }
      catch(err){
        console.log("Error in storing data in local storage", err);
      }

      window.location.href = "main.html";
    // print that insta_scrape_user_email
    console.log(localStorage.getItem('insta_scrape_user_email'));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
    // redirect user to main.html
    e.preventDefault() ;
    //window.location.href = "main.html";
  		  
});



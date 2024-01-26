import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js'
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'


var url = 'http://127.0.0.1:8000'
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

async function checkAccessToken() {
    var access_token = localStorage.getItem(insta_access_token);
    if (access_token == null) {
        return false;
    }
    const api_res = await fetch(url + '/validate_auth' + '?auth_key=' + access_token);
    console.log(api_res);
    if (api_res.status == 200) {
        console.log("Access token is valid");
        return true;
    }

    console.log(
        "RETURNING FROM HERE")
    return false;

}

function checkEmail() {
    var email = localStorage.getItem(insta_email);
    if (email == null) {
        return false;
    }
    console.log("EMAIL", email)
    return true;
}
function checkUid() {
    var uid = localStorage.getItem(insta_uid);
    if (uid == null) {
        return false;
    }
    console.log("UID", uid)
    return true;

}

function readFile(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

}


async function scrapeData(e) {
    e.preventDefault();
    try {
        var username = document.getElementById('insta_username').value;
        var password = document.getElementById('insta_password').value;
        var last_date = document.getElementById('last_date').value;
        var number_of_videos = document.getElementById('number_of_videos').value;
        var email = localStorage.getItem(insta_email);
        var uid = localStorage.getItem(insta_uid);
        var access_token = localStorage.getItem(insta_access_token);
        var file = document.getElementById('url_list').files[0];
        var scrape_url = url + '/start';
        var login_required = document.getElementById("myCheckbox").checked 
        if (!file) {
            alert("Please Upload File First");
            return;
        }
        if (file.type != 'text/plain') {
            alert("Invalid file type. Please upload a text file.");
            return;
        }
        if (username == '' || password == '') {
            alert("Please Enter Username and Password");
            return;
        }
        // nu fo videos should be less than 50 if not, make it 50
        try{
            number_of_videos = Math.min(number_of_videos, 50);
        }
        catch{
            number_of_videos = 10;
        }
        // last day should be max 30 days old
        try{
            last_date = Math.min(last_date, 30);
        }
        catch{
            last_date = 7;
        }
        // file size should be less than 1 MB
        try{
            if (file.size > 1000000){
                alert("File size should be less than 1 MB");
                return;
            }
        }
        catch{
            alert("FILE NOT FOUND")
        }

        


        // convert file object into valid byte object
        // read file synchronously 
        const file_data_base64 = await readFile(file);
        const encodedData = file_data_base64.replace(/^data:text\/plain;base64,/, '');
        const decodedData = atob(encodedData);
        console.log(decodedData);
        var file_data = decodedData.split('\n');
        // convert in string by join by "#"
        var new_arr = [];
        for(var i=0; i<file_data.length; i++){
            //split by / and get second last element
            try{
                if (file_data[i] == ""){
                    continue;
                }
                var temp = file_data[i].split('/');
                // if last element of temp is empty or len is les than 2
                if (temp[temp.length-1] == "" || temp.length < 2){
                    var temp2 = temp[temp.length-2];
                }
                else{
                    var temp2 = temp[temp.length-1];
                }
                console.log(i, temp, file_data[i])
                if (temp2.length >=2 ){
                    new_arr.push(temp2);
                }
            }
            catch(err){
                console.log(err);
            }
        }



        file_data = new_arr.join("##");
        console.log(file_data);


        const data = {
            username: username,
            password: password,
            last_date: last_date,
            amount: number_of_videos,
            email: email,
            uid: uid,
            access_token: access_token,
            urls : file_data
        }
        
        
        fetch(scrape_url, {
            method: 'POST',
            body: JSON.stringify(data) ,// formData,
            headers:{
                "Content-Type": "application/json",
                },
        }).then(function (response) {
            console.log(response);
            console.log(response.body);
            console.log(response.body.message);
            if (response.status ==200){
                alert("Request Accepted! You will get Email within 5 minutes")
            }
            else{
                alert("ERROR! ", response.body)
            }
        }).catch(function (err) {
            console.log(err);
            alert("Error Occured", err);
        })
        
    }
    catch (err) {
        console.log("ERROR", err);
    }
    return;


}

function sign_out(e) {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        alert('Sign-out successful.');
        localStorage.removeItem(insta_email);
        localStorage.removeItem(insta_access_token);
        localStorage.removeItem(insta_uid);
        window.location.href = "login.html";
    }).catch((error) => {
        // An error happened.
        console.log('An error happened.', error);
    });

    e.preventDefault();
}

// add page loads
if (!checkEmail() || !checkUid() || ! await checkAccessToken()) {
    window.location.href = "login.html";
    //clear those keys from local storage
    localStorage.removeItem(insta_email);
    localStorage.removeItem(insta_access_token);
    localStorage.removeItem(insta_uid);

}


// Here Add All Event Listener
document.getElementById('scrape-form').addEventListener('submit', scrapeData);
document.getElementById("logout-id").addEventListener("click", sign_out);
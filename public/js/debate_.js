const ejs_data = document.getElementById('ejs_data');
let debate_id = ejs_data.dataset.ejs;

document.getElementById('pro_button').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('comment_form_pro').classList.add('active');
    document.getElementById('overlay').classList.add('active');
})

document.getElementById('con_button').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('comment_form_pro').classList.add('active');
    document.getElementById('overlay').classList.add('active');
})



function openFormPro(){ //create listener to handle submit button
    var post = document.getElementById('comment_form_pro');
    post.style.display = 'block';    
};

function openFormCon(){ //create listener to handle submit button
    var post = document.getElementById('comment_form_con');
        post.style.display = 'block';    
};

function closePopupPro() {
    document.getElementById('comment_form_pro').style.display = 'none';
    document.getElementById('comment_form_pro').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function closePopupCon() {
    document.getElementById('comment_form_con').style.display = 'none';
    document.getElementById('comment_form_pro').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function submitcommentpro(){ //create listener to handle submit button

    comment_text = document.getElementById('pro_textbox').value;
    console.log(comment_text)
    var req2 = new XMLHttpRequest();
    req2.responseType = 'json';
    req2.open("POST","http://localhost:3000/pro",true);
    req2.setRequestHeader("Content-Type", "application/json");
    req2.send(JSON.stringify({"text":comment_text, "debate_id" : debate_id}));
    req2.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
        }
    }
};

function submitcommentcon(){ //create listener to handle submit button

    comment_text = document.getElementById('con_textbox').value;
    console.log(comment_text)
    var req2 = new XMLHttpRequest();
    req2.responseType = 'json';
    req2.open("POST","http://localhost:3000/con",true);
    req2.setRequestHeader("Content-Type", "application/json");
    req2.send(JSON.stringify({"text":comment_text, "debate_id": debate_id}));
    req2.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
        }
    }
};


function user_liked_debate() {
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes_debate",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"debate_id": debate_id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist_debate",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"debate_id": debate_id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
                }
            }
        }
    }
}

function user_unliked_debate(id) {
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes_debate_unlike",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"debate_id": debate_id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist_debate_unlike",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"debate_id": debate_id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
                }
            }
        }
    }
}


function user_liked_comment(comment_id) {
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"comment_id": comment_id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"comment_id": comment_id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
                }
            }
        }
    }
    // window.location = "http://localhost:3000/";
}

function user_unliked_comment(id) {
    console.log("pressed:")
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes_unlike",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"comment_id":id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            console.log("like updated")
            // window.location = "http://localhost:3000/";
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist_unlike",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"comment_id":id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/debate_?debate_id=" + debate_id;
                }
            }
        }
    }
    // window.location = "http://localhost:3000/";
}
const ejs_data = document.getElementById('ejs_data');
let debate_id = ejs_data.dataset.ejs;
console.log(debate_id);
let request = new XMLHttpRequest();
request.open("GET","http://localhost:3000/debate_data?debate_id=" + debate_id,true);
request.setRequestHeader("Content-Type", "application/json");
request.send(null);
request.onreadystatechange = function() { //handle the response back from the server
    if (this.readyState == 4 && this.status == 200) {
        comments_string = "";
        var debate_data = JSON.parse(this.response);
        console.log(this.response);
        let message = document.getElementById('debate_display');
        //var debate_id = debate_data[0]._id
        message.innerHTML = debate_data[0].title;
        let request2 = new XMLHttpRequest();
        request2.open("GET","http://localhost:3000/comments?debate_id=" + debate_id,true);
        request2.setRequestHeader("Content-Type", "application/json");
        request2.send(null);
        request2.onreadystatechange = function() { //handle the response back from the server
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response);
                let comments_received = JSON.parse(this.response);                
                let request3 = new XMLHttpRequest();
                request3.open("GET","http://localhost:3000/user_data",true);
                request3.setRequestHeader("Content-Type", "application/json");
                request3.send(null);
                request3.onreadystatechange = function() { //handle the response back from the server
                    if (this.readyState == 4 && this.status == 200) {
                        var likes_received = JSON.parse(this.response)
                        var data = []
                        for (var x in likes_received) {
                            data = likes_received[x]
                        }
                        
                        var likes = data.comments_id_liked;
                        var likes_debate = data.debate_id_liked;

                        if (likes_debate == null) {
                            var deb_like = document.createElement("button");
                            var deb_like2 = document.createElement("i");
                            deb_like.setAttribute("class", "like_button");
                            deb_like.className = "like_button"
                            var funct_string = 'user_liked_debate('+String(debate_id)+')';
                            deb_like.setAttribute('onclick',funct_string);

                            var text = document.createTextNode("Like (0)");
                            deb_like2.setAttribute("class", "far fa-heart");
                            deb_like2.className = "far fa-heart"
                        } else{
                            if (likes_debate.indexOf(debate_id.valueOf()) >= 0) {
                                var deb_like = document.createElement("button");
                                var deb_like2 = document.createElement("i");
                                deb_like.setAttribute("class", "already_like_button");
                                deb_like.className = "already_like_button"
                                var funct_string = 'user_unliked_debate(\"'+debate_id+'\")';
                                console.log(funct_string)
                                deb_like.setAttribute('onclick',funct_string);
                                var text = document.createTextNode("Unlike ("+String(debate_data[0].likes)+")");
                                deb_like2.setAttribute("class", "far fa-heart");
                                deb_like2.className = "fa fa-heart"
                            } else{
                                var deb_like = document.createElement("button");
                                var deb_like2 = document.createElement("i");
                                deb_like.setAttribute("class", "like_button");
                                deb_like.className = "like_button"
                                var funct_string = 'user_liked_debate(\"'+debate_id+'\")';
                                deb_like.setAttribute('onclick',funct_string);

                                var text = document.createTextNode("Like ("+String(debate_data[0].likes)+")");
                                deb_like2.setAttribute("class", "far fa-heart");
                                deb_like2.className = "far fa-heart"
                            }
                        }
                        
                        deb_like.appendChild(deb_like2)
                        deb_like.appendChild(text);
                        d_l = document.getElementById('debate_like_button')
                        d_l.appendChild(deb_like)       

                        console.log(likes);
                        if(JSON.stringify(comments_received) !== JSON.stringify([])) {
                            var cmtListElement = document.getElementById('comments_display');
                            var count = 0;
                            for (var x in comments_received) {
                                // console.log(comments_received[x]);
                                pro_or_con = comments_received[x].pro_con
                                if (pro_or_con == 1) {
                                    console.log("pro")
                                    var para = document.createElement("p");
                                    para.setAttribute("class", "comments_display_pro");
                                    para.className = "comments_display_pro"
                                    var line = comments_received[x].comment
                                    var text = document.createTextNode(line);
                                    para.appendChild(text);
                                    cmtListElement.appendChild(para)
                                    console.log((comments_received[x]._id).valueOf())
                                    if (likes == null) {
                                        var para2 = document.createElement("button");
                                        var para22 = document.createElement("i");
                                        para2.setAttribute("class", "like_button");
                                        para2.className = "like_button"
                                        var funct_string = 'user_liked_comment(\"'+comments_received[x]._id+'\")';
                                        console.log(funct_string)
                                        para2.setAttribute('onclick',funct_string);
                                        var text = document.createTextNode("Like ("+comments_received[x].likes+")");
                                        para22.setAttribute("class", "far fa-heart");
                                        para22.className = "far fa-heart"
                                    } else {
                                        if (likes.indexOf((comments_received[x]._id).valueOf()) >= 0) {
                                            var para2 = document.createElement("button");
                                            var para22 = document.createElement("i");
                                            para2.setAttribute("class", "already_like_button");
                                            para2.className = "already_like_button"
                                            var funct_string = 'user_unliked_comment(\"'+comments_received[x]._id+'\")';
                                            console.log(funct_string)
                                            para2.setAttribute('onclick',funct_string);
                                            var text = document.createTextNode("Unlike ("+comments_received[x].likes+")");
                                            para22.setAttribute("class", "fa fa-heart");
                                            para22.className = "fa fa-heart"
                                        } else{
                                            var para2 = document.createElement("button");
                                            var para22 = document.createElement("i");
                                            para2.setAttribute("class", "like_button");
                                            para2.className = "like_button"
                                            var funct_string = 'user_liked_comment(\"'+comments_received[x]._id+'\")';
                                            console.log(funct_string)
                                            para2.setAttribute('onclick',funct_string);
                                            var text = document.createTextNode("Like ("+comments_received[x].likes+")");
                                            para22.setAttribute("class", "far fa-heart");
                                            para22.className = "far fa-heart"
                                        }
                                    }

                                
                                    para2.appendChild(para22)
                                    para2.appendChild(text);
                                    cmtListElement.appendChild(para2)

                                
                                } else {
                                    var para = document.createElement("p");
                                    para.setAttribute("class", "comments_display_con");
                                    para.className = "comments_display_con"
                                    var line = comments_received[x].comment
                                    var text = document.createTextNode(line);
                                    para.appendChild(text);
                                    cmtListElement.appendChild(para);

                                    if (likes == null) {
                                        var para2 = document.createElement("button");
                                        var para22 = document.createElement("i");
                                        para2.setAttribute("class", "like_button");
                                        para2.className = "like_button"
                                        var funct_string = 'user_liked_comment(\"'+comments_received[x]._id+'\")';
                                        console.log(funct_string)
                                        para2.setAttribute('onclick',funct_string);
                                        var text = document.createTextNode("Like ("+comments_received[x].likes+")");
                                        para22.setAttribute("class", "far fa-heart");
                                        para22.className = "far fa-heart"
                                    } else {
                                        if (likes.indexOf((comments_received[x]._id).valueOf()) >= 0) {
                                            var para2 = document.createElement("button");
                                            var para22 = document.createElement("i");
                                            para2.setAttribute("class", "already_like_button");
                                            para2.className = "already_like_button"
                                            var funct_string = 'user_unliked_comment(\"'+comments_received[x]._id+'\")';
                                            console.log(funct_string)
                                            para2.setAttribute('onclick',funct_string);
                                            var text = document.createTextNode("Unlike ("+comments_received[x].likes+")");
                                            para22.setAttribute("class", "fa fa-heart");
                                            para22.className = "fa fa-heart"
                                        } else{
                                            var para2 = document.createElement("button");
                                            var para22 = document.createElement("i");
                                            para2.setAttribute("class", "like_button");
                                            para2.className = "like_button"
                                            var funct_string = 'user_liked_comment(\"'+comments_received[x]._id+'\")';
                                            console.log(funct_string)
                                            para2.setAttribute('onclick',funct_string);
                                            var text = document.createTextNode("Like ("+comments_received[x].likes+")");
                                            para22.setAttribute("class", "far fa-heart");
                                            para22.className = "far fa-heart"
                                        }
                                    }
                                   
                                    para2.appendChild(para22)
                                    para2.appendChild(text);
                                    cmtListElement.appendChild(para2)

                                    
                                }// count += 1;
                            }
                        }else{
                            console.log("success")
                        }
                    }
                }
            }
        }
    }
}

function user_liked_comment(id) {
    console.log("pressed:")
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"comment_id":id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            console.log("like updated")
            // window.location = "http://localhost:3000/";
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"comment_id":id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/";
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
                    window.location = "http://localhost:3000/";
                }
            }
        }
    }
    // window.location = "http://localhost:3000/";
}

function user_liked_debate(id) {
    console.log("pressed:")
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes_debate",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"debate_id":id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            console.log("like updated")
            // window.location = "http://localhost:3000/";
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist_debate",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"debate_id":id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/";
                }
            }
        }
    }
    // window.location = "http://localhost:3000/";
}

function user_unliked_debate(id) {
    console.log("pressed:")
    var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
    req.open("POST","http://localhost:3000/updatelikes_debate_unlike",true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({"debate_id":id}));

    req.onreadystatechange = function() { //handle the response back from the server
        if (this.readyState == 4 && this.status == 200) {
            console.log("like updated")
            // window.location = "http://localhost:3000/";
            var req2 = new XMLHttpRequest(); 
            req2.open("POST","http://localhost:3000/updatelikeslist_debate_unlike",true);
            req2.setRequestHeader('Content-type', 'application/json');
            req2.send(JSON.stringify({"debate_id":id}));

            req2.onreadystatechange = function() { //handle the response back from the server
                if (this.readyState == 4 && this.status == 200) {
                    console.log("list updated")
                    window.location = "http://localhost:3000/";
                }
            }
        }
    }
    // window.location = "http://localhost:3000/";
}


function closePopupPro() {
    document.getElementById('comment_form_pro').style.display = 'none';
    // window.location = "http://localhost:3000/";
}

function closePopupCon() {
    document.getElementById('comment_form_con').style.display = 'none';
    // window.location = "http://localhost:3000/";
}

// const pro_button = document.getElementById('pro_button');
// const con_button = document.getElementById('con_button');

function openFormPro(){ //create listener to handle submit button

    var post = document.getElementById('comment_form_pro');
    post.style.display = 'block';

    
};

function openFormCon(){ //create listener to handle submit button

    var post = document.getElementById('comment_form_con');
    post.style.display = 'block';

    
};

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
            window.location = "http://localhost:3000/";
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
            window.location = "http://localhost:3000/";
        }
    }
    

    
};

// con_button.addEventListener("click", function(e) { //create listener to handle submit button


//     const post = document.getElementById('post_comment');
//     post.style.display = 'block';
//     var comment_input = document.createElement('input');
//     comment_input.setAttribute("type", "text");
//     comment_input.setAttribute("class", "comment_input");
//     comment_input.className = "comment_input";
//     comment_input.setAttribute("id", "new_comment");
//     comment_input.placeholder = "Add your comment here...";
//     post.appendChild(comment_input);
// });


// function closePopup() {
//     document.getElementById('message').style.display = 'none';
//     window.location = "http://localhost:3000/";
// }

// const comment_sub = document.getElementById('comment_submit');


// comment_sub.addEventListener("click", function(e) { //create listener to handle submit button
//     const comment = document.getElementById('comment').value; //get the fanme
//     const author = document.getElementById('author').value; //get the lname

//     var new_user = 0;
//     e.preventDefault();
//     // var req1_complete = 0;

//     var req2 = new XMLHttpRequest();
//     req2.responseType = 'json';
//     req2.open("GET","http://localhost:3000/?author="+author,true);
//     req2.setRequestHeader("Content-Type", "application/json");
//     req2.send(null);
// //check?name="+name
//     req2.onreadystatechange = function() { //handle the response back from the server
//         if (this.readyState == 4 && this.status == 200) {
//             console.log(this.response)
//             // message.innerHTML = 'block';
//             var req = new XMLHttpRequest(); //send request to server with fname & lname as parameters
//             req.open("POST","http://localhost:3000/",true);
//             req.setRequestHeader('Content-type', 'application/json');
//             req.send(JSON.stringify({"new_user":new_user,"author":author,"comment":comment}));
            
//             const message = document.getElementById('message');
//             message.style.display = 'block';
//             var text = document.createElement('span');
//             text.className = 'popup_text';
//             text.innerHTML = this.response.message;
//             message.appendChild(text);
//             console.log(author)
            
            
//         }
//     }

//     // console.log()
    
//   // ?author="+author+"&comment="+comment


    
// });


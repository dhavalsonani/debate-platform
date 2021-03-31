
/*window.addEventListener('load', function(){
    const request = new XMLHttpRequest();
    request.open('get', 'http://localhost:3000/debates', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    request.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200){

        }
    }
})*/


document.getElementById('create-debate').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('create-debate-window').classList.add('active');
    document.getElementById('overlay').classList.add('active');
})

document.getElementById('create-debate-close').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('create-debate-window').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
})


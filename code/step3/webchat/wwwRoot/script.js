(function() {

    var chat = document.getElementById('chat');

    var e = new EventSource('/eventsource');
    e.addEventListener('message', function(msg) {
        var div = document.createElement('div');
        var text = document.createTextNode(msg.data);
        div.appendChild(text);
        chat.appendChild(div);
    });

    var user = document.getElementById('user');
    var msg = document.getElementById('msg');
    var submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        var r = new XMLHttpRequest();
        r.open('POST', '/msg');
        r.send(user.value + ': ' + msg.value);
    });
}());
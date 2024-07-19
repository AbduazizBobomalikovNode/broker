window.onload = function () {
    let title = document.title + " ✅";
    let index = 0;

    setInterval(function () {
        index = (index + 1) % (title.length + 1);
        if (index == 0) index = 1;
        if (title.substring(index, title.length)[0] == ' ') index++;
        document.title = title.substring(index, title.length) + title.substring(0, index);
        //console.log(title.substring(index, title.length) + title.substring(0, index) + " " + index);
    }, 400);

    // const connectButton = document.getElementById('connectButton');

};
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }
function insertLineBreaks(text, maxLength) {
    let result = '';
    for (let i = 0; i < text.length; i += maxLength) {
        result += text.slice(i, i + maxLength) + '\n';
    }
    return result;
}
const publishButton = document.getElementById('publishButton');
const subscribeButton = document.getElementById('subscribeButton');
const messagesRoot = document.getElementById('messages');

const token = kre  || "adsafdsgsdgf45sdfsefs"; 
if (token) {
    const localhostMqtt = `mqtt://`+document.location.host.split(':')[0] + ":7000";
    client = mqtt.connect(wsUrl || localhostMqtt, {
        clientId: clientId,
        username: username,
        password: token
    });

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        document.getElementById("connect-info").style.color = "rgb(42, 184, 84)";
        // messagesDiv.innerHTML += '<p>Connected to MQTT broker</p>';
    });

    client.on('message', (topic, message) => {
        // alert(message.toString()+`  topic : ${topic}`);
        let jsonstring = "";
        if (`/index/${userID}/`+ document.getElementById('topic').value === topic) {
            try {
                jsonstring = JSON.stringify(JSON.parse(message.toString()), null, 2);
            } catch (error) {
                jsonstring = insertLineBreaks(message.toString(), 40);
            }

            let qator = document.createElement('tr');
            let sana = document.createElement('td');
            let malumot = document.createElement('td');

            sana.innerText = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
            malumot.innerHTML = `<pre>${jsonstring}</pre>`;

            qator.appendChild(sana);
            qator.appendChild(malumot);

            if (messagesRoot.firstChild) {
                messagesRoot.insertBefore(qator, messagesRoot.firstChild);
            } else {
                messagesRoot.appendChild(qator);
            }
        }
    });


    client.on('error', (error) => {
        document.getElementById("connect-info").style.color = "rgb(169, 37, 37)";
        console.log(`Connection error: ${error}`);
        // messagesDiv.innerHTML += `<p>Connection error: ${error}</p>`;
    });

    client.on('close', () => {
        document.getElementById("connect-info").style.color = "rgb(169, 37, 37)";
        console.log('Connection closed');
        // messagesDiv.innerHTML += '<p>Connection closed</p>';
    });
} else {
    console.log('Token not found in cookies');
    document.getElementById("connect-info").style.color = "rgb(169, 37, 37)";
    // messagesDiv.innerHTML += '<p>Token not found in cookies</p>';
}


publishButton.addEventListener('click', () => {
    if (client && client.connected) {
        const topic = document.getElementById('publishTopic').value;
        const message = document.getElementById('data').value;
        console.log("publishButton", topic, message + " yangi xabar");
        client.publish(topic, message);
        console.log(`Published message: ${message} to topic: ${topic}`);
        // messagesDiv.innerHTML += `<p>Published message: ${message} to topic: ${topic}</p>`;
    } else {
        console.log('Client is not connected');
        // messagesDiv.innerHTML += '<p>Client is not connected</p>';
    }
});

subscribeButton.addEventListener('click', () => {
    if (client && client.connected) {
        let topic = document.getElementById('topic').value;
        console.log("subscribeButton", topic);
       // alert(`/index/${userID}/`+topic);
        client.subscribe(`/index/${userID}/`+topic, (err) => {
            if (!err) {
                messagesRoot.innerHTML = "";
                console.log(`Subscribed to topic: ${topic}`);
                document.getElementById("subscriber-info").className = "text-success";
                document.getElementById("subscriber-info").innerText = `${topic} mavzusiga obuna bo'lingan!`;
                // messagesDiv.innerHTML += `<p>Subscribed to topic: ${topic}</p>`;
            } else {
                console.log(`Subscription error: ${err}`);
                document.getElementById("subscriber-info").className = "text-danger";
                document.getElementById("subscriber-info").innerText = `Hech qaysi mavzuga  Obuna  qilinmagan!`;
                // messagesDiv.innerHTML += `<p>Subscription error: ${err}</p>`;
            }
        });
    } else {
        document.getElementById("subscriber-info").className = "text-danger";
        document.getElementById("subscriber-info").innerText = `Hech qaysi mavzuga  Obuna  qilinmagan!`;
        console.log('Client is not connected');
        // messagesDiv.innerHTML += '<p>Client is not connected</p>';
    }
});
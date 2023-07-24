// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let user = JSON.parse(sessionStorage.getItem("User"));

function init() {
    msgArr = [];
    ref = firebase.database().ref("messages");
    // listen to incoming messages
    listenToNewMessages();
    // listen to removing messages
    listenToRemove();
    ph = document.getElementById("ph");
}
function renderMessage(msg) {
    console.log(msg.key);
    const htmlContent = `
                <div class="message-row ${user.id == msg.userId ? "revers-flex" : ""}" >
                    <div>
                        <img class="users-images" src="${get_image_from_server(msg.imgURL)}" alt="">
                        </div>
                        <div class="message-contatiner">
                        <p class="users-names">${msg.name} ${user.id == msg.userId ? `<i class="fa-solid fa-eraser delete-message" onclick="deleteMsgsBySubString('${msg.key}')"></i>` : ""}</p>
                        <p class="users-messages-contents">${msg.content}</p>
                        </div>
                </div>
            `;
    return htmlContent;
}

function listenToNewMessages() {
    // child_added will be evoked for every child that was added
    // on the first entry, it will bring all the childs
    ref.on("child_added", (snapshot) => {
        msg = {
            name: snapshot.val().name,
            content: snapshot.val().msg,
            imgURL: snapshot.val().imgURL,
            userId: snapshot.val().Id,
            key: snapshot.key,
        };
        msgArr.push(msg);
        printMessage(msg);
    });
}

function listenToRemove() {
    ref.on("child_removed", (snapshot) => {
        msgArr = msgArr.filter((m) => m.key != snapshot.key);
        // re-render the messages
        printMessages(msgArr);
    });
}

function deleteMsgsBySubString(key) {
    ref.child(key).remove();
}
// img url // name // text // imgURL
function printMessage(msg) {
    let str = renderMessage(msg);
    ph.innerHTML += str;
}

function printMessages(msgArr) {
    var str = "";
    for (let index = 0; index < msgArr.length; index++) {
        const msg = msgArr[index];
        str += renderMessage(msg);
    }
    ph.innerHTML = str;
}

function AddMSG() {
    let msg = document.getElementById("msgTB").value;
    if (msg == "" || msg.length == 0) {
        return
    }
    ref.push().set({
        msg: msg,
        name: user.first + " " + user.last,
        imgURL: user.imgUrl,
        Id: user.id,
    });
    document.getElementById("msgTB").value = ""
}
// this funtion is for speach to text
function SpeachToText() {
    let recognization = new webkitSpeechRecognition();
    let output = $('#msgTB')
    recognization.onstart = () => {
        output.val('')
    }

    recognization.onresult = (e) => {
        var transcript = e.results[0][0].transcript;
        output.val(transcript)
    }
    recognization.onend = () => {
        // Start a new recognition session with a 1-second delay
        setTimeout(() => {
            recognization.start();
        }, 1000);
    }
    recognization.start();
}
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
  console.log(msg);
  const htmlContent = `
                <div class="message-row ${
                  user.id == msg.userId ? "revers-flex" : ""
                }">
                    <div>
                        <img class="users-images" src="${get_image_from_server(
                          msg.imgURL
                        )}" alt="">
                    </div>
                    <div class="message-contatiner">
                        <p class="users-names">${msg.name}</p>
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
    };
    msgArr.push(msg);
    printMessage(msg);
  });
}

function listenToRemove() {
  ref.on("child_removed", (snapshot) => {
    msgArr = msgArr.filter((m) => m.content != snapshot.val().msg);
    // re-render the messages
    printMessages(msgArr);
  });
}
/*
                function getMSGfromDB() {
                    msgArr = [];
                    // once listens to an event and then deletes the listner
                    // it is usually used to initially bring data
                    ref.once("value", snapshot => {
                        snapshot.forEach(element => {
                            msg = {
                            name:element.val().name,
                            content:element.val().msg,
                        }
                         msgArr.push(msg)
                        });
                        printMessages(msgArr);
                    })
        
                }
        */
function deleteMsgsBySubString() {
  let subString = document.getElementById("delTB").value;
  if (subString == "") {
    alert("substing can not be empty");
    return;
  }
  ref.once("value", (snapshot) => {
    snapshot.forEach((element) => {
      // check if contains the substring
      if (element.val().msg.indexOf(subString) > -1) {
        ref.child(element.key).remove();
      }
    });
  });
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
  ref.push().set({
    msg: msg,
    name: user.first + " " + user.last,
    imgURL: user.imgUrl,
    Id: user.id,
  });
}

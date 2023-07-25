let speaking = false;
let utterance;
//Web Speech Api -> Synthesis component
function toggleSpeech() {
  const text = $(".textToSpeak").text();
  if (!speaking) {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    speaking = true;
    // <i class="fa-solid fa-ear-deaf"></i>
    //<i class="fa-solid fa-ear-listen"></i>
    $(".theClassThatsThereNow");

    $(".fa-ear-listen").addClass("fa-ear-deaf").removeClass("fa-ear-listen");
  } else {
    speechSynthesis.cancel();
    speaking = false;
    $(".fa-ear-deaf").addClass("fa-ear-listen").removeClass("fa-ear-deaf");
  }
}

// game timer
let time_counter = 59;
let timer_interval_id;
let questions_names = [
  "CreateQustion1WhoCreatedTheSong",
  "CreateQustion2WhatSongBelongToArtist",
  "CreateQustion3WhatPicBelongToArtist",
  "CreateQustion4WhatPicBelongToSong",
  "CreateQustion5WhatIsTheDurationForSong",
  "CreateQustion6whichSongBeginWith",
];
// the number of the current question
let questionNUmber = 0;
let answers_number_array = [1, 2, 3, 4];
let correct_answer;
let correct_answers_counter = 0;

$(document).ready(() => {
  $('.answers input[type="radio"]').on("change", function () {
    add_border_to_label(this);
  });
  $("#play").on("click", () => {
    goToPlay();
  });
  $("#exit-btn-game-container").on("click", function (event) {
    event.preventDefault();
    goToHome("#game-form");
    timerOff();
  });
  $("#go-back-home").on("click", function (event) {
    goToHome("#scores-table");
  });
  $("#get-score").on("click", function () {
    get_top_ten_scores(showScores);
  });
  $("#game-form").submit(function (event) {
    submitAnswer();
    event.preventDefault();
  });
});
function submitAnswer() {
  if (correct_answer == $('input[name="question-answer"]:checked').val()) {
    correct_answer = "none";
    correct_answers_counter++;
  }
  if (questionNUmber < 6) {
    get_question(questions_names[questionNUmber], renderQuesition);
  } else {
    timerOff();
  }
}
function finishGame() {
  questionNUmber = 0;
  let points = calcScore();
  const score_obj = {
    userId: JSON.parse(sessionStorage.getItem("User")).id,
    score: String(points),
  };
  Swal.fire({
    icon: "info",
    title: `Your score is: `,
    text: `${score_obj.score}`,
    showConfirmButton: false,
    timer: 1500,
  });
  // console.log(typeof score_obj.score, typeof score_obj.userId);
  set_Score(score_obj, forceBack);
}
function forceBack() {
  console.log("yesss");
  goToHome("#game-form");
  get_top_ten_scores(showScores);
}
function calcScore() {
  return correct_answers_counter * time_counter * 10;
}
function add_border_to_label(elm) {
  $(".answer").css("box-shadow", "none");
  $(elm).parent().css("box-shadow", "0 0 10px green ");
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function renderQuesition(data) {
  $(".q-number").text(++questionNUmber);
  $("#question-content").html(data.question);
  shuffle(answers_number_array);
  correct_answer = data.answer;
  $(`.answer-${answers_number_array[0]}`).val(data.answer);
  $(`.answer-${answers_number_array[1]}`).val(data.wrongAnswer1);
  $(`.answer-${answers_number_array[2]}`).val(data.wrongAnswer2);
  $(`.answer-${answers_number_array[3]}`).val(data.wrongAnswer3);
  if (data.answer.includes("https:")) {
    $(".answer i img").css("display", "block");
    $(`#answer-${answers_number_array[0]}`).text("");
    $(`#answer-${answers_number_array[1]}`).text("");
    $(`#answer-${answers_number_array[2]}`).text("");
    $(`#answer-${answers_number_array[3]}`).text("");
    $(`#answer-${answers_number_array[0]}-img`).attr("src", data.answer);
    $(`#answer-${answers_number_array[1]}-img`).attr("src", data.wrongAnswer1);
    $(`#answer-${answers_number_array[2]}-img`).attr("src", data.wrongAnswer2);
    $(`#answer-${answers_number_array[3]}-img`).attr("src", data.wrongAnswer3);
  } else {
    $(".answer i img").css("display", "none");
    $(`#answer-${answers_number_array[0]}`).text(data.answer);
    $(`#answer-${answers_number_array[1]}`).text(data.wrongAnswer1);
    $(`#answer-${answers_number_array[2]}`).text(data.wrongAnswer2);
    $(`#answer-${answers_number_array[3]}`).text(data.wrongAnswer3);
    $(`#answer-${answers_number_array[0]}-img`).attr("src", "");
    $(`#answer-${answers_number_array[1]}-img`).attr("src", "");
    $(`#answer-${answers_number_array[2]}-img`).attr("src", "");
    $(`#answer-${answers_number_array[3]}-img`).attr("src", "");
  }
}
function goToPlay() {
  get_question(questions_names[questionNUmber], renderQuesition);
  timerOn();
  $("#game-form").css("display", "block");
  $("#home-card-game").css("display", "none");
}
function goToHome(elm) {
  $(elm).css("display", "none");
  $("#home-card-game").css("display", "flex");
}
function create_score_row(data) {
  const scoreHTML = `<h4 class="ps-3 mb-0">${data.score}</h4>`;
  $(".scores-score-col").append(scoreHTML);
}
function showNames(data) {
  const nameHTML = `<h4 class="ps-3 mb-0">${data.name}</h4>`;
  $(".scores-names-col").append(nameHTML);
}

async function showScores(data) {
  $("#scores-table").css("display", "block");
  $(".scores-names-col").empty();
  $(".scores-score-col").empty();
  $(".scores-names-col").append(' <h4 class="score-col-header ps-3">Name</h4>');
  $(".scores-score-col").append('<h4 class="score-col-header ps-3">Score</h4>');
  // $("#home-card-game").css("display", "none");
  for (let item of data) {
    get_user_by_id_comments(item.userId, (user_info) => {
      create_score_row(item);
      showNames(user_info);
    });
  }
}

function timerOn() {
  timer_interval_id = setInterval(updateTimer, 1000);
}
function updateTimer() {
  $("#timer").text(time_counter);
  --time_counter;
  if (time_counter < 0 || questionNUmber > 6) timerOff();
}
function timerOff() {
  finishGame();
  time_counter = 59;
  $("#timer").text("60");
  clearInterval(timer_interval_id);
}

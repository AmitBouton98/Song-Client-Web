$(document).ready(() => {
  $('.answers input[type="radio"]').on("change", function () {
    add_border_to_label(this);
  });
});

function add_border_to_label(elm) {
  $(".answer").css("box-shadow", "none");
  $(elm).parent().css("box-shadow", "0 0 10px green ");
}

$(document).ready(function () {
  // tap to the next input
  $(".unique-digit").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next(".unique-digit").focus();
      $(this).next(".unique-digit").select();
      console.log($(this).next(".unique-digit"));
    }
    $(".unique-digit").on("click", function () {
      this.select();
    });
  });
});

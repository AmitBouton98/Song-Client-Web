$(document).ready(function () {
  console.log("ready");
  $("#commentForm").submit(function () {
    create_comment("#comments-area");
    return false;
  });
});

function create_comment(comment_area) {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  const comment_text = $("#comment").val();
  const comment_stars_number = $("#number-stars").val();
  const comment_format = `
        <div class="avatar avatar--lg align-items-start mt-4">
          <div class="avatar__image"><img src="${get_image_from_server(
            user_info.imgUrl
          )}" alt="user"></div>
          <div class="avatar__content"><span class="avatar__title mb-1">${
            user_info.first
          } ${user_info.last}
          <i class="fa-solid fa-pen-to-square green-color cursor-pointer ps-sm-3" onclick= ""></i>
          <i class="fa-solid fa-trash-can red-color cursor-pointer " onclick= ""></i>
          </span>

          <span class="avatar__subtitle mb-2">${getCurrentDate()}</span>
              <div class="text-warning d-flex mb-1">
                  ${create_stars(comment_stars_number)}
              </div>
              <p>${comment_text}</p>
          </div>
      </div>
      `;
  $(`${comment_area}`).append(comment_format);
}

function create_stars(stars_number) {
  return '<i class="ri-star-s-fill"></i>'.repeat(stars_number);
}

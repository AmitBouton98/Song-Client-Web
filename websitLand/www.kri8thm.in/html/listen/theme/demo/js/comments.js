$(document).ready(function () {
  console.log("ready");
  $("#commentForm").submit(function () {
    create_comment_song("#comments-area");
    return false;
  });
});
function create_comment_song(comment_area) {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  const song_info = JSON.parse(sessionStorage.getItem("SongDetails"));
  const comment_text = $("#comment").val();
  const comment_stars_number = $("#number-stars").val();
  const obj_song_comment = {
    UserId: user_info.id,
    Id: "-1",
    Text: comment_text,
    CreateDate: new Date(),
    SongId: song_info.id,
    Stars: comment_stars_number,
  };
  console.log(obj_song_comment);
  add_comment_to_song(obj_song_comment);
  create_comment(comment_area);
}
function create_comment(
  comment_area,
  user_img,
  user_name,
  date,
  number_stars,
  text,
  user_id,
  comment_id
) {
  //   console.log(comment_area, user_img, user_name, date, number_stars, text);
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  const comment_text = $("#comment").val();
  const comment_stars_number = $("#number-stars").val();
  const comment_format = `
        <div class="avatar avatar--lg align-items-start mt-4" >
          <div class="avatar__image"><img src="${get_image_from_server(
            user_img ?? user_info.imgUrl
          )}" alt="user"></div>
          <div class="avatar__content" data-comment-id="${comment_id}" data-comment-rating="${number_stars}"><span class="avatar__title mb-1">${
    user_name ?? user_info.first + " " + user_info.last
  }
          ${
            user_id == user_info.id
              ? '<i class="fa-solid fa-pen-to-square green-color cursor-pointer ps-sm-3" onclick= "edit_comment(this)"></i>'
              : ""
          }
          ${
            user_id == user_info.id
              ? '<i class="fa-solid fa-trash-can red-color cursor-pointer " onclick= "deleteComment(this)"></i>'
              : ""
          }
          </span>

          <span class="avatar__subtitle mb-2">${date ?? getCurrentDate()}</span>
              <div class="text-warning d-flex mb-1">
                  ${create_stars(number_stars ?? comment_stars_number)}
              </div>
              <p class="comment-text">${text ?? comment_text}</p>
          </div>
      </div>
      `;
  $(`${comment_area}`).prepend(comment_format);
}

function create_stars(stars_number) {
  return '<i class="ri-star-s-fill"></i>'.repeat(stars_number);
}

function edit_comment(clicked_elm) {
  // get the div that contains the comment and the header of the comment
  const parent_elm = $(clicked_elm).parent().parent();
  // get the comment text form this specific dad
  const prev_text = parent_elm.children(".comment-text").text();
  // remove the prev p
  parent_elm.children(".comment-text").remove();
  // add input form
  parent_elm.append(
    `
    <form action="#" class="temp-form" onsubmit="edit_comment_in_server(this)">
        <input type="text" class="new-comment" requeued value="${prev_text}">
        <input type="submit" value="change comment">
    </div>
    </form>
    `
  );
}
function edit_comment_in_server(elem) {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  const song_info = JSON.parse(sessionStorage.getItem("SongDetails"));
  const parent_elm = $(elem).parent();
  const comment_text = $(".new-comment").val();
  const obj_song_comment = {
    UserId: user_info.id,
    Id: $(parent_elm).attr("data-comment-id"),
    Text: comment_text,
    CreateDate: new Date(),
    SongId: song_info.id,
    Stars: $(parent_elm).attr("data-comment-rating"),
  };
  parent_elm.children(".temp-form").remove();
  parent_elm.append(
    `
    <p class="comment-text">${comment_text}</p>
    `
  );
  add_comment_to_song(obj_song_comment);
}

function deleteComment(clicked_elm) {
  const second_fromTheTop_parent_elm = $(clicked_elm).parent().parent();
  const third_fromTheTop_parent_elm = $(second_fromTheTop_parent_elm).parent();
  console.log($(second_fromTheTop_parent_elm).attr("data-comment-id"));
  delete_comment_from_server(
    $(second_fromTheTop_parent_elm).attr("data-comment-id")
  );
  $(third_fromTheTop_parent_elm).remove();
}

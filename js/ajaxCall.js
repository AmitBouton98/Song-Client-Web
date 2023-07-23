// const api = "https://localhost:7281/api";
const api = "https://proj.ruppin.ac.il/cgroup17/test2/tar1/api"

function ajaxCall(method, api, data, successCB, errorCB) {
  $.ajax({
    type: method, // Get/Post/Put/Delete/Patch
    url: api, // routing to the server
    data: data, // the data we pass in the body (if any…)
    cache: false, // allow caching
    contentType: "application/json; charset=utf-8", // the data format we expect back
    dataType: "json", // the data format that we send
    success: successCB, // the success callback function
    error: errorCB, // the error callback function
  });
}

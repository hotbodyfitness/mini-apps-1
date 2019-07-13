// $(document).ready(function() {});
var form = document.getElementById('postit');

// var readFile = (cb) => {
//   var reader = new FileReader();
//   var file = document.getElementById('thefile').files[0];
//   // console.log('FILE APP.js', file);
//   reader.addEventListener('loadend', () => {
//     cb(reader.result);
//   });
//   reader.readAsText(file);
// }

var successfulPost = (result) => { // callback for AJAX Post
  console.log('successfulPOST!', result);
  $.ajax({
    method: 'GET',
    url: result,
    success: (getResult) => {
      console.log('successfulGET!', getResult);
    }
  });
};

var sendToServer = (fileData) => {
  var obj = fileData;
  if (obj[obj.length - 1] === ';') { // remove ';' if exists
    obj = obj.slice(0, -1);
  }
  console.log(obj);
  $.ajax({
    method: 'POST',
    url: '/',
    data: obj,
    // dataType: 'json',
    success: (postResult) => {
      successfulPost(postResult);
    }
  });
  // var XML = new XMLHttpRequest();
  // // XML.responseType = 'json';
  // XML.open('POST', '/');
  // XML.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  // XML.send(obj);
};
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // readFile(sendToServer); // for file data
  sendToServer( $('textarea').val() ); // for <textarea>
});
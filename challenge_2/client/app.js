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
  var link = `<br><div id="link"><a href="localhost:8080${result.link}">Link to CSV<\/a><\/div>`;
  $('#link').html(link);

  var template = `<div>`;
  var array = result.data.split('\n');
  array.forEach(element => {
    element = element.replace(/,/g, '  |  ');
    element = element.replace(/"/g, '');
    template += `<p>${element}<\/p>`;
  });
  template += `<\/div>`;
  $('#template').html(template);
};

var sendToServer = (fileData) => {
  var obj = fileData;
  if (obj[obj.length - 1] === ';') { // remove ';' if exists
    obj = obj.slice(0, -1);
  }
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
// $(document).ready(function() {});

var readFile = (cb) => {
  var reader = new FileReader();
  var file = document.getElementById('thefile').files[0];
  reader.addEventListener('loadend', () => {
    cb(reader.result);
  });
  reader.readAsText(file);
};

var successfulPost = (result) => { // callback for AJAX Post
  var link = `<br><br><div id="link"><b><a href="localhost:8080${result.link}" target="_blank" rel="noopener" style="color:darkcyan">Click Here to Download CSV<\/a><\/b><\/div>`;
  $('#link').html(link);

  var template = `<div>`;
  var array = result.data.split('\n');
  array.forEach((element, index) => {
    var innerTemplate = '';
    if (index === 0) {
      innerTemplate += `<b><u>`;
    }
    innerTemplate += `<span style="display: grid; grid-template-columns: repeat(auto-fit, minmax(50px, 150px));">`;
    element = element.replace(/"/g, '');
    var arr = element.split(',');
      arr.forEach((word) => {
        innerTemplate += `<p>${word}<\/p>`;
      });
      innerTemplate += '<\/span>';
      if (index === 0) {
        innerTemplate += `<\/b><\/u>`;
      }
      template += innerTemplate;
  });
  template += `<\/div>`;
  $('#template').html(template);
  $('h5').css('color', 'rgb(76, 76, 76)');
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

var textForm = document.getElementById('postText'); // button
var fileForm = document.getElementById('postFile'); // button

textForm.addEventListener('click', (event) => {
  event.preventDefault();
  sendToServer( $('textarea').val() ); // for <textarea>
});
fileForm.addEventListener('click', (event) => {
  event.preventDefault();
  readFile(sendToServer); // for file data
});
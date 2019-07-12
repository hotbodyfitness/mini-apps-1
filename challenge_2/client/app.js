// $(document).ready(function() {
// });
var form = document.getElementById('postit');
  // var successFn = (data) => {
  //   console.log('success!', data);
  // }

  //   $.ajax({
  //   method: 'POST',
  //     url: '/',
  //     data: // theFile // formData
  //     // dataType: 'json',
  //     // success: (data) => {
  //     //   successFn(data);
  //     // }
  //   });
  // };

  var readFile = function(cb) {
    var reader = new FileReader();
    var file = document.getElementById('thefile').files[0];
    // console.log('FILE APP.js', file);
    reader.addEventListener('loadend', function() {
      cb(reader.result);
    });
    reader.readAsText(file);
  }

  var callback = (data) => {
    var obj = data;
    if (obj[obj.length - 1] === ';') { // remove ;
      obj = obj.slice(0, -1);
    }
    var XML = new XMLHttpRequest();
    // XML.responseType = 'json';
    XML.open('POST', '/', true);
    XML.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    XML.send(obj);
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    readFile(callback)});
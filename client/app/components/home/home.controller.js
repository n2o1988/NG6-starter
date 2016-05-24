class HomeController {
  constructor($http) {
    this.name = 'home';
    var fileReader = new FileReader();
    var file = new File([], "D:\\Immagini D\\Varie\\under_construction.jpg");
    console.log(file);
    var image = fileReader.readAsBinaryString(file);
    console.log("image: ", image);
    console.log("SCA");
  }

  gen_multipart(title, description, image, mimetype) {
    image = new Uint8Array(image); // Wrap in view to get data

    var before = ['Media ... ', 'Content-Type:', mimetype, "\n\n"].join('');
    var after = '\n--END_OF_PART--';
    var size = before.length + image.byteLength + after.length;
    var uint8array = new Uint8Array(size);
    var i = 0;

    // Append the string.
    for (; i<before.length; i++) {
      uint8array[i] = before.charCodeAt(i) & 0xff;
    }

    // Append the binary data.
    for (var j=0; j<image.byteLength; i++, j++) {
      uint8array[i] = image[j];
    }

    // Append the remaining string
    for (var j=0; j<after.length; i++, j++) {
      uint8array[i] = after.charCodeAt(j) & 0xff;
    }
  return uint8array.buffer; // <-- This is an ArrayBuffer object!
}

  upload(binaryString, filetype, albumid) {
    var method = 'POST';
    var url = 'http://picasaweb.google.com/data/feed/api/user/default/albumid/' + albumid;
    var request = gen_multipart('Title', 'Description', binaryString, filetype);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("GData-Version", '3.0');
    xhr.setRequestHeader("Content-Type",  'multipart/related; boundary="END_OF_PART"');
    xhr.setRequestHeader("MIME-version", "1.0");
    // Add OAuth Token
    xhr.setRequestHeader("Authorization", "Bearer ya29.CjHrAlyhlZZf_1GgAobVF0-fk0xQyXuupfUPVZP86yuu8EQseEVJmPVlYyl8q2J0l6cP");
    xhr.onreadystatechange = function(data) {
      if (xhr.readyState == 4) {
        // .. handle response
        console.log("response", data);
      }
    };
  xhr.send(request);
}
}

HomeController.$inject = ['$http'];
export default HomeController;

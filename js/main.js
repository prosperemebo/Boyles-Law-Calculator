// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  /*
  //   Local storage test
  localStorage.setItem("test", "hello world");
  console.log(localStorage.getItem("test", "hello world"));
  localStorage.removeItem("test");
  console.log(localStorage.getItem("test", "hello world"));
  */

  // Test if bookmark  is null
  if (localStorage.getItem('bookmarks') === null) {
    // init array
    var bookmarks = [];

    // Add to array
    bookmarks.push(bookmark);

    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //   Get item from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // fetch bookmark
  fetchBookmarks();

  //  Prevent form from submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  //   Get item from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //  Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmark
  fetchBookmarks();
}

// Fetch Bookmark
function fetchBookmarks() {
  //   Get item from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // console.log(bookmarks);

  //   Get output ID
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      '<h3>' +
      name +
      ' <a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a> ' +
      ' <a onclick = "deleteBookmark(\'' +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</div>';
  }
}

// Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi; // Correct URL exprssion
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please fill in a valid URL.');
    return false;
  }

  return true;
}

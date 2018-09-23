//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!siteName || !siteURL){
        alert("Enter data!");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert("Enter proper webpage url");
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteURL
    }

    
    /*local storage test
    localStorage.setItem('test' , 'Hello');
    p = localStorage.getItem('test');
    console.log(p);
    localstorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        //initialize array
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        // Save to Loacalstorage
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    } 
    //Add to already exsisting bookmark array
    else {
        //Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add to Array
        bookmarks.push(bookmark);
        // Save to Loacalstorage
        localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));
    }
    //Reset form
    document.getElementById('myForm').reset();

    //prevents form from submitting
    e.preventDefault();

    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output ID
    var bookmarkrsResults = document.getElementById('bookmark-result');
    bookmarkrsResults.innerHTML = '';
    for(var i=0; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkrsResults.innerHTML += '<div class = "well">' + 
                                        '<h3>' + name + 
                                        ' <a class="btn btn-success" target="_blank" href="'+url+'"> Visit </a>' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete </a>' 
                                        + '</h3>' +
                                        '</div>'; 
 
    }

}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(i=0 ; i<bookmarks.length ; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarks));

    fetchBookmarks();
}

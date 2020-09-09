document.getElementsByTagName("button")[0].onclick = function() {
    a = document.createElement("a");
    a.href = "https://www.google.com/maps/search/compost+sites+near+me/";
    a.click();
    //location.replace will destroy options for going back
};
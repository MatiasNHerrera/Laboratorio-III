function test() {
    var http = new XMLHttpRequest();
    http.open("GET", "Backend/test.params.php?nombre=" + document.getElementById("nombre").value, true);
    http.send();
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            console.log(http.responseText);
        }
    };
}
window.onload = function () {
    test();
};

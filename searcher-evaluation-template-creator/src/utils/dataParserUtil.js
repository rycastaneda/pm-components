export  function getObjectFromArrayWithValueForAttrib(arr, attrib, value) {
    for (var i in arr) {
        if (arr[i][attrib]===value) {
            return arr[attrib];
        }
    }
}

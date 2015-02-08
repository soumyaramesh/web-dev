var top = "stack1";
function move(curr) {
    oldstack = document.getElementById(top).style;
    newstack = document.getElementById(curr).style;
    oldstack.zIndex = '0';
    newstack.zIndex = '10';
    top = curr;
}
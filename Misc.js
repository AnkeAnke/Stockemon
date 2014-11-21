// Needed to be somewhere. This position seemed legit.
function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

function sign(number) {
    return number ? number < 0 ? -1 : 1 : 0;
}


var date = (new Date()).valueOf() + 2000;
var reflesh = async function () {
    await sleep(1000);
    console.log("reflesh");
    if (date < (new Date()).valueOf()) {
        window.location.href = window.location.href;
    }
    setTimeout(()=>{reflesh()},1000);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 

window.addEventListener('scroll', function (event) {
    date = (new Date()).valueOf() + 5000;
    console.log('Sahifada skroll qilindi!');
});
window.addEventListener('mousemove', function (event) {
    date = (new Date()).valueOf() + 5000;
    console.log('Sahifada mousemove qilindi!');
});
window.addEventListener('keydown', function (event) {
    date = (new Date()).valueOf() + 5000;
    console.log('Klaviaturada tugmachani bosdi: ' + event.key);
});
console.log("This is JavaScript code.");
reflesh()
function click_this(task){
    const el = document.getElementsByClassName("form-check-input");
    let srt = '';
    task.value= '';
    let  arr = [];
    for (let index = 0; index < el.length; index++) {
        const element = el[index];
        if (element.checked) {
            arr.push(element.value);
        }
    }
    task.value = arr.join(',');
}


let task = document.getElementById('roleHasTasks');
setTimeout(()=>{click_this(task)},10);
const el = document.getElementsByClassName("form-check-input");
for (let index = 0; index < el.length; index++) {
    el[index].addEventListener('click', function() {
        click_this(task);
    });
      
}
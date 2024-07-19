
function chekbox() {
    const el = document.getElementsByClassName("form-check-input");
    document.getElementById("all").checked = false;
    for (let index = 0; index < el.length; index++) {
        const element = el[index];
        if (element.checked) {
            document.getElementById("all").checked = true;
        }
    }
    let btn = document.getElementById("btn-delete");
    let class_name = btn.className;
    if (document.getElementById("all").checked) {
        btn.className = class_name.replaceAll("disabled", "");
    } else {
        btn.className = class_name.replaceAll("disabled", "");
        btn.className += " disabled";
    }
}

function chekboxAll() {
    const el = document.getElementsByClassName("form-check-input");
    let flag = document.getElementById("all").checked;
    let btn = document.getElementById("btn-delete");
    let class_name = btn.className;
    if (flag) {
        btn.className = class_name.replaceAll("disabled", "");
    } else {
        btn.className = class_name.replaceAll("disabled", "");
        btn.className += " disabled";
    }
    for (let index = 0; index < el.length; index++) {
        const element = el[index];
        element.checked = flag;
    }
}
let button = document.getElementById("delete") || {};
let filter = document.getElementById("filter") || {};
let filter1 = document.getElementById("filter1") || {};
let filter2 = document.getElementById("filter2") || {};
let filter3 = document.getElementById("filter3") || {};
let filter3_chek = document.getElementById("filter3_chek") || {};
let filter4 = document.getElementById("filter4");

console.log(filter1, filter2, filter3, filter4, filter3.value);

let filter1vs4 = () => {
    setTimeout(() => {
        let filter3_demo = filter3.value;
        if (filter3.value == "") filter3_demo == "Hammasi";
        //alert(filter3.value);
        if (filter1.value == "Hammasi"
            && filter2.value == "Hammasi"
            && filter4.value == "Hammasi"
            && filter3_chek.checked == false
            || filter3.value == "Hammasi") {
            window.location.href = '/certifcate'
        } else {
            if (!filter3_chek.checked) {
                filter3_demo = "Hammasi";
            }
            window.location.href = `/certifcate/page/1?doc=${filter1.value}&lang=${filter2.value}&date=${filter3_demo}&employee=${filter4.value}`;
        }
    }, 1000)
}
if (filter1 && filter2 && filter3 && filter4) {
    filter1.onchange = filter1vs4;
    filter2.onchange = filter1vs4;
    filter3_chek.onchange = () => { 
        if(filter3_chek.checked && filter3.value.length > 1) filter1vs4(); 
    };
    if (filter3_chek.checked) {
        filter3.onchange = filter1vs4;
    }
    filter4.onchange = filter1vs4;
}

if (filter) {
    filter.onchange = () => {
        setTimeout(() => {
            if (filter.value == "Hammasi") {
                window.location.href = '/user'
            } else {
                window.location.href = '/user/page/1$' + filter.value;
            }
        }, 1000)
    }
}
button.onmousedown = () => {
    const el = document.getElementsByClassName("form-check-input");
    let c = 0;
    button.href = button.title;
    for (let index = 0; index < el.length; index++) {
        const element = el[index];
        if (element.checked && element.id != "all") {
            c++;
            button.href = button.href + '+' + element.id;
        }
    }
    if (c == 0) {
        button.href = "#"
    }
}

let search = ()=>{
    let word =  document.getElementById("searchdata").value;
    // alert(word);
    window.location.href =  `/certifcate/page/1?search=${word}`;
};
try {
    document.getElementById("search").onclick = search;
} catch (error) {
    
}
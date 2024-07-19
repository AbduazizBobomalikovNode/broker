let tr1_count = 1;
let tr2_count = 1;
let array = document.getElementsByTagName("tr");
for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.style.display == "table-row") {
        tr_count++;
        console.log(tr_count);
    }
}

let button_add_tr = document.getElementById("table-dynamik+");
let button_delete_tr = document.getElementById("table-dynamik-");
let button1_add_tr = document.getElementById("table-dynamik1+");
let button1_delete_tr = document.getElementById("table-dynamik1-");

let list1_tr = document.getElementById('table2').children;
let list2_tr = null;
if (button1_add_tr && button1_delete_tr) {
    list2_tr = document.getElementById('table3').children;
}


button_delete_tr.onclick = () => {
    if (tr1_count > 1) {
        tr1_count--;
        list1_tr[tr1_count].style.display = "none";
    }
}
button_add_tr.onclick = () => {
    if (tr1_count < 8) {
        list1_tr[tr1_count].style.display = "table-row";
        tr1_count++;
    }
};

button1_add_tr.onclick = () => {
    if (tr2_count < 8) {
        list2_tr[tr2_count].style.display = "table-row";
        tr2_count++;
    }
};
button1_delete_tr.onclick = () => {
    if (tr2_count > 1) {
        tr2_count--;
        list2_tr[tr2_count].style.display = "none";
    }
}
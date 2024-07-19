
let select_doc = document.getElementById("doc_select");
let select_lang = document.getElementById("lang_select");
let forms_hide = document.getElementsByClassName("forms-sample")
let langs = document.getElementsByClassName("lang_in");
let select_doc_fun = () => {
    for (let index = 0; index < forms_hide.length; index++) {
        const element = forms_hide[index];
        // console.log(element.id, " == ", `f${select_doc.value}${select_lang.value}`, element.id == `f${select_doc.value}${select_lang.value}`)
        if (element.id == `f${select_doc.value}${select_lang.value}`) {
            element.style.display = "block";
            document.getElementById("doc_name").innerText = select_doc.selectedOptions[0].innerText;
            continue;
        }
        element.style.display = "none";
    }
}
select_lang.onchange = select_doc_fun;
select_doc.onchange = select_doc_fun;
setInterval(() => {
    select_doc_fun();
}, 100);



let subs_pubs = document.querySelectorAll("select.updatePub , select.updateSub")
let array_obj = {
    "updatePub": {},
    "updateSub": {}
}

setInterval(() => {
    subs_pubs.forEach(function (selectElement) {
        let id = selectElement.id;
        let selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
        if (selectElement.classList.contains("updatePub")) {
            if (!array_obj["updatePub"][id] || array_obj["updatePub"][id].length != selectedOptions.length) {
                let difference = arrayDifference(array_obj["updatePub"][id] , selectedOptions);
                array_obj["updatePub"][id] = selectedOptions;
                updatePub(difference,id)
            }
        } else {
            if (!array_obj["updateSub"][id] || array_obj["updateSub"][id].length != selectedOptions.length) {
                let difference = arrayDifference(array_obj["updateSub"][id] , selectedOptions);
                array_obj["updateSub"][id] = selectedOptions
                updateSub(difference,id)
            }
        }
    });
}, 1000);

var url = "/api/DHT/update";
function updatePub(update, id) {
    console.log("updatePub", update, id);
    if (update.del.length > 0) {
        var data = {
            iddevice: parseInt(id),
            idtopic: update.del,
            published: false,
        };
        sendPostRequestWithCookies(url, data);
    }
    if (update.add.length > 0) {
        var data = {
            iddevice: parseInt(id),
            idtopic: update.add,
            published: true,
        };
        sendPostRequestWithCookies(url, data);
    }
    
}

function updateSub(update,id) {
    console.log("updateSub", update,id);
    if (update.del.length > 0) {
        var data = {
            iddevice: parseInt(id),
            idtopic: update.del,
            subscribed: false,
        };
        sendPostRequestWithCookies(url, data);
    }
    if (update.add.length > 0) {
        var data = {
            iddevice: parseInt(id),
            idtopic: update.add,
            subscribed: true,
        };
        sendPostRequestWithCookies(url, data);
    }
}

console.log(subs_pubs);
subs_pubs.forEach(function (selectElement) {
    let id = selectElement.id;
    let selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    if (selectElement.classList.contains("updatePub")) {
        array_obj["updatePub"][id] = selectedOptions;
        console.log("updatePub initialized", array_obj["updatePub"][id]);
    } else {
        array_obj["updateSub"][id] = selectedOptions;
        console.log("updateSub initialized", array_obj["updateSub"][id]);
    } 
});


function arrayDifference(arr1, arr2) {
    const uniqueToArr1 = arr1.filter(element => !arr2.includes(element));
    const uniqueToArr2 = arr2.filter(element => !arr1.includes(element));
    return {del:uniqueToArr1,add:uniqueToArr2};
}



// async function sendPostRequestWithCookies(url, data) {
//     console.log(url, data);
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include', // Cookie larni qo'shib yuborish
//             body: JSON.stringify(data),
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             console.log(responseData);
//             return true;
//         } else {
//             console.error('Xato: ' + response.status);
//             return false;
//         }
//     } catch (error) {
//         console.error('Xatolik yuz berdi:', error);
//         return false;
//     }
// }


function sendPostRequestWithCookies(url, data) {
    console.log(url, data);
    var xhr = new XMLHttpRequest();

    // So'rovni ochish
    xhr.open("POST", url, true);

    // Cookie larni qo'shib yuborish uchun `withCredentials` xususiyatini true qilib qo'yamiz
    xhr.withCredentials = true;

    // Agar kerak bo'lsa so'rov sarlavhalari o'rnatiladi
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Callback funksiyani aniqlash
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // So'rov muvaffaqiyatli bajarildi
                console.log(xhr.responseText);
                return true;
            } else {
                // Xatolarni boshqarish
                console.error("Xato: " + xhr.status);
                return false;
            }
        }
    };

    xhr.send(JSON.stringify(data));
}





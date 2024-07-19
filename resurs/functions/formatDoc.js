const balance_doc = require("./doc_balanced");

var temp = {
    uz: {
        doc1: {
            id: "",
            date1: "",
            date1_1: "",
            date1_2: "",
            line1: "",//57
            line2: "",//65
            line3: "",//55
            line4: "",//64
            line5: "",//74
            line6: "",//34
            line7: "",//72
            line8: "",//54
            line9: "",//62
            line10: "",//74
            line11: "",//52
            date2: "",
            date2_1: "",
            date2_2: "",
            line12: "",//15
            line13: "",//15
        },
        doc2: {
            id: "",
            line1: "",
            line2: "",
            line3: "",
            line4: "",
            line5: "",
            line6: "",
            line7: "",
            line8: "",
            line9: "",
            line10: "",
            line11: "",
            line12: "",
            line13: "",
            line14: "",
            line15: "",
            line16_name: "",
            line16: "",
            line16_1: "",
            line16_2: "",
            line17_name: "",
            line17: "",
            line17_1: "",
            line17_2: "",
            line18_name: "",
            line18: "",
            line18_1: "",
            line18_2: "",
            line19_name: "",
            line19: "",
            line19_1: "",
            line19_2: "",
            line20_name: "",
            line20: "",
            line20_1: "",
            line20_2: "",
            line21_name: "",
            line21: "",
            line21_1: "",
            line21_2: "",
            line22_name: "",
            line22: "",
            line22_1: "",
            line22_2: "",
            line23_name: "",
            line23: "",
            line23_1: "",
            line23_2: "",
            jami: "",
            jami_1: "",
            jami_2: "",
            line24: "",
            line25: "",
            line26: "",
            line27: "",
            line28: "",
            line29: "",
        },
        doc3: {
            id: "",
            line1: "",//42
            line2: "",//75
            line3: "",//28
            line4: "",//74
            line5: "",//70
            line6: "",//76
            line7: "",//56
            line8: "",//20
            line9: "",//15
            date1: "",
            date1_1: "",
            date1_2: "",
            date2: "",
            date2_1: "",
            date2_2: "",
            son: "",
            date3: "",
            date3_1: "",
            date3_2: "",
        },
        doc4: {
            id: "",
            line1: "",//62
            line2: "",//65
            line3: "",//55
            line4: "",//55
            line5: "",//74
            line6: "",//35
            line7: "",//75
            line8: "",//55
            line9: "",//62
            line10: "",//76
            line11: "",//53
            line12: "",//15
            line13: "",//15
            date1: "",
            date1_2: "",
            date1_3: "",
        },
        doc5: {
            id: " ",
            date1: "",
            date1_1: "",
            date1_2: "",
            line1: "",//58
            line2: "",//76
            line3: "",//40
            date1: "",
            date1_1: "",
            date1_2: "",
            son: "",
            line4: "",//66
            line5: "",//74
            line6: "",//15
            line7: "",//15
        },
        doc6: {
            id: "",
            line1: "",
            line1_1: "",
            line1_2: "",
            line1_3: "",
            line1_4: "",
            line2: "",
            line2_1: "",
            line2_2: "",
            line2_3: "",
            line2_4: "",
            line3: "",//84
            line1: "",
            line1_1: "",
            line1_2: "",
            line1_3: "",
        },
        doc7: {}
    },
    ru: {
        doc1: {
            id: "",
            date1: "",
            date1_1: "",
            date1_2: "",
            line1: "",//57
            line2: "",//65
            line3: "",//55
            line4: "",//64
            line5: "",//74
            line6: "",//34
            line7: "",//72
            line8: "",//54
            line9: "",//62
            line10: "",//74
            line11: "",//52
            date2: "",
            date2_1: "",
            date2_2: "",
            line12: "",//15
            line13: "",//15
        },
        doc2: {
            id: "",
            line1: "",
            line2: "",
            line3: "",
            line4: "",
            line5: "",
            line6: "",
            line7: "",
            line8: "",
            line9: "",
            line10: "",
            line11: "",
            line12: "",
            line13: "",
            line14: "",
            line15: "",
            line16_name: "",
            line16: "",
            line16_1: "",
            line16_2: "",
            line17_name: "",
            line17: "",
            line17_1: "",
            line17_2: "",
            line18_name: "",
            line18: "",
            line18_1: "",
            line18_2: "",
            line19_name: "",
            line19: "",
            line19_1: "",
            line19_2: "",
            line20_name: "",
            line20: "",
            line20_1: "",
            line20_2: "",
            line21_name: "",
            line21: "",
            line21_1: "",
            line21_2: "",
            line22_name: "",
            line22: "",
            line22_1: "",
            line22_2: "",
            line23_name: "",
            line23: "",
            line23_1: "",
            line23_2: "",
            jami: "",
            jami_1: "",
            jami_2: "",
            line24: "",
            line25: "",
            line26: "",
            line27: "",
            line28: "",
            line29: "",
        },
        doc3: {
            id: "",
            line1: "",//42
            line2: "",//75
            line3: "",//28
            line4: "",//74
            line5: "",//70
            line6: "",//76
            line7: "",//56
            line8: "",//20
            line9: "",//15
            date1: "",
            date1_1: "",
            date1_2: "",
            date2: "",
            date2_1: "",
            date2_2: "",
            son: "",
            date3: "",
            date3_1: "",
            date3_2: "",
        },
        doc4: {
            id: "",
            line1: "",//62
            line2: "",//65
            line3: "",//55
            line4: "",//55
            line5: "",//74
            line6: "",//35
            line7: "",//75
            line8: "",//55
            line9: "",//62
            line10: "",//76
            line11: "",//53
            line12: "",//15
            line13: "",//15
            date1: "",
            date1_2: "",
            date1_3: "",
        },
        doc5: {
            id: " ",
            date1: "",
            date1_1: "",
            date1_2: "",
            line1: "",//58
            line2: "",//76
            line3: "",//40
            date1: "",
            date1_1: "",
            date1_2: "",
            son: "",
            line4: "",//66
            line5: "",//74
            line6: "",//15
            line7: "",//15
        },
        doc6: {
            id: "",
            line1: "",
            line1_1: "",
            line1_2: "",
            line1_3: "",
            line1_4: "",
            line2: "",
            line2_1: "",
            line2_2: "",
            line2_3: "",
            line2_4: "",
            line3: "",//84
            line1: "",
            line1_1: "",
            line1_2: "",
            line1_3: "",
        },
        doc7: {}
    }
}

function getMonth(month, lang) {
    let months = {
        ru: [
            "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ],
        uz: [
            "yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr",
        ]
    };
    // console.log(month, lang)
    return months[lang][month];
}

function replaser(str, num) {
    let char_num = num - str.length;
    if (char_num > 0) {
        char_num = char_num % 2 == 0 ? char_num : char_num - 1;
        let sult = '_'.repeat(char_num / 2);
        return [[str, sult], ''];
    }
    return [[str.slice(0, num), ''], str.slice(num, str.length)];
}
function formatDate(date, lang) {
    // console.log(date, lang);
    return [date.slice(2, 4), date.slice(8, 10), getMonth(Number(date.slice(5, 7)) - 1, lang)]
}


function formatDoc(data) {
    let template = temp[data.lang][`doc${data.doc}`];
    switch (parseInt(data.doc)) {
        case 1:
            let dates7 = [formatDate(data.date1, data.lang), formatDate(data.date2, data.lang)];
            // console.log("dates :",dates);
            template.date1 = dates7[0][0];
            template.date1_1 = dates7[0][1];
            template.date1_2 = dates7[0][2];
            template.date2 = dates7[1][0];
            template.date2_1 = dates7[1][1];
            template.date2_2 = dates7[1][2];

            if (data.lang == 'uz') {
                let line1demo = balance_doc(data.line1, 86);
                template.line1demo_start = line1demo[0];
                template.line1demo = line1demo[1];
                template.line1demo_end = line1demo[2];

                let line1 = balance_doc(line1demo[3], 67);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2demo = balance_doc(data.line2, 86);
                template.line2demo_start = line2demo[0];
                template.line2demo = line2demo[1];
                template.line2demo_end = line2demo[2];//demo

                let line2 = balance_doc(line2demo[3], 74);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];


                let line3 = balance_doc(data.line3, 75);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4demo = balance_doc(data.line4, 86);
                template.line4demo_start = line4demo[0];
                template.line4demo = line4demo[1];
                template.line4demo_end = line4demo[2];

                let line4 = balance_doc(line4demo[3], 85);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];


                let line5 = balance_doc(data.line5, 45);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 85);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(balance_doc(data.line6, 85)[3], 66);
                // console.log("line7 :",line7,balance_doc(data.line6, 85));
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8 = balance_doc(data.line8, 68);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(data.line9, 85);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];

                let line10 = balance_doc(balance_doc(data.line9, 85)[3], 64);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(data.line11, 35);
                template.line11 = line11[1];
            } else {

                let line1 = balance_doc(data.line1, 21);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(line1[3], 85);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 45);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(line3[3], 85);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 51);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line5demo = balance_doc(line5[3], 85);
                template.line5demo_start = line5demo[0];
                template.line5demo = line5demo[1];
                template.line5demo_end = line5demo[2];

                let line6 = balance_doc(data.line6, 85);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 68);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line7demo = balance_doc(line7[3], 85);
                template.line7demo_start = line7demo[0];
                template.line7demo = line7demo[1];
                template.line7demo_end = line7demo[2];

                let line8 = balance_doc(data.line8, 69);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(line8[3], 86);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];

                let line10 = balance_doc(data.line10, 67);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(line10[3], 85);
                template.line11_start = line11[0];
                template.line11 = line11[1];
                template.line11_end = line11[2];

                let line11demo = balance_doc(line11[3], 85);
                template.line11demo_start = line11demo[0];
                template.line11demo = line11demo[1];
                template.line11demo_end = line11demo[2];

                let line12 = balance_doc(data.line12, 58);
                template.line12_start = line12[0];
                template.line12 = line12[1];
                template.line12_end = line12[2];

                let line12demo = balance_doc(line12[3], 85);
                template.line12demo_start = line12demo[0];
                template.line12demo = line12demo[1];
                template.line12demo_end = line12demo[2];

                let line13 = balance_doc(data.line13, 86);
                template.line13_start = line13[0];
                template.line13 = line13[1];
                template.line13_end = line13[2];

                let line14 = balance_doc(data.line14, 35);
                template.line14 = line14[1];
            }
            // console.log(template);
            return template;
        case 2:
            let dates = [formatDate(data.date1, data.lang), formatDate(data.date2, data.lang)];
            template.date1 = dates[0][0];
            template.date1_1 = dates[0][1];
            template.date1_2 = dates[0][2];
            template.date2 = dates[1][0];
            template.date2_1 = dates[1][1];
            template.date2_2 = dates[1][2];

            if (data.lang == 'uz') {
                let line1demo = balance_doc(data.line1, 85);
                template.line1demo_start = line1demo[0];
                template.line1demo = line1demo[1];
                template.line1demo_end = line1demo[2];

                let line1 = balance_doc(line1demo[3], 67);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2demo = balance_doc(data.line2, 85);
                template.line2demo_start = line2demo[0];
                template.line2demo = line2demo[1];
                template.line2demo_end = line2demo[2];

                let line2 = balance_doc(line2demo[3], 74);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];


                let line3demo = balance_doc(data.line3, 85);
                template.line3demo_start = line3demo[0];
                template.line3demo = line3demo[1];
                template.line3demo_end = line3demo[2];

                let line3 = balance_doc(line3demo[3], 75);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(data.line4, 85);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5demo = balance_doc(data.line5, 85);
                template.line5demo_start = line5demo[0];
                template.line5demo = line5demo[1];
                template.line5demo_end = line5demo[2];

                let line5 = balance_doc(line5demo[3], 45);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 85);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(balance_doc(data.line6, 85)[3], 66);
                // console.log("line7 :",line7,balance_doc(data.line6, 85));
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8demo = balance_doc(data.line8, 85);
                template.line8demo_start = line8demo[0];
                template.line8demo = line8demo[1];
                template.line8demo_end = line8demo[2];

                let line8 = balance_doc(line8demo[3], 68);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(data.line9, 85);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];

                let line10 = balance_doc(balance_doc(data.line9, 85)[3], 64);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(data.line11, 35);
                template.line11 = line11[1];

                let line12 = balance_doc(data.line12, 35);
                template.line12 = line12[1];
            } else {
                let line1 = balance_doc(data.line1, 21);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(line1[3], 85);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line2demo = balance_doc(line2[3], 85);
                template.line2demo_start = line2demo[0];
                template.line2demo = line2demo[1];
                template.line2demo_end = line2demo[2];

                let line3 = balance_doc(data.line3, 45);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(line3[3], 85);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 51);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line5demo = balance_doc(line5[3], 85);
                template.line5demo_start = line5demo[0];
                template.line5demo = line5demo[1];
                template.line5demo_end = line5demo[2];

                let line6 = balance_doc(data.line6, 85);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 68);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line7demo = balance_doc(line7[3], 85);
                template.line7demo_start = line7demo[0];
                template.line7demo = line7demo[1];
                template.line7demo_end = line7demo[2];

                let line8 = balance_doc(data.line8, 69);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(line8[3], 85);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];

                let line10 = balance_doc(data.line10, 67);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(line10[3], 85);
                template.line11_start = line11[0];
                template.line11 = line11[1];
                template.line11_end = line11[2];

                let line11demo = balance_doc(line11[3], 85);
                template.line11demo_start = line11demo[0];
                template.line11demo = line11demo[1];
                template.line11demo_end = line11demo[2];

                let line12 = balance_doc(data.line12, 58);
                template.line12_start = line12[0];
                template.line12 = line12[1];
                template.line12_end = line12[2];

                let line12demo = balance_doc(line12[3], 85);
                template.line12demo_start = line12demo[0];
                template.line12demo = line12demo[1];
                template.line12demo_end = line12demo[2];

                let line13 = balance_doc(data.line13, 85);
                template.line13_start = line13[0];
                template.line13 = line13[1];
                template.line13_end = line13[2];

                let line14 = balance_doc(data.line14, 35);
                template.line14 = line14[1];

                let line15 = balance_doc(data.line15, 35);
                template.line15 = line15[1];
            }
            return template;
        case 3:
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    switch (key) {
                        case "line17_name":
                            if ((data['line17'].length > 0 ||
                                data['line17_1'].length > 0 ||
                                data['line17_2'].length > 0) && (data['line17']!= 'xxxxxxxx'|| data['line17_1']!= 'xxxxxxxx'|| data['line17_2']!= 'xxxxxxxx')) {
                                template.line17_name = data.line17_name
                            } else {
                                template.line17_name = 'xxxxxxxx';
                                data.line17 = 'xxxxxxxx';
                                data.line17_1 = 'xxxxxxxx';
                                data.line17_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line18_name":
                            if ((data['line18'].length > 0 ||
                                data['line18_1'].length > 0 ||
                                data['line18_2'].length > 0) && (data['line18']!= 'xxxxxxxx'|| data['line18_1']!= 'xxxxxxxx'|| data['line18_2']!= 'xxxxxxxx')) {
                                template.line18_name = data.line18_name
                            } else {
                                template.line18_name = 'xxxxxxxx';
                                data.line18 = 'xxxxxxxx';
                                data.line18_1 = 'xxxxxxxx';
                                data.line18_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line19_name":
                            if ((data['line19'].length > 0 ||
                                data['line19_1'].length > 0 ||
                                data['line19_2'].length > 0) && (data['line19']!= 'xxxxxxxx'|| data['line19_1']!= 'xxxxxxxx'|| data['line19_2']!= 'xxxxxxxx')) {
                                template.line19_name = data.line19_name
                            } else {
                                template.line19_name = 'xxxxxxxx';
                                data.line19 = 'xxxxxxxx';
                                data.line19_1 = 'xxxxxxxx';
                                data.line19_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line20_name":
                            if ((data['line20'].length > 0 ||
                                data['line20_1'].length > 0 ||
                                data['line20_2'].length > 0) && (data['line20']!= 'xxxxxxxx'|| data['line20_1']!= 'xxxxxxxx'|| data['line20_2']!= 'xxxxxxxx')) {
                                template.line20_name = data.line20_name
                            } else {
                                template.line20_name = 'xxxxxxxx';
                                data.line20 = 'xxxxxxxx';
                                data.line20_1 = 'xxxxxxxx';
                                data.line20_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line21_name":
                            if ((data['line21'].length > 0 ||
                                data['line21_1'].length > 0 ||
                                data['line21_2'].length > 0) && (data['line21']!= 'xxxxxxxx'|| data['line21_1']!= 'xxxxxxxx'|| data['line21_2']!= 'xxxxxxxx')) {
                                template.line21_name = data.line21_name
                            } else {
                                template.line21_name = 'xxxxxxxx';
                                data.line21 = 'xxxxxxxx';
                                data.line21_1 = 'xxxxxxxx';
                                data.line21_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line22_name":
                            if ((data['line22'].length > 0 ||
                                data['line22_1'].length > 0 ||
                                data['line22_2'].length > 0) && (data['line22']!= 'xxxxxxxx'|| data['line22_1']!= 'xxxxxxxx'|| data['line22_2']!= 'xxxxxxxx')) {
                                template.line22_name = data.line22_name
                            } else {
                                template.line22_name = 'xxxxxxxx';
                                data.line22 = 'xxxxxxxx';
                                data.line22_1 = 'xxxxxxxx';
                                data.line22_2 = 'xxxxxxxx';
                            }
                            break;
                        case "line23_name":
                            if ((data['line23'].length > 0 ||
                                data['line23_1'].length > 0 ||
                                data['line23_2'].length > 0) && (data['line23']!= 'xxxxxxxx'|| data['line23_1']!= 'xxxxxxxx'|| data['line23_2']!= 'xxxxxxxx')) {
                                    template.line23_name = data.line23_name
                            } else {
                                template.line23_name = 'xxxxxxxx';
                                data.line23 = 'xxxxxxxx';
                                data.line23_1 = 'xxxxxxxx';
                                data.line23_2 = 'xxxxxxxx';
                            }
                            break;
                        default:
                            template[key] = data[key];
                            break;
                    }
                }
            }
            if (data.lang == "uz") {
                template.line28 = template.line28.slice(0, 25);
                template.line29 = template.line29.slice(0, 25);
            } else {
                template.line28 = template.line28.slice(0, 25);
                template.line29 = template.line29.slice(0, 25);
            }
            return template;
        case 4:
            let dates2 = [formatDate(data.date1, data.lang), formatDate(data.date2, data.lang), formatDate(data.date3, data.lang)];
            template.date1 = dates2[0][0];
            template.date1_1 = dates2[0][1];
            template.date1_2 = dates2[0][2];

            template.date2 = dates2[1][0];
            template.date2_1 = dates2[1][1];
            template.date2_2 = dates2[1][2];

            template.date3 = dates2[2][0];
            template.date3_1 = dates2[2][1];
            template.date3_2 = dates2[2][2];

            template.son = data.son;

            if (data.lang == 'uz') {
                let line1 = balance_doc(data.line1, 51);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(data.line2, 86);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 40);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4demo = balance_doc(data.line4, 85);
                template.line4demo_start = line4demo[0];
                template.line4demo = line4demo[1];
                template.line4demo_end = line4demo[2];

                let line4 = balance_doc(line4demo[3], 83);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5demo = balance_doc(data.line5, 85);
                template.line5demo_start = line5demo[0];
                template.line5demo = line5demo[1];
                template.line5demo_end = line5demo[2];

                let line5 = balance_doc(line5demo[3], 77);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 86);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(balance_doc(data.line6, 85)[3], 66);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8 = balance_doc(data.line8, 32);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(data.line9, 35);
                template.line9 = line9[1];
            } else {
                let line1 = balance_doc(data.line1, 23);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(line1[3], 86);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 86);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(data.line4, 70);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 86);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 28);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(line6[3], 86);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8 = balance_doc(data.line8, 81);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(line8[3], 86);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];

                let line10 = balance_doc(data.line10, 82);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(line10[3], 86);
                template.line11_start = line11[0];
                template.line11 = line11[1];
                template.line11_end = line11[2];

                let line12 = balance_doc(line11[3], 86);
                template.line12_start = line12[0];
                template.line12 = line12[1];
                template.line12_end = line12[2];

                let line13 = balance_doc(data.line13, 29);
                template.line13_start = line13[0];
                template.line13 = line13[1];
                template.line13_end = line13[2];

                let line14 = balance_doc(data.line14, 35);
                template.line14_start = line14[0];
                template.line14 = line14[1];
                template.line14_end = line14[2];
            }
            return template;
        case 5:
            let dates3 = [formatDate(data.date1, data.lang)];
            template.date1 = dates3[0][0];
            template.date1_1 = dates3[0][1];
            template.date1_2 = dates3[0][2];

            if (data.lang == 'uz') {
                let line1demo = balance_doc(data.line1, 85);
                template.line1demo_start = line1demo[0];
                template.line1demo = line1demo[1];
                template.line1demo_end = line1demo[2];

                let line1 = balance_doc(line1demo[3], 68);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2demo = balance_doc(data.line2, 85);
                template.line2demo_start = line2demo[0];
                template.line2demo = line2demo[1];
                template.line2demo_end = line2demo[2];

                let line2 = balance_doc(line2demo[3], 75);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3demo = balance_doc(data.line3, 85);
                template.line3demo_start = line3demo[0];
                template.line3demo = line3demo[1];
                template.line3demo_end = line3demo[2];

                let line3 = balance_doc(line3demo[3], 76);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(data.line4, 85);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 46);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 86);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 67);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8 = balance_doc(data.line8, 70);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9demo = balance_doc(data.line9, 85);
                template.line9demo_start = line9demo[0];
                template.line9demo = line9demo[1];
                template.line9demo_end = line9demo[2];

                let line9 = balance_doc(line9demo[3], 85);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[0];

                let line10 = balance_doc(data.line10, 66);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line11 = balance_doc(data.line11, 35);
                template.line11_start = line11[0];
                template.line11 = line11[1];
                template.line11_end = line11[2];

                let line12 = balance_doc(data.line12, 35);
                template.line12_start = line12[0];
                template.line12 = line12[1];
                template.line12_end = line12[2];
            } else {
                let line1 = balance_doc(data.line1, 21);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(line1[3], 86);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 45);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(line3[3], 86);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 51);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 86);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 68);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line8 = balance_doc(data.line8, 68);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line8demo = balance_doc(line8[3], 85);
                template.line8demo_start = line8demo[0];
                template.line8demo = line8demo[1];
                template.line8demo_end = line8demo[2];

                let line9 = balance_doc(data.line9, 67);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[0];

                let line9demo = balance_doc(line9[3], 85);
                template.line9demo_start = line9demo[0];
                template.line9demo = line9demo[1];
                template.line9demo_end = line9demo[2];

                let line10 = balance_doc(data.line10, 55);
                template.line10_start = line10[0];
                template.line10 = line10[1];
                template.line10_end = line10[2];

                let line10demo = balance_doc(line10[3], 85);
                template.line10demo_start = line10demo[0];
                template.line10demo = line10demo[1];
                template.line10demo_end = line10demo[2];

                let line11 = balance_doc(data.line11, 86);
                template.line11_start = line11[0];
                template.line11 = line11[1];
                template.line11_end = line11[2];

                let line12 = balance_doc(data.line12, 35);
                template.line12_start = line12[0];
                template.line12 = line12[1];
                template.line12_end = line12[2];

                let line13 = balance_doc(data.line13, 35);
                template.line13_start = line13[0];
                template.line13 = line13[1];
                template.line13_end = line13[2];
            }
            return template;
        case 6:
            let dates4 = [formatDate(data.date1, data.lang), formatDate(data.date2, data.lang)];
            template.date1 = dates4[0][0];
            template.date1_1 = dates4[0][1];
            template.date1_2 = dates4[0][2];

            template.date2 = dates4[1][0];
            template.date2_1 = dates4[1][1];
            template.date2_2 = dates4[1][2];

            template.son = data.son;
            if (data.lang == 'uz') {
                let line1 = balance_doc(data.line1, 67);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(data.line2, 86);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 52);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4demo = balance_doc(data.line4, 85);
                template.line4demo_start = line4demo[0];
                template.line4demo = line4demo[1];
                template.line4demo_end = line4demo[2];

                let line4 = balance_doc(line4demo[3], 78);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5demo = balance_doc(data.line5, 85);
                template.line5demo_start = line5demo[0];
                template.line5demo = line5demo[1];
                template.line5demo_end = line5demo[2];

                let line5 = balance_doc(line5demo[3], 85);//--
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(data.line6, 35);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 35);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];
            } else {
                let line1 = balance_doc(data.line1, 24);
                template.line1_start = line1[0];
                template.line1 = line1[1];
                template.line1_end = line1[2];

                let line2 = balance_doc(line1[3], 86);
                template.line2_start = line2[0];
                template.line2 = line2[1];
                template.line2_end = line2[2];

                let line3 = balance_doc(data.line3, 86);
                template.line3_start = line3[0];
                template.line3 = line3[1];
                template.line3_end = line3[2];

                let line4 = balance_doc(data.line4, 69);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                let line5 = balance_doc(data.line5, 26);
                template.line5_start = line5[0];
                template.line5 = line5[1];
                template.line5_end = line5[2];

                let line6 = balance_doc(line5[3], 86);
                template.line6_start = line6[0];
                template.line6 = line6[1];
                template.line6_end = line6[2];

                let line7 = balance_doc(data.line7, 83);
                template.line7_start = line7[0];
                template.line7 = line7[1];
                template.line7_end = line7[2];

                let line7demo = balance_doc(line7[3], 85);
                template.line7demo_start = line7demo[0];
                template.line7demo = line7demo[1];
                template.line7demo_end = line7demo[2];

                let line8 = balance_doc(data.line8, 35);
                template.line8_start = line8[0];
                template.line8 = line8[1];
                template.line8_end = line8[2];

                let line9 = balance_doc(data.line9, 35);
                template.line9_start = line9[0];
                template.line9 = line9[1];
                template.line9_end = line9[2];
            }
            return template;
        case 7:
            template.name = data.name;
            if (data.lang == 'uz' || data.lang == 'ru') {
                template.line1 = data.line1;
                template.line2 = data.line2;
                template.line2_1 = data.line2_1;
                template.line2_2 = data.line2_2;
                template.line2_3 = data.line2_3;
                template.line2_4 = data.line2_4;
                template.line3 = data.line3;
                template.line3_1 = data.line3_1;
                template.line3_2 = data.line3_2;
                template.line3_3 = data.line3_3;
                template.line3_4 = data.line3_4;

                let line4 = balance_doc(data.line4, 84);
                template.line4_start = line4[0];
                template.line4 = line4[1];
                template.line4_end = line4[2];

                template.line5 = data.line5;
                template.line5_1 = data.line5_1;
                template.line5_2 = data.line5_2;
                template.line5_3 = data.line5_3;
            }
            return template;
        default: console.log("topilmadi....");
            break;
    }
}
module.exports = formatDoc;
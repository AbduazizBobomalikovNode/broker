function fiil(data) {
    if (data.lang == 'uz') {
        switch (parseInt(data.doc)) {
            case 1: {
                return {
                    comply_with: data.date1,
                    compare: data.date2,
                    organization: data.line3
                }

            } break;
            case 2: {
                return {
                    comply_with: data.date1,
                    compare: data.date2,
                    organization: data.line3
                }
            } break;
            case 3: {
                return {
                    comply_with: data.line25,
                    compare: data.line26,
                    organization: data.line1
                }
            } break;
            case 4: {
                return {
                    comply_with: data.date1,
                    compare: data.date3,
                    organization: data.line1
                }
            } break;
            case 5: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.date1,
                    organization: data.line3
                }
            } break;
            case 6: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.date1,
                    organization: data.line1
                }
            } break;
            case 7: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.line5,
                    organization: data.line1
                }
            } break;
        }

    } else {
        switch (parseInt(data.doc)) {
            case 1: {
                return {
                    comply_with: data.date1,
                    compare: data.date2,
                    organization: data.line7
                }
            } break;
            case 2: {
                return {
                    comply_with: data.date1,
                    compare: data.date2,
                    organization: data.line7
                }
            } break;
            case 3: {
                return {
                    comply_with: data.line25,
                    compare: data.line26,
                    organization: data.line1
                }
            } break;
            case 4: {
                return {
                    comply_with: data.date1,
                    compare: data.date3,
                    organization: data.line4
                }
            } break;
            case 5: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.date1,
                    organization: data.line7
                }
            } break;
            case 6: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.date1,
                    organization: data.line4
                }
            } break;
            case 7: {
                return {
                    comply_with: "mavjut emas",
                    compare: data.line5,
                    organization: data.line1
                }
            } break;
        }
    }

}
module.exports = fiil;
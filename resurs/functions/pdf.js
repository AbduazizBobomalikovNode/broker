const PizZip = require("pizzip");
var ImageModule = require('docxtemplater-image-module-free');
const Docxtemplater = require("docxtemplater");
var QRCode = require('qrcode');
var fs = require('fs');
const path = require("path");
const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function createPDF(doc, pdf) {
    try {
        const { stdout, stderr } = await exec(`docx2pdf "${path.resolve(__dirname, "../../views/certifcate/" + doc)}"  "${path.resolve(__dirname, "../../views/certifcate/" + pdf)}"`);
        console.log('ishladi :', stdout);
        return true;
    } catch (error) {
        console.log("xatolik :", error);
        return false;
    }
}

async function getContent(doc, lang) {
    if (lang == "uz") {
        if (doc == 1) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo1uz_lotin.docx"),
                "binary");
        }
        if (doc == 2) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo2uz_lotin.docx"),
                "binary");
        }
        if (doc == 3) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo3uz_lotin.docx"),
                "binary");
        }
        if (doc == 4) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo4uz_lotin.docx"),
                "binary");
        }
        if (doc == 5) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo5uz_lotin.docx"),
                "binary");
        }
        if (doc == 6) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo6uz_lotin.docx"),
                "binary");
        }
        if (doc == 7) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo7uz_lotin.docx"),
                "binary");
        }
    }
    if (lang == "ru") {
        if (doc == 1) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo1ru_end.docx"),
                "binary");
        }
        if (doc == 2) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo2ru_end.docx"),
                "binary");
        }
        if (doc == 3) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo3ru_end.docx"),
                "binary");
        }
        if (doc == 4) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo4ru_end.docx"),
                "binary");
        }
        if (doc == 5) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo5ru_end.docx"),
                "binary");
        }
        if (doc == 6) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo6ru_end.docx"),
                "binary");
        }
        if (doc == 7) {
            return fs.readFileSync(
                path.resolve(__dirname, "../template/demo7ru_end.docx"),
                "binary");
        }
    }

}

async function toPdf(data, name_doc, url_doc, doc, lang, imageFlag=false) {
    // console.log(data, name_doc, url_doc, doc, lang)
    const content = await getContent(doc, lang);
    const zip = new PizZip(content);
    var opts = {}
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; //Or pptx
    opts.getImage = function (tagValue, tagName) {
        // console.log("opts.getImage : ",tagValue);
        return fs.readFileSync(__dirname + '\\' + tagValue);
    }
    opts.getSize = function (img, tagValue, tagName) {
        if (doc == 2) return [130, 130];
        // if (doc == 6) return [140, 140];
        return [140, 140];
    }
    var imageModule = new ImageModule(opts);
    var name = 'natija.jpg';
    if (imageFlag) {
        data.image = name;
    }
    let name_docx = name_doc + "_" + (new Date()).valueOf() + ".docx";
    let name_pdf = name_doc + "_" + (new Date()).valueOf() + ".pdf";
    var segs = "https://re-metrologiya.uz/documents/" + name_pdf || (new Date()).toUTCString();
    const file = __dirname + '\\' + name;
    // console.log(file);
    const file_docx = __dirname + '\\' + name_docx;
    await QRCode.toFile(file, segs, async function (err) {
        if (err) throw err;
        try {
            var doc = new Docxtemplater()
                .attachModule(imageModule)
                .loadZip(zip)
                .setData(data)
                .render();

            var buffer = doc
                .getZip()
                .generate({ type: "nodebuffer" });

            fs.writeFileSync("./views/certifcate/" + name_docx, buffer);
            fs.unlinkSync(file);
            if (await createPDF(name_docx, name_pdf)) {
                try {
                    fs.unlinkSync("./views/certifcate/" + name_docx);
                } catch (error) {
                    return false;
                }
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    });
    return { url: path.resolve(__dirname, "../../views/certifcate/" + name_pdf), link: "/documents/" + name_pdf };
}

// toPdf(demo,'awdawd','Abduaziz');
module.exports = toPdf;



// let obj_doc = {
//     image: __dirname + '\\' + name,
//     id: data.id,
//     service_name: "_".repeat((62 - data.service_name.length) / 2) + data.service_name.slice(0, 62) + "_".repeat((62 - data.service_name.length) / 2),
//     validity_period_year: data.validity_period_year,
//     validity_period_day: data.validity_period_day,
//     validity_period_month: data.validity_period_month,
//     model_tools: "_".repeat((63 - data.model_tools.length) / 2) + data.model_tools.slice(0, 63) + "_".repeat((63 - data.model_tools.length) / 2),
//     document_title: "_".repeat((70 - data.document_title.length) / 2) + data.document_title.slice(0, 70) + "_".repeat((70 - data.document_title.length) / 2),
//     metrology_service_name: "_".repeat((58 - data.metrology_service_name.length) / 2) + data.metrology_service_name.slice(0, 58) + "_".repeat((58 - data.metrology_service_name.length) / 2),
//     instruments_owner: "_".repeat((70 - data.instruments_owner.length) / 2) + data.instruments_owner.slice(0, 70) + "_".repeat((70 - data.instruments_owner.length) / 2),
//     measuring_instruments: "_".repeat((83 - data.measuring_instruments.length) / 2) + data.measuring_instruments.slice(0, 83) + "_".repeat((83 - data.measuring_instruments.length) / 2),
//     importing_country: "_".repeat((37 - data.importing_country.length) / 2) + data.importing_country.slice(0, 37) + "_".repeat((37 - data.importing_country.length % 38) / 2),
//     parameters_measuring_instruments: "_".repeat((80 - data.parameters_measuring_instruments.length) / 2) + data.parameters_measuring_instruments.slice(0, 80) + "_".repeat((80 - data.parameters_measuring_instruments.length) / 2),
//     parameters_measuring_instruments2: "_".repeat((61 - data.parameters_measuring_instruments.slice(80).length) / 2) + data.parameters_measuring_instruments.slice(80) + "_".repeat((61 - data.parameters_measuring_instruments.slice(80).length) / 2),
//     importing_naming_marking: "_".repeat((62 - data.importing_naming_marking.length) / 2) + data.importing_naming_marking.slice(0, 62) + "_".repeat((62 - data.importing_naming_marking.length) / 2),
//     compliance_with_requirements: "_".repeat((78 - data.compliance_with_requirements.length) / 2) + data.compliance_with_requirements.slice(0, 78) + "_".repeat((78 - data.compliance_with_requirements.length) / 2),
//     compliance_with_requirements2: "_".repeat((60 - data.compliance_with_requirements.slice(78).length) / 2) + data.compliance_with_requirements.slice(78) + "_".repeat((60 - data.compliance_with_requirements.slice(78).length) / 2),
//     Comparison_date_year: data.Comparison_date_year,
//     Comparison_date_day: data.Comparison_date_day,
//     Comparison_date_month: data.Comparison_date_month,
//     leader: data.leader,
//     Scornful: data.Scornful
// }
var demo = {
    id: `${(new Date()).valueOf()}`.slice(0, 5),
    service_name: "юкори аникликдаги ўлчаш воситасини киёслаш ГУВОҲНОМАСИ*",
    validity_period_year: 20,
    validity_period_day: 25,
    validity_period_month: "aprel",
    model_tools: "wadwdawdawdawdawd",
    document_title: "dawdawdawdawd",
    metrology_service_name: "sefefesfesfesf",
    instruments_owner: "DWadwdwad",
    measuring_instruments: "dwadawdawd",
    importing_country: "wadwdawdwa",
    parameters_measuring_instruments: "wadwdawdCVawdawdawdaw",
    parameters_measuring_instruments2: "",
    importing_naming_marking: "wadwdawdawdawdawdawdawd",
    compliance_with_requirements: "wadawdawdawdawd",
    compliance_with_requirements2: "",
    Comparison_date_year: 23,
    Comparison_date_day: 23,
    Comparison_date_month: "yanvar",
    leader: "awdawdawddawd",
    Scornful: "awdawdawdawda"
}
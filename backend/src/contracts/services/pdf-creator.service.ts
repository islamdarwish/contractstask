import {CreateContractDto} from "../dtos/create-contract.dto";
import {ContractPage} from "../domain/contract-page";

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

export class PdfCreatorService {
    private pdfDoc;
    private templateFile;

    async loadPdfTemplate (file) {
        this.templateFile = file;
        this.pdfDoc = await PDFDocument.create();

        const template = await PDFDocument.load(fs.readFileSync(this.templateFile.path));

        let pageIndex = 0;
        const pagesCount = template.getPageCount();

        while (pageIndex < pagesCount) {
            const [templatePage] = await this.pdfDoc.copyPages(template, [pageIndex]);
            this.pdfDoc.addPage(templatePage, [pageIndex]);
            pageIndex ++;
        }
    }

    async appendContract (contractDto: CreateContractDto) {
        // Add a blank page to the document
        const page = this.pdfDoc.addPage();

        const contractPage = new ContractPage(page);

        contractPage.addTitle('Contract Details', 20);
        contractPage.addVerticalSpace(30);
        contractPage.addLabelValuePair('Client Name', contractDto.name, 10);
        contractPage.addLabelValuePair('Phone Number', contractDto.phone, 10);
        contractPage.addLabelValuePair('Email Address', contractDto.email, 10);
        contractPage.addLabelValuePair('Rent Amount', String(contractDto.rentAmount) , 10);

        const pdfBytes = await this.pdfDoc.save();

        await fs.writeFile('./contracts/' + this.templateFile.filename, pdfBytes, 'utf8', function () {});
    }
}
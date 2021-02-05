import PDFPage from "pdf-lib/cjs/api/PDFPage";
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

export class ContractPage {
    private page;
    private pageHeight;
    private startY;
    private fontSize;
    private fontType;
    private labelColor;
    private labelPosition;
    private valueColor;
    private valuePosition;

    constructor(page: PDFPage) {
        this.page = page;
        const { height } = this.page.getSize();
        this.pageHeight = height;
        this.fontSize = 20;
        this.startY = height - 4 * this.fontSize;
        this.labelPosition = 50;
        this.valuePosition = 130;
        this.labelColor = rgb(0, 0, 0);
        this.valueColor = rgb(0, 0.53, 0.71);
    }

    addTitle(title: string, size: number) {
        this.startY = this.pageHeight - 4 * size;
        this.page.drawText(title, {
            x: 50,
            y: this.startY,
            size,
            font: this.fontType,
            color: this.labelColor
        });
    }

    addLabelValuePair(label: string, value: string, size: number) {
        this.startY -= 20;
        this.page.drawText(label, {
            size,
            x: this.labelPosition,
            y: this.startY,
            font: this.fontType,
            color: this.labelColor,
        });

        this.page.drawText(value, {
            size: 10,
            x: this.valuePosition,
            y: this.startY,
            font: this.fontType,
            color: this.valueColor,
        });
    }

    addVerticalSpace(space: number) {
        this.startY -= space;
    }

    getPage() {
        return this.page;
    }

}
import { Injectable } from '@nestjs/common';
import {CreateContractDto} from "./dtos/create-contract.dto";
import {PdfCreatorService} from "./services/pdf-creator.service";
import {createReadStream} from "fs";

@Injectable()
export class ContractsService {

    constructor (private pdfCreatorService: PdfCreatorService) {}

    async view (fileName: string) {
        return await createReadStream('./contracts/'+ fileName);
    }

    create (createDto: CreateContractDto, file) {
        this.mergeContractToTemplate(createDto, file).catch(err => console.log(err));
    }

    async mergeContractToTemplate (contractDto: CreateContractDto, file) {
        await this.pdfCreatorService.loadPdfTemplate(file);
        await this.pdfCreatorService.appendContract(contractDto);
    }
}

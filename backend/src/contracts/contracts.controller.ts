import {
    Body,
    Controller,
    Get, HttpCode, HttpStatus,
    Param,
    Post, Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {ContractsService} from "./contracts.service";
import {CreateContractDto} from "./dtos/create-contract.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {Response} from "express";

@Controller('contracts')
export class ContractsController {

    constructor (private contractsService: ContractsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('templateFile'))
    create(@Body() createDto: CreateContractDto, @UploadedFile() file) {
       this.contractsService.create(createDto, file);
       return {
           status: 'success',
           fileName: file.filename
       };
    }

    @Get(':fileName')
    @HttpCode(HttpStatus.OK)
    async view(@Res() res: Response, @Param('fileName') fileName: string) {
        const file = await this.contractsService.view(fileName);
        return await file.pipe(res);
    }

}

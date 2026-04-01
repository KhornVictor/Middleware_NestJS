import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";


@Injectable()
export class FreezePipe implements PipeTransform {

    private logger = new Logger(FreezePipe.name);

    transform(value: any, metadata: ArgumentMetadata) {
        this.logger.log(`Freezing object... [path: freeze.pipe.ts] Metadata: ${JSON.stringify(metadata)}`);
        Object.freeze(value);
        return value;
    }
}
import { Module, HttpModule } from "@nestjs/common";
import { CoverService } from "./cover.service";

@Module({
    imports: [HttpModule],
    providers: [CoverService],
    exports: [CoverService],

})
export class CoverModule{}

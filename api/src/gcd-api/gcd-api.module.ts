import { Module, HttpModule } from "@nestjs/common";
import { GcdApiService } from "./gcd-api.service";

@Module({
    imports: [HttpModule],
    providers: [GcdApiService],
    exports: [GcdApiService],
})
export class GcdApiModule {}
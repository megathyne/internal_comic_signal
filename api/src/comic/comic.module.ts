import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { InventoryModule } from "../inventory/inventory.module";
import { ComicService } from "./comic.service";
import { GcdApiModule } from "../gcd-api/gcd-api.module"
import { ComicController } from "./comic.controller";

@Module({
    imports: [
        AuthModule,
        GcdApiModule,
        InventoryModule,
    ],
    controllers: [ComicController],
    providers: [ComicService],
    exports: [ComicService],
})
export class ComicModule {}
import { EntityRepository, Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Approval } from "./approval.entity";
import { CreateApprovalDto } from "./dto/create-approval.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Approval)
export class ApprovalRepository extends Repository<Approval> {
    private logger = new Logger('ApprovalRepository');

    async createApproval(createApprovalDto: CreateApprovalDto, user: User): Promise<Approval> {
        const {inventoryId, ebayItemId, isApproved} = createApprovalDto;

        const approval = this.create();
        approval.userId.id= user.id;
        approval.inventoryId.id = inventoryId;
        approval.ebayItemId = ebayItemId;
        approval.isApproved = isApproved;

        try{
            const item = await approval.save();
            return item;
        } catch (error) {
            if (error.code === '23505'){
                this.logger.error(`Failed to create, already exists!`, error.stack)

            }
        }
    }
}
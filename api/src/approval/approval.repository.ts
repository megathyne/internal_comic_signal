import { EntityRepository, Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { Approval } from "./approval.entity";

@EntityRepository(Approval)
export class ApprovalRepository extends Repository<Approval> {
    private logger = new Logger('ApprovalRepository');

    async createApproval(create)
}
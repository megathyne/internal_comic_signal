import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from 'src/inventory/inventory.repository';
import { authData } from '../auth/auth-data';
import { UserRepository } from 'src/auth/user.repository';
import { issueData } from '../issue/issue-data';
import { IssueRepository } from 'src/issue/issue.repository';
import { conditionData } from '../condition/condition-data';
import { ConditionRepository } from 'src/condition/condition.repository';
import { graderData } from '../grader/grader-data';
import { GraderRepository } from 'src/grader/grader.repository';
import { pageData } from '../page/page-data';
import { PageRepository } from 'src/page/page.repository';
import { vendorData } from '../vendor/vendor-data';
import { VendorRepository } from 'src/vendor/vendor.repository';
import { inventoryData } from './inventory-data';

@Injectable()
export class InventorySeederService {
  private logger = new Logger('InventorySeederService');

  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(IssueRepository)
    private issueRepository: IssueRepository,

    @InjectRepository(ConditionRepository)
    private condtionRepository: ConditionRepository,

    @InjectRepository(GraderRepository)
    private graderRepository: GraderRepository,

    @InjectRepository(PageRepository)
    private pageRepository: PageRepository,

    @InjectRepository(VendorRepository)
    private vendorRepository: VendorRepository,
  ) {}

  async create(): Promise<void> {
    try {
      // For each user
      for (let i = 0; i < authData.length; i++) {
        const elementAuth = authData[i];

        const user = await this.userRepository.findOne({
          where: {
            username: elementAuth.username,
          },
        });

        // For each issue
        for (let j = 0; j < issueData.length; j++) {
          const elementIssue = issueData[j];

          const issue = await this.issueRepository.findOne({
            where: {
              issueNumber: elementIssue.issueNumber,
            },
          });

          // For a single condition
          const elementCondition = conditionData[0];
          const condition = await this.condtionRepository.findOne({
            where: { numerical: elementCondition.numerical },
          });

          // For a single grader
          const elementGrader = graderData[0];
          const grader = await this.graderRepository.findOne({
            where: { code: elementGrader.code },
          });

          // For a single page
          const elementPage = pageData[0];
          const page = await this.pageRepository.findOne({
            where: { code: elementPage.code },
          });

          // For a single vendor
          const elementVendor = vendorData[0];
          const vendor = await this.vendorRepository.findOne({
            where: {
              name: elementVendor.name,
              subvendor: elementVendor.subvendor,
              user,
            },
          });

          for (let k = 0; k < inventoryData.length; k++) {
            const elementInventory = inventoryData[k];
            const exists = await this.inventoryRepository.findOne({
              where: {
                tag: elementInventory.tag,
                user: user,
              },
            });

            if (!exists) {
              const inventory = this.inventoryRepository.create({
                ...elementInventory,
                user,
                issue,
                condition,
                grader,
                page,
                vendor,
              });
              const results = await inventory.save();
              this.logger.log(`Inventory ${results.tag} - ${results.bin} - Created`);
            } else {
              this.logger.log(`Inventory ${elementInventory.tag} - ${elementInventory.bin} - Created`);
            }
          }
        }
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }
}

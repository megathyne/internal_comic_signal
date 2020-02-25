export class CreateApprovalDto {
   
    readonly userId: number;

    readonly inventoryId: number;

    readonly ebayItemId: number;

    readonly isApproved : boolean;
}
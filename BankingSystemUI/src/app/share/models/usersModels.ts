export interface UsersModels {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    accounNo?: string;
    accounType?: string;
    password: string;
    isAdmin: boolean;
    createdBy: number;
    createdOn: Date;
    createdByIP?: string;
    modifiedBy: number;
    modifiedOn: Date;
    modifiedByIP?: string;
    isActive: boolean;
}
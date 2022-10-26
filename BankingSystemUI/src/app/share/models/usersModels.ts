export interface UsersModels {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    accountNo?: string;
    accountType?: string;
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
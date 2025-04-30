import { IsNotEmpty } from "class-validator";

export class AdminDashboardDto{
    @IsNotEmpty()
    totalVendorStores: number;

    @IsNotEmpty()
    totalPendingStores: number;

    @IsNotEmpty()
    totalApprovedStores: number;

    @IsNotEmpty()
    totalRejectedStores: number;

    @IsNotEmpty()
    totalProducts: number;

    @IsNotEmpty()
    totalPendingProducts: number;

    @IsNotEmpty()
    totalApprovedProducts: number;

    @IsNotEmpty()
    totalRejectedProducts: number;
}
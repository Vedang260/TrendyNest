import { IsNotEmpty } from "class-validator";

export class AdminDashboardDto{
    @IsNotEmpty()
    totalCategories: number;

    @IsNotEmpty()
    totalSubCategories: number;

    @IsNotEmpty()
    totalUsers: number;

    @IsNotEmpty()
    totalCustomers: number;

    @IsNotEmpty()
    totalVendors: number;

    @IsNotEmpty()
    totalVendorStores: number;

    @IsNotEmpty()
    totalPendingVendorStores: number;

    @IsNotEmpty()
    totalApprovedVendorStores: number;

    @IsNotEmpty()
    totalRejectedVendorStores: number;

    @IsNotEmpty()
    totalProducts: number;

    @IsNotEmpty()
    totalPendingProducts: number;

    @IsNotEmpty()
    totalApprovedProducts: number;

    @IsNotEmpty()
    totalRejectedProducts: number;
}
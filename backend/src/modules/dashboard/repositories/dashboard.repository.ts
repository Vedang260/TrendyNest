import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AdminDashboardDto } from "../dtos/adminDashboard.dto";

@Injectable()
export class DashboardRepository{
    constructor(private readonly dataSource: DataSource) {}

    async getAdminDashboardStats(): Promise<AdminDashboardDto> {
        try {
            const result = await this.dataSource.query(`
                SELECT
                    (SELECT COUNT(*) FROM categories) AS "totalCategories",
                    (SELECT COUNT(*) FROM sub_categories) AS "totalSubCategories",
                    (SELECT COUNT(*) FROM users) AS "totalUsers",
                    (SELECT COUNT(*) FROM users WHERE role = 'customer') AS "totalCustomers",
                    (SELECT COUNT(*) FROM users WHERE role = 'vendor') AS "totalVendors",
                    (SELECT COUNT(*) FROM vendor_stores) AS "totalVendorStores",
                    (SELECT COUNT(*) FROM vendor_stores WHERE status = 'pending') AS "totalPendingVendorStores",
                    (SELECT COUNT(*) FROM vendor_stores WHERE status = 'approved') AS "totalApprovedVendorStores",
                    (SELECT COUNT(*) FROM vendor_stores WHERE status = 'rejected') AS "totalRejectedVendorStores",
                    (SELECT COUNT(*) FROM products) AS "totalProducts",
                    (SELECT COUNT(*) FROM products WHERE status = 'pending') AS "totalPendingProducts",
                    (SELECT COUNT(*) FROM products WHERE status = 'approved') AS "totalApprovedProducts",
                    (SELECT COUNT(*) FROM products WHERE status = 'rejected') AS "totalRejectedProducts"
            `);

            const stats = result[0];

            return {
                totalCategories: Number(stats.totalCategories),
                totalSubCategories: Number(stats.totalSubCategories),
                totalUsers: Number(stats.totalUsers),
                totalCustomers: Number(stats.totalCustomers),
                totalVendors: Number(stats.totalVendors),
                totalVendorStores: Number(stats.totalVendorStores),
                totalPendingVendorStores: Number(stats.totalPendingVendorStores),
                totalApprovedVendorStores: Number(stats.totalApprovedVendorStores),
                totalRejectedVendorStores: Number(stats.totalRejectedVendorStores),
                totalProducts: Number(stats.totalProducts),
                totalPendingProducts: Number(stats.totalPendingProducts),
                totalApprovedProducts: Number(stats.totalApprovedProducts),
                totalRejectedProducts: Number(stats.totalRejectedProducts),
            };
        } catch (error) {
            console.error('Error in fetching data for the Admin Dashboard:', error.message);
            throw new InternalServerErrorException('Error in fetching data for the Admin Dashboard');
        }
    }

    // async getVendorStoreDashboardStats(): Promise<AdminDashboardDto> {
    //     try {
    //         const result = await this.dataSource.query(`
    //             SELECT
    //                 (SELECT COUNT(*) FROM categories) AS "totalCategories",
    //                 (SELECT COUNT(*) FROM sub_categories) AS "totalSubCategories",
    //                 (SELECT COUNT(*) FROM users) AS "totalUsers",
    //                 (SELECT COUNT(*) FROM users WHERE role = 'customer') AS "totalCustomers",
    //                 (SELECT COUNT(*) FROM users WHERE role = 'vendor') AS "totalVendors",
    //                 (SELECT COUNT(*) FROM vendor_stores) AS "totalVendorStores",
    //                 (SELECT COUNT(*) FROM vendor_stores WHERE status = 'pending') AS "totalPendingVendorStores",
    //                 (SELECT COUNT(*) FROM vendor_stores WHERE status = 'approved') AS "totalApprovedVendorStores",
    //                 (SELECT COUNT(*) FROM vendor_stores WHERE status = 'rejected') AS "totalRejectedVendorStores",
    //                 (SELECT COUNT(*) FROM products) AS "totalProducts",
    //                 (SELECT COUNT(*) FROM products WHERE status = 'pending') AS "totalPendingProducts",
    //                 (SELECT COUNT(*) FROM products WHERE status = 'approved') AS "totalApprovedProducts",
    //                 (SELECT COUNT(*) FROM products WHERE status = 'rejected') AS "totalRejectedProducts"
    //         `);

    //         const stats = result[0];

    //         return {
    //             totalCategories: Number(stats.totalCategories),
    //             totalSubCategories: Number(stats.totalSubCategories),
    //             totalUsers: Number(stats.totalUsers),
    //             totalCustomers: Number(stats.totalCustomers),
    //             totalVendors: Number(stats.totalVendors),
    //             totalVendorStores: Number(stats.totalVendorStores),
    //             totalPendingVendorStores: Number(stats.totalPendingVendorStores),
    //             totalApprovedVendorStores: Number(stats.totalApprovedVendorStores),
    //             totalRejectedVendorStores: Number(stats.totalRejectedVendorStores),
    //             totalProducts: Number(stats.totalProducts),
    //             totalPendingProducts: Number(stats.totalPendingProducts),
    //             totalApprovedProducts: Number(stats.totalApprovedProducts),
    //             totalRejectedProducts: Number(stats.totalRejectedProducts),
    //         };
    //     } catch (error) {
    //         console.error('Error in fetching data for the Admin Dashboard:', error.message);
    //         throw new InternalServerErrorException('Error in fetching data for the Admin Dashboard');
    //     }
    // }
}
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

    async getOrderDashboardStatsForAdmin(){
        try{
            const result = await this.dataSource.query(`
                SELECT
                    -- 1. Order Volume Analytics
                    (SELECT COUNT(*) FROM orders) AS "totalOrders",
                    (SELECT COUNT(*) FROM orders WHERE status = 'pending') AS "pendingOrders",
                    (SELECT COUNT(*) FROM orders WHERE status = 'shipped') AS "shippedOrders",
                    (SELECT COUNT(*) FROM orders WHERE status = 'delivered') AS "deliveredOrders",
                    -- 2. Recent Order Trends (last 7 days)
                    (SELECT COUNT(*) FROM orders WHERE "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "last7DaysOrders",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt" >= CURRENT_DATE - INTERVAL '30 days') AS "last30DaysOrders",
                    -- 3. Weekly Order Distribution
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 0 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "sundayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 1 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "mondayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 2 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "tuesdayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 3 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "wednesdayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 4 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "thursdayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 5 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "fridayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(DOW FROM "createdAt") = 6 AND "createdAt" >= CURRENT_DATE - INTERVAL '7 days') AS "saturdayOrders",
                    -- 4. Order Item Statistics
                    (SELECT COUNT(*) FROM order_items) AS "totalOrderItems",
                    (SELECT AVG(quantity) FROM order_items) AS "avgItemsPerOrder",
                    (SELECT MAX(quantity) FROM order_items) AS "maxItemsInSingleOrder",
        
                    -- 5. Order Item Status Distribution
                    (SELECT COUNT(*) FROM order_items WHERE status = 'pending') AS "pendingOrderItems",
                    (SELECT COUNT(*) FROM order_items WHERE status = 'shipped') AS "shippedOrderItems",
                    (SELECT COUNT(*) FROM order_items WHERE status = 'delivered') AS "deliveredOrderItems",
        
                    -- 6. Hourly Order Trends (for today)
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '00:00:00' AND "createdAt"::time < '04:00:00' AND "createdAt"::date = CURRENT_DATE) AS "orders0000To0400",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '04:00:00' AND "createdAt"::time < '08:00:00' AND "createdAt"::date = CURRENT_DATE) AS "orders0400To0800",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '08:00:00' AND "createdAt"::time < '12:00:00' AND "createdAt"::date = CURRENT_DATE) AS "orders0800To1200",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '12:00:00' AND "createdAt"::time < '16:00:00' AND "createdAt"::date = CURRENT_DATE) AS "orders1200To1600",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '16:00:00' AND "createdAt"::time < '20:00:00' AND "createdAt"::date = CURRENT_DATE) AS "orders1600To2000",
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::time >= '20:00:00' AND "createdAt"::time <= '23:59:59' AND "createdAt"::date = CURRENT_DATE) AS "orders2000To2400",
        
                    -- 7. Processing Time Metrics
                    (SELECT AVG(EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))/3600) FROM orders WHERE status = 'delivered') AS "avgProcessingHours",
                    (SELECT MAX(EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))/3600) FROM orders WHERE status = 'delivered') AS "maxProcessingHours",
        
                    -- 8. Customer Order Patterns
                    (SELECT COUNT(DISTINCT "customerId") FROM orders) AS "uniqueCustomers",
                    (SELECT AVG(order_count) FROM (SELECT "customerId", COUNT(*) as order_count FROM orders GROUP BY "customerId") AS customer_orders) AS "avgOrdersPerCustomer",
        
                    -- 9. Current Day/Month Metrics
                    (SELECT COUNT(*) FROM orders WHERE "createdAt"::date = CURRENT_DATE) AS "todayOrders",
                    (SELECT COUNT(*) FROM orders WHERE EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM CURRENT_DATE)) AS "currentMonthOrders"
            `);
            const stats = result[0];

            return {
                totalOrders: Number(stats.totalOrders),
                totalPendingOrders: Number(stats.pendingOrders),
                totalShippedOrders: Number(stats.shippedOrders),
                totalDeliveredOrders: Number(stats.deliveredOrders),
                last7DaysOrders: Number(stats.last7DaysOrders),
                last30DaysOrders: Number(stats.last30DaysOrders),
                totalSundayOrders: Number(stats.sundayOrders),
                totalMondayOrders: Number(stats.mondayOrders),
                totalTuesdayOrders: Number(stats.tuesdayOrders),
                totalWednesdayOrders: Number(stats.wednesdayOrders),
                totalThursdayOrders: Number(stats.thursdayOrders),
                totalFridayOrders: Number(stats.fridayOrders),
                totalSaturdayOrders: Number(stats.saturdayOrders),
                totalOrderItems: Number(stats.totalOrderItems),
                avgItemsPerOrder: Number(stats.avgItemsPerOrder),
                maxItemsInSingleOrder: Number(stats.maxItemsInSingleOrder),
                pendingOrderItems: Number(stats.pendingOrderItems),
                shippedOrderItems: Number(stats.shippedOrderItems),
                deliveredOrderItems: Number(stats.deliveredOrderItems),
                orders0000To0400: Number(stats.orders0000To0400),
                orders0400To0800: Number(stats.orders0400To0800),
                orders0800To1200: Number(stats.orders0800To1200),
                orders1200To1600: Number(stats.orders1200To1600),
                orders1600To2000: Number(stats.orders1600To2000),
                orders2000To2400: Number(stats.orders2000To2400),
                avgProcessingHours: Number(stats.avgProcessingHours),
                maxProcessingHours: Number(stats.maxProcessingHours),
                uniqueCustomers: Number(stats.uniqueCustomers),
                avgOrdersPerCustomer: Number(stats.avgOrdersPerCustomer),
                todayOrders: Number(stats.todayOrders),
                currentMonthOrders: Number(stats.currentMonthOrders)
            }
        }catch(error){
            console.error('Error in fetching the orders Dashboard data For Admin: ', error.message);
            throw new InternalServerErrorException('Error in fetching the orders Dashboard Data for Admin');
        }
    }
}
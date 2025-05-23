import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DashboardRepository } from "../repositories/dashboard.repository";
import { AdminDashboardDto } from "../dtos/adminDashboard.dto";

@Injectable()
export class DashboardService{
    constructor(
        private readonly dashboardRepository: DashboardRepository,
    ){}

    async getAdminDashboardData(): Promise<{ success: boolean; message: string; dashboard: AdminDashboardDto | null}>{
        try{
            const dashboardData = await this.dashboardRepository.getAdminDashboardStats();
            return {
                success: true,
                message: 'Admin Dashboard data is fetched successfully',
                dashboard: dashboardData
            }
        }catch(error){
            console.error('Error in fetching admin Dashboard data: ', error.message);
            return {
                success: false,
                message: 'Failed to fetch Admin Dashboard Data',
                dashboard: null
            }
        }
    }

    async getOrdersDashboardDataForAdmin(): Promise<{ success: boolean; message: string; dashboard: any}>{
        try{
            const dashboardData = await this.dashboardRepository.getOrderDashboardStatsForAdmin();
            return {
                success: true,
                message: 'Orders Dashboard data for Admin is fetched successfully',
                dashboard: dashboardData
            }
        }catch(error){
            console.error('Error in fetching Orders Dashboard data for Admin: ', error.message);
            return {
                success: false,
                message: 'Failed to fetch Orders Dashboard Data for Admin',
                dashboard: null
            }
        }
    }
}
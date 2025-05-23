import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe, Post, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt_auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/roles.enums';
import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/admin/orders')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async getOrdersDashboardForAdmin(){
    return this.dashboardService.getOrdersDashboardDataForAdmin();
  }

  @Get('/admin')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAdminDashboard(){
    return this.dashboardService.getAdminDashboardData();
  }
}
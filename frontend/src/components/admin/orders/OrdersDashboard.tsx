// src/pages/admin/OrdersDashboard.tsx
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { fetchOrdersDashboard } from '../../../services/dashboard/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../../redux/hooks/hooks';

const OrdersDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
    const token = useAppSelector((state) => state.auth?.token || '');
    
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchOrdersDashboard(token);
        if (response.success) {
          setDashboardData(response.dashboard);
        } else {
          toast.error(response.message || 'Failed to load dashboard data');
        }
      } catch (error) {
        toast.error('An error occurred while loading dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">No dashboard data available</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Chart options and series
  const orderVolumeOptions = {
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: ['Total Orders', 'Pending', 'Shipped', 'Delivered'],
    colors: ['#4f46e5', '#f59e0b', '#3b82f6', '#10b981'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const orderVolumeSeries = [
    dashboardData.totalOrders,
    dashboardData.totalPendingOrders,
    dashboardData.totalShippedOrders,
    dashboardData.totalDeliveredOrders
  ];

  const recentTrendsOptions = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '50%',
        },
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
            formatter: function(val: number) {
              return `${dashboardData.last7DaysOrders} of ${dashboardData.last30DaysOrders}`;
            }
          },
          total: {
            show: true,
            label: 'Last 7 Days',
            formatter: function() {
              return `${Math.round((dashboardData.last7DaysOrders/dashboardData.last30DaysOrders)*100)}%`;
            }
          }
        }
      }
    },
    labels: ['7 Days vs 30 Days'],
    colors: ['#7c3aed'],
  };

  const recentTrendsSeries = [
    Math.round((dashboardData.last7DaysOrders/dashboardData.last30DaysOrders)*100) || 0
  ];

  const weeklyDistributionOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    colors: ['#4f46e5'],
    markers: {
      size: 5,
    },
    tooltip: {
      enabled: true,
    }
  };

  const weeklyDistributionSeries = [{
    name: 'Orders',
    data: [
      dashboardData.totalSundayOrders,
      dashboardData.totalMondayOrders,
      dashboardData.totalTuesdayOrders,
      dashboardData.totalWednesdayOrders,
      dashboardData.totalThursdayOrders,
      dashboardData.totalFridayOrders,
      dashboardData.totalSaturdayOrders
    ]
  }];

  const itemStatisticsOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Avg Items/Order', 'Max Items'],
    },
    colors: ['#10b981'],
  };

  const itemStatisticsSeries = [{
    name: 'Items',
    data: [
      dashboardData.avgItemsPerOrder,
      dashboardData.maxItemsInSingleOrder
    ]
  }];

  const itemStatusOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: ['Order Items'],
    },
    colors: ['#f59e0b', '#3b82f6', '#10b981'],
    legend: {
      position: 'bottom',
    },
    fill: {
      opacity: 1
    }
  };

  const itemStatusSeries = [
    {
      name: 'Pending',
      data: [dashboardData.pendingOrderItems]
    },
    {
      name: 'Shipped',
      data: [dashboardData.shippedOrderItems]
    },
    {
      name: 'Delivered',
      data: [dashboardData.deliveredOrderItems]
    }
  ];

  const hourlyTrendsOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'],
    },
    colors: ['#7c3aed'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    tooltip: {
      enabled: true,
    }
  };

  const hourlyTrendsSeries = [{
    name: 'Orders',
    data: [
      dashboardData.orders0000To0400,
      dashboardData.orders0400To0800,
      dashboardData.orders0800To1200,
      dashboardData.orders1200To1600,
      dashboardData.orders1600To2000,
      dashboardData.orders2000To2400
    ]
  }];

  const processingTimeOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Average', 'Maximum'],
    },
    colors: ['#ec4899'],
  };

  const processingTimeSeries = [{
    name: 'Hours',
    data: [
      dashboardData.avgProcessingHours,
      dashboardData.maxProcessingHours
    ]
  }];

  const customerPatternsOptions = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px',
          },
          value: {
            show: true,
            fontSize: '24px',
            formatter: function(val: number) {
              return val.toFixed(1);
            }
          }
        }
      }
    },
    labels: ['Avg Orders/Customer'],
    colors: ['#4f46e5'],
  };

  const customerPatternsSeries = [dashboardData.avgOrdersPerCustomer];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Orders Dashboard</h1>
          <p className="text-gray-600">Analytics and insights about your orders</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Orders</p>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.todayOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                <FiPackage className="text-2xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Orders</p>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.currentMonthOrders}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                <FiTrendingUp className="text-2xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unique Customers</p>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.uniqueCustomers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FiUsers className="text-2xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Order Items</p>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.totalOrderItems}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <FiCheckCircle className="text-2xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Volume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Order Volume Overview</h3>
            <Chart
              options={orderVolumeOptions}
              series={orderVolumeSeries}
              type="donut"
              height={350}
            />
          </motion.div>

          {/* Recent Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Order Trends</h3>
            <Chart
              options={recentTrendsOptions}
              series={recentTrendsSeries}
              type="radialBar"
              height={350}
            />
          </motion.div>

          {/* Weekly Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Weekly Order Distribution</h3>
            <Chart
              options={weeklyDistributionOptions}
              series={weeklyDistributionSeries}
              type="line"
              height={350}
            />
          </motion.div>

          {/* Item Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Order Item Statistics</h3>
            <Chart
              options={itemStatisticsOptions}
              series={itemStatisticsSeries}
              type="bar"
              height={350}
            />
          </motion.div>

          {/* Item Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Order Item Status</h3>
            <Chart
              options={itemStatusOptions}
              series={itemStatusSeries}
              type="bar"
              height={350}
            />
          </motion.div>

          {/* Hourly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Hourly Order Trends</h3>
            <Chart
              options={hourlyTrendsOptions}
              series={hourlyTrendsSeries}
              type="area"
              height={350}
            />
          </motion.div>

          {/* Processing Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Processing Time Metrics</h3>
            <Chart
              options={processingTimeOptions}
              series={processingTimeSeries}
              type="bar"
              height={350}
            />
          </motion.div>

          {/* Customer Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Order Patterns</h3>
            <Chart
              options={customerPatternsOptions}
              series={customerPatternsSeries}
              type="radialBar"
              height={350}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersDashboard;
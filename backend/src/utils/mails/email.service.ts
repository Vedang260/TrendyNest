import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EMailService{
    async sendCartAbondenedMail(email: string){

    }

    async sendPurchaseConfirmMail(email: string, paymentId: string, customerId: string, orderId: string, newCartItems){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const emailHTML = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Trendy Cart</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            color: #374151;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        
        .logo {
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            margin-bottom: 10px;
        }
        
        .order-confirmed {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 10px 0;
        }
        
        .content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .order-details {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 10px;
        }
        
        .detail-label {
            font-weight: 500;
            color: #64748b;
            width: 120px;
        }
        
        .detail-value {
            font-weight: 500;
            color: #1e293b;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .items-table th {
            background-color: #f1f5f9;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            color: #334155;
        }
        
        .items-table td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: top;
        }
        
        .item-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
        }
        
        .total-row {
            font-weight: 600;
            background-color: #f8fafc;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: #64748b;
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
        }
        
        .social-icons {
            margin: 20px 0;
        }
        
        .social-icon {
            display: inline-block;
            margin: 0 10px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            background-color: #ecfdf5;
            color: #059669;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Trendy Cart</div>
            <h1 class="order-confirmed">Order Confirmed!</h1>
            <p style="color: #e0e7ff; margin: 0;">Thank you for your purchase</p>
        </div>
        
        <div class="content">
            <p class="greeting">Hi there,</p>
            <p class="greeting">We're getting your order ready to be shipped. We will notify you when it has been sent.</p>
            
            <div class="order-details">
                <div class="detail-row">
                    <div class="detail-label">Order Number:</div>
                    <div class="detail-value">${orderId}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Order Date:</div>
                    <div class="detail-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Payment ID:</div>
                    <div class="detail-value">${paymentId}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Status:</div>
                    <div class="detail-value"><span class="status-badge">Processing</span></div>
                </div>
            </div>
            
            <h3 style="margin: 25px 0 15px 0; font-size: 18px;">Order Summary</h3>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${newCartItems.map(item => `
                    <tr>
                        <td style="display: flex; align-items: center;">
                            <img src="${item.mainImage}" alt="${item.name}" class="item-image">
                            <div style="margin-left: 15px;">
                                <div style="font-weight: 500;">${item.name}</div>
                                <div style="font-size: 13px; color: #64748b;">${item.subCategoryName}</div>
                            </div>
                        </td>
                        <td>₹${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                    `).join('')}
                    <tr class="total-row">
                        <td colspan="3" style="text-align: right; padding-right: 15px;">Subtotal</td>
                        <td>₹${newCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="3" style="text-align: right; padding-right: 15px;">Shipping</td>
                        <td>FREE</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="3" style="text-align: right; padding-right: 15px; font-size: 16px;">Total</td>
                        <td style="font-size: 16px;">₹${newCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://yourwebsite.com/orders/${orderId}" class="cta-button">View Your Order</a>
                <p style="margin-top: 15px; color: #64748b;">Need help? <a href="mailto:support@trendycart.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
            </div>
        </div>
        
        <div class="footer">
            <div class="social-icons">
                <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" width="24" alt="Facebook"></a>
                <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="24" alt="Twitter"></a>
                <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="24" alt="Instagram"></a>
            </div>
            <p>© ${new Date().getFullYear()} Trendy Cart. All rights reserved.</p>
            <p>123 Fashion Street, Style City, SC 12345</p>
        </div>
    </div>
</body>
</html>
        `;

        await transporter.sendMail({
            from: `"Trendy Cart" <${process.env.EMAIL_USER}>`, // Set a friendly sender name
            to: email,
            subject: '🎉 Your Order Confirmation - Trendy Cart',
            html: emailHTML,
        });
    }
}
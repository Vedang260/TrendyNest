# TrendyNest - ✨ Multi-Vendor E-Commerce Platform with ChatBot 🚀

**TrendyNest** is a Multi-Vendor E-Commerce Platform that allows vendors to register their stores and add their products & can earn by selling them. It allows Customers a wide range of products of different Categories & Sub-Categories, provides a price range filter, Customer Chat-Bot support for Order & Product Inquiries & Stripe Payment Integration for Payment support & secure Transactions.
## 🌟 Features

### Customer Features
- Browse the products using Categories & Sub-Categories
- Manage their Cart Items
- Can Track their Orders & Order-Items
- Can Checkout & pay securly using Stripe Payment Integration.
- Can chat with Bot in Real-Time using Websockets for Order & Product related Queries.
- Receive Order Confirmation Mail on Successful Payment & placement of Order.
  
### Vendor Features
- Can register their stores in a particular category.
- Can Manage the Products in the store.
- Can Track their Orders received from the Customer.
- Can manage their Sales & Orders.

### Admin Features
- Can Manage & Approve Stores.
- Can Manage & Approve Products.
- Can Manage Users, Orders.
- Can Manage System Dashboard & Analytics for the Orders, Products etc...

## 🛠️ Tech Stack

### Frontend
- **React**: A platform for building web applications.
- **TypeScript**: Superset of JavaScript for type safety and better tooling.
- **Redux**: Reactive programming library for handling asynchronous events and data streams.

### Backend
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Stripe**: To implement Secure Payment Transactions. 
- **JWT Authentication**: JSON Web Tokens for secure authentication using Passport.
- **PassportJS**: Middleware for handling authentication in Node.js.
- **TypeORM**: ORM for interacting with the database (MySQL/PostgreSQL).
- **PostgreSQL**: Database used to store product and user data.
- **Nodemailer**: To send mails to the Customer for Successful Order Placement & Cart Abandoned.
## Setup Instructions
 
### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
 
### Backend Setup
 
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
 
2. Install dependencies:
   ```bash
   npm install
   ```
 
3. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=neoLearn
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1h
   ```
 
4. Start the development server:
   ```bash
   npm run start:dev
   ```
 
5. The backend API will be available at http://localhost:8000
 
 
### Frontend Setup
 
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Aether-Mind.git
   cd Aether-Mind/frontend
   
2. **Install the dependencies**:
   ```bash
   npm install

3. **Run the Angular Application**
   ```bash
   npm run dev
 
## API Documentation
 
The complete API documentation is available on Postman:
[Trendy Nest API Documentation](https://documenter.getpostman.com/view/26606017/2sB2j69A4w)
 
 
# 📽️ Trendy Nest - Demo Video  
 
Watch the demo of the **Trendy Nest**:  
🔗 **Trendy Nest : [Click here to watch the demo](https://drive.google.com/file/d/1YJ49pAt5fw7CvndoVR-8R1gtHrZ15ptZ/view?usp=sharing)**  

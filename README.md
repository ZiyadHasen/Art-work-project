# 🎨 Ethiopian Art Gallery - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform for Ethiopian artists to showcase and sell their artwork. Built with React, Node.js, and MongoDB, featuring a complete shopping cart system, user authentication, and a beautiful responsive design.

## ✨ Features

### 🛍️ **E-commerce Functionality**
- **Artwork Browsing**: Browse and search through a curated collection of Ethiopian artwork
- **Shopping Cart**: Add items to cart with real-time updates and persistent storage
- **Stripe Integration**: Secure payment processing with Stripe checkout
- **User Authentication**: JWT-based authentication with role-based access
- **Artwork Management**: CRUD operations for artists to manage their works

### 🎭 **Events & Cultural Hub**
- **Events Page**: Showcase cultural events, exhibitions, and workshops
- **Event Categories**: Music, Dance, Film, Poetry, Sculpture, Jazz, and more
- **Event Details**: Complete information including dates, locations, and pricing

### �� **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Modern Cards**: Beautiful artwork and event cards with hover effects
- **Modal System**: Elegant cart modal with backdrop blur
- **Toast Notifications**: User feedback for all actions

### 🔧 **Technical Features**
- **Real-time Search**: Search artworks by title and location
- **Pagination**: Efficient loading for large datasets
- **File Upload**: Image upload with Cloudinary integration
- **Admin Dashboard**: Statistics and user management
- **Public Stats**: View platform statistics for all users

## �� Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - Component-level styling
- **React Icons** - Beautiful icon library
- **Day.js** - Lightweight date manipulation
- **React Toastify** - Toast notifications

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image storage
- **Stripe** - Payment processing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
📁 client/                          # Frontend React application
├── 📁 public/                      # Static assets
├── 📁 src/
│   ├── 📁 assets/                  # Images, CSS, styled components
│   ├── 📁 components/              # Reusable React components
│   ├── 📁 contexts/                # React context providers
│   ├── 📁 pages/                   # Page components
│   ├── 📁 utils/                   # Utility functions
│   ├── 📄 App.jsx                  # Main app component
│   └── 📄 main.jsx                 # Entry point
├── 📄 package.json
└── �� vite.config.js

📁 controllers/                     # Backend route controllers
├── �� artworkControllers.js        # Artwork CRUD operations
├── 📄 authController.js            # Authentication logic
└── 📄 userController.js            # User management

📁 middleware/                      # Express middleware
├── 📄 authMiddleware.js            # JWT authentication
├── 📄 multerMiddleware.js          # File upload handling
└── 📄 validationMiddleware.js      # Input validation

📁 models/                          # MongoDB schemas
├── 📄 ArtworkModel.js              # Artwork data model
├── 📄 UserModel.js                 # User data model
└── 📄 connectDB.js                 # Database connection

📁 routers/                         # Express routes
├── 📄 artworkRouter.js             # Artwork API routes
├── 📄 authRouter.js                # Authentication routes
└── 📄 userRouter.js                # User API routes

📄 .env                             # Environment variables
📄 package.json                     # Backend dependencies
📄 server.js                        # Express server entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ZiyadHasen/Art-work-project.git
cd ethiopian-art-gallery
```

### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5500
NODE_ENV=development

# Database
MONGO_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Storage)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Stripe (Payment Processing)
STRIPE_PRIVATE_KEY=your_stripe_private_key

# Client URL
CLIENT_URL=http://localhost:5173
```

### 4. Start Development Servers

**Backend:**
```bash
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5500

## 🎯 Key Features Explained

### **Artwork Management**
- Artists can add, edit, and delete their artwork
- Image upload with automatic Cloudinary integration
- Rich artwork details including title, description, price, and location
- Search and filter functionality

### **Shopping Cart System**
- Persistent cart state using React Context
- Real-time cart updates
- Elegant modal interface
- Stripe integration for secure payments

### **User Authentication**
- JWT-based authentication
- Role-based access control (User/Admin)
- Protected routes and middleware
- User profile management

### **Events Platform**
- Cultural events showcase
- Event categories and details
- Responsive event cards
- Event management system

### **Admin Features**
- User statistics dashboard
- Artwork management
- Platform analytics
- Admin-only routes

## �� API Endpoints

### **Authentication**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/logout` - User logout

### **Artworks**
- `GET /api/v1/artworks/all-artworks` - Get all artworks (filtered)
- `GET /api/v1/artworks/my-artworks` - Get user's artworks
- `POST /api/v1/artworks` - Create new artwork
- `PATCH /api/v1/artworks/:id` - Update artwork
- `DELETE /api/v1/artworks/:id` - Delete artwork

### **Users**
- `GET /api/v1/users/current-user` - Get current user
- `GET /api/v1/users/stats` - Get public statistics
- `GET /api/v1/users/admin/app-stats` - Get admin statistics
- `PATCH /api/v1/users/update-user` - Update user profile

### **Payments**
- `POST /api/v1/create-checkout-session` - Create Stripe checkout session

## 🎨 Styling & Theming

### **CSS Variables**
The application uses CSS custom properties for consistent theming:

```css
:root {
  --primary-500: #2cb1bc;
  --primary-600: #14919b;
  --background-color: var(--grey-50);
  --text-color: var(--grey-900);
  --background-secondary-color: var(--white);
  --text-secondary-color: var(--grey-500);
}
```

### **Dark Mode**
Automatic dark mode support with theme toggle:
- Persistent theme preference
- Smooth transitions
- Proper contrast ratios

## �� Deployment

### **Frontend (Vercel/Netlify)**
```bash
cd client
npm run build
```

### **Backend (Railway/Render)**
```bash
npm start
```

### **Environment Variables for Production**
Update the `.env` file with production values:
- MongoDB Atlas connection string
- Production Stripe keys
- Cloudinary production credentials
- Production client URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **Ethiopian Artists** - For inspiring this platform
- **React Community** - For excellent documentation and tools
- **Stripe** - For seamless payment integration
- **Cloudinary** - For reliable image storage
- **Tailwind CSS** - For beautiful utility-first styling

## 📞 Contact

- **Project Link**: https://github.com/ZiyadHasen/Art-work-project
- **Live**: https://art-work-project.vercel.app/
- **Email**: hziyad933@gmail.com

---

⭐ **Star this repository if you found it helpful!** ⭐



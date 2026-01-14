# 🎓 EduWay

**Navigate Your Exam Preparation Journey with Precision and Confidence**

EduWay is a comprehensive exam preparation platform that combines social learning, AI-powered assistance, and extensive study resources to help students excel in competitive examinations.
Navigate to [EduWay](tinyurl.com/eduwayport) to access the site!

![EduWay](https://img.shields.io/badge/EduWay-Learning%20Platform-4285F4?style=for-the-badge&logo=google-scholar&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=flat&logo=express)

## 🌟 Key Features

### 📱 **Social Learning Platform**
- **Interactive Feed**: Share success stories, study tips, and achievements
- **Real-time Collaboration**: Connect with study buddies and form study groups
- **Community Engagement**: Like, comment, and interact with posts
- **Study Buddy Requests**: Find and connect with like-minded learners

### 🤖 **AI-Powered Study Assistant**
- **Intelligent Q&A**: Ask questions and get AI-powered responses using Groq API
- **Question Generation**: Generate practice questions for any topic
- **Study Group Chat**: Real-time messaging with AI assistance
- **Smart Moderation**: Content filtering and safety features

### 📚 **Comprehensive Question Bank**
- **Official Papers**: Access to real previous year question papers from:
  - **UPSC CSE** (Civil Services Examination)
  - **NEET UG** (Medical Entrance)
  - **JEE Main** (Engineering Entrance)
  - **GATE** (Postgraduate Engineering)
- **PDF Viewer**: Integrated document viewer for seamless reading
- **Organized by Year**: 10+ years of question papers (2015-2024)
- **Official Sources**: Direct links to NTA, UPSC, and IIT Bombay websites

### 📋 **Exam Information Hub**
- **Detailed Exam Guides**: Comprehensive information about major competitive exams
- **Syllabus Breakdown**: Subject-wise syllabus coverage
- **Career Pathways**: Job opportunities and career guidance
- **Important Dates**: Exam schedules and deadlines
- **Calendar Integration**: Add exam dates to your calendar

### 🎯 **User Dashboard**
- **Profile Management**: Personal study progress tracking
- **Achievement System**: Track your learning milestones
- **Notification Center**: Stay updated with study reminders
- **Progress Analytics**: Visual progress tracking

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with CSS variables and animations
- **Lucide Icons** - Beautiful, consistent icon library
- **React Router** - Client-side routing

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication
- **Socket.io** - Real-time communication
- **Multer** - File upload handling

### **AI & APIs**
- **Groq API** - Fast AI inference for question answering
- **OpenAI Moderation** - Content safety and filtering
- **Cloudinary** - Image hosting and optimization

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Git

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Byte-ne/Final-Hackathon.git
cd Final-Hackathon
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

3. **Environment Setup**

Create `.env` file in `/server` directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/eduway
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/eduway

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# AI API Keys
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

4. **Start the Application**
```bash
# From project root
npm run dev
```

This will start both the client (http://localhost:3000) and server (http://localhost:5000) concurrently.

### **Alternative: Manual Setup**

```bash
# Terminal 1: Start the server
cd server
npm run dev

# Terminal 2: Start the client
cd client
npm run dev
```

## 📖 Usage Guide

### **For Students**

1. **Sign Up**: Create your account with email and password
2. **Complete Profile**: Add your study preferences and goals
3. **Explore Feed**: Browse success stories and study tips from the community
4. **Access Study Tools**: Use AI assistant for doubt clearing and question generation
5. **Practice Papers**: Download and solve previous year question papers
6. **Connect**: Send study buddy requests and join study groups

### **For Content Contributors**

1. **Share Success Stories**: Post your exam achievements and tips
2. **Create Study Groups**: Form groups for collaborative learning
3. **Moderate Content**: Help maintain a positive learning environment

## 🏗️ Project Structure

```
Final-Hackathon/
├── client/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Static assets (background.png)
│   │   ├── components/              # Reusable React components
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                   # Main application pages
│   │   │   ├── App.jsx              # Main app component
│   │   │   ├── Feed.jsx             # Social feed page
│   │   │   ├── Study.jsx            # AI study assistant
│   │   │   ├── QuestionBank.jsx     # Previous year papers
│   │   │   ├── ExamDetails.jsx      # Exam information
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Profile.jsx
│   │   ├── style.css                # Global styles
│   │   └── main.jsx                 # App entry point
│   └── package.json
├── server/                          # Express Backend
│   ├── models/                      # MongoDB schemas
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Challenge.js
│   │   └── Group.js
│   ├── routes/                      # API endpoints
│   │   ├── auth.js                  # Authentication
│   │   ├── posts.js                 # Feed management
│   │   ├── groups.js                # Study groups
│   │   ├── study.js                 # AI study features
│   │   └── users.js                 # User management
│   ├── utils/                       # Utility functions
│   │   └── moderation.js            # Content moderation
│   ├── .env.example                 # Environment template
│   └── index.js                     # Server entry point
└── README.md
```

## 🔌 API Documentation

### **Authentication Endpoints**
```
POST /api/auth/register          # User registration
POST /api/auth/login            # User login
GET  /api/auth/profile          # Get user profile
PUT  /api/auth/profile          # Update user profile
```

### **Feed Endpoints**
```
GET  /api/posts                 # Get all posts
POST /api/posts                 # Create new post
POST /api/posts/:id/like        # Like/unlike post
POST /api/posts/:id/comment     # Add comment to post
DELETE /api/posts/all          # Delete all posts (admin)
```

### **Study Group Endpoints**
```
GET  /api/groups                # Get user's groups
POST /api/groups                # Create study group
POST /api/groups/:id/join       # Join study group
POST /api/groups/:id/message    # Send message in group
```

### **AI Study Assistant**
```
POST /api/study/ask             # Ask AI a question
POST /api/study/generate        # Generate practice questions
```

## 🗄️ Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String,
  password: String,
  profilePic: String,
  bio: String,
  posts: Array,
  studyGroups: Array,
  achievements: Array,
  createdAt: Date
}
```

### **Post Model**
```javascript
{
  author: ObjectId,
  title: String,
  content: String,
  media: Array,
  tags: Array,
  likes: Array,
  comments: [{
    author: ObjectId,
    text: String,
    createdAt: Date
  }],
  studyRequests: Array,
  createdAt: Date
}
```

### **Study Group Model**
```javascript
{
  name: String,
  description: String,
  members: Array,
  messages: [{
    author: ObjectId,
    content: String,
    type: String,
    createdAt: Date
  }],
  createdAt: Date
}
```

## 🤝 Contributing

We welcome contributions to EduWay! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and create a Pull Request

### **Guidelines**
- **Code Style**: Follow ESLint configuration
- **Testing**: Test all new features on multiple browsers
- **Documentation**: Update README for new features
- **Commits**: Use conventional commit format

### **Areas for Contribution**
- 🐛 **Bug Fixes**: Help improve stability
- ✨ **New Features**: Add study tools, exam coverage
- 🎨 **UI/UX**: Improve design and user experience
- 📱 **Mobile**: Enhance mobile responsiveness
- 🌐 **i18n**: Add multi-language support
- 📊 **Analytics**: Add progress tracking features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons**: Lucide React for beautiful icons
- **AI**: Groq for fast AI inference
- **Hosting**: MongoDB Atlas for database
- **Images**: Unsplash for hero images
- **Fonts**: Google Fonts for typography

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Byte-ne/Final-Hackathon/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Byte-ne/Final-Hackathon/discussions)
- **Email**: support@eduway.dev

---

**Built with ❤️ for students, by developers who understand the struggle of competitive exam preparation.**

⭐ **Star this repo if you found it helpful!**

# AppMakers USA - MightyByte Backend Challenge

A Node.js application for AppMakers USA MightyByte Backend Challenge.

## 🚀 Features

- **Express.js Backend** - RESTful API server with CORS support
- **WebSocket Integration** - Real-time communication
- **Docker Support** - Containerized development and production environments

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/afnx/appmakers-usa.git
   cd appmakers-usa
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

### Running the Application

#### Option 1: Using Docker Compose (Recommended)
```bash
docker compose up
```

#### Option 2: Manual Setup
```bash
# Start the backend server
cd backend
npm run dev
```

The server will be available at `http://localhost:5000`

## 🌐 Live Demo

You can test the application live without setting up the project locally:

**Live Website:** [https://appmakersusa.afnprojects.com](https://appmakersusa.afnprojects.com)

*Note: The live demo is hosted on AWS and may take a moment to wake up if it hasn't been accessed recently.*

### Environment Variables

Copy `.env.example` to `.env` and configure:

- `NODE_ENV` - Application environment (development/production)
- `SERVER_PORT` - Backend server port (default: 5000)
- `SERVER_HOST` - Server host (default: 0.0.0.0)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ali Fuat Numanoglu**

---

*AppMakers USA - MightyByte Backend Challenge*

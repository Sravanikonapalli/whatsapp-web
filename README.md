**WhatsApp Web Clone**
A WhatsApp Web-like chat interface built with React, Node.js, Express, MongoDB, and Socket.IO. This application processes webhook payloads from the WhatsApp Business API, stores messages in MongoDB, and displays them in a responsive, real-time chat interface.

---

**Github and live links**
**Github**
```
https://github.com/Sravanikonapalli/whatsapp-web.git
```

**Backend**
```
[Backend live url]()
```

**frontend**
```
[frontend live url]()
```
------
**Features**
- WhatsApp Web-like UI: Clean, responsive interface that mimics WhatsApp Web
- Real-time Messaging: Messages update in real-time using Socket.IO
- Message Status Indicators: Shows sent, delivered, and read status for messages
- Conversation Management: Displays conversations grouped by user
- Search Functionality: Search conversations by name
- Message Deletion: Delete your own messages
- Mobile Responsive: Works well on both desktop and mobile devices

---
**Technology Stack**
**Backend**
- Node.js with Express
- MongoDB with Mongoose
- Socket.IO for real-time communication
- CORS enabled for cross-origin requests

**Frontend**
- React with functional components
- Socket.IO Client for real-time updates
- CSS for styling (no external UI library)

---
**Backend Setup**
**Clone the repository**

```
git clone https://github.com/Sravanikonapalli/whatsapp-web.git
cd whatsapp web(rapidquest)
```

*Install backend dependencies*
```
cd backend
npm install
```
**Set up environment variables**
Create a .env file in the backend directory with the following content:

```MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/whatsapp
PORT=5000
```

**Process the sample payloads**

npm run seed.js

**Start the backend server**

```
npm start
```
The backend will run on http://localhost:5000

**Frontend Setup**
Navigate to the frontend directory

```
cd ../frontend
```

Install frontend dependencies

```
npm install
```

Start the frontend development server
```
npm start
```
The frontend will run on http://localhost:3000

-------------

**API Endpoints**
- GET /api/conversations - Get all conversations
- GET /api/messages/:wa_id - Get messages for a specific user
- POST /api/messages - Send a new message
- DELETE /api/messages/:id - Delete a message

-------
**Deployment**

*backend* - Render
*frontend* - Vercel

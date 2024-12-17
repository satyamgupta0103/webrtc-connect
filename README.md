video-call-app/
├── server/ # Backend (Signaling server)
│ ├── server.js # Node.js signaling server
├── client/ # Frontend (React app)
│ ├── public/ # Static files
│ ├── src/ # React components and logic
│ │ ├── components/
│ │ │ ├── Header.jsx # Top navigation (Mumble branding & room creation button)
│ │ │ ├── ParticipantsList.jsx # List of participants on the left
│ │ │ ├── ChatBox.jsx # Chat box on the right
│ │ │ ├── VideoGrid.jsx # Grid for video streams
│ │ │ ├── VideoPlayer.jsx # Single video component
│ │ ├── App.jsx # Main app logic
│ │ ├── index.js # Entry point
│ ├── package.json # Frontend dependencies
├── package.json # Root dependencies

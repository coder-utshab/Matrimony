@echo off
echo Starting Matrimony Platform...

echo Starting Backend Server...
start cmd /k "cd server && npm start"

echo Starting Frontend Client...
start cmd /k "cd client && npm run dev"

echo Both services are starting! 
echo Backend running on http://localhost:5000
echo Frontend running on http://localhost:5173

@echo off
echo Starting Disaster Management System...

echo Starting backend email server...
start cmd /k "cd server && npm start"

echo Starting direct email server...
start cmd /k "cd server && node direct-email-server.js"

echo Starting alert email server...
start cmd /k "cd server && node alert-email-server.js"

echo Starting direct Gmail sender...
start cmd /k "cd server && node direct-gmail-sender.js"

echo Starting direct Gmail sender (backup)...
start cmd /k "cd server && node direct-gmail-sender.js"

echo Starting simple Gmail sender...
start cmd /k "cd server && node simple-gmail-sender.js"

echo Starting standalone email sender...
start cmd /k "cd server && node standalone-email-sender.js"

echo Starting Gmail direct sender...
start cmd /k "cd server && node gmail-direct-sender.js"

echo Starting simple email server...
start cmd /k "cd server && node simple-email-server.js"

echo Starting direct email endpoint...
start cmd /k "cd server && node direct-email-endpoint.js"

echo Starting dedicated Gmail server...
start cmd /k "cd server && node gmail-server.js"

echo Waiting for backend servers to start...
timeout /t 5 /nobreak > nul

echo Starting frontend server...
start cmd /k "npx http-server -p 5500 -o index.html"

echo Servers started! The application should open in your browser shortly.
echo If it doesn't open automatically, go to http://localhost:5500
echo.
echo Available servers:
echo - Frontend: http://localhost:5500
echo - Email Server: http://localhost:3000
echo - Direct Email Server: http://localhost:3001
echo - Alert Email Server: http://localhost:3002
echo - Direct Gmail Sender: http://localhost:3003
echo - Standalone Email Sender: http://localhost:3004
echo - Gmail Direct Sender: http://localhost:3005
echo - Simple Email Server: http://localhost:3006
echo - Direct Email Endpoint: http://localhost:3000/api/send-direct-email
echo - Dedicated Gmail Server: http://localhost:3007

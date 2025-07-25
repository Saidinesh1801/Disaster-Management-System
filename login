<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Disaster Management System</title>
    <!-- Link to the same CSS file for consistent styling -->
    <link rel="stylesheet" href="style.css">
    <!-- Add specific styles for forms if needed, or add to style.css -->
    <style>
        /* Example: Add some specific form styling */
        .form-container {
            max-width: 400px; /* Limit form width */
            margin: auto; /* Center the form container if body wasn't flex centered */
        }
        .form-group {
            margin-bottom: 15px;
            text-align: left;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box; /* Include padding in width */
        }
        .form-links {
            margin-top: 20px;
            font-size: 0.9em;
        }
        .form-links a {
            color: #3498db;
            text-decoration: none;
        }
        .form-links a:hover {
            text-decoration: underline;
        }
         /* Adjust button width if needed */
         .form-container .btn {
            width: 100%;
            padding: 12px;
        }
    </style>
</head>
<body>

    <div class="container form-container">
        <h2>Login</h2>
        <p>Enter your credentials to access the system.</p>
        <div class="form-links">
            <p>Don't have an account? <a href="signup.html">Sign Up</a></p>
            <p><a href="index.html">Back to Home</a></p> 
        </div>
        <form action="/handle_login" method="POST"> 
            <div class="form-group">
                <label for="username">Username or Email:</label>
                <input type="text" id="username" name="username" required> 
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn login-btn">Login</button>
            </div>
        </form>

        <div class="form-links">
            <p>Don't have an account? <a href="signup.html">Sign Up</a></p>
            <p><a href="index.html">Back to Home</a></p>
        </div>
    </div>

</body>
</html>
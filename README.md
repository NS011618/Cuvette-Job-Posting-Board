Job Posting Board with Email Automation (MERN Stack)
# Job Posting Board

## Tech Stack
**MERN (MongoDB, Express.js, React.js, Node.js)**

## Project Overview
The Job Posting Board is a full-stack application where companies can register, verify their accounts via email and mobile, post jobs, and send automated emails to candidates. 

## Website Link

The Job Posting Board website is hosted on Render and can be accessed using the following URL:

[Job Posting Board](https://cuvette-job-posting-board.onrender.com)

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/jobboard.git
cd jobboard
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
npm install
```

### 3. Set Up Environment Variables
In the server directory, create a `.env` file with the following variables:

```makefile
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NODEMAILER_EMAIL=<your-nodemailer-email>
NODEMAILER_PASSWORD=<your-nodemailer-password>
TWILIO_ACCOUNT_SID=<your-twilio-account-sid>
TWILIO_AUTH_TOKEN=<your-twilio-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-phone-number>
```

### 4. Run the Application

#### Start Backend

```bash
npm start
```

#### Start Frontend

```bash
cd client
npm start
```

## Objective
To create a job board with the following features:

- **User Registration** for companies with email and mobile OTP verification.
- **Job Posting** for authenticated companies.
- **Email Automation** to notify candidates of new job postings.

## Features

### 1. User Registration (Company)
- Companies can sign up by providing their details (Name, Email, Phone Number, Password, Company Name, and Employee Size).
- Companies must verify their accounts through OTP sent to their Email and Mobile.
- Unverified companies cannot post jobs until they complete the verification process.

### 2. Company Login
- Login system for companies using JWT for authentication.
- After logging in, companies can manage their job postings and profile.

### 3. Job Posting
- Authenticated companies can post jobs with the following details:
    - Job Title
    - Job Description
    - Experience Level
    - Candidate Emails
    - End Date
- Companies can add multiple candidates' emails for job updates.

### 4. Candidate Email Automation
- Companies can send job alerts or updates to candidates via email.
- Email should contain:
    - Job details
    - Sender information
- Nodemailer is used to automate email delivery to the candidates.

### 5. Logout
- Logout functionality that clears JWT tokens or sessions.

### Bonus Features (Optional)
- Implemented custom email templates for personalized candidate experience.
- Companies can send professionally designed email updates to candidates, improving communication.

## Tech Stack Details

### Frontend (React.js)
- **React.js**: A responsive UI with user-friendly forms for registration, login, job postings, and candidate management.
- **React Router**: For navigation between different pages like login, register, job postings, and OTP verification.
- **Axios**: For handling API requests.

### Backend (Node.js & Express.js)
- **Node.js**: Server-side runtime to handle requests and responses.
- **Express.js**: RESTful APIs to handle user authentication, job postings, and email automation.
- **Nodemailer**: For sending automated emails to multiple candidates.

### Database (MongoDB)
- **MongoDB**: Stores company information, job postings, and email logs.

### Authentication
- **JWT (JSON Web Token)**: For session-based authentication and securing protected routes.
- **Bcrypt**: To hash and secure user passwords.


## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new company and send OTP.
- `POST /api/auth/login`: Login for companies and generate JWT.
- `POST /api/auth/verify`: Verify the company via OTP (Email/Mobile).

### Job Posting
- `POST /api/jobs`: Create a new job posting (Protected by JWT).

### Email Automation
- When New Jobs are created automatically the mail will be sent to candidates.

## License
This project is licensed under the MIT License.

## Contact
For any queries or assistance, feel free to reach out via [Your Contact Information].
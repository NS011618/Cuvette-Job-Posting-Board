const host = "https://cuvette-job-posting-board.onrender.com";

export const ApiRoutes = {
    register: `${host}/api/auth/register`,
    login: `${host}/api/auth/login`,
    postJob: `${host}/api/jobs/`, 
    verify: `${host}/api/auth/verify`,    
    user: `${host}/api/auth/user`,
};

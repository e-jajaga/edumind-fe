const API_URL = {
  development: "https://localhost:7238/api/",
  production: "https://your-production-domain.com/api/",
};

const getApiUrl = () => {
  return process.env.NODE_ENV === "production" ? API_URL.production : API_URL.development;
};

export default getApiUrl;

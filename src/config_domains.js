const API_URL = {
  development: "https://localhost:7238/api/ProduktetAPI",
  production: "https://your-production-domain.com/api/ProduktetAPI",
};

const getApiUrl = () => {
  return process.env.NODE_ENV === "production" ? API_URL.production : API_URL.development;
};

export default getApiUrl;

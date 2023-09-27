// constants.js
const prod = {
    url: {
        API_URL: "https://validator.fhir.org",
    }
};
const dev = {
    url: {
        API_URL: "http://0.0.0.0:8082"
    }
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
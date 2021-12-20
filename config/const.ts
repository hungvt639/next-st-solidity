export const BACKEND = process.env.BACKEND || "http://localhost";
export const PORT_BACKEND = process.env.PORT_BACKEND || 3000;
export const BASE_URL = `${BACKEND}:${PORT_BACKEND}`;
export const URL_UPLOAD_FILE =
    process.env.URL_UPLOAD_FILE || "http://localhost:8000/api/image";

export const MONGO_DB =
    process.env.MONGO_DB ||
    "mongodb+srv://hung:Hung12345@cluster0.a7mkf.mongodb.net/dbTest?retryWrites=true&w=majority";

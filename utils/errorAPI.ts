import { message } from "antd";
export default function errorAPI(e: any) {
    if (typeof e.response === "undefined") {
        message.error("Lỗi mạng");
        return;
    }
    message.error(e.response.data.message);
}

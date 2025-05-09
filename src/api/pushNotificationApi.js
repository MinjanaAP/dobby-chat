import axiosInstance from "./axios"

/**
 * * send push notifications to user
 * @param {{ userId: string, title:string, body:string }}
 */
export const sendPushNotification = async (data) => {
    try {
        const response = await axiosInstance.post("/notification/send",data);
        console.log("push-notification send:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending push-notifications:", error);
        throw error;
    }
}
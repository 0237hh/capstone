import axios from "axios";

const token = localStorage.getItem("jwtToken");

const apiClient = axios.create({
    baseURL: `https://iq1g5j62ok.execute-api.us-east-1.amazonaws.com/local`,
    headers: { Authorization: `Bearer ${token}` }
});

// 메시지 조회
export const fetchMessageAPI = async (room_id) => {
    try {
        const response = await apiClient.get(`/read`, {
            params: {room_id}
        });
        return response.data;
    } catch (error) {
        console.log("메시지 불러오기 실패 : ", error.message);
        throw error;
    }
};

// 메시지 전송
export const sendMessageAPI = async (socket, messageData) => {
    try {
        socket.current.send(JSON.stringify(messageData));
        // 파일 메시지 처리
        if (messageData.fileKey) {
            // 파일 메타데이터 확인
            if (!messageData.contentType || !messageData.fileKey) {
                console.error("파일 메타데이터 누락:", messageData);
                return;
            }

            try {
                // HTTP 요청으로 파일 메타데이터 저장
                await apiClient.put("/send", {
                    room_id: String(messageData.room_id),
                    message: messageData.message,
                    timestamp: messageData.timestamp,
                    user_id: messageData.user_id,
                    nickname: messageData.nickname,
                    fileKey: messageData.fileKey,
                    contentType: messageData.contentType,
                    originalFileName: messageData.originalFileName,
                });
            } catch (putError) {
                console.error("파일 메타데이터 저장 실패:", putError.message);
                throw putError;
            }
        }
    } catch (error) {
        console.error("메시지 전송 실패 : ", error.message);
        throw error;
    }
};
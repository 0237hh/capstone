import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

// Chart.js 필수 모듈 등록
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// 감정 메시지 설정
const emotionMessages = {
    "매우 나쁨": "최근 힘든 시간을 보냈어요. 스스로를 돌보는 시간을 가지세요!",
    "나쁨": "조금 우울한 시간이 있었네요. 기분 전환을 해보세요!",
    "보통": "평범한 날들이 많았네요. 특별한 추억을 만들어 보세요!",
    "좋음": "좋은 날이 많았어요! 이런 긍정적인 에너지를 유지하세요!",
    "매우 좋음": "정말 멋진 시간을 많이 보냈어요! 계속 이렇게 행복하길 바라요!",
};

// 초기 감정 데이터
const initialEmotionData = {
    "매우 나쁨": 0,
    "나쁨": 0,
    "보통": 0,
    "좋음": 0,
    "매우 좋음": 0,
};

function EmotionStats() {
    const [emotionData, setEmotionData] = useState(initialEmotionData);
    const [currentChart, setCurrentChart] = useState("bar"); // bar 또는 pie

    // 랜덤 감정 추가 핸들러
    const addRandomEmotion = () => {
        const emotions = Object.keys(emotionData);
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

        // 전체 감정 데이터 업데이트
        const updatedData = { ...emotionData };
        updatedData[randomEmotion] += 1;
        setEmotionData(updatedData);
    };

    // 가장 높은 감정 계산
    const getHighestEmotion = () => {
        const highestEmotion = Object.entries(emotionData).reduce((prev, curr) =>
            curr[1] > prev[1] ? curr : prev
        );
        return highestEmotion[0];
    };

    // 차트 데이터 포맷
    const chartData = {
        labels: ["매우 나쁨", "나쁨", "보통", "좋음", "매우 좋음"],
        datasets: [
            {
                label: "감정 빈도 수",
                data: Object.values(emotionData),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",  // 매우 나쁨
                    "rgba(255, 159, 64, 0.5)",  // 나쁨
                    "rgba(255, 205, 86, 0.5)",  // 보통
                    "rgba(75, 192, 192, 0.5)",  // 좋음
                    "rgba(54, 162, 235, 0.5)",  // 매우 좋음
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>전체 감정 일기장 통계</h2>

            {/* 수치 보여주기 */}
            <div style={{ marginBottom: "20px" }}>
                {Object.entries(emotionData).map(([emotion, count]) => (
                    <p key={emotion}>
                        <strong>{emotion}:</strong> {count} 건
                    </p>
                ))}
            </div>

            {/* 가장 높은 감정 메시지 */}
            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc" }}>
                <h3>전체 결과 메시지</h3>
                <p><strong>{getHighestEmotion()}:</strong> {emotionMessages[getHighestEmotion()]}</p>
            </div>

            {/* 버튼으로 차트 선택 */}
            <div className="button-container">
                <button
                    onClick={() => setCurrentChart("bar")}
                    className="styled-button"
                >
                    막대 그래프
                </button>
                <button
                    onClick={() => setCurrentChart("pie")}
                    className="styled-button"
                >
                    원형 차트
                </button>
                <button
                    onClick={addRandomEmotion}
                    className="styled-button"
                >
                    일기 추가
                </button>
            </div>

            {/* 선택된 차트 보여주기 */}
            {currentChart === "bar" && <Bar data={chartData} />}
            {currentChart === "pie" && <Pie data={chartData} />}
        </div>
    );
}

export default EmotionStats;

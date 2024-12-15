import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import ChatMessages from './ChatMessages.jsx';

const ChatWindow = () => {
    const theme = useTheme();

    // 팀 목데이터
    const teamsMockData = [
        { PK: 'TEAM#1', teamName: '덩민' },
        { PK: 'TEAM#2', teamName: '주뇽' },
        { PK: 'TEAM#3', teamName: '얘디' },
    ];

    const [teams, setTeams] = useState([]);
    const [currentChatRoom, setCurrentChatRoom] = useState(null); // 현재 선택된 채팅방
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 팀 데이터 가져오는 함수 (mock 데이터를 사용하는 경우)
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            try {
                setTeams(teamsMockData);
                if (teamsMockData && teamsMockData.length > 0) {
                    setCurrentChatRoom(teamsMockData[0]); // 첫 번째 팀을 기본값으로 설정
                } else {
                    setCurrentChatRoom(null);
                }
                setIsLoading(false);
            } catch (e) {
                setError('팀 데이터를 불러오는 중 오류가 발생했습니다.');
                setIsLoading(false);
            }
        }, 1000); // 1초 지연 후 데이터 로드 (모의 네트워크 요청 시뮬레이션)
    }, []);

    const handleChatRoomSelect = (team) => {
        if (currentChatRoom?.id !== team.PK) {
            setCurrentChatRoom({ id: team.PK, teamName: team.teamName });
        }
    };

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                padding: '13px',
                display: 'flex',
                flexDirection: 'column',
                height: '97vh',
                backgroundColor: '#f7f7f7',
            }}
        >
            {isLoading ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" color={theme.palette.text.secondary}>
                        대화 목록을 불러오는 중 ...
                    </Typography>
                </Box>
            ) : error ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" color={theme.palette.error.main}>
                        {error}
                    </Typography>
                </Box>
            ) : teams.length === 0 ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" color={theme.palette.text.secondary}>
                        현재 가입된 팀이 없습니다. 팀에 가입해주세요!
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            height: '60px',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            padding: '12px',
                            borderBottom: '2px solid #ddd',
                            marginBottom: '12px',
                        }}
                    >
                        {teams.map((team, index) => (
                            <Button
                                key={index}
                                onClick={() => handleChatRoomSelect(team)}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    padding: '0.5rem 1rem',
                                    backgroundColor: currentChatRoom?.id === team.PK ? '#d7bce8' : '#fff',
                                    color: currentChatRoom?.id === team.PK ? '#6a1b9a' : '#424242',
                                    borderRadius: '12px',
                                }}
                            >
                                {team.teamName}
                            </Button>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            padding: '0rem',
                            backgroundColor: '#ffffff',
                            borderRadius: 3,
                        }}
                    >
                        {currentChatRoom ? (
                            <ChatMessages currentChatRoom={{ id: currentChatRoom.id, teamName: currentChatRoom.teamName }} />
                        ) : (
                            <Typography variant="h6" color={theme.palette.text.secondary}>
                                채팅방을 선택해주세요.
                            </Typography>
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ChatWindow;

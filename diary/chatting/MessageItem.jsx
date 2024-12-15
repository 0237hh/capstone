import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import { useMediaQuery, useTheme } from '@mui/material';

const MessageItem = ({ message, onEditMessage, currentUser}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isEditing, setIsEditing] = useState(false);

    const isCurrentUser = currentUser === message.nickname;

    const getInitials = (nickname) => {
        return nickname ? nickname.split(" ").map((word) => word[0]).join("").toUpperCase() : "U";
    };

    const getAvatarColor = (nickname) => {
        const colors =
            ['#FF80AB', '#FF8A80', '#EA80FC', '#8C9EFF',
                '#80D8FF', '#A7FFEB', '#CCFF90', '#FFD180',
                '#e57373', '#f06292', '#ba68c8', '#7986cb',
                '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac',
                '#81c784', '#aed581', '#dce775', '#fff176',
                '#ffd54f', '#ffb74d', '#ff8a65', '#a1887f'];
        const index = nickname ? nickname.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    return (
        <div
            className="message-item"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: isSmallScreen ? '0.4rem' : '0.8rem',
                borderRadius: '8px',
                backgroundColor: isEditing ? '#ffffff' : '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                marginBottom: '1rem',
                maxWidth: isSmallScreen ? '100%' : '95%',
                width: '100%',
                wordBreak: 'break-word',
            }}
        >
            {/* 아바타 및 유저 정보 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '0.8rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#333', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                    {message.nickname}
                </span>
                <Avatar sx={{ bgcolor: getAvatarColor(message.nickname)}}>
                    {getInitials(message.nickname)}
                </Avatar>
            </div>

            {/* 메시지 내용 */}
            <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem' }}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <div>{message.message}</div>
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
import React from 'react';

export const messages = [
    {
        id: 'BEGINNING',
        preview: 'Шановний абітурієнте! Запрошуємо до вступної кампанії нашого університету. Перелік документів, необхідних для вступу наведений нижче',
        text: <div>Шановний абітурієнте! Запрошуємо до вступної кампанії нашого університету. Перелік документів, необхідних для вступу наведений нижче</div>,
        theme: 'Вступ до ВНЗ "ПДТУ"',
        date: '02.07.18',
        sender: 'ПДТУ',
        isRead: true,

        stateKey: 'Intro'
    },
    {
        id: 'REGISTRATION',
        preview: '',
        text: 'фывфывфыв',
        theme: 'фівфіваіва',
        date: '23123123',
        sender: 'пту',
        isRead: true,

        stateKey: 'Browser'
    },
    {
        id: 'ENTRANCE',
        preview: '',
        text: 'фывфывфыв',
        theme: 'фівфіваіва',
        date: '23123123',
        sender: 'пту',
        isRead: true,

        stateKey: '?'
    },
    {
        id: 'CONGRATULATIONS',
        preview: '',
        text: 'фывфывфыв',
        theme: 'фівфіваіва',
        date: '23123123',
        sender: 'пту',
        isRead: true,

        stateKey: '?'
    },
];

export function getMessagesForState(stateKey, stateKeys) {
    let index = stateKeys.indexOf(stateKey);
    let prevStateKeys = stateKeys.slice(0, index);

    return messages.filter(message => prevStateKeys.some(key => message.stateKey === key));
}
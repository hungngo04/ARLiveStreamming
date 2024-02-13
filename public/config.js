const ICE_SERVERS_CONFIG = {
    iceServers: [
        { urls: 'stun:stun.relay.metered.ca:80' },
        {
            urls: 'turn:standard.relay.metered.ca:80',
            username: 'e895289229ed5785a54d4563',
            credential: 'Idc7Fod2IN9ZY1JH'
        },
        {
            urls: "turn:standard.relay.metered.ca:80?transport=tcp",
            username: "e895289229ed5785a54d4563",
            credential: "Idc7Fod2IN9ZY1JH",
        },
        {
            urls: "turn:standard.relay.metered.ca:443",
            username: "e895289229ed5785a54d4563",
            credential: "Idc7Fod2IN9ZY1JH",
        },
        {
            urls: "turns:standard.relay.metered.ca:443?transport=tcp",
            username: "e895289229ed5785a54d4563",
            credential: "Idc7Fod2IN9ZY1JH",
        },
    ],
};

export { ICE_SERVERS_CONFIG };

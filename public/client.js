import { ICE_SERVERS_CONFIG } from './config.js';

const videoElement = document.getElementById('webcamVideo');
const remoteVideo = document.getElementById('remoteVideo');
const videoTexture = document.querySelector("#videoTexture");

// Initialize socket connection
const socket = io();

// Initialize peer connection
const peerConnection = setupPeerConnection();

// Check if an user is a streamer or a viewer
isStreamerCheck();

// Start the webcam
startWebcam();

function isStreamerCheck() {
    window.onload = function() {
        const isStreamer = confirm("Are you a streamer?");
        if (isStreamer) {
          const aVideo = document.querySelector('a-video');
          if (aVideo) aVideo.setAttribute('visible', 'false');
        }
    };
}

function setupPeerConnection() {
    const pc = new RTCPeerConnection(ICE_SERVERS_CONFIG);

    pc.onicecandidate = event => {
        if (event.candidate) {
            console.log('Sending ICE candidate', event.candidate);
            socket.emit('candidate', event.candidate);
        }
    };

    pc.ontrack = event => {
        const [remoteStream] = event.streams;
        remoteVideo.srcObject = remoteStream;
        videoTexture.srcObject = remoteStream;
    };

    setupSocketHandlers(pc);

    return pc;
}

function setupSocketHandlers(pc) {
    socket.on('answer', async (answer) => {
        const remoteDesc = new RTCSessionDescription(answer);
        await pc.setRemoteDescription(remoteDesc);
    });

    socket.on('offer', async (offer) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', answer);
    });

    socket.on('candidate', async (candidate) => {
        try {
            await pc.addIceCandidate(candidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }
    });

    socket.on('initiateCall', (initiate) => {
        if (initiate) {
            createOffer(pc);
        }
    });
}

async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    } catch (error) {
        console.error('Error accessing the webcam', error);
    }
}

async function createOffer(pc) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log('Sending offer', offer);
    socket.emit('offer', offer);
}

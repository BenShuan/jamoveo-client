import { io } from 'socket.io-client';

export const socket = io("wss://immense-bayou-69622-27b3bda0f510.herokuapp.com",{
  transports: ['websocket', 'polling', 'flashsocket'],
  forceNew: true,
  reconnectionAttempts: 3,
  timeout: 2000,
});
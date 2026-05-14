'use client';

import React from 'react';
import io, { Socket } from 'socket.io-client';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface SocketContextType {
  socket: Socket | null;
  isSocketReady: boolean;
  onlineUsers: string[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SocketContext = React.createContext<SocketContextType | undefined>(
  undefined,
);

export const useSocket = (): SocketContextType => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = React.useState(false);
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (user?.id && apiUrl) {
      const newSocket = io(apiUrl, { query: { id: user.id } });
      setSocket(newSocket);
    }
  }, [user?.id]);

  React.useEffect(() => {
    if (socket) {
      socket.on('roomJoined', () => {
        setIsSocketReady(true);
      });

      socket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('roomJoined');

        socket.off('getOnlineUsers');

        socket.disconnect();
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isSocketReady,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

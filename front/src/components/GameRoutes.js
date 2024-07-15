import { Outlet } from 'react-router-dom';
import { SocketProvider } from "./SocketContext";
import { GameProvider } from "./GameContext";

const GameRoutes = () => {
    return (
        <SocketProvider>
            <GameProvider>
                <Outlet />
            </GameProvider>
        </SocketProvider>
    );
};

export default GameRoutes

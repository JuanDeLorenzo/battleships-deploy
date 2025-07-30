import {UserButton, useUser, useAuth} from "@clerk/clerk-react";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerHistoryTable } from "./PlayerHistoryTable";
import {PlayerPieChart} from "./PieChart";
import AccuracyChart from "./AccuracyChart";

const HomeScreen = () => {
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const { signOut, getToken } = useAuth();

    // Fetch game data for all components
    useEffect(() => {
        if (user?.emailAddresses?.[0]?.emailAddress) {
            fetchGameData();
        }
    }, [user]);

    const fetchGameData = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/player-history/${user.emailAddresses[0].emailAddress}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch game data');
            }

            const data = await response.json();
            setGameData(data);
        } catch (err) {
            console.error('Error fetching game data:', err);
            setGameData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRandomMatchClick = () => {
        console.log('Random match button clicked!')
        setShowElements(false);
        navigate('/random-match-making')
    };

    const handleCreateGameClick = () => {
        console.log('Create game button clicked!')
        // TODO: Navigate to create game page
    };

    const handleJoinGameClick = () => {
        console.log('Join game button clicked!')
        // TODO: Navigate to join game page
    };

    return (
        <>
            {showElements ? (
                <div className="HomeScreen">
                    {/* Navbar */}
                    <div className="Navbar">
                        <div className="NavbarLeft">
                            <h1 className="NavbarTitle">Battleships</h1>
                        </div>
                        <div className="NavbarRight">
                            <div>
                                <div className="UserButtonImage">
                                    <UserButton afterSignOutUrl={"/"} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="MainContent">
                        {/* Button Row */}
                        <div className="ButtonRow">
                            <div className="HomeScreenButton disabled" onClick={handleCreateGameClick}>
                                <h2>Create Game</h2>
                            </div>
                            <div className="HomeScreenButton disabled" onClick={handleJoinGameClick}>
                                <h2>Join Game</h2>
                            </div>
                            <div className="HomeScreenButton" onClick={handleRandomMatchClick}>
                                <h2>Random Match</h2>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="ChartsRow">
                            <div className="ChartContainer">
                                <div className="ChartTitle">W/L Ratio</div>
                                <PlayerPieChart gameData={gameData} />
                            </div>
                            <div className="ChartContainer">
                                <AccuracyChart gameData={gameData} />
                            </div>
                        </div>

                        {/* History Row */}
                        <div className="HistoryRow">
                            <PlayerHistoryTable gameData={gameData} loading={loading} />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default HomeScreen
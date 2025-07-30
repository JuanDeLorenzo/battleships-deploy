import "./PlayerHistoryTable.css"
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from "@mui/material";
import { useUser } from "@clerk/clerk-react";

export const PlayerHistoryTable = ({ gameData, loading }) => {
    const { user } = useUser();

    // Transform the data to match the table structure
    const transformGameData = (data) => {
        if (!data || !Array.isArray(data)) return [];
        
        // Get only the last 10 games
        const last10Games = data.slice(-10);
        
        return last10Games.map((game, index) => {
            const isPlayer1 = game.player1_id === user.emailAddresses[0].emailAddress;
            const opponentId = isPlayer1 ? game.player2_id : game.player1_id;
            const accuracy = isPlayer1 ? game.accuracy_player1 : game.accuracy_player2;

            let matchResult = 'Abandoned';
            if (game.winner_id === user.emailAddresses[0].emailAddress) {
                matchResult = 'Win';
            } else if (!game.abandoned && game.winner_id) {
                matchResult = 'Lose';
            }

            return {
                id: index + 1,
                email: opponentId || 'Unknown Player',
                MatchResult: matchResult,
                Date: new Date(game.game_date).toLocaleDateString(),
                Time: formatDuration(game.game_duration),
                Accuracy: accuracy ? Number(accuracy).toFixed(2) : '0.00'
            };
        });
    };

    const formatDuration = (duration) => {
        if (!duration) return '0:00:00';
        const hours = duration.hours || 0;
        const minutes = duration.minutes || 0;
        const seconds = duration.seconds || 0;
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const gameHistory = transformGameData(gameData);
    const columnWidths = ['45%', '10%', '20%', '15%', '10%'];

    return (
        <TableContainer className="tableContainer">
            <Table aria-label='history table' className="table">
                <TableHead>
                    <TableRow>
                        {['Rival Player', 'Game Result', 'Date', 'Game Duration', 'Accurracy (%)'].map((header, index) => (
                            <TableCell
                                key={header}
                                sx={{
                                    fontFamily: 'Keania One',
                                    backgroundColor: '#D9D9D9',
                                    fontWeight: 'bold',
                                    color: '#000',
                                    textAlign: 'center',
                                    borderBottom: '1px solid #B0B0B0',
                                    fontSize: '14px',
                                    padding: '10px',
                                    width: columnWidths[index]
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>
                                <div className="loadingSpinner"></div>
                            </TableCell>
                        </TableRow>
                    ) : gameHistory.length > 0 ? (
                        gameHistory.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#B0B0B0' },
                                        '&:last-child td, &:last-child th' : { border: 0 } }}
                                >
                                    <TableCell className="tableCell">{row.email}</TableCell>
                                    <TableCell className="tableCell">{row.MatchResult}</TableCell>
                                    <TableCell className="tableCell">{row.Date}</TableCell>
                                    <TableCell className="tableCell">{row.Time}</TableCell>
                                    <TableCell className="tableCell">{row.Accuracy}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                                No game history found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
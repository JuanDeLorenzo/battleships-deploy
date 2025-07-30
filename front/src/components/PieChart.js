import {PieChart} from '@mui/x-charts/PieChart';

const PIE_COLORS = [
    'white', // Victory
    'black', // Loss
    '#808080' // Abandoned
];
const PIE_LABELS = ['Victory', 'Loss', 'Abandoned'];

export function PlayerPieChart({ gameData }){
    // Calculate W/L data from gameData
    const calculateWLData = (data) => {
        if (!data || !Array.isArray(data)) {
            return [
                { id: 0, value: 20, color: PIE_COLORS[0], label: PIE_LABELS[0] },
                { id: 1, value: 15, color: PIE_COLORS[1], label: PIE_LABELS[1] },
                { id: 2, value: 10, color: PIE_COLORS[2], label: PIE_LABELS[2] },
            ];
        }

        let wins = 0, losses = 0, abandoned = 0;
        data.forEach(game => {
            if (game.winner_id === gameData[0]?.player1_id) {
                wins++;
            } else if (!game.abandoned && game.winner_id) {
                losses++;
            } else {
                abandoned++;
            }
        });

        return [
            { id: 0, value: wins, color: PIE_COLORS[0], label: PIE_LABELS[0] },
            { id: 1, value: losses, color: PIE_COLORS[1], label: PIE_LABELS[1] },
            { id: 2, value: abandoned, color: PIE_COLORS[2], label: PIE_LABELS[2] },
        ];
    };

    const pieData = calculateWLData(gameData);

    return(
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <div style={{ minWidth: 350, minHeight: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PieChart
                        series={[
                            {
                                data: pieData,
                            },
                        ]}
                        slotProps={{
                            legend: {
                                hidden: true
                            }
                        }}
                        width={350}
                        height={350}
                    />
                </div>
                <div style={{ marginLeft: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {pieData.map((item, idx) => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', fontFamily: 'Keania One, sans-serif', fontSize: 20, color: 'black' }}>
                            <span style={{
                                display: 'inline-block',
                                width: 22,
                                height: 22,
                                background: item.color,
                                border: '1px solid #000',
                                marginRight: 12
                            }}></span>
                            {item.label}: {item.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
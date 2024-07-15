import { UserButton } from "@clerk/clerk-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(true);

    const handleRandomMatchClick = () => {
        console.log('Random match button clicked!')
        setShowElements(false);
        navigate('/random-match-making')
    };

    // const handleMatchClick = () =>{
    //     console.log('Random match button clicked!')
    //     setShowElements(false);
    //     navigate('/chat')
    // }


    return (<>
            {showElements? (
                <div className="HomeScreen">
                    <div className="Dashboard">
                        <div className="UserButton">
                            <UserButton />
                        </div>
                    </div>

                    <div className="HomeScreenMenu">
                        <div className="HomeScreenButton" onClick={handleRandomMatchClick}>
                            <h2>Random Match</h2>
                        </div>

                        {/*<div className="HomeScreenButton" onClick={handleMatchClick}>*/}
                        {/*    <h2>Match With Player</h2>*/}
                        {/*</div>*/}
                    </div>
                </div>
            ) : null}
        </>
    );
}


export default HomeScreen
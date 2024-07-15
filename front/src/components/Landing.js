import {SignInButton} from "@clerk/clerk-react";



const landingScreen = () => {
    return <div className="LandingScreen">
        <h1>Battleships</h1>
        <SignInButton>
            <button>Log in</button>
        </SignInButton>
    </div>
}

export default landingScreen
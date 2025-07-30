import {SignInButton, useAuth, useUser} from "@clerk/clerk-react";

const LandingScreen = () => {

    return <div className="LandingScreen">
        <h1>Battleships</h1>
        <SignInButton>
            <button>Log in</button>
        </SignInButton>
    </div>
}

export default LandingScreen
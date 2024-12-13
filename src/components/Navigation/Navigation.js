import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isSignedIn ? (
                <p
                    onClick={() => onRouteChange('signout')}
                    className="f3 link dim black pa3 pointer">
                    Log Out
                </p>
            ) : (
                <p
                    onClick={() => onRouteChange('signin')}
                    className="f3 link dim black pa3 pointer">
                    Log In
                </p>
            )}
        </nav>
    );
};

export default Navigation;

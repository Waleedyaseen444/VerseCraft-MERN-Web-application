import React, { useEffect, useState } from 'react';
import './splashscreen.css';

const SplashScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading time before transitioning to the main app
        const timer = setTimeout(() => {
            setLoading(false);
        }, 8000); // Change this duration as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="splash-screen">
                <div className="splash-dna-animation">
                    {/* First set of circles */}
                    {[...Array(20)].map((_, index) => (
                        <div key={`set1-${index}`} className={`splash-circle circle-${index + 1} set1`}></div>
                    ))}
                    {/* Second set of circles */}
                    {[...Array(20)].map((_, index) => (
                        <div key={`set2-${index}`} className={`splash-circle circle-${index + 1} set2`}></div>
                    ))}
                </div>
            </div>
        );
    }

    // Render the main app or next component here after loading
    return (
        <div className="splash-main-app">
            {/* Your main application components go here */}
        </div>
    );
};

export default SplashScreen;

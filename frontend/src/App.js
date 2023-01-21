// Packages
import React from "react";

// Images
import TestImage from "./assets/test.png";

// The main React App component
const App = () => {
    return (
        <div>
            <img className="test-image" src={TestImage} alt="Test" />
            <h1>Nice! 😎</h1>
            <p>
                Things are working! To start customizing this project, change
                the contents of <code>App.js!</code>
            </p>
        </div>
    );
};

export default App;

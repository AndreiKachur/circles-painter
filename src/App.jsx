import { useState } from 'react';
import "./styles/app.scss"
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

const App = () => {
    const [width, setWidth] = useState(700)
    const [height, setHeight] = useState(500)

    const setCanvaSize = size => {
        switch (size) {
            case 'small':
                setWidth(600)
                setHeight(400)
                return
            case 'middle':
                setWidth(700)
                setHeight(500)
                return
            case 'large':
                setWidth(900)
                setHeight(550)
                return
            default: return
        }
    }

    return (
        <div className="app">
            <Toolbar setCanvaSize={setCanvaSize} />
            <Canvas width={width} height={height} />
        </div>
    );
};

export default App;

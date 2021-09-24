import "./styles/app.scss"
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

const App = () => {

    return (
        <div className="app">
            <Toolbar />
            <Canvas />
        </div>
    );
};

export default App;

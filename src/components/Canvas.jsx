import React, { useEffect, useRef } from 'react';
import "../styles/canvas.scss"
import { observer } from "mobx-react-lite";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={700} height={500} />
        </div>
    );
});

export default Canvas;

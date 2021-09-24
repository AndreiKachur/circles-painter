import React, { useEffect, useRef } from 'react';
import "../styles/canvas.scss"
import { observer } from "mobx-react-lite";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        toolState.setTool(new Brush(canvasRef.current))
    }, [canvasState.width]) // eslint-disable-line

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={canvasState.width} height={canvasState.height} />
        </div>
    );
});

export default Canvas;

import React, { useEffect, useRef } from 'react';
import "../styles/canvas.scss"
import { observer } from "mobx-react-lite";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(({ width, height }) => {
    const canvasRef = useRef()

    useEffect(() => {
        toolState.setTool(new Brush(canvasRef.current))
    }, [width])

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={width} height={height} />
        </div>
    );
});

export default Canvas;

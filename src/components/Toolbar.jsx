import React from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import { AiOutlineClear } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'

const Toolbar = () => {

    const changeColor = e => {
        toolState.setColor(e.target.value)
    }
    const onFill = e => {
        toolState.setFill(e.target.checked)
    }
    const onStroke = e => {
        toolState.setStroke(e.target.checked)
    }
    const onCenter = e => {
        toolState.setCenter(e.target.checked)
    }
    const onAutoClean = e => {
        toolState.setAutoClean(e.target.checked)
    }
    const onClean = () => {
        const canvas = toolState.tool.ctx.canvas
        toolState.tool.ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    const download = () => {
        const canvas = toolState.tool.ctx.canvas
        const dataUrl = canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = "My picture.jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    const checkBoxes = [
        ['Заливка', 'fill', onFill, false],
        ['Обводка', 'stroke', onStroke, true],
        ['Показать центр', 'center', onCenter, false],
        ['Авто очистка', 'auto-clean', onAutoClean, false]
    ]

    return (
        <div className="toolbar">
            <div className='toolbar__item'>
                <label htmlFor="line-width" className='toolbar__label'>
                    Толщина линии:
                </label>
                <input
                    onChange={e => toolState.setLineWidth(e.target.value)}
                    style={{ width: 40 }}
                    id="line-width"
                    type="number" defaultValue={2} min={1} max={50} />
            </div>

            <div className='toolbar__item'>
                <label htmlFor="stroke-color" className='toolbar__label'>
                    Цвет:
                </label>
                <input
                    onChange={e => changeColor(e)}
                    id="stroke-color" type="color" defaultValue="#445a72" />
            </div>

            {checkBoxes.map(item => {
                return (
                    <div key={item[1]} className='toolbar__item'>
                        <label htmlFor={item[1]} className='toolbar__label'>
                            {item[0]}
                        </label>
                        <input id={item[1]}
                            defaultChecked={item[3]}
                            type="checkbox"
                            onClick={item[2]} />
                    </div>
                )
            })}

            <button className='toolbar__btn' onClick={onClean} >
                <AiOutlineClear className='toolbar__icons' />
               очистить
            </button>

            <button className='toolbar__btn' onClick={download} >
                <BsDownload className='toolbar__icons' />
                скачать
            </button>
        </div>
    );
};

export default Toolbar;

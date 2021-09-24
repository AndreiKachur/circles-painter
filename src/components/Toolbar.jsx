import React from 'react';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import { AiOutlineClear } from 'react-icons/ai'
import { BsDownload } from 'react-icons/bs'
import { InputNumber, Select, Radio } from 'antd';
import '../styles/toolbar.scss'
import 'antd/dist/antd.css';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

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
    const chooseBrush = value => {
        toolState.setBrush(value)
    }
    const setCanvaSize = size => {
        canvasState.setCanvaSize(size)
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
        <div className='toolbar__wrapper'>

            <div className="toolbar">
                <div className='toolbar__item'>
                    <label htmlFor="line-width" className='toolbar__label'>
                        Толщина линии:
                    </label>
                    <InputNumber
                        defaultValue={2} min={1} max={50}
                        style={{ width: 60 }}
                        id="line-width"
                        onChange={value => toolState.setLineWidth(value)} />
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
            </div>

            <div className="toolbar">
                <div className='toolbar__item'>
                    <label htmlFor="toolbar__brush" className='toolbar__label'>
                        Кисть:
                    </label>
                    <Select defaultValue="circle" style={{ width: 100 }}
                        onChange={chooseBrush}>
                        <Option value='circle'>круг</Option>
                        <Option value='square'>квадрат</Option>
                        <Option value='paint'>кисть</Option>
                    </Select>
                </div>

                <div className='toolbar__item'>
                    <label htmlFor="toolbar__sizes" className='toolbar__label'>
                        Размер холста:
                    </label>
                    <Radio.Group
                        defaultValue='middle'
                        onChange={e => setCanvaSize(e.target.value)}
                        id="toolbar__sizes">
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="middle">Middle</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </div>

                <button className='toolbar__btn' onClick={onClean} >
                    <AiOutlineClear className='toolbar__icons' />
                    очистить
                </button>

                <button className='toolbar__btn' onClick={download} >
                    <BsDownload className='toolbar__icons' />
                    скачать
                </button>
            </div>
        </div>
    );
};

export default Toolbar;

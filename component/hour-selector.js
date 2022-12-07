import css from './hour-selector.module.css'

const HourSelector = ({ id, timeValue, fnUpdateSelection }) => {

    return (
        <div className={css.selector}>
            <input type="time"
                id={id}
                value={timeValue}
                // onChange={(text) => handleStartTimeChange(text.target.value)}></input>
                onChange={(text) => fnUpdateSelection(text.target.value)}></input>
        </div>
    )
}

export default HourSelector
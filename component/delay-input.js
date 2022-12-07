import css from './delay-input.module.css'

const DelayInput = ({ id, delayValue, fnUpdateSelection }) => {

    return (
        <div className={css.selector}>
            <input type="number"
                id={id}
                value={delayValue}
                min="0"
                max="24"
                step="1"
                onChange={(text) => fnUpdateSelection(text.target.value)}></input>
        </div>
    )
}

export default DelayInput
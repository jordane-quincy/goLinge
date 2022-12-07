import css from './subtitle.module.css'

const Subtitle = ({ text }) => {
    return (
        <div>
            <h2 className={css.subtitle}>{text}</h2>
        </div>
    )
}

export default Subtitle
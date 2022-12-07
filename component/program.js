import css from './program.module.css'

const Program = (data) => {
    return (
        <div className={css.program}>
            <div>Fin à {data.temperature}</div>
            <div>{data.duration}</div>
            <div>Synthétique</div>
            <div>30°</div>
        </div>
    )
}

export default Program
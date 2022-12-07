import DelayInput from '../component/delay-input'
import HourSelector from '../component/hour-selector'
import Subtitle from '../component/subtitle'
import Title from '../component/title'
import Program from '../component/program'


import React, { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import isTomorrow from 'dayjs/plugin/isTomorrow';

export async function getStaticProps() {
    const programs =
        [
            {
                duration: "1h30",
                name: "Synthétique",
                temperature: "30°C"
            },
            {
                duration: "1h",
                name: "Cotton",
                temperature: "60°C"
            },
        ]

    console.log("programs:", programs)

    return {
        props: {
            programs
        }
    }
}

const Home = ({ programs }) => {

    const currDate = dayjs(new Date());

    const currTime = currDate.format("HH:mm");

    let [startTimeFormatted, setStartTime] = useState(currTime);
    const handleStartTimeChange = (textTime) => {

        startTimeFormatted = textTime;

        console.log("handleStartTimeChange from home", startTimeFormatted);

        updateEndTime();

        setStartTime(startTimeFormatted);
    }

    const defaultDurationTime = "01:30"; // FIXME: arbitrary magic number, export default duration to a config file or whatever

    let [durationFormatted, setDuration] = useState(defaultDurationTime);
    const handleDurationChange = (textTime) => {

        durationFormatted = textTime;

        console.log("durationFormatted from home", durationFormatted);

        updateEndTime();

        setDuration(durationFormatted);
    }

    let [tomorrowFormatted, setTomorrow] = useState();
    let [endTimeFormatted, setEndTime] = useState();
    const updateEndTime = () => {

        dayjs.extend(isTomorrow);

        const startDate = dayjs(new Date());

        const [startDateHours, startDateMinutes] = startTimeFormatted.split(":"); // FIXME : weak parsing
        console.log("startDateHours", startDateHours, "startDateMinutes", startDateMinutes);

        startDate = startDate.set("hour", startDateHours).set("minute", startDateMinutes);

        console.log("startDate is now:", startDate);

        let endDate = dayjs(startDate);

        endDate = endDate.add(delayFormatted, "hour");


        const [durationHours, durationeMinutes] = durationFormatted.split(":"); // FIXME : weak parsing

        endDate = endDate.add(durationHours, "hour").add(durationeMinutes, "minutes");

        console.log("endDate is now:", endDate);

        endTimeFormatted = endDate.format("HH:mm");

        console.log("endTimeFormatted", endTimeFormatted);

        setTomorrow(undefined); //clean any previous state
        if (endDate.isTomorrow()) {
            setTomorrow("demain"); //FIXME: i18n
            console.log("endDate isTomorrow");
        }

        setEndTime(endTimeFormatted);
    }

    let [delayFormatted, setDelay] = useState(0);

    const handleDelayChange = (textTime) => {

        delayFormatted = textTime;

        console.log("delayFormatted", delayFormatted);

        updateEndTime();

        setDelay(delayFormatted);
    }

    useEffect(() => {
        updateEndTime();
    }, [])

    return (
        <div>
            <React.StrictMode>
                <Title />

                <div>
                    <label htmlFor="startTime">
                        Modifier l&apos;heure de démarrage
                    </label>
                    <HourSelector id="startTime" timeValue={startTimeFormatted} fnUpdateSelection={handleStartTimeChange} />
                </div>
                {/* <div>
                    <div>
                        Modifier l'heure de démarrage
                    </div>
                    <HourSelector timeValue={startTimeFormatted} fnUpdateSelection={handleStartTimeChange} />
                </div> */}

                {/* <Subtitle text={"Mes programmes habituels"} />

                <Program data={programs[0]} />
                <Program /> */}

                <Subtitle text={"Programme sur-mesure"} />

                <div>
                    <label htmlFor="duration">
                        Durée du programme sur-mesure
                    </label>
                    <HourSelector id="duration" timeValue={durationFormatted} fnUpdateSelection={handleDurationChange} />
                </div>

                <div>
                    <label htmlFor="delay">Départ différé dans </label><DelayInput id="delay" delayValue={delayFormatted} fnUpdateSelection={handleDelayChange} /> heures
                </div>

                <div id="endTime">
                    Fin du programme {tomorrowFormatted} à {endTimeFormatted}
                </div>
            </React.StrictMode>
        </div>
    )
}

export default Home
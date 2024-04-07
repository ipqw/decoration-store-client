"use client";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
    time: number;
}

const Timer: FC<IProps> = ({ time }) => {
    const expiresIn = time - Date.now();
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    useEffect(() => {
        setDays(Math.floor(expiresIn / 86400000));
        setHours(Math.floor((expiresIn % 86400000) / 3600000));
        setMinutes(Math.floor((expiresIn % 3600000) / 60000));
        setSeconds(Math.floor((expiresIn % 60000) / 1000));
    }, [expiresIn]);
    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds === 0) {
                setSeconds(59);
                if (minutes === 0) {
                    setMinutes(59);
                    if (hours === 0) {
                        setHours(23);
                        setDays(days - 1);
                    } else {
                        setHours(hours - 1);
                    }
                } else {
                    setMinutes(minutes - 1);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    });
    return (
        <Wrapper>
            <TimerBlock>
                <TimerDisplay>
                    <TimerDisplayText>{days}</TimerDisplayText>
                </TimerDisplay>
                <TimerBlockText>Days</TimerBlockText>
            </TimerBlock>
            <TimerBlock>
                <TimerDisplay>
                    <TimerDisplayText>{hours}</TimerDisplayText>
                </TimerDisplay>
                <TimerBlockText>Hours</TimerBlockText>
            </TimerBlock>
            <TimerBlock>
                <TimerDisplay>
                    <TimerDisplayText>{minutes}</TimerDisplayText>
                </TimerDisplay>
                <TimerBlockText>Minutes</TimerBlockText>
            </TimerBlock>
            <TimerBlock>
                <TimerDisplay>
                    <TimerDisplayText>{seconds}</TimerDisplayText>
                </TimerDisplay>
                <TimerBlockText>Seconds</TimerBlockText>
            </TimerBlock>
        </Wrapper>
    );
};
const TimerBlockText = styled.p`
    color: #6c7275;
    font-size: 12px;
    font-family: "Inter", sans-serif;
    line-height: 20px;
    font-weight: 400;
`;
const TimerDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 60px;
    background-color: #f3f5f7;
    padding: 0 5px;
`;
const TimerDisplayText = styled.p`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 34px;
    line-height: 38px;
    color: #141718;
`;
const TimerBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    column-gap: 16px;
`;

export default Timer;

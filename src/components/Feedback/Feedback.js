import { FeedbackWrapper} from "./Feedback.styled";
import { Statistics } from "../Statistic/Statistic";
import { Section } from "../Section/Section";
import { Notification } from "../Notification/Notification";
import { FeedbackOptions } from "components/FeedbackOptions/FeedbackOptions";

import {useState} from "react";

export const Button = ({onUpdate, value}) => {
    return <button onClick={onUpdate}>{value}</button>
}

export const Feedback = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const onLeaveFeedback = option => {
        switch (option) {
          case 'good':
            setGood(prevGood => prevGood + 1);
            break;
          case 'neutral':
            setNeutral(prevNeutral => prevNeutral + 1);
            break;
          case 'bad':
            setBad(prevBad => prevBad + 1);
            break;
          default:
            return;
        }
      };

    const countTotalFeedback = () => {
        return good + neutral + bad;
    }

    const countPositiveFeedbackPercentage = () => {
        const total = countTotalFeedback();
        if (total === 0) {
          return 0; 
        }
        return Math.round((good / total) * 100);
    }

        const total = countTotalFeedback();
        const positive = countPositiveFeedbackPercentage();

        return(
            <FeedbackWrapper>
                <Section title = "Please leave feedback">
                <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={onLeaveFeedback}/>
                </Section>
                
                <Section title = "Statistics">
                    {total > 0 ? 
                    <Statistics good={good} neutral={neutral} bad={bad} total={total} positive={positive} /> :
                    <Notification message = "There is no feedback..."/>}
                </Section>
            </FeedbackWrapper>
        )
    }
import React from "react";
import Answer from "./Answer";
import Question from "./Question";

export default function Quiz(props) {
  function toggleSelected(id, questionId) {
    if (props.isCheckingAnswer) return;
    props.setQuizes((prevQuizes) =>
      prevQuizes.map((quiz) => {
        if (quiz.id === questionId) {
          return {
            ...quiz,
            answers: quiz.answers.map((answer) => {
              if (answer.id === id) {
                return { ...answer, isSelected: !answer.isSelected };
              } else {
                return { ...answer, isSelected: false };
              }
            }),
          };
        } else {
          return quiz;
        }
      })
    );
  }

  return (
    <div className="quiz">
      <Question id={props.id} question={props.question} />
      <div className="answers">
        {props.answers.map((answer) => {
          return (
            <Answer
              key={answer.id}
              id={answer.id}
              answer={answer.answer}
              isCorrect={answer.isCorrect}
              isSelected={answer.isSelected}
              toggleSelected={() => toggleSelected(answer.id, props.id)}
              isCheckingAnswer={props.isCheckingAnswer}
            />
          );
        })}
      </div>
    </div>
  );
}

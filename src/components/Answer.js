import React from "react";

export default function Answer(props) {
  const defaultStyle = {
    backgroundColor: "transparent",
    color: "#293264",
    border: "1px solid #4D5B9E",
  };

  const selectedStyle = {
    backgroundColor: "#D6DBF5",
    border: "1px solid #D6DBF5",
  };

  const checkedStyle = {
    opacity: "0.5",
    color: "#293264",
    border: "1px solid #4D5B9E",
  };

  const correctAnswerStyle = {
    opacity: "1",
    backgroundColor: "#94D7A2",
    border: "1px solid #94D7A2",
  };

  const falseAnswerStyle = {
    opacity: "0.5",
    backgroundColor: "#F8BCBC",
    border: "1px solid #F8BCBC",
  };

  return (
    <div
      className="answer"
      style={
        props.isCheckingAnswer
          ? props.isCorrect
            ? correctAnswerStyle
            : !props.isCorrect && props.isSelected
            ? falseAnswerStyle
            : checkedStyle
          : props.isSelected
          ? selectedStyle
          : defaultStyle
      }
      onClick={props.toggleSelected}
    >
      {props.answer}
    </div>
  );
}

import React from "react";

export default function StartScreen(props) {
  return (
    <div className="start-screen">
      <h1 className="title">Quizzical</h1>
      <p className="description">
        Let's check if you can answer all questions correctly!
      </p>
      <button className="btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  );
}

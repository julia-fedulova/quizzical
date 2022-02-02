import React from "react";
import Quiz from "./components/Quiz";
import StartScreen from "./components/StartScreen";
import { nanoid } from "nanoid";
import BounceLoader from "react-spinners/BounceLoader";

export default function App() {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false);
  const [quizes, setQuizes] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [isCheckingAnswer, setIsCheckingAnswer] = React.useState(false);
  const [newQuiz, setNewQuiz] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function refactorData(data) {
    return data.map((quiz) => {
      return {
        id: nanoid(),
        question: quiz.question
          .replaceAll("&quot;", `"`)
          .replaceAll("&#039;", `'`)
          .replaceAll("&amp;", `&`)
          .replaceAll("&prime;", `′`)
          .replaceAll("&eacute;", `é`),
        answers: [
          ...quiz.incorrect_answers.map((answer) => ({
            id: nanoid(),
            answer: answer
              .replaceAll("&quot;", `"`)
              .replaceAll("&#039;", `'`)
              .replaceAll("&amp;", `&`)
              .replaceAll("&prime;", `′`)
              .replaceAll("&eacute;", `é`),
            isCorrect: false,
            isSelected: false,
          })),
          {
            id: nanoid(),
            answer: quiz.correct_answer,
            isCorrect: true,
            isSelected: false,
          },
        ].sort(() => Math.random() - 0.5),
      };
    });
  }

  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        setQuizes(refactorData(data.results));
        setIsLoading(false);
      });
  }, [newQuiz]);

  function startQuiz() {
    setIsQuizStarted((prevState) => !prevState);
  }

  function checkAnswers() {
    let answeredQuizes = 0;
    quizes.forEach((quiz) => {
      quiz.answers.forEach((answer) => {
        if (answer.isSelected) answeredQuizes++;
      });
    });

    if (answeredQuizes === 10) {
      setIsCheckingAnswer((prevState) => !prevState);
      quizes.forEach((quiz) => {
        quiz.answers.forEach((answer) => {
          if (answer.isSelected && answer.isCorrect) {
            setScore((prevScore) => prevScore + 1);
          }
        });
      });
    } else {
      alert("Please answer all the questions to check answers");
      return;
    }
  }

  function playAgain() {
    setScore(0);
    setIsCheckingAnswer(false);
    setNewQuiz((prevState) => !prevState);
  }

  const styles = "display: block; margin: 150px auto;";

  return (
    <main>
      {isQuizStarted ? (
        isLoading ? (
          <BounceLoader color={"#293264"} css={styles} size={150} />
        ) : (
          <div className="wrap">
            {quizes.map((quiz) => {
              return (
                <Quiz
                  key={quiz.id}
                  id={quiz.id}
                  question={quiz.question}
                  answers={quiz.answers}
                  setQuizes={setQuizes}
                  isCheckingAnswer={isCheckingAnswer}
                />
              );
            })}
            {isCheckingAnswer ? (
              <div className="score-container">
                <p className="score">You scored {score}/10 correct answers</p>
                <button className="btn small-btn" onClick={playAgain}>
                  Play again
                </button>
              </div>
            ) : (
              <div>
                <button className="btn small-btn" onClick={checkAnswers}>
                  Check answers
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <StartScreen startQuiz={startQuiz} />
      )}
    </main>
  );
}

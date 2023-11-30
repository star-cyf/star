import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Question from "../components/Question";
import AnswerForm from "../components/AnswerForm";
import Answer from "../components/Answer";
import getQuestionById from "../api/getQuestionById";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const QuestionPage = () => {
  const { id } = useParams();
  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);

  const {
    isPending,
    isError,
    error,
    data: questionData,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => getQuestionById(id),
  });

  return (
    <Box
      p={3}
      color="white"
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {questionData && (
        <Box>
          <Typography variant={"pagetitle"}>
            Individual Question (id: {questionData.id})
          </Typography>
          <Box display={"grid"} gap={2}>
            <Question
              questionData={questionData}
              showAddAnswerForm={showAddAnswerForm}
              setShowAddAnswerForm={setShowAddAnswerForm}
            />
            {showAddAnswerForm && (
              <AnswerForm
                questionId={questionData.id}
                setShowAddAnswerForm={setShowAddAnswerForm}
              />
            )}
            <Box display={"grid"} gap={2}>
              {questionData.answers.map((answerData) => {
                return <Answer key={answerData.id} answerData={answerData} />;
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionPage;

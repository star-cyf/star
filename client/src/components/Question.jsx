import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link, IconButton, Avatar } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import deleteQuestion from "../api/deleteQuestion";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentLinkColor,
} from "../themes/ConsistentStyles";
import QuestionForm from "./QuestionForm";

const Question = ({ questionData }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [showUpdateQuestionForm, setShowUpdateQuestionForm] = useState(false);

  const handleEdit = async () => {
    setShowUpdateQuestionForm(true);
  };

  const location = useLocation();

  let currentPage;
  if (location.pathname.includes("/questions/")) {
    currentPage = "individualQuestionPage";
  } else if (location.pathname.includes("/questions")) {
    currentPage = "allQuestionsPage";
  } else if (location.pathname.includes("/profile")) {
    currentPage = "profilePage";
  }

  const questionId = questionData.id;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteQuestionMutation = useMutation({
    mutationFn: () => deleteQuestion(questionId),
    onError: (error) => {
      console.log("deleteQuestionMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", questionId]);
      if (currentPage === "individualQuestionPage") {
        navigate("/questions");
      }
    },
  });

  const handleDelete = async () => {
    deleteQuestionMutation.mutate();
  };

  return (
    <>
      {questionData && (
        <Box
          p={2}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}
          className="individual-question">
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Box display={"flex"} alignItems={"center"} gap={0.75}>
              <Box>
                <Avatar
                  src={questionData?.user?.picture}
                  sx={{ height: 28, width: 28 }}
                />
              </Box>
              <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
                <HelpOutlineOutlinedIcon fontSize={"medium"} color="primary" />
                <Typography
                  variant={"questiontitle"}
                  color="primary"
                  paddingLeft={0.5}>
                  Question{" "}
                </Typography>
                <Typography component={"span"} color="primary" pl={0.5}>
                  ({questionData?.id})
                </Typography>
              </Box>
              <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
                <Typography variant={"body2"}>
                  from{" "}
                  <Typography
                    component={"span"}
                    variant={"body2"}
                    color="primary">
                    {questionData?.user?.firstName}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box
              marginLeft={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={0.5}>
              {questionData.userId === authenticatedUser.id && (
                <IconButton onClick={handleEdit} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {questionData.userId === authenticatedUser.id && (
                <IconButton
                  onClick={() => handleDelete(questionData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box my={1}>
            {!showUpdateQuestionForm &&
              (currentPage === "allQuestionsPage" ||
                currentPage === "profilePage") && (
                <Link
                  component={RouterLink}
                  to={`/questions/${questionData.id}`}
                  color={consistentLinkColor}
                  variant="questionbody">
                  {questionData.question}
                </Link>
              )}
            {!showUpdateQuestionForm &&
              currentPage === "individualQuestionPage" && (
                <Typography variant={"questionbody"}>
                  {questionData.question}
                </Typography>
              )}
            {showUpdateQuestionForm && (
              <QuestionForm
                questionId={questionData.id}
                originalQuestion={questionData.question}
                setShowUpdateQuestionForm={setShowUpdateQuestionForm}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap"}
            gap={1}>
            <Box display={"flex"} flexWrap={"wrap"} gap={0.75}>
              {questionData?.answers.length > 0 && (
                <Typography variant={"body2"}>
                  ({questionData?.answers?.length}) Answers
                </Typography>
              )}
              {questionData?.answers?.reduce((acc, answer) => {
                if (answer && answer.comments && answer.comments.length > 0) {
                  return answer.comments.length + acc;
                }
                return acc;
              }, 0) > 0 && (
                <Typography variant={"body2"}>
                  (
                  {questionData?.answers?.reduce((acc, answer) => {
                    if (
                      answer &&
                      answer.comments &&
                      answer.comments.length > 0
                    ) {
                      return answer.comments.length + acc;
                    }
                    return acc;
                  }, 0)}
                  ) Comments
                </Typography>
              )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-end"}>
              <Typography variant={"body2"}>
                updated {formatDate(questionData.updatedAt)}
              </Typography>
              <Typography variant={"body2"}>
                created {formatDate(questionData.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Question;

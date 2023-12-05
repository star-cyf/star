import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import AddCommentForm from "./CommentForm";
import Comment from "./Comment";
import deleteAnswer from "../api/deleteAnswer";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";
import AnswerForm from "./AnswerForm";

const Answer = ({ answerData }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [showUpdateAnswerForm, setShowUpdateAnswerForm] = useState(false);

  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const handleEdit = async () => {
    setShowUpdateAnswerForm(true);
  };

  const questionId = answerData.questionId;
  const answerId = answerData.id;

  const queryClient = useQueryClient();

  const deleteAnswerMutation = useMutation({
    mutationFn: () => deleteAnswer(questionId, answerId),
    onError: (error) => {
      console.log("deleteAnswerMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      queryClient.refetchQueries([`question-${questionId}`]);
    },
  });

  const handleDelete = () => {
    deleteAnswerMutation.mutate();
  };

  return (
    <>
      {answerData && (
        <Box
          display={"grid"}
          gridTemplateColumns={"auto"}
          gridTemplateRows={"auto"}
          p={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box display={"flex"} alignItems={"center"}>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={0.75}>
                <PsychologyAltRoundedIcon fontSize={"medium"} color="primary" />
                <Typography variant={"answertitle"} color="primary">
                  Answer
                  {/* ({answerData?.id}) */}
                </Typography>
                <Avatar
                  src={answerData?.user?.picture}
                  sx={{ height: 24, width: 24 }}
                />
                <Typography variant={"body2"}>
                  by {answerData?.user?.firstName}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  gap={1}>
                  <Typography variant={"body2"}>
                    ({answerData?.comments?.length}) Comments
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              marginLeft={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={0.5}>
              {answerData.userId === authenticatedUser.id && (
                <IconButton onClick={handleEdit} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {answerData.userId === authenticatedUser.id && (
                <IconButton
                  onClick={() => handleDelete(answerData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box display={"grid"} gap={1} mt={1}>
            {showUpdateAnswerForm ? (
              <AnswerForm
                answerId={answerData.id}
                questionId={answerData.questionId}
                originalSituation={answerData.situation}
                originalTask={answerData.task}
                originalAction={answerData.action}
                originalResult={answerData.result}
                setShowUpdateAnswerForm={setShowUpdateAnswerForm}
              />
            ) : (
              <>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography>Situation</Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.situation}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography>Task</Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.task}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography>Action</Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.action}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography fontSize={18}>Result</Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.result}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            my={1}>
            <Typography variant={"body2"}>
              updated {formatDate(answerData.updatedAt)}
            </Typography>
            <Typography variant={"body2"}>
              created {formatDate(answerData.createdAt)}
            </Typography>
          </Box>
          {answerData.comments &&
            answerData.comments.map((commentData) => (
              <Comment
                key={commentData.id}
                questionId={answerData.questionId}
                commentData={commentData}
              />
            ))}
          <Box mt={1.5}>
            <Button
              variant="outlined"
              startIcon={<SmsOutlinedIcon />}
              onClick={() => setShowAddCommentForm((prev) => !prev)}
              disabled={showAddCommentForm}>
              Add a Comment
            </Button>
            {showAddCommentForm && (
              <AddCommentForm
                questionId={answerData.questionId}
                answerId={answerData.id}
                setShowAddCommentForm={setShowAddCommentForm}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Answer;

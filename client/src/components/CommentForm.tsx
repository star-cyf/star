import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import SendIcon from "@mui/icons-material/Send";
import queryClient from "../utils/queryClient";
import postComment from "../api/postComment";
import putComment from "../api/putComment";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";
import {
  CommentFormBase,
  AddCommentForm,
  UpdateCommentForm,
  CommentFormProps,
} from "../types/components";

const CommentForm = (props: CommentFormProps) => {
  const { questionId, answerId } = props as CommentFormBase;
  const { setShowAddCommentForm } = props as AddCommentForm;
  const { commentId, originalComment, setShowUpdateCommentForm } =
    props as UpdateCommentForm;

  const [comment, setComment] = useState(commentId ? originalComment : "");
  const [commentValidation, setCommentValidation] = useState<
    boolean | undefined
  >(undefined);

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    setCommentValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: commentId ? putComment : postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", questionId],
      });
      setComment("");
      setCommentValidation(undefined);
      setTimeout(() => {
        if (commentId) {
          setShowUpdateCommentForm(false);
        } else {
          setShowAddCommentForm((prev: boolean) => !prev);
        }
      }, 1000);
    },
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (commentValidation === undefined) {
      setCommentValidation(false);
    }
    if (!commentValidation) {
      return;
    }
    if (commentId && comment === originalComment) {
      setShowUpdateCommentForm(false);
      return;
    }
    // We need to use the mutate function but pass different props...
    // I think we should have two handlers, and two mutates... combining is not always great...
    if (commentId) {
      // putComment
      mutate({ questionId, answerId, commentId, comment });
    } else {
      // postComment
      mutate({ questionId, answerId, comment });
    }
  };

  return (
    <Box
      mt={1}
      p={3}
      border={consistentBorder}
      borderRadius={consistentBorderRadius}
      bgcolor={consistentBgColor}
      boxShadow={consistentBoxShadow}
      sx={{
        backdropFilter: consistentBackdropFilter,
      }}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "grid",
        }}>
        <FormControl>
          <Box display={"flex"} alignItems={"center"} gap={0.5} mb={1}>
            <SmsIcon fontSize="medium" color="primary" />
            <Typography variant={"commentFormTitle"} color={"primary"}>
              {commentId ? "Edit your Comment" : "Add your Comment"}
            </Typography>
          </Box>
          <TextareaAutosize
            id="comment"
            aria-label="Add your Comment"
            minRows={2}
            placeholder="Please carefully type out your Comment"
            value={comment}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                commentValidation === false ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {commentValidation === false && (
            <Typography color="error">
              Your Comment needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} alignItems={"center"} gap={1} mt={1.5}>
            <Button
              variant={"contained"}
              onClick={() =>
                commentId
                  ? setShowUpdateCommentForm(false)
                  : setShowAddCommentForm((prev: boolean) => !prev)
              }>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type={"submit"}
              endIcon={<SendIcon />}
              disabled={isPending || !commentValidation}>
              {commentId ? "Edit Comment" : "Add Comment"}
            </Button>
          </Box>
          <Box>
            {isPending && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                Submitting...
              </Typography>
            )}
            {isSuccess && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                ✅ Your Comment was successfully added! Thank you
              </Typography>
            )}
            {isError && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                ❌ Error: {error.message}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default CommentForm;

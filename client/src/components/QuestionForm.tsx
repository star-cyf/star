import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import queryClient from "../utils/queryClient";
import SendIcon from "@mui/icons-material/Send";
import postQuestion from "../api/postQuestion";
import putQuestion from "../api/putQuestion";
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
  QuestionFormProps,
  AddQuestionFormProps,
  UpdateQuestionFormProps,
} from "../types/components";

const QuestionForm = (props: QuestionFormProps) => {
  const { setShowAddQuestionForm } = props as AddQuestionFormProps; // sort
  const { questionId, originalQuestion, setShowUpdateQuestionForm } =
    props as UpdateQuestionFormProps;

  const [question, setQuestion] = useState(questionId ? originalQuestion : "");

  const [questionValidation, setQuestionValidation] = useState<
    undefined | boolean
  >(undefined);

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
    setQuestionValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: questionId ? putQuestion : postQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setQuestion("");
      setQuestionValidation(undefined);
      setTimeout(() => {
        if (questionId) {
          setShowUpdateQuestionForm(false);
        } else {
          setShowAddQuestionForm((prev: boolean) => !prev);
        }
      }, 1000);
    },
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (questionValidation === undefined) {
      // setQuestion(false); // what to do here?
      return;
    }
    if (!questionValidation) {
      return;
    }
    if (questionId && question === originalQuestion) {
      setShowUpdateQuestionForm(false);
      return;
    }
    // We need to use the mutate function but pass different props...
    // Really I think we should have two handlers, and two mutates... combining is not always great...
    if (questionId) {
      // putQuestion
      mutate({ questionId, question });
    } else {
      // postQuestion
      mutate({ question });
    }
  };

  return (
    <Box
      mt={1}
      mb={2}
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
            <HelpOutlinedIcon fontSize="medium" color="primary" />
            <Typography variant={"questionFormTitle"} color={"primary"}>
              {questionId ? "Edit your Question" : "Add your Question"}
            </Typography>
          </Box>
          <TextareaAutosize
            id="question"
            aria-label="Add your Question"
            minRows={2}
            placeholder="Please carefully type out your Question"
            value={question}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                questionValidation === false ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {questionValidation === false && (
            <Typography color="error">
              Your Comment needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} alignItems={"center"} gap={1} mt={1.5}>
            <Button
              variant={"contained"}
              onClick={() =>
                questionId
                  ? setShowUpdateQuestionForm(false)
                  : setShowAddQuestionForm((prev: boolean) => !prev)
              }>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type={"submit"}
              endIcon={<SendIcon />}
              disabled={isPending || !questionValidation}>
              {questionId ? "Edit Question" : "Add Question"}
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
                ✅ Your Question was successfully added! Thank you
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

export default QuestionForm;

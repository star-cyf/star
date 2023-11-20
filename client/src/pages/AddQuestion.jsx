import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/AuthContext";

const AddQuestion = () => {
  const { token } = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const validate = (question) => {
    if (!question || question.length < 10 || question.length > 500) {
      setValidationError(
        "Your Question should be between 10 to 500 characters."
      );
      return false;
    } else {
      setValidationError(null);
      return true;
    }
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    setQuestion(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (validate(question) && isChecked) {
      try {
        setSubmitting(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ question }),
          }
        );
        // console.log("SubmitHandler response", response);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        // console.log("SubmitHandler data", data);
        if (data.success) {
          setSuccessMessage("Your question was successfully added!");
        }
        setQuestion("");
      } catch (error) {
        console.error("Something went wrong! Please try again.", error);
      } finally {
        setSubmitting(false);
        setIsChecked(false);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginY={5}>
      <form onSubmit={submitHandler}>
        <FormControl>
          <Typography variant="h2">Add a Question</Typography>
          <Typography mb={1}>
            Please provide the full question you were asked in your Interview
          </Typography>
          <TextareaAutosize
            id="question"
            aria-label="Add a question"
            minRows={5}
            placeholder="Please carefully type out the Question"
            value={question}
            onChange={changeHandler}
            style={{ border: `1px solid ${validationError ? "red" : "black"}` }}
          />
          {validationError && (
            <Typography color="error">{validationError}</Typography>
          )}
          <FormControlLabel
            control={<Checkbox />}
            label="I have made sure to keep all names anonymous"
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
          />
          <Box display={"flex"} gap={1}>
            <Button variant="contained" component={NavLink} to={"/questions"}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
              disabled={submitting || !isChecked}>
              Send
            </Button>
          </Box>
          {successMessage && (
            <Typography color={"success.main"} mt={1}>
              {successMessage}
            </Typography>
          )}
        </FormControl>
      </form>
    </Box>
  );
};

export default AddQuestion;

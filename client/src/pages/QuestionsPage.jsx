import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Question from "../components/Question";
import QuestionForm from "../components/QuestionForm";
import getQuestionsByPage from "../api/getQuestionsByPage";

const QuestionsPage = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  const {
    data: questionsByPageData,
    error,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["questions"],

    queryFn: getQuestionsByPage,

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length < 5 ? undefined : allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    const allQuestions = document.querySelectorAll(".each-question");
    const lastQuestion = allQuestions[allQuestions.length - 1];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });
    });
    if (lastQuestion) {
      observer.observe(lastQuestion);
      return () => {
        observer.unobserve(lastQuestion);
      };
    }
  }, [questionsByPageData, fetchNextPage]);

  return (
    <Box py={2}>
      {status === "pending" && <Loading />}
      {status === "error" && <Error message={error.message} />}
      {questionsByPageData && (
        <>
          <Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant={"pagetitle"}>
                All Questions (
                {questionsByPageData.pages
                  .map((page) => page.length)
                  .reduce((acc, cv) => acc + cv, 0)}
                )
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAddQuestionForm((prev) => !prev)}
                disabled={showAddQuestionForm}
                sx={{ display: "flex", gap: 0.5 }}>
                Add a Question
              </Button>
            </Box>
            {showAddQuestionForm && (
              <QuestionForm setShowAddQuestionForm={setShowAddQuestionForm} />
            )}
            <Box display={"grid"} gap={2} mt={1}>
              {questionsByPageData?.pages.map((page) =>
                page?.map((questionData) => (
                  <div key={questionData.id} className="each-question">
                    <Question questionData={questionData} />
                  </div>
                ))
              )}
            </Box>
          </Box>
          {isFetchingNextPage && <Loading />}
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;

import { useEffect, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";

const ServerStatus = () => {
  const [isServerAlive, setIsServerAlive] = useState(false);

  const getServerStatus = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api`);
      if (response.status === 200 && !isServerAlive) {
        setIsServerAlive(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isServerAlive]);

  useEffect(() => {
    getServerStatus();

    let intervalId: number;

    if (!isServerAlive) {
      intervalId = setInterval(() => {
        getServerStatus();
      }, 1500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [getServerStatus, isServerAlive]);

  return (
    <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={0.5}>
      <Typography fontSize={12}>Server:</Typography>
      <Typography
        component={"span"}
        color={isServerAlive ? "green" : "red"}
        fontSize={12}>
        {isServerAlive ? "Alive" : "Waking Up"}
      </Typography>
    </Box>
  );
};

export default ServerStatus;
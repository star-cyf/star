import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ServerStatus = () => {
  const [isServerAlive, setIsServerAlive] = useState(false);

  const getServerStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api`);
      if (response.status === 200) {
        setIsServerAlive(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServerStatus();

    let intervalId: number;

    if (!isServerAlive) {
      intervalId = setInterval(() => {
        getServerStatus();
      }, 1500);
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  return (
    <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={0.5}>
      <Typography fontSize={12}>Server:</Typography>
      <Typography
        component={"span"}
        color={isServerAlive ? "green" : "red"}
        fontSize={12}>
        {isServerAlive ? "Alive" : "Asleep"}
      </Typography>
    </Box>
  );
};

export default ServerStatus;

import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Error";
import User from "../components/User";
import getAllUsers from "../api/getAllUsers";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";
import { UserData } from "../types/data";

const UsersPage = () => {
  const {
    isPending,
    isError,
    error,
    data: usersData,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <Box py={2}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {usersData && (
        <>
          <Box>
            <Typography variant={"pageTitle"}>Users Page</Typography>
          </Box>
          <Box
            mt={1}
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{
              backdropFilter: consistentBackdropFilter,
            }}>
            <Typography variant={"tableTitle"} color={"primary"}>
              users Table from the Database
            </Typography>
            <Box
              display={"grid"}
              gridTemplateColumns={
                "repeat(7, minmax(min-content, max-content))"
              }
              mt={1}>
              {Object.keys(usersData[0]).map((columnHeading, index, array) => {
                if (
                  columnHeading === "createdAt" ||
                  columnHeading === "updatedAt"
                ) {
                  return;
                }
                return (
                  <Box key={columnHeading}>
                    <Typography
                      p={1}
                      borderRight={
                        array.length - 3 !== index ? consistentBorder : 0
                      }
                      borderBottom={consistentBorder}>
                      {columnHeading}
                    </Typography>
                  </Box>
                );
              })}
              {usersData.map((userData: UserData) => (
                <User key={userData.id} userData={userData} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UsersPage;

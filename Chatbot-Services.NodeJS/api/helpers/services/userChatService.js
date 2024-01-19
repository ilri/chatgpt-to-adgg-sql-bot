const {
  generateSQLQuery,
  fixSQLQuery,
  generateEmptyDataResponseMessage,
  generateSQLErrorResponseMessage,
  extractSQLQueryFromText,
} = require("./openAIApi");
const { sequelize } = require("../../../config/dbConnection");
const Sequelize = require("sequelize");

const getDataByUserReq = (body) => {
  const { chats } = body;

  let generatedAssitentRes;
  let timeoutId;

  return new Promise(async (resolve, reject) => {
    try {
      generatedAssitentRes = await generateSQLQuery(chats);

      const timeoutMs = 180000; // 3 min

      timeoutId = setTimeout(() => {
        resolve({
          isSuccess: true,
          data: {
            role: "assistant",
            content: "Operation timed out",
          },
        });
      }, timeoutMs);

      const sqlQuery = await extractSQLQueryFromText(
        generatedAssitentRes.content
      );

      if (sqlQuery) {
        console.log("Extracted SQL Query:", sqlQuery);

        sequelize
          .query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT,
          })
          .then(async (results) => {
            // 'results' will contain the query results
            console.log("SQL Query Results:", results);
            if (results.length > 0) {
              clearTimeout(timeoutId);
              resolve({
                isSuccess: true,
                data: {
                  role: "assistant",
                  content: results,
                  queryDetails: sqlQuery,
                },
              });
            } else {
              const responseMessage = await generateEmptyDataResponseMessage(
                chats[chats.length - 1]
              );
              clearTimeout(timeoutId);
              resolve({
                isSuccess: true,
                data: { ...responseMessage, queryDetails: sqlQuery },
              });
            }
          })
          .catch(async (error) => {
            let extractedError = {};

            if (error && error.original && error.original.code) {
              const { code, errno, sqlState, sqlMessage, sql, parameters } =
                error.original;
              extractedError = {
                code,
                errno,
                sqlState,
                sqlMessage,
                sql,
                parameters,
              };
            } else if (error && error.code) {
              const { code, errno, sqlState, sqlMessage, sql, parameters } =
                error;
              extractedError = {
                code,
                errno,
                sqlState,
                sqlMessage,
                sql,
                parameters,
              };
            }

            const responseSQLfix = await fixSQLQuery(extractedError);

            const sqlFixedQuery = await extractSQLQueryFromText(
              responseSQLfix.content
            );

            if (sqlFixedQuery) {
              sequelize
                .query(sqlFixedQuery, {
                  type: Sequelize.QueryTypes.SELECT,
                  raw: true,
                })
                .then(async (results) => {
                  // 'results' will contain the query results
                  console.log("SQL Query Results2:", results);
                  if (results.length > 0) {
                    clearTimeout(timeoutId);
                    resolve({
                      isSuccess: true,
                      data: {
                        role: "assistant",
                        content: results,
                        queryDetails: sqlFixedQuery,
                      },
                    });
                  } else {
                    const responseMessage =
                      await generateEmptyDataResponseMessage(
                        chats[chats.length - 1]
                      );
                    clearTimeout(timeoutId);
                    resolve({
                      isSuccess: true,
                      data: { ...responseMessage, queryDetails: sqlFixedQuery },
                    });
                  }
                })
                .catch(async (error) => {
                  let extractedError = {};

                  if (error && error.original && error.original.code) {
                    const {
                      code,
                      errno,
                      sqlState,
                      sqlMessage,
                      sql,
                      parameters,
                    } = error.original;
                    extractedError = {
                      code,
                      errno,
                      sqlState,
                      sqlMessage,
                      sql,
                      parameters,
                    };
                  } else if (error && error.code) {
                    const {
                      code,
                      errno,
                      sqlState,
                      sqlMessage,
                      sql,
                      parameters,
                    } = error;
                    extractedError = {
                      code,
                      errno,
                      sqlState,
                      sqlMessage,
                      sql,
                      parameters,
                    };
                  }

                  const responseMessage = await generateSQLErrorResponseMessage(
                    extractedError,
                    chats[chats.length - 1]
                  );
                  clearTimeout(timeoutId);
                  resolve({
                    isSuccess: true,
                    data: {
                      role: "assistant",
                      content: responseMessage.content,
                      queryDetails: sqlFixedQuery,
                    },
                  });
                });
            } else {
              const responseMessage = await generateSQLErrorResponseMessage(
                extractedError,
                chats[chats.length - 1]
              );
              clearTimeout(timeoutId);
              resolve({
                isSuccess: true,
                data: {
                  role: "assistant",
                  content: responseMessage.content,
                  queryDetails: sqlFixedQuery,
                },
              });
            }
          });
      } else {
        console.error("SQL Query not found in the response.");
        clearTimeout(timeoutId);
        resolve({
          isSuccess: true,
          data: generatedAssitentRes,
        });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      clearTimeout(timeoutId);
      resolve({
        isSuccess: true,
        data: generatedAssitentRes,
      });
    }
  });
};

module.exports = {
  getDataByUserReq,
};

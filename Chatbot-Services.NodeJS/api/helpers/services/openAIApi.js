const OpenAI = require("openai");

const db = require("../../../config/dbConnection");
const Sequelize = require("sequelize");

const CoreFarm = require("../schemas/CoreFarm")(db.sequelize, Sequelize);
const CoreAnimalHerd = require("../schemas/CoreAnimalHerd")(
  db.sequelize,
  Sequelize
);
const CoreAnimal = require("../schemas/CoreAnimal")(db.sequelize, Sequelize);
const CoreAnimalEvent = require("../schemas/CoreAnimalEvent")(
  db.sequelize,
  Sequelize
);
const CoreEventsType = require("../schemas/CoreEventsType")(
  db.sequelize,
  Sequelize
);

const CountryUnits = require("../schemas/CountryUnits")(
  db.sequelize,
  Sequelize
);

const CoreOrganization = require("../schemas/CoreOrganization")(
  db.sequelize,
  Sequelize
);

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OpenAI API key not found. Make sure it is set in your environment variables."
  );
}

const openai = new OpenAI({
  apiKey,
});

async function generateSQLQuery(userChats) {
  const databaseSchema = {
    core_farm: {
      tableName: CoreFarm.tableName,
      attributes: Object.keys(CoreFarm.rawAttributes),
    },
    core_animal_herd: {
      tableName: CoreAnimalHerd.tableName,
      attributes: Object.keys(CoreAnimalHerd.rawAttributes),
    },
    core_animal: {
      tableName: CoreAnimal.tableName,
      attributes: Object.keys(CoreAnimal.rawAttributes),
    },
    core_animal_event: {
      tableName: CoreAnimalEvent.tableName,
      attributes: Object.keys(CoreAnimalEvent.rawAttributes),
    },
    core_events_type: {
      tableName: CoreEventsType.tableName,
      attributes: Object.keys(CoreEventsType.rawAttributes),
    },
    country_units: {
      tableName: CountryUnits.tableName,
      attributes: Object.keys(CountryUnits.rawAttributes),
    },

    core_organization: {
      tableName: CoreOrganization.tableName,
      attributes: Object.keys(CoreOrganization.rawAttributes),
    },

    // Add more tables as needed
  };

  // Define the prompt with the desired modification
  const prompt = `Generate an SQL query to find the farm that produced the most milk in a specific location. If the response query involves joining the 'country_units' table for location-related queries, use 'country_units.country_id' when joining tables.`;

  const prompt2 =
    "`If the response query is related to checking the event type, then find with like this core_animal_event.event_type = (SELECT id FROM core_events_type WHERE name LIKE '%milk%')";

  const conversation = [
    {
      role: "system",
      content:
        "You are an AI language assistant capable of understanding queries in multiple languages such as English, Swahili, Hindi, and others. Ensure your responses consider different languages and align with the provided prompts for each language. Your goal is to generate accurate and relevant responses based on the user's query, maintaining coherence and context across different languages. Adapt your replies to suit the language of the query while ensuring consistency and adherence to the specified prompts. Please generate responses that are suitable for the respective language input without compromising clarity or accuracy.",
    },

    {
      role: "system",
      content:
        "You are an SQL query assistant. It's crucial that you follow the provided prompts closely. If the user query is related to generating SQL with the given database schema, you must generate the SQL query according to the following instructions. Otherwise, respond as follows:\n\n1. If the user's request is related to creating or deleting SQL queries, say: 'Sorry, we are unable to proceed with your request to create or delete queries as we do not have access for such operations at the moment.'\n\n2. If the request is not related to SQL queries, respond with a general message.'\n\n3. If the user's query is related to the provided database, generate the SQL query accordingly, emphasizing optimization for faster data retrieval. However, for queries seemingly unrelated to the database schema, provide a short and clear notification that no relevant data was found without including suggestions or examples. If the response is an SQL query, please provide it in the following format without additional text or context:\n\n'your_sql_query_here'; Additionally, if the SQL query response includes operations like COUNT, MIN, MAX, etc., ensure that the calculated values are assigned to a constant key named 'total' in the output SQL query. If the SQL query doesn't include a specific limit, add a default limit of 20 for efficient data retrieval.",
    },

    {
      role: "system",
      content: `Understand the relationship of the below database schema and their tables:${JSON.stringify(
        databaseSchema
      )}`,
    },
    {
      role: "system",
      content:
        "Generate a SQL query to retrieve data from the 'core_farm' and 'core_animal_event' tables. When the user's query is related to 'core_farm' and 'core_animal,' please use the following join conditions:\n\n1. Join 'core_farm' with 'core_animal' using 'core_farm.id = core_animal.farm_id'.\n2. Join 'core_animal' with 'core_animal_event' using 'core_animal.id = core_animal_event.animal_id'.\n\nIn your query, select the relevant fields, apply any needed filters, and perform any calculations as required. Please provide the complete SQL query that accomplishes this task.",
    },
    {
      role: "system",
      content:
        "The SQL query generated contains a SQL error. Please correct it and provide a query that adheres to SQL syntax rules. Specifically, ensure that columns in the SELECT clause are properly included in the GROUP BY clause or use appropriate aggregate functions for non-grouped columns.",
    },

    {
      role: "system",
      content: prompt,
    },
    {
      role: "system",
      content: prompt2,
    },
    {
      role: "system",
      content:
        "Please ensure that the SQL query you generate does not include common errors such as using aliases in the ORDER BY clause. Provide the query in a correct and error-free format.",
    },

    // location related prompt
    {
      role: "system",
      content:
        "If the user's query is about the location of a farm, please include latitude and longitude in the SQL query to provide the farm's precise location.",
    },
    // latitude and longitude prompt
    {
      role: "system",
      content:
        "If the user's query involves 'where is farm' and specifies certain user requirements, please generate an SQL query that incorporates the user's requirements, along with the latitude and longitude details from the 'core_farm' table for the farms that meet the specified criteria. Ensure that the SQL query provides both the user's specific needs the total milk production as 'total' and the location details, including latitude and longitude.",
    },
    {
      role: "system",
      content:
        "When calculating the total milk production, you should use the following subquery to calculate 'total':\n" +
        "```sql\n" +
        "(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"59\"')), 0) +\n" +
        "COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"68\"')), 0) +\n" +
        "COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"61\"')), 0))\n" +
        "```",
    },
    {
      role: "system",
      content:
        "You're working with a database that includes an 'additional_attributes' column within the 'core_animal_event' table. Please note, this column is exclusively dedicated to milk production data; it does not contain information on other attributes. Craft a prompt instructing an SQL query assistant to extract milk production details accurately from the 'additional_attributes' column while considering the provided database schema. The query should focus on leveraging this column specifically for milk production-related information.",
    },

    // for filtering location by name like given format
    {
      role: "system",
      content:
        "If the user's request is related to filtering the location by name, you can use the following format in the SQL query:",
    },
    {
      role: "system",
      content:
        "JOIN country_units ON country_units.country_id = core_farm.country_id\nWHERE country_units.name = 'Arusha'",
    },

    // The following format is joining the core_farm and core_animal_event tables with current database relationships
    {
      role: "system",
      content:
        "If the user's request involves joining 'core_farm' and 'core_animal_event,' please use the following format in the SQL query:",
    },
    {
      role: "assistant",
      content:
        "JOIN core_farm ON core_farm.id = core_animal_event.farm_id\nFROM core_farm\nJOIN core_animal ON core_farm.id = core_animal.farm_id\nJOIN core_animal_event ON core_animal.id = core_animal_event.animal_id",
    },
    ...userChats,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: conversation,
    max_tokens: 1024, // Adjust as needed
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });

  return response.choices[0].message;
}

async function fixSQLQuery(userChats) {
  const conversation = [
    {
      role: "user",
      content: `SQL: ${userChats.sql} Error Message: ${userChats.sqlMessage} Please fix and provide the corrected SQL query in the format: 'your_sql_query_here';      `,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: conversation,
    max_tokens: 1024, // Adjust as needed
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });

  return response.choices[0].message;
}

async function generateEmptyDataResponseMessage(userChats) {
  const conversation = [
    {
      role: "system",
      content:
        "Craft a short and clear message to inform the user that no relevant data was found based on their query. The response should be brief and user-friendly, avoiding specific database schema details. Aim for a message that helps the user understand the absence of available data without providing schema-related explanations.",
    },
    userChats,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: conversation,
    max_tokens: 1024, // Adjust as needed
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });

  return response.choices[0].message;
}

async function generateSQLErrorResponseMessage(extractedError, userChats) {
  const conversation = [
    {
      role: "system",
      content: `Imagine a scenario where a user submits a query to retrieve data from a database, but an error occurs in the database execution, specifically a 'SequelizeDatabaseError.' The error message received is: ${extractedError.sqlMessage}. Craft a user-friendly message to inform the user about the error encountered in their initial query. The response should be short and clear, helping the user understand why the error occurred without referencing the SQL query or including suggestions or examples.
      `,
    },
    userChats,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: conversation,
    max_tokens: 1024, // Adjust as needed
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });

  return response.choices[0].message;
}

async function extractSQLQueryFromText(text) {
  const prompt = `
    "Please extract only the SQL query from the provided text below. Ensure the extracted query does not contain any surrounding quotes or additional formatting."

    Text:
    "${text}"
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
      temperature: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["#", ";"],
    });

    // Extract the formatted SQL query from the model's response
    const extractedSQLQueryWithQuotes =
      response.choices[0].message.content.trim();

    // Remove surrounding quotes if present
    const extractedSQLQuery = extractedSQLQueryWithQuotes.replace(
      /^'(.*)'$/,
      "$1"
    );

    // Check if extracted query is empty or contains placeholder text
    if (
      !extractedSQLQuery ||
      extractedSQLQuery.toLowerCase().includes("sql query")
    ) {
      return null; // Return null when SQL query is not found or empty
    }

    return extractedSQLQuery;
  } catch (error) {
    console.error("extractSQLQuery Error:", error);
    return null;
  }
}

module.exports = {
  generateSQLQuery,
  fixSQLQuery,
  generateEmptyDataResponseMessage,
  generateSQLErrorResponseMessage,
  extractSQLQueryFromText,
};

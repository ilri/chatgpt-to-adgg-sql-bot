

const db = require("../../config/dbConnection");
const Sequelize = require("sequelize");

const CoreFarm = require("../helpers/schemas/CoreFarm")(
  db.sequelize,
  Sequelize
);
const CoreAnimalHerd = require("../helpers/schemas/CoreAnimalHerd")(
  db.sequelize,
  Sequelize
);
const CoreAnimal = require("../helpers/schemas/CoreAnimal")(
  db.sequelize,
  Sequelize
);
const CoreAnimalEvent = require("../helpers/schemas/CoreAnimalEvent")(
  db.sequelize,
  Sequelize
);
const CoreEventsType = require("../helpers/schemas/CoreEventsType")(
  db.sequelize,
  Sequelize
);

const CountryUnits = require("../helpers/schemas/CountryUnits")(
  db.sequelize,
  Sequelize
);


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

  // Add more tables as needed
};

// Define the prompt with the desired modification
const prompt = `Generate an SQL query to find the farm that produced the most milk in a specific location. If the response query involves joining the 'country_units' table for location-related queries, use 'country_units.country_id' when joining tables.`;

const prompt2 =
  "`If the response query is related to checking the event type, then find with like this core_animal_event.event_type = (SELECT id FROM core_events_type WHERE name LIKE '%milk%')";

const additionalAttributesQuery = `(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$."59"')), 0) + 
  COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$."68"')), 0) + 
  COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$."61"')), 0)) as total_milk`;

const conversation = [
  {
    role: "system",
    content:
      "You are an SQL query assistant. It's crucial that you follow the provided prompts closely. If the user query is related to generating SQL with the given database schema, you must generate the SQL query according to the following instructions. Otherwise, respond as follows:\n\n1. If the user requests to create or delete SQL queries, say: 'Sorry, we are unable to proceed with your request to create or delete queries as we do not have access for such operations at the moment.'\n\n2. If the request is not related to SQL queries, respond with a general message.\n\n3. If the response is an SQL query, please provide it in the following format without additional text or context:\n\n'your_sql_query_here';",
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
      "If the user's query involves 'where is farm' and specifies certain user requirements, please generate an SQL query that incorporates the user's requirements, along with the latitude and longitude details from the 'core_farm' table for the farms that meet the specified criteria. Ensure that the SQL query provides both the user's specific needs the total milk production as 'total_milk' and the location details, including latitude and longitude.",
  },
  {
    role: "system",
    content:
      "When calculating the total milk production, you should use the following subquery to calculate 'total_milk':\n" +
      "```sql\n" +
      "(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"59\"')), 0) +\n" +
      "COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"68\"')), 0) +\n" +
      "COALESCE(JSON_UNQUOTE(JSON_EXTRACT(core_animal_event.additional_attributes, '$.\"61\"')), 0))\n" +
      "```",
  },
  {
    role: "system",
    content: "If the user's query involves the additional_attributes column",
  },

  {
    role: "assistant",
    content: additionalAttributesQuery,
  },

  // for filtering location by name like given format
  {
    role: "system",
    content:
      "If the user's request is related to filtering the location by name, you can use the following format in the SQL query:",
  },
  {
    role: "assistant",
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
  {
    role: "system",
    content:
      "If you encounter an 'ER_WRONG_FIELD_WITH_GROUP' error due to the 'ONLY_FULL_GROUP_BY' SQL mode, please ensure that all non-aggregated columns in the SELECT clause are either included in the GROUP BY clause or are wrapped in appropriate aggregation functions, such as SUM, AVG, MAX, or MIN. Make the necessary adjustments to the query to comply with SQL mode requirements. Also, include 'total_milk' in the SELECT clause if needed.",
  },
  userChats,
];


const sqlRegex = /^SELECT\s+.*\s+FROM\s+.*?(?:\s+WHERE\s+.*|);?$/i;
const sqlRegex2 = /```sql\n([\s\S]*?)\n```/;
const sqlRegex3 = /['"]Sql_query['"]:\s*(['"])(.*?)\1/;




module.exports = { conversation, sqlRegex, sqlRegex2, sqlRegex3 };

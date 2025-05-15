//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const pingEval: EvalFunction = {
    name: 'ping Tool Evaluation',
    description: 'Evaluates the ping tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Check if the MCP server is running and which version it is.");
        return JSON.parse(result);
    }
};

const listContactsEval: EvalFunction = {
    name: "listContacts Tool Evaluation",
    description: "Evaluates the retrieval of contacts from Omnisend",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Retrieve the first 3 subscribed contacts from Omnisend");
        return JSON.parse(result);
    }
};

const createContactEval: EvalFunction = {
    name: 'createContact Tool Evaluation',
    description: 'Evaluates the creation or update of an Omnisend contact',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please create a new contact in Omnisend with email 'jane.doe@example.com' named 'Jane' and phone number '1234567890'.");
        return JSON.parse(result);
    }
};

const getContactEval: EvalFunction = {
    name: 'getContact Tool Evaluation',
    description: 'Evaluates the getContact tool by retrieving a contact based on a provided contact ID',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve the contact details for contact ID 12345. Provide all the information to confirm the contact was successfully found.");
        return JSON.parse(result);
    }
};

const updateContactEval: EvalFunction = {
    name: 'updateContactEval',
    description: 'Evaluates the updateContact tool',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Update the contact with ID 12345, changing the phone number to 555-1234. Preserve the structure from getContact in the update request.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [pingEval, listContactsEval, createContactEval, getContactEval, updateContactEval]
};
  
export default config;
  
export const evals = [pingEval, listContactsEval, createContactEval, getContactEval, updateContactEval];
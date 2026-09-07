import { inngest } from "../client.js";
import { askQuestion } from "../../service/rag.js";

export const askQuestionFn = inngest.createFunction(
  {
    id: "ask-question",
    triggers: [{ event: "chat/question.requested" }],
  },
  async ({ event, step }) => {
    const { repo, question } = event.data;

    try {
      const result = await step.run("retrieve-and-answer", async () => {
        return askQuestion(repo, question);
      });

      return {
        repo,
        question,
        answer: result.answer,
        source: result.sources,
      };
    } catch (error) {
      throw error;
    }
  },
);

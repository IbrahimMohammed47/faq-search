import { Request, Response } from "express";
import { faqsIndex } from "./searchIndex";

export const searchController = (req: Request, res: Response) => {
  try {
    const query: string = req.body?.query;
    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ message: "Query field must be a non-empty string" });
    }
    const matches = faqsIndex.search(query);
    const summary =
      matches.length > 0
        ? `Top Titles: ${matches.map((m) => m.title).join(", ")}`
        : "No matches found";
    res.json({
      data: matches,
      summary,
      sources: matches.map((m) => m.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default searchController;

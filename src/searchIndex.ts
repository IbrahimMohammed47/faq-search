import faqs from "../data/faqs.json";
class SearchIndex<T extends { id: string }> {
  private keywordLookup: Record<string, string[]> = {};
  private idLookup: Record<string, T> = {};
  constructor(faqs: T[], fields: (keyof Omit<T, "id">)[]) {
    this.initializeIndex(faqs, fields);
  }

  private split(str: string) {
    return str.split(/[^A-Za-z0-9]+/).filter(Boolean);
  }

  private initializeIndex(faqs: T[], fields: (keyof Omit<T, "id">)[]) {
    for (const doc of faqs) {
      const { id, ...docFields } = doc;
      this.idLookup[id] = doc;
      const terms = fields.flatMap((field) =>
        this.split((docFields[field] ?? "").toString().trim().toLowerCase())
      );
      for (const term of terms) {
        this.keywordLookup[term] ??= [];
        this.keywordLookup[term].push(doc.id);
      }
    }
  }

  search(search: string): T[] {
    const searchTerms = this.split(search.toLowerCase());
    const idsFrequency: Record<string, number> = {};
    for (const term of searchTerms) {
      const matchIds = this.keywordLookup[term];
      if (!matchIds) continue;
      for (const id of matchIds) {
        idsFrequency[id] ??= 0;
        idsFrequency[id] += 1;
      }
    }
    const ordered = Object.entries(idsFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([id, _]) => this.idLookup[id])
      .slice(0, 3);
    return ordered;
  }
}

export const faqsIndex = new SearchIndex(faqs, ["body", "title"]);

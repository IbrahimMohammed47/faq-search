export type Faq = {
  id: string;
  title: string;
  body: string;
};

export type SearchResponse = {
  data: Faq[];
  summary: string;
  sources: string[];
};

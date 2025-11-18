// types/blog.ts
export interface ArticleContent {
  prerequisites: string[];
  steps: string[];
  bonusIdeas: string[];
}

export interface Article {
  id: number;
  title: string;
  image: string;
  date: string;
  author: string;
  content: ArticleContent;
}
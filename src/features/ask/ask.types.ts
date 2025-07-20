export interface AskRequest {
  question: string;
  platform: "telegram";
  user_id: string;
}

export interface AskResponse { 
  answer: string;
}

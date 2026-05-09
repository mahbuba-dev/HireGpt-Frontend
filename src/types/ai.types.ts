export type AIRequestSource = "homepage" | "navbar" | "recruiters-page" | "newsletter" | "content";

export interface AIBehaviorContext {
  /** Top jobCategory IDs by weight (most-relevant first). */
  jobCategoryIds?: string[];
  recentSearches?: string[];
  recentRecruiterIds?: string[];
  hasSignal?: boolean;
}

// ---------------------------------------------
// Recommendations
// ---------------------------------------------
export interface AIRecommendationRequest {
  viewedRecruiters: string[];
  exploredJobCategories: string[];
  searchHistory: string[];
  clickedCategories: string[];
}

export interface AIRecommendationRecruiter {
  name: string;
  title: string;
  specialization: string;
  description: string;
  experienceYears: number;
  fee: number;
  whyReason: string;
  rankingScore: number;
}

export interface AIRecommendationResponse {
  mode: "cold-start" | "personalized";
  activityCount: number;
  recruiters: AIRecommendationRecruiter[];
}

// ---------------------------------------------
// Admin jobCategory creation
// ---------------------------------------------
export interface AIJobCategoryCreationRequest {
  jobCategoryName: string;
}

export interface AIJobCategoryCreationResponse {
  jobCategoryName: string;
  jobCategoryDescription: string;
  idealRecruiterTypes: string[];
  commonUseCases: string[];
  shortTagline: string;
}

// ---------------------------------------------
// Search
// ---------------------------------------------
export interface AISearchUserActivity {
  viewedRecruiters: string[];
  exploredJobCategories: string[];
  searchHistory: string[];
  clickedCategories: string[];
}

export interface AISearchRequest {
  query: string;
  userActivity: AISearchUserActivity;
}

export type AISearchResultType = "recruiter" | "jobCategory" | "testimonial" | "trending";

export interface AISearchResultItem {
  id: string;
  type: AISearchResultType;
  label: string;
  subLabel?: string;
  recruiterId?: string;
  slug?: string;
  matchScore?: number;
}

export interface AISearchResponse {
  recruiters: AISearchResultItem[];
  jobCategories: AISearchResultItem[];
  testimonials: AISearchResultItem[];
  trending: AISearchResultItem[];
  aiSuggestions: AISearchResultItem[];
  recentSearches: string[];
}

// ---------------------------------------------
// Summary (used by content suggestions + newsletter preview)
// ---------------------------------------------
export interface AISummaryRequest {
  /** Raw text to summarize (backend expects this field). */
  text?: string;
  /** Optional audience hint passed to backend summarizer. */
  audience?: string;
  /** Free-form topic, jobCategory name, or query string. */
  topic: string;
  jobCategoryIds?: string[];
  /** Optional summary kind so backend can pick a template. */
  kind?: "newsletter-preview" | "content-suggestions" | "expert-bio" | "generic";
  source?: AIRequestSource;
}

export interface AISummaryItem {
  id: string;
  title: string;
  description: string;
  type?: string;
  readMinutes?: number;
  href?: string;
}

export interface AISummaryResponse {
  topic: string;
  headline?: string;
  summary?: string;
  items: AISummaryItem[];
}

// ---------------------------------------------
// Chat (support widget)
// ---------------------------------------------
export interface AIChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface AIChatRequest {
  message: string;
  context?: string;
  history?: AIChatHistoryItem[];
}

export interface AIChatSuggestedAction {
  id: string;
  label: string;
  href?: string;
  intent?: string;
}

export interface AIChatResponse {
  reply: string;
  suggestedActions?: AIChatSuggestedAction[];
  escalatedToHuman?: boolean;
  timestamp?: string;
}

// ---------------------------------------------
// Document analysis
// ---------------------------------------------
export interface AIDocumentAnalysisRequest {
  /** Either provide raw text or a URL to a hosted document. */
  text?: string;
  documentUrl?: string;
  /** Hint for the kind of analysis: `summary`, `keypoints`, `risk`, etc. */
  mode?: "summary" | "keypoints" | "risk" | "extract";
}

export interface AIDocumentAnalysisResponse {
  // ---------------------------------------------
  // Persistent AI Chat (dashboard chatbot)
  // ---------------------------------------------
  export type AIMessageFeedback = "LIKE" | "DISLIKE" | null;

  export interface AIPersistentMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    feedback: AIMessageFeedback;
    model: string | null;
    provider: string | null;
    tokensUsed: number;
    latencyMs: number;
    createdAt: string;
  }

  export interface AIConversationSummary {
    id: string;
    title: string;
    preview: string;
    lastMessageRole: "user" | "assistant";
    lastMessageAt: string;
    messageCount: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface AIConversationDetail {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: AIPersistentMessage[];
  }

  export interface AISendMessageRequest {
    message: string;
    context?: string;
    conversationId?: string;
  }

  export interface AISendMessageResponse {
    conversation: {
      id: string;
      title: string;
      createdAt: string;
      updatedAt: string;
    };
    userMessage: AIPersistentMessage;
    assistantMessage: AIPersistentMessage;
  }

  summary?: string;
  keyPoints?: string[];
  risks?: string[];
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------
// Shared error envelope
// ---------------------------------------------
export type AIErrorReason =
  | "rate-limited"
  | "service-unavailable"
  | "model-error"
  | "network-error"
  | "unknown";

export interface AIServiceError {
  reason: AIErrorReason;
  message: string;
  retryAfterSeconds?: number;
}

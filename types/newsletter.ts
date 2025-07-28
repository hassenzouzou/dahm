// Newsletter content interface
export interface NewsletterContent {
  title: string;
  description: string;
  buttonText: string;
  placeholder: string;
}

// Newsletter subscription request interface
export interface NewsletterSubscription {
  email: string;
}

// API response structure
export interface NewsletterResponse {
  content: NewsletterContent;
  timestamp?: string;
  version?: string;
}

// Subscription response interface
export interface SubscriptionResponse {
  success: boolean;
  message: string;
  email?: string;
  timestamp?: string;
}

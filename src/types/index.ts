
export interface ShortUrl {
  id: string;
  title: string;
  short_path: string;
  long_path: string;
  created_at: string;
  last_accessed?: string;
  access_count: number;
}

export interface AccessLog {
  id: string;
  short_url_id: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  referrer?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

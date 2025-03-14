
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
  title?: string;
  device_type?: string;
  ip_address: string;
  user_agent: string;
  referrer?: string;
  referrer_url?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  session_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

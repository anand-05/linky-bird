
import { ShortUrl, AccessLog, ChartData } from "../types";

export const mockShortUrls: ShortUrl[] = [
  {
    id: "1",
    title: "Official Website",
    short_path: "website",
    long_path: "https://example.com/our-official-website-with-all-the-information-about-our-products-and-services",
    created_at: "2023-10-15T10:30:00Z",
    last_accessed: "2023-10-31T15:45:00Z",
    access_count: 243
  },
  {
    id: "2",
    title: "Black Friday Campaign",
    short_path: "black-friday",
    long_path: "https://example.com/promotions/black-friday-2023?utm_source=email&utm_medium=campaign&utm_campaign=bf2023",
    created_at: "2023-10-20T14:15:00Z",
    last_accessed: "2023-10-31T18:20:00Z",
    access_count: 518
  },
  {
    id: "3",
    title: "Product Documentation",
    short_path: "docs",
    long_path: "https://docs.example.com/product/v2/getting-started",
    created_at: "2023-09-05T09:45:00Z",
    last_accessed: "2023-10-30T11:10:00Z",
    access_count: 142
  },
  {
    id: "4",
    title: "Customer Support",
    short_path: "help",
    long_path: "https://support.example.com/contact?department=general",
    created_at: "2023-08-12T16:30:00Z",
    last_accessed: "2023-10-31T09:25:00Z",
    access_count: 87
  },
  {
    id: "5",
    title: "Partner Program",
    short_path: "partners",
    long_path: "https://example.com/business/partnership-opportunities",
    created_at: "2023-10-01T11:00:00Z",
    last_accessed: "2023-10-29T14:30:00Z",
    access_count: 65
  }
];

export const mockAccessLogs: Record<string, AccessLog[]> = {
  "1": [
    {
      id: "log1-1",
      short_url_id: "1",
      timestamp: "2023-10-31T15:45:00Z",
      ip_address: "192.168.1.100",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      referrer: "https://google.com"
    },
    {
      id: "log1-2",
      short_url_id: "1",
      timestamp: "2023-10-31T14:22:00Z",
      ip_address: "192.168.1.101",
      user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
      referrer: "https://twitter.com"
    }
  ],
  "2": [
    {
      id: "log2-1",
      short_url_id: "2",
      timestamp: "2023-10-31T18:20:00Z",
      ip_address: "192.168.1.102",
      user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      referrer: "https://facebook.com"
    }
  ]
};

export const generateDailyStats = (days: number = 30): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Generate random data
    const value = Math.floor(Math.random() * 50) + 10;
    
    data.push({
      name: day,
      value: value
    });
  }
  
  return data;
};

export const generateBrowserStats = (): ChartData[] => {
  return [
    { name: "Chrome", value: 62 },
    { name: "Safari", value: 21 },
    { name: "Firefox", value: 10 },
    { name: "Edge", value: 5 },
    { name: "Other", value: 2 }
  ];
};

export const generateDeviceStats = (): ChartData[] => {
  return [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 37 },
    { name: "Tablet", value: 5 }
  ];
};

export const generateReferrerStats = (): ChartData[] => {
  return [
    { name: "Direct", value: 45 },
    { name: "Google", value: 25 },
    { name: "Twitter", value: 15 },
    { name: "Facebook", value: 10 },
    { name: "LinkedIn", value: 5 }
  ];
};

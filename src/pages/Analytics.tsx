
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Globe, ArrowLeft, ArrowRight, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockShortUrls, generateDailyStats, generateBrowserStats, generateDeviceStats, generateReferrerStats } from "@/data/mockData";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import LinkAccessLogs from "@/components/LinkAccessLogs";

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [selectedLinkId, setSelectedLinkId] = useState(mockShortUrls[0].id);

  const selectedLink = mockShortUrls.find(link => link.id === selectedLinkId) || mockShortUrls[0];
  
  const periods = {
    "7d": { days: 7, label: "Last 7 days" },
    "30d": { days: 30, label: "Last 30 days" },
    "90d": { days: 90, label: "Last 90 days" },
  };
  
  const dailyData = generateDailyStats(periods[selectedPeriod as keyof typeof periods].days);
  const browserData = generateBrowserStats();
  const deviceData = generateDeviceStats();
  const referrerData = generateReferrerStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            className="mb-2 px-0"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your short link performance.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedLinkId} onValueChange={setSelectedLinkId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a link" />
            </SelectTrigger>
            <SelectContent>
              {mockShortUrls.map(url => (
                <SelectItem key={url.id} value={url.id}>{url.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-4xl">{selectedLink.access_count}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Since {new Date(selectedLink.created_at).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Daily Clicks</CardDescription>
            <CardTitle className="text-4xl">
              {Math.round(selectedLink.access_count / Math.max(1, Math.floor((Date.now() - new Date(selectedLink.created_at).getTime()) / (1000 * 60 * 60 * 24))))}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <ArrowRight className="h-3 w-3 mr-1" />
              <span>Based on lifetime performance</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Destination</CardDescription>
            <CardTitle className="text-sm font-medium truncate">
              {selectedLink.long_path}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span className="truncate">yourdomain.com/{selectedLink.short_path}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="logs">Access Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Click Traffic</CardTitle>
              <CardDescription>
                {periods[selectedPeriod as keyof typeof periods].label}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={dailyData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <PieChart data={referrerData} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {referrerData.map((item) => (
                  <Badge key={item.name} variant="outline" className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item.name}: {item.value}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Browsers</CardTitle>
              <CardDescription>
                Browser distribution of your visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <PieChart data={browserData} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {browserData.map((item) => (
                  <Badge key={item.name} variant="outline" className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item.name}: {item.value}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription>
                Device types used by your visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <PieChart data={deviceData} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {deviceData.map((item) => (
                  <Badge key={item.name} variant="outline" className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item.name}: {item.value}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Access Logs</CardTitle>
                <CardDescription>
                  Detailed logs of each visit to your short link
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <LinkAccessLogs linkId={selectedLinkId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

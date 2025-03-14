
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Clock, User, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockShortUrls, mockAccessLogs, generateDailyStats } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LineChart from "@/components/charts/LineChart";
import LinkAccessLogs from "@/components/LinkAccessLogs";

const LinkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the link with the matching ID
  const link = mockShortUrls.find(url => url.id === id);
  
  if (!link) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Link Not Found</h1>
        <p className="text-muted-foreground mb-6">The link you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }
  
  const dailyData = generateDailyStats(30);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 px-0"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{link.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <Globe className="h-4 w-4 mr-1" />
              <span className="mr-2">yourdomain.com/{link.short_path}</span>
              <Badge variant="outline" className="ml-2">
                {link.access_count} clicks
              </Badge>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 sm:mt-0"
            onClick={() => window.open(link.long_path, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Original URL
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Created</CardDescription>
            <CardTitle className="text-base font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {formatDate(link.created_at)}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Accessed</CardDescription>
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              {link.last_accessed ? formatDate(link.last_accessed) : "Never"}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-base font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {link.access_count} visitors
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Destination</CardDescription>
            <CardTitle className="text-base font-medium truncate flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="truncate">{link.long_path}</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Click Traffic</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <LineChart data={dailyData} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Access Logs</CardTitle>
          <CardDescription>
            Detailed history of all visits to this short link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkAccessLogs linkId={link.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkDetail;

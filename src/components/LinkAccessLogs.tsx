
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAccessLogs } from "@/data/mockData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Globe, User, Calendar } from "lucide-react";

interface LinkAccessLogsProps {
  linkId: string;
}

const LinkAccessLogs: React.FC<LinkAccessLogsProps> = ({ linkId }) => {
  const logs = mockAccessLogs[linkId] || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  
  const logsPerPage = 5;
  const totalPages = Math.ceil(logs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const currentLogs = logs.slice(startIndex, startIndex + logsPerPage);
  
  if (logs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No access logs available for this link.</p>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleLogDetails = (logId: string) => {
    if (expandedLog === logId) {
      setExpandedLog(null);
    } else {
      setExpandedLog(logId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="hidden md:table-cell">IP Address</TableHead>
              <TableHead className="hidden md:table-cell">Device</TableHead>
              <TableHead className="hidden lg:table-cell">Referrer</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLogs.map((log) => (
              <React.Fragment key={log.id}>
                <TableRow>
                  <TableCell className="w-10">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleLogDetails(log.id)}
                      className="h-6 w-6 p-0"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedLog === log.id ? 'rotate-180' : ''}`} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formatDate(log.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{log.ip_address}</TableCell>
                  <TableCell className="hidden md:table-cell">{log.device_type || 'Unknown'}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {log.referrer ? (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new URL(log.referrer).hostname}
                      </div>
                    ) : (
                      'Direct'
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {log.city && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {log.city}, {log.country}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                {expandedLog === log.id && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2">Visitor</h4>
                          <div className="space-y-1 text-muted-foreground">
                            <p className="flex items-center">
                              <User className="h-3.5 w-3.5 mr-2" />
                              Session ID: {log.session_id || 'Unknown'}
                            </p>
                            <p>Device: {log.device_type || 'Unknown'}</p>
                            <p className="truncate" title={log.user_agent}>User Agent: {log.user_agent}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Location</h4>
                          <div className="space-y-1 text-muted-foreground">
                            <p>City: {log.city || 'Unknown'}</p>
                            <p>State: {log.state || 'Unknown'}</p>
                            <p>Country: {log.country || 'Unknown'}</p>
                            <p>Postal Code: {log.postal_code || 'Unknown'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Campaign</h4>
                          <div className="space-y-1 text-muted-foreground">
                            <p>Source: {log.utm_source || 'None'}</p>
                            <p>Medium: {log.utm_medium || 'None'}</p>
                            <p>Campaign: {log.utm_campaign || 'None'}</p>
                            <p>Referrer: {log.referrer || 'Direct'}</p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default LinkAccessLogs;


import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAccessLogs } from "@/data/mockData";

interface LinkAccessLogsProps {
  linkId: string;
}

const LinkAccessLogs: React.FC<LinkAccessLogsProps> = ({ linkId }) => {
  const logs = mockAccessLogs[linkId] || [];
  
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead className="hidden md:table-cell">IP Address</TableHead>
            <TableHead className="hidden lg:table-cell">User Agent</TableHead>
            <TableHead>Referrer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{formatDate(log.timestamp)}</TableCell>
              <TableCell className="hidden md:table-cell">{log.ip_address}</TableCell>
              <TableCell className="hidden lg:table-cell truncate max-w-[300px]">{log.user_agent}</TableCell>
              <TableCell>{log.referrer || "Direct"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinkAccessLogs;

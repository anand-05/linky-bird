
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search, Link2, Copy, BarChart3, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { mockShortUrls } from "@/data/mockData";
import { ShortUrl } from "@/types";
import QRCode from "@/components/QRCode";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<ShortUrl | null>(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const filteredUrls = mockShortUrls.filter(
    (url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      url.short_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      url.long_path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (shortPath: string) => {
    const fullUrl = `https://yourdomain.com/${shortPath}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Short link copied to clipboard");
  };

  const handleQrCode = (url: ShortUrl) => {
    setSelectedUrl(url);
    setQrDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Short Links</h1>
          <p className="text-muted-foreground">
            Manage and track all your short links in one place.
          </p>
        </div>
        <Link to="/create">
          <Button className="bg-accent hover:bg-accent/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Link
          </Button>
        </Link>
      </div>

      <div className="flex items-center w-full max-w-sm space-x-2">
        <Search className="h-4 w-4 text-muted-foreground absolute ml-3 pointer-events-none" />
        <Input
          type="search"
          placeholder="Search links..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Short Link</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="hidden md:table-cell">Last Access</TableHead>
                  <TableHead className="text-center">Clicks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUrls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUrls.map((url) => (
                    <TableRow key={url.id}>
                      <TableCell className="font-medium">{url.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-sm text-muted-foreground mr-2 truncate max-w-[120px] md:max-w-[200px]">
                            yourdomain.com/{url.short_path}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopy(url.short_path)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(url.created_at)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {url.last_accessed ? formatDate(url.last_accessed) : "Never"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{url.access_count}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <span className="sr-only">Open menu</span>
                              <Link2 className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleCopy(url.short_path)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy Link</span>
                            </DropdownMenuItem>
                            <Link to={`/analytics/${url.id}`}>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                <span>View Analytics</span>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleQrCode(url)}>
                              <QrCode className="mr-2 h-4 w-4" />
                              <span>Generate QR Code</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code for {selectedUrl?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {selectedUrl && (
              <>
                <QRCode
                  url={`https://yourdomain.com/${selectedUrl.short_path}`}
                  size={250}
                />
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Scan this QR code to open your short link:
                  <br />
                  <span className="font-medium text-foreground">
                    yourdomain.com/{selectedUrl.short_path}
                  </span>
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const canvas = document.querySelector("canvas");
                      if (canvas) {
                        const image = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        link.href = image;
                        link.download = `qrcode-${selectedUrl.short_path}.png`;
                        link.click();
                      }
                    }}
                  >
                    Download QR Code
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

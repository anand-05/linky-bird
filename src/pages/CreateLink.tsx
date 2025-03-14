
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const CreateLink: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateRandomPath = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate a random path
    setTimeout(() => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setCustomPath(result);
      setIsGenerating(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Please enter a title for your link");
      return;
    }
    
    if (!longUrl) {
      toast.error("Please enter the destination URL");
      return;
    }
    
    // Basic URL validation
    try {
      new URL(longUrl);
    } catch (err) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    if (!customPath) {
      toast.error("Please enter a custom path or generate a random one");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to create the short link
    setTimeout(() => {
      toast.success("Short link created successfully");
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create a New Short Link</h1>
        <p className="text-muted-foreground">
          Create a new short link that redirects to your desired destination.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
            <CardDescription>
              Fill in the information below to create your short link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Link Title</Label>
              <Input
                id="title"
                placeholder="e.g., Marketing Campaign"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longUrl">Destination URL</Label>
              <Input
                id="longUrl"
                placeholder="https://example.com/your-long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The full URL where users will be redirected.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="customPath">Custom Path (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateRandomPath}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Random"
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-muted px-3 py-2 rounded-l-md border-y border-l text-muted-foreground">
                  yourdomain.com/
                </div>
                <Input
                  id="customPath"
                  className="rounded-l-none"
                  placeholder="my-custom-path"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value.replace(/\s+/g, "-"))}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Custom path for your short link. If left empty, a random one will be generated.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-accent hover:bg-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Short Link"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateLink;

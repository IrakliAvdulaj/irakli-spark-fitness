
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CreatePostFormProps {
  onSubmit: (post: { title: string; content: string }) => void;
  onCancel: () => void;
}

export function CreatePostForm({ onSubmit, onCancel }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    
    onSubmit({ title, content });
  };
  
  return (
    <Card className="glass-card">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create New Motivational Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <Textarea
              id="content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-secondary/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

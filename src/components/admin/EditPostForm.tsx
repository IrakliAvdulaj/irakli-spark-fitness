
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface EditPostFormProps {
  post: Post;
  onSubmit: (post: Post) => void;
  onCancel: () => void;
}

export function EditPostForm({ post, onSubmit, onCancel }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
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
    
    onSubmit({
      ...post,
      title,
      content,
      date: new Date().toISOString().split("T")[0], // Update the date to current
    });
  };
  
  return (
    <Card className="glass-card">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Edit Motivational Post</CardTitle>
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
            Update Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

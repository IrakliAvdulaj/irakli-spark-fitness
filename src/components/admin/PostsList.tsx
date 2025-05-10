
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface PostsListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export function PostsList({ posts, onEdit, onDelete }: PostsListProps) {
  return (
    <div className="space-y-6">
      {posts.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No motivational posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="glass-card">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(post)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

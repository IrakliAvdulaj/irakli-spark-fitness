
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export function MotivationalPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedPosts = localStorage.getItem("motivational-posts");
    
    setTimeout(() => {
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        // Default posts if none exist
        const defaultPosts = [
          {
            id: "1",
            title: "Consistency is Key",
            content: "Remember that fitness is not about being perfect. It's about consistency and the small steps you take every day that add up to big results over time.",
            date: "2025-05-09",
            author: "Coach Irakli"
          },
          {
            id: "2",
            title: "Your Mindset Matters",
            content: "Your body can achieve what your mind believes. Train your mind to see the potential in every challenge and embrace the process of becoming stronger, healthier, and happier.",
            date: "2025-05-08",
            author: "Coach Irakli"
          }
        ];
        localStorage.setItem("motivational-posts", JSON.stringify(defaultPosts));
        setPosts(defaultPosts);
      }
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading motivational content...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Motivation from Coach Irakli</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="glass-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <p>{post.author}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </CardFooter>
          </Card>
        ))}
        
        {posts.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">No motivational posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

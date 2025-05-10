
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PostsList } from "./PostsList";
import { CreatePostForm } from "./CreatePostForm";
import { EditPostForm } from "./EditPostForm";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in and is admin
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.email || user.email !== "avdulajirakli@gmail.com") {
      toast({
        title: "Not authorized",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Load posts
    const savedPosts = localStorage.getItem("motivational-posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, [navigate, toast]);
  
  const handleCreatePost = (post: Omit<Post, "id" | "date" | "author">) => {
    const newPost = {
      id: Date.now().toString(),
      ...post,
      date: new Date().toISOString().split("T")[0],
      author: "Coach Irakli",
    };
    
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem("motivational-posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsCreating(false);
    
    toast({
      title: "Post created",
      description: "Your motivational post has been published.",
    });
  };
  
  const handleUpdatePost = (post: Post) => {
    const updatedPosts = posts.map((p) => (p.id === post.id ? post : p));
    localStorage.setItem("motivational-posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setEditingPost(null);
    
    toast({
      title: "Post updated",
      description: "Your motivational post has been updated.",
    });
  };
  
  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    localStorage.setItem("motivational-posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    
    toast({
      title: "Post deleted",
      description: "Your motivational post has been removed.",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
    navigate("/login");
  };
  
  return (
    <div className="container mx-auto py-6 px-4 space-y-8 max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-md text-sm"
        >
          Logout
        </button>
      </div>
      
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Motivational Posts</CardTitle>
          <Button onClick={() => setIsCreating(true)} disabled={isCreating || !!editingPost}>
            Create New Post
          </Button>
        </CardHeader>
      </Card>
      
      {isCreating && (
        <CreatePostForm 
          onSubmit={handleCreatePost} 
          onCancel={() => setIsCreating(false)} 
        />
      )}
      
      {editingPost && (
        <EditPostForm 
          post={editingPost} 
          onSubmit={handleUpdatePost} 
          onCancel={() => setEditingPost(null)} 
        />
      )}
      
      <PostsList 
        posts={posts} 
        onEdit={setEditingPost} 
        onDelete={handleDeletePost} 
      />
    </div>
  );
}

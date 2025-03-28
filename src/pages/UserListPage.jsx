import { useEffect } from "react";
import { useUsers } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import UserCard from "@/components/UserCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search } from "lucide-react";

const UserListPage = () => {
  const { 
    filteredUsers, 
    loading, 
    error, 
    pagination, 
    fetchUsers, 
    searchQuery,
    setSearchQuery
  } = useUsers();
  const { logout } = useAuth();

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.total_pages) {
      fetchUsers(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-16">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="flex items-center gap-1 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" /> 
              <span className="sm:inline hidden">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/70 transition-all duration-200 focus:bg-white"
          />
        </div>

        {loading && filteredUsers.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-80 rounded-md bg-card/20 animate-pulse"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
            <Button 
              onClick={() => fetchUsers(pagination.page)} 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found.</p>
            {searchQuery && (
              <Button 
                onClick={() => setSearchQuery('')} 
                variant="outline" 
                className="mt-4"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {!searchQuery && pagination.total_pages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                    className="transition-all duration-200"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pagination.page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        disabled={loading}
                        className="w-9 h-9 transition-all duration-200"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.total_pages || loading}
                    className="transition-all duration-200"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserListPage;

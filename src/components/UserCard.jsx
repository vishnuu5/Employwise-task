import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUsers } from "@/contexts/UserContext";
import UserEditForm from "./UserEditForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const UserCard = ({ user }) => {
  const { deleteUserById } = useUsers();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteUserById(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group bg-white/80 backdrop-blur-sm border border-border/40">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%] bg-muted/30 overflow-hidden">
          <Avatar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 transition-transform duration-500 group-hover:scale-110">
            <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="object-cover" />
            <AvatarFallback className="text-2xl font-medium">
              {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="p-5 text-center">
        <h3 className="text-xl font-semibold tracking-tight mb-1">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 mr-2">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <UserEditForm 
              user={user} 
              onSuccess={() => setIsEditOpen(false)}
            />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex-1">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the user
                account and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                disabled={isDeleteLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleteLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
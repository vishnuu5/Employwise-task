import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-primary rounded-full"></div>
        <div className="h-3 w-3 bg-primary rounded-full"></div>
        <div className="h-3 w-3 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
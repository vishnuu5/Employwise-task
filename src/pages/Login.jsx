import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email)=> {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isEmailValid && isPasswordValid) {
      await login(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-semibold tracking-tight">Sign In</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className="bg-white/50 transition-all duration-200 focus:bg-white"
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-sm text-destructive animate-slide-up">{emailError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className="bg-white/50 transition-all duration-200 focus:bg-white"
                  disabled={isLoading}
                />
                {passwordError && (
                  <p className="text-sm text-destructive animate-slide-up">{passwordError}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : "Sign In"}
              </Button>
            </CardFooter>
          </form>
          
          {error && (
            <div className="px-6 pb-6">
              <p className="text-sm text-destructive text-center animate-slide-up">{error}</p>
            </div>
          )}
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
          <p>
            Demo credentials (pre-filled): <br />
            <code className="bg-muted/50 px-1 py-0.5 rounded text-muted-foreground">eve.holt@reqres.in / cityslicka</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

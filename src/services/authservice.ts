import { database } from "@/lib/databaseClient";
import { User, SignupData } from "@/types/auth";

// Simple password hashing (for demo only - use proper hashing in production)
const simpleHash = (password: string): string => {
  return btoa(password); // Base64 encoding for demo
};

export const authService = {
  // Login user
  async login(email: string, password: string): Promise<User> {
    try {
      console.log("Attempting login for:", email);

      const { data: user, error } = await database
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .single();

      if (error) {
        console.error("database error:", error);
        throw new Error("Invalid email or password");
      }

      if (!user) {
        throw new Error("User not found");
      }

      // For demo, we'll use simple password matching
      // In production, use proper password hashing comparison
      const hashedPassword = simpleHash(password);
      if (user.password_hash !== hashedPassword) {
        throw new Error("Invalid email or password");
      }

      console.log("Login successful for user:", user.email);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Sign up new user
  async signup(userData: SignupData): Promise<User> {
    try {
      console.log("Starting signup process for:", userData.email);

      // Check if user already exists
      const { data: existingUser } = await database
        .from("users")
        .select("email")
        .eq("email", userData.email.toLowerCase().trim())
        .single();

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create new user
      const newUser = {
        email: userData.email.toLowerCase().trim(),
        password_hash: simpleHash(userData.password),
        first_name: userData.first_name.trim(),
        last_name: userData.last_name.trim(),
        user_type: userData.user_type,
        bio: userData.bio?.trim() || "",
        avatar_url: null,
      };

      console.log("Creating user with data:", {
        ...newUser,
        password_hash: "***",
      });

      const { data: createdUser, error } = await database
        .from("users")
        .insert([newUser])
        .select()
        .single();

      if (error) {
        console.error("database insert error:", error);
        throw new Error(`Failed to create user: ${error.message}`);
      }

      if (!createdUser) {
        throw new Error("No user data returned after creation");
      }

      console.log("User created successfully:", createdUser.email);
      return createdUser;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Get current user (for demo, we'll use localStorage)
  async getCurrentUser(): Promise<User | null> {
    try {
      if (typeof window === "undefined") return null;

      const userData = localStorage.getItem("currentUser");
      if (!userData) return null;

      const user = JSON.parse(userData);

      // Verify user still exists in database
      const { data } = await database
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      return data || null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Logout user
  async logout(): Promise<void> {
    localStorage.removeItem("currentUser");
  },
};

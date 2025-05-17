import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AuthModal from "@/components/modals/AuthModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/hooks/useAuth";
import {
  BrainCircuit,
  Check, FileCode, Network,
  PackageOpen,
  Sparkle,
  Sparkles,
  Table
} from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signin");

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/projects");
    } else {
      navigate("/untitled-project");
    }
  };

  const handleSignIn = () => {
    setAuthMode("signin");
    setIsAuthOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setIsAuthOpen(true);
  };

  const HomePageBackground = React.memo(() => {
    return (
      <>
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
              willChange: "transform",
            }}
          />
        </div>

        <div className="fixed top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-[80px] opacity-60 z-0 will-change-transform" />
        <div className="fixed bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-primary/15 blur-[80px] opacity-50 z-0 will-change-transform" />

        {/* Animated glow effects with hardware acceleration hints */}
        <div 
          className="fixed top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[100px] opacity-40 z-0" 
          style={{ 
            animation: "pulse 4s infinite ease-in-out",
            willChange: "opacity, transform",
          }}
        />
        <div 
          className="fixed bottom-[10%] left-[15%] w-[15%] h-[15%] rounded-full bg-indigo-500/10 blur-[90px] opacity-30 z-0"
          style={{ 
            animation: "pulse 5s infinite ease-in-out 1s",
            willChange: "opacity, transform",
          }}
        />
      </>
    );
  });

  return (
    <>
      <Navbar
        onSignInClick={handleSignIn}
        onSignUpClick={handleSignUp}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />

      <div className="relative overflow-hidden">
        <HomePageBackground />

        <Container className="py-12 relative z-10">
          {/* Hero Section */}
          <FadeIn duration={400} direction="up">
            <div className="text-center mb-16">
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>The fastest way to populate your database</span>
                </div>
                </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-primary/40 to-primary dark:from-foreground dark:to-primary/70 bg-clip-text text-transparent">
                AI-Powered SQL Test Data Generator
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-muted-foreground">
                Quickly generate realistic test data to populate your database
                using AI that understands relationships and context
              </p>
              <FadeIn delay={150} duration={400}>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-primary"
                    onClick={handleGetStarted}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Test Data Now
                  </Button>

                  {!isAuthenticated && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 text-lg bg-background border-primary/20"
                      onClick={handleSignIn}
                    >
                      Sign in
                    </Button>
                  )}
                </div>
              </FadeIn>
            </div>
          </FadeIn>

          {/* Features Section */}
          <FadeIn delay={100} duration={400} staggerChildren staggerDelay={100}>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="border rounded-lg p-6 flex flex-col items-center text-center bg-background/90 shadow hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Network className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Visual Diagram Editor
                </h3>
                <p className="text-muted-foreground">
                  Design database schemas visually with our intuitive diagram
                  editor. Drag, drop, and connect tables to create complex
                  relationships.
                </p>
              </Card>

              <Card className="border rounded-lg p-6 flex flex-col items-center text-center bg-background/90 shadow hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  AI-Generated Test Data
                </h3>
                <p className="text-muted-foreground">
                  Generate realistic, contextually appropriate test data for
                  your tables powered by AI that respects relationships and
                  constraints.
                </p>
              </Card>

              <Card className="border rounded-lg p-6 flex flex-col items-center text-center bg-background/90 shadow hover:shadow-md transition-shadow">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Table className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Multi-Table Projects
                </h3>
                <p className="text-muted-foreground">
                  Create complex database environments with related tables
                  organized into projects. Maintain referential integrity across
                  your schema.
                </p>
              </Card>
            </div>
          </FadeIn>

          {/* Diagram Editor Showcase */}
          <FadeIn delay={250} duration={400}>
            <div className="mt-20">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Design Your Schema Visually
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our intuitive diagram editor makes database design simple.
                    Create tables, define fields, and establish relationships
                    through an easy-to-use visual interface.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>Drag and drop tables to organize your schema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Draw connections between tables to create relationships
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>Define primary and foreign keys visually</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>Export your schema as SQL DDL statements or CSV files</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-xl border p-4 shadow-lg">
                  <img
                    src={
                      theme.resolvedTheme === "dark"
                        ? "/visual-design-dark.png"
                        : "/visual-design.png"
                    }
                    alt="Diagram Editor Preview"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* SQL Generation Showcase */}
          <FadeIn delay={300} duration={400}>
            <div className="mt-24">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl border p-4 shadow-lg relative group">
                  <div className="aspect-video w-full overflow-hidden rounded-lg relative">
                    <img
                      src={
                        theme.resolvedTheme === "dark"
                          ? "/create-sql-dark.png"
                          : "/create-sql.png"
                      }
                      alt="Create SQL Preview"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src={
                        theme.resolvedTheme === "dark"
                          ? "/insert-sql-dark.png"
                          : "/insert-sql.png"
                      }
                      alt="Insert SQL Preview"
                      className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded text-muted-foreground">
                      Hover to see INSERT statements
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Generate Perfect SQL Automatically
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Let AI handle the SQL generation for you. Get CREATE TABLE
                    statements for your schema and INSERT statements filled with
                    contextually appropriate test data.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Auto-generate CREATE TABLE statements with proper
                        constraints
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Intelligent INSERT statements with realistic test data
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Respect foreign key relationships and data integrity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5" />
                      <span>
                        Export ready-to-use SQL scripts or CSV files for any database system
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Secondary Features Section */}
          <FadeIn delay={300} duration={400}>
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-10">
                Generate Test Data in Seconds
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-primary/10 p-2">
                    <FileCode className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Multiple Export Formats
                    </h3>
                    <p className="text-muted-foreground">
                      Export your data as SQL scripts or CSV files, compatible with
                      all major database systems and spreadsheet applications
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-primary/10 p-2">
                    <Sparkle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      AI Schema Design
                    </h3>
                    <p className="text-muted-foreground">
                      Transform natural language descriptions into complete database 
                      schemas with tables and relationships using AI
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-primary/10 p-2">
                    <Network className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Smart Relationships
                    </h3>
                    <p className="text-muted-foreground">
                      Generate data that maintains referential integrity across
                      tables, ensuring all relationships are valid
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-primary/10 p-2">
                    <PackageOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Ready-to-Use Templates
                    </h3>
                    <p className="text-muted-foreground">
                      Apply pre-built templates for common data types like names,
                      addresses, and product details with contextually appropriate variations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Multi-Dialect Support Section */}
          <FadeIn delay={350} duration={400}>
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-center mb-10">
                Supports Multiple SQL Dialects
              </h2>
              <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                Generate SQL that works perfectly with your specific database
                system. Our tool implements best practices for each dialect,
                ensuring compatibility and optimal performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* MySQL */}
                <div className="bg-background border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center">
                    <img src="/mysql.svg" alt="MySQL" className="h-16 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">MySQL</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>InnoDB engine recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>MySQL-specific indexing strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Optimized JSON and ENUM support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* PostgreSQL */}
                <div className="bg-background border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center">
                    <img
                      src="/postgresql.svg"
                      alt="PostgreSQL"
                      className="h-16 mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-3">PostgreSQL</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Advanced data types (JSONB, Arrays)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Proper schema organization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Inheritance and partitioning support</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* SQLite */}
                <div className="bg-background border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center">
                    <img src="/sqlite.svg" alt="SQLite" className="h-16 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">SQLite</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Optimized for embedded applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Efficient storage class selection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Simplified constraints that work</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Oracle */}
                <div className="bg-background border rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center">
                    <img src="/oracle.svg" alt="Oracle" className="h-16 mb-4" />
                    <h3 className="text-xl font-semibold mb-3">Oracle</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Tablespace organization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>PL/SQL compatible syntax</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Proper sequence implementation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* How It Works Section */}
          <FadeIn delay={400} duration={400}>
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-10">
                How It Works
              </h2>

              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-16 left-[calc(50%-1px)] h-[calc(100%-4rem)] w-0.5 bg-primary/20 hidden md:block" />

                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6">
                  {/* Step 1 */}
                  <div className="md:text-right p-4 rounded-lg bg-background/60 border backdrop-blur-sm">
                    <h3 className="text-lg font-medium mb-2">
                      1. Define Your Schema
                    </h3>
                    <p className="text-muted-foreground">
                      Design your database visually using our intuitive diagram
                      editor to create tables and relationships
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>

                  <div className="hidden md:block" />

                  {/* Step 2 */}
                  <div className="hidden md:block" />

                  <div className="flex justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-background/60 border backdrop-blur-sm">
                    <h3 className="text-lg font-medium mb-2">
                      2. Generate Test Data
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI creates contextually aware test data that respects
                      relationships and constraints
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="md:text-right p-4 rounded-lg bg-background/60 border backdrop-blur-sm">
                    <h3 className="text-lg font-medium mb-2">
                      3. Preview & Refine
                    </h3>
                    <p className="text-muted-foreground">
                      Instantly see your generated data and make adjustments as
                      needed
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>

                  <div className="hidden md:block" />

                  {/* Step 4 */}
                  <div className="hidden md:block" />

                  <div className="flex justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-background/60 border backdrop-blur-sm">
                    <h3 className="text-lg font-medium mb-2">
                      4. Export & Populate
                    </h3>
                    <p className="text-muted-foreground">
                      Download SQL scripts or CSV files and use them to quickly populate your
                      database with quality test data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={350} duration={400} direction="up">
            <div className="mt-20 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white backdrop-blur-sm shadow-lg">
              <div className="md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Ready to populate your database with quality test data?
                  </h2>
                  <p className="mt-2 max-w-2xl">
                    Create an account to enable multi-table projects, save your
                    schema designs, and generate test data faster - completely
                    free.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex gap-4">
                  <Button
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={
                      isAuthenticated
                        ? () => navigate("/projects")
                        : handleSignUp
                    }
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Create Account"}
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>

          <Footer />
        </Container>
      </div>

      <AuthModal
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        initialMode={authMode}
      />
      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </>
  );
};

export default LandingPage;

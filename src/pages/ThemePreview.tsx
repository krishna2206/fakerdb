import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, Info, Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemePreview = () => {
  const { theme, setTheme } = useTheme();
  const [progress, setProgress] = React.useState(45);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Theme Preview</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme("light")}
            className={theme === "light" ? "border-primary" : ""}
          >
            <Sun className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "border-primary" : ""}
          >
            <Moon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="buttons" className="w-full mb-8">
        <TabsList className="grid grid-cols-6 w-full md:w-[600px] mb-4">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="misc">Misc</TabsTrigger>
        </TabsList>
        
        {/* Buttons Section */}
        <TabsContent value="buttons" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Button Variants</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2 items-center">
                <Button>Default</Button>
                <span className="text-xs text-muted-foreground">Default</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="secondary">Secondary</Button>
                <span className="text-xs text-muted-foreground">Secondary</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="destructive">Destructive</Button>
                <span className="text-xs text-muted-foreground">Destructive</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="outline">Outline</Button>
                <span className="text-xs text-muted-foreground">Outline</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="ghost">Ghost</Button>
                <span className="text-xs text-muted-foreground">Ghost</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="link">Link</Button>
                <span className="text-xs text-muted-foreground">Link</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button variant="outline-destructive">Outline Destructive</Button>
                <span className="text-xs text-muted-foreground">Outline Destructive</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button disabled>Disabled</Button>
                <span className="text-xs text-muted-foreground">Disabled</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Button Sizes</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 items-center">
                <Button size="sm">Small</Button>
                <span className="text-xs text-muted-foreground">Small</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button>Default</Button>
                <span className="text-xs text-muted-foreground">Default</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button size="lg">Large</Button>
                <span className="text-xs text-muted-foreground">Large</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button size="icon" variant="outline"><Plus /></Button>
                <span className="text-xs text-muted-foreground">Icon</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <Button><Check className="mr-2" /> With Icon</Button>
                <span className="text-xs text-muted-foreground">With Icon</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Inputs Section */}
        <TabsContent value="inputs" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Text Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="default">Default Input</Label>
                <Input id="default" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Disabled input" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="withIcon" className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> Input with Label Icon
                </Label>
                <Input id="withIcon" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="error">Input with Error</Label>
                <Input id="error" placeholder="Error state" className="border-destructive" />
                <p className="text-destructive text-sm">This field is required</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Select Input</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="select">Select</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-select">Disabled Select</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Disabled" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Checkbox & Radio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-muted-foreground">Disabled checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checked" defaultChecked />
                  <Label htmlFor="checked">Checked by default</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-three" id="option-three" disabled />
                    <Label htmlFor="option-three" className="text-muted-foreground">Disabled Option</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Switches & Sliders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-disabled" disabled />
                  <Label htmlFor="switch-disabled" className="text-muted-foreground">Disabled Switch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-checked" defaultChecked />
                  <Label htmlFor="switch-checked">Enabled by default</Label>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label>Default Slider</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Range Slider</Label>
                  <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Cards Section */}
        <TabsContent value="cards" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Card with simple header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is a basic card component with a header and content section.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Card with actions in the footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content with paragraph text that demonstrates the spacing and typography.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Interactive Card Example</CardTitle>
                  <CardDescription>Card with form elements inside</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Enter first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Enter last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Alerts Section */}
        <TabsContent value="alerts" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Alerts & Badges</h2>
            <div className="grid grid-cols-1 gap-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert with basic styling.</AlertDescription>
              </Alert>
              
              <Alert variant="error">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Alert</AlertTitle>
                <AlertDescription>Something went wrong! Please check your submission.</AlertDescription>
              </Alert>
              
              <Alert className="border-primary bg-primary/5">
                <Check className="h-4 w-4 text-primary" />
                <AlertTitle>Success Alert</AlertTitle>
                <AlertDescription>Your changes have been saved successfully.</AlertDescription>
              </Alert>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Custom</Badge>
            </div>
            
            <h2 className="text-2xl font-semibold pt-4">Progress</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Default Progress</Label>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              
              <div className="space-y-2">
                <Label>Indeterminate Progress</Label>
                <Progress className="animate-pulse" />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Colors Section */}
        <TabsContent value="colors" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Theme Colors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Base Colors</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-background border"></div>
                    <div>
                      <p className="font-medium">Background</p>
                      <p className="text-sm text-muted-foreground">--background</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-foreground"></div>
                    <div>
                      <p className="font-medium">Foreground</p>
                      <p className="text-sm text-muted-foreground">--foreground</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-card border"></div>
                    <div>
                      <p className="font-medium">Card</p>
                      <p className="text-sm text-muted-foreground">--card</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-card-foreground"></div>
                    <div>
                      <p className="font-medium">Card Foreground</p>
                      <p className="text-sm text-muted-foreground">--card-foreground</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">UI Colors</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-primary"></div>
                    <div>
                      <p className="font-medium">Primary</p>
                      <p className="text-sm text-muted-foreground">--primary</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-primary-foreground"></div>
                    <div>
                      <p className="font-medium">Primary Foreground</p>
                      <p className="text-sm text-muted-foreground">--primary-foreground</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-secondary"></div>
                    <div>
                      <p className="font-medium">Secondary</p>
                      <p className="text-sm text-muted-foreground">--secondary</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-secondary-foreground"></div>
                    <div>
                      <p className="font-medium">Secondary Foreground</p>
                      <p className="text-sm text-muted-foreground">--secondary-foreground</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Accent Colors</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-accent"></div>
                    <div>
                      <p className="font-medium">Accent</p>
                      <p className="text-sm text-muted-foreground">--accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-accent-foreground"></div>
                    <div>
                      <p className="font-medium">Accent Foreground</p>
                      <p className="text-sm text-muted-foreground">--accent-foreground</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-muted"></div>
                    <div>
                      <p className="font-medium">Muted</p>
                      <p className="text-sm text-muted-foreground">--muted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-muted-foreground"></div>
                    <div>
                      <p className="font-medium">Muted Foreground</p>
                      <p className="text-sm text-muted-foreground">--muted-foreground</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Semantic Colors</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-destructive"></div>
                    <div>
                      <p className="font-medium">Destructive</p>
                      <p className="text-sm text-muted-foreground">--destructive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded bg-destructive-foreground"></div>
                    <div>
                      <p className="font-medium">Destructive Foreground</p>
                      <p className="text-sm text-muted-foreground">--destructive-foreground</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded border border-border"></div>
                    <div>
                      <p className="font-medium">Border</p>
                      <p className="text-sm text-muted-foreground">--border</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded border-2 border-ring"></div>
                    <div>
                      <p className="font-medium">Ring</p>
                      <p className="text-sm text-muted-foreground">--ring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Misc Section */}
        <TabsContent value="misc" className="space-y-8">
          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold">Popovers & Miscellaneous</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Popovers</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">Set the dimensions for the popover.</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input id="width" defaultValue="300" className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="height">Height</Label>
                          <Input id="height" defaultValue="200" className="col-span-2" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Separators</h3>
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <div>Left</div>
                    <Separator orientation="vertical" className="h-4" />
                    <div>Right</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Typography</h3>
                <div className="space-y-4">
                  <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      Heading 1
                    </h1>
                    <p className="text-sm text-muted-foreground">text-4xl / text-5xl font-extrabold tracking-tight</p>
                  </div>
                  <div>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                      Heading 2
                    </h2>
                    <p className="text-sm text-muted-foreground">text-3xl font-semibold tracking-tight</p>
                  </div>
                  <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Heading 3
                    </h3>
                    <p className="text-sm text-muted-foreground">text-2xl font-semibold tracking-tight</p>
                  </div>
                  <div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Heading 4
                    </h4>
                    <p className="text-sm text-muted-foreground">text-xl font-semibold tracking-tight</p>
                  </div>
                  <div>
                    <p className="leading-7">
                      The quick brown fox jumps over the lazy dog. This is a paragraph with standard text formatting. It demonstrates the default typography styles in both light and dark modes.
                    </p>
                    <p className="text-sm text-muted-foreground">leading-7 (Paragraph)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      This is muted text that's typically used for less important information or hints.
                    </p>
                    <p className="text-xs text-muted-foreground">text-sm text-muted-foreground</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemePreview;
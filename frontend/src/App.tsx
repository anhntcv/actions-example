import { useState, useEffect } from 'react';
import { Events, WML } from "@wailsio/runtime";
import { GreetService } from "../bindings/changeme";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { 
  Terminal, 
  Clock, 
  Send, 
  Github, 
  Cpu, 
  Info, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Sparkles,
  Server
} from "lucide-react";

function App() {
  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<string>('Ready to greet you.');
  const [time, setTime] = useState<string>('Waiting for time event...');
  const [greetingActive, setGreetingActive] = useState<boolean>(false);

  const doGreet = () => {
    let localName = name.trim();
    if (!localName) {
      localName = 'Developer';
    }
    setGreetingActive(true);
    GreetService.Greet(localName)
      .then((resultValue: string) => {
        setResult(resultValue);
      })
      .catch((err: any) => {
        console.error(err);
        setResult('Error calling backend service.');
      })
      .finally(() => {
        setTimeout(() => setGreetingActive(false), 600);
      });
  };

  useEffect(() => {
    const timeUnsubscribe = Events.On('time', (timeValue: any) => {
      setTime(timeValue.data);
    });
    
    // Reload WML so it picks up wml tags if any
    WML.Reload();

    return () => {
      timeUnsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent font-sans antialiased text-slate-200">
      {/* Draggable Titlebar Spacer for macOS Native Transparency */}
      <div 
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties} 
        className="h-12 flex items-center justify-between px-6 bg-slate-950/40 backdrop-blur-md border-b border-white/5 select-none"
      >
        <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-slate-400">
          <Terminal className="h-4.5 w-4.5 text-violet-400" />
          <span className="font-mono">ACTIONS-COPILOT</span>
        </div>
        <div 
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          className="flex items-center space-x-2"
        >
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] py-0 px-2 font-mono flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE
          </Badge>
          <Badge variant="outline" className="bg-violet-500/15 text-violet-300 border-violet-500/20 text-[10px] py-0 px-2 font-mono">
            v3.0.0-alpha
          </Badge>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full flex flex-col space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
              Wails v3 + React + Shadcn
              <Sparkles className="h-6 w-6 text-fuchsia-400 animate-pulse" />
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Building lightweight, high-performance native desktop apps using Go, Vite, and Tailwind.
            </p>
          </div>
        </div>

        {/* Tab Navigation Area */}
        <Tabs defaultValue="dashboard" className="w-full flex-1 flex flex-col space-y-4">
          <TabsList className="bg-slate-900/60 border border-white/5 p-1 w-full justify-start md:w-auto self-start">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-violet-600/35 data-[state=active]:text-white">
              <Monitor className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="release-flow" className="data-[state=active]:bg-violet-600/35 data-[state=active]:text-white">
              <Layers className="h-4 w-4 mr-2" />
              Release Flow
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-violet-600/35 data-[state=active]:text-white">
              <Info className="h-4 w-4 mr-2" />
              System Specs
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Greet Service Interaction */}
              <Card className="col-span-2 bg-slate-900/40 backdrop-blur-md border-white/5 shadow-xl hover:border-violet-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Server className="h-5 w-5 text-violet-400" />
                    Go Backend Bindings
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Interact directly with the Go struct methods bound to the frontend.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name-input" className="text-xs font-semibold text-slate-400 tracking-wider">ENTER YOUR NAME</label>
                    <div className="flex gap-2">
                      <Input
                        id="name-input"
                        placeholder="e.g. Satoshi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && doGreet()}
                        className="bg-slate-950/60 border-white/10 text-white placeholder-slate-500 focus:border-violet-500 focus:ring-violet-500"
                        autoComplete="off"
                      />
                      <Button 
                        onClick={doGreet} 
                        className={`bg-violet-600 hover:bg-violet-500 text-white transition-all font-medium ${greetingActive ? 'scale-95' : ''}`}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Greet
                      </Button>
                    </div>
                  </div>
                  
                  {/* Greeting result window */}
                  <div className="mt-4 p-4 rounded-lg bg-slate-950/50 border border-white/5">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">Response Payload</span>
                    <p className="font-mono text-sm text-violet-300 font-semibold">{result}</p>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-slate-500 flex justify-between border-t border-white/5 pt-4">
                  <span>Service: GreetService</span>
                  <span>Method: Greet(name string)</span>
                </CardFooter>
              </Card>

              {/* Card 2: Real-time event monitor */}
              <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 shadow-xl hover:border-violet-500/20 transition-all duration-300 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-fuchsia-400" />
                    Go Event Emitter
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Listening for real-time events broadcasted by Go.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center items-center py-6">
                  <div className="text-center space-y-2">
                    <div className="p-3 bg-fuchsia-500/10 rounded-full inline-block mb-2">
                      <Clock className="h-6 w-6 text-fuchsia-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">Emitted System Time</span>
                    <p className="text-sm font-semibold font-mono text-fuchsia-300">{time}</p>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-slate-500 border-t border-white/5 pt-4">
                  <span>Channel: "time" event stream</span>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Release Flow Tab Content */}
          <TabsContent value="release-flow" className="space-y-6 outline-none">
            <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Github className="h-5 w-5 text-indigo-400" />
                  GitHub Actions Release Pipeline
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Continuous Integration workflow to automatically compile and release Wails v3 applications across all systems.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Pipeline Flow Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-950/40 border border-white/5 space-y-2">
                    <Badge className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 font-mono">1. Code Trigger</Badge>
                    <p className="text-xs text-slate-400">
                      Pipeline activates whenever a tag matching <code className="bg-slate-900 px-1 py-0.5 rounded text-fuchsia-400">v*</code> is pushed to the repository.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-950/40 border border-white/5 space-y-2">
                    <Badge className="bg-violet-500/20 text-violet-300 hover:bg-violet-500/20 font-mono">2. Matrix Build</Badge>
                    <p className="text-xs text-slate-400">
                      GitHub spawns parallel runners: macOS (`macos-latest`), Windows (`windows-latest`), and Linux (`ubuntu-latest`).
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-950/40 border border-white/5 space-y-2">
                    <Badge className="bg-fuchsia-500/20 text-fuchsia-300 hover:bg-fuchsia-500/20 font-mono">3. Draft Release</Badge>
                    <p className="text-xs text-slate-400">
                      Gathers artifacts (AppImage, deb, rpm, exe installer, and mac bundle), and publishes them as a draft release.
                    </p>
                  </div>
                </div>

                {/* Platform Support Info */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold tracking-wider text-slate-400">SUPPORTED RELEASE PACKAGES</h3>
                  <div className="space-y-2">
                    {/* macOS Row */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30 border border-white/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-xs">Mac</div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">macOS (.app / .zip)</p>
                          <p className="text-[10px] text-slate-500">Universal bundle (arm64 + amd64 support)</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">darwin-universal</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>

                    {/* Windows Row */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30 border border-white/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-xs">Win</div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">Windows (.exe / NSIS Installer)</p>
                          <p className="text-[10px] text-slate-500">Static binary compiled with WebView2 integration</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">windows-amd64</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>

                    {/* Linux Row */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/30 border border-white/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-xs">Lin</div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">Linux (.deb / .rpm / AppImage)</p>
                          <p className="text-[10px] text-slate-500">Built using nfpm/appimagetool on GTK3/WebKit2Gtk env</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">linux-amd64</span>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-slate-500 border-t border-white/5 pt-4 flex items-center justify-between">
                <span>Workflow file: .github/workflows/release.yml</span>
                <span className="flex items-center gap-1 text-indigo-400 cursor-pointer" data-wml-openURL="https://github.com/features/actions">
                  View Actions Docs <ArrowRight className="h-3 w-3" />
                </span>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* System Specs Tab Content */}
          <TabsContent value="about" className="space-y-6 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-teal-400" />
                    Stack Specifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Underlying technologies running this desktop app.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Wails CLI Version</span>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-300">v3.0.0-alpha</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Frontend Runtime</span>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-300">React 18 / TypeScript</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Build Bundler</span>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-300">Vite 8</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Styling Engine</span>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-300">Tailwind CSS v3</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 shadow-xl flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-400" />
                    Window Capabilities
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Native window capabilities enabled on this instance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-slate-400">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    Translucent backdrop enabled on macOS.
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    Hidden/Inset native titlebar with HTML drag area.
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    Bi-directional Event dispatching.
                  </p>
                </CardContent>
                <CardFooter className="border-t border-white/5 pt-4 text-xs text-slate-500">
                  © 2026 Actions Copilot
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;

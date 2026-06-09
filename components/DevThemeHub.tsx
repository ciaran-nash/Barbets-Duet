'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Copy, Check, Download } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'barbets-dev-theme';

const defaultTheme = {
  // Light Mode
  '--background': '#F5F5F5',
  '--foreground': '#06211A',
  '--card': '#FFFFFF',
  '--card-foreground': '#06211A',
  '--primary': '#06211A',
  '--secondary': '#006F53',
  '--accent': '#DBFF66',
  '--muted': '#F4F4F5',
  '--muted-foreground': '#64748B',
  '--border': 'rgba(6, 33, 26, 0.1)',
  
  // Dark Mode
  '--background-dark': '#06211A',
  '--foreground-dark': '#F5F5F5',
  '--card-dark': '#082A21',
  '--card-foreground-dark': '#F5F5F5',
  '--primary-dark': '#DBFF66',
  '--accent-dark': '#DBFF66',
  '--muted-dark': '#082A21',
  '--muted-foreground-dark': '#94A3B8',
  '--border-dark': 'rgba(245, 245, 245, 0.1)',

  // Shared
  '--radius': '1', // Value in rem
  '--font-scale': '1', // Multiplier
} as const;

type ThemeKey = keyof typeof defaultTheme;

export function DevThemeHub() {
  const [theme, setTheme] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultTheme, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to parse saved theme', e);
        }
      }
    }
    return defaultTheme;
  });
  const [isCopied, setIsCopied] = useState(false);
  const [activeSystemMode, setActiveSystemMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  // Strictly development only - moved after hooks to follow Rules of Hooks
  const isDev = process.env.NODE_ENV === 'development';

  // Detect current system mode changes
  useEffect(() => {
    if (!isDev) return;
    
    const updateMode = () => {
      const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setActiveSystemMode(mode);
    };

    const observer = new MutationObserver(updateMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, [isDev]);

  // Apply to DOM whenever theme changes
  useEffect(() => {
    if (!isDev) return;


    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      let finalValue = value;
      
      if (key === '--radius') {
        finalValue = `${value}rem`;
      } else if (key === '--font-scale') {
        finalValue = value;
        document.documentElement.style.fontSize = `${16 * parseFloat(value)}px`;
      } else if (typeof value === 'string') {
        // If it's a 6-digit hex without #, add it
        if (value.match(/^[0-9a-fA-F]{6}$/)) {
          finalValue = `#${value}`;
        }
      }
      
      root.style.setProperty(key, finalValue);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme, isDev]);

  const updateVar = (key: string, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => {
    if (confirm('Are you sure you want to reset all theme overrides?')) {
      setTheme(defaultTheme);
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const handleExport = () => {
    const formatValue = (key: string, value: string) => {
      if (key === '--radius') return `${value}rem`;
      return value;
    };

    const css = `:root {
${Object.entries(theme)
  .filter(([key]) => !key.endsWith('-dark') && key !== '--font-scale')
  .map(([key, value]) => `  ${key}: ${formatValue(key, value)};`)
  .join('\n')}
}

.dark {
${Object.entries(theme)
  .filter(([key]) => key.endsWith('-dark'))
  .map(([key, value]) => `  ${key.replace('-dark', '')}: ${value};`)
  .join('\n')}
}`;
    navigator.clipboard.writeText(css);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isDev) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-2xl bg-primary hover:opacity-90 border-2 border-accent"
          >
            <Settings className="h-6 w-6 text-accent animate-spin-slow" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-10">
          <SheetHeader className="pb-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-3xl font-serif">Design System Hub</SheetTitle>
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                activeSystemMode === 'dark' ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              )}>
                Mode: {activeSystemMode}
              </div>
            </div>
            <SheetDescription className="text-base mt-2">
              Adjust tokens live. Export CSS to globals.css when ready.
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="colors-light" className="mt-10">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
              <TabsTrigger value="colors-light" className="text-[10px] font-medium">Light</TabsTrigger>
              <TabsTrigger value="colors-dark" className="text-[10px] font-medium">Dark</TabsTrigger>
              <TabsTrigger value="typography" className="text-[10px] font-medium">Typo</TabsTrigger>
              <TabsTrigger value="radii" className="text-[10px] font-medium">Radii</TabsTrigger>
            </TabsList>

            <TabsContent value="colors-light" className="space-y-8 pt-2">
              <div className="grid gap-6">
                <ThemeColorInput label="Background" variable="--background" value={theme['--background']} onChange={updateVar} />
                <ThemeColorInput label="Foreground" variable="--foreground" value={theme['--foreground']} onChange={updateVar} />
                <ThemeColorInput label="Card" variable="--card" value={theme['--card']} onChange={updateVar} />
                <ThemeColorInput label="Card FG" variable="--card-foreground" value={theme['--card-foreground']} onChange={updateVar} />
                <ThemeColorInput label="Primary" variable="--primary" value={theme['--primary']} onChange={updateVar} />
                <ThemeColorInput label="Accent" variable="--accent" value={theme['--accent']} onChange={updateVar} />
                <ThemeColorInput label="Muted" variable="--muted" value={theme['--muted']} onChange={updateVar} />
                <ThemeColorInput label="Muted FG" variable="--muted-foreground" value={theme['--muted-foreground']} onChange={updateVar} />
                <ThemeColorInput label="Border" variable="--border" value={theme['--border']} onChange={updateVar} isRgba />
              </div>
            </TabsContent>

            <TabsContent value="colors-dark" className="space-y-8 pt-2">
              <div className="grid gap-6">
                <ThemeColorInput label="Background" variable="--background-dark" value={theme['--background-dark']} onChange={updateVar} />
                <ThemeColorInput label="Foreground" variable="--foreground-dark" value={theme['--foreground-dark']} onChange={updateVar} />
                <ThemeColorInput label="Card" variable="--card-dark" value={theme['--card-dark']} onChange={updateVar} />
                <ThemeColorInput label="Card FG" variable="--card-foreground-dark" value={theme['--card-foreground-dark']} onChange={updateVar} />
                <ThemeColorInput label="Primary" variable="--primary-dark" value={theme['--primary-dark']} onChange={updateVar} />
                <ThemeColorInput label="Accent" variable="--accent-dark" value={theme['--accent-dark']} onChange={updateVar} />
                <ThemeColorInput label="Muted" variable="--muted-dark" value={theme['--muted-dark']} onChange={updateVar} />
                <ThemeColorInput label="Muted FG" variable="--muted-foreground-dark" value={theme['--muted-foreground-dark']} onChange={updateVar} />
                <ThemeColorInput label="Border" variable="--border-dark" value={theme['--border-dark']} onChange={updateVar} isRgba />
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-10 pt-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold tracking-wide uppercase">Global Font Scale</Label>
                  <span className="px-2 py-1 bg-muted rounded text-xs font-mono">{theme['--font-scale']}x</span>
                </div>
                <Slider 
                  min={0.8} 
                  max={1.2} 
                  step={0.05} 
                  value={[parseFloat(theme['--font-scale'])]} 
                  onValueChange={(vals: number[]) => updateVar('--font-scale', vals[0].toString())}
                  className="py-4"
                />
                <p className="text-[10px] text-muted-foreground italic text-center">Adjusts the base 16px root font size.</p>
              </div>
            </TabsContent>

            <TabsContent value="radii" className="space-y-10 pt-4">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold tracking-wide uppercase">Corner Radius</Label>
                  <span className="px-2 py-1 bg-muted rounded text-xs font-mono">{theme['--radius']}rem</span>
                </div>
                <Slider 
                  min={0} 
                  max={2} 
                  step={0.1} 
                  value={[parseFloat(theme['--radius'])]} 
                  onValueChange={(vals: number[]) => updateVar('--radius', vals[0].toString())}
                  className="py-4"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 space-y-4 border-t pt-8 pb-4">
            <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all" onClick={handleExport}>
              {isCopied ? <Check className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
              {isCopied ? 'Copied to Clipboard!' : 'Export Theme CSS'}
            </Button>
            
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive transition-colors" onClick={resetTheme}>
              Reset to Defaults
            </Button>
            
            {isCopied && (
              <pre className="p-4 bg-muted rounded-lg text-[10px] overflow-x-auto border">
                <code>
{`:root {
${Object.entries(theme)
  .filter(([key]) => !key.endsWith('-dark') && key !== '--font-scale')
  .map(([key, value]) => `  ${key}: ${key === '--radius' ? `${value}rem` : value};`)
  .join('\n')}
}

.dark {
${Object.entries(theme)
  .filter(([key]) => key.endsWith('-dark'))
  .map(([key, value]) => `  ${key.replace('-dark', '')}: ${value};`)
  .join('\n')}
}`}
                </code>
              </pre>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ThemeColorInput({ 
  label, 
  variable, 
  value, 
  onChange,
  isRgba = false 
}: { 
  label: string; 
  variable: string; 
  value: string; 
  onChange: (key: string, val: string) => void;
  isRgba?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="grid gap-1">
        <Label className="text-xs font-bold uppercase tracking-wider">{label}</Label>
        <code className="text-[10px] text-muted-foreground">{variable}</code>
      </div>
      <div className="flex items-center gap-2">
        <Input 
          type="text" 
          value={value} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(variable, e.target.value)} 
          className="h-8 w-24 text-[10px]"
        />
        {!isRgba && (
          <input 
            type="color" 
            value={value.startsWith('#') ? value : '#000000'} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(variable, e.target.value)}
            className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
          />
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';

interface PreloadItem {
  type: 'image' | 'font' | 'script';
  url: string;
  weight?: number; // For progress calculation
}

interface PreloadManagerState {
  isLoading: boolean;
  progress: number;
  isComplete: boolean;
}

export function usePreloadManager(items: PreloadItem[] = []) {
  const [state, setState] = useState<PreloadManagerState>({
    isLoading: true,
    progress: 0,
    isComplete: false
  });

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }, []);

  const preloadFont = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = url;
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load font: ${url}`));
      
      document.head.appendChild(link);
    });
  }, []);

  const preloadScript = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      
      document.head.appendChild(script);
    });
  }, []);

  const preloadItem = useCallback(async (item: PreloadItem): Promise<void> => {
    switch (item.type) {
      case 'image':
        return preloadImage(item.url);
      case 'font':
        return preloadFont(item.url);
      case 'script':
        return preloadScript(item.url);
      default:
        throw new Error(`Unknown preload type: ${item.type}`);
    }
  }, [preloadImage, preloadFont, preloadScript]);

  useEffect(() => {
    if (items.length === 0) {
      // If no items to preload, simulate a quick loading process
      const timer = setTimeout(() => {
        setState({
          isLoading: false,
          progress: 100,
          isComplete: true
        });
      }, 1500);

      return () => clearTimeout(timer);
    }

    let isCancelled = false;
    
    const loadResources = async () => {
      const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
      let loadedWeight = 0;

      // Add essential resources that should always be preloaded
      const essentialItems: PreloadItem[] = [
        ...items,
        // GSAP (if not already included)
        { type: 'script', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js', weight: 2 },
        // Google Fonts (Mona Sans is already in globals.css, but we can ensure it's loaded)
      ];

      // Filter out duplicates
      const uniqueItems = essentialItems.filter((item, index, self) => 
        index === self.findIndex(t => t.url === item.url)
      );

      const finalTotalWeight = uniqueItems.reduce((sum, item) => sum + (item.weight || 1), 0);

      try {
        // Load items with progress tracking
        for (const item of uniqueItems) {
          if (isCancelled) break;

          try {
            await preloadItem(item);
            loadedWeight += (item.weight || 1);
            
            const progress = Math.min(Math.round((loadedWeight / finalTotalWeight) * 100), 100);
            
            setState(prev => ({
              ...prev,
              progress
            }));

            // Small delay to make progress visible
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.warn(`Failed to preload ${item.type}: ${item.url}`, error);
            // Continue loading other items even if one fails
            loadedWeight += (item.weight || 1);
          }
        }

        if (!isCancelled) {
          // Ensure we reach 100% and add a small delay for UX
          setState(prev => ({ ...prev, progress: 100 }));
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setState({
            isLoading: false,
            progress: 100,
            isComplete: true
          });
        }
      } catch (error) {
        console.error('Preloading failed:', error);
        if (!isCancelled) {
          setState({
            isLoading: false,
            progress: 100,
            isComplete: true
          });
        }
      }
    };

    loadResources();

    return () => {
      isCancelled = true;
    };
  }, [items, preloadItem]);

  return state;
}

// Default preload items for the portfolio
export const defaultPreloadItems: PreloadItem[] = [
  // Add any specific images, fonts, or scripts your portfolio needs
  // Example:
  // { type: 'image', url: '/hero-background.jpg', weight: 3 },
  // { type: 'image', url: '/profile-photo.jpg', weight: 2 },
];

export default usePreloadManager;

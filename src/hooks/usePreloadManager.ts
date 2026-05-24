'use client';

import { useState, useEffect, useCallback } from 'react';

interface PreloadItem {
  type: 'image' | 'font' | 'script';
  url: string;
  weight?: number;
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

  const preloadItem = useCallback(async (item: PreloadItem): Promise<void> => {
    switch (item.type) {
      case 'image':
        return preloadImage(item.url);
      case 'font':
        return preloadFont(item.url);
      default:
        return Promise.resolve();
    }
  }, [preloadImage, preloadFont]);

  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => {
        setState({
          isLoading: false,
          progress: 100,
          isComplete: true
        });
      }, 1200);

      return () => clearTimeout(timer);
    }

    let isCancelled = false;

    const loadResources = async () => {
      const minDisplayTime = 3200; // Let ECG + text reveal complete
      const startTime = Date.now();
      const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
      let loadedWeight = 0;

      try {
        for (const item of items) {
          if (isCancelled) break;

          try {
            await preloadItem(item);
          } catch (error) {
            console.warn(`Failed to preload ${item.type}: ${item.url}`);
          }

          loadedWeight += (item.weight || 1);
          // Cap at 90% — only reach 100 after minDisplayTime
          const progress = Math.min(Math.round((loadedWeight / totalWeight) * 90), 90);

          if (!isCancelled) {
            setState(prev => ({ ...prev, progress }));
          }
        }

        // Wait for minimum display time so ECG + text animations finish
        const elapsed = Date.now() - startTime;
        if (elapsed < minDisplayTime) {
          await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsed));
        }

        if (!isCancelled) {
          setState({ isLoading: false, progress: 100, isComplete: true });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({ isLoading: false, progress: 100, isComplete: true });
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

export const defaultPreloadItems: PreloadItem[] = [
  { type: 'image', url: '/jerun_prifile.png', weight: 3 },
];

export default usePreloadManager;

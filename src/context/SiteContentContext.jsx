import { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultSiteContent } from '@/content/defaultSiteContent';
import { api, getAuthToken } from '@/lib/api';

const STORAGE_KEY = 'detalhe-site-content-cache';

const SiteContentContext = createContext(null);

function deepMerge(target, source) {
  if (!source) return target;
  const output = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue)) {
      output[key] = sourceValue;
    } else if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      output[key] = sourceValue;
    }
  }

  return output;
}

function loadCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return deepMerge(defaultSiteContent, JSON.parse(raw));
  } catch {
    return null;
  }
}

export function SiteContentProvider({ children }) {
  const [content, setContentState] = useState(() => loadCache() || defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);
  const saveTimer = useRef(null);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { content: remote } = await api.fetchContent();
        if (!cancelled) {
          setContentState(deepMerge(defaultSiteContent, remote));
          setSyncError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setSyncError(err.message);
          const cached = loadCache();
          if (cached) setContentState(cached);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const persistRemote = useCallback(async (nextContent) => {
    setSyncing(true);
    setSyncError(null);
    try {
      await api.saveContent(nextContent);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
      setSyncError(null);
    } catch (err) {
      setSyncError(err.message);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
      throw err;
    } finally {
      setSyncing(false);
    }
  }, []);

  const scheduleSave = useCallback((nextContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
    if (!getAuthToken()) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      persistRemote(nextContent).catch(() => {});
    }, 800);
  }, [persistRemote]);

  const setContent = useCallback((updater) => {
    setContentState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const merged = deepMerge(defaultSiteContent, next);
      scheduleSave(merged);
      return merged;
    });
  }, [scheduleSave]);

  const updateSection = useCallback((section, data) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, [setContent]);

  const resetContent = useCallback(async () => {
    setSyncing(true);
    try {
      const { content: reset } = await api.resetContent();
      const merged = deepMerge(defaultSiteContent, reset);
      setContentState(merged);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setSyncError(null);
    } catch (err) {
      localStorage.removeItem(STORAGE_KEY);
      setContentState(defaultSiteContent);
      setSyncError(err.message);
    } finally {
      setSyncing(false);
    }
  }, []);

  const exportContent = () => JSON.stringify(content, null, 2);

  const importContent = useCallback((jsonString) => {
    const parsed = JSON.parse(jsonString);
    const merged = deepMerge(defaultSiteContent, parsed);
    setContentState(merged);
    scheduleSave(merged);
  }, [scheduleSave]);

  const saveNow = useCallback(async () => {
    await persistRemote(contentRef.current);
  }, [persistRemote]);

  const value = useMemo(
    () => ({
      content,
      loading,
      syncing,
      syncError,
      setContent,
      updateSection,
      resetContent,
      exportContent,
      importContent,
      saveNow,
    }),
    [content, loading, syncing, syncError, setContent, updateSection, resetContent, importContent, saveNow]
  );

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
}

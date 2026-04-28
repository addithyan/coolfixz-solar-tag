import { useState, useCallback } from 'react';
import type { SavedTag, TagFormData } from '@/types';
import { APP_CONFIG } from '@/constants';

const getStoredTags = (): SavedTag[] => {
  try {
    const raw = localStorage.getItem(APP_CONFIG.storageKey);
    if (!raw) return [];
    return JSON.parse(raw) as SavedTag[];
  } catch {
    return [];
  }
};

const setStoredTags = (tags: SavedTag[]): void => {
  try {
    localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(tags));
  } catch (err) {
    console.error('Failed to save tags to localStorage:', err);
  }
};

export const useSavedTags = () => {
  const [savedTags, setSavedTags] = useState<SavedTag[]>(getStoredTags);

  const saveTag = useCallback((formData: TagFormData): SavedTag => {
    const newTag: SavedTag = {
      id: `tag-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      formData,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTag, ...getStoredTags()];
    setStoredTags(updated);
    setSavedTags(updated);
    return newTag;
  }, []);

  const deleteTag = useCallback((id: string): void => {
    const updated = getStoredTags().filter((t) => t.id !== id);
    setStoredTags(updated);
    setSavedTags(updated);
  }, []);

  const clearAll = useCallback((): void => {
    localStorage.removeItem(APP_CONFIG.storageKey);
    setSavedTags([]);
  }, []);

  return { savedTags, saveTag, deleteTag, clearAll };
};

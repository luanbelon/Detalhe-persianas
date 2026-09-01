import { useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';

export function useDocumentMeta() {
  const { content } = useSiteContent();

  useEffect(() => {
    document.title = content.meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute('content', content.meta.description);
  }, [content.meta.title, content.meta.description]);
}

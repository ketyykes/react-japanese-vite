import { useEffect, useState } from 'react';

export const useHomePageAnimation = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return { showContent };
};

// hooks/useDevice.ts
import { useState, useEffect } from 'react';

export function useDevice() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setDevice('mobile');
      } else if (width <= 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    // Check on load
    checkDevice();

    // Check when window resizes
    window.addEventListener('resize', checkDevice);

    // Cleanup
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return device;
}

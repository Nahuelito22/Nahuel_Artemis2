import { useEffect, useRef } from 'react';

/**
 * Hook to reveal an element when it enters the viewport using InteractionObserver.
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} - Ref to be attached to the target element
 */
const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Replace 'oculto' with 'visible' class
          entry.target.classList.remove('reveal-hidden');
          entry.target.classList.add('reveal-visible');
          
          // Optionally stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    }, {
      // Default threshold of 10%
      threshold: 0.1,
      ...options
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      // Ensure the hidden class is present initially
      currentElement.classList.add('reveal-hidden');
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return elementRef;
};

export default useScrollReveal;

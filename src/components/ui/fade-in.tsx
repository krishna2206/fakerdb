import { cn } from "@/lib/utils";
import React, { Children, isValidElement, useEffect, useState } from "react";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number; // delay in milliseconds
  duration?: number; // duration in milliseconds
  initialOpacity?: number; // initial opacity (0-100)
  as?: React.ElementType; // allows rendering as different elements
  direction?: "up" | "down" | "left" | "right" | "none"; // direction of the fade
  distance?: number; // distance to translate (in pixels)
  staggerChildren?: boolean; // whether to stagger the animation of children
  staggerDelay?: number; // delay between each child animation
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 400,
  initialOpacity = 0,
  as: Component = "div",
  className,
  direction = "none",
  distance = 20,
  staggerChildren = false,
  staggerDelay = 100,
  ...props
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run animations if the browser isn't reporting reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      setIsVisible(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Calculate transform based on direction - simplified for performance
  const getInitialTransform = () => {
    if (direction === "none") return "none";
    
    const axis = direction === "up" || direction === "down" ? "Y" : "X";
    const sign = direction === "up" || direction === "left" ? "" : "-";
    return `translate${axis}(${sign}${distance}px)`;
  };

  // If staggering children, wrap each child with its own fade animation
  // but limit the number of staggered children for better performance
  if (staggerChildren) {
    const childrenArray = Children.toArray(children);
    const maxStaggeredChildren = 5; // Limit the number of staggered children for performance
    
    return (
      <Component className={className} {...props}>
        {childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            // Use staggered delay only for first few children
            const childDelay = index < maxStaggeredChildren 
              ? delay + index * staggerDelay 
              : delay + maxStaggeredChildren * staggerDelay;
            
            return (
              <FadeIn
                key={index}
                delay={childDelay}
                duration={duration}
                initialOpacity={initialOpacity}
                direction={direction}
                distance={distance}
              >
                {child}
              </FadeIn>
            );
          }
          return child;
        })}
      </Component>
    );
  }

  // Performance optimization for transform
  const initialTransform = isVisible ? undefined : getInitialTransform();
  
  // Use hardware acceleration for animations
  return (
    <Component
      className={cn(
        isVisible ? "opacity-100" : `opacity-${initialOpacity}`,
        className
      )}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transform: initialTransform,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export { FadeIn };

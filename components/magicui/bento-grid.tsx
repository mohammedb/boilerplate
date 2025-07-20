import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from "./shine-border";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  shine?: {
    color: string[];
    borderWidth?: number;
    duration?: number;
  };
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(200px,_1fr)] grid-cols-1 gap-4 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  shine,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col overflow-hidden rounded-[32px] h-full",
      "bg-[#1a1a1a]",
      shine ? "" : "border border-[#F9F9F9]/10",
      "transform-gpu transition-all duration-300 hover:scale-[1.02]",
      className,
    )}
    {...props}
  >
    {shine && (
      <ShineBorder
        shineColor={shine.color}
        borderWidth={shine.borderWidth || 1}
        duration={shine.duration || 12}
      />
    )}
    
    {/* Background layer */}
    <div className="absolute inset-0">{background}</div>
    
    {/* Content container with overflow handling */}
    <div className="relative z-10 flex flex-col h-full">
      {/* Padding container that doesn't move */}
      <div className="p-8 md:p-10 h-full flex flex-col overflow-hidden">
        {/* Main content with hover animation */}
        <div className="pointer-events-none flex-1 flex transform-gpu flex-col transition-all duration-300 group-hover:-translate-y-10">
          <div className="mb-6 w-14 h-14 bg-[#F9F9F9]/10 rounded-full flex items-center justify-center flex-shrink-0 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75">
            <Icon className="h-7 w-7 text-[#F9F9F9]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-[#F9F9F9] mb-3">
            {name}
          </h3>
          <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Hidden CTA that appears on hover */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-8 md:bottom-10 left-8 md:left-10 right-8 md:right-10 flex transform-gpu flex-row items-center opacity-0 transition-all duration-300 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          <button className="pointer-events-auto">
            <a 
              href={href} 
              className="inline-flex items-center gap-2 text-[#E8FC6B] text-sm font-medium hover:text-[#E8FC6B]/80 transition-colors"
            >
              {cta}
              <ArrowRightIcon className="h-4 w-4 transition-transform hover:translate-x-1" />
            </a>
          </button>
        </div>
      </div>
    </div>
    
    {/* Hover overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[#F9F9F9]/[.02]" />
  </div>
);

export { BentoCard, BentoGrid };

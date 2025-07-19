import { Variants } from 'framer-motion'

// Qyspo animation design principles:
// - Smooth and elegant transitions
// - Subtle movements that feel premium
// - Strategic use of the lime accent glow
// - Consistent timing across the experience

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
    }
  }
}

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

// Glow effect for buttons and CTAs
export const glowPulse = {
  initial: {
    filter: 'blur(0px)',
    opacity: 0.5,
  },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
}

// Hover animations
export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  whileTap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
}

export const hoverGlow = {
  whileHover: { 
    boxShadow: '0 0 30px rgba(232, 252, 107, 0.5)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

// Navigation menu animations
export const navMenuSlide: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

// Card hover effect
export const cardHover = {
  rest: {
    borderColor: "rgba(249, 249, 249, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    borderColor: "rgba(232, 252, 107, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

// Text reveal animation
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}

// Smooth scroll reveal
export const scrollReveal = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    }
  }
}
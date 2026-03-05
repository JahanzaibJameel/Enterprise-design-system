// Auto-generated from motion.json - DO NOT EDIT MANUALLY
export const duration = {
  "instant": 50,
  "fast": 150,
  "normal": 300,
  "slow": 500,
  "slower": 750,
  "glacial": 1200
} as const;

export const easing = {
  "linear": "linear",
  "ease": "ease",
  "easeIn": "ease-in",
  "easeOut": "ease-out",
  "easeInOut": "ease-in-out"
} as const;

export const spring = {
  "gentle": {
    "damping": 20,
    "stiffness": 150,
    "mass": 1
  },
  "bouncy": {
    "damping": 14,
    "stiffness": 200,
    "mass": 1
  },
  "snappy": {
    "damping": 30,
    "stiffness": 300,
    "mass": 0.8
  },
  "stiff": {
    "damping": 40,
    "stiffness": 400,
    "mass": 0.5
  }
} as const;

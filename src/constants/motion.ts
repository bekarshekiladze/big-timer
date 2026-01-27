import { Variants } from "motion";

export const dotVariants: Variants = {
  jump: {
    transform: "translateY(-30px)",
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

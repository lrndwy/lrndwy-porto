"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { ChevronDown, Link as LinkIcon } from "lucide-react"
import { useState, type ReactNode } from "react"

interface Project {
  id: string
  title: string
  pricePerHour: string
  status: "Paid" | "Not Paid"
  categories: string[]
  description: string
  location: string
  timeAgo: string
  logoColor: string
  logoIcon: ReactNode
}

interface ProjectCardsProps {
  projects: Project[]
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  hover: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
} as const satisfies Variants

const expandedContentVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const satisfies Variants

const childVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
} as const satisfies Variants

const pillVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.05,
    y: -1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
  },
} as const satisfies Variants

const logoVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
} as const satisfies Variants

const chevronVariants = {
  hover: {
    scale: 1.1,
    backgroundColor: "#C1C7CD",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
  },
} as const satisfies Variants

function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="border-b border-border py-4 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className={`w-12 h-12 ${project.logoColor} rounded-xl flex items-center justify-center text-foreground text-lg font-semibold flex-shrink-0 shadow-sm`}
          >
            {project.logoIcon}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Status Row */}
            <motion.div className="flex items-center gap-3 mb-2" variants={childVariants}>
              <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
            </motion.div>

            {/* Expandable Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  variants={expandedContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  {/* Category Pills */}
                  <motion.div className="flex flex-wrap gap-2 gap-y-2 mb-4 min-w-0" variants={childVariants}>
                    {project.categories.map((category, index) => (
                      <motion.span
                        key={index}
                        variants={pillVariants}
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                        className="px-2 py-1 rounded-full text-xs font-medium cursor-pointer select-none shadow-sm bg-muted text-muted-foreground whitespace-normal break-words max-w-full"
                      >
                        {category}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Description */}
                  <motion.p className="text-muted-foreground text-left text-sm leading-relaxed mb-4" variants={childVariants}>
                    {project.description}
                  </motion.p>

                  {/* Location and Time */}
                  <motion.div className="flex items-center gap-2 text-sm text-muted-foreground" variants={childVariants}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <LinkIcon className="w-4 h-4" />
                    </motion.div>
                    <a href={project.location} target="_blank" rel="noreferrer" className="text-xs font-medium underline">GitHub</a>
                    <div className="w-px h-3 bg-gray-300 mx-1"></div>
                    <span className="text-xs">{project.timeAgo}</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chevron Button */}
        <motion.button
          variants={chevronVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ml-3 shadow-sm bg-muted text-foreground"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1 + 0.3,
              mass: 0.8,
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

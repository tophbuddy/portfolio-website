import { IconType } from 'react-icons';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  SiNodedotjs,
  SiPython,
  SiJava,
  SiGo,
  SiRust,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGit,
  SiGithub,
  SiJira,
  SiConfluence,
  SiFigma,
  SiVisualstudiocode,
  SiJetbrains,
  SiLinux,
  SiUbuntu,
  SiDebian,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
} from 'react-icons/si';
import {
  FaServer,
  FaDatabase,
  FaCloud,
  FaMobile,
  FaCode,
  FaTools,
  FaBrain,
  FaCheckCircle,
} from 'react-icons/fa';

/**
 * Interface for skill icon metadata
 */
interface SkillIconInfo {
  /** Icon component from react-icons or custom */
  icon: IconType;
  /** Color theme for the icon */
  color: {
    light: string;
    dark: string;
  };
  /** Optional background color */
  background?: {
    light: string;
    dark: string;
  };
}

/**
 * Mapping of skill IDs to their respective icons and colors
 */
export const skillIcons: Record<string, SkillIconInfo> = {
  // Languages
  javascript: {
    icon: SiJavascript,
    color: {
      light: '#F7DF1E',
      dark: '#F7DF1E',
    },
    background: {
      light: '#2A2A2A',
      dark: '#1A1A1A',
    },
  },
  typescript: {
    icon: SiTypescript,
    color: {
      light: '#3178C6',
      dark: '#3178C6',
    },
  },
  python: {
    icon: SiPython,
    color: {
      light: '#3776AB',
      dark: '#FFD43B',
    },
  },
  java: {
    icon: SiJava,
    color: {
      light: '#007396',
      dark: '#F89820',
    },
  },
  go: {
    icon: SiGo,
    color: {
      light: '#00ADD8',
      dark: '#00ADD8',
    },
  },
  rust: {
    icon: SiRust,
    color: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  },

  // Frontend Frameworks
  react: {
    icon: SiReact,
    color: {
      light: '#61DAFB',
      dark: '#61DAFB',
    },
  },
  nextjs: {
    icon: SiNextdotjs,
    color: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  },
  vue: {
    icon: SiVuedotjs,
    color: {
      light: '#4FC08D',
      dark: '#4FC08D',
    },
  },
  angular: {
    icon: SiAngular,
    color: {
      light: '#DD0031',
      dark: '#DD0031',
    },
  },

  // Frontend Technologies
  tailwind: {
    icon: SiTailwindcss,
    color: {
      light: '#38B2AC',
      dark: '#38B2AC',
    },
  },
  css: {
    icon: SiCss3,
    color: {
      light: '#1572B6',
      dark: '#1572B6',
    },
  },
  html: {
    icon: SiHtml5,
    color: {
      light: '#E34F26',
      dark: '#E34F26',
    },
  },

  // Backend
  nodejs: {
    icon: SiNodedotjs,
    color: {
      light: '#339933',
      dark: '#339933',
    },
  },
  server: {
    icon: FaServer,
    color: {
      light: '#718096',
      dark: '#A0AEC0',
    },
  },

  // DevOps & Cloud
  docker: {
    icon: SiDocker,
    color: {
      light: '#2496ED',
      dark: '#2496ED',
    },
  },
  kubernetes: {
    icon: SiKubernetes,
    color: {
      light: '#326CE5',
      dark: '#326CE5',
    },
  },
  aws: {
    icon: SiAmazonaws,
    color: {
      light: '#232F3E',
      dark: '#FF9900',
    },
  },
  gcp: {
    icon: SiGooglecloud,
    color: {
      light: '#4285F4',
      dark: '#4285F4',
    },
  },
  azure: {
    icon: SiMicrosoftazure,
    color: {
      light: '#0078D4',
      dark: '#0078D4',
    },
  },

  // Databases
  mongodb: {
    icon: SiMongodb,
    color: {
      light: '#47A248',
      dark: '#47A248',
    },
  },
  postgresql: {
    icon: SiPostgresql,
    color: {
      light: '#336791',
      dark: '#336791',
    },
  },
  mysql: {
    icon: SiMysql,
    color: {
      light: '#4479A1',
      dark: '#4479A1',
    },
  },
  redis: {
    icon: SiRedis,
    color: {
      light: '#DC382D',
      dark: '#DC382D',
    },
  },

  // Tools & Productivity
  git: {
    icon: SiGit,
    color: {
      light: '#F05032',
      dark: '#F05032',
    },
  },
  github: {
    icon: SiGithub,
    color: {
      light: '#181717',
      dark: '#FFFFFF',
    },
  },
  jira: {
    icon: SiJira,
    color: {
      light: '#0052CC',
      dark: '#0052CC',
    },
  },
  confluence: {
    icon: SiConfluence,
    color: {
      light: '#172B4D',
      dark: '#FFFFFF',
    },
  },
  figma: {
    icon: SiFigma,
    color: {
      light: '#F24E1E',
      dark: '#F24E1E',
    },
  },
  vscode: {
    icon: SiVisualstudiocode,
    color: {
      light: '#007ACC',
      dark: '#007ACC',
    },
  },
  jetbrains: {
    icon: SiJetbrains,
    color: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  },

  // Operating Systems
  linux: {
    icon: SiLinux,
    color: {
      light: '#FCC624',
      dark: '#FCC624',
    },
  },
  ubuntu: {
    icon: SiUbuntu,
    color: {
      light: '#E95420',
      dark: '#E95420',
    },
  },
  debian: {
    icon: SiDebian,
    color: {
      light: '#A81D33',
      dark: '#A81D33',
    },
  },

  // AI & ML
  tensorflow: {
    icon: SiTensorflow,
    color: {
      light: '#FF6F00',
      dark: '#FF6F00',
    },
  },
  pytorch: {
    icon: SiPytorch,
    color: {
      light: '#EE4C2C',
      dark: '#EE4C2C',
    },
  },
  scikit: {
    icon: SiScikitlearn,
    color: {
      light: '#F7931E',
      dark: '#F7931E',
    },
  },
  pandas: {
    icon: SiPandas,
    color: {
      light: '#150458',
      dark: '#FFFFFF',
    },
  },
  numpy: {
    icon: SiNumpy,
    color: {
      light: '#013243',
      dark: '#4DABCF',
    },
  },
  jupyter: {
    icon: SiJupyter,
    color: {
      light: '#F37626',
      dark: '#F37626',
    },
  },

  // Category Icons
  category_frontend: {
    icon: FaCode,
    color: {
      light: '#60A5FA',
      dark: '#3B82F6',
    },
  },
  category_backend: {
    icon: FaServer,
    color: {
      light: '#34D399',
      dark: '#10B981',
    },
  },
  category_devops: {
    icon: FaCloud,
    color: {
      light: '#F472B6',
      dark: '#EC4899',
    },
  },
  category_mobile: {
    icon: FaMobile,
    color: {
      light: '#A78BFA',
      dark: '#8B5CF6',
    },
  },
  category_database: {
    icon: FaDatabase,
    color: {
      light: '#FBBF24',
      dark: '#F59E0B',
    },
  },
  category_testing: {
    icon: FaCheckCircle,
    color: {
      light: '#4ADE80',
      dark: '#22C55E',
    },
  },
  category_ai: {
    icon: FaBrain,
    color: {
      light: '#FB7185',
      dark: '#F43F5E',
    },
  },
  category_tools: {
    icon: FaTools,
    color: {
      light: '#94A3B8',
      dark: '#64748B',
    },
  },
};

/**
 * Get icon info for a skill by ID
 */
export const getSkillIcon = (id: string): SkillIconInfo | undefined => {
  return skillIcons[id];
};

/**
 * Get category icon info by ID
 */
export const getCategoryIcon = (id: string): SkillIconInfo | undefined => {
  return skillIcons[`category_${id}`];
};

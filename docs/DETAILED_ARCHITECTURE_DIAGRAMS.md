# Detailed Architecture Diagrams

## 1. Overall Application Architecture

```mermaid
graph TD
    subgraph Frontend
        A[App Container] --> B[Theme Provider]
        B --> C[Router Provider]
        C --> D[Layout Container]
        D --> E[Navigation]
        D --> F[Main Content]
        D --> G[Footer]
        
        E --> E1[Navbar Component]
        E --> E2[Mobile Menu]
        E --> E3[Theme Toggle]
        
        F --> F1[Page Components]
        F --> F2[Shared Components]
        F --> F3[Animation System]
        
        G --> G1[Social Links]
        G --> G2[Contact Info]
        G --> G3[Newsletter]
    end

    subgraph State Management
        H[Theme Context]
        I[Navigation State]
        J[Form States]
        K[Animation States]
    end

    subgraph Data Layer
        L[API Services]
        M[Local Storage]
        N[Project Data]
        O[Blog Posts]
    end
```

## 2. Component Hierarchy

```mermaid
graph TD
    subgraph Pages
        A[Home Page] --> A1[Hero Section]
        A --> A2[Skills Section]
        A --> A3[Featured Projects]
        A --> A4[Blog Preview]
        
        B[Projects Page] --> B1[Project Grid]
        B1 --> B2[Project Card]
        B1 --> B3[Filter System]
        
        C[Blog Page] --> C1[Post List]
        C1 --> C2[Post Card]
        C1 --> C3[Category Filter]
        
        D[Contact Page] --> D1[Contact Form]
        D --> D2[Social Links]
        D --> D3[Map Integration]
    end

    subgraph Shared Components
        E[UI Elements] --> E1[Buttons]
        E --> E2[Input Fields]
        E --> E3[Cards]
        E --> E4[Modals]
        
        F[Layout] --> F1[Container]
        F --> F2[Grid]
        F --> F3[Flex Box]
        
        G[Animation] --> G1[Page Transition]
        G --> G2[Scroll Effects]
        G --> G3[Hover Effects]
    end
```

## 3. Data Flow Architecture

```mermaid
graph LR
    subgraph User Interactions
        A[User Input] --> B[Event Handlers]
        B --> C[State Updates]
    end

    subgraph State Management
        C --> D[Component State]
        C --> E[Context API]
        C --> F[Local Storage]
    end

    subgraph Data Processing
        D --> G[UI Updates]
        E --> H[Theme Changes]
        F --> I[Persistence]
    end

    subgraph Side Effects
        G --> J[DOM Updates]
        H --> K[Style Changes]
        I --> L[Cache Updates]
    end
```

## 4. Theme System Architecture

```mermaid
graph TD
    subgraph Theme Management
        A[Theme Provider] --> B[Theme Context]
        B --> C[Theme Storage]
        B --> D[Theme Switcher]
        
        C --> C1[Local Storage]
        C --> C2[System Preferences]
        
        D --> D1[Light Theme]
        D --> D2[Dark Theme]
    end

    subgraph Theme Application
        E[Component Styles] --> E1[Tailwind Classes]
        E --> E2[Custom CSS]
        E --> E3[Dynamic Styles]
        
        F[Color Schemes] --> F1[Primary Colors]
        F --> F2[Secondary Colors]
        F --> F3[Accent Colors]
    end
```

## 5. Responsive Design System

```mermaid
graph TD
    subgraph Breakpoints
        A[Mobile First] --> B[Tablet]
        B --> C[Desktop]
        C --> D[Large Screen]
    end

    subgraph Layout Changes
        E[Navigation] --> E1[Mobile Menu]
        E --> E2[Desktop Nav]
        
        F[Content] --> F1[Single Column]
        F --> F2[Multi Column]
        
        G[Images] --> G1[Mobile Optimized]
        G --> G2[Desktop Optimized]
    end

    subgraph Component Adaptations
        H[Cards] --> H1[Stack View]
        H --> H2[Grid View]
        
        I[Typography] --> I1[Mobile Size]
        I --> I2[Desktop Size]
    end
```

## 6. Animation System

```mermaid
graph TD
    subgraph Animation Types
        A[Page Transitions] --> A1[Fade Effects]
        A --> A2[Slide Effects]
        
        B[Scroll Animations] --> B1[Fade In]
        B --> B2[Slide Up]
        B --> B3[Scale]
        
        C[Hover Effects] --> C1[Scale]
        C --> C2[Color Change]
        C --> C3[Shadow]
    end

    subgraph Animation Control
        D[Framer Motion] --> D1[Variants]
        D --> D2[Gestures]
        D --> D3[Controls]
        
        E[Performance] --> E1[CSS Transitions]
        E --> E2[Transform]
        E --> E3[Opacity]
    end
```

## 7. Form Handling System

```mermaid
graph TD
    subgraph Form Components
        A[Form Container] --> B[Input Fields]
        A --> C[Validation]
        A --> D[Submission]
        
        B --> B1[Text Input]
        B --> B2[Text Area]
        B --> B3[Select]
        
        C --> C1[Client Validation]
        C --> C2[Error Messages]
        
        D --> D1[Submit Handler]
        D --> D2[Success State]
        D --> D3[Error State]
    end

    subgraph Data Processing
        E[Form Data] --> F[Data Validation]
        F --> G[API Request]
        G --> H[Response Handling]
    end
```

## 8. Project Showcase System

```mermaid
graph TD
    subgraph Project Display
        A[Project Grid] --> B[Project Cards]
        A --> C[Filter System]
        A --> D[Search]
        
        B --> B1[Image]
        B --> B2[Description]
        B --> B3[Technologies]
        B --> B4[Links]
        
        C --> C1[Category Filter]
        C --> C2[Tech Stack Filter]
        
        D --> D1[Search Input]
        D --> D2[Search Results]
    end

    subgraph Project Details
        E[Modal View] --> E1[Gallery]
        E --> E2[Full Description]
        E --> E3[Technical Details]
        E --> E4[Live Demo]
    end
```

## 9. Blog System

```mermaid
graph TD
    subgraph Blog Structure
        A[Blog Container] --> B[Post List]
        A --> C[Categories]
        A --> D[Search]
        
        B --> B1[Post Card]
        B --> B2[Pagination]
        
        C --> C1[Category List]
        C --> C2[Filter]
        
        D --> D1[Search Bar]
        D --> D2[Results]
    end

    subgraph Post Components
        E[Post View] --> E1[Header]
        E --> E2[Content]
        E --> E3[Comments]
        E --> E4[Related Posts]
        
        E2 --> E2a[Text]
        E2 --> E2b[Code Blocks]
        E2 --> E2c[Images]
    end
```

## 10. Performance Optimization System

```mermaid
graph TD
    subgraph Asset Optimization
        A[Images] --> A1[Compression]
        A --> A2[Lazy Loading]
        A --> A3[Responsive Sizes]
        
        B[Code] --> B1[Splitting]
        B --> B2[Minification]
        B --> B3[Tree Shaking]
    end

    subgraph Loading Strategy
        C[Initial Load] --> C1[Critical CSS]
        C --> C2[Preload]
        C --> C3[Async Scripts]
        
        D[Runtime] --> D1[Caching]
        D --> D2[Prefetching]
        D --> D3[Background Load]
    end
```

These diagrams provide a comprehensive view of the website's architecture from different perspectives. Each diagram focuses on a specific aspect of the system, making it easier to understand and implement the various components and their interactions.

The diagrams are designed to be modular, allowing you to implement features incrementally while maintaining a clear understanding of how each part fits into the larger system.

Would you like me to explain any specific diagram in more detail or create additional diagrams for other aspects of the system?

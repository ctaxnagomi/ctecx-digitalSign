# CTECX-DigitalSign: Workflow Diagrams

## Normal Digital Signature Process

```mermaid
graph TD
    A["👤 User Accesses App"] --> B["📄 Homepage"]
    B --> C["✏️ Canvas Ready"]
    C --> D{User Action?}
    D -->|Settings| E["⚙️ Adjust<br/>- Pen Size<br/>- Color<br/>- Background"]
    E --> C
    D -->|Draw| F["🖌️ Draw Signature"]
    F --> G["💾 Save to Memory"]
    G --> H{Continue?}
    H -->|Edit| I["↩️ Clear/Reset"]
    I --> C
    H -->|Export| J["📥 Download"]
    J --> K{Format?}
    K -->|PNG| L["🖼️ PNG<br/>Transparent"]
    K -->|JPG| M["📸 JPG<br/>White BG"]
    K -->|WebP| N["⚡ WebP<br/>Modern"]
    L --> O["✅ Download Complete"]
    M --> O
    N --> O
    
    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#e8f5e9
    style F fill:#fff9c4
    style J fill:#ffe0b2
    style O fill:#c8e6c9
```

## AI-Integrated PDF Signature Process

```mermaid
graph TD
    A["👤 User Accesses<br/>AI Integrated"] --> B["📤 Upload PDF"]
    B --> C["✅ File Validation<br/>- Type Check<br/>- Size Check<br/>- MIME Verify"]
    C --> D{Valid?}
    D -->|No| E["❌ Error Message"]
    E --> B
    D -->|Yes| F["📖 Parse PDF<br/>PDF.js Library"]
    F --> G["🔍 Extract Pages<br/>& Text"]
    G --> H["🤖 AI Detection<br/>Signature Box Analysis"]
    H --> I{Boxes Found?}
    I -->|No| J["⚠️ No Boxes<br/>Manual Mode"]
    J --> K["🎨 Canvas Editor"]
    I -->|Yes| L["📍 Confidence Score<br/>& Positioning"]
    L --> M["🎯 Render UI Overlay<br/>Signature Boxes"]
    M --> N["✏️ Sign Document"]
    K --> O["🖌️ Draw Signature"]
    N --> O
    O --> P{"Sign Again?"}
    P -->|Yes| Q["↩️ Clear Box"]
    Q --> N
    P -->|No| R["📥 Export PDF"]
    R --> S{Format?}
    S -->|PDF| T["📄 Signed PDF"]
    S -->|PNG| U["🖼️ Signature Only"]
    T --> V["✅ Download Complete"]
    U --> V
    
    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style H fill:#f3e5f5
    style M fill:#fff9c4
    style O fill:#fff9c4
    style V fill:#c8e6c9
```

## System Architecture Flow

```mermaid
graph LR
    subgraph Frontend["🎨 Frontend Layer"]
        HTML["HTML5<br/>Canvas API"]
        CSS["CSS3<br/>Glassmorphism"]
        JS["Vanilla JS<br/>Core Logic"]
    end
    
    subgraph Processing["⚙️ Processing Layer"]
        Canvas["Canvas<br/>Engine"]
        PDF["PDF.js<br/>Parser"]
        AI["AI Detection<br/>ML Pipeline"]
    end
    
    subgraph Export["💾 Export Layer"]
        Encoder["Image<br/>Encoder"]
        PDF_Writer["PDF<br/>Writer"]
        Storage["Local<br/>Storage"]
    end
    
    subgraph Deployment["🚀 Deployment"]
        Cloudflare["Cloudflare<br/>Workers"]
        CDN["Global<br/>CDN"]
        Pages["Cloudflare<br/>Pages"]
    end
    
    Frontend --> Processing
    Processing --> Export
    Export --> Deployment
    
    style Frontend fill:#e3f2fd
    style Processing fill:#f3e5f5
    style Export fill:#fff3e0
    style Deployment fill:#e8f5e9
```

## Data Flow Diagram

```mermaid
graph TD
    User["👤 User Input"] 
    
    subgraph Canvas_Flow["Canvas Signature Flow"]
        C1["Mouse/Touch Event"]
        C2["Canvas Drawing"]
        C3["Memory Buffer"]
        C4["Image Data"]
    end
    
    subgraph PDF_Flow["PDF Processing Flow"]
        P1["PDF Upload"]
        P2["PDF.js Parse"]
        P3["Text Extraction"]
        P4["Pattern Detection"]
        P5["Box Positioning"]
    end
    
    subgraph Export_Flow["Export Flow"]
        E1["Canvas Capture"]
        E2["Format Convert"]
        E3["Metadata Add"]
        E4["Download Blob"]
    end
    
    User -->|Normal Mode| C1
    User -->|AI Mode| P1
    
    C1 --> C2 --> C3 --> C4
    P1 --> P2 --> P3 --> P4 --> P5
    
    C4 --> E1
    P5 --> E1
    
    E1 --> E2 --> E3 --> E4
    
    style Canvas_Flow fill:#e1f5fe
    style PDF_Flow fill:#f3e5f5
    style Export_Flow fill:#fff3e0
```

## Component Interaction Diagram

```mermaid
graph TB
    App["CTECX-DigitalSign<br/>Application"]
    
    subgraph Header["Header Component"]
        Logo["Logo & Branding"]
        Nav["Navigation Menu"]
        Badge["New Badge"]
    end
    
    subgraph Hero["Hero Section"]
        Title["Title"]
        Carousel["Visitor Counter"]
        CTA["Call to Action"]
    end
    
    subgraph Main["Main Content"]
        Canvas_Mode["📝 Normal Mode"]
        AI_Mode["🤖 AI Mode"]
        API_Mode["⚡ API Mode"]
    end
    
    subgraph Features["Features"]
        Drawing["Canvas Drawing"]
        PDF_Process["PDF Processing"]
        Download["Export Options"]
        Contact["Contact Form"]
    end
    
    App --> Header
    App --> Hero
    App --> Main
    
    Canvas_Mode --> Drawing
    Canvas_Mode --> Download
    
    AI_Mode --> PDF_Process
    AI_Mode --> Drawing
    AI_Mode --> Download
    
    API_Mode --> Contact
    
    style App fill:#eceff1
    style Header fill:#e3f2fd
    style Hero fill:#e8f5e9
    style Main fill:#fff3e0
    style Features fill:#f3e5f5
```

## User Journey - Normal Mode

```mermaid
journey
    title Normal Digital Signature Process
    section Discovery
        Visit Website: 5: User
        View Hero: 5: User
        Scroll to Canvas: 4: User
    section Interaction
        Adjust Pen Size: 5: User
        Choose Color: 4: User
        Draw Signature: 5: User
    section Refinement
        Review Drawing: 4: User
        Clear and Redraw: 3: User
        Final Signature: 5: User
    section Export
        Select Format: 4: User
        Download File: 5: User
        Save Successfully: 5: User
```

## User Journey - AI Mode

```mermaid
journey
    title AI-Integrated PDF Signature Process
    section Discovery
        Access AI Page: 5: User
        Read Instructions: 4: User
        Prepare PDF: 5: User
    section Upload & Analysis
        Upload PDF: 5: User
        File Validation: 4: User
        AI Analysis: 5: User
        View Results: 5: User
    section Signing
        Place Signature 1: 5: User
        Place Signature 2: 4: User
        Review Document: 4: User
    section Export
        Select Export Type: 5: User
        Download Signed: 5: User
        Success: 5: User
```

## API Services Request Flow

```mermaid
graph TD
    Request["📨 Client Request"]
    Validation["✅ Validate Input"]
    Route["🛣️ Route Handling"]
    
    subgraph Auth["Authentication"]
        API_Key["Check API Key"]
        Rate_Limit["Check Rate Limit"]
    end
    
    subgraph Process["Processing"]
        Analysis["PDF Analysis"]
        Detection["Box Detection"]
        Formatting["Format Response"]
    end
    
    Response["📤 Send Response"]
    Log["📝 Log Request"]
    
    Request --> Validation
    Validation --> Route
    Route --> Auth
    Auth --> Process
    Process --> Response
    Response --> Log
    
    style Request fill:#c8e6c9
    style Response fill:#c8e6c9
    style Auth fill:#ffe0b2
    style Process fill:#bbdefb
```

## Deployment Pipeline

```mermaid
graph LR
    Code["💻 Source Code"]
    Build["🏗️ Build Process"]
    Test["🧪 Testing"]
    Deploy["🚀 Deploy"]
    Monitor["📊 Monitor"]
    
    Code -->|Git Push| Build
    Build -->|Lint & Minify| Test
    Test -->|E2E Tests| Deploy
    Deploy -->|Cloudflare| Monitor
    Monitor -->|Health Check| Code
    
    style Code fill:#e3f2fd
    style Build fill:#f3e5f5
    style Test fill:#fff3e0
    style Deploy fill:#c8e6c9
    style Monitor fill:#ffccbc
```

## Technology Stack

```mermaid
graph TB
    subgraph Frontend["Frontend Stack"]
        HTML["HTML5"]
        CSS["CSS3"]
        JS["Vanilla JS"]
    end
    
    subgraph Libraries["Libraries"]
        PDF_JS["PDF.js"]
        HTML2Canvas["html2canvas"]
        Mermaid["Mermaid.js"]
    end
    
    subgraph Deployment["Deployment"]
        Wrangler["Wrangler CLI"]
        Cloudflare["Cloudflare Workers"]
        Pages["Cloudflare Pages"]
    end
    
    subgraph Tools["Development Tools"]
        Git["Git"]
        NPM["NPM"]
        Build["Build Tools"]
    end
    
    Frontend --> Libraries
    Libraries --> Deployment
    Tools --> Deployment
    
    style Frontend fill:#e3f2fd
    style Libraries fill:#f3e5f5
    style Deployment fill:#fff3e0
    style Tools fill:#c8e6c9
```

---

**Last Updated:** March 17, 2026  
**Version:** 1.0  
**Author:** Wan Mohd Azizi

# Learning Site Page Template Specification

## 1. Page template overview
This template provides a modular, reusable structure for individual Learning Site pages across the Barbets Duet network, directly matching the latest visual design system. Driven by structured CMS fields, it ensures consistency in presentation while allowing each site to highlight its unique context, initiatives, and impact. The layout relies on alternating image-and-text blocks, clear typographic hierarchy, tag-based categorization, and rich data presentation.

## 2. Section-by-section structure

### Hero Header (Image & Video)
*   **Purpose:** Establish the site visually with a large header area containing imagery and an optional introductory video.
*   **CMS fields:**
    *   `Hero Background Image` (Image, Required)
    *   `Hero Video Link` (URL, Optional - e.g., YouTube/Vimeo embed)
*   **Content guidance:** Use a high-quality establishing shot of the site. Video could be a site tour or interview.
*   **Display rules:** Always visible at the top of the page.

### Overview & Site Details
*   **Purpose:** The main introduction to the site, its focus, and quick factual details.
*   **CMS fields:**
    *   `Site Name` (Text, Required)
    *   `Overview Text` (Rich Text, Required)
    *   `Site Focus Areas` (Repeatable List of Tags, Required)
    *   `Ecological Restoration Goals` (Repeatable List of Tags, Required)
    *   `Location` (Text - Region, Country, Required)
    *   `Date Founded` (Date/Text, Required)
    *   `Founder(s)` (Text, Required)
    *   `Member(s)` (Text, Required)
    *   `Website` (URL, Optional)
    *   `Social Media Links` (Repeatable Group: Platform, URL - Optional)
*   **Content guidance:** Keep the overview concise. Use small descriptive tags for Focus Areas and Goals.
*   **Display rules:** The details (Location, Founded, etc.) act as a sidebar or grid column next to the main overview.

### Challenges
*   **Purpose:** Honestly discuss the obstacles the site faces, adding transparency and authenticity.
*   **CMS fields:**
    *   `Challenges Description` (Rich Text, Optional)
    *   `Challenge Tags` (Repeatable List of Tags, Optional)
    *   `Challenges Image` (Image, Optional)
*   **Content guidance:** Frame challenges as areas where support or new strategies are needed. Use tags for quick scanning (e.g., "Funding", "Drought").
*   **Display rules:** Image on one side, text on the other. Hide section if description is empty.

### Projects & Initiatives
*   **Purpose:** Highlight specific ongoing or past projects within the learning site.
*   **CMS fields:**
    *   `Projects Description` (Rich Text, Required)
    *   `Projects Carousel` (Repeatable Group, Required):
        *   `Project Title` (Text)
        *   `Project Description` (Text)
        *   `Project Icon` (Asset, Optional)
    *   `Projects Area Image` (Image, Optional)
*   **Content guidance:** Keep individual project descriptions short so they fit neatly in carousel cards.
*   **Display rules:** Display project cards in a horizontal slider/carousel.

### Site-specific restoration strategies
*   **Purpose:** Deep dive into the specific ecological methods being deployed.
*   **CMS fields:**
    *   `Strategies Description` (Rich Text, Optional)
    *   `Strategy Tags` (Repeatable List of Tags, Optional)
    *   `Strategies Image` (Image, Optional)
*   **Content guidance:** Be specific about the methodologies (e.g., "Mangrove afforestation", "Agroforestry").
*   **Display rules:** Alternating layout (image left/text right, or vice versa). Hide if empty.

### Ecological & Community Impact Data
*   **Purpose:** Present quantifiable data regarding the site's success and progress.
*   **CMS fields:**
    *   `Impact Introduction` (Rich Text, Optional)
    *   `Impact Action Buttons` (Repeatable Group: Label, Link - Optional, e.g., "Economic Impact Report")
    *   `Native Species Data` (Group, Optional):
        *   `Species Lists` (Rich Text/Categorized Lists - e.g., Birds, Mammals, Trees)
        *   `Species Big Metric` (Text/Number - e.g., "↑27%")
        *   `Species Metric Subtext` (Text)
    *   `Economic Impact Data` (Group, Optional):
        *   `Economic Big Metric` (Text/Number - e.g., "↑32%")
        *   `Economic Metric Subtext` (Text)
    *   `Other Metric Data` (Group, Optional):
        *   `Other Big Metric` (Text/Number - e.g., "↑61%")
        *   `Other Metric Subtext` (Text)
    *   `Impact Visuals` (Repeatable Assets, Optional)
*   **Content guidance:** Use large numbers and clear trend indicators (arrows).
*   **Display rules:** Represent data within distinct card components visually intermixed with supportive images.

### Future Goals
*   **Purpose:** Outline the upcoming objectives for the site.
*   **CMS fields:**
    *   `Goals Description` (Rich Text, Optional)
    *   `Goals Image` (Image, Optional)
*   **Content guidance:** Keep goals actionable and narrative.
*   **Display rules:** Hide section if empty. Alternating layout matching other sections.

### Image Gallery
*   **Purpose:** Showcase the site visually beyond the inline images.
*   **CMS fields:**
    *   `Gallery Description` (Text, Optional)
    *   `Gallery Assets` (Asset List/Gallery, Required ideally)
*   **Content guidance:** Include a mix of landscape, wildlife, and community action shots.
*   **Display rules:** Render as a horizontal image carousel with navigation arrows.

### Quote / Testimonial
*   **Purpose:** Feature a prominent voice from the site's community.
*   **CMS fields:**
    *   `Quote Text` (Rich Text or Text Area, Optional)
    *   `Author Name` (Text, Optional)
    *   `Author Position` (Text, Optional)
    *   `Author Avatar/Image` (Image, Optional)
*   **Content guidance:** Choose a quote that encapsulates the spirit or impact of the site.
*   **Display rules:** Centered, large typography. Hide if quote text is empty.

### Contact Learning Site Name
*   **Purpose:** Drive direct engagement or inquiries to the site operators.
*   **CMS fields:**
    *   `Contact Description` (Rich Text, Optional)
    *   `Contact Button Label` (Text, Optional)
    *   `Contact Email/URL` (URL, Optional)
*   **Content guidance:** Provide clear instructions on what they can contact the site for (partnerships, visits).
*   **Display rules:** Dark background block to stand out. Hide if button label/link is missing.

### Featured Learning Site & Explore Other Sites
*   **Purpose:** Keep the user engaged within the wider network.
*   **CMS fields:**
    *   `Featured Site` (Reference to another Learning Site entry, Optional)
    *   `Other Sites` (References to multiple Learning Site entries, Optional)
*   **Content guidance:** Curate connections. If none are specified, the system should randomly select other sites to display.
*   **Display rules:** Top section highlights one specific featured site with a large card and "Explore Site" button. Below that, a carousel of smaller site cards.

## 3. CMS field schema

**Group: Core Identity & Header**
*   `siteName` (String)
*   `heroImage` (Asset)
*   `heroVideo` (URL)
*   `overview` (Rich text)
*   `focusAreas` (Array of Strings - Tags)
*   `restorationGoals` (Array of Strings - Tags)

**Group: Sidebar Details**
*   `location` (String)
*   `dateFounded` (String/Date)
*   `founderNames` (String)
*   `memberNames` (String)
*   `websiteUrl` (URL)
*   `socialLinks` (Array of Objects: `platform`, `url`)

**Group: Challenges & Strategies**
*   `challengesText` (Rich text)
*   `challengeTags` (Array of Strings)
*   `challengesImage` (Asset)
*   `restorationText` (Rich text)
*   `restorationTags` (Array of Strings)
*   `restorationImage` (Asset)

**Group: Projects & Initiatives**
*   `projectsText` (Rich text)
*   `projects` (Array of Objects: `title`, `description`, `icon`)
*   `projectsImage` (Asset)

**Group: Impact Data**
*   `impactIntro` (Rich text)
*   `impactReports` (Array of Objects: `label`, `url`)
*   `speciesData` (Object: `listText`, `mainMetric`, `subtext`)
*   `economicData` (Object: `mainMetric`, `subtext`)
*   `otherData` (Object: `title`, `mainMetric`, `subtext`)
*   `impactImages` (Array of Assets)

**Group: Future Goals**
*   `futureGoalsText` (Rich text)
*   `futureGoalsImage` (Asset)

**Group: Media & Voices**
*   `galleryText` (String)
*   `galleryImages` (Array of Assets)
*   `testimonialQuote` (Text Area)
*   `testimonialAuthor` (String)
*   `testimonialPosition` (String)
*   `testimonialAvatar` (Asset)

**Group: Engagement & Network**
*   `contactIntro` (Rich text)
*   `contactButtonLabel` (String)
*   `contactLink` (URL)
*   `featuredSite` (Reference)
*   `relatedSites` (References)

## 4. Reusable block rules
*   **Tags & Labels:** Fields for Focus Areas, Goals, and Challenges use simple string arrays intended to be rendered as pill-shaped tags in the UI.
*   **Media-Text Alternation:** The design relies heavily on text pairs with a related image (`challengesImage`, `projectsImage`, etc.). If the image is omitted by the editor, the frontend must expand the text to full width or use a visually consistent placeholder to maintain layout flow.
*   **Impact Cards:** The Impact Data section features specific card structures. If `economicData` or `speciesData` is entirely omitted, the CSS grid should adjust fluidly to accommodate the remaining cards without leaving empty holes.

## 5. Editorial guidance
*   **Keep tags short:** Focus Areas, Strategies, and Challenge tags should be 1-3 words maximum (e.g., "Agroforestry", "Soil Erosion").
*   **Use impactful metrics:** For the impact cards, use clear directional data (like "↑32%") to convey progress instantly.
*   **High-contrast images:** The template relies on large grey/dark image placeholders in the design, suggesting a need for high-quality, high-contrast imagery to anchor the text content nicely. Avoid overly text-heavy images.

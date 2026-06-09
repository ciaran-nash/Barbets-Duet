# External Research Findings: community-network

Source: NotebookLM notebook synthesizing Barbets Duet governance, learning site network, and community platform requirements.

## 1. Jumuiya Governance Model

**Jumuiya Defined:** In Kiswahili, *Jumuiya* means a group of people with a shared vision, values, and goals. Barbets Duet uses it to define their collective as a "constellation of learning sites experimenting with ways to support people who support the natural world". It guides decision-making by prioritizing cross-border solidarity and horizontal knowledge exchange rather than top-down hierarchical control.

**Circular Peer Review:** To maintain accountability without a centralized bureaucracy, the collective utilizes a circular peer review system. Each site reviews and is reviewed by another in a continuous chain (e.g., Nkoroi & Seme review Molo, Molo reviews Woodland Valley, Woodland Valley reviews Hannacroix, etc.). If a site fails to meet its self-defined short- or long-term goals, it must explain the reasons (e.g., poor rainfall) to its peer reviewer.

**Utu (Humanity/Personhood):** Governed by the principle of "Utu Net Benefits," the collective ensures that the benefits of any intervention are widely defined and shared. Actions must generate net benefits for the individual, the surrounding community, and the environment simultaneously.

**Roles:**
- *Founding Partners / Site Coordinators:* Manage local land experiments and host conventions.
- *Junior Members / Youth:* The next generation actively integrated into leadership to ensure the project survives the multi-generational timeline required for true restoration.
- *Barbet's Friends:* Supporters, global investors, and volunteers providing skills-based or financial support.

**Decision-Making Workflow:** Governed by the principles of autonomy and practicality: "Each site evolves in its own way to its own conditions" and "Follow the path of least resistance; start with what is most possible". Decision-making is strictly decentralized to the local site level, relying on "Learning by demonstration" rather than seeking network-wide approval for local actions.

## 2. Learning Site Network Structure

**Geographic and Thematic Organization:** The network spans East Africa, the UK, and the USA. Key sites include:
- *USA:* Hannacroix Creek, NY (swamp forest remediation, hunter partnerships, beaver habitats).
- *UK:* Woodland Valley Farm, Cornwall (organic pasture-fed beef, eco-tourism, beaver reintroduction).
- *Kenya:* Seme & Nkoroi (water harvesting, agroforestry, tissue culture bananas); Lukenya (dry plains, acacia, goats); Arboretum Kajokoby; Zumula.
- *Tanzania:* Mlingotini (Msi Choke Seaweed Farmers Cooperative); Bagamoyo (Mwasama School Shamba Darasa); Himo (medicinal plants, native trees).
- *Uganda:* Molo (Nile River tributary, wetland restoration, fish ponds).

**Key Relationships & Groupings:** To manage scale, sites interact conceptually through "Pentangles"—groups of five sites located near each other that can easily communicate and advise one another.

**Shared Contexts:** Sites share cross-cultural dialogues despite diverse ecologies. For instance, both Molo (Uganda) and Hannacroix Creek (USA) focus heavily on restoring wetlands and waterways.

**Regional Differences:** East African sites generally navigate the complexities of traditional "Mosaic Rights" (shared, distributed land access characterized by footpaths) and focus on poverty alleviation, food security, and community cooperatives. UK and USA sites operate strictly within Western "Column Rights" (exclusive, vertical ownership characterized by fences) but experiment with integrating Mosaic principles of shared benefits, such as granting hunting or community access.

## 3. Member Interaction & Roles

**Member Types:**
- *Rural Practitioners:* Farmers and cooperative members operating in low-bandwidth environments.
- *Global Supporters/Researchers:* Impact investors and academics utilizing high-resolution data.
- *Junior Members:* Youth seeking internships, fellowships, and educational modules.

**Member Workflows:** Members browse interactive "Ground Truth" GIS maps, join the community via WhatsApp groups, contribute by answering "Trial and Error" prompts, and organize via skills-based volunteer matching.

**Permissions/Access:** The system requires equitable access, meaning low-bandwidth users (rural practitioners) must have offline capabilities via Progressive Web App (PWA) technology to draft and cache entries without active internet.

**Discovery:** Members discover collaborators not just by location, but by searching specific ecological challenges (e.g., invasive species, drought, financing) within the Trial and Error repository.

## 4. Community Features & Pages

**/community (Browse/Discover):**
- *Content Blocks:* A "Bento Grid" homepage featuring a dynamic media montage, an Impact Dashboard displaying summary metrics (hectares restored, sites active), and a global interactive map.
- *Interaction:* Clickable map layers (Leaflet.js or Felt) showing ecological corridors and water management.

**/community/[member-id] (Profiles):**
- *Content Blocks:* Bios, affiliated learning sites, and a required section displaying their answers to the core Trial and Error prompt: "Who would you include in your own Barbet circle and why?".

**/community/[site-slug]/members (Site-specific):**
- *Content Blocks:* Site specific goals, "enterprise stacking" ventures (e.g., seaweed soap sales, eco-tourism), and progress reports tracking ecological resilience.

**/community/network:**
- *Content Blocks:* "Global Friends Directory" and visualizations of the "Pentangle" advisory groups, mapping how sites consult one another.

**/community/governance:**
- *Content Blocks:* Educational resources explaining Mosaic vs. Column Rights, Utu Net Benefits, and the Circular Peer Review process.

**Accessibility + Mobile Considerations:** Strict adherence to WCAG 2.1/2.2 Level AA is mandated (keyboard navigability, alt-text for flora/fauna). Progressive Web App (PWA) architecture is required so rural East African members can access and upload content entirely offline.

## 5. Content Model Recommendations

**Data Types needed:** A headless CMS to handle structured qualitative data, geospatial coordinates for the GIS map, and chronological event schemas for the Convention Archives (2009–present).

**Profile / Contribution Structure:** Every project entry in the repository MUST answer four mandatory prompts to foster radical honesty over polished success:
1. What have you tried and how did it turn out?
2. What was your biggest mistake?
3. What did you learn and what made you laugh?
4. Who would you include in your own "Barbet circle" and why?

**Metadata:** Taxonomies should include property rights regime (Mosaic vs. Column), challenge type (climate, finance), and intervention type (agroforestry, water harvesting).

## 6. External Best Practices

**Platform Comparisons:** Platforms like Mighty Networks or Circle excel at organizing content into dedicated "Spaces." This mirrors Barbets Duet's "Pentangle" concept, allowing for local, sub-regional community spaces that feed into a global network. Slack is highly synchronous and bandwidth-heavy, making it poorly suited for the intermittent data connectivity of rural African learning sites. The collective's current use of WhatsApp is highly effective for low-bandwidth regions and should be integrated directly via API into the new web community.

**Balancing Moderation with Autonomy:** In decentralized networks, moderation should be pushed to the edges. By granting Site Coordinators the autonomy to moderate their own `/community/[site-slug]` spaces, the digital platform technically enforces the Barbets Duet principle that "Each site evolves in its own way to its own conditions".

**Motivating Participation:** In conservation communities, intrinsic motivation is driven by psychological safety. The Barbets Duet's mandate to share "biggest mistakes" creates a high-trust environment immune to corporate greenwashing. Extrinsic motivation is driven by the collective's core mission to solve the "Oak Tree Paradox"—meaning the community platform must prominently feature the "Economic Opportunities" and "Sustainable Ventures" portals so practitioners see a direct link between community participation and viable financial livelihoods.

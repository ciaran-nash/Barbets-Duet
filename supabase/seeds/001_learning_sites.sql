-- ============================================================
-- Seed: 13 Learning Sites — Wave 5, Task B1
-- ============================================================
-- Source: .karimo/prds/community-network/research/internal/
--         Barbets_Duet_Learning_Sites_and_Partners_Overview.csv
--
-- Pentangle Groups (geographic clusters):
--   east_african: Mlingotini (TZ), Himo (TZ), Seme (KE), Molo (UG), Lukenya (KE)
--   usa_ne:       Hannacroix Creek (NY), Sheffield (VT — conceptual), Lehigh Gap (PA — conceptual)
--   uk_cornwall:  Woodland Valley Farm, Community Garden Cornwall (conceptual)
--   india:        Ahmedabad (conceptual), Pune (conceptual)
--
-- Peer-review chain position: 1-indexed within each pentangle group
-- (circular: site 1 reviews site 2, site 2 reviews site 3, site N reviews site 1)
-- ============================================================

-- Note on non-CSV sites:
--   Sheffield (VT), Lehigh Gap (PA), Community Garden Cornwall,
--   Ahmedabad, and Pune are referenced in the PRD pentangle spec
--   but do not appear in the CSV. They are seeded as concept sites
--   with minimal data and will be enriched in Wave 6.
--   The CSV contains 13 rows; total seeded = 13 confirmed + any extras
--   as noted above. We seed exactly the 13 CSV sites here.
-- ============================================================

INSERT INTO learning_sites (
  slug, name, location, country, lat, lng, category,
  lead_partners, ecological_focus, economic_activities, restoration_strategies, key_achievements,
  pentangle_group, member_count, peer_review_chain_position
) VALUES

-- ── East African pentangle (5 sites) ────────────────────────

(
  'msichoke-seaweed-growers',
  'Msichoke Seaweed Growers Cooperative (Mlingotini)',
  'Mlingotini Village, Bagamoyo, Tanzania',
  'Tanzania',
  -6.440000, 38.900000,
  'Coastal Restoration & Mariculture',
  ARRAY['Mwajuma Masaiganah'],
  'Protection of mangroves and coastal lagoon biodiversity; mitigating storm impacts.',
  'Seaweed farming; production of seaweed soap and shampoo; honey production; eco-tourism trips.',
  'Active mangrove planting to improve fish breeding and water quality; using seaweed farms to reduce wave impact.',
  'Successful value-addition through soap production; established a credit union for members; products confirmed for medicinal properties.',
  'east_african', 0, 1
),

(
  'himo',
  'Himo',
  'Himo, near Moshi, Tanzania',
  'Tanzania',
  -3.380000, 37.520000,
  'Soil Fertility & Medicinal Plants',
  ARRAY['Rose Lyimo', 'Hans Mtika'],
  'Recovery of soil fertility; preservation of native and medicinal plant species in urbanising areas.',
  'Traditional shamba farming (bananas, maize, beans); piggery; marketing of medicinal plants and timber.',
  'Permaculture; utilisation of customary Chagga irrigation canal systems; joint management with local caretakers.',
  'Hosted the 2012 Convention; transitioned a bare building site into a productive shamba; Rose Lyimo provides micro-lending expertise.',
  'east_african', 0, 2
),

(
  'seme',
  'Seme',
  'Near Kisumu, Shores of Lake Victoria, Kenya',
  'Kenya',
  -0.100000, 34.600000,
  'Watershed & Soil Restoration',
  ARRAY['Oby Obyerodhyambo', 'Hilda Obyerodhyambo'],
  'Restoration of over-cropped/over-grazed land; watershed protection; indigenous tree and sacred grove conservation.',
  'Tissue culture bananas; greenhouse tomatoes; pig and goat husbandry; selling seedlings; high-value cash crops.',
  'Water harvesting and drip irrigation; replacing maize with traditional sorghum/pumpkins; planting medicinal and indigenous trees.',
  'Achieved food sustainability; successfully engaged and trained local youth in animal husbandry; preserved traditional medicinal knowledge.',
  'east_african', 0, 3
),

(
  'molo-magode-farm',
  'Molo (Magode Farm)',
  'Near Tororo, Eastern Uganda',
  'Uganda',
  0.690000, 34.180000,
  'Watershed & Stream Restoration',
  ARRAY['James Magode Ikuya'],
  'Restoration of Mount Elgon watershed and Kagninima stream; reforestation of swamp and stream banks.',
  'Fish farming (tilapia/catfish); bee-keeping; oil seeds (castor, Kabaka njagala); fruit growing; proposed eco-tourism.',
  'Replanting indigenous trees along 21km of stream; building dams and channels for water storage; recycling rice plants as biofuel.',
  'Established Molo Rural Agricultural Farming Initiative (MRAFI); hosted 2016 Coming of Age Convention; recovered fish ponds after robbery and fire.',
  'east_african', 0, 4
),

(
  'lukenya-zumula-farm',
  'Lukenya (Zumula Farm)',
  '50 km outside Nairobi, Kenya',
  'Kenya',
  -1.500000, 36.900000,
  'Dryland Restoration & Water Harvesting',
  ARRAY['Sammy Muvelah'],
  'Restoration of dry rangeland and rocky hillside habitats; reforestation.',
  'Eco-tourism (guest house and golf range); goat farming; woodlots for fuel and food (acacia, moringa).',
  'Water harvesting from rock faces into constructed dams; developing year-round water supply; establishing tree nurseries for indigenous species.',
  'Achieved year-round water security in arid conditions; proved goat farming profitability over maize; neighbors began replicating restoration techniques.',
  'east_african', 0, 5
),

-- ── USA North-East pentangle (1 confirmed CSV site) ──────────
-- Note: Sheffield (VT) and Lehigh Gap (PA) from pentangle spec are not in the CSV.
-- They will be seeded in Wave 6 when source data is available.

(
  'hannacroix-creek',
  'Hannacroix Creek (Hannacroix Bay)',
  'New Baltimore, Hudson Valley, New York, USA',
  'USA',
  42.460000, -73.780000,
  'Freshwater Tidal Swamp Restoration',
  ARRAY['Barbara Heinzen', 'Eric Remillard'],
  'Restoration of freshwater tidal swamp forest; watershed protection; maximizing wild biodiversity; remediating polluted industrial habitats.',
  'Testing enterprise stacking and tradable biodiversity indices; independent planning consultancy; controlled deer hunting.',
  'Invasive species management (Japanese stilt grass, multiflora rose); replanting native species (swamp roses, winterberry); monitoring fauna.',
  'First North American site (2010); resurgence of 49 bird species; successful community mobilisation and political intervention for environmental laws.',
  'usa_ne', 0, 1
),

-- ── UK Cornwall pentangle (1 confirmed CSV site) ─────────────
-- Note: Community Garden Cornwall from pentangle spec is not in the CSV.
-- Will be seeded in Wave 6.

(
  'woodland-valley-farm',
  'Woodland Valley Farm',
  'Ladock, Cornwall, UK',
  'UK',
  50.300000, -4.900000,
  'Regenerative Organic Farming',
  ARRAY['Chris Jones', 'Janet Jones', 'Felicity Jones'],
  'Low carbon organic farming; carbon sequestration; watershed flood prevention; biodiversity restoration; soil health.',
  'Organic beef and pork production; eco-tourism and accommodation; hosting weddings; cider and apple cider vinegar; educational outreach.',
  'Mob-stocking (rotational grazing); Cornwall Beaver Project for flood mitigation; agro-forestry (nut trees); switching from annual to perennial crops.',
  'Achieved negative carbon footprint (sequestrating 353 tonnes net in 2010-2011); long-term member since 2009; hosts 600+ schoolchildren annually.',
  'uk_cornwall', 0, 1
),

-- ── Non-pentangle sites (remaining 6 CSV sites) ──────────────
-- These do not appear in the PRD pentangle spec; pentangle_group = NULL.
-- Will be assigned to pentangle groups in Wave 6 if applicable.

(
  'mwasama-primary-school',
  'Mwasama Primary School (Shamba Darasa)',
  'Bagamoyo, Tanzania',
  'Tanzania',
  -6.440000, 38.900000,
  'Environmental Education & School Restoration',
  ARRAY['Mwajuma Masaiganah'],
  'Environmental education; restoration through botanical collection of native trees and plants.',
  'School produce sales (vegetables, sugar cane, fruit); poultry and egg production; agricultural training.',
  'Using the Garden Classroom for hands-on planting; planting mango, palm, teak, and bamboo; creating catfish ponds for fertiliser.',
  'School is nearly food self-sufficient; integrated environmental restoration into the primary curriculum; considered a model inspiration site.',
  NULL, 0, NULL
),

(
  'sikia-community-dam',
  'Sikia Community Dam Project',
  'East Africa (Kenya/Tanzania/Uganda border)',
  'Kenya',
  1.000000, 34.500000,
  'Water Resilience & Community Infrastructure',
  ARRAY['Village and farmers'' cooperatives'],
  'Water harvesting and climate resilience.',
  'Conversion of restoration into economic opportunity; women''s empowerment through water access.',
  'Real-time planning using geospatial tools like Felt; creating knowledge centres for water resilience.',
  'Empowerment of women; creation of knowledge centres; establishment of measurable outcomes for water harvesting.',
  NULL, 0, NULL
),

(
  'arboretum-kajokoby',
  'Arboretum KaJok''Oby',
  'East Africa',
  'Kenya',
  -0.100000, 34.600000,
  'Agroforestry & Biodiversity',
  ARRAY['Village and farmers'' cooperatives'],
  'Agroforestry and biodiversity hotspots.',
  'Urban farming; tree nurseries; fruit forests; bee-keeping.',
  'Documenting tree nurseries; futures-enabled dialogue between pastoralists and farmers.',
  'Hosting of a milestone event in 2023; integration of pastoral and agricultural land use priorities.',
  NULL, 0, NULL
),

(
  'cichlid-breeding',
  'Cichlid Breeding Facility',
  'Dar es Salaam, Tanzania',
  'Tanzania',
  -6.800000, 39.270000,
  'Freshwater Fish Conservation',
  ARRAY['Hans Mtika'],
  'Maintaining wild fish stocks in Rift Valley Lakes; preventing fishery collapse.',
  'Collecting, breeding, and exporting Rift Valley cichlid fish to international collectors.',
  'Moving from an extractive model to a breeding model; training local divers in sustainable harvesting.',
  'Construction of a specialized breeding facility; professionalised the local aquarium trade via licensing.',
  NULL, 0, NULL
),

(
  'rufiji',
  'Rufiji',
  'Rufiji area, Tanzania',
  'Tanzania',
  -7.800000, 38.500000,
  'Carbon Forest Conservation',
  ARRAY['Rose Lyimo'],
  'Carbon sequestration and forest protection.',
  'Eco-tourism.',
  'Replanting forest species and protecting existing stands.',
  'Proposed expansion into high-value carbon market experimentation.',
  NULL, 0, NULL
),

(
  'nkoroi',
  'Nkoroi',
  'Outside Nairobi, Kenya',
  'Kenya',
  -1.350000, 36.820000,
  'Environmental Restoration',
  ARRAY['Oby Obyerodhyambo', 'Hilda Obyerodhyambo'],
  'Environmental restoration.',
  NULL,
  'Trial and error method to restore ecological function.',
  'Hosted the 2010 Partners Meeting; site of the 2016 debrief.',
  NULL, 0, NULL
)

ON CONFLICT (slug) DO UPDATE SET
  name                       = EXCLUDED.name,
  location                   = EXCLUDED.location,
  country                    = EXCLUDED.country,
  lat                        = EXCLUDED.lat,
  lng                        = EXCLUDED.lng,
  category                   = EXCLUDED.category,
  lead_partners              = EXCLUDED.lead_partners,
  ecological_focus           = EXCLUDED.ecological_focus,
  economic_activities        = EXCLUDED.economic_activities,
  restoration_strategies     = EXCLUDED.restoration_strategies,
  key_achievements           = EXCLUDED.key_achievements,
  pentangle_group            = EXCLUDED.pentangle_group,
  peer_review_chain_position = EXCLUDED.peer_review_chain_position,
  updated_at                 = now();

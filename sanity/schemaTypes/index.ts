import { learningSiteSchema } from '../schemas/learningSite';
import { storySchema } from '../schemas/story';
import { eventSchema } from '../schemas/event';
import { projectSchema } from '../schemas/project';
import { teamMemberSchema } from '../schemas/teamMember';
import { trialAndErrorSchema } from '../schemas/trialAndError';

export const schemaTypes = [
  learningSiteSchema,
  storySchema,
  eventSchema,
  projectSchema,
  teamMemberSchema,
  trialAndErrorSchema,
];

import { config } from 'dotenv-cra';
import { z } from 'zod';

process.env.NODE_ENV ??= 'development';
config();

const alchemyApiKeySchema = z.string();
export const alchemyL1ApiKey = alchemyApiKeySchema.parse(process.env.ALCHEMY_L1_API_KEY);
export const alchemyL2ApiKey = alchemyApiKeySchema.parse(process.env.ALCHEMY_L2_API_KEY);

const chainIDSchema = z.number().int().positive().default(1);
const chainIDParser = z
	.string()
	.optional()
	.transform((port) => (port === undefined ? undefined : Number(port)));
export const l1ChainID = chainIDSchema.parse(chainIDParser.parse(process.env.L1_CHAIN_ID));
export const l2ChainID = chainIDSchema.parse(chainIDParser.parse(process.env.L2_CHAIN_ID));

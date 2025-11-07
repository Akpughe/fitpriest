/**
 * Airtable Setup Script
 *
 * Automatically creates all required tables in the Airtable base
 * with the correct schema definitions.
 */

import {
  getBaseSchema,
  createTable,
  tableExists,
  AIRTABLE_CONFIG,
} from './client';
import { AIRTABLE_SCHEMA, TableDefinition } from './schema';

export interface SetupResult {
  success: boolean;
  tablesCreated: string[];
  tablesExisting: string[];
  errors: Array<{ table: string; error: string }>;
}

/**
 * Setup all tables defined in the schema
 */
export async function setupAirtableTables(
  options: {
    force?: boolean; // If true, skip existence checks (for testing)
    verbose?: boolean; // If true, log detailed progress
  } = {}
): Promise<SetupResult> {
  const { force = false, verbose = false } = options;

  const result: SetupResult = {
    success: true,
    tablesCreated: [],
    tablesExisting: [],
    errors: [],
  };

  // Validate environment variables
  if (!AIRTABLE_CONFIG.apiKey) {
    result.success = false;
    result.errors.push({
      table: 'N/A',
      error: 'AIRTABLE_API_KEY environment variable is not set',
    });
    return result;
  }

  if (!AIRTABLE_CONFIG.baseId) {
    result.success = false;
    result.errors.push({
      table: 'N/A',
      error: 'AIRTABLE_BASE_ID environment variable is not set',
    });
    return result;
  }

  if (verbose) {
    console.log('🚀 Starting Airtable setup...');
    console.log(`📦 Base ID: ${AIRTABLE_CONFIG.baseId}`);
    console.log(`📋 Tables to create: ${AIRTABLE_SCHEMA.length}`);
    console.log('');
  }

  // Get existing schema
  let existingTables: string[] = [];
  try {
    const schema = await getBaseSchema();
    existingTables = schema.tables.map((t: any) => t.name);
    if (verbose) {
      console.log(`✅ Found ${existingTables.length} existing tables`);
      if (existingTables.length > 0) {
        console.log(`   Existing: ${existingTables.join(', ')}`);
      }
      console.log('');
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      table: 'N/A',
      error: `Failed to fetch existing schema: ${error instanceof Error ? error.message : String(error)}`,
    });
    return result;
  }

  // Create each table
  for (const tableDefinition of AIRTABLE_SCHEMA) {
    const tableName = tableDefinition.name;

    if (verbose) {
      console.log(`📊 Processing table: ${tableName}`);
    }

    // Check if table already exists
    if (!force && existingTables.includes(tableName)) {
      result.tablesExisting.push(tableName);
      if (verbose) {
        console.log(`   ⏭️  Table already exists, skipping...`);
        console.log('');
      }
      continue;
    }

    // Create the table
    try {
      await createTable(tableDefinition);
      result.tablesCreated.push(tableName);

      if (verbose) {
        console.log(`   ✅ Created successfully!`);
        console.log(`   📝 Fields: ${tableDefinition.fields.length}`);
        console.log('');
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      result.success = false;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({
        table: tableName,
        error: errorMessage,
      });

      if (verbose) {
        console.error(`   ❌ Failed to create table: ${errorMessage}`);
        console.log('');
      }
    }
  }

  // Print summary
  if (verbose) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SETUP SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Tables created: ${result.tablesCreated.length}`);
    if (result.tablesCreated.length > 0) {
      result.tablesCreated.forEach(t => console.log(`   - ${t}`));
    }
    console.log('');

    console.log(`⏭️  Tables already existing: ${result.tablesExisting.length}`);
    if (result.tablesExisting.length > 0) {
      result.tablesExisting.forEach(t => console.log(`   - ${t}`));
    }
    console.log('');

    if (result.errors.length > 0) {
      console.log(`❌ Errors: ${result.errors.length}`);
      result.errors.forEach(e => console.log(`   - ${e.table}: ${e.error}`));
      console.log('');
    }

    console.log(`🎯 Overall status: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  return result;
}

/**
 * Validate that all required tables exist
 */
export async function validateAirtableSchema(): Promise<{
  valid: boolean;
  missingTables: string[];
}> {
  try {
    const schema = await getBaseSchema();
    const existingTables = schema.tables.map((t: any) => t.name);
    const requiredTables = AIRTABLE_SCHEMA.map(t => t.name);

    const missingTables = requiredTables.filter(
      table => !existingTables.includes(table)
    );

    return {
      valid: missingTables.length === 0,
      missingTables,
    };
  } catch (error) {
    console.error('Failed to validate schema:', error);
    return {
      valid: false,
      missingTables: [],
    };
  }
}

/**
 * Get detailed information about the current base
 */
export async function getBaseInfo() {
  try {
    const schema = await getBaseSchema();
    return {
      baseId: AIRTABLE_CONFIG.baseId,
      tableCount: schema.tables.length,
      tables: schema.tables.map((t: any) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        fieldCount: t.fields.length,
        fields: t.fields.map((f: any) => ({
          name: f.name,
          type: f.type,
        })),
      })),
    };
  } catch (error) {
    throw new Error(
      `Failed to get base info: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

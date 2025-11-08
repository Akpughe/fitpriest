#!/usr/bin/env ts-node

/**
 * Airtable Setup Script Runner
 *
 * Run this script to automatically create all required Airtable tables.
 *
 * Usage:
 *   npm run setup:airtable           # Create tables with detailed logging
 *   npm run setup:airtable -- --quiet  # Create tables quietly
 *   npm run setup:airtable -- --info   # Show base info without creating tables
 *   npm run setup:airtable -- --validate  # Validate existing schema
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import {
  setupAirtableTables,
  validateAirtableSchema,
  getBaseInfo,
} from '../lib/airtable/setup';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const args = process.argv.slice(2);
  const isQuiet = args.includes('--quiet');
  const isInfo = args.includes('--info');
  const isValidate = args.includes('--validate');

  console.log('');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   THE FITNESS PRIEST - Airtable Setup      ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');

  // Show base info
  if (isInfo) {
    try {
      console.log('📊 Fetching base information...\n');
      const info = await getBaseInfo();

      console.log(`Base ID: ${info.baseId}`);
      console.log(`Total Tables: ${info.tableCount}\n`);

      if (info.tables.length > 0) {
        console.log('Tables:');
        info.tables.forEach((table: any, index: number) => {
          console.log(`\n${index + 1}. ${table.name}`);
          if (table.description) {
            console.log(`   Description: ${table.description}`);
          }
          console.log(`   Fields: ${table.fieldCount}`);
          table.fields.forEach((field: any) => {
            console.log(`     - ${field.name} (${field.type})`);
          });
        });
      } else {
        console.log('No tables found in base.');
      }

      console.log('');
      process.exit(0);
    } catch (error) {
      console.error('❌ Failed to get base info:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }

  // Validate schema
  if (isValidate) {
    try {
      console.log('🔍 Validating Airtable schema...\n');
      const validation = await validateAirtableSchema();

      if (validation.valid) {
        console.log('✅ Schema is valid! All required tables exist.\n');
        process.exit(0);
      } else {
        console.log('❌ Schema validation failed!');
        console.log(`Missing tables (${validation.missingTables.length}):`);
        validation.missingTables.forEach(table => {
          console.log(`  - ${table}`);
        });
        console.log('\nRun without --validate flag to create missing tables.\n');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Validation failed:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }

  // Setup tables
  try {
    const result = await setupAirtableTables({
      verbose: !isQuiet,
    });

    console.log('');

    if (result.success) {
      if (result.tablesCreated.length > 0) {
        console.log('✅ Setup completed successfully!');
        console.log(`   ${result.tablesCreated.length} table(s) created.`);
      } else if (result.tablesExisting.length > 0) {
        console.log('✅ All tables already exist!');
        console.log(`   ${result.tablesExisting.length} table(s) found.`);
      }

      console.log('');
      console.log('🎯 Your Airtable base is ready to use!');
      console.log('');

      process.exit(0);
    } else {
      console.error('❌ Setup failed with errors:');
      result.errors.forEach(err => {
        console.error(`   [${err.table}] ${err.error}`);
      });
      console.log('');
      process.exit(1);
    }
  } catch (error) {
    console.error('');
    console.error('❌ Unexpected error during setup:');
    console.error(error instanceof Error ? error.message : String(error));
    console.log('');

    if (error instanceof Error && error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }

    console.log('');
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check that AIRTABLE_API_KEY is set in .env.local');
    console.log('   2. Check that AIRTABLE_BASE_ID is set in .env.local');
    console.log('   3. Verify your API key has schema.bases:write permission');
    console.log('   4. Ensure the base ID is correct');
    console.log('');

    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

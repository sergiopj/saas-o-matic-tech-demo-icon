"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_seeder_service_1 = require("./shared/infrastructure/persistence/database-seeder.service");
async function bootstrapSeed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: ['log', 'error', 'warn'],
    });
    const seeder = app.get(database_seeder_service_1.DatabaseSeederService);
    console.log('🌱 [Seeder] Starting manual database seeding (force mode)...');
    try {
        const result = await seeder.seed(true);
        console.log(`✅ [Seeder] Seeding completed: ${result.customersCount} customers, ${result.simulationsCount} simulations.`);
    }
    catch (error) {
        console.error('❌ [Seeder] Seeding error:', error);
        process.exit(1);
    }
    finally {
        await app.close();
    }
    process.exit(0);
}
void bootstrapSeed();
//# sourceMappingURL=seed.js.map
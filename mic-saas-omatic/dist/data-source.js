"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const customer_typeorm_entity_1 = require("./modules/customers/infrastructure/adapters/out/persistence/customer.typeorm-entity");
const simulation_typeorm_entity_1 = require("./modules/simulations/infrastructure/adapters/out/persistence/simulation.typeorm-entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: process.env.DATABASE_NAME || 'saas_o_matic.sqlite',
    entities: [customer_typeorm_entity_1.CustomerTypeOrmEntity, simulation_typeorm_entity_1.SimulationTypeOrmEntity],
    migrations: ['src/infrastructure/adapters/out/persistence/migrations/*.ts'],
    synchronize: false,
    logging: false,
    enableWAL: true,
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map
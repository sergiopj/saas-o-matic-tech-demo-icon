"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmSqliteConfig = void 0;
exports.typeOrmSqliteConfig = {
    type: 'better-sqlite3',
    database: process.env.DATABASE_NAME || 'saas_o_matic.sqlite',
    autoLoadEntities: true,
    synchronize: true,
    logging: false,
    enableWAL: true,
};
//# sourceMappingURL=typeorm.config.js.map
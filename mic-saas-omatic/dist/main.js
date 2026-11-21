"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const yaml_1 = require("yaml");
const app_module_1 = require("./app.module");
const problem_detail_exception_filter_1 = require("./shared/infrastructure/filters/problem-detail-exception.filter");
const envPath = (0, node_path_1.join)(process.cwd(), '.env');
if ((0, node_fs_1.existsSync)(envPath) && typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(envPath);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Limit', 'X-Total-Pages'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new problem_detail_exception_filter_1.ProblemDetailExceptionFilter());
    const openApiCandidates = [
        (0, node_path_1.join)(process.cwd(), '../ai-workspace/01-specs/openapi.yaml'),
        (0, node_path_1.join)(process.cwd(), 'ai-workspace/01-specs/openapi.yaml'),
    ];
    const openApiPath = openApiCandidates.find((candidate) => (0, node_fs_1.existsSync)(candidate));
    if (openApiPath) {
        const yamlContent = (0, node_fs_1.readFileSync)(openApiPath, 'utf8');
        const openApiDocument = (0, yaml_1.parse)(yamlContent);
        swagger_1.SwaggerModule.setup('docs', app, openApiDocument);
    }
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`SaaS-O-Matic API is running on: http://localhost:${port}`);
    console.log(`Swagger UI documentation is available on: http://localhost:${port}/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerificationColumnsToUser1663350862400 implements MigrationInterface {
    name = 'AddVerificationColumnsToUser1663350862400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`verification_code\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`verified_at\` datetime NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`verified_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`verification_code\`
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsernameColName1662540939201 implements MigrationInterface {
    name = 'UpdateUsernameColName1662540939201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`username\` varchar(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`username\`
        `);
    }

}

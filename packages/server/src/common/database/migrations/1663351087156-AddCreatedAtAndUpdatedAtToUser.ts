import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtAndUpdatedAtToUser1663351087156 implements MigrationInterface {
    name = 'AddCreatedAtAndUpdatedAtToUser1663351087156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`updated_at\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`created_at\`
        `);
    }

}

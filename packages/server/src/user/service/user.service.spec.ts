import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { DateTime } from "luxon"
import { Repository } from "typeorm"
import { User } from "../entity/user.entity"
import { UserService } from "./user.service"

const oneUser = {
    id: 1,
    username: 'test_username',
    email: 'test@example.com',
    password: 'newPassword123!',
    verificationCode: null,
    verifiedAt: null,
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
}

describe('User Service', () => {
    let userService: UserService
    let repo: Repository<User>

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                // We need to mock the user repository methods
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOneBy: jest.fn().mockResolvedValue(oneUser)
                    }
                }
            ]
        }).compile()

        userService = moduleRef.get<UserService>(UserService)
        repo = moduleRef.get<Repository<User>>(getRepositoryToken(User))
    })

    describe('findById', () => {
        it('should return a user by their Id', async () => {
            const repoSpy = jest.spyOn(repo, 'findOneBy');
            expect(userService.findById(oneUser.id)).resolves.toEqual(oneUser)
            expect(repoSpy).toBeCalledWith({ id: 1 })
        })
    })
    describe('findByUsername', () => {
        it('should return a user by their username', async () => {
            const repoSpy = jest.spyOn(repo, 'findOneBy');
            expect(userService.findByUsername(oneUser.username))
            expect(repoSpy).toBeCalledWith({ username: oneUser.username })
        })
    })
    describe('findByEmail', () => {
        it('should return a user by their email', async () => {
            const repoSpy = jest.spyOn(repo, 'findOneBy');
            expect(userService.findByEmail(oneUser.email))
            expect(repoSpy).toBeCalledWith({ email: oneUser.email })
        })
    })
})
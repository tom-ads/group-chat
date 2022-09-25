import { DateTime } from "luxon"
import { User } from "src/user/entity/user.entity"

const UserStub: User = {
    id: 1,
    username: 'test_username',
    email: 'test@example.com',
    password: 'newPassword123!',
    verificationCode: null,
    verifiedAt: null,
    createdAt: DateTime.now(),
    updatedAt: DateTime.now(),
}

export default UserStub
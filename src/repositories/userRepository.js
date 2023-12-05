import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserRepository {
    static getAllUsers() {
        return prisma.user.findMany();
    }

    static getUserById(userId) {
        return prisma.user.findUnique({
            where: { id: userId },
        });
    }

    static createUser(userData) {
        return prisma.user.create({
            data: userData,
        })
    }
}

export default UserRepository;
import prisma from '../utils/index.js';

class UserRepository {
    static async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    static async findById(userId) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true, 
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    static createUser(userData) {
        return prisma.user.create({
            data: userData,
        })
    }
}

export default UserRepository;
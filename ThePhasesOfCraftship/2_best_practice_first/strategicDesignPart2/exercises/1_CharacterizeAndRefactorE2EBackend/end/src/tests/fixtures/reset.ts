import { prisma } from '../../database';

async function resetDatabase() {
    const deleteAllClassEnrollments = prisma.classEnrollment.deleteMany();
    const deleteAllStudentAssignments = prisma.studentAssignment.deleteMany();
    const deleteAllStudents = prisma.student.deleteMany();
    const deleteAllClasses = prisma.class.deleteMany()
    const deleteAllAssignments = prisma.assignment.deleteMany();

    await prisma.$transaction([deleteAllClassEnrollments, deleteAllStudentAssignments, deleteAllStudents, deleteAllClasses, deleteAllAssignments]);

    await prisma.$disconnect();
}

export { resetDatabase };
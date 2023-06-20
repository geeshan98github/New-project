import {publicProcedure, router} from "./trpc";
import {z} from 'zod';

const objectSchema = z.object({

    name: z.string(),
    age: z.string(),
    relation: z.string(),
    gender: z.string()
});
export const userRouter = router({
    createPepole: publicProcedure
        .input(z.object({
            name: z.string(),
            age: z.string(),
            gender: z.string(),
            userT: z.string(),
            customerT: z.string(),
            roleTyps: z.string(),
            family: z.array(objectSchema),


        }))
        .mutation(async ({ctx, input}) => {


            if (input.roleTyps === 'User') {
                const obUser = {
                    name: input.name,
                    age: input.age,
                    type: input.userT,
                    gender: input.gender,
                    UserFamilyDetails: {
                        createMany: {
                            data: input.family.map(f => ({
                                name: f.name,
                                age: f.age,
                                relation: f.relation,
                                gender: f.gender
                            })),
                        },

                    }
                }
                const user = await ctx.prisma.user.create({
                    data: obUser,
                })


            }
            if (input.roleTyps === 'Customer') {
                const obCustomer = {
                    name: input.name,
                    age: input.age,
                    type: input.customerT,
                    gender: input.gender,
                    CoustomerFamilyDetails: {
                        createMany: {
                            data:input.family.map(f => ({
                                name: f.name,
                                age: f.age,
                                relation: f.relation,
                                gender: f.gender
                            })),
                        }
                    }
                }
                const cus = await ctx.prisma.coustomer.create({
                    data: obCustomer,
                })
            }
            if (input.roleTyps === 'Employee') {
                const obEmployee = {
                    name: input.name,
                    age: input.age,
                    gender: input.gender,
                    EmployeeFamilyDetails: {
                        createMany:{
                            data:input.family.map(f => ({
                                name: f.name,
                                age: f.age,
                                relation: f.relation,
                                gender: f.gender
                            })),
                        }
                    }
                }
                const emp = await ctx.prisma.employee.create({
                    data: obEmployee,
                })
            }

        }),


})
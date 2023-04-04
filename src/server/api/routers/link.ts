import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '~/server/api/trpc';

export const linkRouter = createTRPCRouter({
    createLink: publicProcedure
        .input(z.object({ longLink: z.string() }))
        .mutation(({ input, ctx }) => {
            const short = uuidv4().substring(0, 6);
            return ctx.prisma.link.create({
                data: {
                    newLink: short,
                    fullLink: input.longLink,
                },
                select: { newLink: true },
            });
        }),
    createLinkProtected: protectedProcedure
        .input(z.object({ longLink: z.string() }))
        .mutation(({ input, ctx }) => {
            const short = uuidv4().substring(0, 6);
            return ctx.prisma.link.create({
                data: {
                    newLink: short,
                    fullLink: input.longLink,
                    userId: ctx.session.user.id,
                },
                select: { newLink: true },
            });
        }),
    getLink: publicProcedure
        .input(z.object({ shortLink: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.link.findUnique({
                where: { newLink: input.shortLink },
                select: { fullLink: true },
            });
        }),
    getLinks: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.link.findMany({
            where: { userId: ctx.session.user.id },
            select: {
                fullLink: true,
                newLink: true,
            },
        });
    }),
    deleteLink: protectedProcedure
        .input(z.object({ shortLink: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.link.delete({
                where: { newLink: input.shortLink },
            });
        }),
});

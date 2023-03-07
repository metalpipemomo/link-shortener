import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const linkRouter = createTRPCRouter({
    createLink: publicProcedure
        .input(z.object({ longLink: z.string() }))
        .query(({ input, ctx }) => {
            const short = uuidv4().substring(0, 6);
            return ctx.prisma.link.create({
                data: {
                    newLink: short,
                    fullLink: input.longLink,
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
});

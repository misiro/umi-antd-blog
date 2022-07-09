import {UmiApiRequest, UmiApiResponse} from "umi";
import {PrismaClient} from "@prisma/client";
import {Redis} from "@upstash/redis";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient;
    switch (req.method) {
        case 'GET':
            try {
                prisma = new PrismaClient();
                let post = await prisma.post.findUnique({
                    where: {id: +req.params.postId},
                    include: {author: true}
                });
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({error: 'Post not found.'})
                }
                await prisma.$disconnect();
            } catch (e: any) {
                res.status(500).json({
                    result: false,
                    message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e
                })
            }

            break;
        default:
            res.status(405).json({error: 'Method not allowed'})
    }
};

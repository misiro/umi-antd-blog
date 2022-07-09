import {UmiApiRequest, UmiApiResponse} from "umi";
import {PrismaClient} from "@prisma/client";
import {verifyToken} from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient;
    switch (req.method) {
        case 'GET':
            try {
                prisma = new PrismaClient();
                const allPosts = await prisma.post.findMany({include: {author: true}})
                res.status(200).json(allPosts);
                await prisma.$disconnect();
            } catch (e: any) {
                res.status(500).json({
                    result: false,
                    message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e
                })
            }
            break;
        case 'POST':
            try {
                if (!req.cookies?.token) {
                    return res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
                const authorId = (await verifyToken(req.cookies.token)).id;

                prisma = new PrismaClient();
                const newPost = await prisma.post.create({
                    data: {
                        title: req.body.title,
                        content: req.body.content,
                        createdAt: new Date(),
                        authorId,
                        tags: req.body.tags.join(','),
                        imageUrl: req.body.imageUrl
                    }
                });
                res.status(200).json(newPost);
                await prisma.$disconnect();
            } catch (e: any) {
                res.status(500).json({
                    result: false,
                    message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e
                })
            }
            break;
        default:
            res.status(405).json({error: "Method not allowed"})
    }
}

import { Request, Response } from "express";
import { Query } from "mongoose";
import { result } from "../../response/result";
import { IPost } from "../post/IPostStructure";
import Post from "../post/Post";
import { IComment } from "./ICommentStructure";

export const store = async (req: Request, res: Response) => {
    try {
        const comment = req.body.comment as IComment;
        const postId = req.body.postId;

        // const builder: Query<IPost, IPost> =  Post.findById(postId);
        // const post = await builder.exec();
        const post = await Post.findById(postId);
        post.comments.push(comment);
        const save = await post.save();

        return result(res, save);
        
        
    } catch (error: any) {
        result(res, error.toString(), false);
    }

}
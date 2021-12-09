import { Request, Response } from "express";
import { ObjectId, Types } from "mongoose";
import { result } from "../../response/result";
import { IFilterStructure } from "../filterParams/IFilterStructure";
import { IPost } from "./IPostStructure";
import Post from "./Post";

export const all = async (req: Request, res: Response) => {
  try {
    const query = req.query as IFilterStructure;

    const defaultLimit = 10;

    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    const limit = query.limit != null ? +query.limit! : defaultLimit;

    const builder = Post.aggregate([
      {
        $project: {
          _id: "$_id",
          title: "$title",
          content: "$content",
          userId: "$userId",
          comments: { $size: "$comments" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          comments: 1,
          user: { $first: "$user" },
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          comments: 1,
          user: {
            _id: 1,
            name: 1,
          },
        },
      },
    ]);
    builder.skip(skip);
    builder.limit(limit);

    return result(res, await builder.exec());
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const byUser = async (req: Request, res: Response) => {
  try {
    const defaultLimit = 10;
    const query = req.query as IFilterStructure;

    const skip = query.page == 0 ? 0 : query.page! * defaultLimit;
    const limit = query.limit != null ? +query.limit! : defaultLimit;
    const userId = new Types.ObjectId(req.params.userId);
    const builder = Post.aggregate([
      {
        $project: {
          _id: "$_id",
          title: "$title",
          content: "$content",
          userId: "$userId",
          comments: { $size: "$comments" },
        },
      },
      {
        $match: {
          userId,
        },
      },
    ]);
    builder.skip(skip);
    builder.limit(limit);
    return result(res, await builder.exec());
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const commentsByPost = async (req: Request, res: Response) => {
  try {
    const defaultLimit = 10;
    const query = req.query as IFilterStructure;

    const limit = query.limit != null ? +query.limit! : defaultLimit;
    console.log(limit);

    const id = new Types.ObjectId(req.params.id);

    const builder = Post.findById(id);
    builder.populate('comments');

    return result(res, await builder.exec());
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const post = req.body as IPost;
    return result(res, await Post.create(post));
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const postBody = req.body as IPost;
    return result(
      res,
      await Post.findByIdAndUpdate(postBody._id, postBody, {
        new: true,
      })
    );
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    return result(res, await Post.findByIdAndRemove(id));
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

import formidable from "formidable";
import { NextApiRequest } from "next";
import Post, { PostModelSchema } from "../models/Post";
import { CommentResponse, PostDetail, UserProfile } from "../utils/types";
import db from "../utils/db";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files, body: fields as T });
    });
  });
};

/**
 * Lấy tất cả bài viết mà không giới hạn.
 */
export const readAllPostsFromDb = async (
  includeDrafts: boolean = false,
  includeDirectPosts: boolean = false
): Promise<PostModelSchema[]> => {
  await db.connectDb();
  // Tạo filter để loại trừ nháp nếu không includeDrafts
  const filter: any = includeDrafts ? {} : { isDraft: { $ne: true } };

  // Mặc định loại bỏ bài viết 2 cấp (isDirectPost) khỏi danh sách chung (trang chủ, blog)
  if (!includeDirectPosts) {
    filter.isDirectPost = { $ne: true };
  }
  
  return await Post.find(filter)
    .sort({ createdAt: "desc" })
    .select("-content");
};

/**
 * Lấy bài viết phân trang với giới hạn tối đa 100 bản ghi.
 */
export const readPostsFromDb = async (
  limit: number,
  pageNo: number,
  skip?: number,
  includeDrafts: boolean = false,
  includeDirectPosts: boolean = false
): Promise<PostModelSchema[]> => {
  // Áp dụng giới hạn an toàn
  const safeLimit = Math.min(limit, 100);
  const finalSkip = skip !== undefined ? skip : safeLimit * pageNo;
  await db.connectDb();
  
  // Tạo filter để loại trừ nháp nếu không includeDrafts
  const filter: any = includeDrafts ? {} : { isDraft: { $ne: true } };

  // Mặc định loại bỏ bài viết 2 cấp (isDirectPost) khỏi danh sách chung (trang chủ, blog)
  if (!includeDirectPosts) {
    filter.isDirectPost = { $ne: true };
  }
  
  return await Post.find(filter)
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(finalSkip)
    .limit(safeLimit);
};

export const formatPosts = (
  posts: PostModelSchema[]
): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    category: post.category || "",
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
    isDraft: post.isDraft || false,
    isFeatured: post.isFeatured || false,
    featuredOrder: post.featuredOrder,
    isDirectPost: post.isDirectPost || false,
    faqs: post.faqs && Array.isArray(post.faqs) 
      ? post.faqs.map((faq: any) => ({ question: faq.question || "", answer: faq.answer || "" })) 
      : [],
    postAuthorId: post.postAuthor?.toString() || "",
    keywords: post.keywords || "",
  }));
};

const getLikedByOwner = (likes: any[], user: UserProfile) =>
  likes.includes(user.id);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

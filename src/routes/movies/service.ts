import type { Request } from "@hapi/hapi";
import type { db } from "mongodb";

export const getAll = async (req: Request) => {
  const offset = Number(req.query.offset) || 0;

  const movies = await req.mongo.db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .skip(offset)
    .limit(20)
    .toArray();

  return movies;
};

export const getOne = () => Promise.resolve("from getOne");
export const create = () => Promise.resolve("from create");
export const update = () => Promise.resolve("from update");
export const remove = () => Promise.resolve("from remove");
export const search = () => Promise.resolve("from search");

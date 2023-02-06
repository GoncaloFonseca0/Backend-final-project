import { HapiMongo } from "hapi-mongodb";
import z from "zod";

/** Zod schema to validate one object with name and age */
export const ToDoList = z.object({
  title: z.string(),
  year: z.number().int().min(1890),
});
export type ToDoList = z.infer<typeof ToDoList>;

// const projection = {title: 1, year: 1}
const projection = Object.fromEntries(
  Object.keys(ToDoList.shape).map((k) => [k, 1])
);

export const getAll = async (mongo: HapiMongo, offset: number, limit: number) =>
  mongo.db
    .collection("ToDoList")
    .find({}, { projection })
    .sort({ metacritic: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

export const create = async (mongo: HapiMongo, movie: ToDoList) =>
  mongo.db.collection("ToDoList").insertOne(movie);

export const getOne = async (mongo: HapiMongo, id: string) =>
  mongo.db
    .collection("ToDolist")
    .findOne({ _id: new mongo.ObjectId(id) }, { projection });

export const update = async (
  mongo: HapiMongo,
  id: string,
  ToDoList: ToDoList
) =>
  mongo.db
    .collection("ToDoList")
    .updateOne({ _id: new mongo.ObjectID(id) }, { $set: ToDoList });

export const remove = async (mongo: HapiMongo, id: string) =>
  mongo.db.collection("ToDoList").deleteOne({ _id: new mongo.ObjectID(id) });

export const search = async (mongo: HapiMongo, query: string) =>
  mongo.db
    .collection("ToDoList")
    .aggregate([
      {
        $searchBeta: {
          search: {
            query: query,
            path: "title",
          },
        },
      },
      { $project: { ...projection } },
      { $limit: 10 },
    ])
    .toArray();

import { HapiMongo } from "hapi-mongodb";
import z from "zod";

/** Zod schema to validate one object with name and age */
export const toDoList = z.object({
  description: z.string(),
  done: z.boolean(),
  dueDate: z.coerce.date(),
});
export type toDoList = z.infer<typeof toDoList>;

export const getAll = async (mongo: HapiMongo, offset: number, limit: number) =>
  mongo.db
    .collection("todo")
    .find({}, { projection })
    .sort({})
    .skip(offset)
    .limit(limit)
    .toArray();

export const create = async (mongo: HapiMongo, todolist: toDoList) =>
  mongo.db.collection("todo").insertOne(todolist);

export const getOne = (mongo: HapiMongo, id: string) =>
  mongo.db
    .collection("todo")
    .findOne({ _id: new mongo.ObjectId(id) }, { projection });

// Update a task to the database PUT
export const update = (mongo: HapiMongo, id: string, task: toDoList) =>
  mongo.db
    .collection("Todo-List")
    .updateOne({ _id: new mongo.ObjectID(id) }, { $set: toDoList });

export const remove = async (mongo: HapiMongo, id: string) =>
  mongo.db.collection("todo").deleteOne({ _id: new mongo.ObjectID(id) });

//Search database tasks GET
export const search = (mongo: HapiMongo, query: string) =>
  mongo.db
    .collection("todo")
    .aggregate([
      {
        $searchBeta: {
          search: {
            query: query,
            path: "description",
          },
        },
      },
      { $project: projection },
      { $limit: 10 },
    ])
    .toArray();
// const projection = {description: 1}
const projection = Object.fromEntries(
  Object.keys(toDoList.shape).map((k) => [k, 1])
);

import type { ServerRoute, Request } from "@hapi/hapi";
import {
  toDoList,
  getAll,
  getOne,
  remove,
  search,
  update,
  create,
} from "./service";

/**
 * Get all movies
 * @handle `GET /`
 */
const getAllList = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/",
  handler: (req, _h) => {
    // get data from request
    const mongo = req.mongo;
    const offset = Number(req.query["offset"]) || 0;
    const limit = Number(req.query["limit"]) || 20;

    // call handler (request-agnostic)
    return getAll(mongo, offset, limit);
  },
});

/**
 * Add a new movie to the database
 * @handle `POST /`
 */
const postList = Object.freeze<ServerRoute>({
  method: "POST",
  path: "/",
  options: {
    validate: {
      payload: (v: unknown) => toDoList.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: toDoList }>, h) => {
    const mongo = req.mongo;
    const todolist = req.payload;
    const res = await create(mongo, todolist);
    return h.response(res).code(201);
  },
});

/**
 * Get one movie
 * @handle `GET /{id}`
 */
const getOneList = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/{id}",
  handler: async (req, _h) => {
    const { mongo } = req;
    const { id } = req.params;
    return getOne(mongo, id);
  },
});

/**
 * Replace a movie
 * @handle `PUT /{id}`
 */
const putList = Object.freeze<ServerRoute>({
  method: "PUT",
  path: "/{id}",
  options: {
    validate: {
      payload: (v: unknown) => toDoList.parseAsync(v),
    },
  },
  handler: async (req: Request<{ Payload: toDoList }>, h) => {
    // get data from request
    const { mongo } = req;
    const { id } = req.params;
    const toDoList = req.payload;

    // call handler (request-agnostic)
    return update(mongo, id, toDoList);
  },
});

/**
 * Delete a movie from the database
 * @handle `DELETE /{id}`
 */
const deleteToDoList = Object.freeze<ServerRoute>({
  method: "DELETE",
  path: "/{id}",
  handler: async (req, _h) => {
    // get data from request
    const { mongo } = req;
    const { id } = req.params;

    // call handler (request-agnostic)
    return remove(mongo, id);
  },
});

/**
 * Get all movies
 * @handle `GET /search`
 */
/**
 * Get all tasks
 * @handle `GET /search`
 */
const getSearch = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/search",
  handler: async (req, _h) => {
    // get data from request
    const mongo = req.mongo;
    const term = req.query.term;

    // call handler (request-agnostic)
    return search(mongo, term);
  },
});
/**
 * Routes of the plugin `todolist`
 */
export default [
  getAllList,
  postList,
  getOneList,
  putList,
  deleteToDoList,
  getSearch,
];

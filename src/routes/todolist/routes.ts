import type { ServerRoute, Request } from "@hapi/hapi";
import { getAll, getOne, remove, search, ToDoList, update } from "./service";

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
  handler: async (req: Request<{ Payload: ToDoList }>, h) => {
    return "hello postList";

    // refer to https://www.rfc-editor.org/rfc/rfc9110.html#name-location
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
    return getOne;
  },
});

/**
 * Replace a movie
 * @handle `PUT /{id}`
 */
const putList = Object.freeze<ServerRoute>({
  method: "PUT",
  path: "/{id}",

  handler: async (req: Request<{ Payload: ToDoList }>, h) => {
    // const { mongo } = req;
    // const { id } = req.params;
    // const toDoList = req.payload;
    return "hello putList";
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
    return "hello delete";
  },
});

/**
 * Get all movies
 * @handle `GET /search`
 */
const getSearch = Object.freeze<ServerRoute>({
  method: "GET",
  path: "/search",
  handler: async (req, _h) => {
    const { mongo } = req;
    const term = req.query.term;
    return search(mongo, term);
  },
});

export default [
  getAllList,
  postList,
  getOneList,
  putList,
  deleteToDoList,
  getSearch,
];

import User from "./entities/user.entity";
import * as express from "express";

// test pour savoir si user est connecté
export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

export type AVATAR =
  | "avatar01"
  | "avatar02"
  | "avatar03"
  | "avatar04"
  | "avatar05"
  | "avatar06"
  | "avatar07"
  | "avatar08"
  | "avatar09"
  | "avatar10"
  | "avatar11"
  | "avatar12";

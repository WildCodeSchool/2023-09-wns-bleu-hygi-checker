import User from "./entities/user.entity";
import express from "express";

// test pour savoir si user est connecté
export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

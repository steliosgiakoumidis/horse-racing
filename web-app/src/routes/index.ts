import {Router} from 'express';
import {getEntries, addEntry} from '../controllers'

const entriesRouter: Router = Router();

entriesRouter.get("/results", getEntries);
entriesRouter.post("/", addEntry);

export default entriesRouter;
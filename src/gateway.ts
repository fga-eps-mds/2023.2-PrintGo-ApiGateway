import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import httProxy from 'express-http-proxy'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'

const app = express();
const pathFile = resolve(process.cwd(), 'config.yml')
const  readConfig = readFileSync(pathFile, {encoding: 'utf8'})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const {services}: any= load(readConfig, {json: true})

app.use(express.json());

app.use(cors());
app.use(logger('start'))
app.use(helmet())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)  => {
    return res.json({ message: 'Running Gateway' })
})

services.forEach(({ url }) => {
    console.log(url);
    
    app.use("/", httProxy(url, {timeout: 5000}))
 
});

const PORT = process.env.PORT || 4000;

const gateway = app.listen(PORT, () => {
    console.log(`Gateway is running on ${PORT}`);
});

export { gateway, app };
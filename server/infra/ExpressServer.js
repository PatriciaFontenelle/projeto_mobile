import Express from 'express';
import BodyParser from 'body-parser';

const app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.listen(8080, () => {console.log("Servidor rodando.")});

export default app;
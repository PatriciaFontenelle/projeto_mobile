import server from './infra/ExpressServer.js';
import { getUserCollection, getAlunoCollection, getDisciplinaCollection, getAlunoDisciplinaCollection } from './infra/Mongo.js';
import UserController from './controller/UserController.js';
import UserRepository from './models/UserRepository.js';
import AlunoController from './controller/AlunoController.js';
import AlunoRepository from './models/AlunoRepository.js';
import DisciplinaController from './controller/DisciplinaController.js';
import DisciplinaRepository from './models/DisciplinaRepository.js';
import AlunoDisciplinaController from './controller/AlunoDisciplinaController.js';
import AlunoDisciplinaRepository from './models/AlunoDisciplinaRepository.js';

getUserCollection( collection => {
    const controller = new UserController();
    const repository = new UserRepository();
    repository.Init(collection);
    controller.Init(server, repository);
});

getAlunoCollection(collection => {
    const controller = new AlunoController();
    const repository = new AlunoRepository();
    repository.Init(collection);
    controller.Init(server, repository);
})

getDisciplinaCollection(collection => {
    const controller = new DisciplinaController();
    const repository = new DisciplinaRepository();
    repository.Init(collection);
    controller.Init(server, repository);
})

getAlunoDisciplinaCollection(collection => {
    const controller = new AlunoDisciplinaController();
    const repository = new AlunoDisciplinaRepository();
    repository.Init(collection);
    controller.Init(server, repository);
})
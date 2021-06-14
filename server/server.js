import server from './infra/ExpressServer.js';
import { getUserCollection } from './infra/Mongo.js';
import UserController from './controller/UserController.js';
import UserFFF from './models/UserRepository.js';

getUserCollection( collection => {
    console.log('Entrou aqui')
    const controller = new UserController();
    const repository = new UserFFF();
    console.log('Passou daqui')
    repository.Init(collection);
    controller.Init(server, repository);
})
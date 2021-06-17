import Mongo from 'mongodb';

const CONNECTION_URL = "mongodb+srv://PatriciaFontenelle:PatriciaFontenelle1504@cluster0.aamzo.mongodb.net/user?retryWrites=true&w=majority";
const DATABASE_NAME = 'ProjetoMobile'; 
const COLLECTION_ALUNO = 'aluno';
const COLLECTION_USER = 'user';
const COLLECTION_DISCIPLINA = 'disciplina';
const COLLECTION_ALUNO_DISCIPLINA = 'aluno_disciplina';

let collection = null;

export function getUserCollection(callback) {
    Mongo.MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }

        const database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_USER);
        callback(collection);
    })
}

export function getAlunoCollection(callback) {
    Mongo.MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }
        const database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_ALUNO);
        callback(collection);
    })
}

export function getDisciplinaCollection(callback) {
    Mongo.MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }

        const database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_DISCIPLINA);
        callback(collection);
    })
}

export function getAlunoDisciplinaCollection(callback) {
    Mongo.MongoClient.connect(CONNECTION_URL, {useNewUrlParser: true}, (error, client) => {
        if(error) {
            throw error;
        }

        const database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_ALUNO_DISCIPLINA);
        callback(collection);
    })
}
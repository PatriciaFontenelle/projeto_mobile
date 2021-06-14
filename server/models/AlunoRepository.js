export default class AlunoRepository {
    alunoCollection = null;

    Init(collection){
        this.alunoCollection = collection;
    }

    Save(aluno, callback) {
        collection.insert(aluno, callback);
    }
}
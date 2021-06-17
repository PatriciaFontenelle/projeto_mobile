export default class AlunoRepository {
    alunoCollection = null;

    Init(collection){
        this.alunoCollection = collection;
    }

    Save(aluno, callback) {
        this.alunoCollection.insertOne(aluno, callback);
    }

    GetAll(callback) {
        this.alunoCollection.find({}).toArray(callback);
    }

    Delete(aluno, callback) {
        this.alunoCollection.deleteOne({_id: aluno}, callback)
    }

    Update(aluno, callback) {
        this.alunoCollection.updateOne({_id: aluno._id},
        [{$set: {
            "name": aluno.name,
            "last_name": aluno.last_name,
            "email": aluno.email,
            "birth_date": aluno.birth_date
        }}], callback)
    }
}
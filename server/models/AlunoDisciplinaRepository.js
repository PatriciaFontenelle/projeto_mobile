import Mongo from 'mongodb';
export default class AlunoDisciplinaRepository {
    alunoDisciplinaCollection = null;

    Init(collection){
        this.alunoDisciplinaCollection = collection;
    }

    Save(alunoDisciplina, callback) {
        this.alunoDisciplinaCollection.insertOne(alunoDisciplina, callback);
    }

    Get(data, callback) {
        this.alunoDisciplinaCollection.findOne({
            aluno_id: data.aluno,
            disciplina_id: data.disciplina
        },callback);
    }

    Delete(id, callback) {
        this.alunoDisciplinaCollection.deleteOne({ $or: [{"aluno_id": id}, {"disciplina_id": id} ]}, callback)
    }

    Update(alunoDisciplina, callback) {
        const id = new Mongo.ObjectId(alunoDisciplina._id);
        this.alunoDisciplinaCollection.updateOne({_id: id},
        [{$set: {
            "aluno_id": alunoDisciplina.aluno_id,
            "disciplina_id": alunoDisciplina.disciplina_id,
            "av1": alunoDisciplina.av1,
            "av2": alunoDisciplina.av2,
            "av3": alunoDisciplina.av3
        }}], callback)
    }
}
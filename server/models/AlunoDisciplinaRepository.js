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
        console.log("Aluno");
        console.log(data.aluno);
        this.alunoDisciplinaCollection.findOne({
            aluno_id: data.aluno,
            disciplina_id: data.disciplina
        },callback);
    }

    Delete(alunoDisciplina, callback) {
        const id = new Mongo.ObjectId(alunoDisciplina);
        this.alunoDisciplinaCollection.deleteOne({_id: id}, callback)
    }

    Update(alunoDisciplina, callback) {
        const id = new Mongo.ObjectId(alunoDisciplina._id);
        this.alunoDisciplinaCollection.updateOne({_id: id},
        [{$set: {
            "name": alunoDisciplina.name,
            "teacher_name": alunoDisciplina.teacher_name,
        }}], callback)
    }
}
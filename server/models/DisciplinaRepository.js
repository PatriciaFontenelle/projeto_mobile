import Mongo from 'mongodb';
export default class DisciplinaRepository {
    disciplinaCollection = null;

    Init(collection){
        this.disciplinaCollection = collection;
    }

    Save(disciplina, callback) {
        this.disciplinaCollection.insertOne(disciplina, callback);
    }

    GetAll(callback) {
        this.disciplinaCollection.find({}).toArray(callback);
    }

    Delete(disciplina, callback) {
        const id = new Mongo.ObjectId(disciplina);
        this.disciplinaCollection.deleteOne({_id: id}, callback)
    }

    Update(disciplina, callback) {
        const id = new Mongo.ObjectId(disciplina._id);
        this.disciplinaCollection.updateOne({_id: id},
        [{$set: {
            "name": disciplina.name,
            "teacher_name": disciplina.teacher_name,
        }}], callback)
    }
}
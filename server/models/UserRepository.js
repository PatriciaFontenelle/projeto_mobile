export default class UserRepository {
    userCollection = null;

    Init(collection) {
        this.userCollection = collection;
    }

    FindByEmail(email, callback) {
        this.userCollection.findOne({email: email}, callback);
    }

    Save(user, callback) {
        this.userCollection.insertOne(user, callback);
    }

}
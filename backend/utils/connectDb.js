import Database from "./db.js";

const Config = {
    filename :"persistence",
    name : '<persistence>',
    data : [],
    load_on_boot:true,
}

const database = Database.create(Config)

export default database
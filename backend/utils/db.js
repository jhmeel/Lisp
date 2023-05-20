import fs from 'fs'
import logger from './logger.js'
import { randomUUID } from 'crypto'
import ErrorHandler from './errorHandler.js'

class Database {

    static instance = null
    constructor(Config) {
        logger.info('initializing.database...')
        this.filename = Config.filename
        this.data = Config.data
        this.config = Config
      if(this.config.load_on_boot){
          this.load()
      }
      if (Database.instance){
        return Database.instance
    } 
    this.instance = this
  
    }
        load() {
            try {
              logger.info('loading.db.state...')
              const data = fs.readFileSync(this.filename, 'utf8');
              this.data = JSON.parse(data);
              logger.info('db.state.loaded.successfully!')
            } catch (err) {
              logger.info('failed.load.Db.state')
              logger.info('creating.new.state...')
              this.data = [];
              
            }
          }
        
         save() {
           logger.info('saving.data...')
            fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
            logger.info('Data.saved.successfully!')
          }
        
    
  
    static create(config) {
      try{
        const db = new Database(config);
        logger.info('Database.init.successfully!')
        return db
      }catch(err){
        logger.error('Db.init.failed!')
       throw new ErrorHandler(err,500) 
      }
    
    }
  
  
    find(query,cb) {
      const callback = cb || function(){}
      const found = []
      try{
        for(let i = 0;i < this.data.length; i++){
          if(this.data[i].type == query) found.push(this.data[i])
        }
        
        callback(null,found)
        return found
      }catch(err){
        logger.error(err)
        callback(err)
        throw err
      }
     
    }
  
    findOne(query,cb) {
      const callback = cb || function(){}
      try{
        const found = this.data.find(item => {
          for (let key in query) {
            if (item[key] == query[key]) {
              return item;
            }
          }
        });
        callback(null,found)
        return found
      }catch(err){
        logger.error(err)
        callback(err)
        throw err
      }
     
    }
  
    insert(item,cb) {
        const callback = cb || function(){}
        try{
          const _id = randomUUID()
          const data = {_id,...item}
            this.data.push(data);
            callback(null,item)
            return data
        }
        
        catch(err){
          logger.error(err)
            callback(err,null)
            throw err
        }
     
    }
  
    update(query, newData,cb) {
        const callback = cb || function(){}
        
        try{
            this.data = this.data.map(item =>{
              for (let key in query){
               
                if (item[key] == query[key]){
                
                 return item = {...item,...newData}
                 
                 
               }
             }
             return item
            })
            callback(null,this.data)
             }
              catch(err){
                logger.error(err)
               callback(err)
               throw err
        }
    
    }
    findById(id,cb) {
      const callback = cb || function(){}
      try{
        const found = this.data.find(item => {
          return item._id == id;
            
        });
        callback(null,found)
        return found
      }catch(err){
        logger.error(err)
        callback(err)
        throw err
      }
     
    }
  
    delete(query) {
      this.data = this.data.filter(item => {
        for (let key in query) {
          if (item[key] == query[key]) {
            logger.info(`Deleting ${item}...`)
            return false;
          }
        }
        return true;
      });
      
      this.save();
    }
  }
  
  export default Database

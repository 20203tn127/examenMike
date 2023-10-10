import bcryptjs from 'bcryptjs';
require('dotenv').config();

export async function hash(password:string){
    return new Promise((resolve, reject)=>{
            bcryptjs.hash(password, process.env.BCRYPTJS!, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            });
    });
};

export async function compare(params){

}
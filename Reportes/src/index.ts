import app from './config/express';
const main =()=>{
    try {
        app.listen()
        console.log("Server running");
        
    } catch (error) {
        console.log(error);
        
    }
}
main();
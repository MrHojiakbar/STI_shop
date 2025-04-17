import multer from "multer";
import {join} from "node:path"

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let uploadsFilePath=join(process.cwd(),"uploads");
        if(file.mimetype.split("/")[0]=='image'){
            uploadsFilePath=join(process.cwd(),"uploads","image");
        }
        cb(null,uploadsFilePath)
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+`.${file.mimetype.split("/")[1]}`)
    }
})

export const upload=multer({storage})
const fs = require("fs")
const crypto = require("crypto")

function sha256(filename, callback) {
    let input = fs.createReadStream(filename)
    let hasher = crypto.createHash("sha256")
    input.on("readable", () => {
        let chunk
        while (chunk = input.read()){
            hasher.update(chunk)
        }
    })
    input.on("end", ()=>{
        let hash = hasher.digest("hex")
        callback(null, hash)
    })
    input.on("error", callback)
}

sha256("hashSHA256.txt", (err, hash) =>{
    (err) ? console.log(err.toString()) : console.log(hash)
})
import { Client } from "basic-ftp"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function deploy() {
    const client = new Client()
    client.ftp.verbose = true
    
    try {
        const host = process.env.FTP_SERVER
        const user = process.env.FTP_USERNAME
        const password = process.env.FTP_PASSWORD
        const remoteDir = process.env.FTP_REMOTE_DIR || "/"

        if (!host || !user || !password) {
            console.error("Error: FTP configuration (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD) is missing in .env file.")
            process.exit(1)
        }

        console.log(`Connecting to ${host} as ${user}...`)
        
        await client.access({
            host,
            user,
            password,
            secure: false
        })

        console.log("Connected successfully! Navigating and ensuring remote directory exists...")
        await client.ensureDir(remoteDir)

        console.log("Listing current remote files:")
        const list = await client.list()
        console.log(list.map(f => `${f.isDirectory ? '[DIR]' : '[FILE]'} ${f.name}`).join("\n"))

        const localDir = path.resolve(__dirname, "../dist")
        console.log(`Uploading local directory contents: ${localDir} -> ${remoteDir}`)
        
        // This will upload all files and subdirectories from dist/ to remoteDir
        await client.uploadFromDir(localDir)
        
        console.log("Deployment completed successfully!")
    } catch (err) {
        console.error("Deployment failed:", err)
        process.exit(1)
    } finally {
        client.close()
    }
}

deploy()

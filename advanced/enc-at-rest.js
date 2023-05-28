import mongoose from 'mongoose'
import crypto from 'crypto'


const algorithm = 'aes-256-ctr'
const secretKey = 'mysecretkey'

const url = 'mongodb://root:example@localhost:27017/ismv4?authSource=admin&directConnection=true'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const SecretsSchema = new mongoose.Schema({
  encryptedContent: {
    type: String,
    required: true
  }, 
  key: {
    type: String
  }
})

SecretsSchema.pre('save', function (next) {
  const cipher = crypto.createCipher(algorithm, secretKey)
  let encrypted = cipher.update(this.encryptedContent, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  this.encryptedContent = encrypted
  next()
})

SecretsSchema.post('find', function (docs, next) {
  const decipher = crypto.createDecipher(algorithm, secretKey)
  docs.forEach((doc) => {
    let decrypted = decipher.update(doc.encryptedContent, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    doc.encryptedContent = decrypted
  })
  next()
})

const Secrets = mongoose.model('Secrets', SecretsSchema);

let secret = new Secrets({ encryptedContent: 'test123', key: 'a1' })
await secret.save()

let results = await Secrets.find({ key: 'a1' })
console.warn(results)
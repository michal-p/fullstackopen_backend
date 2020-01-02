const app = require('./app')
const config = require('./utils/config')


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
const pool = require('./src/config/db')
const fs = require('fs').promises

async function readSqlFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    // return content.trim()
    return content
  } catch (err) {
    console.error(`Ошибка при чтении файла ${filePath}:`, err.message)
    throw err
  }
}

// Функция для последовательного выполнения SQL-запросов
async function executeScript(pool, scriptContent) {
  try {
    await pool.query(scriptContent)
    console.log(`инициализация БД выполнена успешно`)
  } catch (err) {
    console.error(`Ошибка при выполнении запроса №`, err.stack || err.message)
  }
}

(async () => {
  try {
    const filePath = './src/config/init.sql'
    const sqlContent = await readSqlFile(filePath)
    await executeScript(pool, sqlContent)
    console.log("Все запросы выполнены успешно.")
  } catch (err) {
    console.error("Что-то пошло не так:", err.message)
  } finally {
    pool.end()
  }
})()

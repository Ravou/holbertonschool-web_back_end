const fs = require('fs').promises;

async function countStudents(path) {
  let data;
  try {
    data = await fs.readFile(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = data.split('\n').filter(line => line.trim() !== '');
  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const students = lines.slice(1);
  const fields = {};
  students.forEach(line => {
    const parts = line.split(',');
    if (parts.length < 4) return; // ignore invalid lines
    const firstname = parts[0].trim();
    const field = parts[3].trim();
    if (!fields[field]) fields[field] = [];
    fields[field].push(firstname);
  });

  const totalStudents = Object.values(fields).reduce((acc, names) => acc + names.length, 0);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, names] of Object.entries(fields)) {
    console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
  }
}

module.exports = countStudents;


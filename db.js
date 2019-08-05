const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.join(__dirname, 'schema.db')

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.log(err, 'err occured on connection')
	} else {
		console.log('successful connection')
	}
})


db.run(
	`CREATE TABLE if not exists test_results(
		email VARCHAR(255),
		EI INTEGER,
        TF INTEGER,
        SN INTEGER,
        JP INTEGER,
	)`,
	(err) => {
		if (err) console.error(err)
		else console.log('created the hosts table');
	}
)

let calculateOneResult = (array) => {
	let result = 0;
	for (let i = 0; i < array.length; i++) {
		result += array[i];
	}

	let avgValue = 4 * array.length;
	if (result >= avgValue) {
		result = 1;
	} else {
		result = -1;
	}

	return result;
}

let saveResult = (email, data, callback) => {
	db.get(`insert into test_results
	( email, EI, TF, SN, JP) values (?, ?, ? , ? , ? , ? )`, [email,
		calculateOneResult(data.result.EI),
		calculateOneResult(data.result.TF),
		calculateOneResult(data.result.SN),
		calculateOneResult(data.result.JP),
		message
	], (err) => {
		if (err) callback(err)
		callback()
	})
}

module.exports.saveResult = saveResult
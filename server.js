/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database. 
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'artifacts',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



/*********************************
 SEPARATOR
 *********************************/

//HOME
app.get('/home', function(req, res){
	var query1 = "SELECT * FROM artifact_sets;";
	var query2 = "SELECT * FROM set_pieces;";
	var query3 = "SELECT * FROM stats_list;";
	var query4 = "SELECT * FROM user_artifacts INNER JOIN artifact_sets ON user_artifacts.set_name = artifact_sets.set_name;";
	db.task('get-everything', task => {
		return task.batch([
			task.any(query1),
			task.any(query2),
			task.any(query3),
			task.any(query4)
		]);
	}).then(info => {
		res.render('../src/js/home',{
			my_title: "Home Page",
			artifact_sets: info[0],
			set_pieces: info[1],
			possible_stats: info[2],
			user_artifacts: info[3]
		})
	}).catch(err => {
		console.log('ERR: HOME PAGE NOT FOUND', err);
		res.render('../src/js/error', {
			my_title: "Error" 
		})
	});
});

//ADD ARTIFACT
app.post('/home', function(req, res) {
	var select_set_add = req.body.select_set_add;
	var select_piece_add = req.body.select_piece_add;
	var mainstat_add = req.body.mainstat_add;
	var substat1_type = req.body.substat1_type;
	var substat1_value = req.body.substat1_value;
	var substat2_type = req.body.substat2_type;
	var substat2_value = req.body.substat2_value;
	var substat3_type = req.body.substat3_type;
	var substat3_value = req.body.substat3_value;
	var substat4_type = req.body.substat4_type;
	var substat4_value = req.body.substat4_value;
	var insert_statement = "INSERT INTO user_artifacts"
	+ "(set_name, set_piece," 
	+ "mainstat_type, substat1_type, substat2_type, substat3_type, substat4_type,"
	+ "mainstat_value, substat1_value, substat2_value, substat3_value, substat4_value)"
	+ "VALUES"
	+ "(" + "(SELECT set_name FROM artifact_sets WHERE set_id = " + select_set_add + ")" + ", '" + select_piece_add + "', '"
	+ mainstat_add + "', '" + substat1_type + "', '" + substat2_type + "', '" + substat3_type + "', '" + substat4_type + "', "
	+ "(SELECT stat_mainstat_value FROM stats_list WHERE stat_name = '" + mainstat_add + "'), " + substat1_value + ", " + substat2_value + ", " + substat3_value + ", " + substat4_value + ");"	
	var query1 = "SELECT * FROM artifact_sets;";
	var query2 = "SELECT * FROM set_pieces;";
	var query3 = "SELECT * FROM stats_list;";
	var query4 = "SELECT * FROM user_artifacts INNER JOIN artifact_sets ON user_artifacts.set_name = artifact_sets.set_name;";
	db.task('get-everything', task => {
        return task.batch([
            task.any(insert_statement),
            task.any(query1),
			task.any(query2),
			task.any(query3),
			task.any(query4),
        ]);
    })
    .then(info => {
    	res.render('../src/js/home',{
			my_title: "Home Page",
			artifact_sets: info[1],
			set_pieces: info[2],
			possible_stats: info[3],
			user_artifacts: info[4]
		})
    })
    .catch(err => {
		console.log('ERR: HOME PAGE NOT FOUND', err);
		res.render('../src/js/error', {
			my_title: "Error" 
		})
    });
});

//ERROR
app.get('/error', function(req, res) {
	res.render('../src/js/error', {
		my_title: "Error"
	});
});

app.listen(3030);
console.log('Loaded on 3030');

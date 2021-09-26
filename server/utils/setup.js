const mysql = require('mysql')
const config = require('./config')
const logger = require('./logger')
const faker = require('faker')
const khaled = require('khaled-ipsum')
const randomLocation = require('random-location')

const setupDb = async () => {
	const connection = mysql.createConnection({
		host: config.DB_HOST,
		user: config.DB_USER,
		password: config.DB_PW,
		multipleStatements: true
	})

	//creating empty database
	await connection.query(`
        DROP DATABASE IF EXISTS ${config.DB_NAME};
        CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`, (error) => {
		if (error) {
			logger.error('Error creating db:', error.message)
			return
		}
		logger.info(`Created database: ${config.DB_NAME}`)
	})

	//switching to new database
	await connection.query(`USE ${config.DB_NAME};`, (error) => {
		if (error) {
			logger.error('Error connecting to db:', error.message)
			return
		}
		logger.info(`Connected to database: ${config.DB_NAME}`)
	})

	//defining each individual table
	const users = `CREATE TABLE IF NOT EXISTS users (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        firstname varchar(50) NOT NULL,
        lastname varchar(50) NOT NULL,
        username varchar(50) UNIQUE NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        token varchar(255) NOT NULL DEFAULT 0,
        verified tinyint(1) NOT NULL DEFAULT 0,
		avatar mediumtext DEFAULT NULL,
        gender varchar(255) DEFAULT NULL,
        orientation varchar(255) DEFAULT NULL,
		tags varchar(255),
        bio text,
        latitude float DEFAULT NULL,
        longitude float DEFAULT NULL,
        birthdate date NOT NULL,
        fame int DEFAULT 100,
        last_login datetime DEFAULT NULL,
        online tinyint(1) NOT NULL DEFAULT 0
    )`

	const tags = `CREATE TABLE IF NOT EXISTS tags (
        tags varchar(5000) NOT NULL
    )`

	const likes = `CREATE TABLE IF NOT EXISTS likes (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        liker int NOT NULL,
        liked int NOT NULL,
        is_match tinyint(1) NOT NULL DEFAULT 0,
        created_at datetime NOT NULL,
        FOREIGN KEY (liker) REFERENCES users(id),
        FOREIGN KEY (liked) REFERENCES users(id)
    )`

	const views = `CREATE TABLE IF NOT EXISTS views (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        viewer int NOT NULL,
        viewed int NOT NULL,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (viewer) REFERENCES users(id),
        FOREIGN KEY (viewed) REFERENCES users(id)
    )`

	const blocks = `CREATE TABLE IF NOT EXISTS blocks (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        blocker int NOT NULL,
        blocked int NOT NULL,
        FOREIGN KEY (blocker) REFERENCES users(id),
        FOREIGN KEY (blocked) REFERENCES users(id)
    )`

	const reports = `CREATE TABLE IF NOT EXISTS reports (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        reporter int NOT NULL,
        reported int NOT NULL,
        FOREIGN KEY (reporter) REFERENCES users(id),
        FOREIGN KEY (reported) REFERENCES users(id)
    )`

	const messages = `CREATE TABLE IF NOT EXISTS messages (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sender int NOT NULL,
        receiver int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (sender) REFERENCES users(id),
        FOREIGN KEY (receiver) REFERENCES users(id)
    )`

	const notif = `CREATE TABLE IF NOT EXISTS notif (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sender int NOT NULL,
        receiver int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        user int NOT NULL,
        FOREIGN KEY (sender) REFERENCES users(id),
        FOREIGN KEY (receiver) REFERENCES users(id)
    )`

	//executing queries to create tables
	await connection.query(users, (error) => {
		if (error) {
			logger.error('Error creating table: users', error.message)
			return
		}
		logger.info('Created table: users')
	})

	await connection.query(tags, (error) => {
		if (error) {
			logger.error('Error creating table: tags', error.message)
			return
		}
		logger.info('Created table: tags')
	})

	await connection.query(likes, (error) => {
		if (error) {
			logger.error('Error creating table: likes', error.message)
			return
		}
		logger.info('Created table: likes')
	})

	await connection.query(views, (error) => {
		if (error) {
			logger.error('Error creating table: views', error.message)
			return
		}
		logger.info('Created table: views')
	})

	await connection.query(reports, (error) => {
		if (error) {
			logger.error('Error creating table: reports', error.message)
			return
		}
		logger.info('Created table: reports')
	})

	await connection.query(blocks, (error) => {
		if (error) {
			logger.error('Error creating table: blocks', error.message)
			return
		}
		logger.info('Created table: blocks')
	})

	await connection.query(messages, (error) => {
		if (error) {
			logger.error('Error creating table: messages', error.message)
			return
		}
		logger.info('Created table: messages')
	})

	await connection.query(notif, (error) => {
		if (error) {
			logger.error('Error creating table: notif', error.message)
			return
		}
		logger.info('Created table: notif')
	})

	//inserting dummy users into database, passwords are 'asd'
	//$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe
	let dummy = 'INSERT INTO users (firstname, lastname, username, email, password, verified, avatar, gender, orientation, tags, bio, latitude, longitude, birthdate, fame, last_login) VALUES'

	const gender = ['female', 'male', 'other']
	const orientation = ['fmo', 'fm', 'fo', 'mo', 'f', 'm', 'o']
	const locale = ['en', 'de', 'fr', 'es', 'fi', 'it']
	const interests = ['Acting', 'Air sports', 'Airbrushing', 'Aircraft Spotting', 'Airsoft', 'Airsofting', 'Amateur astronomy', 'Amateur geology', 'Amateur Radio', 'American football', 'Animals', 'Pets', 'Cats', 'Dogs', 'Antiquing', 'Antiquities', 'Archery', 'Art', 'Astrology', 'Astronomy', 'Audio', 'Racing', 'Backgammon', 'Backpacking', 'Badminton', 'Base Jumping', 'Baseball', 'Basketball', 'Baton Twirling', 'Beach Volleyball', 'Beach', 'Beadwork', 'Beatboxing', 'Becoming A Child Advocate', 'Beekeeping', 'Bell Ringing', 'Belly Dancing', 'Bicycle Polo', 'Bicycling', 'Billiards', 'Bird watching', 'Birding', 'Birdwatching', 'Blacksmithing', 'Blogging', 'BMX', 'Board games', 'Board sports', 'BoardGames', 'Boating', 'Body Building', 'Bodybuilding', 'Bonsai Tree', 'Book collecting', 'Bookbinding', 'Boomerangs', 'Bowling', 'Boxing', 'Brazilian jiu-jitsu', 'Breakdancing', 'Brewing Beer', 'Bridge', 'Bridge Building', 'Bus spotting', 'Butterfly Watching', 'Button Collecting', 'Cake Decorating', 'Calligraphy', 'Camping', 'Candle making', 'Canoeing', 'Car Racing', 'Card collecting', 'Cartooning', 'Casino Gambling', 'Cave Diving', 'Ceramics', 'Cheerleading', 'Chess', 'Church', 'Cigars', 'Climbing', 'Cloud Watching', 'Coloring', 'Comic book collecting', 'Compose Music', 'Computers', 'Programming', 'Cooking', 'Cosplay', 'Couponing', 'Crafts', 'Creative writing', 'Cricket', 'Crochet', 'Crocheting', 'Cross-Stitch', 'Crossword Puzzles', 'Cryptography', 'Curling', 'Cycling', 'Dance', 'Dancing', 'Darts', 'Debate', 'Digital arts', 'Digital Photography', 'Disc golf', 'Do it yourself', 'Dodgeball', 'Dolls', 'Dominoes', 'Dowsing', 'Drama', 'Drawing', 'Driving', 'Dumpster Diving', 'Eating out', 'Educational Courses', 'Electronics', 'Element collecting', 'Embroidery', 'Entertaining', 'Equestrianism', 'Exercise', 'Exhibition drill', 'Falconry', 'Fast cars', 'Felting', 'Fencing', 'Field hockey', 'Figure skating', 'Fishing', 'Flag Football', 'Floorball', 'Flowers', 'Flying', 'Football', 'Foraging', 'Foreign language learning', 'Fossil hunting', 'Four Wheeling', 'Freshwater Aquariums', 'Frisbee Golf', 'Gambling', 'Games', 'Gardening', 'Geocaching', 'Ghost hunting', 'Glassblowing', 'Glowsticking', 'Go', 'Go Kart Racing', 'Movies', 'Golf', 'Golfing', 'Graffiti', 'Grip Strength', 'Guitar', 'Gun Collecting', 'Gunsmithing', 'Gymnastics', 'Gyotaku', 'Handball', 'Handwriting Analysis', 'Hang gliding', 'Hiking', 'Homebrewing', 'Hooping', 'Horse riding', 'Hot air ballooning', 'Hula Hooping', 'Hunting', 'Ice hockey', 'Ice skating', 'Iceskating', 'Illusion', 'Impersonations', 'Inline skating', 'Insect collecting', 'Internet', 'Inventing', 'Jet Engines', 'Jewelry Making', 'Jigsaw Puzzles', 'Jogging', 'Judo', 'Juggling', 'Jump Roping', 'Kart racing', 'Kayaking', 'Keep A Journal', 'Kitchen Chemistry', 'Kite Boarding', 'Kite flying', 'Kites', 'Kitesurfing', 'Knapping', 'Knife making', 'Knife throwing', 'Knitting', 'Knotting', 'Lacemaking', 'Lacrosse', 'LARPing', 'Laser tag', 'Lasers', 'Legos', 'Letterboxing', 'Listening to music', 'Music', 'Magic', 'Mahjong', 'Making Model Cars', 'Marbles', 'Marksmanship', 'Martial arts', 'Matchstick Modeling', 'Meditation', 'Metal detecting', 'Meteorology', 'Microscopy', 'Modeling', 'Motor sports', 'Motorcycles', 'Mountaineering', 'Musical Instruments', 'Nail Art', 'Needlepoint', 'Netball', 'Nordic skating', 'Orienteering', 'Origami', 'Owning An Antique Car', 'Paintball', 'Painting', 'Papermache', 'Papermaking', 'Parachuting', 'Paragliding or Power Paragliding', 'Parkour', 'People Watching', 'Photography', 'Piano', 'Pigeon racing', 'Pinochle', 'Pipe Smoking', 'Planking', 'Playing music', 'Playing musical instruments', 'Playing team sports', 'Poker', 'Pole Dancing', 'Polo', 'Pottery', 'Powerboking', 'Protesting', 'Puppetry', 'Puzzles', 'Pyrotechnics', 'Quilting', 'R/C Boats', 'R/C Cars', 'R/C Helicopters', 'R/C Planes', 'Racing Pigeons', 'Racquetball', 'Radio-controlled car racing', 'Rafting', 'Railfans', 'Rappelling', 'Rapping', 'Reading', 'Reading To The Elderly', 'Record collecting', 'Relaxing', 'Renaissance Faire', 'Renting movies', 'Rescuing Abused Or Abandoned Animals', 'Robotics', 'Rock balancing', 'Rock climbing', 'Rock Collecting', 'Rockets', 'Rocking AIDS Babies', 'Roleplaying', 'Roller derby', 'Roller skating', 'Rugby', 'Rugby league football', 'Running', 'Sailing', 'Saltwater Aquariums', 'Sand art', 'Sand Castles', 'Scrapbooking', 'Scuba diving', 'Sculling or Rowing', 'Sculpting', 'Sea glass collecting', 'Seashell collecting', 'Self Defense', 'Sewing', 'Shark Fishing', 'Shooting', 'Shooting sport', 'Shopping', 'Shortwave listening', 'Singing', 'Singing In Choir', 'Skateboarding', 'Skeet Shooting', 'Sketching', 'Skiing', 'Skimboarding', 'Sky Diving', 'Skydiving', 'Slack Lining', 'Slacklining', 'Sleeping', 'Slingshots', 'Slot car racing', 'Snorkeling', 'Snowboarding', 'Soap Making', 'Soapmaking', 'Soccer', 'Socializing with friends/neighbors', 'Speed Cubing (rubix cube)', 'Speed skating', 'Spelunkering', 'Spending time with family/kids', 'Sports', 'Squash', 'Stamp Collecting', 'Stand-up comedy', 'Stone collecting', 'Stone skipping', 'Storm Chasing', 'Storytelling', 'String Figures', 'Sudoku', 'Surf Fishing', 'Surfing', 'Survival', 'Swimming', 'Table football', 'Table tennis', 'Taekwondo', 'Tai chi', 'Tatting', 'Taxidermy', 'Tea Tasting', 'Tennis', 'Tesla Coils', 'Tetris', 'Textiles', 'Texting', 'Tombstone Rubbing', 'Tool Collecting', 'Tour skating', 'Toy Collecting', 'Train Collecting', 'Train Spotting', 'Trainspotting', 'Traveling', 'Treasure Hunting', 'Trekkie', 'Triathlon', 'Tutoring Children', 'TV watching', 'Ultimate Frisbee', 'Urban exploration', 'Vehicle restoration', 'Video game collecting', 'Video Games', 'Video gaming', 'Vintage cars', 'Violin', 'Volleyball', 'Volunteer', 'Walking', 'Warhammer', 'Watching movies', 'Watching sporting events', 'Water sports', 'Weather Watcher', 'Web surfing', 'Weightlifting', 'Windsurfing', 'Wine Making', 'Wingsuit Flying', 'Wood carving', 'Woodworking', 'Working In A Food Pantry', 'Working on cars', 'World Record Breaking', 'Worldbuilding', 'Wrestling', 'Writing', 'Writing Music', 'Writing Songs', 'Yo-yoing', 'Yoga', 'YoYo', 'Ziplining', 'Zumba']
	const P = {
		latitude: 60.180916,
		longitude: 24.958202
	}

	dummy = dummy.concat('(\'firstname\', \'lastname\', \'admin\', \'admin@example.com\', \'$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe\', 1, null, \'male\', \'f\', \'#coding#techno\', \'asd\', 60.1686, 24.9456, \'2000-01-01\', 100, null),')
	dummy = dummy.concat('(\'firstname\', \'lastname\', \'dummy\', \'dummy@example.com\', \'$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe\', 1, null, null, null, null, null, null, null, \'2000-01-01\', 100, null),')

	for (let i = 0; i < 500; i++) {
		let month = Math.ceil(Math.random() * 12)
		let day = Math.ceil(Math.random() * 28)
		let year = Math.floor(Math.random() * (2005 - 1971) + 1971)
		let birthdate = `${year}-${month}-${day}`
		let randomPoint = randomLocation.randomCirclePoint(P, 500000)
		faker.locale = locale[Math.floor(Math.random() * locale.length)]
		// console.log(faker.locale)
		dummy = dummy.concat(`(
				'${faker.name.firstName().replace('\'', '')}',
				'${faker.name.lastName().replace('\'', '')}',
				'${faker.unique(faker.internet.userName)}',
				'${faker.unique(faker.internet.email)}',
				'$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe',
				1,
				'${faker.internet.avatar()}',
				'${gender[Math.floor(Math.random() * gender.length)]}',
				'${orientation[Math.floor(Math.random() * orientation.length)]}',
				'${'#' + interests[Math.floor(Math.random() * interests.length)].toLowerCase()}',
				'${khaled({ count: 3, units: 'words' })}',
				'${randomPoint.latitude}',
				'${randomPoint.longitude}',
				'${birthdate}',
				'${Math.floor(Math.random() * (500 - 50) + 50)}',
				CURRENT_TIMESTAMP - INTERVAL FLOOR(RAND() * 14) DAY
			)`)
		if (i < 499) {
			dummy = dummy.concat(',')
		}
	}

	const prepared = mysql.format(dummy)
	//console.log(prepared)

	await connection.query(prepared, (error) => {
		if (error) {
			// console.log(error)
			logger.error('Error creating dummy users', error.message)
			return
		}
		logger.info('Created dummy users')
	})

	await connection.query('SELECT tags FROM users', (error, result) => {
		if (error) {
			logger.error('Error generating dummy user tags:', error.message)
			return
		}
		let tagsStr = []
		result.map(i => tagsStr.push(i.tags))
		const filteredTags = Array.from(new Set(tagsStr))
		// console.log(filteredTags)
		tagsStr = filteredTags.map(t => t).join('')
		connection.query(`INSERT INTO tags (tags) VALUES ('${tagsStr}')`, (error) => {
			if (error) {
				logger.error('Error creating table: tags', error.message)
				return
			}
			logger.info('Created user tags')
			logger.info(`Finished setting up database: ${config.DB_NAME}`)
		})
		connection.end()
	})
}

module.exports = setupDb
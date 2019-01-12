export const getAllUsers = 'SELECT * FROM users';
export const getUserByEmail = 'SELECT * FROM users WHERE email = $1';
export const getUserByID = 'SELECT * FROM users WHERE id = $1';
export const createNewUser = 'INSERT INTO users(firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5) returning *';
export const createNewMeetup = 'INSERT INTO meetups(topic, location, tags, images, happeningOn) VALUES($1, $2, $3, $4, $5) returning *';
export const getMeetupByID = 'SELECT * FROM meetups WHERE id = $1';
export const getAllMeetups = 'SELECT * FROM meetups';

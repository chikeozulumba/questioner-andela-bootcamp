/* eslint-disable quotes */
export const getAllUsers = 'SELECT * FROM users';
export const getUserByEmail = 'SELECT * FROM users WHERE email = $1';
export const getUserByID = 'SELECT * FROM users WHERE id = $1';
export const createNewUser = 'INSERT INTO users(firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5) returning *';
export const createNewMeetup = 'INSERT INTO meetups(userid, topic, location, tags, images, happeningOn) VALUES($1, $2, $3, $4, $5, $6) returning *';
export const getMeetupByID = 'SELECT * FROM meetups WHERE id = $1';
export const getAllMeetups = 'SELECT * FROM meetups';
export const createRSVP = 'INSERT INTO rsvps(meetup, user_id, response) VALUES($1, $2, $3) returning *';
export const getQuestionByID = 'SELECT * FROM questions WHERE id = $1';
export const createNewQuestion = 'INSERT INTO questions(title, body, meetup, createdBy) VALUES($1, $2, $3, $4) returning *';
export const checkIfUpvoted = 'SELECT * FROM questions WHERE $1 = ANY (upvotes) AND id = $2';
export const checkIfDownvoted = 'SELECT * FROM questions WHERE $1 = ANY (downvotes) AND id = $2';
export const addVote = (field, value, id) => `UPDATE questions SET ${field} = array_append(${field}, ${value}) WHERE id = ${id} returning *`;
export const removeVote = (field, value, id) => `UPDATE questions SET ${field} = array_remove(${field}, ${value}) WHERE id = ${id} returning *`;
export const createNewComment = 'INSERT INTO comments(userid, meetupid, questionid, comment) VALUES($1, $2, $3, $4) returning *';
export const getCommentByID = 'SELECT * FROM comments WHERE id = $1';
export const getCommentByIDwithUser = 'SELECT * FROM comments WHERE id = $1 AND userid = $2';
// export const updateComment = 'UPDATE comments SET comment = $1 WHERE id = $2 AND userid = $3 returning *;';

export const updateComment = (field, commentId, userId) => `UPDATE comments SET comment = '${field}' WHERE id = ${commentId} AND userid = ${userId} returning *;`;
export const updateTags = `UPDATE meetups SET tags = (select array_agg(distinct e) from unnest(tags || $1) e) WHERE id = $2 returning *;`;
export const updateImages = `UPDATE meetups SET images = (select array_agg(distinct e) from unnest(images || $1) e) WHERE id = $2 returning *;`;
export const deleteComment = 'DELETE FROM comments WHERE id = $1;';
export const deleteMeetup = 'DELETE FROM meetups WHERE id = $1;';

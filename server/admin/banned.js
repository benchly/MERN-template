const { Op } = require('sequelize');
const { bannedEmails, accounts } = require('../database/models');

const route = async (req, res) => {
	//merge the banned accounts with the account data, if any
	const data = await bannedEmails.findAll()
		.then(bans => bans.map(async ban => {
			//find a matching account
			const account = await accounts.findOne({
				attrubutes: ['username', 'privilege'],
				where: {
					email: {
						[Op.eq]: ban.email
					}
				}
			}) || {};

			//merge the data and return (becomes a promise)
			return {
				username: account.username,
				email: ban.email,
				privilege: account.privilege,
				expiry: ban.expiry,
				reason: ban.reason
			};
		}))
		.then(promises => Promise.all(promises)) //resolve promises
		.catch(e => console.error(e))
	;

	return res.status(200).json(data);
};

module.exports = route;
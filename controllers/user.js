const db = require("../models");
let a = require("dotenv").config();
const interactive = require("../helpers/responses");
const axios = require("axios");
const { Op } = require("sequelize");
var nodemailer = require('nodemailer');

const USER = db.user;
const COMMUNITY = db.community;
const COMMUNITY_USER = db.community_user;
const CONTRIBUTION = db.contribution;

const userSignUp = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const existingUser = await USER.findOne({ where: { phoneNumber } });

    if (existingUser) {
      message = `Phone Number is already registered`;
      res.status(200).json(message);
    } else {
      let userData = await USER.create({
        ...req?.body,
      });
      res.status(200).json({ data: userData, status: true, message: 'succesful', });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createCommunity = async (req, res) => {
  const { phoneNumber, user_id } = req.body;
  const existingUser = await USER.findOne({ where: { id: user_id } });
  try {
    if (existingUser) {
      await USER.update(
        {
          isAdmin: true,
        },
        { where: { id: user_id } }
      );

      let data = await COMMUNITY.create({
        ...req?.body,
        admin: user_id,
      });

      await COMMUNITY_USER.create({
        communityId: data.id,
        userId: user_id,
      });
      res.status(200).json({ data, status: true, message: 'succesful', });
    } else return res.status(404).json("User not Registered");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const searchForCommunity = async (req, res) => {
  const { search } = req.body;
  try {
    let data = await COMMUNITY.findAll({
      where: { name: { [Op.like]: `%${search}%` } },
      include: { all: true },
    });
    res.status(200).json({data, status: true, message: 'succesful',});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let data = await USER.findAll({});
    res.status(200).json({ data, status: true, message: 'succesful' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addUserToCommunity = async (req, res) => {
  const { userId } = req.body;
  try {
    const existingUser = await COMMUNITY_USER.findOne({
      where: { userId },
    });
    
    if (existingUser) {
      res.status(200).json('User Already added to the group');
    } 
    else {
      let data = await COMMUNITY_USER.create({
        ...req?.body,
      });

      let newData = await COMMUNITY_USER.findOne({
        where: { id: data.id },
        include: { all: true },
      });

      res.status(200).json({ data: newData, status: true, message: 'succesful' });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const makeContributions = async (req, res) => {
  const { contribution_amount, userId } = req.body;

  try {
    let data = await COMMUNITY_USER.update(
      {
        contribution_amount,
      },
      { where: { userId } }
    );
    // let newData = await COMMUNITY_USER.findOne({
    //   where: { id: data.id },
    //   include: { all: true },
    // });
    res.status(200).json({ data, status: true, message: 'succesful' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserByAgent = async (req, res) => {
  const {admin_id} = req.body
  try {
    let data = await COMMUNITY.findOne({where: {admin: admin_id}})
    let newData = await COMMUNITY_USER.findAll({where: {communityId: data.id}})

    res.status(200).json({ status: true, message: 'succesful', data:newData });
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const sendInvite = async (req, res) => {
  try {
    const {admin_email, user_email} = req.body;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    
    var mailOptions = {
      from: admin_email,
      to: user_email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).json({ error: error })
      } else {
        res.status(200).json('Email sent: ');
      }
    });
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateTableForCollection = async (req, res) => {
  const {admin_id} = req.body
  try {
    let data = await COMMUNITY.findOne({where: {admin: admin_id}})
    let newData = await COMMUNITY_USER.findAll({where: {communityId: data.id}})

    let array = shuffle(newData)

    res.status(200).json({ status: true, message: 'succesful', data:array });
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

module.exports = {
  userSignUp,
  createCommunity,
  searchForCommunity,
  getAllUsers,
  makeContributions,
  addUserToCommunity,
  getUserByAgent,
  sendInvite,
  generateTableForCollection
};
